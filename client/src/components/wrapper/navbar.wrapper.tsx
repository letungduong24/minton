import React, { ReactNode } from 'react'
import Navbar from '../ui/navbar'

type NavbarWrapperProps = {
    children: ReactNode
}

const NavbarWrapper = ({children}: NavbarWrapperProps) => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar />
        {children}
    </div>
  )
}

export default NavbarWrapper