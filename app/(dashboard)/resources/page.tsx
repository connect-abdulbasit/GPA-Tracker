import { AddResourceButton } from "@/components/add-resource-button"
import { ResourcesList } from "@/components/resources-list"
// import { AdminRouteGuard } from "@/components/admin-route-guard"
import { fetchResources } from "@/app/actions/resources"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"

export default async function ResourcesPage() {
  const session = await authClient.getSession()
  const { resources, totalCount, totalPages } = await fetchResources(session?.data?.user?.id || "", 1, 9, "", "all")

  if (!session?.data?.user) {
    redirect("/sign-in")
  }

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
