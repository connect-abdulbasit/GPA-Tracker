"use server"
import { db } from "@/src/db"
import { usersTable } from "@/src/db/schema"
import { eq } from "drizzle-orm"

export const getUser = async (userId: string) => {
  try {
    const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).execute()
    return user[0] || null
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export const isProfileComplete = async (userId: string) => {
  try {
    const user = await getUser(userId)
    return !!user && !!user.university_name && !!user.department
  } catch (error) {
    console.error('Error checking profile completion:', error)
    return false
  }
}

export const updateUserProfile = async (userId: string, data: any) => {
  try {
    await db.update(usersTable).set(data).where(eq(usersTable.id, userId)).execute()
  } catch (error) {
    console.error('Error updating user profile:', error)
  }
}