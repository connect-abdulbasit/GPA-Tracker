"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, Link2, FileText, Github, Youtube, ImageIcon, File, ChevronLeft, ChevronRight } from "lucide-react"
import { ResourceCard } from "./resource-card"
import { Button } from "@/components/ui/button"
import { fetchResources } from "@/app/actions/resources"

interface ResourcesListProps {
  initialResources: any[]
  initialTotalCount: number
  initialTotalPages: number
}

export function ResourcesList({ initialResources, initialTotalCount, initialTotalPages }: ResourcesListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [resources, setResources] = useState<any[]>(initialResources)
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [totalCount, setTotalCount] = useState(initialTotalCount)
  const [isLoading, setIsLoading] = useState(false)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, activeTab])

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const result = await fetchResources(
        "", // userId will be handled by the server
        currentPage,
        9, // pageSize
        searchQuery,
        activeTab
      )
      setResources(result.resources)
      setTotalPages(result.totalPages)
      setTotalCount(result.totalCount)
    } catch (error) {
      console.error("Error fetching resources:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage)
    setIsLoading(true)
    try {
      const result = await fetchResources(
        "", // userId will be handled by the server
        newPage,
        9,
        searchQuery,
        activeTab
      )
      setResources(result.resources)
      setTotalPages(result.totalPages)
      setTotalCount(result.totalCount)
    } catch (error) {
      console.error("Error fetching resources:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredResources = resources.filter((resource) => {
    // Filter by search query
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      resource.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (resource.course?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (resource.semester?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)

    // Filter by resource type
    const matchesType = activeTab === "all" || resource.resource_type === activeTab

    return matchesSearch && matchesType
  })

  // Group resources by semester
  const resourcesBySemester = filteredResources.reduce<Record<string, any[]>>((acc, resource) => {
    const semesterName = resource.semester?.name || "Uncategorized"
    if (!acc[semesterName]) {
      acc[semesterName] = []
    }
    acc[semesterName].push(resource)
    return acc
  }, {})

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case "link":
        return <Link2 className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "github":
        return <Github className="h-4 w-4" />
      case "video":
        return <Youtube className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="link" className="flex items-center gap-1">
            <Link2 className="h-3.5 w-3.5" />
            Links
          </TabsTrigger>
          <TabsTrigger value="github" className="flex items-center gap-1">
            <Github className="h-3.5 w-3.5" />
            GitHub
          </TabsTrigger>
          <TabsTrigger value="pdf" className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" />
            PDFs
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-1">
            <Youtube className="h-3.5 w-3.5" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {isLoading ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                <p className="text-muted-foreground mt-4">Loading resources...</p>
              </CardContent>
            </Card>
          ) : resources.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No resources found</h3>
                <p className="text-muted-foreground text-center mt-2">
                  {searchQuery ? "Try adjusting your search or filters" : "Add your first resource to get started"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-8">
                {Object.entries(resourcesBySemester).map(([semesterName, semesterResources]) => (
                  <div key={semesterName}>
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-xl font-semibold">{semesterName}</h2>
                      <Badge variant="outline">{semesterResources.length}</Badge>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {semesterResources.map((resource) => (
                        <ResourceCard
                          key={resource.id}
                          resource={resource}
                          icon={getResourceTypeIcon(resource.resource_type)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination Controls */}
              <div className="flex items-center justify-between mt-8">
                <p className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * 9) + 1} to {Math.min(currentPage * 9, totalCount)} of {totalCount} resources
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
