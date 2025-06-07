'use client'

import { useUserSync } from '@/hooks/useUserSync'

export function UserSyncProvider({ children }: { children: React.ReactNode }) {
  useUserSync()
  return <>{children}</>
} 