"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Edit } from "lucide-react"
import { toast } from "sonner"
import { updateCourse } from "@/app/actions/course"
import { useAuth } from "@/lib/use-auth"

interface EditCourseDialogProps {
  courseId: string
  semesterId: string
  name: string
  creditHours: number
  gpa: number
  courseType: "core" | "elective" | "non-credit"
  isOngoing: boolean
}

export function EditCourseDialog({ courseId, semesterId, name, creditHours, gpa, courseType, isOngoing }: EditCourseDialogProps) {
  const { session } = useAuth()
  const [open, setOpen] = useState(false)
  const [courseName, setCourseName] = useState(name)
  const [courseCreditHours, setCourseCreditHours] = useState(creditHours.toString())
  const [courseGpa, setCourseGpa] = useState(gpa.toString())
  const [courseTypeState, setCourseTypeState] = useState<"core" | "elective" | "non-credit">(courseType)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!courseName.trim() || !courseCreditHours || (!courseGpa && !isOngoing) || !courseTypeState) return
    const creditHoursNum = Number.parseInt(courseCreditHours)
    const gpaNum = Number.parseFloat(courseGpa)

    if (creditHoursNum <= 0 || gpaNum < 0 || gpaNum > 4 ) {
      toast.error("Please enter valid values (GPA should have max 2 decimal places)")
      return
    }

    setLoading(true)
    try {
      await updateCourse(courseId, session?.user?.id!, courseName.trim(), creditHoursNum, gpaNum, courseTypeState)

      toast.success("Course updated successfully!")
      setOpen(false)
      router.refresh()
    } catch (error) {
      toast.error("Failed to update course")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="e.g., Calculus I"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course-type" className="text-right">
                Course Type
              </Label>
              <Select value={courseTypeState} onValueChange={(value: "core" | "elective" | "non-credit") => setCourseTypeState(value)}>
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
                value={courseCreditHours}
                onChange={(e) => setCourseCreditHours(e.target.value)}
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
                value={courseGpa}
                onChange={(e) => setCourseGpa(e.target.value)}
                placeholder="4"
                className="col-span-3"
                required
              />
            </div>
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