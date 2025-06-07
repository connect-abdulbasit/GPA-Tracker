import { auth } from "@clerk/nextjs/server"
import { Course, supabase } from "@/lib/supabase"
import { calculateSGPA, calculateCGPA } from "@/lib/gpa-calculations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, BookOpen, GraduationCap, Target } from "lucide-react"
import { GPATrendChart } from "@/components/gpa-trend-chart"
import { CourseGPAChart } from "@/components/course-gpa-chart"

async function getDashboardData(userId: string) {
  const { data: semesters } = await supabase
    .from("semesters")
    .select(`
      *,
      courses (*)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: true })

  return semesters || []
}

export default async function DashboardPage() {
  const { userId } = await auth()
  const semesters = await getDashboardData(userId!)

  const cgpa = calculateCGPA(semesters)
  const totalCourses = semesters.reduce((sum, sem) => sum + sem.courses.length, 0)
  const totalCredits = semesters.reduce(
    (sum, sem) => sum + sem.courses.reduce((courseSum: number, course: Course) => courseSum + course.credit_hours, 0),
    0,
  )

  const semesterData = semesters.map((semester) => ({
    name: semester.name,
    sgpa: calculateSGPA(semester.courses),
    courses: semester.courses.length,
  }))

  const allCourses = semesters.flatMap((sem) =>
    sem.courses.map((course: Course) => ({
      ...course,
      semesterName: sem.name,
    })),
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your academic progress.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cgpa.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Out of 4.0 scale</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses}</div>
            <p className="text-xs text-muted-foreground">Across {semesters.length} semesters</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Hours</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCredits}</div>
            <p className="text-xs text-muted-foreground">Total completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {cgpa >= 3.5 ? "Excellent" : cgpa >= 3.0 ? "Good" : cgpa >= 2.5 ? "Average" : "Needs Improvement"}
            </div>
            <p className="text-xs text-muted-foreground">Academic standing</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>GPA Trend</CardTitle>
            <CardDescription>Your semester-wise GPA progression</CardDescription>
          </CardHeader>
          <CardContent>
            <GPATrendChart data={semesterData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>GPA distribution across your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <CourseGPAChart data={allCourses} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
