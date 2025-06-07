'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

export function useUserSync() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      // Call API route instead of direct database operations
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