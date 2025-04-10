'use client'

import { KeyIcon } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { resetPassword } from "@/server/auth/login/actions"

export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false)

  const handleResetPassword = async () => {
    setIsLoading(true)
  
    const host = window.location.origin
    const { success, message } = await resetPassword(host)
  
    if (success) {
      toast.success("Correo enviado", {
        description: "Revisa tu correo para cambiar la contraseña.",
      })
    } else {
      toast.error("Error al enviar el correo", {
        description: message || "Ocurrió un error inesperado.",
      })
    }
  
    setIsLoading(false)
  }

  return (
    <button
      onClick={handleResetPassword}
      disabled={isLoading}
      className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 
                text-white font-medium rounded-lg flex items-center justify-center space-x-2 transform transition-all duration-200 
                hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg disabled:opacity-60"
                    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        <KeyIcon className="h-5 w-5" />
      )}
      <span>Cambiar contraseña</span>
    </button>
  )
}