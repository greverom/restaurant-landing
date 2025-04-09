"use client"

import Link from "next/link"
import { useState } from "react"
import { useHeaderLogic } from "@/hooks/header/useHeaderLogic"
import { Menu, Utensils, X } from "lucide-react"
import UserDropdown from "./userDropdown"
import UserProfileModal from "./userProfileModal"

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

  const [showProfileModal, setShowProfileModal] = useState(false)

  if (!isLogged || !user) return null

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
        <div className="container mx-auto px-3 sm:px-5 md:px-3 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="hidden items-center md:flex">
              <Link href="/" className="flex items-center space-x-2">
                <Utensils className="h-6 w-6 text-orange-500" />
                <span className="text-xl font-bold">Restaurante</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-6">
              <Link href="/dashboard" className="text-sm text-gray-300 font-medium hover:text-white">Inicio</Link>
              <Link href="/dashboard/mesas" className="text-sm text-gray-300 font-medium hover:text-white">Mesas</Link>
              <Link href="/dashboard/cocina" className="text-sm text-gray-300 font-medium hover:text-white">Cocina</Link>
              <Link href="/dashboard/menu" className="text-sm text-gray-300 font-medium hover:text-white">Menú</Link>

              {user.role === "administrador" && (
                <Link
                  href="/dashboard/register"
                  className="text-sm text-gray-300 font-medium hover:text-white"
                >
                  Registrar Usuario
                </Link>
              )}

              {/* Desktop User Dropdown */}
              <UserDropdown
                user={user}
                getInitials={getInitials}
                onLogout={handleSignOut}
                onProfileClick={() => setShowProfileModal(true)}
              />
            </nav>

            {/* Mobile: UserDropdown + Menu Button */}
            <div className="md:hidden flex items-center justify-end w-full gap-4">
              <UserDropdown
                user={user}
                getInitials={getInitials}
                onLogout={handleSignOut}
                onProfileClick={() => setShowProfileModal(true)}
              />

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-white \
                          hover:bg-gray-900 hover:text-white focus:outline-none"
              >
                <span className="sr-only">Abrir menú principal</span>
                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
          <div
            ref={menuRef}
            className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
              isMenuOpen ? "max-h-[300px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
            }`}
          >
          <div className="flex flex-col px-4 pb-3 pt-2 gap-2">
            <Link
              href="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-white px-4 py-2 rounded-md text-center hover:bg-gray-700 transition"
            >
              Inicio
            </Link>
            <Link
              href="/dashboard/mesas"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-white px-4 py-2 rounded-md text-center hover:bg-gray-700 transition"
            >
              Mesas
            </Link>
            <Link
              href="/dashboard/cocina"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-white px-4 py-2 rounded-md text-center hover:bg-gray-700 transition"
            >
              Cocina
            </Link>
            <Link
              href="/dashboard/menu"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-white px-4 py-2 rounded-md text-center hover:bg-gray-700 transition"
            >
              Menú
            </Link>

            {user.role === "administrador" && (
              <Link
                href="/dashboard/register"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-white px-4 py-2 rounded-md text-center hover:bg-gray-700 transition"
              >
                Registrar Usuario
              </Link>
            )}
          </div>
        </div>
      </header>

      <UserProfileModal
        user={user}
        open={showProfileModal}
        onOpenChange={setShowProfileModal}
      />
    </>
  )
}
