"use server"
import { db } from "@/src/db"
import { coursesTable } from "@/src/db/schema"

export const addCourse = async (semesterId: string, userId: string, name: string, creditHours: number, gpa: number) => {
  return await db.insert(coursesTable).values({
    semester_id: semesterId,
    user_id: userId,
    name,
    credit_hours: creditHours,
    gpa: gpa.toString(),
  })
}