// server/auth/auth.ts
'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const signinAction = async (email: string, password: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data.session) {
    return false 
  }
  redirect('/dashboard')

  return true
}

export const signoutAction = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
}