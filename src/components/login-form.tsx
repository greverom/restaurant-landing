'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLoginToasts } from '@/hooks/login/useLoginToast'
import { useLoginForm } from '@/hooks/login/useLoginForm'
import Image from "next/image"


export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { form, onSubmit, isLoading } = useLoginForm()
  useLoginToasts()


  return (
    <Card className="border border-gray-200 shadow-md dark:shadow-none dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <div className="flex items-center space-x-2">
            <Image
              src="/icons/logoRecipe.png"
              alt="Logo Recetas"
              width={24}
              height={24}
              className="h-10 w-10"
            />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
        <CardDescription className="text-center dark:text-gray-300">
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
                  <FormLabel className="dark:text-gray-200">Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      {...field}
                      className="border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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
                        className="pr-10 border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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

            <Button  disabled={isLoading} type="submit" className="w-full mt-6 py-6 bg-orange-500 hover:bg-orange-500 cursor-pointer">
              {isLoading && (
                <svg
                  className="mr-2 h-8 w-8 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
              
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