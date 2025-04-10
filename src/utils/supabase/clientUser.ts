"use client"
import { createClient } from "@/utils/supabase/client"

export const getCurrentUserClient = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) return null

  //console.log(data.user)

  const { id, email, created_at, last_sign_in_at, user_metadata } = data.user

  return {
    id,
    email: email!,
    name: user_metadata?.display_name || "Usuario",
    role: user_metadata?.role || null,
    created_at,
    last_sign_in_at: last_sign_in_at || undefined,
  }
}