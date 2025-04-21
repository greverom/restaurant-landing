"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { signoutAction } from "@/server/auth/logout/actions"
import { createClient } from "@/utils/supabase/client"
import { useAuthStore } from "@/store/useAuthStore"
import { useClickOutside } from "../useClickOutside"

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
      if (user) return

      // Si estás offline, intenta recuperar del localStorage
      if (!navigator.onLine) {
        try {
          const cached = localStorage.getItem("cached-user")
          if (cached) {
            const offlineUser = JSON.parse(cached)
            setUser(offlineUser)
            console.log("Usuario cargado desde localStorage")
          } else {
            console.warn("No hay datos guardados de usuario en localStorage")
          }
        } catch (err) {
          console.error(" Error al leer el usuario desde localStorage", err)
        }
        return
      }

      // Si estás online, consulta normalmente a Supabase
      try {
        const supabase = createClient()
        const { data } = await supabase.auth.getUser()

        if (data.user) {
          const parsedUser = {
            id: data.user.id,
            email: data.user.email ?? "email@example.com",
            name: data.user.user_metadata?.display_name ?? data.user.email ?? "Usuario",
            role: data.user.user_metadata?.role ?? undefined,
            created_at: data.user.created_at,
            last_sign_in_at: data.user.last_sign_in_at ?? undefined,
          }

          setUser(parsedUser)
          localStorage.setItem("cached-user", JSON.stringify(parsedUser))
          console.log("Usuario guardado en Zustand y localStorage")
        }
      } catch (err) {
        console.error("Error al obtener el usuario desde Supabase", err)
      }
    }

    fetchUser()
  }, [user, setUser])

  const handleSignOut = async () => {
    await signoutAction()
    clearUser()
    localStorage.removeItem("cached-user")
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