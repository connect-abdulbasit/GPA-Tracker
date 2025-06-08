import { auth } from "@clerk/nextjs/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { AddSemesterDialog } from "@/components/add-semester-dialog"
import { SemesterCard } from "@/components/semester-card"
import { fetchSemesters } from "@/app/actions/semester"

// Dummy data
const dummySemesters = [
  {
    id: "1",
    name: "Fall 2024",
    user_id: "user_123",
    created_at: new Date(),
    updated_at: new Date(),
    courses: [
      {
        id: "1",
        name: "Introduction to Computer Science",
        credit_hours: 3,
        gpa: 3.7,
        semester_id: "1",
        user_id: "user_123",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "2",
        name: "Data Structures",
        credit_hours: 4,
        gpa: 3.5,
        semester_id: "1",
        user_id: "user_123",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  },
  {
    id: "2",
    name: "Spring 2024",
    user_id: "user_123",
    created_at: new Date(),
    updated_at: new Date(),
    courses: [
      {
        id: "3",
        name: "Algorithms",
        credit_hours: 4,
        gpa: 3.8,
        semester_id: "2",
        user_id: "user_123",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  },
];

async function getSemesters(userId: string) {
  const semesters = await fetchSemesters(userId)
  return semesters;
}

async function getDashboardData(userId: string) {
  return await getSemesters(userId)
}

export default async function SemestersPage() {
  const { userId } = await auth()
  const semesters = await getDashboardData(userId!)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Semesters</h1>
          <p className="text-muted-foreground">Manage your semesters and courses</p>
        </div>
        <AddSemesterDialog />
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
            <SemesterCard key={semester.id} semester={semester} />
          ))}
        </div>
      )}
    </div>
  )
}
