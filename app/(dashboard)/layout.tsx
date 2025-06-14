import type React from "react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Suspense } from "react"
import Loading from "./loading"
import { ProfileCompletionWrapper } from "@/components/ProfileCompletionWrapper"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/")
  }

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <ProfileCompletionWrapper>
      <Suspense fallback={<Loading />}>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </Suspense>
    </ProfileCompletionWrapper>
    </div>
  )
  
}
