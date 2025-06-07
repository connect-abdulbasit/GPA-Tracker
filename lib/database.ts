import { supabase } from './supabase'

export interface DatabaseUser {
  id: string // Clerk user ID
  email: string
  first_name?: string
  last_name?: string
  full_name?: string
  image_url?: string
  created_at?: string
  updated_at?: string
}

export class DatabaseManager {
  static async createUser(clerkUser: {
    id: string
    emailAddresses: Array<{ emailAddress: string }>
    firstName?: string | null
    lastName?: string | null
    fullName?: string | null
    imageUrl?: string
  }): Promise<DatabaseUser | null> {
    try {
      const userData = {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        first_name: clerkUser.firstName || null,
        last_name: clerkUser.lastName || null,
        full_name: clerkUser.fullName || null,
        image_url: clerkUser.imageUrl || null,
      }

      const { data, error } = await supabase
        .from('users')
        .upsert([userData], { onConflict: 'id' })
        .select()
        .single()

      if (error) throw error
      return data
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