"use client"
import { createClient } from "@/utils/supabase/client"

export const getCurrentUserClient = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) return null

  return {
    id: data.user.id,
    email: data.user.email!,
    name: data.user.user_metadata?.name || "Usuario",
    role: data.user.user_metadata?.role || null,
  }
}