'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import * as DropDownMenu from '@radix-ui/react-dropdown-menu';
import useAuthStore from '@/store/auth.store';
import { IoIosMenu } from "react-icons/io";

type MenuItem = {
  label: string
  href: string
}

const MenuUnauthenticated: MenuItem[] = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Đăng nhập",
    href: "/auth/login",
  },
  {
    label: "Đăng ký",
    href: "/auth/register",
  },
]

const MenuAuthenticated: MenuItem[] = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Cửa hàng",
    href: "/shop",
  },
  {
    label: "Đặt sân",
    href: "/court",
  },
]

const Navbar = () => {
  const pathName = usePathname()
  const router = useRouter()
  const { user, signout } = useAuthStore()
  const handleSignOut = async () => {
    try {
      await signout()
      router.push('/')
    } catch (error) {
      
    }
    
  }
  return (
    <>
      <div className='md:flex bg-white sticky top-0 hidden justify-between items-center w-full px-10 py-3 z-40 shadow'>
        <div className="flex items-center">
          <h1 className='font-bold text-3xl'>minton.</h1>
        </div>
        <div className=" flex items-center bg-gray-100 rounded-full p-2 gap-2">
          {user ? (
            MenuAuthenticated.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`
                  ${item.href !== pathName ? 'hover:bg-gray-200' : 'bg-white rounded-full hover:bg-gray-500 hover:text-white'}
                  px-3 py-2 font-bold hover:scale-105 transition-all duration-300 rounded-full cursor-pointer
                `}
              >
                {item.label}
              </Link>
            ))
          ) : (
            MenuUnauthenticated.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`
                  ${item.href !== pathName ? 'hover:bg-gray-200' : 'bg-white rounded-full hover:bg-gray-500 hover:text-white'}
                  px-3 py-2 font-bold hover:scale-105 transition-all duration-300 rounded-full cursor-pointer
                `}
              >
                {item.label}
              </Link>
            ))
          )}
        </div>
        <DropDownMenu.Root modal = {false}>
          <DropDownMenu.Trigger className='outline-none flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 cursor-pointer hover:scale-105 transition-all duration-300'>
            <div className="rounded-full bg-blue-400 w-8 h-8"></div>
            <p>{user && user?.name || "Khách"}</p>
          </DropDownMenu.Trigger>

          {user && (
            <DropDownMenu.Content className="mt-2 w-48 bg-white rounded-2xl shadow-2xl p-2">
              <DropDownMenu.Item className="px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer outline-none">
                Tài khoản
              </DropDownMenu.Item>
              <DropDownMenu.Item className="px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer outline-none">
                <button onClick={handleSignOut}>Đăng xuất</button>
              </DropDownMenu.Item>
          </DropDownMenu.Content>
          )}
        </DropDownMenu.Root>
      </div>

      <div className='bg-white sticky top-0 flex md:hidden justify-between items-center w-full px-5 py-3 z-40 shadow'>
        <div className="flex items-center">
          <h1 className='font-bold text-2xl'>minton.</h1>
        </div>
        <div className=" flex items-center bg-gray-100 rounded-full p-2 gap-2">
          
        </div>
        <div className="flex gap-2 items-center">
          <DropDownMenu.Root modal = {false}>
            <DropDownMenu.Trigger className='outline-none flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 cursor-pointer hover:scale-105 transition-all duration-300'>
              <div className="rounded-full bg-blue-400 w-8 h-8"></div>
              <p>{user && user?.name || "Khách"}</p>
            </DropDownMenu.Trigger>

            {user && (
              <DropDownMenu.Content align='end' sideOffset={2} className="mt-2 w-fit bg-white rounded-2xl shadow-2xl p-2 flex flex-col items-start">
                <DropDownMenu.Item asChild className={`${'/profile' === pathName && 'bg-gray-200'}  px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer outline-none transition-all duration-300`}>
                    <Link 
                      href='/profile'
                    >
                    Tài khoản
                    </Link>
                </DropDownMenu.Item>
                <DropDownMenu.Item asChild className="px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer outline-none">
                    <Link 
                      href='/profile'
                    >
                    Cài đặt
                    </Link>
                </DropDownMenu.Item>
                <DropDownMenu.Item asChild className="px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer outline-none">
                  <button onClick={handleSignOut}>Đăng xuất</button>
                </DropDownMenu.Item>
            </DropDownMenu.Content>
            )}
          </DropDownMenu.Root>

          <DropDownMenu.Root modal = {false}>
            <DropDownMenu.Trigger className=''>
              <div className='text-2xl bg-gray-100 rounded-full p-3 h-full block'>
                <IoIosMenu />
              </div>
            </DropDownMenu.Trigger>
              <DropDownMenu.Content align='end' sideOffset={2} className="mt-2 bg-white rounded-2xl shadow-2xl p-2 flex flex-col items-start w-fit">
                {user ? (
                  MenuAuthenticated.map((item) => (
                    <DropDownMenu.Item asChild key={item.href} className={`${item.href === pathName && 'bg-gray-200'}  px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer outline-none transition-all duration-300`}>
                      <Link 
                        key={item.href}
                        href={item.href} 
                      >
                        {item.label}
                      </Link>
                    </DropDownMenu.Item>
                    
                  ))
                ) : (
                  MenuUnauthenticated.map((item) => (
                    <DropDownMenu.Item key={item.href} className={`${item.href === pathName && 'bg-gray-200'}  px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer outline-none transition-all duration-300`}>
                      <Link 
                        key={item.href}
                        href={item.href} 
                      >
                        {item.label}
                      </Link>
                    </DropDownMenu.Item>
                  ))
                )}
              </DropDownMenu.Content>
          </DropDownMenu.Root>
          
        </div>
      </div>
    </>
  )
}

export default Navbar