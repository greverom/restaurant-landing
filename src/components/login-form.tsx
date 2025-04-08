'use client'

import { useState } from 'react'
import { Eye, EyeOff, Utensils } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { loginUser } from '@/server/auth/login/actions' 
import { useAuthStore } from '@/store/useAuthStore'
import { getCurrentUserClient } from '@/utils/supabase/clientUser'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z.string().email({ message: 'Correo inválido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
})

type LoginFormValues = z.infer<typeof formSchema>

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
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
      const setUser = useAuthStore.getState().setUser
      setUser(user)
      console.log("Usuario:", user)
    }
  
    setIsLoading(false)
  
    router.push("/dashboard")
  }

  return (
    <Card className="border border-gray-200 shadow-lg dark:border-none dark:bg-gray-800">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <div className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">Restaurante</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
        <CardDescription className="text-center dark:text-gray-400">
          Ingresa tus credenciales para acceder al sistema
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      {...field}
                      className="border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Ingresa tu contraseña"
                        {...field}
                        className="pr-10 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                        <span className="sr-only">{showPassword ? 'Ocultar' : 'Mostrar'} contraseña</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full mt-6 py-6 bg-orange-500 hover:bg-orange-600">
              {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center dark:text-gray-400">
          ¿No tienes una cuenta?{' '}
          <Link href="/register" className="text-orange-500 hover:underline">
            Regístrate
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}