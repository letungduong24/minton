import { create } from 'zustand';
import api from '../Lib/axios';

const useAuthStore = create((set) => ({
    user: null,
    loading: true,

    getProfileLoading: true,

    signInLoading: false,
    signUploading: false,

    updateProfileLoading: false,

    checkAuth: async () => {
        try {
            const response = await api.get('/auth/me');
            set({ user: response.data.data.user, loading: false,});
        } catch (error) {
            set({ user: null, loading: false });
            throw error
        }
    },

    signin: async ({ email, password }) => {
        set({signInLoading: true})
        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });

            set({ user: response.data.data.user});
        } catch (error) {
            throw error;
        } finally{
            set({signInLoading: false})
        }
    },

    // Sign up
    signup: async ({ username, email, password }) => {
        set({signUploading: true})
        try {
            const response = await api.post('/auth/register', {
                username,
                email,
                password
            });

            set({ user: response.data.data.user});

        } catch (error) {
            throw error;
        } finally{
            set({signUploading: false})
        }
    },

    // Sign out
    signout: async () => {
        try {
            await api.post('/auth/logout');
            set({ user: null, error: null });
        } catch (error) {
            throw error;
        }
    },

    // Update profile
    updateProfile: async ({ username, bio, profilePicture }) => {
        set({ updateProfileLoading: true });
        try {
            const response = await api.put('/auth/updateprofile', {
                phone,
                profilePicture
            });
            set({ user: response.data.data.user });
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            set({ updateProfileLoading: false });
        }
    },
}));

export default useAuthStore; 