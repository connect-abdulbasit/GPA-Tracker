"use server";
import { calculateSGPA } from "@/lib/gpa-calculations";
import { db } from "@/src/db";
import { coursesTable, semestersTable } from "@/src/db/schema";
import { and, eq, ne } from "drizzle-orm";
export const addCourse = async (
  semesterId: string,
  userId: string,
  name: string,
  creditHours: number,
  gpa: number,
  type: string
) => {
  let courseInsert;

  if (type !== "non-credit") {
    const existingCourse = await db
      .select({
        credit_hours: coursesTable.credit_hours,
        gpa: coursesTable.gpa,
      })
      .from(coursesTable)
      .where(
        and(
          eq(coursesTable.semester_id, semesterId),
          eq(coursesTable.user_id, userId),
          eq(coursesTable.active, true),
          ne(coursesTable.type, "non-credit")
        )
      )
      .execute();

    const sgpa = calculateSGPA([
      ...existingCourse,
      {
        credit_hours: creditHours,
        gpa: gpa,
      },
    ]);

    const [, insertResult] = await Promise.all([
      db
        .select({
          total_credits: semestersTable.total_credits,
        })
        .from(semestersTable)
        .where(eq(semestersTable.id, semesterId))
        .then(([result]) =>
          db
            .update(semestersTable)
            .set({
              gpa: sgpa,
              total_credits: result.total_credits + creditHours,
            })
            .where(eq(semestersTable.id, semesterId))
            .execute()
        ),
      db
        .insert(coursesTable)
        .values({
          semester_id: semesterId,
          user_id: userId,
          name,
          credit_hours: creditHours,
          gpa: gpa,
          type: type,
        })
        .execute(),
    ]);

    courseInsert = insertResult;
  } else {
    [, courseInsert] = await Promise.all([
      db
        .select({
          total_credits: semestersTable.total_credits,
        })
        .from(semestersTable)
        .where(eq(semestersTable.id, semesterId))
        .then(([result]) =>
          db
            .update(semestersTable)
            .set({
              total_credits: result.total_credits + creditHours,
            })
            .where(eq(semestersTable.id, semesterId))
            .execute()
        ),
      db
        .insert(coursesTable)
        .values({
          semester_id: semesterId,
          user_id: userId,
          name,
          credit_hours: creditHours,
          gpa: gpa,
          type: type,
        })
        .execute(),
    ]);
  }

  return courseInsert;
};
export const deleteCourse = async (courseId: string) => {
  let sgpa;
  const [course] = await db
    .update(coursesTable)
    .set({
      active: false,
    })
    .where(and(eq(coursesTable.id, courseId), eq(coursesTable.active, true)))
    .returning();
  if (course.type !== "non-credit") {
    const existingCourse = await db
    .select({
      credit_hours: coursesTable.credit_hours,
      gpa: coursesTable.gpa,
    })
    .from(coursesTable)
    .where(
      and(
        eq(coursesTable.semester_id, course.semester_id),
        eq(coursesTable.user_id, course.user_id),
        eq(coursesTable.active, true),
        ne(coursesTable.type, "non-credit")
      )
    )
    .execute();

    sgpa = calculateSGPA([
      ...existingCourse,
    ]);
  
  }
    const [totalCredits] = await db
      .select({
        total_credits: semestersTable.total_credits,
        gpa: semestersTable.gpa,
      })
      .from(semestersTable)
      .where(eq(semestersTable.id, course.semester_id))
      .execute();
    await db
      .update(semestersTable)
      .set({
        gpa: sgpa ?? totalCredits.gpa,
        total_credits: totalCredits.total_credits - course.credit_hours,
      })
      .where(eq(semestersTable.id, course.semester_id))
      .execute();
  
};

export const updateCourse = async (courseId: string, userId: string, name: string, creditHours: number, gpa: number, type: string) => {
 const course = await db.update(coursesTable).set({
    name,
    credit_hours: creditHours,
    gpa: gpa,
    type: type,
  }).where(and(eq(coursesTable.id, courseId), eq(coursesTable.user_id, userId))).returning().execute();
  const existingCourse = await db.select().from(coursesTable).where(and(eq(coursesTable.semester_id, course[0].semester_id), eq(coursesTable.user_id, userId),eq(coursesTable.active,true),ne(coursesTable.type,"non-credit"))).execute();
  const sgpa = calculateSGPA([
    ...existingCourse,
    {
      credit_hours: creditHours,
      gpa: gpa,
    },
  ]);
  const [totalCredits] = await db.select({
    total_credits: semestersTable.total_credits,
  }).from(semestersTable).where(eq(semestersTable.id, existingCourse[0].semester_id)).execute();
  await db.update(semestersTable).set({
    gpa: sgpa ,
    total_credits: totalCredits.total_credits - existingCourse[0].credit_hours + creditHours,
  }).where(eq(semestersTable.id, existingCourse[0].semester_id)).execute();
};