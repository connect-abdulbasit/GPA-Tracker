"use client"
import { useRouter } from "next/navigation"
import { OnboardingForm } from "@/components/onboarding-form"
import { isProfileComplete } from "@/app/actions/user"
import { useEffect, useState } from "react"
import { useUserData } from "@/hooks/useUserSync"
import { HashLoader } from "react-spinners"

export default function OnboardingPage() {
  const { userData, loading } = useUserData()
  console.log("userData",userData)
  const [isCheckingProfile, setIsCheckingProfile] = useState(false);
  const router = useRouter();

  // Redirect if no session
  useEffect(() => {
    if (!loading && (!userData || userData.userData)) {
      router.push("/sign-in");
    }
  }, [loading, userData, router]);

  useEffect(() => {
    const checkProfile = async () => {
      if (userData?.userData?.id && !isCheckingProfile) {
        setIsCheckingProfile(true);
        try {
          const profile = await isProfileComplete(userData.userData.id)
          if (profile) {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error('Error checking profile:', error);
        } finally {
          setIsCheckingProfile(false);
        }
      }
    }
    
    if (!loading && userData?.userData?.id) {
      checkProfile()
    }
  }, [loading, userData, isCheckingProfile, router])

  if(loading || isCheckingProfile) {
    return <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80">
    <HashLoader color="#4F46E5" />
  </div>
  }
  
  if (!userData) {
    return <div>Please sign in to continue</div>
  }

  return <OnboardingForm session={userData} />
}
