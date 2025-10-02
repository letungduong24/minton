'use client'

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface UseQueryToastProps {
  param: string;      
  message: string;    
  type?: "success" | "error" | "info" | "warning";
}

export function useQueryToast({ param, message, type = "success" }: UseQueryToastProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const value = searchParams.get(param);
    if (value) {
      switch (type) {
        case "success":
          toast.success(message);
          break;
        case "error":
          toast.error(message);
          break;
        case "info":
          toast(message); 
          break;
        case "warning":
          toast.warning(message);
          break;
      }
    }
  }, [searchParams, param, message, type]);
}
