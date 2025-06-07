import { usersTable } from '@/src/db/schema'
import { supabase } from './supabase'
// import { db } from '@/src/db'
import { eq } from 'drizzle-orm'
import { db } from '@/src/db'

export interface DatabaseUser {
  id: string // Clerk user ID
  email: string
  first_name: string | null
  last_name: string | null
  full_name: string | null
  image_url: string | null
  created_at: Date
  updated_at: Date
}

export class DatabaseManager {
  static async createUser(clerkUser: {
    id: string
    emailAddresses: Array<{ emailAddress: string }>
    firstName?: string | null
    lastName?: string | null
    fullName?: string | null
    imageUrl?: string
    updatedAt?: Date
    createdAt?: Date
  }): Promise<DatabaseUser | null> {
    try {
      const email = clerkUser.emailAddresses[0]?.emailAddress || ''
      console.log(email)
      // Check if user with email already exists
      const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email))
      console.log(existingUser)
      if (existingUser.length > 0) {
        return existingUser[0]
      }

      const userData = {
        id: clerkUser.id,
        email: email,
        first_name: clerkUser.firstName || null,
        last_name: clerkUser.lastName || null,
        full_name: clerkUser.fullName || null,
        image_url: clerkUser.imageUrl || null,
      }

      const user = await db.insert(usersTable).values(userData).returning()

      return user[0]
    } catch (error) {
      console.error('Error creating/updating user:', error)
      return null
    }
  }

  static async getUser(userId: string): Promise<DatabaseUser | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }

  static async updateUser(userId: string, updates: Partial<DatabaseUser>): Promise<DatabaseUser | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating user:', error)
      return null
    }
  }
} 