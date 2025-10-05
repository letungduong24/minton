'use client'

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface UseQueryToastProps {
  param: string;      
  type?: "success" | "error" | "info" | "warning";
}

export function useQueryToast({ param, type = "success" }: UseQueryToastProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const value = searchParams.get(param);
    if (value) {
      switch (type) {
        case "success":
          toast.success(value);
          break;
        case "error":
          toast.error(value);
          break;
        case "info":
          toast(value); 
          break;
        case "warning":
          toast.warning(value);
          break;
      }
    }
  }, [searchParams, param, type]);
}
