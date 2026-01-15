"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/shared/logo"
import { IllustrationPanel } from "@/components/shared/illustration-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid email or password")
      } else {
        toast.success("Welcome back!")
        router.push("/dashboard")
        router.refresh()
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex flex-col p-6 md:p-8 lg:p-12 bg-white">
        <Logo size="sm" className="md:hidden" />
        <Logo size="md" className="hidden md:block" />

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6 md:space-y-8">
            <div className="space-y-1.5 md:space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                Welcome back
              </h1>
              <p className="text-sm md:text-base text-text-secondary">
                Sign in to your admin account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="space-y-1.5 md:space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@awesome.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="h-11 md:h-10"
                />
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-11 md:h-10"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 md:h-10"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="text-center text-xs md:text-sm text-text-secondary">
              Demo credentials: admin@awesome.com / admin123
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Illustration */}
      <IllustrationPanel variant="work" />
    </div>
  )
}
