import { auth } from "@clerk/nextjs/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, BookOpen, GraduationCap, Target } from "lucide-react"
import { GPATrendChart } from "@/components/gpa-trend-chart"
import { CourseTypeGPAChart } from "@/components/course-type-gpa-chart"
import { getCourseData, getDashboardData, getGpaTrendData } from "@/app/actions/dashboard"
import { UserProfileDisplay } from "@/components/user-profile-display"

export default async function DashboardPage() {
  const { userId } = await auth()
  const dashboardData = await getDashboardData(userId!)
  const gpaTrendData = await getGpaTrendData(userId!)
  const courseData = await getCourseData(userId!)
  return (
    <div className="space-y-4 sm:space-y-8">
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Welcome back! Here's an overview of your academic progress.</p>
      </div>
      <UserProfileDisplay />
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
            <div className="text-2xl font-bold">{dashboardData.cgpa>"3.5"?"Excellent":dashboardData.cgpa>"3.0"?"Good":dashboardData.cgpa>"2.5"?"Average":"Poor"}</div>
            <p className="text-xs text-muted-foreground">Academic standing</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>GPA Trend</CardTitle>
            <CardDescription>Your semester-wise GPA progression</CardDescription>
          </CardHeader>
          <CardContent>
            <GPATrendChart data={gpaTrendData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Core vs Elective Performance</CardTitle>
            <CardDescription>Compare your GPA performance between core and elective courses</CardDescription>
          </CardHeader>
          <CardContent>
            <CourseTypeGPAChart data={courseData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
