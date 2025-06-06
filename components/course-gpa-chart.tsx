"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface CourseGPAChartProps {
  data: Array<{
    name: string
    gpa: number
    credit_hours: number
    semesterName: string
  }>
}

export function CourseGPAChart({ data }: CourseGPAChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No courses available. Add some courses to see the performance chart.
      </div>
    )
  }

  // Take only the latest 10 courses to avoid overcrowding
  const recentCourses = data.slice(-10)

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={recentCourses}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
        <YAxis domain={[0, 4]} />
        <Tooltip
          formatter={(value: number, name, props) => [
            value.toFixed(2),
            "GPA",
            `Credits: ${props.payload.credit_hours}`,
            `Semester: ${props.payload.semesterName}`,
          ]}
        />
        <Bar dataKey="gpa" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
