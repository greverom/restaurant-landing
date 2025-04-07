// app/dashboard/layout.tsx
import { ReactNode } from "react"
import Header from "@/components/header"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}