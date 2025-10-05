'use client'

import React from 'react'
import useAuthStore from '@/store/auth.store'
import AuthWrapper from '@/components/wrapper/auth.wrapper'
import { EPageTypes } from '@/type/page.enum'
import { redirect, useRouter } from 'next/navigation'
import MiniLoading from '@/components/ui/mini.loading'
import { useQueryToast } from '@/hooks/UseQueryToast'

const Verify = () => {
  const { user, signout, getVerifyLink, signOutLoading } = useAuthStore()

  const router = useRouter()

  // Bắt sự kiện verify thành công
  useQueryToast({
    param: 'verified',
    message: 'Xác thực email thành công!',
    type: 'success'
  })

  const handleResendVerification = async () => {
    await getVerifyLink()
    console.log('Resend verification email')
  }



  return (
    <AuthWrapper pageType={EPageTypes.VERIFY}>
      <div className="flex-1 w-full flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Xác thực tài khoản
            </h1>
            {user && (
                <p className='mb-3'>Chào <span className='font-bold'>{user.name}</span></p>
              )}
            <p className="text-gray-600 mb-6">
              Vui lòng kiểm tra email của bạn và nhấp vào liên kết xác thực để kích hoạt tài khoản.
            </p>
            <button
              onClick={handleResendVerification}
              className="w-full bg-blue-900 text-white py-2 px-4 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer mb-3"
            >
              Gửi lại email xác thực
            </button>
            <button
              onClick={() => signout()}
              disabled={signOutLoading}
              className="underline text-blue-800 hover:text-blue-700 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
}

export default Verify