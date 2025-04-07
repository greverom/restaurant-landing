import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center transition-colors duration-300">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
        <span className="text-orange-500"> Restaurante</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
          Gestiona tus pedidos y mesas en un solo lugar.
        </p>
        <div className="mt-5 flex justify-center gap-4 sm:mt-8">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Link href="/menu">Ver Menú</Link>
          </Button>
          <Button
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-gray-800"
          >
            <Link href="/reservas">Reservar Mesa</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

