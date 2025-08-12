"use client";

import { useRouter } from "next/navigation";
import { OnboardingForm } from "@/components/onboarding-form";
import { isProfileComplete } from "@/app/actions/user";
import { useEffect, useState } from "react";
import { useUserData } from "@/hooks/useUserSync";
import { HashLoader } from "react-spinners";

export default function OnboardingPage() {
  const { userData, loading } = useUserData()
  const [isCheckingProfile, setIsCheckingProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkProfile = async () => {
      if (userData?.userData?.id && !isCheckingProfile && !loading) {
        setIsCheckingProfile(true);
        try {
          const profile = await isProfileComplete(userData.userData.id);
          if (profile) {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Error checking profile:", error);
        } finally {
          setIsCheckingProfile(false);
        }
      }
    };

    checkProfile();
  }, [userData, isCheckingProfile, loading, router]);

  if (loading || isCheckingProfile) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80">
        <HashLoader color="#4F46E5" />
      </div>
    );
  }

  return <OnboardingForm session={userData} />;
}
