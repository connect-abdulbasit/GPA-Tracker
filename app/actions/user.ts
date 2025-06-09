"use server"
import { db } from "@/src/db"
import { usersTable } from "@/src/db/schema"
import { eq } from "drizzle-orm"

export const getUser = async (userId: string) => {
  const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).execute()
  return user[0]
}