import { auth } from "@clerk/nextjs/server"
import { supabase } from "@/lib/supabase"
import { GoalTracker } from "@/components/goal-tracker"
import { AdminRouteGuard } from "@/components/admin-route-guard"

async function getSemesters(userId: string) {
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

export default async function ForecastPage() {
  const { userId } = await auth()
  const semesters = await getSemesters(userId!)

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
