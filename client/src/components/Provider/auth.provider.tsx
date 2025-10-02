'use client'

import useAuthStore from '@/store/auth.store'
import React, { ReactNode, useEffect, useState } from 'react'
import Loading from '../ui/loading'

type AuthProviderProps = {
  children: ReactNode
}

const AuthStateProvider = ({children}: AuthProviderProps) => {
  const {loading, checkAuth} = useAuthStore()

  useEffect(() => {
    const getUser = async () => {
      await checkAuth()
    }
    getUser()
  }, [checkAuth])

  if (loading){
    return <Loading />
  }

  return children
}

export default AuthStateProvider