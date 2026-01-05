"use client"

import { Sidebar } from "@/components/dashboard"
import { SessionProvider } from "@/components/providers/session-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="pl-64">
          <main>{children}</main>
        </div>
      </div>
    </SessionProvider>
  )
}
