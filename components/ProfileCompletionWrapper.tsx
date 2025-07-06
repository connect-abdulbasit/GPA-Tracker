"use client"

import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HashLoader } from "react-spinners"
import { useEffect, useState } from "react"
import { useProfileCompletion } from "@/hooks/useUserSync"

export function ProfileCompletionWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { profileComplete, loading, userLoggedIn } = useProfileCompletion()
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setIsComplete(profileComplete)
  }, [profileComplete])
  
  if (!userLoggedIn && !loading) {
    router.push("/sign-in")
  }
  // Don't show profile completion wrapper on onboarding page
  if (pathname === "/onboarding") {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80">
        <HashLoader color="#4F46E5" />
      </div>
    )
  }

  if (!isComplete && !loading) {
    return (
      <Card className="mx-auto max-w-md mt-8">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Complete Your Profile</CardTitle>
          </div>
          <CardDescription>
            Please complete your profile to access all features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We need some additional information to provide you with the best experience
          </p>
          <Button
            onClick={() => router.push("/onboarding")}
            className="w-full"
          >
            Complete Profile
          </Button>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}