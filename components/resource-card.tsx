"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ExternalLink, MoreHorizontal, Trash2, Calendar, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface ResourceCardProps {
  resource: any
  icon: React.ReactNode
}

export function ResourceCard({ resource, icon }: ResourceCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this resource?")) {
      return
    }

    setIsDeleting(true)
    try {
      const { error } = await supabase.from("resources").delete().eq("id", resource.id)

      if (error) throw error

      toast.success("Resource deleted successfully")
      router.refresh()
    } catch (error) {
      toast.error("Failed to delete resource")
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-primary/10 rounded-md">{icon}</div>
            <CardTitle className="text-lg truncate">{resource.title}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDelete} disabled={isDeleting} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {resource.course && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <BookOpen className="h-3 w-3 mr-1" />
            {resource.course.name}
          </div>
        )}
        <CardDescription className="line-clamp-2 h-10">
          {resource.description || "No description provided"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-1">
          {resource.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {formatDate(resource.created_at)}
        </div>
        {resource.url && (
          <Button variant="ghost" size="sm" className="h-7 px-2" asChild>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              Open
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
