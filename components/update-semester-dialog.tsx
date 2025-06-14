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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"
import { toast } from "sonner"
import { updateSemester } from "@/app/actions/semester"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fetchSemestersWithCourses } from "@/app/actions/semester"

export function UpdateSemesterDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  const [loading, setLoading] = useState(false)
  const [semesters, setSemesters] = useState<{ id: string; name: string }[]>([])
  const { user } = useUser()
  const router = useRouter()

  const handleOpenChange = async (newOpen: boolean) => {
    setOpen(newOpen)
    if (newOpen && user) {
      try {
        const fetchedSemesters = await fetchSemestersWithCourses(user.id)
        setSemesters(fetchedSemesters.map(s => ({ id: s.id, name: s.name })))
      } catch (error) {
        console.error("Failed to fetch semesters:", error)
        toast.error("Failed to load semesters")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !name.trim() || !selectedSemester) return

    setLoading(true)
    try {
      await updateSemester(selectedSemester, user.id, name.trim())
      toast.success("Semester updated successfully!")
      setName("")
      setSelectedSemester("")
      setOpen(false)
      router.refresh()
    } catch (error) {
      toast.error("Failed to update semester")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="h-4 w-4 mr-2" />
          Update Semester
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Semester</DialogTitle>
            <DialogDescription>Update the name of an existing semester.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="semester" className="text-right">
                Semester
              </Label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((semester) => (
                    <SelectItem key={semester.id} value={semester.id}>
                      {semester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                New Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Fall 2024"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading || !selectedSemester}>
              {loading ? "Updating..." : "Update Semester"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 