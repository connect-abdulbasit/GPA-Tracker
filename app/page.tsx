import Link from "next/link"
import { GraduationCap, TrendingUp, BarChart3, Calculator, Users, Shield, Zap, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { DeveloperProfile } from "@/components/developer-profile"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <span className="text-lg sm:text-xl font-bold">GPA Tracker</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              <DeveloperProfile variant="desktop" />
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button size="sm" className="hidden sm:inline-flex" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
              <Button variant="ghost" size="sm" className="sm:hidden" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-40"></div>

          {/* Moving Gradient Overlays */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-300/40 to-purple-300/40 dark:from-blue-400/30 dark:to-purple-400/30 rounded-full blur-3xl animate-float-slow"></div>
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-bl from-purple-300/40 to-pink-300/40 dark:from-purple-400/30 dark:to-pink-400/30 rounded-full blur-3xl animate-float-reverse"></div>
            <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-cyan-300/40 to-blue-300/40 dark:from-cyan-400/30 dark:to-blue-400/30 rounded-full blur-3xl animate-float-diagonal"></div>
            <div
              className="absolute top-1/4 left-1/2 w-64 h-64 bg-gradient-to-br from-indigo-300/30 to-violet-300/30 dark:from-indigo-400/25 dark:to-violet-400/25 rounded-full blur-3xl animate-float-slow"
              style={{ animationDelay: "5s" }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 sm:py-24 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              ✨ Track Your Academic Success
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Master Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                GPA Journey
              </span>
            </h1>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-gray-300 px-4 sm:px-0">
              The ultimate GPA tracking platform for university students. Monitor your academic progress, analyze
              trends, and achieve your educational goals with beautiful visualizations and smart insights.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/sign-up">
                  Start Tracking Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>Free Forever</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-green-500 mr-1" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-blue-500 mr-1" />
                <span>Trusted by Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to track your GPA
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Powerful features designed specifically for university students
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Smart Analytics</CardTitle>
                </div>
                <CardDescription>
                  Visualize your GPA trends with beautiful charts and get insights into your academic performance over
                  time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Calculator className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Auto Calculations</CardTitle>
                </div>
                <CardDescription>
                  Automatic SGPA and CGPA calculations with detailed breakdowns. Never worry about manual calculations
                  again.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Course Management</CardTitle>
                </div>
                <CardDescription>
                  Organize your courses by semester, track credit hours, and monitor individual course performance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle>Secure & Private</CardTitle>
                </div>
                <CardDescription>
                  Your academic data is encrypted and secure. Only you have access to your GPA information.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-pink-100 dark:bg-pink-900 rounded-lg">
                    <Zap className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <CardTitle>Lightning Fast</CardTitle>
                </div>
                <CardDescription>
                  Built with modern technology for instant loading and smooth performance across all devices.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <CardTitle>Grade Reference</CardTitle>
                </div>
                <CardDescription>
                  Built-in grade scale reference and GPA conversion tools to help you understand your academic standing.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white sm:text-4xl">Ready to take control of your GPA?</h2>
          <p className="mt-4 text-base sm:text-lg text-blue-100">
            Join thousands of students who are already tracking their academic success.
          </p>
          <div className="mt-6 sm:mt-8">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
              <Link href="/sign-up">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t">
        <div className="container mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 mb-6 sm:mb-8">
            <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <span className="text-lg sm:text-xl font-bold">GPA Tracker</span>
          </div>
          <div className="text-center space-y-4">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              © 2024 GPA Tracker. Built for students, by students.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <DeveloperProfile variant="desktop" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
