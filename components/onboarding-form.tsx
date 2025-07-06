"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

const POPULAR_UNIVERSITIES = [
  "Abasyn University",
  "Abbottabad University of Science and Technology", 
  "Abdul Wali Khan University Mardan",
  "Aga Khan University",
  "Air University",
  "Al-Ghazali University",
  "Allama Iqbal Open University",
  "Bahauddin Zakariya University",
  "Bahria University",
  "Balochistan University of Engineering and Technology",
  "Baqai Medical University",
  "Beaconhouse National University",
  "Building2",
  "Capital University of Science and Technology",
  "CECOS University",
  "City University of Science and Information Technology",
  "COMSATS",
  "Dadabhoy Institute of Higher Education",
  "Dawood University of Engineering and Technology",
  "DHA Suffa University",
  "Dow University of Health Sciences",
  "FAST-NUCES",
  "Foundation University Islamabad",
  "Forman Christian College",
  "GIKI",
  "Gomal University",
  "Government College University, Faisalabad",
  "Government College University, Lahore",
  "Habib University",
  "Hamdard University",
  "IBA Karachi",
  "IBADAT International University",
  "Information Technology University Lahore",
  "Institute of Space Technology",
  "International Islamic University",
  "Iqra University",
  "Islamia College University Peshawar",
  "Karachi Institute of Economics and Technology",
  "Khyber Medical University",
  "King Edward Medical University",
  "Kinnaird College for Women",
  "Kohat University of Science and Technology",
  "Lahore College for Women University",
  "Lahore School of Economics",
  "Liaquat University of Medical and Health Sciences",
  "LUMS",
  "Mehran University of Engineering and Technology",
  "Muhammad Ali Jinnah University",
  "National Defence University",
  "National Skills University",
  "National University of Modern Languages (NUML)",
  "NED University",
  "NUML",
  "NUST",
  "NUST Business School",
  "PIEAS",
  "Pir Mehr Ali Shah Arid Agriculture University",
  "Punjab University",
  "Quaid-i-Azam University",
  "Riphah International University",
  "Sarhad University of Science and IT",
  "Sukkur IBA University",
  "SZABIST",
  "The Islamia University of Bahawalpur",
  "UET Lahore",
  "University of Central Punjab",
  "University of Gujrat",
  "University of Karachi",
  "University of Lahore",
  "University of Peshawar",
  "University of Sargodha",
  "University of Swat",
  "Virtual University of Pakistan",
  "Ziauddin University",
  "Other",
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

interface OnboardingFormProps {
  session: any;
}

export function OnboardingForm({ session }: OnboardingFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    universityName: "",
    department: "",
    customUniversity: "", 
    customDepartment: "",
  });
  const [universitySearch, setUniversitySearch] = useState("");
  const [departmentSearch, setDepartmentSearch] = useState("");
  const router = useRouter();

  const filteredUniversities = POPULAR_UNIVERSITIES.filter(university =>
    university.toLowerCase().includes(universitySearch.toLowerCase())
  );

  const filteredDepartments = POPULAR_DEPARTMENTS.filter(department =>
    department.toLowerCase().includes(departmentSearch.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.id || !formData.universityName.trim() || !formData.department.trim()) return;

    const finalUniversityName =
      formData.universityName === "Other"
        ? universitySearch
        : formData.universityName;

    const finalDepartment =
      formData.department === "Other"
        ? departmentSearch
        : formData.department;

    setLoading(true);
    try {
      await updateUserProfile(session.id, {
        university_name: finalUniversityName.trim(),
        department: finalDepartment.trim(),
        name: session.name || null,
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
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your university" />
                </SelectTrigger>
                <SelectContent position="popper" side="bottom" align="start" className="w-full max-h-[300px]">
                  <div className="sticky top-0 z-10 bg-background border-b px-3 py-2">
                    <Input
                      placeholder="Search university..."
                      className="h-8"
                      value={universitySearch}
                      onChange={(e) => setUniversitySearch(e.target.value)}
                      onKeyDown={(e) => {
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </div>
                  {filteredUniversities.map((university) => (
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
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent position="popper" side="bottom" align="start" className="w-full max-h-[300px]">
                  <div className="sticky top-0 z-10 bg-background border-b px-3 py-2">
                    <Input
                      placeholder="Search department..."
                      className="h-8"
                      value={departmentSearch}
                      onChange={(e) => setDepartmentSearch(e.target.value)}
                      onKeyDown={(e) => {
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </div>
                  {filteredDepartments.map((department) => (
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
