"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts"

interface ImprovedScenariosChartProps {
  currentCGPA: number
  targetCGPA: number
  scenarios: {
    optimistic: number
    realistic: number
    conservative: number
  }
}

export function ImprovedScenariosChart({ currentCGPA, targetCGPA, scenarios }: ImprovedScenariosChartProps) {
  const data = [
    {
      name: "Current",
      value: currentCGPA,
      color: "#3b82f6", // blue
    },
    {
      name: "Conservative",
      value: scenarios.conservative,
      color: "#6b7280", // gray
      description: "2.8 avg GPA",
    },
    {
      name: "Realistic",
      value: scenarios.realistic,
      color: "#8b5cf6", // purple
      description: "3.3 avg GPA",
    },
    {
      name: "Optimistic",
      value: scenarios.optimistic,
      color: "#f59e0b", // amber
      description: "3.8 avg GPA",
    },
    {
      name: "Target",
      value: targetCGPA,
      color: "#ef4444", // red
      isTarget: true,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={(props) => {
            const { x, y, payload } = props
            const item = data.find((d) => d.name === payload.value)
            return (
              <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize={12}>
                  {payload.value}
                </text>
                {item?.description && (
                  <text x={0} y={0} dy={34} textAnchor="middle" fill="#999" fontSize={10}>
                    {item.description}
                  </text>
                )}
              </g>
            )
          }}
        />
        <YAxis
          domain={[0, 4]}
          ticks={[0, 1, 2, 3, 4]}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `${value.toFixed(1)}`}
        />
        <Tooltip
          formatter={(value: number) => [`${value.toFixed(2)} GPA`, ""]}
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
        />
        <ReferenceLine
          y={targetCGPA}
          stroke="#ef4444"
          strokeDasharray="5 5"
          label={{
            value: `Target: ${targetCGPA.toFixed(2)}`,
            position: "top",
            fill: "#ef4444",
            fontSize: 12,
          }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              fillOpacity={entry.isTarget ? 0.2 : 0.8}
              stroke={entry.isTarget ? "#ef4444" : entry.color}
              strokeWidth={entry.isTarget ? 2 : 0}
              strokeDasharray={entry.isTarget ? "5 5" : "0"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
