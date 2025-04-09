// app/dashboard/layout.tsx
import { ReactNode } from "react"
import Header from "@/components/dashboard/header/header"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}