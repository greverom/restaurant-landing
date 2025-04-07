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

    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=")
      acc[key] = value
      return acc
    }, {} as Record<string, string>)

    //console.log(cookies)

    if (cookies["isLogged"] === "ok" && cookies["user"]) {
      try {
        const parsedUser: User = JSON.parse(decodeURIComponent(cookies["user"]))
        //console.log(parsedUser)
        setUser(parsedUser)
        setIsLogged(true)
      } catch (error) {
        console.error("❌ Error al parsear la cookie del usuario:", error)
        setUser(null)
        setIsLogged(false)
      }
    } else {
      console.warn("⚠️ No hay cookies válidas para sesión.")
      setUser(null)
      setIsLogged(false)
    }
  }, [])

  return { user, isLogged, role: user?.role }
}