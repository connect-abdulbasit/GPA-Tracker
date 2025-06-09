"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface CourseTypeGPAChartProps {
  data: Array<{
    gpa: number
    credit_hours: number
    type: string
    semesterName: string|null
  }>
}

export function CourseTypeGPAChart({ data }: CourseTypeGPAChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No courses available. Add some courses to see the course type comparison.
      </div>
    )
  }

  // Calculate average GPA and other stats for core and elective courses
  const coreStats = data.filter((course) => course.type === "core")
  const electiveStats = data.filter((course) => course.type === "elective")

  const calculateStats = (courses: typeof data) => {
    if (courses.length === 0) return { avgGPA: 0, totalCredits: 0, courseCount: 0 }

    const totalPoints = courses.reduce((sum, course) => sum + course.gpa * course.credit_hours, 0)
    const totalCredits = courses.reduce((sum, course) => sum + course.credit_hours, 0)
    const avgGPA = totalCredits > 0 ? totalPoints / totalCredits : 0

    return {
      avgGPA,
      totalCredits,
      courseCount: courses.length,
    }
  }

  const coreData = calculateStats(coreStats)
  const electiveData = calculateStats(electiveStats)

  const chartData = [
    {
      type: "Core Courses",
      avgGPA: coreData.avgGPA,
      courseCount: coreData.courseCount,
      totalCredits: coreData.totalCredits,
      color: "#3b82f6", // Blue
    },
    {
      type: "Elective Courses",
      avgGPA: electiveData.avgGPA,
      courseCount: electiveData.courseCount,
      totalCredits: electiveData.totalCredits,
      color: "#10b981", // Green
    },
  ].filter((item) => item.courseCount > 0) // Only show types that have courses

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="text-muted-foreground">Average GPA: </span>
            <span className="font-semibold">{data.avgGPA.toFixed(2)}</span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Courses: </span>
            <span className="font-semibold">{data.courseCount}</span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Total Credits: </span>
            <span className="font-semibold">{data.totalCredits}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis
            domain={[0, 4]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.toFixed(1)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="avgGPA" radius={[4, 4, 0, 0]} barSize={80}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Detailed comparison stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="font-medium">Core Courses</span>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>
              Average GPA: <span className="font-semibold text-foreground">{coreData.avgGPA.toFixed(2)}</span>
            </div>
            <div>
              Courses: <span className="font-semibold text-foreground">{coreData.courseCount}</span>
            </div>
            <div>
              Credits: <span className="font-semibold text-foreground">{coreData.totalCredits}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="font-medium">Elective Courses</span>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>
              Average GPA: <span className="font-semibold text-foreground">{electiveData.avgGPA.toFixed(2)}</span>
            </div>
            <div>
              Courses: <span className="font-semibold text-foreground">{electiveData.courseCount}</span>
            </div>
            <div>
              Credits: <span className="font-semibold text-foreground">{electiveData.totalCredits}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance comparison insight */}
      {coreData.courseCount > 0 && electiveData.courseCount > 0 && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-sm">
            {coreData.avgGPA > electiveData.avgGPA ? (
              <span>
                📚 You perform{" "}
                <span className="font-semibold text-blue-600">
                  {(coreData.avgGPA - electiveData.avgGPA).toFixed(2)} points better
                </span>{" "}
                in core courses than electives.
              </span>
            ) : electiveData.avgGPA > coreData.avgGPA ? (
              <span>
                🎯 You perform{" "}
                <span className="font-semibold text-green-600">
                  {(electiveData.avgGPA - coreData.avgGPA).toFixed(2)} points better
                </span>{" "}
                in elective courses than core courses.
              </span>
            ) : (
              <span>
                ⚖️ Your performance in core and elective courses is{" "}
                <span className="font-semibold">equally balanced</span>.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
