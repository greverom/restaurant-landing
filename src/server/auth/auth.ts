"use server"

import { signinMock } from "@/services/signin"
import { cookies } from "next/headers"


export const signinAction = async (email: string, password: string) => {
  const user = await signinMock(email, password)

  if (!user) {
    return false
  }

  const cookiesHandler = await cookies()

  cookiesHandler.set("isLogged", "ok", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })

  cookiesHandler.set("user", JSON.stringify({
    name: user.name,
    email: user.email,
    role: user.role,
    
  }), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })

  return true
}

export const signoutAction = async () => {
  const cookiesHandler = await cookies()

  cookiesHandler.delete("isLogged")
  cookiesHandler.delete("user")
 
}