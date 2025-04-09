"use client"

import { useEffect, useState } from "react"

type Role = "administrador" | "mesero" | "cocinero"

type User = {
  name: string
  email: string
  role: Role
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me")
        const data = await res.json()

        if (data.user) {
          setUser(data.user)
          setIsLogged(true)
        } else {
          setUser(null)
          setIsLogged(false)
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error)
        setUser(null)
        setIsLogged(false)
      }
    }

    fetchUser()
  }, [])

  return { user, isLogged, role: user?.role }
}