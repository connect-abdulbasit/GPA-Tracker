"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, BookOpen, TrendingUp, Trash2, Clock, CheckCircle, SquarePen } from "lucide-react"
import Link from "next/link"
import { AddCourseDialog } from "@/components/add-course-dialog"
import { toast } from "sonner"
import { deleteSemester, marksAsCompleted } from "@/app/actions/semester"
import { EditSemesterDialog } from "./edit-semester-dialog"
import { calculateSGPA } from "@/lib/gpa-calculations"

interface SemesterCardProps {
  semester: {
    id: string
    user_id: string
    name: string
    gpa: number
    total_credits: number
    status: string
    created_at: Date
    updated_at: Date
    courses: {
      id: string
      name: string
      credit_hours: number
      gpa: number
      semester_id: string
      user_id: string
      created_at: Date
      updated_at: Date
    }[]
  }
  userId: string
}

export function SemesterCard({ semester,userId }: SemesterCardProps) {
  const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
  const router = useRouter()

  const isOngoing = semester.status === "ongoing"
  const completedCourses = semester.courses.filter((course) => course.gpa !== null)
  const sgpa = calculateSGPA(completedCourses)
  const totalCredits = semester.courses.reduce((sum, course) => sum + course.credit_hours, 0)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this semester? This will also delete all courses in it.")) {
      return
    }

    setLoading(true)
    try {
      await deleteSemester(semester.id, userId)

      toast.success("Semester deleted successfully!")
      router.refresh()
    } catch (error) {
      toast.error("Failed to delete semester")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkCompleted = async () => {
    if (!confirm("Mark this semester as completed? You won't be able to add more assessments.")) {
      return
    }
    setLoading(true)
    try {
      await marksAsCompleted(semester.id, userId)

      toast.success("Semester marked as completed!")
      router.refresh()
    } catch (error) {
      if(error instanceof Error ){
        toast.error(error.message)
        return
      }
      toast.error("Failed to update semester status")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <div className="flex items-center space-x-2">
            <CardTitle className="text-lg">{semester.name}</CardTitle>
            <Badge variant={isOngoing ? "default" : "secondary"} className="text-xs">
              {isOngoing ? (
                <>
                  <Clock className="h-3 w-3 mr-1" />
                  Ongoing
                </>
              ) : (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </>
              )}
            </Badge>
          </div>
          <CardDescription>
            {semester.courses.length} courses • {totalCredits} credits
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isOngoing && (
              <DropdownMenuItem onClick={handleMarkCompleted} disabled={loading}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Completed
              </DropdownMenuItem>
            )}
             <DropdownMenuItem onClick={() => setOpen(true)}>
                <SquarePen className="h-4 w-4 mr-2" />
                Edit Semester
              </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} disabled={loading}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Semester
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isOngoing && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">SGPA</span>
            </div>
              <Badge variant={semester.gpa >= 3.5 ? "default" : semester.gpa >= 3.0 ? "secondary" : "destructive"}>{semester.gpa.toFixed(2)}</Badge>
          </div>
        )}

        <div className="space-y-2">
          {semester.courses.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No courses added yet</p>
          ) : (
            semester.courses.slice(0, 3).map((course) => (
              <div key={course.id} className="flex justify-between items-center text-sm">
                <span className="truncate">{course.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">{course.credit_hours}cr</span>
                  {semester.status === "completed" ? (
                    <Badge variant="outline">{course.gpa.toFixed(2)}</Badge>
                  ) : (
                    <Badge variant="secondary">Ongoing</Badge>
                  )}
                </div>
              </div>
            ))
          )}
          {semester.courses.length > 3 && (
            <p className="text-xs text-muted-foreground text-center">+{semester.courses.length - 3} more courses</p>
          )}
        </div>

         <div className="flex flex-col sm:flex-row gap-2">
          <AddCourseDialog semesterId={semester.id} isOngoing={isOngoing} />
          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
              <Link href={`/semesters/${semester.id}`} className="flex items-center justify-center">
              <BookOpen className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
      <EditSemesterDialog
        semesterId={semester.id}
        currentName={semester.name}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}
