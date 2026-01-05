"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save, Mail, Phone, Calendar, FileText } from "lucide-react"

interface Submission {
  _id: string
  serviceId: string
  serviceName: string
  clientName?: string
  clientEmail?: string
  clientPhone?: string
  status: string
  data: Record<string, unknown>
  notes?: string
  createdAt: string
  updatedAt: string
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewed: 'bg-blue-100 text-blue-800',
  contacted: 'bg-purple-100 text-purple-800',
  converted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

export default function SubmissionDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [submission, setSubmission] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetchSubmission()
  }, [id])

  const fetchSubmission = async () => {
    try {
      const res = await fetch(`/api/submissions/${id}`)
      if (res.ok) {
        const data = await res.json()
        setSubmission(data)
        setNotes(data.notes || '')
        setStatus(data.status)
      }
    } catch (error) {
      console.error('Failed to fetch submission:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes, status }),
      })
      if (res.ok) {
        const updated = await res.json()
        setSubmission(updated)
      }
    } catch (error) {
      console.error('Failed to save:', error)
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatFieldValue = (value: unknown): string => {
    if (value === null || value === undefined) return '—'
    if (Array.isArray(value)) return value.join(', ')
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    if (typeof value === 'object') return JSON.stringify(value)
    return String(value)
  }

  const formatFieldName = (name: string): string => {
    return name
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
  }

  if (loading) {
    return (
      <div>
        <Header title="Submission Details" description="Loading..." />
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-200 rounded-lg" />
            <div className="h-64 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  if (!submission) {
    return (
      <div>
        <Header title="Submission Not Found" description="" />
        <div className="p-6">
          <p>The requested submission was not found.</p>
          <Link href="/submissions">
            <Button className="mt-4">Back to Submissions</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header
        title="Submission Details"
        description={`${submission.serviceName} - ${formatDate(submission.createdAt)}`}
        action={
          <div className="flex gap-2">
            <Link href="/submissions">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {submission.clientName && (
                    <div>
                      <Label className="text-text-secondary">Name</Label>
                      <p className="font-medium">{submission.clientName}</p>
                    </div>
                  )}
                  {submission.clientEmail && (
                    <div>
                      <Label className="text-text-secondary">Email</Label>
                      <a
                        href={`mailto:${submission.clientEmail}`}
                        className="flex items-center gap-2 font-medium text-primary hover:underline"
                      >
                        <Mail className="w-4 h-4" />
                        {submission.clientEmail}
                      </a>
                    </div>
                  )}
                  {submission.clientPhone && (
                    <div>
                      <Label className="text-text-secondary">Phone</Label>
                      <a
                        href={`tel:${submission.clientPhone}`}
                        className="flex items-center gap-2 font-medium text-primary hover:underline"
                      >
                        <Phone className="w-4 h-4" />
                        {submission.clientPhone}
                      </a>
                    </div>
                  )}
                  <div>
                    <Label className="text-text-secondary">Submitted</Label>
                    <p className="flex items-center gap-2 font-medium">
                      <Calendar className="w-4 h-4" />
                      {formatDate(submission.createdAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Data */}
            <Card>
              <CardHeader>
                <CardTitle>Form Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(submission.data || {}).map(([key, value]) => (
                    <div
                      key={key}
                      className="border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <Label className="text-text-secondary">
                        {formatFieldName(key)}
                      </Label>
                      <p className="mt-1 font-medium whitespace-pre-wrap">
                        {formatFieldValue(value)}
                      </p>
                    </div>
                  ))}
                  {Object.keys(submission.data || {}).length === 0 && (
                    <p className="text-text-secondary">No form data available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <Badge
                      className={`${
                        STATUS_COLORS[status] || 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {status}
                    </Badge>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Service Info */}
            <Card>
              <CardHeader>
                <CardTitle>Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{submission.serviceName}</p>
                <p className="text-sm text-text-secondary mt-1">
                  ID: {submission.serviceId}
                </p>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Internal Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this submission..."
                  rows={6}
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {submission.clientEmail && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href={`mailto:${submission.clientEmail}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </a>
                  </Button>
                )}
                {submission.clientPhone && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href={`tel:${submission.clientPhone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call Client
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
