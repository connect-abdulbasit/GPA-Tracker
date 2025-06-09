import { auth } from "@clerk/nextjs/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, BookOpen, GraduationCap, Target } from "lucide-react"
import { GPATrendChart } from "@/components/gpa-trend-chart"
import { CourseGPAChart } from "@/components/course-gpa-chart"
import { getDashboardData } from "@/app/actions/dashboard"

// Dummy data
const dummySemesters = [
  {
    id: "1",
    name: "Fall 2024",
    user_id: "user_123",
    created_at: new Date(),
    updated_at: new Date(),
    courses: [
      {
        id: "1",
        name: "Introduction to Computer Science",
        credit_hours: 3,
        gpa: 3.7,
        semester_id: "1",
        user_id: "user_123",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "2",
        name: "Data Structures",
        credit_hours: 4,
        gpa: 3.5,
        semester_id: "1",
        user_id: "user_123",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  },
  {
    id: "2",
    name: "Spring 2024",
    user_id: "user_123",
    created_at: new Date(),
    updated_at: new Date(),
    courses: [
      {
        id: "3",
        name: "Algorithms",
        credit_hours: 4,
        gpa: 3.8,
        semester_id: "2",
        user_id: "user_123",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  },
];


export default async function DashboardPage() {
  const { userId } = await auth()
  const dashboardData = await getDashboardData(userId!)

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
            <div className="text-2xl font-bold">{dashboardData.cgpa}</div>
            <p className="text-xs text-muted-foreground">Out of 4.0 scale</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalCourses}</div>
            <p className="text-xs text-muted-foreground">Across {dashboardData.totalSemesters} semesters</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Hours</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalCredits}</div>
            <p className="text-xs text-muted-foreground">Total completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Excellent</div>
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
            <GPATrendChart data={[]} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>GPA distribution across your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <CourseGPAChart data={[]} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
