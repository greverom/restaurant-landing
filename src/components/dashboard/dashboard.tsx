
import { getCurrentUser } from "@/server/auth/login/actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, ClipboardList, Table, Users } from "lucide-react"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
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
            <h1 className="text-2xl font-bold md:text-3xl">Bienvenido, {user.name} 👋</h1>
            <p className="text-muted-foreground">Resumen general del sistema del restaurante.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* Pedidos activos */}
            <Card className="border shadow-md dark:bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pedidos Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{userData.activeOrders}</div>
                  <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                </div>
                <CardDescription className="pt-2">
                  {userData.activeOrders > 10 ? "Alto volumen hoy" : "Volumen normal"}
                </CardDescription>
              </CardContent>
            </Card>

            {/* Mesas ocupadas */}
            <Card className="border shadow-md dark:bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Mesas Ocupadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{userData.occupiedTables}</div>
                  <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                    <Table className="h-5 w-5" />
                  </div>
                </div>
                <CardDescription className="pt-2">
                  {userData.occupiedTables > 5 ? "Restaurante concurrido" : "Ocupación moderada"}
                </CardDescription>
              </CardContent>
            </Card>

            {/* Cocina en proceso */}
            <Card className="border shadow-md dark:bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Cocina en Proceso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{userData.kitchenProcesses}</div>
                  <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                    <ChefHat className="h-5 w-5" />
                  </div>
                </div>
                <CardDescription className="pt-2">
                  {userData.kitchenProcesses > 3 ? "Cocina ocupada" : "Flujo normal"}
                </CardDescription>
              </CardContent>
            </Card>

            {/* Total de usuarios */}
            <Card className="border shadow-md dark:bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{userData.totalUsers}</div>
                  <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <CardDescription className="pt-2">+12 nuevos esta semana</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}