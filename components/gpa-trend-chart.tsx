"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface GPATrendChartProps {
  data: Array<{
    name: string
    sgpa: number
    courses: number
  }>
}

export function GPATrendChart({ data }: GPATrendChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No data available. Add some semesters to see your GPA trend.
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 4]} />
        <Tooltip
          formatter={(value: number) => [value.toFixed(2), "SGPA"]}
          labelFormatter={(label) => `Semester: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="sgpa"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--primary))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
