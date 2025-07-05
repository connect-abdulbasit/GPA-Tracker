"use client"

import { GraduationCap, ArrowLeft, Star, Shield, Zap, Mail, Lock, User, Github, Chrome } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { signUp, authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isGitHubLoading, setIsGitHubLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsEmailLoading(true)
    setError("")

    try {
      const result = await signUp.email({ name, email, password })
      if (result.error) {
        setError(result.error.message || "An error occurred during sign up")
      } else {
        router.push("/onboarding")
      }
    } catch (err) {
      setError("An error occurred during sign up")
    } finally {
      setIsEmailLoading(false)
    }
  }

  const handleGitHubSignUp = async () => {
    setIsGitHubLoading(true)
    setError("")
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      newUserCallbackURL: "/dashboard",
    })
  }

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true)
    setError("")
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      newUserCallbackURL: "/dashboard",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50 dark:opacity-30"></div>

        {/* Moving Gradient Overlays */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-purple-300/30 dark:from-blue-400/20 dark:to-purple-400/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-bl from-purple-300/30 to-pink-300/30 dark:from-purple-400/20 dark:to-pink-400/20 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-cyan-300/30 to-blue-300/30 dark:from-cyan-400/20 dark:to-blue-400/20 rounded-full blur-3xl animate-float-diagonal"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">GPA Tracker</span>
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
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Left Side - Benefits */}
          <div className="lg:order-1 order-2 space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Start Your Academic Journey
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Join thousands of students who are already mastering their GPA with our powerful tracking tools.
              </p>
            </div>

            <div className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardContent className="flex items-center space-x-3 p-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Star className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                  <h3 className="font-semibold">Free Forever</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No hidden fees, no premium plans. Everything is free.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="flex items-center space-x-3 p-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure & Private</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your academic data is encrypted and only accessible by you.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="flex items-center space-x-3 p-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Assessment Tracking</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Track individual assessments for ongoing courses.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">What happens after sign-up?</h3>
              <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>1. Complete your academic profile</li>
                <li>2. Add your university and department</li>
                <li>3. Start tracking your GPA journey!</li>
              </ol>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="lg:order-2 order-1 flex flex-col items-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Enter your details to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isEmailLoading || isGitHubLoading || isGoogleLoading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isEmailLoading || isGitHubLoading || isGoogleLoading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isEmailLoading || isGitHubLoading || isGoogleLoading}
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="text-sm text-red-600 dark:text-red-400">
                      {error}
                    </div>
                  )}
                  <Button type="submit" className="w-full" disabled={isEmailLoading || isGitHubLoading || isGoogleLoading}>
                    {isEmailLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={handleGitHubSignUp}
                    disabled={isEmailLoading || isGitHubLoading || isGoogleLoading}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    {isGitHubLoading ? "Connecting..." : "GitHub"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleGoogleSignUp}
                    disabled={isEmailLoading || isGitHubLoading || isGoogleLoading}
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    {isGoogleLoading ? "Connecting..." : "Google"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/sign-in" className="font-medium text-primary hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
