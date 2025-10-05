'use client'

import { ReactNode, useLayoutEffect, useState } from 'react'
import useAuthStore from '@/store/auth.store'
import { useRouter, usePathname } from 'next/navigation'
import { EPageTypes } from '@/type/page.enum'
import Loading from '../ui/loading'

type AuthWrapperProps = {
  children: ReactNode
  pageType: EPageTypes
}

const AuthWrapper = ({ children, pageType }: AuthWrapperProps) => {
  const { user, loading, signOutLoading } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    // Don't run logic while auth is still loading or signing out
    if (loading || signOutLoading) return

    switch (pageType) {
      case EPageTypes.AUTHENTICATION:
        if (!user) {
          router.replace('/auth/login')
        } else if (user && !user.isVerified) {
          router.replace('/verify')
        } else if (user?.isVerified) {
          setReady(true)
        }
        break

      case EPageTypes.NON_AUTHENTICATED:
        if (user) {
          router.replace('/')
        } else if (!user) {
          setReady(true)
        }
        break

      case EPageTypes.VERIFY:
        if (!user) {
          router.replace('/auth/login')
        } else if (user && user.isVerified) {
          router.replace('/')
        } else if (user && !user.isVerified) {
          setReady(true)
        }
        break

      case EPageTypes.PUBLIC:
        if(!user){
          setReady(true)
        } else if (user && !user.isVerified) {
          router.replace("/verify")
        } else if (user?.isVerified) {
          setReady(true)
        }
        break
    }
  }, [user, loading, signOutLoading, pageType, router, pathname])

  if (!ready) return <Loading />

  return <>{children}</>
}

export default AuthWrapper
