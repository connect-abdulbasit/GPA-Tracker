"use client"

import type React from "react"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { addAssessment } from "@/app/actions/assessment"

interface AddAssessmentDialogProps {
  courseId: string
  courseName: string
  semesterId: string
  userId: string
}

export function AddAssessmentDialog({ courseId, courseName, semesterId, userId }: AddAssessmentDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [totalMarks, setTotalMarks] = useState("")
  const [obtainedMarks, setObtainedMarks] = useState("")
  const [weightage, setWeightage] = useState("")
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
      const assessmentData={
        course_id:courseId,
        user_id:userId,
        semester_id:semesterId,
        name:title,
        weightage:weightageNum,
        total_marks:totalMarksNum,
        marks_obtained:obtainedMarksNum,
      }
      await addAssessment(assessmentData)
      toast.success("Assessment added successfully!")
      setTitle("")
      setTotalMarks("")
      setObtainedMarks("")
      setWeightage("")
      setOpen(false)
      router.refresh()
    } catch (error) {
      if(error instanceof Error){
        toast.error(error.message)
      }else{
        toast.error("Failed to add assessment")
      }
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Assessment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Assessment</DialogTitle>
            <DialogDescription>
              Add an assessment for <span className="font-medium">{courseName}</span>
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
              {loading ? "Adding..." : "Add Assessment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
