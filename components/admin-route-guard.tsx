"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUserRole } from "@/hooks/useUserSync"

export function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const userRole = useUserRole()
  const router = useRouter()
  const isAdmin = userRole === "admin"

  if (!isAdmin) {
    return (
      <Card className="mx-auto max-w-md mt-8">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Coming Soon</CardTitle>
          </div>
          <CardDescription>
            This feature is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We're working hard to bring you these features soon. Please check back later!
          </p>
          <Button 
            onClick={() => router.push("/dashboard")}
            className="w-full"
          >
            Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
} 