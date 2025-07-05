// import { supabase } from './supabase'

// export interface DatabaseUser {
//   id: string // Clerk user ID
//   email: string
//   name: string | null
//   image: string | null
//   createdAt: Date
//   updatedAt: Date
// }

// export class DatabaseManager {
//   static async getUser(userId: string): Promise<DatabaseUser | null> {
//     try {
//       const { data, error } = await supabase
//         .from('user')
//         .select('*')
//         .eq('id', userId)
//         .single()

//       if (error) throw error
//       return data
//     } catch (error) {
//       console.error('Error fetching user:', error)
//       return null
//     }
//   }

//   static async updateUser(userId: string, updates: Partial<DatabaseUser>): Promise<DatabaseUser | null> {
//     try {
//       const { data, error } = await supabase
//         .from('user')
//         .update(updates)
//         .eq('id', userId)
//         .select()
//         .single()

//       if (error) throw error
//       return data
//     } catch (error) {
//       console.error('Error updating user:', error)
//       return null
//     }
//   }
// } 