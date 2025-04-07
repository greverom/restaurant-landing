
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const cookiesHandler = await cookies() 
  const userCookie = cookiesHandler.get("user")

  if (!userCookie?.value) {
    return NextResponse.json({ user: null })
  }

  try {
    const user = JSON.parse(userCookie.value)
    return NextResponse.json({ user })
  } catch (e) {
    console.error("Error al parsear la cookie del usuario:", e)
    return NextResponse.json({ user: null })
  }
}