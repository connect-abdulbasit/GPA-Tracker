"use client"
import { gradeScale } from "@/lib/gpa-calculations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Info } from "lucide-react";
import { useUserData } from "@/hooks/useUserSync"
// import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { HashLoader } from "react-spinners";

export default function GradeChartPage() {
  const { userData, loading } = useUserData()
  // const router = useRouter()

  // useEffect(() => {
  //   if (!userData && !loading) {
  //     router.push("/sign-in")
  //   }
  // }, [userData, loading, router])

  if (loading) {
    return <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80">
      <HashLoader color="#4F46E5" />
    </div>  
  }

  // if (!userData) {
  //   return null
  // }

  return (
    <div className="space-y-4 sm:space-y-8">
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Grade Chart
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Reference chart for grade-to-GPA conversion on a 4.0 scale
        </p>
      </div>

      <Card className="mx-4 sm:mx-0">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5" />
            <CardTitle>Standard 4.0 GPA Scale</CardTitle>
          </div>
          <CardDescription>
            Use this reference when entering your course grades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {gradeScale.map((grade) => (
              <div
                key={grade.grade}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Badge
                    variant={
                      grade.gpa >= 3.5
                        ? "default"
                        : grade.gpa >= 3.0
                        ? "secondary"
                        : grade.gpa >= 2.5
                        ? "default"
                        : "destructive"
                    }
                    className={`text-lg font-bold min-w-[3rem] justify-center ${grade.gpa >= 2.5 && grade.gpa < 3.0 ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                  >
                    {grade.grade}
                  </Badge>
                  <div>
                    <div className="font-semibold">{grade.gpa.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">
                      {grade.range}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mx-4 sm:mx-0">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5" />
            <CardTitle>GPA Performance Levels</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Badge className="min-w-[5rem] justify-center">3.5 - 4.0</Badge>
                <span className="font-medium">Excellent</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="min-w-[5rem] justify-center">
                  3.0 - 3.4
                </Badge>
                <span className="font-medium">Good</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Badge variant="default" className="min-w-[5rem] justify-center bg-yellow-500 hover:bg-yellow-600">
                  2.5 - 2.9
                </Badge>
                <span className="font-medium">Average</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="destructive" className="min-w-[5rem] justify-center">
                  Below 2.5
                </Badge>
                <span className="font-medium">Needs Improvement</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
