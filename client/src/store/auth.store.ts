import { create } from 'zustand';
import { toast } from 'sonner';
import api from '@/lib/axios';

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,
    signInLoading: false,

    checkAuth: async () => {
        try {
            const response = await api.get('/auth/me');
            set({ user: response.data });
        } catch (error: any) {
            set({ user: null });
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
            toast.error("Thông tin đăng nhập không hợp lệ!")
            throw new Error()
        } finally{
            set({signInLoading: false})
        }
    },

    // Sign out
    signout: async () => {
        try {
            await api.post('/auth/logout');
            set({ user: null});
            toast.success('Đăng xuất thành công!')
        } catch (error) {
            console.error('Đăng xuất thất bại');
        }
    },

    signInWithGoogle: async () => {
        set({signInLoading: true})
        try {
            window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`
        } catch (error: any) {
            set({ user: null });
            toast.error("Thông tin đăng nhập không hợp lệ!")
            throw new Error()
        } finally{
            set({signInLoading: false})
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