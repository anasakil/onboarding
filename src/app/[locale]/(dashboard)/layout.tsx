"use client"

import { Sidebar, DashboardProvider, useDashboard } from "@/components/dashboard"
import { SessionProvider } from "@/components/providers/session-provider"

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, closeSidebar } = useDashboard()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />
      <div className="lg:pl-64 min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <DashboardProvider>
        <DashboardContent>{children}</DashboardContent>
      </DashboardProvider>
    </SessionProvider>
  )
}
