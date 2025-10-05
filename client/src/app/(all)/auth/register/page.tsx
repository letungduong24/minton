'use client'

import React, { useState } from 'react'
import { FaGoogle } from "react-icons/fa"
import Link from 'next/link'
import useAuthStore from '@/store/auth.store'
import { useRouter } from 'next/navigation'
import AuthWrapper from '@/components/wrapper/auth.wrapper'
import { EPageTypes } from '@/type/page.enum'

const Register = () => {
  const router = useRouter()
  const { signup, signInWithGoogle } = useAuthStore()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signup(formData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRegisterWithGoogle = async () => {
    try {
      await signInWithGoogle()
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthWrapper pageType={EPageTypes.NON_AUTHENTICATED}>
      <div className="flex-1 flex flex-col w-full bg-white relative overflow-hidden p-4">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_center,_rgba(59,130,246,0.5)_0%,_transparent_70%)]" />
        <div className="flex-1 flex items-center justify-center">
          <div className="shadow-lg w-full max-w-lg z-20 bg-white rounded-2xl p-6 mx-4 flex flex-col items-center gap-3">
            <div className="space-y-1 text-center">
              <h2 className='font-bold text-xl'>minton.</h2>
              <h2 className='font-bold text-3xl'>Đăng ký</h2>
            </div>
            <form className='w-full flex flex-col gap-3' onSubmit={handleSubmit}>
              <div className="w-full flex flex-col gap-1">
                <label className='font-bold text-sm' htmlFor="name">Họ và tên</label>
                <input
                  className='px-3 py-2 flex-1 outline-none border border-gray-500 rounded-xl focus:shadow-blue-900 focus:shadow transition-all duration-300'
                  name='name'
                  id='name'
                  type="text"
                  placeholder='Nguyễn Văn A'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className='font-bold text-sm' htmlFor="email">Email</label>
                <input
                  className='px-3 py-2 flex-1 outline-none border border-gray-500 rounded-xl focus:shadow-blue-900 focus:shadow transition-all duration-300'
                  name='email'
                  id='email'
                  type="email"
                  placeholder='example@gmail.com'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className='font-bold text-sm' htmlFor="password">Mật khẩu</label>
                <input
                  className='px-3 py-2 flex-1 outline-none border border-gray-500 rounded-xl focus:shadow-blue-900 focus:shadow transition-all duration-300'
                  name='password'
                  id='password'
                  type="password"
                  placeholder='Mật khẩu'
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="text-center text-sm font-bold">
                <p>Đã có tài khoản? <Link href={'/auth/login'} className='underline hover:text-blue-900 transition-all duration-300'>Đăng nhập</Link></p>
              </div>

              <div className="w-full">
                <button className='bg-blue-900 transition-all hover:scale-105 duration-300 cursor-pointer w-full text-white rounded-2xl p-3 font-bold text-md' type='submit'>
                  Đăng ký
                </button>
              </div>

              <div className="text-center text-sm font-bold">
                <p>Hoặc đăng ký với</p>
              </div>

              <div className="w-full">
                <button
                  className='flex items-center gap-1 justify-center bg-white border border-gray-400 transition-all hover:scale-105 duration-300 cursor-pointer w-full rounded-2xl p-3 font-bold text-md'
                  type='button'
                  onClick={handleRegisterWithGoogle}
                >
                  <FaGoogle />
                  Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
}

export default Register
