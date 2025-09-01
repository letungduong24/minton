import React from 'react'
import backgroundImage from '../../assets/bg.jpg'
import court from '../../assets/court.jpg'
import { Link as ToSection } from 'react-scroll'
import { Link } from "react-router";
import {motion} from "framer-motion"
const Court = () => {

  return (
    <div id='court'>
        <div className="relative w-full h-screen text-gray-700 pt-5">
          <div className="z-10 flex flex-col h-full">
            <div className="flex justify-center md:justify-start">
              <h2 className='md:ml-5 font-medium text-2xl flex items-center gap-1 p-3 bg-gray-200/60 w-fit rounded-full'>
              <span className="w-8 h-8 p-5 bg-black text-white rounded-full flex justify-center items-center">2</span>
              <span className='px-1'>Thuê sân cầu lông</span>
            </h2>
            </div>
            <div className="flex flex-col justify-center md:flex-row flex-grow gap-5 ">
              <div className="md:h-full w-full md:w-1/2 relative flex items-center p-5">
                <motion.img
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1 }}
                  src={court}
                  alt=""
                  className='rounded-2xl shadow-2xl'
                />
              </div>
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1 }}
                className=" md:h-full md:w-1/2 w-full flex justify-center items-center md:items-end flex-col space-y-3 p-3">
                  <h1 className='font-bold text-2xl md:text-3xl text-center md:text-end'>Đặt sân trực tuyến dễ dàng qua web.</h1>
                  <p className='text-center md:text-end'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio voluptate nam hic perferendis illum tempore fugit est assumenda odit adipisci.</p>
                  <div className="flex items-center gap-2">
                    <ToSection className='cursor-pointer border border-black hover:scale-x-105 transition-all duration-300 p-3 rounded-2xl' to='match' smooth={true} duration={1000}>Khám phá tiếp</ToSection>
                    <Link className='bg-black text-white p-3 rounded-2xl hover:scale-x-105 hover:bg-gray-600 transition-all duration-300'>Đặt sân ngay</Link>
                  </div>
              </motion.div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Court