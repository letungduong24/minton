import api from "@/lib/axios"

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password })
  return res.data
}

export async function register(email: string, password: string, name: string) {
  const res = await api.post("/auth/login", { email, password, name })
  return res.data
}

export async function getMe() {
  const res = await api.get("/auth/me")
  return res.data
}

export async function logout() {
  const res = await api.post("/auth/logout")
  return res.data
}
