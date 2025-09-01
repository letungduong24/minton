import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import { AnimatePresence, motion } from 'framer-motion';

const GuestNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className='absolute z-50 w-full p-7'>
      <div className="flex justify-between items-center">
        <h1 className='text-2xl text-white font-bold bg-white/10 p-2 rounded-2xl border border-white/20 backdrop-blur-md'>MINT-ON</h1>
        <div className="hidden md:block menu space-x-2 bg-white/10 rounded-2xl px-2 py-4 backdrop-blur-xs border border-white/20">
          <Link className='text-white font-medium text-lg px-2 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:bg-gray-200/30 ' to={'/'}>Trang chủ</Link>
          <Link className='text-white font-medium text-lg px-2 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:bg-gray-200/30 ' to={'/'}>Mua sắm</Link>
          <Link className='text-white font-medium text-lg px-2 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:bg-gray-200/30 ' to={'/'}>Thuê sân</Link>
          <Link className='text-white font-medium text-lg px-2 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:bg-gray-200/30 ' to={'/'}>Ghép sân</Link>
          <Link className='text-white font-medium text-lg px-2 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:bg-gray-200/30 ' to={'/'}>Đăng nhập</Link>
        </div>
        <div className="md:hidden relative">
          <button onClick={() => setShowMenu(!showMenu)} className='text-white text-2xl p-2 bg-white/5 backdrop-blur-xs border border-white/20 rounded-2xl cursor-pointer'><MdMenu /></button>
          <AnimatePresence>
            {showMenu ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }} 
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className={`flex right-0 top-13 w-fit whitespace-nowrap absolute flex-col bg-white/10 rounded-2xl p-2 backdrop-blur-xs border border-white/20`}>
            <Link className='text-white font-medium text-lg px-2 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:bg-gray-200/30 ' to={'/'}>Trang chủ</Link>
            <Link className='text-white font-medium text-lg px-2 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:bg-gray-200/30 ' to={'/'}>Mua sắm</Link>
            <Link className='text-white font-medium text-lg px-2 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:bg-gray-200/30 ' to={'/'}>Thuê sân</Link>
            <Link className='text-white font-medium text-lg px-2 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:bg-gray-200/30 ' to={'/'}>Ghép sân</Link>
            <Link className='text-white font-medium text-lg px-2 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:bg-gray-200/30 ' to={'/'}>Đăng nhập</Link>
          </motion.div>   
          ) : null} 
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default GuestNavbar