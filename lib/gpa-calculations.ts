import type { Course, SemesterWithCourses } from "./supabase"

export function calculateSGPA(courses: Course[]): number {
  if (courses.length === 0) return 0

  const totalPoints = courses.reduce((sum, course) => sum + course.gpa * course.credit_hours, 0)
  const totalCredits = courses.reduce((sum, course) => sum + course.credit_hours, 0)

  return totalCredits > 0 ? totalPoints / totalCredits : 0
}

export function calculateCGPA(semesters: SemesterWithCourses[]): number {
  const allCourses = semesters.flatMap((semester) => semester.courses)
  return calculateSGPA(allCourses)
}

export const gradeScale = [
  { grade: "A+", gpa: 4.0, range: "97-100" },
  { grade: "A", gpa: 4.0, range: "93-96" },
  { grade: "A-", gpa: 3.7, range: "90-92" },
  { grade: "B+", gpa: 3.3, range: "87-89" },
  { grade: "B", gpa: 3.0, range: "83-86" },
  { grade: "B-", gpa: 2.7, range: "80-82" },
  { grade: "C+", gpa: 2.3, range: "77-79" },
  { grade: "C", gpa: 2.0, range: "73-76" },
  { grade: "C-", gpa: 1.7, range: "70-72" },
  { grade: "D+", gpa: 1.3, range: "67-69" },
  { grade: "D", gpa: 1.0, range: "65-66" },
  { grade: "F", gpa: 0.0, range: "0-64" },
]
