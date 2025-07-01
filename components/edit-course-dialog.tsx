"use client"

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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { updateCourse } from "@/app/actions/course"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface EditCourseDialogProps {
  course: {
    id: string
    name: string
    credit_hours: number
    gpa: number
    type: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
  disableGpaEdit?: boolean
}

export function EditCourseDialog({ course, open, onOpenChange, disableGpaEdit = false }: EditCourseDialogProps) {
  const [name, setName] = useState(course.name)
  const [creditHours, setCreditHours] = useState(course.credit_hours.toString())
  const [gpa, setGpa] = useState(course.gpa.toString())
  const [type, setType] = useState(course.type)
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !name.trim() || !creditHours || !gpa || !type) return
    const creditHoursNum = Number.parseInt(creditHours)
    const gpaNum = Number.parseFloat(gpa)

    if (creditHoursNum <= 0 || gpaNum < 0 || gpaNum > 4) {
      toast.error("Please enter valid values (GPA should be between 0 and 4)")
      return
    }

    setLoading(true)
    try {
      await updateCourse(course.id, user.id, name.trim(), creditHoursNum, gpaNum, type)
      toast.success("Course updated successfully!")
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      toast.error("Failed to update course")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Update the course details.</DialogDescription>
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
              <Label htmlFor="course-type" className="text-right">
                Course Type
              </Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select course type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="core">Core</SelectItem>
                  <SelectItem value="elective">Elective</SelectItem>
                  <SelectItem value="non-credit">Non Credit</SelectItem>
                </SelectContent>
              </Select>
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
                step="0.001"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                placeholder="4"
                className="col-span-3"
                required
                disabled={disableGpaEdit}
              />
            </div>
            {disableGpaEdit && (
              <div className="text-xs text-muted-foreground text-center">
                GPA is automatically calculated from assessments for courses
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 