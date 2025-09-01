import React, { useState } from 'react'
import useAuthStore from '../../store/authStore'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import signInImg from '../../assets/images/signin.jpg'

const SignIn = () => {

    const backgroundStyle = {
        backgroundImage: `url(${signInImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'cover',
    };

    const {signin, signInLoading} = useAuthStore()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (e) => {
        try {
            e.preventDefault()
            await signin({email, password})
            toast.success('Đăng nhập thành công')
            navigate('/')
        } catch (error) {
            toast.error('Đăng nhập thất bại')
        }
    }

  return (
    <>
        <div className='w-full h-screen hidden md:grid grid-cols-2'>
            <div className="w-full h-full flex flex-col">
                <div className="space-y-3 flex flex-1 flex-col justify-center items-center">
                    <h1 className=' text-center'>Trường THPT Trương Châm</h1>
                    <h1 className='text-3xl font-bold text-center'>Đăng nhập</h1>
                    <form onSubmit={(e) => handleLogin(e)} className="flex flex-col w-full max-w-xl gap-4 items-center px-10">
                        <div className="w-full">
                            <label className='flex justify-start'  htmlFor="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} id='email' className='w-full border border-black/30 px-5 py-4 rounded-xl focus:outline-black/30' type="text" placeholder='Nhập email' />
                        </div>
                        <div className="w-full">
                            <label className='flex justify-start'  htmlFor="password">Mật khẩu</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' className='w-full border border-black/30 px-5 py-4 rounded-xl focus:outline-black/30' type="password" placeholder='Nhập mật khẩu' />
                        </div>
                        <button className='bg-blue-800 px-5 py-4 cursor-pointer hover:bg-blue-900 transition-all duration-300 text-white w-full font-bold rounded-xl'>Đăng nhập</button>
                    </form>
                </div>
                <p className='flex items-center justify-center text-sm px-6 py-4'>© 2025 Sedu. All rights reserved.</p>
            </div>
            <div style={backgroundStyle} className="w-full bg-red-200 h-full">

            </div>
        </div>
        <div style={backgroundStyle} className='w-full h-screen md:hidden grid-cols-2'>
            <div className="w-full h-full flex flex-col">
                <div className="flex flex-1 flex-col justify-center items-center px-5">
                    <div className="space-y-3 w-full bg-white/40 p-5 rounded-2xl backdrop-blur-2xl">
                        <h1 className='text-sm text-center'>Trường THPT Trương Châm</h1>
                        <h1 className='text-2xl font-bold text-center'>Đăng nhập</h1>
                        <form onSubmit={(e) => handleLogin(e)} className="flex flex-col w-full max-w-xl gap-4 items-center">
                            <div className="w-full">
                                <label className='flex justify-start'  htmlFor="email">Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} id='email' className='w-full border border-black/30 px-5 py-4 rounded-xl focus:outline-black/30' type="text" placeholder='Nhập email' />
                            </div>
                            <div className="w-full">
                                <label className='flex justify-start'  htmlFor="password">Mật khẩu</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' className='w-full border border-black/30 px-5 py-4 rounded-xl focus:outline-black/30' type="password" placeholder='Nhập mật khẩu' />
                            </div>
                            <button className='bg-blue-800 px-5 py-4 cursor-pointer hover:bg-blue-900 transition-all duration-300 text-white w-full font-bold rounded-xl'>Đăng nhập</button>
                        </form>
                        <p className='flex items-center justify-center text-sm'>© 2025 Sedu. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </>
    
  )
}

export default SignIn