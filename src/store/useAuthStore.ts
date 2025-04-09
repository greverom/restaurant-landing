import { create } from "zustand"

type Role = "administrador" | "mesero" | "cocinero"

type User = {
  id: string
  name: string
  email: string
  role?: Role
  created_at?: string
  last_sign_in_at?: string | null
}

interface AuthStore {
  user: User | null
  loading: boolean
  error: string | null
  setUser: (user: User) => void
  clearUser: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))