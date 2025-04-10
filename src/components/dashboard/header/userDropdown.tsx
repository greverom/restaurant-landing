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

  const getInitials = (name: string = "") => {
    const words = name.trim().split(/\s+/)
    return words.slice(0, 2).map(w => w[0]?.toUpperCase() || "").join("") || "U"
  }
  //console.log(user.name)
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
        className="h-10 w-10 rounded-full font-bold text-orange-400 bg-gray-100 border hover:border-orange-500
                dark:bg-gray-700  dark:text-gray-300 dark:hover:border-gray-400 flex items-center justify-center transition-all  cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        >
        {initials}
     </button>

      {isOpen && (
        <div className="absolute right-[-25px] mt-5 w-56 rounded-md shadow-lg bg-background dark:bg-gray-700 border border-border z-10">
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

            <div className=" hover:bg-gray-300 dark:hover:bg-gray-600">
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
