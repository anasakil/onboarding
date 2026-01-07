"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/dashboard"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface TeamMember {
  _id: string
  name: string
  email: string
  role: string
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("/api/team")
        if (res.ok) {
          const data = await res.json()
          setTeam(data)
        }
      } catch (error) {
        console.error("Failed to fetch team:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeam()
  }, [])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleBadgeColor = (role: string): "default" | "secondary" | "outline" => {
    switch (role) {
      case "admin":
        return "default"
      case "manager":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div>
      <Header title="Team" description="Manage your team members" />

      <div className="p-6">
        {isLoading ? (
          <p className="text-text-secondary">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <Card key={member._id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        {member.name}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {member.email}
                      </p>
                      <Badge
                        variant={getRoleBadgeColor(member.role)}
                        className="mt-2"
                      >
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
