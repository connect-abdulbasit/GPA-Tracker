import { auth } from "@clerk/nextjs/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { AddSemesterDialog } from "@/components/add-semester-dialog"
import { SemesterCard } from "@/components/semester-card"
import { fetchSemesters } from "@/app/actions/semester"
// import { UpdateSemesterDialog } from "@/components/update-semester-dialog"

export default async function SemestersPage() {
  const { userId } = await auth()
  const semesters = await fetchSemesters(userId!)

  return (
    <div className="space-y-4 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Semesters</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your semesters and courses</p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* <UpdateSemesterDialog /> */}
          <AddSemesterDialog />
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
            <AddSemesterDialog />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
          {semesters.map((semester) => (
            <SemesterCard key={semester.id} semester={semester} userId={userId!} />
          ))}
        </div>
      )}
    </div>
  )
}
