"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save } from "lucide-react"

const CATEGORIES = [
  'Development',
  'Marketing',
  'Design',
  'Content',
  'Consulting',
  'Other',
]

export default function NewServicePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [service, setService] = useState({
    name: { en: '', it: '' },
    category: 'Development',
    description: { en: '', it: '' },
    icon: '',
    color: '#6BBE4A',
    isActive: true,
    steps: [{ title: 'Basic Information', description: 'Tell us about your needs', order: 1 }],
    fields: [],
  })

  const handleSave = async () => {
    if (!service.name.en.trim() || !service.name.it.trim()) {
      alert('Service name is required in both languages')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      })

      if (res.ok) {
        const created = await res.json()
        router.push(`/services/${created.slug}/edit`)
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to create service')
      }
    } catch (error) {
      console.error('Failed to create service:', error)
      alert('Failed to create service')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <Header
        title="New Service"
        description="Create a new service for client onboarding"
        action={
          <div className="flex gap-2">
            <Link href="/services">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </Link>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Creating...' : 'Create & Configure Fields'}
            </Button>
          </div>
        }
      />

      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="en">
              <TabsList className="mb-4">
                <TabsTrigger value="en">English 🇺🇸</TabsTrigger>
                <TabsTrigger value="it">Italian 🇮🇹</TabsTrigger>
              </TabsList>

              <TabsContent value="en" className="space-y-4">
                <div>
                  <Label htmlFor="name-en">Name (English) *</Label>
                  <Input
                    id="name-en"
                    value={service.name.en}
                    onChange={(e) =>
                      setService({ ...service, name: { ...service.name, en: e.target.value } })
                    }
                    placeholder="e.g., Website Development"
                  />
                </div>
                <div>
                  <Label htmlFor="description-en">Description (English)</Label>
                  <Textarea
                    id="description-en"
                    value={service.description.en}
                    onChange={(e) =>
                      setService({ ...service, description: { ...service.description, en: e.target.value } })
                    }
                    rows={3}
                    placeholder="Brief description of the service..."
                  />
                </div>
              </TabsContent>

              <TabsContent value="it" className="space-y-4">
                <div>
                  <Label htmlFor="name-it">Name (Italian) *</Label>
                  <Input
                    id="name-it"
                    value={service.name.it}
                    onChange={(e) =>
                      setService({ ...service, name: { ...service.name, it: e.target.value } })
                    }
                    placeholder="Es., Sviluppo Siti Web"
                  />
                </div>
                <div>
                  <Label htmlFor="description-it">Description (Italian)</Label>
                  <Textarea
                    id="description-it"
                    value={service.description.it}
                    onChange={(e) =>
                      setService({ ...service, description: { ...service.description, it: e.target.value } })
                    }
                    rows={3}
                    placeholder="Breve descrizione del servizio..."
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={service.category}
                  onValueChange={(value) =>
                    setService({ ...service, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="icon">Icon (emoji or letter)</Label>
                <Input
                  id="icon"
                  value={service.icon}
                  onChange={(e) =>
                    setService({ ...service, icon: e.target.value })
                  }
                  maxLength={2}
                  placeholder="e.g., W"
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={service.color}
                    onChange={(e) =>
                      setService({ ...service, color: e.target.value })
                    }
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={service.color}
                    onChange={(e) =>
                      setService({ ...service, color: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  checked={service.isActive}
                  onCheckedChange={(checked) =>
                    setService({ ...service, isActive: checked })
                  }
                />
                <Label>Active</Label>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-text-secondary">
                After creating the service, you&apos;ll be able to configure form steps and fields.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
