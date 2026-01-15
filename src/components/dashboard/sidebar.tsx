"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/shared/logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Briefcase,
  LogOut,
  Plus,
  X,
} from "lucide-react"
import { useEffect } from "react"

const navigation = [
  { name: "Services", href: "/services", icon: Briefcase },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (onClose) {
      onClose()
    }
  }, [pathname])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-72 lg:w-64 border-r border-border bg-white transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-14 md:h-16 items-center justify-between border-b border-border px-4 lg:px-6">
            <Logo size="md" />
            {/* Close button - mobile only */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>

          {/* New Service Button */}
          <div className="p-3 lg:p-4">
            <Link
              href="/services/new"
              className="flex items-center justify-center gap-2 w-full py-3 lg:py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-500 transition-colors active:scale-[0.98]"
            >
              <Plus className="w-5 h-5" />
              New Service
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 lg:py-2.5 rounded-lg text-sm font-medium transition-colors active:scale-[0.98]",
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-text-secondary hover:bg-gray-100 hover:text-text-primary"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="border-t border-border p-3 lg:p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarFallback>
                  {session?.user?.name ? getInitials(session.user.name) : "AD"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {session?.user?.name || "Admin User"}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {session?.user?.email}
                </p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="p-2 text-text-secondary hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                title="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
