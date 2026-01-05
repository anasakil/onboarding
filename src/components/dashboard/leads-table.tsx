"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"
import { LEAD_STATUSES, SERVICES } from "@/lib/constants"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"

interface Lead {
  _id: string
  companyName?: string
  contactName?: string
  contactEmail?: string
  services: string[]
  budgetRange: string
  status: string
  priorityScore: number
  priorityLevel: string
  assignedTo?: {
    _id: string
    name: string
    email: string
  }
  createdAt: string
}

interface LeadsTableProps {
  leads: Lead[]
  onStatusChange?: (id: string, status: string) => void
  onDelete?: (id: string) => void
}

export function LeadsTable({ leads, onStatusChange, onDelete }: LeadsTableProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = LEAD_STATUSES.find((s) => s.value === status)
    const colorMap: Record<string, "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info"> = {
      secondary: "secondary",
      info: "info",
      primary: "default",
      warning: "warning",
      success: "success",
      destructive: "destructive",
    }
    return (
      <Badge variant={colorMap[statusConfig?.color || "secondary"]}>
        {statusConfig?.label || status}
      </Badge>
    )
  }

  const getPriorityBadge = (level: string, score: number) => {
    const colorMap: Record<string, "success" | "warning" | "secondary"> = {
      high: "success",
      medium: "warning",
      low: "secondary",
    }
    return (
      <Badge variant={colorMap[level] || "secondary"}>
        {level.charAt(0).toUpperCase() + level.slice(1)} ({score})
      </Badge>
    )
  }

  const getServiceLabels = (serviceValues: string[]) => {
    return serviceValues
      .slice(0, 2)
      .map((value) => {
        const service = SERVICES.find((s) => s.value === value)
        return service?.label || value
      })
      .join(", ")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-12 text-center">
        <p className="text-text-secondary">No leads found</p>
        <Link
          href="/leads/new"
          className="inline-flex items-center gap-2 mt-4 text-primary font-medium hover:underline"
        >
          Create your first lead
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-border">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Company / Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Services
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Assigned To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium text-text-primary">
                    {lead.companyName || "No company"}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {lead.contactName} - {lead.contactEmail}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-text-primary">
                  {getServiceLabels(lead.services)}
                  {lead.services.length > 2 && (
                    <span className="text-text-secondary">
                      {" "}
                      +{lead.services.length - 2} more
                    </span>
                  )}
                </p>
              </td>
              <td className="px-6 py-4">{getStatusBadge(lead.status)}</td>
              <td className="px-6 py-4">
                {getPriorityBadge(lead.priorityLevel, lead.priorityScore)}
              </td>
              <td className="px-6 py-4">
                {lead.assignedTo ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {getInitials(lead.assignedTo.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-text-primary">
                      {lead.assignedTo.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-text-secondary">Unassigned</span>
                )}
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-text-secondary">
                  {formatDate(lead.createdAt)}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/leads/${lead._id}`}
                    className="p-2 text-text-secondary hover:text-primary rounded-lg hover:bg-gray-100 transition-colors"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/leads/${lead._id}/edit`}
                    className="p-2 text-text-secondary hover:text-primary rounded-lg hover:bg-gray-100 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  {onDelete && (
                    <button
                      onClick={() => onDelete(lead._id)}
                      className="p-2 text-text-secondary hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
