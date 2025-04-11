"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"

export default function ResetPasswordPage() {
  const [newPassword, setNewPasswordState] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const isValid = newPassword.length >= 6 && newPassword === confirmPassword

  const handleSubmit = async () => {
    if (!isValid) return
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password: newPassword })

      if (error) {
        toast.error("Error al cambiar la contraseña", {
          description: error.message,
        })
      } else {
        toast.success("Contraseña actualizada correctamente")
        // Mostramos el botón de "Volver a iniciar sesión"
        setShowLogin(true)
      }
    } catch (error) {
      toast.error("Error inesperado", {
        description: (error as Error)?.message || "Ocurrió un error inesperado.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg mt-20">
      <h2 className="text-xl font-semibold text-center mb-4">Establecer nueva contraseña</h2>
      <div className="space-y-6">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPasswordState(e.target.value)}
            className="pr-10 dark:bg-gray-800"
          />
          <button
            type="button"
            className="absolute right-2 top-2.5 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <Input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="pr-10 dark:bg-gray-800"
        />

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-500 cursor-pointer"
        >
          {loading ? "Guardando..." : "Guardar contraseña"}
        </Button>

        {showLogin && (
          <Link
            href="/login"
            className="block text-center text-blue-500 hover:text-blue-600 hover:underline transition-all"
          >
            Volver a iniciar sesión
          </Link>
        )}
      </div>
    </div>
  )
}