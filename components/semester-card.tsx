"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, BookOpen, TrendingUp, Trash2, SquarePen } from "lucide-react"
import Link from "next/link"
import { AddCourseDialog } from "@/components/add-course-dialog"
import { toast } from "sonner"
import { deleteSemester } from "@/app/actions/semester"
import { EditSemesterDialog } from "./edit-semester-dialog"

interface SemesterCardProps {
  semester: {
    id: string
    user_id: string
    name: string
    gpa: number
    total_credits: number
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

export function SemesterCard({ semester, userId }: SemesterCardProps) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

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

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">{semester.name}</CardTitle>
            <CardDescription>
              {semester.courses.length} courses • {semester.total_credits} credits
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">SGPA</span>
            </div>
            <Badge variant={semester.gpa >= 3.5 ? "default" : semester.gpa >= 3.0 ? "secondary" : "destructive"}>{semester.gpa.toFixed(2)}</Badge>
          </div>

          <div className="space-y-2">
            {semester.courses.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No courses added yet</p>
            ) : (
              semester.courses.slice(0, 3).map((course) => (
                <div key={course.id} className="flex justify-between items-center text-sm">
                  <span className="truncate flex-1 mr-2">{course.name}</span>
                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-muted-foreground">{course.credit_hours}cr</span>
                    <Badge variant="outline">{course.gpa.toFixed(2)}</Badge>
                  </div>
                </div>
              ))
            )}
            {semester.courses.length > 3 && (
              <p className="text-xs text-muted-foreground text-center">+{semester.courses.length - 3} more courses</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <AddCourseDialog semesterId={semester.id} />
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
