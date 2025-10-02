'use client'

import { useQueryToast } from "@/hooks/UseQueryToast";
import useAuthStore from "@/store/auth.store";
import {  useSearchParams } from 'next/navigation';
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const {user} = useAuthStore()

  useQueryToast({
    param: 'success',
    message: 'Đăng nhập thành công',
    type: 'success'
  })

  return (
    <>
      <p>Hi, {user?.name || 'Khách'}</p>
    </>


  );
}
