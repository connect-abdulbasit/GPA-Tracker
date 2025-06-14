"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Link2, Github, FileText, Youtube, ImageIcon, File } from "lucide-react"
import { toast } from "sonner"
import { addResource } from "@/app/actions/resources"

export function AddResourceButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [resourceType, setResourceType] = useState<string>("link")
  const [url, setUrl] = useState("")
  const [tags, setTags] = useState("")
  const { user } = useUser()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !title.trim() || !resourceType) return

    setLoading(true)
    try {
    await addResource({
      user_id: user.id,
      title: title.trim(),
      description: description.trim(),
      resource_type: resourceType as "link" | "github" | "pdf" | "document" | "video" | "image" | "other",
      url: url.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
    })

      toast.success("Resource added successfully!")
      setTitle("")
      setDescription("")
      setResourceType("link")
      setUrl("")
      setTags("")
      setOpen(false)
      router.refresh()
    } catch (error) {
      toast.error("Failed to add resource")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getResourceTypeIcon = () => {
    switch (resourceType) {
      case "link":
        return <Link2 className="h-4 w-4" />
      case "github":
        return <Github className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Youtube className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Resource</DialogTitle>
            <DialogDescription>Share study materials, links, and documents with your classmates</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Calculus Cheat Sheet"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the resource"
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resource-type" className="text-right">
                Type
              </Label>
              <Select value={resourceType} onValueChange={setResourceType}>
                <SelectTrigger id="resource-type" className="col-span-3">
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="link" className="flex items-center">
                    <div className="flex items-center">
                      <Link2 className="h-4 w-4 mr-2" />
                      Link
                    </div>
                  </SelectItem>
                  <SelectItem value="github">
                    <div className="flex items-center">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub Repository
                    </div>
                  </SelectItem>
                  <SelectItem value="pdf">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      PDF Document
                    </div>
                  </SelectItem>
                  <SelectItem value="video">
                    <div className="flex items-center">
                      <Youtube className="h-4 w-4 mr-2" />
                      Video
                    </div>
                  </SelectItem>
                  <SelectItem value="image">
                    <div className="flex items-center">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Image
                    </div>
                  </SelectItem>
                  <SelectItem value="other">
                    <div className="flex items-center">
                      <File className="h-4 w-4 mr-2" />
                      Other
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                {getResourceTypeIcon()}
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags
              </Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="calculus, math, exam (comma separated)"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Resource"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
