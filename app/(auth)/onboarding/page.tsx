import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { OnboardingForm } from "@/components/onboarding-form"
import { isProfileComplete } from "@/app/actions/user"

export default async function OnboardingPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // Check if user already has a profile
  const profile = await isProfileComplete(userId)
  if (profile) {
    redirect("/dashboard")
  }

  return <OnboardingForm />
}
