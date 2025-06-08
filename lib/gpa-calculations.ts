// Define types directly in the file
interface Course {
  id: string;
  name: string;
  credit_hours: number;
  gpa: number;
  semester_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

interface SemesterWithCourses {
  id: string;
  name: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  courses: Course[];
}

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
  { grade: "A+", gpa: 4.0, range: "90+" },
  { grade: "A", gpa: 4.0, range: "86 - 89.9" },
  { grade: "A-", gpa: 3.67, range: "82 - 85.9" },
  { grade: "B+", gpa: 3.33, range: "78 - 81.9" },
  { grade: "B", gpa: 3.0, range: "74 - 77.9" },
  { grade: "B-", gpa: 2.67, range: "70 - 73.9" },
  { grade: "C+", gpa: 2.33, range: "66 - 69.9" },
  { grade: "C", gpa: 2.0, range: "62 - 65.9" },
  { grade: "C-", gpa: 1.67, range: "58 - 61.9" },
  { grade: "D+", gpa: 1.33, range: "54 - 57.9" },
  { grade: "D", gpa: 1.0, range: "50.0 - 53.9" },
  { grade: "F", gpa: 0.0, range: "< 50" },
]
