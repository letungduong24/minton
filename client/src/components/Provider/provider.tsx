import React, { ReactNode } from 'react'
import { Toaster } from 'sonner';
import AuthStateProvider from './auth.provider';
import NavbarProvider from './navbar.provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import VerifyGuard from '../guard/verify.guard';

type ProviderProps = {
  children: ReactNode
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <>
      <Toaster />
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <AuthStateProvider>
          <VerifyGuard>
            <NavbarProvider>
              {children}
            </NavbarProvider>
          </VerifyGuard>
        </AuthStateProvider>
      </GoogleOAuthProvider>
      
    </>
  )
}

export default Provider
