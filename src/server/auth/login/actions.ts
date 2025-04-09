'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

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

  //console.log("Usuario completo:", data.user)

  return {
    id: data.user.id,
    email: data.user.email!,
    name: data.user.user_metadata?.display_name || "Usuario",
    role: data.user.user_metadata?.role || null,
    created_at: data.user.created_at,
    last_sign_in_at: data.user.last_sign_in_at || null,
  }
}

export const changeDisplayName = async (newName: string) => {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    data: {
      display_name: newName,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/dashboard', "page") 
}