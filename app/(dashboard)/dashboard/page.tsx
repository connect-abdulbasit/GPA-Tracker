"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, BookOpen, GraduationCap, Target } from "lucide-react"
import { GPATrendChart } from "@/components/gpa-trend-chart"
import { CourseTypeGPAChart } from "@/components/course-type-gpa-chart"
import { getCourseData, getDashboardData, getGpaTrendData } from "@/app/actions/dashboard"
import { UserProfileDisplay } from "@/components/user-profile-display"
import { useUserData } from "@/hooks/useUserSync"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { HashLoader } from "react-spinners"

export default function DashboardPage() {
  const { userData, loading } = useUserData()
  // const router = useRouter()
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [gpaTrendData, setGpaTrendData] = useState<any>(null)
  const [courseData, setCourseData] = useState<any>(null)
  const [dataLoading, setDataLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      if (userData?.id) {
        try {
          const [dashboard, gpaTrend, course] = await Promise.all([
            getDashboardData(userData.id),
            getGpaTrendData(userData.id),
            getCourseData(userData.id)
          ])
          setDashboardData(dashboard)
          setGpaTrendData(gpaTrend)
          setCourseData(course)
        } catch (error) {
          console.error('Error fetching dashboard data:', error)
        } finally {
          setDataLoading(false)
        }
      }
    }

    if (!loading) {
      fetchData()
    }
  }, [userData, loading])

  // useEffect(() => {
  //   if (!userData && !loading) {
  //     router.push("/sign-in")
  //   }
  // }, [userData, loading, router])

  if (loading || dataLoading) {
    return <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80">
    <HashLoader color="#4F46E5" />
  </div>
  }

  // if (!userData) {
  //   return null
  // }

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
            <div className="text-2xl font-bold">{dashboardData?.cgpa || "0.00"}</div>
            <p className="text-xs text-muted-foreground">Out of 4.0 scale</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.totalCourses || 0}</div>
            <p className="text-xs text-muted-foreground">Across {dashboardData?.totalSemesters || 0} semesters</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Hours</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.totalCredits || 0}</div>
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
              {dashboardData?.cgpa > "3.5" ? "Excellent" : dashboardData?.cgpa > "3.0" ? "Good" : dashboardData?.cgpa > "2.5" ? "Average" : "Poor"}
            </div>
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
            <GPATrendChart data={gpaTrendData || []} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Core vs Elective Performance</CardTitle>
            <CardDescription>Compare your GPA performance between core and elective courses</CardDescription>
          </CardHeader>
          <CardContent>
            <CourseTypeGPAChart data={courseData || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
