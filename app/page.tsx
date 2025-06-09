import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { SignIn } from "@clerk/nextjs"
import { GraduationCap, TrendingUp, BarChart3, Calculator } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function HomePage() {
  const { userId } = await auth()

  if (userId) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <GraduationCap className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">GPA Tracker</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Track your academic progress with ease. Monitor your GPA across semesters, analyze trends, and stay on top
            of your academic goals.
          </p>
          <div className="flex justify-center">
            <SignIn routing="hash" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Track Progress</CardTitle>
              <CardDescription>Monitor your GPA trends across multiple semesters</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Visual Analytics</CardTitle>
              <CardDescription>Beautiful charts and graphs to visualize your academic performance</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Calculator className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Auto Calculations</CardTitle>
              <CardDescription>Automatic SGPA and CGPA calculations with detailed breakdowns</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
