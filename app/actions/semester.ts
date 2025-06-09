"use server";

import { db } from "@/src/db";
import { coursesTable, semestersTable } from "@/src/db/schema";
import { and, asc, desc, eq } from "drizzle-orm";

export const addSemester = async (userId: string, name: string) => {
  return await db.insert(semestersTable).values({
    user_id: userId,
    name,
    total_credits: 0,
    gpa: 0,
  });
};

export const fetchSemesters = async (userId: string) => {
  const results = await db
    .select()
    .from(semestersTable)
    .leftJoin(coursesTable, and(
      eq(semestersTable.id, coursesTable.semester_id),
      eq(coursesTable.active, true)
    ))
    .where(and(eq(semestersTable.user_id, userId), eq(semestersTable.active, true)))
    .orderBy(asc(semestersTable.created_at))
    .execute();

  const semestersMap = new Map<string, any>();

  for (const row of results) {
    const semesterId = row.semesters.id;
    if (!semestersMap.has(semesterId)) {
      semestersMap.set(semesterId, {
        ...row.semesters,
        courses: [],
      });
    }

    if (row.courses) {
      semestersMap.get(semesterId).courses.push({
        ...row.courses,
        gpa: Number(row.courses.gpa),
      });
    }
  }
console.log("Semesters:",Array.from(semestersMap.values()))
  return Array.from(semestersMap.values());
};

export const fetchSemesterById = async (semesterId: string, userId: string) => {
  const results = await db
    .select()
    .from(semestersTable)
    .where(
      and(eq(semestersTable.id, semesterId), eq(semestersTable.user_id, userId), eq(semestersTable.active, true))
    )
    .leftJoin(coursesTable, and(
      eq(semestersTable.id, coursesTable.semester_id),
      eq(coursesTable.active, true)
    )).orderBy(desc(coursesTable.gpa),desc(coursesTable.credit_hours))
    .execute();

  const semestersMap = new Map<string, any>();

  for (const row of results) {
    const semesterId = row.semesters.id;
    if (!semestersMap.has(semesterId)) {
      semestersMap.set(semesterId, {
        ...row.semesters,
        courses: [],
      });
    }

    if (row.courses) {
      semestersMap.get(semesterId).courses.push({
        ...row.courses,
        gpa: Number(row.courses.gpa),
      });
    }
  }

  return Array.from(semestersMap.values())[0];
};


export const deleteSemester = async (semesterId: string, userId: string) => {
  return await Promise.all([
   db.update(semestersTable).set({
    active: false,
  }).where(and(eq(semestersTable.id, semesterId), eq(semestersTable.user_id, userId))).execute(),
  db.update(coursesTable).set({
    active: false,
  }).where(and(eq(coursesTable.semester_id, semesterId), eq(coursesTable.user_id, userId))).execute()
]);
};

export const updateSemester = async (semesterId: string, userId: string, name: string) => {
  return await db.update(semestersTable).set({
    name,
  }).where(and(eq(semestersTable.id, semesterId), eq(semestersTable.user_id, userId))).execute();
};