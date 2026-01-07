"use client"

import { cn } from "@/lib/utils"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LEAD_SOURCES } from "@/lib/constants"
import { useTranslations } from "next-intl"

interface SourceData {
  source: string[]
  contactName: string
  contactEmail: string
  contactPhone: string
  assignedTo: string
}

interface TeamMember {
  _id: string
  name: string
  email: string
  role: string
}

interface StepSourceProps {
  data: SourceData
  onChange: (data: SourceData) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
  teamMembers: TeamMember[]
}

export function StepSource({
  data,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
  teamMembers,
}: StepSourceProps) {
  const toggleSource = (sourceValue: string) => {
    if (data.source.includes(sourceValue)) {
      onChange({ ...data, source: data.source.filter((s) => s !== sourceValue) })
    } else {
      onChange({ ...data, source: [...data.source, sourceValue] })
    }
  }

  const t = useTranslations('Onboarding.Steps.Source')
  const tControls = useTranslations('Onboarding.Controls')

  const isValid = data.contactName && data.contactEmail

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">
          {t('title')}
        </h1>
        <p className="text-text-secondary mt-2">
          {t('subtitle')}
        </p>
      </div>

      {/* Sources */}
      <div className="space-y-3">
        {LEAD_SOURCES.map((source) => {
          const isSelected = data.source.includes(source.value)
          return (
            <label
              key={source.value}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                isSelected
                  ? "border-primary bg-primary-50"
                  : "border-border bg-white hover:border-gray-300"
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggleSource(source.value)}
              />
              <span
                className={cn(
                  "font-medium",
                  isSelected ? "text-primary-700" : "text-text-primary"
                )}
              >
                {source.label}
              </span>
            </label>
          )
        })}
      </div>

      {/* Contact Information */}
      <div className="border-t border-border pt-6 space-y-4">
        <h2 className="text-lg font-semibold text-text-primary">
          {t('contactInfo')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t('nameLabel')}</Label>
            <Input
              placeholder={t('namePlaceholder')}
              value={data.contactName}
              onChange={(e) =>
                onChange({ ...data, contactName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>{t('emailLabel')}</Label>
            <Input
              type="email"
              placeholder={t('emailPlaceholder')}
              value={data.contactEmail}
              onChange={(e) =>
                onChange({ ...data, contactEmail: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>{t('phoneLabel')}</Label>
          <Input
            type="tel"
            placeholder={t('phonePlaceholder')}
            value={data.contactPhone}
            onChange={(e) =>
              onChange({ ...data, contactPhone: e.target.value })
            }
          />
        </div>
      </div>

      {/* Team Assignment */}
      {teamMembers.length > 0 && (
        <div className="space-y-2">
          <Label>{t('assignLabel')}</Label>
          <Select
            value={data.assignedTo}
            onValueChange={(value) => onChange({ ...data, assignedTo: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('assignPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">{t('autoAssign')}</SelectItem>
              {teamMembers.map((member) => (
                <SelectItem key={member._id} value={member._id}>
                  {member.name} ({member.role})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 w-4 h-4" /> {tControls('back')}
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={onBack}>
            {tControls('skip')}
          </Button>
          <Button onClick={onSubmit} disabled={!isValid || isSubmitting}>
            {isSubmitting ? tControls('creating') : tControls('createLead')}{" "}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
