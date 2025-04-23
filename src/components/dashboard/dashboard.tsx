"use client"

import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import RecipeCategories from "../recipe/recipeCategories"


export default function DashboardClient() {
  const user = useAuthStore((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (navigator.onLine && !user) {
      router.replace("/login")
    }
  }, [user, router])

  if (!user) {
    return (
      <p className="text-center text-muted-foreground py-10">
        Cargando usuario...
      </p>
    )
  }

  const userName = user.name ?? "Usuario"

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900">
      <main className="w-full max-w-6xl px-4 md:px-6 py-10 mx-auto">
        <div className="flex flex-col gap-14">
          <div>
            <h1 className="text-xl font-bold md:text-2xl">Bienvenido, {userName} 👋</h1>
            <p className="text-sm text-muted-foreground">
              Explora nuestras categorías de recetas.
            </p>
          </div>

          <RecipeCategories />
        </div>
      </main>
    </div>
  )
}