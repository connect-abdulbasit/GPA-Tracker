"use server"
import { db } from "@/src/db"
import { coursesTable, semestersTable } from "@/src/db/schema"
import { and, eq } from "drizzle-orm"
const calculateTotalCredits = (semesters: any) => {
    return semesters.reduce((sum: number, semester: any) => sum + semester.total_credits, 0)
}
const calculateCGPAandTotalCredits = (semesters: any) => {
    console.log(semesters)
    const totalCredits = calculateTotalCredits(semesters)
    const totalGPA = semesters.reduce((sum: number, semester: any) => sum + semester.gpa * semester.total_credits, 0)
    console.log(totalGPA, totalCredits)
    return {cgpa: totalGPA / totalCredits, totalCredits: totalCredits}
}
export const getDashboardData = async (userId: string) => {
    const results = await db
    .select()
    .from(semestersTable)
    .where(
      and(eq(semestersTable.user_id, userId), eq(semestersTable.active, true))
    )
    .leftJoin(coursesTable, and(
      eq(semestersTable.id, coursesTable.semester_id),
      eq(coursesTable.active, true)
    ))
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
    const {cgpa, totalCredits} = calculateCGPAandTotalCredits(Array.from(semestersMap.values()))
    const totalCourses = Array.from(semestersMap.values()).reduce((sum: number, semester: any) => sum + (semester.courses?.length || 0), 0)
    console.log(cgpa, totalCredits, totalCourses, Array.from(semestersMap.values()).length)
    return {cgpa: cgpa || 0, totalCredits: totalCredits || 0, totalCourses: totalCourses || 0, totalSemesters: Array.from(semestersMap.values()).length || 0}
}   