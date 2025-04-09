"use client"

import { useState, useRef, useEffect } from "react"
import { LogOut, User } from "lucide-react"
import { ThemeToggle } from "../../themeToggle"


interface UserDropdownProps {
  user: {
    email: string
    name: string
    role?: string
  }
  onLogout: () => void
  onProfileClick: () => void
  getInitials: (value: string) => string
}

export default function UserDropdown({ user, onLogout = () => {}, onProfileClick = () => {} }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Get first letter of email as initial
  const getInitials = (name: string) => {
    const words = name.trim().split(" ")
    return words.slice(0, 2).map(w => w[0]?.toUpperCase()).join("")
  }
  
  const initials = getInitials(user.name || "")

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
     <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-11 w-11 rounded-full border border-gray-400 text-gray-300 dark:bg-gray-900 hover:bg-gradient-to-br 
                from-gray-900 to-gray-600 hover:border-white hover:text-white dark:hover:text-white
                 dark:hover:bg-gray-700 dark:text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        >
        {initials}
     </button>

      {isOpen && (
        <div className="absolute right-[-25px] mt-3 w-56 rounded-md shadow-lg bg-background border border-border z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => {
                onProfileClick()
                setIsOpen(false)
              }}
              className="flex items-center w-full px-4 py-3 text-sm text-foreground hover:bg-gray-300 dark:hover:bg-gray-700"
              role="menuitem"
            >
              <User className="mr-2 h-4 w-4" />
              Mi perfil
            </button>

            <div className=" hover:bg-gray-300 dark:hover:bg-gray-700">
            <ThemeToggle />
            </div>

            <button
              onClick={() => {
                onLogout()
                setIsOpen(false)
              }}
              className="flex items-center w-full px-4 py-3 text-sm text-foreground hover:bg-gray-300 dark:hover:bg-gray-700"
              role="menuitem"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
