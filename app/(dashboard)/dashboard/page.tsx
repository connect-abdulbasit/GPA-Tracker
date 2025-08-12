"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, BookOpen, GraduationCap, Target, AlertCircle } from "lucide-react"
import { UserProfileDisplay } from "@/components/user-profile-display"
import { useUserData } from "@/hooks/useUserSync"
import { useEffect, useState, useMemo, Suspense } from "react"
import { HashLoader } from "react-spinners"
import { Alert, AlertDescription } from "@/components/ui/alert"
import dynamic from "next/dynamic"

// Dynamic imports for chart components
const GPATrendChart = dynamic(() => import("@/components/gpa-trend-chart").then(mod => ({ default: mod.GPATrendChart })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
      Loading chart...
    </div>
  )
})

const CourseTypeGPAChart = dynamic(() => import("@/components/course-type-gpa-chart").then(mod => ({ default: mod.CourseTypeGPAChart })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
      Loading chart...
    </div>
  )
})

// Types for better type safety
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

interface CourseData {
  name: string
  gpa: number
  credit_hours: number
  semesterName: string | null
  type: string
}

interface DashboardState {
  dashboardData: DashboardData | null
  gpaTrendData: GpaTrendData[]
  courseData: CourseData[]
  loading: boolean
  error: string | null
}

// Performance rating helper function
const getPerformanceRating = (cgpa: string): string => {
  const numCgpa = parseFloat(cgpa)
  if (numCgpa >= 3.5) return "Excellent"
  if (numCgpa >= 3.0) return "Good"
  if (numCgpa >= 2.5) return "Average"
  return "Poor"
}

export default function DashboardPage() {
  const { userData, loading: userLoading } = useUserData()
  const [state, setState] = useState<DashboardState>({
    dashboardData: null,
    gpaTrendData: [],
    courseData: [],
    loading: true,
    error: null
  })

  // Memoized performance rating
  const performanceRating = useMemo(() => {
    return getPerformanceRating(state.dashboardData?.cgpa || "0.00")
  }, [state.dashboardData?.cgpa])

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userData?.id) return

      try {
        setState(prev => ({ ...prev, loading: true, error: null }))

        // Dynamic imports for the actions
        const { getDashboardData, getGpaTrendData, getCourseData } = await import("@/app/actions/dashboard")

        const [dashboard, gpaTrend, course] = await Promise.all([
          getDashboardData(userData.id),
          getGpaTrendData(userData.id),
          getCourseData(userData.id)
        ])

        setState({
          dashboardData: dashboard,
          gpaTrendData: gpaTrend,
          courseData: course,
          loading: false,
          error: null
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load dashboard data. Please try again.'
        }))
      }
    }

    if (!userLoading && userData?.id) {
      fetchDashboardData()
    }
  }, [userData?.id, userLoading])

  // Show loading state
  if (userLoading || state.loading) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80">
        <HashLoader color="#4F46E5" />
      </div>
    )
  }

  // Show error state
  if (state.error) {
    return (
      <div className="space-y-4 sm:space-y-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-8">
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Welcome back! Here's an overview of your academic progress.
        </p>
      </div>

      <UserProfileDisplay />

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {state.dashboardData?.cgpa || "0.00"}
            </div>
            <p className="text-xs text-muted-foreground">Out of 4.0 scale</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {state.dashboardData?.totalCourses || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {state.dashboardData?.totalSemesters || 0} semesters
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Hours</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {state.dashboardData?.totalCredits || 0}
            </div>
            <p className="text-xs text-muted-foreground">Total completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceRating}</div>
            <p className="text-xs text-muted-foreground">Academic standing</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>GPA Trend</CardTitle>
            <CardDescription>Your semester-wise GPA progression</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                Loading chart...
              </div>
            }>
              <GPATrendChart data={state.gpaTrendData} />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Core vs Elective Performance</CardTitle>
            <CardDescription>
              Compare your GPA performance between core and elective courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                Loading chart...
              </div>
            }>
              <CourseTypeGPAChart data={state.courseData} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
