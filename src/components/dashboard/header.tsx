"use client"

import { useSession } from "next-auth/react"
import { Bell, Search, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface HeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
  onMenuToggle?: () => void
  isMenuOpen?: boolean
}

export function Header({ title, description, action, onMenuToggle, isMenuOpen }: HeaderProps) {
  const { data: session } = useSession()

  return (
    <header className="h-14 md:h-16 border-b border-border bg-white px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-text-primary" />
          ) : (
            <Menu className="w-5 h-5 text-text-primary" />
          )}
        </button>

        <div className="min-w-0">
          <h1 className="text-lg md:text-xl font-semibold text-text-primary truncate">{title}</h1>
          {description && (
            <p className="text-xs md:text-sm text-text-secondary hidden sm:block truncate">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Action button - responsive */}
        {action && (
          <div className="hidden sm:block">
            {action}
          </div>
        )}

        {/* Search - hidden on mobile, shown on desktop */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 w-48 lg:w-64"
          />
        </div>

        {/* Search icon for mobile */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="w-5 h-5" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        {/* User greeting - hidden on small mobile */}
        <span className="text-sm text-text-secondary hidden lg:block">
          Welcome, <span className="font-medium text-text-primary">{session?.user?.name?.split(" ")[0]}</span>
        </span>
      </div>
    </header>
  )
}
