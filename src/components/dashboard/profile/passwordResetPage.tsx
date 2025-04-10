"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { setNewPassword } from "@/server/auth/login/actions"

export default function ResetPasswordPage() {
  const [newPassword, setNewPasswordState] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const isValid = newPassword.length >= 6 && newPassword === confirmPassword

  const handleSubmit = async () => {
    if (!isValid) return
    setLoading(true)

    try {
      const { success, message } = await setNewPassword(newPassword)

      if (success) {
        toast.success("Contraseña actualizada correctamente")
        router.replace("/login")
      } else {
        toast.error("Error al cambiar la contraseña", {
          description: message || "Ocurrió un error inesperado.",
        })
      }
    } catch (error) {
      toast.error("Error al cambiar la contraseña", {
        description: (error as Error)?.message || "Ocurrió un error inesperado.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-semibold text-center mb-4">Establecer nueva contraseña</h2>
      <div className="space-y-4">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPasswordState(e.target.value)}
            className="pr-10"
          />
          <button
            type="button"
            className="absolute right-2 top-2.5 text-gray-500"
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
        />

        <Button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          {loading ? "Guardando..." : "Guardar contraseña"}
        </Button>
      </div>
    </div>
  )
}
