import { create } from "zustand"

type Role = "administrador" | "mesero" | "cocinero"

type User = {
  name: string
  email: string
  role: Role
}

interface AuthStore {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))