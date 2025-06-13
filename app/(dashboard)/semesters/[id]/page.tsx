import { auth } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  TrendingUp,
  Plus,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { AddCourseDialog } from "@/components/add-course-dialog";
import { CourseCard } from "@/components/course-card";
import { notFound } from "next/navigation";
import { fetchSemesterById } from "@/app/actions/semester";
import { SemesterActions } from "@/components/semester-actions";
import { OngoingCourseCard } from "@/components/ongoing-course";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SemesterDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { userId } = await auth();
  const semester = await fetchSemesterById(resolvedParams.id, userId!);
  const isOngoing = semester.status === "ongoing";
  if (!semester) {
    notFound();
  }
  const dummyCourse = {
    id: "1",
    name: "Introduction to Computer Science",
    credit_hours: 3,
    course_type: "Core",
    assessments: [
      {
        id: "1",
        title: "Midterm Exam",
        obtained_marks: 85,
        total_marks: 100,
        weightage: 30
      },
      {
        id: "2",
        title: "Final Project",
        obtained_marks: 90,
        total_marks: 100,
        weightage: 40
      },
      {
        id: "3",
        title: "Lab Assignments",
        obtained_marks: 95,
        total_marks: 100,
        weightage: 30
      }
    ]
  }
  console.log(semester?.courses[0]?.assessments)
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/semesters">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {semester.name}
            </h1>
            <Badge variant={isOngoing ? "default" : "secondary"}>
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
          <p className="text-muted-foreground">
            {isOngoing
              ? "Manage courses and track assessments for this ongoing semester"
              : "Manage courses and track performance for this completed semester"}
          </p>
        </div>
        <SemesterActions
          semesterId={semester.id}
          semesterName={semester.name}
        />
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 sm:px-0">
        {!isOngoing && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Semester GPA
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{semester.gpa.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Out of 4.0 scale</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{semester.courses.length}</div>
            <p className="text-xs text-muted-foreground">
              {isOngoing ? "Courses enrolled" : "Courses completed"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Hours</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{semester.total_credits}</div>
            <p className="text-xs text-muted-foreground">Total credits</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl font-bold">Courses</h2>
        <div className="w-full sm:w-auto">
          <AddCourseDialog semesterId={semester.id} isOngoing={isOngoing} />
        </div>
      </div>

      {semester.courses.length === 0 ? (
        <Card className="mx-4 sm:mx-0">
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle>No Courses Yet</CardTitle>
            <CardDescription>
              {isOngoing
                ? "Add your first course to start tracking assessments"
                : "Add your first course to start tracking your GPA"}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <AddCourseDialog semesterId={semester.id} isOngoing={isOngoing} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
          {semester.courses.map((course: any) =>
            (isOngoing||course.assessments.length>0) ? (
              <OngoingCourseCard key={course.id} course={{...course, assessments: course.assessments||[]}} />
            ) : (
              <CourseCard key={course.id} course={course} />
            )
          )}
        </div>
      )}
    </div>
  );
}
