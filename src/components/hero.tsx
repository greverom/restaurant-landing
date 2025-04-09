import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center transition-colors duration-300">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
        <span className="text-orange-500"> Restaurante</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-gray-600 dark:text-gray-300 sm:text-md md:mt-5 md:max-w-3xl md:text-md">
          Gestiona pedidos y mesas en un solo lugar.
        </p>
        <div className="mt-5 flex justify-center gap-4 sm:mt-8">
        <Button
          className="bg-transparent text-orange-500 hover:bg-orange-500 hover:text-white 
                      border border-orange-500 dark:hover:bg-orange-500 dark:hover:text-white"
        >
          <Link href="/login">Iniciar Sesión</Link>
        </Button>
        </div>
      </div>
    </section>
  )
}

