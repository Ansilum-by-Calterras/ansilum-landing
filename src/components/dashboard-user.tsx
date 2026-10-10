'use client'

import { useEffect, useState } from 'react'

interface DashboardUser {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
}

interface DashboardSession {
    user: DashboardUser
}

export function useDashboardSession() {
    const [session, setSession] = useState<DashboardSession | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

    async function checkSession() {
        try {
            const response = await fetch(
            'https://dashboard.ansilum.com/api/auth/get-session',
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                },
            }
        )

            if (!response.ok) {
                if (!cancelled) {
                    setSession(null)
                }

                return
                }

            const data = await response.json()

            if (!cancelled) {
                setSession(data?.user ? data : null)
            }
        } catch (error) {
            console.error('[AUTH] Failed checking dashboard session:', error)

            if (!cancelled) {
                setSession(null)
            }
        } finally {
            if (!cancelled) {
                setIsLoading(false)
            }
        }
    }

    checkSession()

    return () => {
        cancelled = true
    }
  }, [])

  return {
    session,
    user: session?.user ?? null,
    isAuthenticated: Boolean(session?.user),
    isLoading,
  }
}