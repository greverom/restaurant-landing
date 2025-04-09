// src/hooks/useLoginForm.ts
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { loginUser } from '@/server/auth/login/actions'
import { getCurrentUserClient } from '@/utils/supabase/clientUser'
import { useAuthStore } from '@/store/useAuthStore'

const formSchema = z.object({
  email: z.string().email({ message: 'Correo inválido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
})

export type LoginFormValues = z.infer<typeof formSchema>

export function useLoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true)

    const { error } = await loginUser(values.email, values.password)

    if (error?.message) {
      toast.error('Inicio de sesión fallido', { description: error.message })
      setIsLoading(false)
      return
    }

    const user = await getCurrentUserClient()
    if (user) {
      useAuthStore.getState().setUser(user)
    }

    setIsLoading(false)
    router.replace('/dashboard')
  }

  return {
    form,
    onSubmit,
    isLoading,
  }
}