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
} from "lucide-react"

const navigation = [
  { name: "Services", href: "/services", icon: Briefcase },
]

export function Sidebar() {
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

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-white">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border px-6">
          <Logo size="md" />
        </div>

        {/* New Service Button */}
        <div className="p-4">
          <Link
            href="/services/new"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-500 transition-colors"
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
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
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
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
              className="p-2 text-text-secondary hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
