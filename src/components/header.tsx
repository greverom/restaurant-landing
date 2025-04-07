"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signoutAction } from "@/server/auth/auth"
import { useAuth } from "@/hooks/useAuth"
import { useClickOutside } from "@/hooks/useClickOutside"
import { Menu, X, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./themeToggle"
import { useAuthStore } from "@/store/useAuthStore"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLogged, user } = useAuth()
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)
  useClickOutside(menuRef, () => setIsMenuOpen(false))
  const clearRole = useAuthStore((state) => state.clearUser)

  const handleSignOut = async () => {
    await signoutAction()
    clearRole()
    router.push("/")
  }

  const getInitials = (name: string) => {
    const [first, last] = name.split(" ")
    return `${first[0]}${last ? last[0] : ""}`.toUpperCase()
  }

  if (!isLogged) return null

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Utensils className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold">Restaurante</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-orange-400">Inicio</Link>
            {(user?.role === "administrador" || user?.role === "mesero") && (
              <Link href="/dashboard/mesas" className="text-sm font-medium hover:text-orange-400">Mesas</Link>
            )}
            {(user?.role === "administrador" || user?.role === "mesero" || user?.role === "cocinero") && (
              <Link href="/dashboard/cocina" className="text-sm font-medium hover:text-orange-400">Cocina</Link>
            )}
            {(user?.role === "administrador" || user?.role === "mesero") && (
              <Link href="/dashboard/menu" className="text-sm font-medium hover:text-orange-400">Menú</Link>
            )}

            <div className="flex items-center space-x-2">
            {user && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold">
                {getInitials(user.name)}
              </div>
            )}
            </div>

            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-gray-800"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>

            <div className="flex justify-center py-2">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="space-y-1 px-4 pb-3 pt-2">
          <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 hover:text-orange-400">Inicio</Link>

          {(user?.role === "administrador" || user?.role === "mesero") && (
            <Link href="/dashboard/mesas" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 hover:text-orange-400">Mesas</Link>
          )}
          {(user?.role === "administrador" || user?.role === "mesero" || user?.role === "cocinero") && (
            <Link href="/dashboard/cocina" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 hover:text-orange-400">Cocina</Link>
          )}
          {(user?.role === "administrador" || user?.role === "mesero") && (
            <Link href="/dashboard/menu" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 hover:text-orange-400">Menú</Link>
          )}

          <div className="flex justify-center py-2">
            <ThemeToggle />
          </div>

          <Button
            className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-gray-800"
            variant="outline"
            onClick={() => {
              setIsMenuOpen(false)
              handleSignOut()
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}