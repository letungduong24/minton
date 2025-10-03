'use client'

import React, { useEffect } from 'react'
import useAuthStore from '@/store/auth.store'
import { useRouter } from 'next/navigation'

const Verify = () => {
  const { user } = useAuthStore()
  const router = useRouter()
  const { getVerifyLink } = useAuthStore()

  useEffect(() => {
    // Nếu user đã verify, redirect về trang chủ
    if (user && user.isVerified) {
      router.push('/')
    }
  }, [user, router])

  const handleResendVerification = async () => {
    await getVerifyLink()
    console.log('Resend verification email')
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Xác thực tài khoản
          </h1>
          <p className="text-gray-600 mb-6">
            Vui lòng kiểm tra email của bạn và nhấp vào liên kết xác thực để kích hoạt tài khoản.
          </p>
          <button
            onClick={handleResendVerification}
            className="w-full bg-blue-900 text-white py-2 px-4 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Gửi lại email xác thực
          </button>
        </div>
      </div>
    </div>
  )
}

export default Verify