"use client"

import { useSession } from "./auth-client"
import { useEffect, useState } from "react"

export function useAuth() {
  const { data: session, isPending } = useSession()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      setIsAuthenticated(!!session)
    }
  }, [session, isMounted])

  return {
    isAuthenticated,
    isLoading: isPending || !isMounted,
    session
  }
} 