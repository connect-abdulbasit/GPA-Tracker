"use client"
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
import { gradeScale } from "@/lib/gpa-calculations";
import { useUserData } from "@/hooks/useUserSync"
import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { HashLoader } from "react-spinners"

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function SemesterDetailsPage({ params }: PageProps) {
  const { userData, loading } = useUserData()
  const router = useRouter()
  const [semester, setSemester] = useState<any>(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [semesterId, setSemesterId] = useState<string>("")

  const fetchSemesterData = useCallback(async () => {
    if (userData?.id && semesterId) {
      try {
        setDataLoading(true)
        const semesterData = await fetchSemesterById(semesterId, userData.id)
        if (!semesterData) {
          notFound()
        }
        setSemester(semesterData)
      } catch (error) {
        console.error('Error fetching semester:', error)
      } finally {
        setDataLoading(false)
      }
    }
  }, [userData?.id, semesterId])

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setSemesterId(resolvedParams.id)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (!loading && userData?.id && semesterId) {
      fetchSemesterData()
    }
  }, [fetchSemesterData, loading, userData?.id, semesterId])

  useEffect(() => {
    if (!userData && !loading) {
      router.push("/sign-in")
    }
  }, [userData, loading, router])

  if (loading || dataLoading) {
    return <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80">
      <HashLoader color="#4F46E5" />
    </div>
  }

  if (!userData || !semester) {
    return null
  }

  const isOngoing = semester.status === "ongoing";

  const calculateOngoingSGPA = () => {
    if (!isOngoing) return null;
    
    // Filter courses that have 100% weightage completed
    const completedCourses = semester.courses.filter((course: any) => {
      const totalWeightage = course.assessments?.reduce((sum: number, assessment: any) => 
        sum + assessment.weightage, 0) || 0;
      return totalWeightage === 100;
    });

    if (completedCourses.length === 0) return null;

    // Calculate SGPA only for courses with 100% weightage
    const totalPoints = completedCourses.reduce((sum: number, course: any) => {
      const totalWeightedScore = course.assessments.reduce((sum: number, assessment: any) => {
        const percentage = (assessment.marks_obtained / assessment.total_marks) * 100;
        return sum + (percentage * assessment.weightage) / 100;
      }, 0);
      
      // Convert percentage to GPA
      const roundedPercentage = Math.round(totalWeightedScore);
      let courseGPA = 0;
      for (const grade of gradeScale) {
        const range = grade.range.split(" - ");
        if (range.length === 1) {
          if (range[0].endsWith("+") && roundedPercentage >= parseInt(range[0])) {
            courseGPA = grade.gpa;
            break;
          }
          if (range[0].startsWith("<") && roundedPercentage < parseInt(range[0].split("<")[1])) {
            courseGPA = grade.gpa;
            break;
          }
        } else {
          const min = parseFloat(range[0]);
          const max = parseFloat(range[1]);
          if (roundedPercentage >= min && roundedPercentage <= max) {
            courseGPA = grade.gpa;
            break;
          }
        }
      }
      
      return sum + (courseGPA * course.credit_hours);
    }, 0);

    const totalCredits = completedCourses.reduce((sum: number, course: any) => 
      sum + course.credit_hours, 0);

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

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
        {!isOngoing ? (
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
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current SGPA
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {(() => {
                const ongoingSGPA = calculateOngoingSGPA();
                return ongoingSGPA !== null ? (
                  <>
                    <div className="text-2xl font-bold">{ongoingSGPA.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                      Based on completed courses (100% weightage)
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">-</div>
                    <p className="text-xs text-muted-foreground">
                      No courses completed yet
                    </p>
                  </>
                );
              })()}
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
          <AddCourseDialog 
            semesterId={semester.id} 
            isOngoing={isOngoing} 
            onCourseAdded={fetchSemesterData}
          />
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
            <AddCourseDialog 
              semesterId={semester.id} 
              isOngoing={isOngoing} 
              onCourseAdded={fetchSemesterData}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
          {semester.courses
            .map((course: any) => ({
              ...course,
              totalWeightage: course.assessments?.reduce((sum: number, assessment: any) => 
                sum + assessment.weightage, 0) || 0
            }))
            .sort((a: any, b: any) => b.totalWeightage - a.totalWeightage)
            .map((course: any) =>
              (isOngoing||course.assessments.length>0) ? (
                <OngoingCourseCard key={course.id} course={{...course, assessments: course.assessments||[]}} isOngoing={isOngoing} />
              ) : (
                <CourseCard key={course.id} course={course} />
              )
            )}
        </div>
      )}
    </div>
  );
}
