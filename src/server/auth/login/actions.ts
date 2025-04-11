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

export const resetPassword = async (host: string) => {
  const supabase = await createClient()

  try {
    const { data, error: userError } = await supabase.auth.getUser()

    if (userError || !data.user?.email) {
      throw new Error("No se pudo obtener el correo del usuario")
    }

    const { error } = await supabase.auth.resetPasswordForEmail(data.user.email, {
      redirectTo: `${host}/reset-password`, 
    })

    if (error) throw error

    return { success: true }
  } catch (err) {
    console.error("Error al enviar correo de recuperación:", err)
    return { success: false, message: (err as Error).message }
  }
}

export const setNewPassword = async (newPassword: string) => {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error(error.message);
    }

    await supabase.auth.signOut();

    return { success: true };
  } catch (err) {
    console.error("Error al cambiar la contraseña:", err);
    return {
      success: false,
      message: (err as Error).message || "Ocurrió un error inesperado.",
    };
  }
};