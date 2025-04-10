import { ReactNode } from "react"
import Header from "@/components/dashboard/header/header"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gray-100 dark:bg-gray-800">
      <Header />
      <main className="flex-1 p-2 py-15">
        {children}
      </main>
    </div>
  )
}