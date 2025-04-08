"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { signoutAction } from "@/server/auth/logout/actions"
import { useClickOutside } from "./useClickOutside"
import { createClient } from "@/utils/supabase/client"
import { useAuthStore } from "@/store/useAuthStore"

export function useHeaderLogic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const clearUser = useAuthStore((state) => state.clearUser)

  const isLogged = !!user

  useClickOutside(menuRef, () => setIsMenuOpen(false))

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const supabase = createClient()
        const { data } = await supabase.auth.getUser()

        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email ?? "email@example.com",
            name: data.user.user_metadata?.name ?? data.user.email ?? "Usuario",
            role: data.user.user_metadata?.role ?? undefined,
          })
        }
      }
    }

    fetchUser()
  }, [user, setUser])

  const handleSignOut = async () => {
    await signoutAction()
    clearUser()
    router.push("/")
  }

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ")
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  return {
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    handleSignOut,
    isLogged,
    user,
    getInitials,
  }
}