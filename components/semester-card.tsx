"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { calculateSGPA } from "@/lib/gpa-calculations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, BookOpen, TrendingUp, Trash2 } from "lucide-react"
import Link from "next/link"
import { AddCourseDialog } from "@/components/add-course-dialog"
import { toast } from "sonner"

interface SemesterCardProps {
  semester: {
    id: string
    user_id: string
    name: string
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
}

export function SemesterCard({ semester }: SemesterCardProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const sgpa = calculateSGPA(semester.courses)
  const totalCredits = semester.courses.reduce((sum, course) => sum + course.credit_hours, 0)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this semester? This will also delete all courses in it.")) {
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.from("semesters").delete().eq("id", semester.id)

      if (error) throw error

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg">{semester.name}</CardTitle>
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
          <Badge variant={sgpa >= 3.5 ? "default" : sgpa >= 3.0 ? "secondary" : "destructive"}>{sgpa.toFixed(2)}</Badge>
        </div>

        <div className="space-y-2">
          {semester.courses.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No courses added yet</p>
          ) : (
            semester.courses.slice(0, 3).map((course) => (
              <div key={course.id} className="flex justify-between items-center text-sm">
                <span className="truncate">{course.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">{course.credit_hours}cr</span>
                  <Badge variant="outline">{course.gpa.toFixed(1)}</Badge>
                </div>
              </div>
            ))
          )}
          {semester.courses.length > 3 && (
            <p className="text-xs text-muted-foreground text-center">+{semester.courses.length - 3} more courses</p>
          )}
        </div>

        <div className="flex space-x-2">
          <AddCourseDialog semesterId={semester.id} />
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link href={`/semesters/${semester.id}`}>
              <BookOpen className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
