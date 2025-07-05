"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { AddSemesterDialog } from "@/components/add-semester-dialog"
import { SemesterCard } from "@/components/semester-card"
import { fetchSemestersWithCourses } from "@/app/actions/semester"
import { useUserData } from "@/hooks/useUserSync"
import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { HashLoader } from "react-spinners"

export default function SemestersPage() {
  const { userData, loading } = useUserData()
  const router = useRouter()
  const [semesters, setSemesters] = useState<any>([])
  const [dataLoading, setDataLoading] = useState(true)

  const fetchData = useCallback(async () => {
    if (userData?.id) {
      try {
        setDataLoading(true)
        const semestersData = await fetchSemestersWithCourses(userData.id)
        setSemesters(semestersData)
      } catch (error) {
        console.error('Error fetching semesters:', error)
      } finally {
        setDataLoading(false)
      }
    }
  }, [userData?.id])

  useEffect(() => {
    if (!loading) {
      fetchData()
    }
  }, [fetchData, loading])

  useEffect(() => {
    if (!userData && !loading) {
      router.push("/sign-in")
    }
  }, [userData, loading, router])

  if (loading || dataLoading) {
    return <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80">
      <HashLoader color="#4F46E5" />
    </div>
  }

  if (!userData) {
    return null
  }

  return (
    <div className="space-y-4 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Semesters</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your semesters and courses</p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <AddSemesterDialog onSemesterAdded={fetchData} />
        </div>
      </div>

      {semesters.length === 0 ? (
        <Card className="mx-4 sm:mx-0">
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle>No Semesters Yet</CardTitle>
            <CardDescription>Get started by adding your first semester</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <AddSemesterDialog onSemesterAdded={fetchData} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
          {semesters.map((semester: any) => (
            <SemesterCard key={semester.id} semester={semester} userId={userData.id} onDataChange={fetchData} />
          ))}
        </div>
      )}
    </div>
  )
}
