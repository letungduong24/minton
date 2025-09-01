import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='p-5 text-gray-700'>
      <div className="w-full rounded-2xl shadow-lg border border-gray-200 p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200 pb-5">
          <div className="space-y-1">
            <p className='text-lg font-bold text-center md:text-start'>Mint-on</p>
            <p className='hidden md:block text-sm '>Mint-on giúp bạn luôn sẵn sàng cho những trận cầu đầy hứng khởi</p>
          </div>
          <div className="space-y-2">
            <div className="flex gap-3 justify-center md:justify-end">
              <a className='hover:scale-105 transition-all duration-300 hover:text-black underline' href="">Cửa hàng</a>
              <a className='hover:scale-105 transition-all duration-300 hover:text-black underline' href="">Đặt sân</a>
              <a className='hover:scale-105 transition-all duration-300 hover:text-black underline' href="">Ghép sân</a>
            </div>
            <div className="flex gap-3 justify-center md:justify-end">
              <a href='' className='hover:scale-105 transition-all duration-300 hover:text-black underline'><FaFacebook /></a>
              <a href='' className='hover:scale-105 transition-all duration-300 hover:text-black underline'><FaSquareInstagram /></a>
              <a href='' className='hover:scale-105 transition-all duration-300 hover:text-black underline'><FaSquareXTwitter /> </a>
            </div>
          </div>
        </div>
        <div className="text-sm text-center pt-5 flex flex-col md:flex-row justify-between">
          <p>© 2025 Mint-on. All rights reserved.</p>
          <div className="flex gap-2 justify-center md:justify-start">
              <a href='' className='hover:scale-105 transition-all duration-300 hover:text-black underline'>Chính sách bảo mật</a>
              <a href="" className='hover:scale-105 transition-all duration-300 hover:text-black underline'>Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer