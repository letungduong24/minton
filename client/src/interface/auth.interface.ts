interface AuthState {
    user: User | null
    loading: boolean
    signInLoading: boolean
    signUpLoading: boolean
    signOutLoading: boolean
    getVerifyLinkLoading: boolean
    checkAuth: () => Promise<void>
    signout: () => Promise<void>
    signin: (credentials: SignInProps) => Promise<void>
    signInWithGoogle: () => Promise<void>
    signup: (credentials: SignUpProps) => Promise<void>
    getVerifyLink: () => Promise<void>
}