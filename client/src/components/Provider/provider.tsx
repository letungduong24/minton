import React, { ReactNode } from 'react'
import { Toaster } from 'sonner';
import AuthStateProvider from './auth.provider';
import NavbarWrapper from '../wrapper/navbar.wrapper';

type ProviderProps = {
  children: ReactNode
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <>
      <Toaster />
        <AuthStateProvider>
          {children}
        </AuthStateProvider>
    </>
  )
}

export default Provider
