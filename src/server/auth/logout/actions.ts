'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const signoutAction = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}