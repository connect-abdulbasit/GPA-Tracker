"use server"
import { db } from "@/src/db"
import { user } from "@/auth-schema"
import { eq } from "drizzle-orm"

export async function getUser(userId: string) {
  const userData = await db.select().from(user).where(eq(user.id, userId)).execute()
  return userData[0]
}

export async function updateLastLogin(userId: string) {
  const userUpdated = await db.update(user).set({last_login:new Date()}).where(eq(user.id,userId)).returning().execute()
  return userUpdated[0]
}

export const isProfileComplete = async (userId: string) => {
  try {
    const user = await updateLastLogin(userId)
    console.log(user)
    return !!user && !!user.university_name && !!user.department
  } catch (error) {
    console.error('Error checking profile completion:', error)
    return false
  }
}

export async function updateUserProfile(userId: string, data: any) {
  await db.update(user).set({...data,last_login:new Date()}).where(eq(user.id, userId)).execute()
}