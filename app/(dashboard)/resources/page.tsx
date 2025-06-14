import { auth } from "@clerk/nextjs/server"
import { AddResourceButton } from "@/components/add-resource-button"
import { ResourcesList } from "@/components/resources-list"
// import { AdminRouteGuard } from "@/components/admin-route-guard"
import { fetchResources } from "@/app/actions/resources"


export default async function ResourcesPage() {
  const { userId } = await auth()
  const { resources, totalCount, totalPages } = await fetchResources(userId!, 1, 9, "", "all")

  return (
    // <AdminRouteGuard>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Study Resources</h1>
            <p className="text-muted-foreground">Share and organize your study materials, links, and documents</p>
          </div>
          <AddResourceButton />
        </div>

        <ResourcesList 
          initialResources={resources} 
          initialTotalCount={totalCount}
          initialTotalPages={totalPages}
        />
      </div>
    // </AdminRouteGuard>
  )
}
