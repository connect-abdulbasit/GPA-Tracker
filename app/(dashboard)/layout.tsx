import type React from "react"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { Navbar } from "@/components/navbar"
import { Suspense } from "react"
import Loading from "./loading"
import { ProfileCompletionWrapper } from "@/components/ProfileCompletionWrapper"
import { auth } from "@/auth"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect("/sign-in")
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
