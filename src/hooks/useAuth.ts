"use client"

import { useEffect, useState } from "react"

type User = {
  name: string
  email: string
  role: "administrador" | "mesero" | "cocinero"
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=")
      acc[key] = value
      return acc
    }, {} as Record<string, string>)

    if (cookies["isLogged"] === "ok" && cookies["user"]) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(cookies["user"]))
        setUser(parsedUser)
        setIsLogged(true)
      } catch (error) {
        console.error("Error al parsear user cookie", error)
      }
    } else {
      setUser(null)
      setIsLogged(false)
    }
  }, [])

  return { user, isLogged, role: user?.role }
}