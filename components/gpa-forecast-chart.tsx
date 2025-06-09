"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import type { ForecastResult } from "@/lib/gpa-forecast"

interface GPAForecastChartProps {
  forecastData: ForecastResult
  currentSemesterCount: number
}

export function GPAForecastChart({ forecastData, currentSemesterCount }: GPAForecastChartProps) {
  const chartData = [
    {
      semester: currentSemesterCount,
      current: forecastData.current_cgpa,
      projected: forecastData.current_cgpa,
      target: forecastData.target_cgpa,
      optimistic: forecastData.current_cgpa,
      realistic: forecastData.current_cgpa,
      conservative: forecastData.current_cgpa,
    },
    {
      semester: currentSemesterCount + 1,
      current: null,
      projected: forecastData.scenarios.realistic,
      target: forecastData.target_cgpa,
      optimistic: forecastData.scenarios.optimistic,
      realistic: forecastData.scenarios.realistic,
      conservative: forecastData.scenarios.conservative,
    },
    {
      semester: currentSemesterCount + 2,
      current: null,
      projected: forecastData.projected_cgpa,
      target: forecastData.target_cgpa,
      optimistic: forecastData.scenarios.optimistic,
      realistic: forecastData.scenarios.realistic,
      conservative: forecastData.scenarios.conservative,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="semester" label={{ value: "Semester", position: "insideBottom", offset: -5 }} />
        <YAxis domain={[0, 4]} label={{ value: "GPA", angle: -90, position: "insideLeft" }} />
        <Tooltip
          formatter={(value: any, name: string) => {
            if (value === null) return ["-", name]
            return [value.toFixed(2), name]
          }}
          labelFormatter={(label) => `Semester ${label}`}
        />

        <ReferenceLine y={forecastData.target_cgpa} stroke="#ef4444" strokeDasharray="5 5" label="Target" />

        <Line
          type="monotone"
          dataKey="current"
          stroke="#3b82f6"
          strokeWidth={3}
          name="Current CGPA"
          connectNulls={false}
          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
        />

        {/* Projected GPA line */}
        <Line
          type="monotone"
          dataKey="projected"
          stroke="#10b981"
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Projected CGPA"
          connectNulls={false}
          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
        />

        {/* Scenario lines */}
        <Line
          type="monotone"
          dataKey="optimistic"
          stroke="#f59e0b"
          strokeWidth={1}
          name="Optimistic (3.8 avg)"
          connectNulls={false}
          dot={{ fill: "#f59e0b", strokeWidth: 1, r: 3 }}
        />

        <Line
          type="monotone"
          dataKey="realistic"
          stroke="#8b5cf6"
          strokeWidth={1}
          name="Realistic (3.3 avg)"
          connectNulls={false}
          dot={{ fill: "#8b5cf6", strokeWidth: 1, r: 3 }}
        />

        <Line
          type="monotone"
          dataKey="conservative"
          stroke="#6b7280"
          strokeWidth={1}
          name="Conservative (2.8 avg)"
          connectNulls={false}
          dot={{ fill: "#6b7280", strokeWidth: 1, r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
