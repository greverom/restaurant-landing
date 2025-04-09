'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

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

  revalidatePath('/dashboard') 
}