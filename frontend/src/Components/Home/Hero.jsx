import React from 'react'
import backgroundImage from '../../assets/bg.jpg'
import {Link} from 'react-scroll'

const Hero = () => {
    const bg = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100vh",
  };
  return (
    <div id='hero' className='w-full h-screen'>
        <div style={bg} className="relative w-full max-h-full flex">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="z-10 w-full flex items-center lg:items-end justify-center lg:mr-10 flex-col space-y-2">
            <h2 className=' text-4xl md:text-5xl lg:text-6xl font-bold text-white'>MINT-ON BADMINTON</h2>
            <p className='text text-white hidden lg:block'>"Đặt sân, mua vợt, kết nối bạn chơi. Mint-on giúp bạn luôn sẵn sàng cho những trận cầu đầy hứng khởi."</p>
            <p className='text text-white lg:hidden'>Đặt sân, mua vợt, kết nối bạn chơi</p>
            <Link className='text-white px-3 py-2 bg-white/5 backdrop-blur-xs border border-white/20 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gray-200/30' to='shop' smooth={true} duration={1000}>Khám phá</Link>
          </div>
        </div>
    </div>
  )
}

export default Hero