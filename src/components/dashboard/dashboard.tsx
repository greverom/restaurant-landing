"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/store/useAuthStore"
import { ChefHat, ClipboardList, Table, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardClient() {
  const user = useAuthStore((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (navigator.onLine && !user) {
      router.replace("/login")
    }
  }, [user, router])

  if (!user) {
    return (
      <p className="text-center text-muted-foreground py-10">
        Cargando usuario...
      </p>
    )
  }

  const userData = {
    name: user.name ?? "Usuario",
    activeOrders: 12,
    occupiedTables: 8,
    kitchenProcesses: 5,
    totalUsers: 124,
  }

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900">
      <main className="flex-1 py-10 md:py-10 max-w-7xl mx-auto">
        <div className="flex flex-col gap-14">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Bienvenido, {userData.name} 👋</h1>
            <p className="text-muted-foreground">Resumen general del sistema del restaurante.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* Cards */}
            {[
              {
                title: "Pedidos Activos",
                value: userData.activeOrders,
                icon: <ClipboardList className="h-5 w-5" />,
                desc: userData.activeOrders > 10 ? "Alto volumen hoy" : "Volumen normal",
              },
              {
                title: "Mesas Ocupadas",
                value: userData.occupiedTables,
                icon: <Table className="h-5 w-5" />,
                desc: userData.occupiedTables > 5 ? "Restaurante concurrido" : "Ocupación moderada",
              },
              {
                title: "Cocina en Proceso",
                value: userData.kitchenProcesses,
                icon: <ChefHat className="h-5 w-5" />,
                desc: userData.kitchenProcesses > 3 ? "Cocina ocupada" : "Flujo normal",
              },
              {
                title: "Total de Usuarios",
                value: userData.totalUsers,
                icon: <Users className="h-5 w-5" />,
                desc: "+12 nuevos esta semana",
              },
            ].map((item, i) => (
              <Card key={i} className="border shadow-md dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{item.value}</div>
                    <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                      {item.icon}
                    </div>
                  </div>
                  <CardDescription className="pt-2">{item.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}