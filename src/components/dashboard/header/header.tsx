"use client"

import Link from "next/link"
import { useState } from "react"
import { useHeaderLogic } from "@/hooks/header/useHeaderLogic"
import { Menu, X } from "lucide-react"
import Image from "next/image"
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
      <header className="fixed top-0 left-0 z-50 w-full bg-gray-100 border-b border-gray-300 dark:border-b dark:border-none dark:border-opacity-20
                           dark:bg-gray-800 dark:text-gray-300 text-gray-700 transition-colors duration-500">
        <div className="container mx-auto px-3 sm:px-5 md:px-3 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="hidden items-center md:flex">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/icons/logoRecipe.png"
                  alt="Logo Recetas"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                <span className="text-xl font-bold">Recetas</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-6">
              <Link href="/dashboard" className="text-sm text-gray-500 dark:text-gray-300 font-medium hover:gray-600">Inicio</Link>
              <Link href="/dashboard/favoritos" className="text-sm text-gray-500 dark:text-gray-300 font-medium hover:gray-600">Favoritos</Link>

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
                className="inline-flex items-center justify-center rounded-md p-2 gray-600 \
                          hover:bg-gray-900 hover:gray-600 focus:outline-none"
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
            className={`transition-all duration-500 ease-in-out overflow-hidden md:hidden ${
              isMenuOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
            }`}
          >
          <div className="flex flex-col px-4 pb-3 pt-2 gap-2">
            <Link
              href="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="w-full gray-600 px-4 py-2 rounded-md text-center hover:bg-gray-700 transition"
            >
              Inicio
            </Link>
            <Link
              href="/dashboard/favoritos"
              onClick={() => setIsMenuOpen(false)}
              className="w-full gray-600 px-4 py-2 rounded-md text-center hover:bg-gray-700 transition"
            >
              Faboritos
            </Link>
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
