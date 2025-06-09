import { auth } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";
import { AddCourseDialog } from "@/components/add-course-dialog";
import { CourseCard } from "@/components/course-card";
import { notFound } from "next/navigation";
import { fetchSemesterById } from "@/app/actions/semester";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SemesterDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { userId } = await auth();
  const semester = await fetchSemesterById(resolvedParams.id,userId!);

  if (!semester) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/semesters">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{semester.name}</h1>
          <p className="text-muted-foreground">
            Manage courses and track performance for this semester
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Semester GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{semester.gpa}</div>
            <p className="text-xs text-muted-foreground">Out of 4.0 scale</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{semester.courses.length}</div>
            <p className="text-xs text-muted-foreground">Courses enrolled</p>
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

      <div className="flex justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">Courses</h2>
        <div className="flex justify-between items-center">
          <AddCourseDialog semesterId={semester.id} />
        </div>
      </div>

      {semester.courses.length === 0 ? (
        <Card>
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle>No Courses Yet</CardTitle>
            <CardDescription>
              Add your first course to start tracking your GPA
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <AddCourseDialog semesterId={semester.id} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {semester.courses.map((course: any) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
