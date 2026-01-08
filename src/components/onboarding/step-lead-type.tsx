"use client"

import { cn } from "@/lib/utils"
import { LEAD_TYPES } from "@/lib/constants"
import { UserPlus, Users, Share2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations, useLocale } from "next-intl"

interface StepLeadTypeProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
}

const iconMap = {
  UserPlus: UserPlus,
  Users: Users,
  Share2: Share2,
}

export function StepLeadType({ value, onChange, onNext }: StepLeadTypeProps) {
  const t = useTranslations('Onboarding.Steps.LeadType')
  const tControls = useTranslations('Onboarding.Controls')
  const locale = useLocale() as 'en' | 'it'

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">
          {t('title')}
        </h1>
      </div>

      <div className="space-y-3">
        {LEAD_TYPES.map((type) => {
          const Icon = iconMap[type.icon as keyof typeof iconMap]
          const isSelected = value === type.value

          return (
            <button
              key={type.value}
              onClick={() => {
                onChange(type.value)
                // Auto-advance after selection
                setTimeout(() => onNext(), 300)
              }}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left",
                isSelected
                  ? "border-primary bg-primary-50"
                  : "border-border bg-white hover:border-gray-300"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-lg",
                  isSelected ? "bg-primary-100" : "bg-gray-100"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6",
                    isSelected ? "text-primary" : "text-gray-500"
                  )}
                />
              </div>
              <div className="flex-1">
                <p
                  className={cn(
                    "font-medium",
                    isSelected ? "text-primary-700" : "text-text-primary"
                  )}
                >
                  {type.label[locale]}
                </p>
                <p className="text-sm text-text-secondary">{type.description[locale]}</p>
              </div>
              <ArrowRight
                className={cn(
                  "w-5 h-5",
                  isSelected ? "text-primary" : "text-gray-400"
                )}
              />
            </button>
          )
        })}
      </div>

      <div className="pt-4">
        <Button onClick={onNext} size="lg" disabled={!value}>
          {tControls('continue')} <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
