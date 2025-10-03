'use client'

import { ReactNode, useEffect } from 'react'
import useAuthStore from '@/store/auth.store'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from 'sonner'

type VerifyGuardProps = {
  children: ReactNode
}

const VerifyGuard = ({children}: VerifyGuardProps) => {
  const {user} = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (user && !user?.isVerified && pathname !== '/verify/') {
      router.push('/verify/')
    }
  }, [user, router, pathname])

  return children
}

export default VerifyGuard