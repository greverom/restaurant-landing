"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Utensils } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { signinAction } from "@/server/auth/auth"

const formSchema = z.object({
  username: z.string().min(1, {
    message: "El nombre de usuario es requerido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
})

type LoginFormValues = z.infer<typeof formSchema>

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      // Llamamos a signinAction para verificar el inicio de sesión
      const result = await signinAction(values.username, values.password)

      if (result === false) {
        toast.error("Correo o contraseña incorrectos")
        return
      }
      // toast.success("¡Inicio de sesión exitoso!", {
      //   description: "Bienvenido nuevamente.",
      // })

      router.push("/dashboard")  
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ocurrió un error"
      toast.error("Error al iniciar sesión", { description: message })
    }
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
          <form
            onSubmit={form.handleSubmit(onSubmit, () => {
              toast.error("Completa todos los campos requeridos")
            })}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Nombre de Usuario</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa tu nombre de usuario"
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
                        type={showPassword ? "text" : "password"}
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
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-6 py-6 bg-orange-500 hover:bg-orange-600"
            >
              Iniciar Sesión
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center dark:text-gray-400">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="text-orange-500 hover:underline">
            Regístrate
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}