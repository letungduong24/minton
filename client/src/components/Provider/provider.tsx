import React, { ReactNode } from 'react'
import { Toaster } from 'sonner';
import AuthStateProvider from './auth.provider';
import NavbarProvider from './navbar.provider';
import { GoogleOAuthProvider } from '@react-oauth/google';

type ProviderProps = {
  children: ReactNode
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <>
      <Toaster />
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <AuthStateProvider>
          <NavbarProvider>
            {children}
          </NavbarProvider>
        </AuthStateProvider>
      </GoogleOAuthProvider>
      
    </>
  )
}

export default Provider
