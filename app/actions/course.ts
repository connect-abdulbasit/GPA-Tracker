"use server"
import { calculateSGPA } from "@/lib/gpa-calculations"
import { db } from "@/src/db"
import { coursesTable, semestersTable } from "@/src/db/schema"
import { and, eq } from "drizzle-orm"

export const addCourse = async (semesterId: string, userId: string, name: string, creditHours: number, gpa: number) => {
  const existingCourse = await db.select({credit_hours: coursesTable.credit_hours, gpa: coursesTable.gpa}).from(coursesTable).where(and(eq(coursesTable.semester_id, semesterId), eq(coursesTable.user_id, userId))).execute()
  const sgpa = calculateSGPA([...existingCourse, {
    credit_hours: creditHours,
    gpa: gpa,
  }])
  const [,courseInsert] = await Promise.all([
  db.update(semestersTable).set({
    gpa: sgpa,
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
  await db.update(coursesTable).set({
    active: false,
  }).where(and(eq(coursesTable.id, courseId), eq(coursesTable.active, true))).execute()
}