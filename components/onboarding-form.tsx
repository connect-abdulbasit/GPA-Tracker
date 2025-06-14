"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, Building2, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme-toggle";
import { updateUserProfile } from "@/app/actions/user";

// Popular universities and departments for quick selection
const POPULAR_UNIVERSITIES = [
  // 🇵🇰 Pakistani Universities
  "NUST",
  "LUMS",
  "FAST-NUCES",
  "UET Lahore",
  "IBA Karachi",
  "GIKI",
  "COMSATS",
  "Air University",
  "Bahria University",
  "PIEAS",
  "University of Karachi",
  "Punjab University",
  "Quaid-i-Azam University",
  "Aga Khan University",
  "Forman Christian College",
  "SZABIST",
  "NED University",
  "NUST Business School",
  "Habib University",
  "Institute of Space Technology",
  "NUML",
  "Riphah International University",
  "University of Central Punjab",
  "University of Lahore",
  "University of Peshawar",
  "International Islamic University",
  "Allama Iqbal Open University",
  "Khyber Medical University",
  "Dow University of Health Sciences",
  "Ziauddin University",
  "Liaquat University of Medical and Health Sciences",
  "University of Gujrat",
  "University of Sargodha",
  "The Islamia University of Bahawalpur",
  "Mehran University of Engineering and Technology",
  "Bahauddin Zakariya University",
  "Sarhad University of Science and IT",
  "Gomal University",
  "Other",

  // 🌍 International Universities
  "Harvard University",
  "Stanford University",
  "Massachusetts Institute of Technology (MIT)",
  "University of Oxford",
  "University of Cambridge",
  "University of California, Berkeley",
  "Princeton University",
  "Yale University",
  "Columbia University",
  "University of Toronto",
  "University of Melbourne",
  "University of British Columbia",
  "ETH Zurich",
  "University of Chicago",
  "Imperial College London",
  "National University of Singapore (NUS)",
  "Tsinghua University",
  "Peking University",
  "Australian National University",
  "University of Tokyo",
];

const POPULAR_DEPARTMENTS = [
  "Computer Science",
  "Engineering",
  "Business Administration",
  "Medicine",
  "Law",
  "Psychology",
  "Biology",
  "Chemistry",
  "Physics",
  "Mathematics",
  "Economics",
  "Political Science",
  "English Literature",
  "History",
  "Art & Design",
  "Education",
  "Philosophy",
  "Sociology",
  "Environmental Science",
  "Communication Studies",
  "Nursing",
  "Pharmacy",
  "Architecture",
  "Anthropology",
  "Theatre & Performing Arts",
  "Journalism",
  "Linguistics",
  "Public Health",
  "Information Technology",
  "Data Science",
  "Astronomy",
  "Geology",
  "Religious Studies",
  "International Relations",
  "Graphic Design",
  "Music",
  "Criminology",
  "Veterinary Science",
  "Marketing",
  "Finance",
  "Human Resource Management",
  "Statistics",
  "Artificial Intelligence",
  "Robotics",
  "Agricultural Science",
  "Sports Science",
  "Social Work",
  "Library Science",
  "Other",
];

export function OnboardingForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    universityName: "",
    department: "",
    customUniversity: "",
    customDepartment: "",
  });
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const finalUniversityName =
      formData.universityName === "Other"
        ? formData.customUniversity
        : formData.universityName;

    const finalDepartment =
      formData.department === "Other"
        ? formData.customDepartment
        : formData.department;

    if (!finalUniversityName.trim() || !finalDepartment.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await updateUserProfile(user.id, {
        university_name: finalUniversityName.trim(),
        department: finalDepartment.trim(),
        full_name: user.fullName || null,
      });
      toast.success("Profile setup completed!");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save profile information");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Help us personalize your GPA tracking experience by providing your
            academic information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* University Selection */}
            <div className="space-y-2">
              <Label htmlFor="university" className="flex items-center">
                <Building2 className="h-4 w-4 mr-2" />
                University
              </Label>
              <Select
                value={formData.universityName}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, universityName: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your university" />
                </SelectTrigger>
                <SelectContent position="popper" side="bottom" align="start" className="max-h-[300px]">
                  {POPULAR_UNIVERSITIES.map((university) => (
                    <SelectItem key={university} value={university}>
                      {university}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {formData.universityName === "Other" && (
                <Input
                  placeholder="Enter your university name"
                  value={formData.customUniversity}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customUniversity: e.target.value,
                    }))
                  }
                  required
                />
              )}
            </div>

            {/* Department Selection */}
            <div className="space-y-2">
              <Label htmlFor="department" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Department/Major
              </Label>
              <Select
                value={formData.department}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, department: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent position="popper" side="bottom" align="start" className="max-h-[300px]">
                  {POPULAR_DEPARTMENTS.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {formData.department === "Other" && (
                <Input
                  placeholder="Enter your department/major"
                  value={formData.customDepartment}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customDepartment: e.target.value,
                    }))
                  }
                  required
                />
              )}
            </div>

            {/* Welcome Message */}
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Welcome to GPA Tracker! 🎓
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Once you complete your profile, you'll be able to:
              </p>
              <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
                <li>• Track your semester-wise GPA progress</li>
                <li>• Manage ongoing courses with individual assessments</li>
                <li>• Set academic goals and forecast your CGPA</li>
                <li>• Share study resources with classmates</li>
              </ul>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Setting up your profile..." : "Complete Setup"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
