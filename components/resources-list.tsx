"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, Link2, FileText, Github, Youtube, ImageIcon, File } from "lucide-react"
import { ResourceCard } from "./resource-card"

interface ResourcesListProps {
  initialResources: any[]
}

export function ResourcesList({ initialResources }: ResourcesListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [resources] = useState<any[]>(initialResources)
  const [activeTab, setActiveTab] = useState("all")

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
          {filteredResources.length === 0 ? (
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
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
