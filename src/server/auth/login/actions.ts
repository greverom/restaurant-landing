'use server'

import { createClient } from '@/utils/supabase/server'

export async function loginUser(email: string, password: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  return { error } 

}


export async function signup(email: string, password: string, name: string, role: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role,
      },
    },
  })

  if (error) {
    return error
  }

}

export const getCurrentUser = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) return null

  return {
    id: data.user.id,
    email: data.user.email!,
    name: data.user.user_metadata?.name || "Usuario",
    role: data.user.user_metadata?.role || null,
  }
}