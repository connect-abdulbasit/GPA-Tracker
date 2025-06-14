"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, AlertCircle, CheckCircle, Plus, Trash2 } from "lucide-react"
import type { ForecastCourse, ForecastResult } from "@/lib/gpa-forecast"
import { calculateForecast, generateSampleFutureCourses } from "@/lib/gpa-forecast"
import { GPAForecastChart } from "./gpa-forecast-chart"
import { ImprovedScenariosChart } from "./improved-scenerios-chart"

interface GoalTrackerProps {
  semesters: any[]
}

export function GoalTracker({ semesters }: GoalTrackerProps) {
  const currentCGPA =
    semesters.length > 0
      ? semesters.reduce((sum, s) => sum + s.gpa * s.total_credits, 0) /
        semesters.reduce((sum, s) => sum + s.total_credits, 0)
      : 0

  const [targetGPA, setTargetGPA] = useState<string>(currentCGPA.toFixed(2))
  const [futureCourses, setFutureCourses] = useState<ForecastCourse[]>(generateSampleFutureCourses())

  const forecast: ForecastResult = calculateForecast(semesters, Number.parseFloat(targetGPA) || currentCGPA, futureCourses)

  const progressPercentage = Math.min((currentCGPA / Number.parseFloat(targetGPA)) * 100, 100)

  const addCourse = () => {
    const newCourse: ForecastCourse = {
      id: `future-${Date.now()}`,
      name: "",
      credit_hours: 3,
      expected_gpa: 0,
      semester_name: "Future Semester",
    }
    setFutureCourses([...futureCourses, newCourse])
  }

  const updateCourse = (id: string, field: keyof ForecastCourse, value: string | number) => {
    setFutureCourses((courses) => courses.map((course) => (course.id === id ? { ...course, [field]: value } : course)))
  }

  const removeCourse = (id: string) => {
    setFutureCourses((courses) => courses.filter((course) => course.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Goal Setting */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle>GPA Goal Tracker</CardTitle>
          </div>
          <CardDescription>Set your target CGPA and track your progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="target-gpa">Target CGPA</Label>
              <Input
                id="target-gpa"
                type="number"
                min="0"
                max="4"
                step="0.1"
                value={targetGPA}
                onChange={(e) => setTargetGPA(e.target.value)}
                placeholder="3.5"
              />
            </div>
            <div className="space-y-2">
              <Label>Current Progress</Label>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current CGPA: {currentCGPA.toFixed(2)}</span>
                  <span>Target: {targetGPA}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">{progressPercentage.toFixed(2)}% of target achieved</p>
              </div>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-0 bg-blue-50 dark:bg-blue-950">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Projected CGPA</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{forecast.projected_cgpa.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-green-50 dark:bg-green-950">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Required Avg GPA</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{forecast.average_gpa_needed.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-orange-50 dark:bg-orange-950">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">Achievable</span>
                </div>
                <Badge variant={forecast.is_achievable ? "default" : "destructive"}>
                  {forecast.is_achievable ? "Yes" : "No"}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Achievement Status */}
          {!forecast.is_achievable && (
            <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-800 dark:text-red-200">Target Not Achievable</span>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                Your target CGPA requires an average of {forecast.average_gpa_needed.toFixed(2)} in future courses,
                which exceeds the maximum possible GPA of 4.0. Consider adjusting your target or adding more courses.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle>GPA Forecast</CardTitle>
          <CardDescription>Projected CGPA based on different performance scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <GPAForecastChart forecastData={forecast} currentSemesterCount={semesters.length} />
        </CardContent>
      </Card>

      {/* Future Courses Planning */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Future Courses Planning</CardTitle>
              <CardDescription>Plan your upcoming courses and expected grades</CardDescription>
            </div>
            <Button onClick={addCourse} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {futureCourses.map((course) => (
              <div key={course.id} className="grid gap-4 md:grid-cols-5 items-end p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label>Course Name</Label>
                  <Input
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                    placeholder="Course name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Credit Hours</Label>
                  <Input
                    type="number"
                    min="0"
                    max="4"
                    value={course.credit_hours}
                    onChange={(e) => updateCourse(course.id, "credit_hours", Number.parseInt(e.target.value) || 3)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Expected GPA</Label>
                  <Input
                    type="number"
                    max="4.00"
                    min="0"
                    step="0.01"
                    value={course.expected_gpa || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = Number.parseFloat(value);
                      if (value === "") {
                        updateCourse(course.id, "expected_gpa", "");
                      } else if (numValue >= 0 && numValue <= 4.00) {
                        updateCourse(course.id, "expected_gpa", Number(numValue.toFixed(2)));
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Semester</Label>
                  <Input
                    value={course.semester_name}
                    onChange={(e) => updateCourse(course.id, "semester_name", e.target.value)}
                    placeholder="Semester name"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeCourse(course.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {futureCourses.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No future courses planned yet.</p>
                <p className="text-sm">Add courses to see your GPA forecast.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Improved Scenarios Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Scenarios</CardTitle>
          <CardDescription>See how different performance levels affect your CGPA</CardDescription>
        </CardHeader>
        <CardContent>
          <ImprovedScenariosChart
            currentCGPA={currentCGPA}
            targetCGPA={Number.parseFloat(targetGPA) || 3.5}
            scenarios={forecast.scenarios}
          />
        </CardContent>
      </Card>
    </div>
  )
}
