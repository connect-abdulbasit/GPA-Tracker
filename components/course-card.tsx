"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, BookOpen, Trash2, SquarePen } from "lucide-react"
import { toast } from "sonner"
import { deleteCourse } from "@/app/actions/course"
import { EditCourseDialog } from "@/components/edit-course-dialog"

interface CourseCardProps {
  course: {
    id: string
    name: string
    credit_hours: number
    gpa: number
    semester_id: string
    type: string
  }
  onDataChange?: () => void
}

export function CourseCard({ course, onDataChange }: CourseCardProps) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this course?")) {
      return
    }

    setLoading(true)
    try {
      await deleteCourse(course.id)
      toast.success("Course deleted successfully!")
      
      if (onDataChange) {
        onDataChange()
      }
    } catch (error) {
      toast.error("Failed to delete course")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex-1">
            <CardTitle className="text-lg truncate">{course.name}</CardTitle>
            <CardDescription>{course.credit_hours} credit hours</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <SquarePen className="h-4 w-4 mr-2" />
                Edit Course
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} disabled={loading}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Course
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">GPA</span>
            </div>
            <Badge
              variant={course.gpa >= 3.5 ? "default" : course.gpa >= 3.0 ? "secondary" : "destructive"}
              className="text-lg font-bold"
            >
              {course.gpa.toFixed(2)}
            </Badge>
          </div>
        </CardContent>
      </Card>
      <EditCourseDialog 
        courseId={course.id}
        semesterId={course.semester_id}
        name={course.name}
        creditHours={course.credit_hours}
        gpa={course.gpa}
        courseType={course.type as "core" | "elective" | "non-credit"}
        isOngoing={false}
        open={open} 
        onOpenChange={setOpen}
        onCourseUpdated={onDataChange}
      />
    </>
  )
}
