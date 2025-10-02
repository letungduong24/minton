'use client'

import { ReactNode, useEffect } from 'react'
import useAuthStore from '@/store/auth.store'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type AuthGuardProps = {
  children: ReactNode
}

const AuthGuard = ({children}: AuthGuardProps) => {
  const {user} = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      toast.error('Vui lòng đăng nhập để tiếp tục!')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    children
  )
}

export default AuthGuard