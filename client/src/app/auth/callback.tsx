// pages/auth/callback.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGoogleLogin } from '@react-oauth/google';

const Callback = () => {
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
      router.push('/');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    login();
  }, [login]);

  return <div>Đang xử lý...</div>;
};

export default Callback;
