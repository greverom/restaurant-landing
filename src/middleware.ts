import { updateSession } from "@/utils/supabase/middleware" 
import { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {

  return await updateSession(request)
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
}