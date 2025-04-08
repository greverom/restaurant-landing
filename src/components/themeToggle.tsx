"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <Button
    variant="ghost"
    onClick={() => setTheme(isDark ? "light" : "dark")}
    className="w-full h-full flex items-center justify-start gap-2 px-3 ml-1 py-3 text-sm text-gray-800 dark:text-white 
                bg-transparent hover:bg-transparent dark:hover:bg-transparent focus:bg-transparent active:bg-transparent"
  >
    {isDark ? (
      <>
        <Sun className="h-5 w-5" />
        <span>Modo Claro</span>
      </>
    ) : (
      <>
        <Moon className="h-5 w-5" />
        <span>Modo Oscuro</span>
      </>
    )}
  </Button>
  )
}