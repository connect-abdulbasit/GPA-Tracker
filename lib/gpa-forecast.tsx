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
  currentSemesters: {
    id: string
    name: string
    gpa: number
    total_credits: number
    status: string
  }[],
  targetCGPA: number,
  futureCourses: ForecastCourse[],
): ForecastResult {
  // Calculate current totals
  const currentTotalPoints = currentSemesters.reduce((sum, semester) => sum + semester.gpa * semester.total_credits, 0)
  const currentTotalCredits = currentSemesters.reduce((sum, semester) => sum + semester.total_credits, 0)
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

export function generateSampleFutureCourses(): ForecastCourse[] {
  const courses = [
    "Data Structures & Algorithms",
    "Database Systems",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Computer Architecture",
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "Cybersecurity",
    "Distributed Systems",
    "Computer Graphics",
    "Natural Language Processing"
  ]

  const sampleCourses: ForecastCourse[] = []

  for (let i = 0; i < courses.length; i++) {
      sampleCourses.push({
        id: `future-${i}`,
        name: courses[Math.floor(Math.random() * courses.length)],
        credit_hours: Math.floor(Math.random() * 3) + 2, 
        expected_gpa: 3.0, 
        semester_name: `Future Semester`,
      })
    
  }

  return sampleCourses
}
