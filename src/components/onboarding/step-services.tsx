"use client"

import { cn } from "@/lib/utils"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SERVICES } from "@/lib/constants"
import { useTranslations } from "next-intl"

interface StepServicesProps {
  value: string[]
  onChange: (value: string[]) => void
  onNext: () => void
  onBack: () => void
}

export function StepServices({
  value,
  onChange,
  onNext,
  onBack,
}: StepServicesProps) {
  const toggleService = (serviceValue: string) => {
    if (value.includes(serviceValue)) {
      onChange(value.filter((v) => v !== serviceValue))
    } else {
      onChange([...value, serviceValue])
    }
  }

  const groupedServices = SERVICES.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = []
    }
    acc[service.category].push(service)
    return acc
  }, {} as Record<string, typeof SERVICES[number][]>)

  const t = useTranslations('Onboarding.Steps.Services')
  const tControls = useTranslations('Onboarding.Controls')

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

      <div className="space-y-6">
        {Object.entries(groupedServices).map(([category, services]) => (
          <div key={category}>
            <p className="text-sm font-medium text-text-secondary mb-3">
              {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => {
                const isSelected = value.includes(service.value)
                return (
                  <button
                    key={service.value}
                    onClick={() => toggleService(service.value)}
                    disabled={!isSelected && value.length >= 5}
                    className={cn(
                      "px-4 py-2 rounded-full border-2 text-sm font-medium transition-all",
                      isSelected
                        ? "border-primary bg-primary-50 text-primary-700"
                        : "border-border bg-white text-text-primary hover:border-gray-300",
                      !isSelected &&
                      value.length >= 5 &&
                      "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {service.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 w-4 h-4" /> {tControls('back')}
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-secondary">
            {t('selected', { count: value.length })}
          </span>
          <Button onClick={onNext} disabled={value.length === 0}>
            {tControls('continue')} <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
