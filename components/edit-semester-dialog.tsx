"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit } from "lucide-react"
import { toast } from "sonner"
import { updateSemester } from "@/app/actions/semester"
import { useAuth } from "@/lib/use-auth"

interface EditSemesterDialogProps {
  semesterId: string
  name: string
}

export function EditSemesterDialog({ semesterId, name }: EditSemesterDialogProps) {
  const { session } = useAuth()
  const [open, setOpen] = useState(false)
  const [semesterName, setSemesterName] = useState(name)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!semesterName.trim()) return

    setLoading(true)
    try {
      await updateSemester(semesterId, session?.user?.id!, semesterName.trim())

      toast.success("Semester updated successfully!")
      setOpen(false)
      router.refresh()
    } catch (error) {
      toast.error("Failed to update semester")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Semester</DialogTitle>
            <DialogDescription>Update the name of this semester.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={semesterName}
                onChange={(e) => setSemesterName(e.target.value)}
                placeholder="e.g., Fall 2024"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Semester"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 