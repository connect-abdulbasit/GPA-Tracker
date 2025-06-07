import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 2,
    },
  },
  // Optionally disable realtime if not needed
  // global: {
  //   headers: { 'x-my-custom-header': 'my-app-name' },
  // },
})

export type Semester = {
  id: string
  user_id: string
  name: string
  created_at: string
}

export type Course = {
  id: string
  semester_id: string
  name: string
  credit_hours: number
  gpa: number
  created_at: string
}

export type SemesterWithCourses = Semester & {
  courses: Course[]
}
