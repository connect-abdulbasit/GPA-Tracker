"use server";

import { db } from "@/src/db";
import { assessmentsTable, coursesTable, semestersTable } from "@/src/db/schema";
import { and, asc, desc, eq } from "drizzle-orm";

export const addSemester = async (userId: string, name: string, status: "ongoing" | "completed") => {
  if(status === "ongoing"){
    const ongoingSemester = await db.select().from(semestersTable).where(and(eq(semestersTable.user_id, userId), eq(semestersTable.status, "ongoing"), eq(semestersTable.active, true))).execute();
    if(ongoingSemester.length > 0){
      throw new Error("You already have an ongoing semester. Please complete it first.");
    }
  }
  return await db.insert(semestersTable).values({
    user_id: userId,
    name,
    total_credits: 0,
    gpa: 0,
    status,
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
    )).leftJoin(assessmentsTable, and(
      eq(coursesTable.id, assessmentsTable.course_id),
      eq(assessmentsTable.active, true)
    )).orderBy(desc(coursesTable.gpa),desc(coursesTable.credit_hours))
    .execute();

  const semestersMap = new Map<string, any>();
  const coursesMap = new Map<string, any>();

  for (const row of results) {
    const semesterId = row.semesters.id;
    if (!semestersMap.has(semesterId)) {
      semestersMap.set(semesterId, {
        ...row.semesters,
        courses: [],
      });
    }

    if (row.courses) {
      const courseId = row.courses.id;
      if (!coursesMap.has(courseId)) {
        const course = {
          ...row.courses,
          gpa: Number(row.courses.gpa),
          assessments: [],
        };
        coursesMap.set(courseId, course);
        semestersMap.get(semesterId).courses.push(course);
      }

      if (row.assessments) {
        coursesMap.get(courseId).assessments.push(row.assessments);
      }
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