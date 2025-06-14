import { auth } from "@clerk/nextjs/server"
import { GoalTracker } from "@/components/goal-tracker"
import { AdminRouteGuard } from "@/components/admin-route-guard"
import { fetchSemesters } from "@/app/actions/semester"

export default async function ForecastPage() {
  const { userId } = await auth()
  const semesters = await fetchSemesters(userId!)
  return (
    <AdminRouteGuard>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">GPA Forecast & Goals</h1>
          <p className="text-muted-foreground">
            Set academic goals and forecast your future CGPA based on planned courses
          </p>
        </div>

        <GoalTracker semesters={semesters} />
      </div>
    </AdminRouteGuard>
  )
}
