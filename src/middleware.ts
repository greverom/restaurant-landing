import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const isLogged = request.cookies.get("isLogged")

  const url = request.nextUrl.clone()

  const protectedRoutes = [
    "/dashboard",
    "/mesas",
    "/menu",
    "/cocina",
    "/reservas",
  ]

  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) && !isLogged) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  if (request.nextUrl.pathname === "/login" && isLogged) {
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  if (request.nextUrl.pathname === "/" && isLogged) {
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}