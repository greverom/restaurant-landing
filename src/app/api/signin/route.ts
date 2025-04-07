import { signinMock } from "@/services/signin"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()
  const user = await signinMock(email, password)

  if (!user) {
    return NextResponse.json({ success: false })
  }

  const cookiesHandler = await cookies()

  cookiesHandler.set("isLogged", "ok")
  cookiesHandler.set(
    "user",
    JSON.stringify({
      name: user.name,
      email: user.email,
      role: user.role, 
    })
  )

  return NextResponse.json({ success: true })
}