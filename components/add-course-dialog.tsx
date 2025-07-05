"use client"

import type React from "react"

import { useState } from "react"
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
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { addCourse } from "@/app/actions/course"
import { useSession } from "@/lib/auth-client"

interface AddCourseDialogProps {
  semesterId: string
  isOngoing: boolean
  onCourseAdded?: () => void
}

export function AddCourseDialog({ semesterId, isOngoing, onCourseAdded }: AddCourseDialogProps) {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [creditHours, setCreditHours] = useState("")
  const [gpa, setGpa] = useState("")
  const [courseType, setCourseType] = useState<"core" | "elective" | "non-credit">("core")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !creditHours || (!gpa && !isOngoing) || !courseType) return
    const creditHoursNum = Number.parseInt(creditHours)
    const gpaNum = Number.parseFloat(gpa)

    if (creditHoursNum <= 0 || gpaNum < 0 || gpaNum > 4 ) {
      toast.error("Please enter valid values (GPA should have max 2 decimal places)")
      return
    }

    setLoading(true)
    try {
      await addCourse(semesterId, session?.user?.id!, name.trim(), creditHoursNum, gpaNum, courseType)

      toast.success("Course added successfully!")
      setName("")
      setCreditHours("")
      setGpa("")
      setCourseType("core")
      setOpen(false)
      
      // Call the callback to refetch data instead of router.refresh()
      if (onCourseAdded) {
        onCourseAdded();
      }
    } catch (error) {
      toast.error("Failed to add course")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button size="sm" className="w-full sm:w-auto">
      <div className="flex items-center justify-center w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Course
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              {isOngoing
                ? "Add a course to this ongoing semester. You'll add assessments later to calculate the final grade."
                : "Add a course to this semester with its credit hours and final GPA."}
            </DialogDescription>
            </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="course-name">
                Course Name
              </Label>
              <Input
                id="course-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Calculus I"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="course-type">
                Course Type
              </Label>
              <Select value={courseType} onValueChange={(value: "core" | "elective" | "non-credit") => setCourseType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="core">Core</SelectItem>
                  <SelectItem value="elective">Elective</SelectItem>
                  <SelectItem value="non-credit">Non Credit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="credit-hours">
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
                required
              />
            </div>
            {!isOngoing && (
              <div className="grid gap-2">
                <Label htmlFor="gpa">
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
                  required
                />
              </div>
            )}
            {isOngoing && (
              <div className="text-sm text-muted-foreground bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                <p className="font-medium text-green-800 dark:text-green-200">Ongoing Course</p>
                <p className="text-green-700 dark:text-green-300">
                  Add assessments (quizzes, assignments, exams) to track your progress and calculate the final grade.
                </p>
              </div>
            )}
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
