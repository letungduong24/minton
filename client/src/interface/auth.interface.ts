interface AuthState {
    user: User | null
    loading: boolean
    signInLoading: boolean
    checkAuth: () => Promise<void>
    signout: () => Promise<void>
    signin: (credentials: SignInProps) => Promise<void>
    signInWithGoogle: () => Promise<void>
}