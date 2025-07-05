"use client"

import { GraduationCap, ArrowLeft, Star, Shield, Zap, BookOpen, TrendingUp, Users, Github, Chrome } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [isGitHubLoading, setIsGitHubLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleGitHubSignUp = async () => {
    setIsGitHubLoading(true)
    setError("")
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
        errorCallbackURL: "/error",
        newUserCallbackURL: "/dashboard",
      })
    } catch (err) {
      setError("Failed to sign up with GitHub. Please try again.")
      setIsGitHubLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true)
    setError("")
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        errorCallbackURL: "/error",
        newUserCallbackURL: "/dashboard",
      })
    } catch (err) {
      setError("Failed to sign up with Google. Please try again.")
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
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

      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-lg sm:text-xl font-bold">GPA Tracker</span>
            </Link>
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Sign Up Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          
          {/* Left Side - Benefits */}
          <div className="lg:order-1 order-2 space-y-6 sm:space-y-8">
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-4">
                ✨ Join the Community
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                Start Your
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Academic Journey
                </span>
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Join thousands of students who are already mastering their GPA with our powerful tracking platform.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6">
                  <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Star className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">Free Forever</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No hidden fees, no premium plans. Everything is free.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6">
                  <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">Secure & Private</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your academic data is encrypted and only accessible by you.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6">
                  <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">Smart Analytics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Track trends, visualize progress, and get insights.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6">
                  <div className="p-2 sm:p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">Course Management</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Organize courses and track individual assessments.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-medium text-blue-900 dark:text-blue-100">What happens after sign-up?</h3>
              </div>
              <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>1. Complete your academic profile</li>
                <li>2. Add your university and department</li>
                <li>3. Start tracking your GPA journey!</li>
              </ol>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="lg:order-2 order-1 flex flex-col items-center">
            <Card className="w-full max-w-md shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-xl sm:text-2xl">Create Account</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Choose your preferred sign-up method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <Button
                    className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    onClick={handleGitHubSignUp}
                    disabled={isGitHubLoading || isGoogleLoading}
                  >
                    <Github className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    {isGitHubLoading ? (
                      <span className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Connecting...
                      </span>
                    ) : (
                      "Continue with GitHub"
                    )}
                  </Button>

                  <Button
                    className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    onClick={handleGoogleSignUp}
                    disabled={isGitHubLoading || isGoogleLoading}
                  >
                    <Chrome className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    {isGoogleLoading ? (
                      <span className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Connecting...
                      </span>
                    ) : (
                      "Continue with Google"
                    )}
                  </Button>
                </div>

                <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/sign-in" className="font-medium text-primary hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Social Proof */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
                Trusted by students worldwide
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 opacity-60 text-xs">
                <span className="font-medium">10,000+</span>
                <span>•</span>
                <span className="font-medium">Active Students</span>
                <span>•</span>
                <span className="font-medium">200+ Universities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}