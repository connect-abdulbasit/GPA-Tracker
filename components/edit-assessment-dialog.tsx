"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { updateAssessment } from "@/app/actions/assessment"

interface EditAssessmentDialogProps {
  assessment: {
    id: string
    name: string
    weightage: number
    total_marks: number
    marks_obtained: number
  }
  courseId: string
  semesterId: string
  userId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditAssessmentDialog({ assessment, courseId, semesterId, userId, open, onOpenChange }: EditAssessmentDialogProps) {
  const [title, setTitle] = useState(assessment.name)
  const [totalMarks, setTotalMarks] = useState(assessment.total_marks.toString())
  const [obtainedMarks, setObtainedMarks] = useState(assessment.marks_obtained.toString())
  const [weightage, setWeightage] = useState(assessment.weightage.toString())
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !totalMarks || !obtainedMarks || !weightage) return

    const totalMarksNum = Number.parseFloat(totalMarks)
    const obtainedMarksNum = Number.parseFloat(obtainedMarks)
    const weightageNum = Number.parseFloat(weightage)

    if (totalMarksNum <= 0 || obtainedMarksNum < 0 || obtainedMarksNum > totalMarksNum) {
      toast.error("Please enter valid marks")
      return
    }

    if (weightageNum <= 0 || weightageNum > 100) {
      toast.error("Weightage must be between 0 and 100")
      return
    }

    setLoading(true)
    try {
      await updateAssessment(assessment.id, {
        course_id: courseId,
        user_id: userId,
        semester_id: semesterId,
        name: title,
        weightage: weightageNum,
        total_marks: totalMarksNum,
        marks_obtained: obtainedMarksNum,
      })
      toast.success("Assessment updated successfully!")
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Failed to update assessment")
      }
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
            <DialogTitle>Edit Assessment</DialogTitle>
            <DialogDescription>
              Update the assessment details
            </DialogDescription>
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
                placeholder="e.g., Quiz 1, Midterm"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="total-marks" className="text-right">
                Total Marks
              </Label>
              <Input
                id="total-marks"
                type="number"
                min="0"
                step="0.1"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                placeholder="100"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="obtained-marks" className="text-right">
                Obtained Marks
              </Label>
              <Input
                id="obtained-marks"
                type="number"
                min="0"
                step="0.01"
                value={obtainedMarks}
                onChange={(e) => setObtainedMarks(e.target.value)}
                placeholder="85"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weightage" className="text-right">
                Weightage (%)
              </Label>
              <Input
                id="weightage"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={weightage}
                onChange={(e) => setWeightage(e.target.value)}
                placeholder="20"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Assessment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 