"use client"
import { GoalTracker } from "@/components/goal-tracker"
// import { AdminRouteGuard } from "@/components/admin-route-guard"
import { useUserData } from "@/hooks/useUserSync"
// import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchSemesters } from "@/app/actions/semester"
import { HashLoader } from "react-spinners"

export default function ForecastPage() {
  const { userData, loading } = useUserData()
  // const router = useRouter()
  const [semesters, setSemesters] = useState<any>(null)
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (userData?.id) {
        try {
          const semestersData = await fetchSemesters(userData.id)
          setSemesters(semestersData)
        } catch (error) {
          console.error('Error fetching semesters:', error)
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
    // <AdminRouteGuard>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">GPA Forecast & Goals</h1>
          <p className="text-muted-foreground">
            Set academic goals and forecast your future CGPA based on planned courses
          </p>
        </div>

        <GoalTracker semesters={semesters || []} />
      </div>
    // </AdminRouteGuard> 
  )
}

