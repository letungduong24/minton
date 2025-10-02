'use client'

import { ReactNode, useEffect } from 'react'
import useAuthStore from '@/store/auth.store'
import { useRouter } from 'next/navigation'

type GuestGuardProps = {
  children: ReactNode
}

const GuestGuard = ({children}: GuestGuardProps) => {
  const {user} = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
  }, [user, router])

  if (user) {
    return null
  }

  return (
      children
  )
}

export default GuestGuard