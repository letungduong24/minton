import { create } from 'zustand';
import { toast } from 'sonner';
import api from '@/lib/axios';

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,
    signInLoading: false,
    signUpLoading: false,
    getVerifyLinkLoading: false,

    checkAuth: async () => {
        try {
            const response = await api.get('/auth/me');
            set({ user: response.data});
        } catch (error: any) {
            if(error.response.data.user){
                set({ user: error.response.data.user });
            }
        } finally {
            set({ loading: false });
        }
    },

    // Sign in
    signin: async (credentials: SignInProps) => {
        set({signInLoading: true})
        console.log(credentials)
        try {
            const response = await api.post('/auth/login', credentials)
            set({ user: response.data });
            toast.success('Đăng nhập thành công!')
        } catch (error: any) {
            set({ user: null });
            toast.error(error.response.data.message)
            throw new Error()
        } finally{
            set({signInLoading: false})
        }
    },

    // Sign up
    signup: async (credentials: SignUpProps) => {
        set({signUpLoading: true})
        console.log(credentials)
        try {
            const response = await api.post('/auth/register', credentials)
            set({ user: response.data });
            toast.success('Đăng ký thành công!')
        } catch (error: any) {
            set({ user: null });
            toast.error(error.response.data.message)
            throw new Error()
        } finally{
            set({signUpLoading: false})
        }
    },

    // Sign out
    signout: async () => {
        try {
            await api.post('/auth/logout');
            set({ user: null});
            toast.success('Đăng xuất thành công!')
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    },

    signInWithGoogle: async () => {
        set({signInLoading: true})
        try {
            window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`
        } catch (error: any) {
            set({ user: null });
            toast.error(error.response.data.message)
            throw new Error()
        } finally{
            set({signInLoading: false})
        }
    },

    getVerifyLink: async () => {
        set({getVerifyLinkLoading: true})
        try {
            const response = await api.get('/auth/resend-verifylink')
            toast.success(response.data?.message)
        } catch (error: any) {
            toast.error(error.response.data.message)
            throw new Error()
        } finally{
            set({getVerifyLinkLoading: false})
        }
    },


    // // Update profile
    // updateProfile: async (info: UpdateProfileProps) => {
    //     set({ updateProfileLoading: true });
    //     try {
    //         const response = await api.put('/user/update', info);
    //         set({ profile: response.data.user });
    //         return response.data;
    //     } catch (error) {
    //         throw error;
    //     } finally {
    //         set({ updateProfileLoading: false });
    //     }
    // },
}));

export default useAuthStore; 