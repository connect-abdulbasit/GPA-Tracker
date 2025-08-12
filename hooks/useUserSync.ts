'use client'

import { getUser } from '@/app/actions/user'
import { useSession } from '@/lib/auth-client'
import { useEffect, useState, useMemo } from 'react'

// Custom hook for fetching user data with caching
const useUserDataWithCache = () => {
  const { data: session, isPending } = useSession()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          setLoading(true)
          setError(null)
          const data = await getUser(session.user.id)
          setUserData(data)
        } catch (error) {
          console.error('Error fetching user data:', error)
          setError('Failed to fetch user data')
        } finally {
          setLoading(false)
        }
      } else if (!isPending) {
        setLoading(false)
        setUserData(null)
        setError(null)
      }
    }

    fetchUserData()
  }, [session?.user?.id, isPending])

  return { userData, loading, error }
}

// Optimized user data hook
export const useUserData = () => {
  const { userData, loading, error } = useUserDataWithCache()
  return { userData, loading, error }
}

// Optimized user role hook - derived from user data
export const useUserRole = () => {
  const { userData, loading, error } = useUserDataWithCache()
  
  const userRole = useMemo(() => {
    return userData?.role || "student"
  }, [userData?.role])
  
  return { userRole, loading, error }
}

// Optimized profile completion hook
export function useProfileCompletion() {
  const { userData, loading, error } = useUserDataWithCache()
  const { data: session, isPending } = useSession()
  
  // Memoized values for better performance
  const userLoggedIn = useMemo(() => !!session?.user?.id, [session?.user?.id])
  
  const profileComplete = useMemo(() => {
    if (!userData) return false
    return !!(userData.university_name && userData.department)
  }, [userData?.university_name, userData?.department])
  
  // Combined loading state
  const isLoading = loading || isPending
  
  return { 
    profileComplete, 
    loading: isLoading, 
    userLoggedIn,
    error 
  }
}