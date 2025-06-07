'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { DatabaseManager } from '@/lib/database'

export function useUserSync() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      // Sync user data with database
      DatabaseManager.createUser(user)
        .then(() => {
          console.log('User synced with database')
        })
        .catch((error) => {
          console.error('Failed to sync user:', error)
        })
    }
  }, [user, isLoaded])

  return { user, isLoaded }
} 