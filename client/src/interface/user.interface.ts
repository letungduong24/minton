interface User {
  uid: string
  name: string
  email: string
  image: string,
  role: string,
  isVerified: boolean,
  createAt: Date,
  updatedAt: Date,
  AuthProvider: AuthProviderType
}

enum AuthProviderType {
  GOOGLE = 'GOOGLE',
  CREDENTIALS = 'CREDENTIALS'
}
