"use client"
import { AddResourceButton } from "@/components/add-resource-button"
import { ResourcesList } from "@/components/resources-list"
// import { AdminRouteGuard } from "@/components/admin-route-guard"
import { fetchResources } from "@/app/actions/resources"
import { useUserData } from "@/hooks/useUserSync"
// import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { HashLoader } from "react-spinners"

export default function ResourcesPage() {
  const { userData, loading } = useUserData()
  const [resourcesData, setResourcesData] = useState<any>(null)
  const [dataLoading, setDataLoading] = useState(true)
console.log(resourcesData)
  useEffect(() => {
    const fetchData = async () => {
      if (userData?.id) {
        try {
          const { resources, totalCount, totalPages } = await fetchResources(userData.id, 1, 9, "", "all")
          setResourcesData({ resources, totalCount, totalPages })
        } catch (error) {
          console.error('Error fetching resources:', error)
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Study Resources</h1>
            <p className="text-muted-foreground">Share and organize your study materials, links, and documents</p>
          </div>
          <AddResourceButton />
        </div>

        <ResourcesList 
          initialResources={resourcesData?.resources || []} 
          initialTotalCount={resourcesData?.totalCount || 0}
          initialTotalPages={resourcesData?.totalPages || 0}
        />
      </div>
    // </AdminRouteGuard>
  )
}
