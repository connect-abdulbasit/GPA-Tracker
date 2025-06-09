"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface CourseGPAChartProps {
  data: Array<{
    name: string
    gpa: number
    credit_hours: number
    semesterName: string | null
    type: string
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

  const courseStats = data.reduce((acc, course) => {
    if (course.type === 'non-credit') return acc;
    
    if (!acc[course.type]) {
      acc[course.type] = {
        totalGPA: 0,
        count: 0,
        totalCredits: 0
      };
    }
    
    acc[course.type].totalGPA += course.gpa * course.credit_hours;
    acc[course.type].totalCredits += course.credit_hours;
    acc[course.type].count += 1;
    
    return acc;
  }, {} as Record<string, { totalGPA: number; count: number; totalCredits: number }>);

  const chartData = Object.entries(courseStats).map(([type, stats]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    gpa: Number((stats.totalGPA / stats.totalCredits).toFixed(2)),
    count: stats.count,
    totalCredits: stats.totalCredits
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
        <XAxis 
          dataKey="type" 
          tick={{ fill: "hsl(var(--foreground))" }}
          axisLine={{ stroke: "hsl(var(--border))" }}
        />
        <YAxis 
          domain={[0, 4]} 
          tick={{ fill: "hsl(var(--foreground))" }}
          axisLine={{ stroke: "hsl(var(--border))" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "6px",
          }}
          formatter={(value: number, name: string, props: any) => [
            value.toFixed(2),
            name === "gpa" ? "Average GPA" : name,
            `Total Courses: ${props.payload.count}`,
            `Total Credits: ${props.payload.totalCredits}`,
          ]}
        />
        <Legend />
        <Bar 
          dataKey="gpa" 
          fill="hsl(var(--primary))" 
          radius={[4, 4, 0, 0]} 
          name="Average GPA"
          maxBarSize={60}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
