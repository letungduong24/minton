import React from 'react'
import backgroundImage from '../../assets/bg.jpg'
import group from '../../assets/group.jpg'
import { Link as ToSection } from 'react-scroll'
import { Link } from "react-router";
import {motion} from "framer-motion"
const Match = () => {
  const bg = {
      backgroundImage: `url(${group})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "100%",
    }
  return (

    <div id='match'>
        <div className="relative w-full h-screen text-gray-700 pt-5">
          <div className="z-10 flex flex-col h-full">
            <div className="flex justify-center md:justify-start">
              <h2 className='md:ml-5 font-medium text-2xl flex items-center gap-1 p-3 bg-gray-200/60 w-fit rounded-full'>
              <span className="w-8 h-8 p-5 bg-black text-white rounded-full flex justify-center items-center">3</span>
              <span className='px-1'>Ghép sân vãng lai</span>
            </h2>
            </div>
            <div className="flex-grow h-0 gap-5 p-5">
              <div style={bg} className=" h-full w-full relative flex items-center justify-center p-5 rounded-2xl">
                  <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
                  <div className="z-10 w-fit flex flex-col gap-2 items-center">
                    <h1 className="text-white text-center text-4xl font-bold">Gặp gỡ những người bạn mới</h1>
                    <p className='text-white text-center'>Nhập thời gian, hệ thống sẽ tìm những người dùng khác để ghép sân với bạn.</p>
                    <Link className='text-white px-3 py-2 bg-white/5 backdrop-blur-xs border border-white/20 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gray-200/30' to='shop' smooth={true} duration={1000}>Thử ngay</Link>
                  </div>

              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Match