import { auth } from "@clerk/nextjs/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { AddSemesterDialog } from "@/components/add-semester-dialog"
import { SemesterCard } from "@/components/semester-card"
import { fetchSemesters } from "@/app/actions/semester"
import { UpdateSemesterDialog } from "@/components/update-semester-dialog"

export default async function SemestersPage() {
  const { userId } = await auth()
  const semesters = await fetchSemesters(userId!)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Semesters</h1>
          <p className="text-muted-foreground">Manage your semesters and courses</p>
        </div>
        <div className="flex items-center gap-4">
          <UpdateSemesterDialog />
          <AddSemesterDialog />
        </div>
      </div>

      {semesters.length === 0 ? (
        <Card>
          <CardHeader className="text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle>No Semesters Yet</CardTitle>
            <CardDescription>Get started by adding your first semester</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <AddSemesterDialog />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {semesters.map((semester) => (
            <SemesterCard key={semester.id} semester={semester} userId={userId!} />
          ))}
        </div>
      )}
    </div>
  )
}
