"use server";

import { db } from "@/src/db";
import { coursesTable, semestersTable } from "@/src/db/schema";
import { and, eq } from "drizzle-orm";

export const addSemester = async (userId: string, name: string) => {
  return await db.insert(semestersTable).values({
    user_id: userId,
    name,
  });
};

export const fetchSemesters = async (userId: string) => {
  const results = await db
    .select()
    .from(semestersTable)
    .where(and(eq(semestersTable.user_id, userId), eq(semestersTable.active, true)))
    .leftJoin(coursesTable, eq(semestersTable.id, coursesTable.semester_id))
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
      and(eq(semestersTable.id, semesterId), eq(semestersTable.user_id, userId))
    )
    .leftJoin(coursesTable, eq(semestersTable.id, coursesTable.semester_id))
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
