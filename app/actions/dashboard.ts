"use server"
import { db } from "@/src/db"
import { coursesTable, semestersTable } from "@/src/db/schema"
import { and, asc, eq, ne } from "drizzle-orm"

const calculateTotalCredits = (semesters: any) => {
    return semesters.reduce((sum: number, semester: any) =>
         sum + semester.total_credits, 0)
}

const calculateCGPAandTotalCredits = (semesters: any) => {
    const totalCredits =  semesters.reduce((sum: number, semester: any) => {
        const creditCourses = semester.courses.filter((course: any) => course.type !== 'non-credit')
        const semesterCredits = creditCourses.reduce((sum: number, course: any) => sum + course.credit_hours, 0)
        return sum + semesterCredits
    }, 0)
    const totalGPA = semesters.reduce((sum: number, semester: any) => {
        const creditCourses = semester.courses.filter((course: any) => course.type !== 'non-credit')
        const semesterCredits = creditCourses.reduce((sum: number, course: any) => sum + course.credit_hours, 0)
        return sum + semester.gpa * semesterCredits
    }, 0)
    return {cgpa: totalGPA / totalCredits}
}

export const getDashboardData = async (userId: string) => {
    const results = await db
    .select()
    .from(semestersTable)
    .where(
      and(eq(semestersTable.user_id, userId), eq(semestersTable.active, true), eq(semestersTable.status, "completed"))
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

    const {cgpa} = calculateCGPAandTotalCredits(Array.from(semestersMap.values()))
    const totalCredits = calculateTotalCredits(Array.from(semestersMap.values()))
    const totalCourses = Array.from(semestersMap.values()).reduce((sum: number, semester: any) => sum + (semester.courses?.length || 0), 0)
    return {cgpa: cgpa.toFixed(2) || 0, totalCredits: totalCredits || 0, totalCourses: totalCourses || 0, totalSemesters: Array.from(semestersMap.values()).length || 0}
}   


export const getGpaTrendData = async (userId: string) => {
  const results = await db
  .select()
  .from(semestersTable)
  .leftJoin(coursesTable, and(
    eq(semestersTable.id, coursesTable.semester_id),
    eq(coursesTable.active, true)
  ))
  .where(and(eq(semestersTable.user_id, userId), eq(semestersTable.active, true), eq(semestersTable.status, "completed")))
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
return Array.from(semestersMap.values()).map((semester) => ({
    name: semester.name,
    sgpa: semester.gpa,
    courses: semester.courses.length,
  }))
}

export const getCourseData = async (userId: string) => {
  const results = await db
  .select({
    name: coursesTable.name,
    gpa: coursesTable.gpa,
    credit_hours: coursesTable.credit_hours,
    semesterName: semestersTable.name,
    type: coursesTable.type,
  })
  .from(coursesTable)
  .leftJoin(semestersTable, eq(coursesTable.semester_id, semestersTable.id))
  .where(and(
    eq(coursesTable.user_id, userId), 
    eq(coursesTable.active, true),
    ne(semestersTable.status, "ongoing")
  ))
  .orderBy(asc(coursesTable.created_at))
  .execute();
  return results;
}