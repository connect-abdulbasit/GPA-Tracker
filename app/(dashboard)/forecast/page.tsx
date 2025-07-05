import { GoalTracker } from "@/components/goal-tracker"
// import { AdminRouteGuard } from "@/components/admin-route-guard"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { fetchSemesters } from "@/app/actions/semester"

export default async function ForecastPage() {
  const session = await authClient.getSession()
  const semesters = await fetchSemesters(session?.data?.user?.id || "")

  if (!session?.data?.user) {
    redirect("/sign-in")
  }

  return (
    // <AdminRouteGuard>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">GPA Forecast & Goals</h1>
          <p className="text-muted-foreground">
            Set academic goals and forecast your future CGPA based on planned courses
          </p>
        </div>

        <GoalTracker semesters={semesters} />
      </div>
    // </AdminRouteGuard> 
  )
}

