import React from 'react'
import Navbar from '../Components/Navbar/GuestNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Common/Footer'
const GuestLayout = () => {
  return (
    <div className='relative'>
        <Navbar />
        <main className='bg-transparent'>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default GuestLayout