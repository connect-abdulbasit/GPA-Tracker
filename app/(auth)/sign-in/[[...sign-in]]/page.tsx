import { SignIn } from "@clerk/nextjs"
import { GraduationCap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignInPage() {
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

      {/* Sign In Content */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome Back!</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Sign in to continue tracking your academic progress</p>
          </div>

          <div className="w-full max-w-md">
            <SignIn
              routing="path"
              path="/sign-in"
              redirectUrl="/dashboard"
              signUpUrl="/sign-up"
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-lg border-0",
                },
              }}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link href="/sign-up" className="font-medium text-primary hover:underline">
                Sign up for free
              </Link>
            </p>
          </div>

          <div className="mt-6 bg-blue-50 dark:bg-blue-950 p-4 rounded-lg max-w-md">
            <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
              <strong>New users:</strong> After signing up, you'll complete your academic profile with university and
              department information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
