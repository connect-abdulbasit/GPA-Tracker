'use client'

import { getUser } from '@/app/actions/user'
import { useSession } from '@/lib/auth-client'
import { useEffect, useState } from 'react'

export const useUserData = () => {
  const { data: session, isPending } = useSession()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          setLoading(true)
          const data = await getUser(session.user.id)
          setUserData(data)
        } catch (error) {
          console.error('Error fetching user data:', error)
        } finally {
          setLoading(false)
        }
      } else if (!isPending) {
        // If no session and not pending, set loading to false
        setLoading(false)
        setUserData(null)
      }
    }

    fetchUserData()
  }, [session?.user?.id, isPending]) // Add isPending to dependencies

  return { userData, loading }
}

export const useUserRole = () => {
  const { data: session, isPending } = useSession()
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<any>(null)
  
  useEffect(() => {
    const fetchUserRole = async () => {
      if (session?.user?.id) {
        try {
          setLoading(true)
          const data = await getUser(session.user.id)
          setUserRole(data?.role || "student")
        } catch (error) {
          console.error('Error fetching user role:', error)
        } finally {
          setLoading(false)
        }
      } else if (!isPending) {
        setLoading(false)
        setUserRole(null)
      }
    }

    fetchUserRole()
  }, [session?.user?.id, isPending])
  
  return { userRole, loading }
}

export function useProfileCompletion() {
  const { userData, loading } = useUserData()
  const { data: session, isPending } = useSession()
  const [profileComplete, setProfileComplete] = useState<boolean>(false)
  
  // userLoggedIn should be based on session, not userData
  const userLoggedIn = !!session?.user?.id
  
  useEffect(() => {
    if (!loading && userData) {
      setProfileComplete(!!(userData?.university_name && userData?.department))
    } else if (!loading && !userData) {
      setProfileComplete(false)
    }
  }, [userData, loading, userLoggedIn])
  
  return { profileComplete, loading: loading || isPending, userLoggedIn }
}