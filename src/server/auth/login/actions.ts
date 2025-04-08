'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function loginUser(email: string, password: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return error
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(email: string, password: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    return error
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

export const getCurrentUser = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) return null

  return {
    id: data.user.id,
    email: data.user.email!,
    name: data.user.email || 'Usuario',
  }
}