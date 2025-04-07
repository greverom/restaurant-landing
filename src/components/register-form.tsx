"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Utensils } from "lucide-react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import * as z from "zod"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation" // ✅ CORRECTO para App Router

const formSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre es requerido",
  }),
  email: z.string().email({
    message: "Ingresa un correo electrónico válido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  role: z.enum(["administrador", "mesero", "cocinero"], {
    required_error: "Selecciona un rol",
  }),
})

type RegisterFormValues = z.infer<typeof formSchema>

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
    },
  })

  const onSubmit: SubmitHandler<RegisterFormValues> = (values) => {
    try {
      console.log(values)
      toast.success("Registro exitoso 🎉", {
        description: "Ya puedes iniciar sesión",
      })
   router.push("/login")
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Inténtalo de nuevo más tarde"

      toast.error("Error al registrarse", {
        description: message,
      })
    }
  }

  return (
    <Card className="border-none dark:border-none dark:bg-gray-800">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <div className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">Restaurante</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Registro</CardTitle>
        <CardDescription className="text-center dark:text-gray-400">
          Crea una cuenta para acceder al sistema
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Nombre Completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa tu nombre completo"
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
                        type={showPassword ? "text" : "password"}
                        placeholder="Crea una contraseña"
                        {...field}
                        className="border border-gray-300 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Rol</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="administrador">Administrador</SelectItem>
                      <SelectItem value="mesero">Mesero</SelectItem>
                      <SelectItem value="cocinero">Cocinero</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-6 py-6 bg-orange-500 hover:bg-orange-600"
            >
              Registrarse
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center dark:text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-orange-500 hover:underline">
            Iniciar Sesión
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}