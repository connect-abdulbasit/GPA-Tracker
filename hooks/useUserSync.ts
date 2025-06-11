'use client'

import { getUser } from '@/app/actions/user'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export function useUserSync() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      fetch('/api/users/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('User synced with database')
          } else {
            console.error('Failed to sync user:', data.error)
          }
        })
        .catch((error) => {
          console.error('Failed to sync user:', error)
        })
    }
  }, [user, isLoaded])

  return { user, isLoaded }
} 

export const useUserData = () => {
  const { user, isLoaded } = useUser()
  const [userData, setUserData] = useState<any>(null)
  useEffect(() => {
    if (isLoaded && user) {
      getUser(user.id).then((data) => {
        setUserData(data)
      })
    }
  }, [user, isLoaded])
  return userData
}

export const useUserRole = () => {
  const { user, isLoaded } = useUser()
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<any>(null)
  useEffect(() => {
    if (isLoaded && user) {
      getUser(user.id).then((data) => {
        setUserRole(data?.role||"student")
        setLoading(false)
      })
    }
  }, [user, isLoaded])
  return {userRole,loading}
}

export function useProfileCompletion() {
  const userData = useUserData()
  const [profileComplete, setProfileComplete] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    if (userData) {
      setProfileComplete(userData?.university_name && userData?.department)
      setLoading(false)
    }
  }, [userData])
  return {profileComplete,loading}
}