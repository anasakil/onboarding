"use client"

import { useSession } from "next-auth/react"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface HeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function Header({ title, description, action }: HeaderProps) {
  const { data: session } = useSession()

  return (
    <header className="h-16 border-b border-border bg-white px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
        {description && (
          <p className="text-sm text-text-secondary">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {action}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 w-64"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        {/* User greeting */}
        <span className="text-sm text-text-secondary">
          Welcome, <span className="font-medium text-text-primary">{session?.user?.name?.split(" ")[0]}</span>
        </span>
      </div>
    </header>
  )
}
