"use client"

import Link from "next/link"
import { useHeaderLogic } from "@/hooks/useHeaderLogic"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./themeToggle"
import { LogOut, Menu, Utensils, X } from "lucide-react"
import UserDropdown from "./userDropdown"

export default function Header() {
  const {
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    handleSignOut,
    isLogged,
    user,
    getInitials,
  } = useHeaderLogic()

  if (!isLogged || !user) return null

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
      <div className="container mx-auto md:px-4">
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
            <Link href="/dashboard/mesas" className="text-sm font-medium hover:text-orange-400">Mesas</Link>
            <Link href="/dashboard/cocina" className="text-sm font-medium hover:text-orange-400">Cocina</Link>
            <Link href="/dashboard/menu" className="text-sm font-medium hover:text-orange-400">Menú</Link>

            {user.role === "administrador" && (
              <Button
                asChild
                variant="outline"
                className="border-white text-white bg-gray-800 hover:bg-orange-500 hover:border-orange-500 
                            hover:text-white dark:hover:bg-orange-500 dark:hover:border-orange-500 dark:border-white 
                            transition duration-300 ease-in-out"
              >
                <Link href="/register">Registrar Usuario</Link>
              </Button>
            )}

             {/* dropdown del usuario */}
             <UserDropdown
              user={user}
              getInitials={getInitials}
              onLogout={handleSignOut}
              onProfileClick={() => {
                console.log("Perfil clicado")
              }}
            />
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
          <Link href="/dashboard/mesas" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 hover:text-orange-400">Mesas</Link>
          <Link href="/dashboard/cocina" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 hover:text-orange-400">Cocina</Link>
          <Link href="/dashboard/menu" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 hover:text-orange-400">Menú</Link>

          {user.role === "administrador" && (
            <Link
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-green-500 hover:text-green-600"
            >
              Registrar Usuario
            </Link>
          )}

          <div className="flex justify-center py-2">
            <ThemeToggle />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="w-full text-orange-500 hover:bg-orange-100 dark:hover:bg-gray-800"
            onClick={() => {
              setIsMenuOpen(false)
              handleSignOut()
            }}
          >
            <LogOut className="h-5 w-5 mx-auto" />
            <span className="sr-only">Cerrar sesión</span>
          </Button>
        </div>
      </div>
    </header>
  )
}