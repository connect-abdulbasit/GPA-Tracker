"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditSemesterDialog } from "@/components/edit-semester-dialog"

interface SemesterActionsProps {
  semesterId: string
  semesterName: string
  gpa?: number
  totalCredits?: number
  onDataChange?: () => void
}

export function SemesterActions({ semesterId, semesterName, gpa = 0, totalCredits = 0, onDataChange }: SemesterActionsProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setEditDialogOpen(true)}>
            Edit Semester
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Delete Semester</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditSemesterDialog
        semesterId={semesterId}
        name={semesterName}
        gpa={gpa}
        totalCredits={totalCredits}
        active={true}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSemesterUpdated={onDataChange}
      />
    </>
  )
} 