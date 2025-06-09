"use server"
import { calculateSGPA } from "@/lib/gpa-calculations"
import { db } from "@/src/db"
import { coursesTable, semestersTable } from "@/src/db/schema"
import { and, eq } from "drizzle-orm"

export const addCourse = async (semesterId: string, userId: string, name: string, creditHours: number, gpa: number) => {
  const existingCourse = await db.select({credit_hours: coursesTable.credit_hours, gpa: coursesTable.gpa}).from(coursesTable).where(and(eq(coursesTable.semester_id, semesterId), eq(coursesTable.user_id, userId), eq(coursesTable.active, true))).execute()
  const sgpa = calculateSGPA([...existingCourse, {
    credit_hours: creditHours,
    gpa: gpa,
  }])
  const totalCredits = existingCourse.reduce((sum, course) => sum + course.credit_hours, 0) + creditHours
  console.log("totalCredits",totalCredits)
  const [,courseInsert] = await Promise.all([
  db.update(semestersTable).set({
    gpa: sgpa,
    total_credits: totalCredits,
  }).where(eq(semestersTable.id, semesterId)).execute(),
    db.insert(coursesTable).values({
    semester_id: semesterId,
    user_id: userId,
    name,
    credit_hours: creditHours,
    gpa: gpa,
  })
])
return courseInsert
}
export const deleteCourse = async (courseId: string) => {
  const [course] = await db.update(coursesTable).set({
    active: false,
  }).where(and(eq(coursesTable.id, courseId), eq(coursesTable.active, true))).returning();

  const existingCourses = await db.select({
    credit_hours: coursesTable.credit_hours, 
    gpa: coursesTable.gpa
  })
  .from(coursesTable)
  .where(and(
    eq(coursesTable.semester_id, course.semester_id),
    eq(coursesTable.user_id, course.user_id), 
    eq(coursesTable.active, true)
  ))
  .execute();

  const sgpa = calculateSGPA(existingCourses);
  const totalCredits = existingCourses.reduce((sum, course) => sum + course.credit_hours, 0);

  await db.update(semestersTable).set({
    gpa: sgpa,
    total_credits: totalCredits,
  }).where(eq(semestersTable.id, course.semester_id)).execute();
}