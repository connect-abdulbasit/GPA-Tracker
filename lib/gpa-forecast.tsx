export interface ForecastCourse {
  id: string
  name: string
  credit_hours: number
  expected_gpa: number
  semester_name: string
}

export interface ForecastScenario {
  scenario_name: string
  target_cgpa: number
  courses: ForecastCourse[]
}

export interface ForecastResult {
  current_cgpa: number
  projected_cgpa: number
  target_cgpa: number
  courses_needed: number
  credits_needed: number
  average_gpa_needed: number
  is_achievable: boolean
  scenarios: {
    optimistic: number
    realistic: number
    conservative: number
  }
}

export function calculateForecast(
  currentSemesters: any[],
  targetCGPA: number,
  futureCourses: ForecastCourse[],
): ForecastResult {
  // Calculate current totals
  const currentCourses = currentSemesters.flatMap((sem) => sem.courses)
  const currentTotalPoints = currentCourses.reduce((sum, course) => sum + course.gpa * course.credit_hours, 0)
  const currentTotalCredits = currentCourses.reduce((sum, course) => sum + course.credit_hours, 0)
  const currentCGPA = currentTotalCredits > 0 ? currentTotalPoints / currentTotalCredits : 0

  // Calculate projected totals with future courses
  const futureTotalPoints = futureCourses.reduce((sum, course) => sum + course.expected_gpa * course.credit_hours, 0)
  const futureTotalCredits = futureCourses.reduce((sum, course) => sum + course.credit_hours, 0)

  const totalPoints = currentTotalPoints + futureTotalPoints
  const totalCredits = currentTotalCredits + futureTotalCredits
  const projectedCGPA = totalCredits > 0 ? totalPoints / totalCredits : 0

  // Calculate what's needed to reach target
  const targetTotalPoints = targetCGPA * totalCredits
  const pointsNeeded = targetTotalPoints - currentTotalPoints
  const averageGPANeeded = futureTotalCredits > 0 ? pointsNeeded / futureTotalCredits : 0

  // Generate scenarios
  const scenarios = {
    optimistic: calculateScenarioGPA(currentTotalPoints, currentTotalCredits, futureTotalCredits, 3.8),
    realistic: calculateScenarioGPA(currentTotalPoints, currentTotalCredits, futureTotalCredits, 3.3),
    conservative: calculateScenarioGPA(currentTotalPoints, currentTotalCredits, futureTotalCredits, 2.8),
  }

  return {
    current_cgpa: currentCGPA,
    projected_cgpa: projectedCGPA,
    target_cgpa: targetCGPA,
    courses_needed: futureCourses.length,
    credits_needed: futureTotalCredits,
    average_gpa_needed: averageGPANeeded,
    is_achievable: averageGPANeeded <= 4.0 && averageGPANeeded >= 0,
    scenarios,
  }
}

function calculateScenarioGPA(
  currentPoints: number,
  currentCredits: number,
  futureCredits: number,
  averageGPA: number,
): number {
  const futurePoints = futureCredits * averageGPA
  const totalPoints = currentPoints + futurePoints
  const totalCredits = currentCredits + futureCredits
  return totalCredits > 0 ? totalPoints / totalCredits : 0
}

export function generateSampleFutureCourses(semesterCount = 2): ForecastCourse[] {
  const courses = [
    "Advanced Mathematics",
    "Computer Science",
    "Physics",
    "Chemistry",
    "Biology",
    "Literature",
    "History",
    "Economics",
    "Psychology",
    "Philosophy",
    "Statistics",
    "Engineering",
    "Business",
    "Art",
    "Music",
  ]

  const sampleCourses: ForecastCourse[] = []

  for (let sem = 1; sem <= semesterCount; sem++) {
    for (let i = 0; i < 5; i++) {
      sampleCourses.push({
        id: `future-${sem}-${i}`,
        name: courses[Math.floor(Math.random() * courses.length)],
        credit_hours: Math.floor(Math.random() * 3) + 2, // 2-4 credits
        expected_gpa: 3.0, // Default expectation
        semester_name: `Future Semester ${sem}`,
      })
    }
  }

  return sampleCourses
}
