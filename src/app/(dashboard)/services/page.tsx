"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Settings, Eye, EyeOff } from "lucide-react"

interface Service {
  _id: string
  name: string
  slug: string
  category: string
  description?: string
  icon?: string
  color?: string
  isActive: boolean
  steps: { title: string; order: number }[]
  fields: { name: string; type: string; step: number }[]
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services')
      if (res.ok) {
        const data = await res.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (slug: string, isActive: boolean) => {
    try {
      const res = await fetch(`/api/services/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      })
      if (res.ok) {
        fetchServices()
      }
    } catch (error) {
      console.error('Failed to toggle service:', error)
    }
  }

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = []
    }
    acc[service.category].push(service)
    return acc
  }, {} as Record<string, Service[]>)

  if (loading) {
    return (
      <div>
        <Header title="Services" description="Manage your service catalog" />
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header
        title="Services"
        description="Manage your service catalog and form fields"
        action={
          <Link href="/services/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </Link>
        }
      />

      <div className="p-6 space-y-6">
        {Object.keys(groupedServices).length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-text-secondary mb-4">No services found</p>
              <Link href="/services/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Service
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          Object.entries(groupedServices).map(([category, categoryServices]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryServices.map((service) => (
                    <div
                      key={service._id}
                      className={`p-4 border rounded-lg transition-colors ${
                        service.isActive
                          ? 'border-border hover:border-primary bg-white'
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg"
                          style={{ backgroundColor: service.color || '#6BBE4A' }}
                        >
                          {service.icon || service.name.charAt(0)}
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleActive(service.slug, service.isActive)}
                            title={service.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {service.isActive ? (
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-gray-400" />
                            )}
                          </Button>
                          <Link href={`/services/${service.slug}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <h3 className="font-medium text-text-primary">
                        {service.name}
                      </h3>
                      {service.description && (
                        <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                          {service.description}
                        </p>
                      )}
                      <div className="flex gap-2 mt-3">
                        <Badge variant="secondary">
                          {service.steps?.length || 0} steps
                        </Badge>
                        <Badge variant="outline">
                          {service.fields?.length || 0} fields
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
