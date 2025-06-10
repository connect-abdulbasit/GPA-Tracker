import { auth } from "@clerk/nextjs/server"
import { supabase } from "@/lib/supabase"
import { AddResourceButton } from "@/components/add-resource-button"
import { ResourcesList } from "@/components/resources-list"
import { AdminRouteGuard } from "@/components/admin-route-guard"


async function getResources(userId: string) {
  const { data: resources } = await supabase
    .from("resources")
    .select(`
      *,
      course:course_id (*),
      semester:semester_id (*)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  return resources || []
}

export default async function ResourcesPage() {
  const { userId } = await auth()
  const resources = await getResources(userId!)

  return (
    <AdminRouteGuard>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Study Resources</h1>
            <p className="text-muted-foreground">Share and organize your study materials, links, and documents</p>
          </div>
          <AddResourceButton />
        </div>

        <ResourcesList initialResources={resources} />
      </div>
    </AdminRouteGuard>
  )
}
