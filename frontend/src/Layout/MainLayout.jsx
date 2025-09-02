import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Common/Footer'
import Navbar from '../Components/Common/Navbar'
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