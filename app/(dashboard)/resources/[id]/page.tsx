import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  BookOpen,
  FileText,
  Github,
  Link2,
  Youtube,
  ImageIcon,
  File,
} from "lucide-react"
import Link from "next/link"
import { fetchResourceById } from "@/app/actions/resources"

export default async function ResourceDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const resource = await fetchResourceById(params.id)

  if (!resource) {
    notFound()
  }

  const getResourceTypeIcon = () => {
    switch (resource.resource_type) {
      case "link":
        return <Link2 className="h-5 w-5" />
      case "github":
        return <Github className="h-5 w-5" />
      case "pdf":
        return <FileText className="h-5 w-5" />
      case "video":
        return <Youtube className="h-5 w-5" />
      case "image":
        return <ImageIcon className="h-5 w-5" />
      default:
        return <File className="h-5 w-5" />
    }
  }

  const formatDate = (dateInput: string | Date) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/resources">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{resource.title}</h1>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(resource.created_at)}</span>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-md">{getResourceTypeIcon()}</div>
            <div>
              <CardTitle>{resource.title}</CardTitle>
              {resource.resource_type && (
                <CardDescription className="capitalize">{resource.resource_type} Resource</CardDescription>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {resource.description && <p>{resource.description}</p>}

          {resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {resource.url && (
            <div className="pt-4">
              <Button asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Resource
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
