"use server"
import { db } from "@/src/db"
import { coursesTable, semestersTable } from "@/src/db/schema"
import { and, asc, eq, ne, sql } from "drizzle-orm"

// Types for better type safety
interface Semester {
  id: string
  name: string
  gpa: number
  total_credits: number
  created_at: Date
  courses: Course[]
}

interface Course {
  id: string
  name: string
  gpa: number
  credit_hours: number
  type: string
}

interface DashboardData {
  cgpa: string
  totalCredits: number
  totalCourses: number
  totalSemesters: number
}

interface GpaTrendData {
  name: string
  sgpa: number
  courses: number
}

// Optimized calculation functions
const calculateSemesterStats = (semesters: Semester[]) => {
  let totalCredits = 0
  let totalGpa = 0
  let totalCourses = 0

  for (const semester of semesters) {
    const creditCourses = semester.courses.filter(course => course.type !== 'non-credit')
    const semesterCredits = creditCourses.reduce((sum, course) => sum + course.credit_hours, 0)
    
    totalCredits += semesterCredits
    totalGpa += semester.gpa * semesterCredits
    totalCourses += semester.courses.length
  }

  return {
    cgpa: totalCredits > 0 ? totalGpa / totalCredits : 0,
    totalCredits,
    totalCourses,
    totalSemesters: semesters.length
  }
}

// Helper function to process database results
const processSemesterResults = (results: any[]): Semester[] => {
  const semestersMap = new Map<string, Semester>()

  for (const row of results) {
    const semesterId = row.semesters.id
    
    if (!semestersMap.has(semesterId)) {
      semestersMap.set(semesterId, {
        ...row.semesters,
        gpa: Number(row.semesters.gpa),
        courses: [],
      })
    }

    if (row.courses) {
      semestersMap.get(semesterId)!.courses.push({
        ...row.courses,
        gpa: Number(row.courses.gpa),
      })
    }
  }

  return Array.from(semestersMap.values())
}

// Optimized dashboard data function with better error handling
export const getDashboardData = async (userId: string): Promise<DashboardData> => {
  try {
    const results = await db
      .select()
      .from(semestersTable)
      .where(
        and(
          eq(semestersTable.user_id, userId), 
          eq(semestersTable.active, true), 
          eq(semestersTable.status, "completed")
        )
      )
      .leftJoin(
        coursesTable, 
        and(
          eq(semestersTable.id, coursesTable.semester_id),
          eq(coursesTable.active, true)
        )
      )
      .execute()

    const semesters = processSemesterResults(results)
    const stats = calculateSemesterStats(semesters)

    return {
      cgpa: stats.cgpa.toFixed(2),
      totalCredits: stats.totalCredits,
      totalCourses: stats.totalCourses,
      totalSemesters: stats.totalSemesters
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return {
      cgpa: "0.00",
      totalCredits: 0,
      totalCourses: 0,
      totalSemesters: 0
    }
  }
}

// Optimized GPA trend data function
export const getGpaTrendData = async (userId: string): Promise<GpaTrendData[]> => {
  try {
    const results = await db
      .select()
      .from(semestersTable)
      .leftJoin(
        coursesTable, 
        and(
          eq(semestersTable.id, coursesTable.semester_id),
          eq(coursesTable.active, true)
        )
      )
      .where(
        and(
          eq(semestersTable.user_id, userId), 
          eq(semestersTable.active, true), 
          eq(semestersTable.status, "completed")
        )
      )
      .orderBy(asc(semestersTable.created_at))
      .execute()

    const semesters = processSemesterResults(results)
    
    return semesters.map((semester) => ({
      name: semester.name,
      sgpa: semester.gpa,
      courses: semester.courses.length,
    }))
  } catch (error) {
    console.error('Error fetching GPA trend data:', error)
    return []
  }
}

// Optimized course data function with better query structure
export const getCourseData = async (userId: string) => {
  try {
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
      .where(
        and(
          eq(coursesTable.user_id, userId), 
          eq(coursesTable.active, true),
          ne(semestersTable.status, "ongoing")
        )
      )
      .orderBy(asc(coursesTable.created_at))
      .execute()

    return results.map(course => ({
      ...course,
      gpa: Number(course.gpa)
    }))
  } catch (error) {
    console.error('Error fetching course data:', error)
    return []
  }
}