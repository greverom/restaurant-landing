// src/hooks/useLoginToasts.ts
'use client'

import { useEffect } from "react"
import { toast } from "sonner"

export function useLoginToasts() {
  useEffect(() => {
    if (typeof window === "undefined") return

    requestIdleCallback(() => {
      const params = new URLSearchParams(window.location.search)
      const unauthorized = params.get("unauthorized")
      const emailConfirm = params.get("emailConfirm")

      if (emailConfirm === "true") {
        toast.success("Verifica tu correo electrónico", {
          description: "Hemos enviado un enlace de confirmación a tu correo.",
        })
        params.delete("emailConfirm")
      }

      if (unauthorized === "true") {
        toast.warning("Acceso restringido", {
          description: "Debes iniciar sesión para acceder al sistema.",
        })
        params.delete("unauthorized")
      }

      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.replaceState({}, "", newUrl)
    })
  }, [])
}