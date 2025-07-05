"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, BookOpen, User, Calendar } from "lucide-react"
import { useUserData } from "@/hooks/useUserSync"

type UserProfile = {
  university_name: string
  department: string
  name: string
  created_at: string
}

export function UserProfileDisplay() {
  const { userData, loading } = useUserData()
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (userData && !loading) {
      setProfile({
        university_name: userData.university_name || "",
        department: userData.department || "",
        name: userData.name || "",
        created_at: userData.created_at || new Date().toISOString(),
      })
    } else if (!loading && !userData) {
      setProfile(null)
    }
  }, [userData, loading])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!profile) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            No profile data available
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          Academic Profile
        </CardTitle>
        <CardDescription>Your university and department information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">University</p>
              <p className="font-medium">{profile.university_name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="font-medium">{profile.department}</p>
            </div>
          </div>
        </div>

        {profile.name && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{profile.name}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            Member since {new Date(profile.created_at).toLocaleDateString()}
          </div>
          <Badge variant="secondary">Verified</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
