"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff} from "lucide-react"
import Image from "next/image"
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
import { useRouter } from "next/navigation" 
import { signup } from "@/server/auth/login/actions"

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
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
    setIsLoading(true)
    try {
      const error = await signup(values.email, values.password, values.name, values.role)
  
      if (error) {
        toast.error("Error al registrarse", {
          description: error.message,
        })
        return
      }
  
      toast.success("Registro exitoso", {
        description: "Hemos enviado un enlace de confirmación",
      })
  
      setTimeout(() => {
        router.push("/login?emailConfirm=true")
      }, 3000)
  
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Inténtalo de nuevo más tarde"
  
      toast.error("Error al registrarse", {
        description: message,
      })
    }finally {
      setIsLoading(false) 
    }
  }

  return (
    <Card className="border dark:border-gray-700 dark:bg-gray-800">
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
        <CardTitle className="text-2xl font-bold text-center">Registro</CardTitle>
        <CardDescription className="text-center dark:text-gray-300">
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
                      className="border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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
                        type={showPassword ? "text" : "password"}
                        placeholder="Crea una contraseña"
                        {...field}
                        className="border border-gray-300 pr-10 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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
                      <SelectTrigger className="w-full border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
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
             disabled={isLoading}
              type="submit"
              className="w-full mt-6 py-6 bg-orange-500 hover:bg-orange-500 cursor-pointer"
            >
              Registrarse
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center dark:text-gray-300">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-orange-400 hover:underline">
            Iniciar Sesión
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}