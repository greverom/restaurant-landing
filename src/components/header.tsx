"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./themeToggle"


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Utensils className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold">Restaurante</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-orange-400">
              Inicio
            </Link>
            <Link href="/mesas" className="text-sm font-medium hover:text-orange-400">
              Mesas
            </Link>
            <Link href="/cocina" className="text-sm font-medium hover:text-orange-400">
              Cocina
            </Link>
            <Link href="/menu" className="text-sm font-medium hover:text-orange-400">
              Menú
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-orange-400">
              Iniciar Sesión
            </Link>
            <ThemeToggle />
            <Button className="ml-4 bg-orange-500 hover:bg-orange-600">
              <Link href="/register">Registrarte</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="space-y-1 px-4 pb-3 pt-2">
          <Link
            href="/"
            className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-800 hover:text-orange-400"
          >
            Inicio
          </Link>
          <Link
            href="/mesas"
            className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-800 hover:text-orange-400"
          >
            Mesas
          </Link>
          <Link
            href="/cocina"
            className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-800 hover:text-orange-400"
          >
            Cocina
          </Link>
          <Link
            href="/menu"
            className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-800 hover:text-orange-400"
          >
            Menú
          </Link>
          <Link
            href="/login"
            className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-800 hover:text-orange-400"
          >
            Iniciar Sesión
          </Link>
          <div className="flex justify-center py-2">
            <ThemeToggle />
          </div>
          <div className="pt-2">
            <Button className="w-full bg-orange-500 hover:bg-orange-600">
              <Link href="/register">Registrarte</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

