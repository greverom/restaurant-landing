import { create } from "zustand"

type Role = "administrador" | "mesero" | "cocinero"

interface AuthStore {
  role: Role | null
  setRole: (role: Role) => void
  clearRole: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  clearRole: () => set({ role: null }),
}))