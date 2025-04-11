"use client"

import { useRef, useState } from "react"
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

export default function UserDropdown({ user, onLogout, onProfileClick, getInitials }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const initials = getInitials(user.name)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 300) 
  }

  return (
    <div
      className="relative z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Avatar */}
      <div
        className="h-10 w-10 rounded-full font-bold text-gray-600 bg-gray-100 border hover:border-gray-500
        dark:bg-gray-700 dark:text-gray-300 dark:hover:border-gray-400 flex items-center justify-center 
        transition-all cursor-pointer"
      >
        {initials}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-[-25px] mt-3 w-56 rounded-md shadow-lg bg-background dark:bg-gray-700 border border-border z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => {
                onProfileClick()
                setIsOpen(false)
              }}
              className="flex items-center w-full px-4 py-3 text-sm text-foreground hover:bg-gray-300 dark:hover:bg-gray-600"
              role="menuitem"
            >
              <User className="mr-2 h-4 w-4" />
              Mi perfil
            </button>

            <div className="hover:bg-gray-300 dark:hover:bg-gray-600">
              <ThemeToggle />
            </div>

            <button
              onClick={() => {
                onLogout()
                setIsOpen(false)
              }}
              className="flex items-center w-full px-4 py-3 text-sm text-foreground hover:bg-gray-300 dark:hover:bg-gray-600"
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