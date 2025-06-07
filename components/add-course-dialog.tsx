"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
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
import { Plus } from "lucide-react"
import { toast } from "sonner"

interface AddCourseDialogProps {
  semesterId: string
}

export function AddCourseDialog({ semesterId }: AddCourseDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [creditHours, setCreditHours] = useState("")
  const [gpa, setGpa] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !creditHours || !gpa) return

    const creditHoursNum = Number.parseInt(creditHours)
    const gpaNum = Number.parseFloat(gpa)

    if (creditHoursNum <= 0 || gpaNum < 0 || gpaNum > 4) {
      toast.error("Please enter valid values")
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.from("courses").insert([
        {
          semester_id: semesterId,
          name: name.trim(),
          credit_hours: creditHoursNum,
          gpa: gpaNum,
        },
      ])

      if (error) throw error

      toast.success("Course added successfully!")
      setName("")
      setCreditHours("")
      setGpa("")
      setOpen(false)
      router.refresh()
    } catch (error) {
      toast.error("Failed to add course")
      // Consider using a proper logging service instead
      // console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex-1">
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>Add a course to this semester with its credit hours and GPA.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course-name" className="text-right">
                Course Name
              </Label>
              <Input
                id="course-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Calculus I"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="credit-hours" className="text-right">
                Credit Hours
              </Label>
              <Input
                id="credit-hours"
                type="number"
                min="1"
                max="10"
                value={creditHours}
                onChange={(e) => setCreditHours(e.target.value)}
                placeholder="3"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gpa" className="text-right">
                GPA
              </Label>
              <Input
                id="gpa"
                type="number"
                min="0"
                max="4"
                step="0.1"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                placeholder="3.7"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
