import React, { ReactNode } from 'react'
import Navbar from '../ui/navbar'

type NavbarProviderProps = {
    children: ReactNode
}

const NavbarProvider = ({children}: NavbarProviderProps) => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar />
        {children}
    </div>
  )
}

export default NavbarProvider