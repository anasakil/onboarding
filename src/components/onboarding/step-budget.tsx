"use client"

import { cn } from "@/lib/utils"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BUDGET_RANGES, URGENCY_LEVELS, DECISION_POWER } from "@/lib/constants"
import { useTranslations, useLocale } from "next-intl"

interface BudgetData {
  budgetRange: string
  urgency: string
  timeline: string
  decisionPower: string
}

interface StepBudgetProps {
  data: BudgetData
  onChange: (data: BudgetData) => void
  onNext: () => void
  onBack: () => void
}

export function StepBudget({
  data,
  onChange,
  onNext,
  onBack,
}: StepBudgetProps) {
  const isValid = data.budgetRange && data.urgency
  const t = useTranslations('Onboarding.Steps.Budget')
  const tControls = useTranslations('Onboarding.Controls')
  const locale = useLocale() as 'en' | 'it'

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
        {/* Budget Range */}
        <div className="space-y-2">
          <Label>{t('budgetLabel')}</Label>
          <Select
            value={data.budgetRange}
            onValueChange={(value) => onChange({ ...data, budgetRange: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('budgetPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {BUDGET_RANGES.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label[locale]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Urgency */}
        <div className="space-y-3">
          <Label>{t('urgencyLabel')}</Label>
          <div className="grid grid-cols-2 gap-3">
            {URGENCY_LEVELS.map((level) => {
              const isSelected = data.urgency === level.value
              return (
                <button
                  key={level.value}
                  onClick={() => onChange({ ...data, urgency: level.value })}
                  className={cn(
                    "p-4 rounded-lg border-2 text-left transition-all",
                    isSelected
                      ? "border-primary bg-primary-50"
                      : "border-border bg-white hover:border-gray-300"
                  )}
                >
                  <p
                    className={cn(
                      "font-medium",
                      isSelected ? "text-primary-700" : "text-text-primary"
                    )}
                  >
                    {level.label[locale]}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">
                    {level.description[locale]}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Timeline (Optional) */}
        <div className="space-y-2">
          <Label>{t('timelineLabel')}</Label>
          <input
            type="text"
            className="w-full h-10 px-3 rounded-md border border-border bg-white text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder={t('timelinePlaceholder')}
            value={data.timeline}
            onChange={(e) => onChange({ ...data, timeline: e.target.value })}
          />
        </div>

        {/* Decision Power */}
        <div className="space-y-2">
          <Label>{t('roleLabel')}</Label>
          <Select
            value={data.decisionPower}
            onValueChange={(value) =>
              onChange({ ...data, decisionPower: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t('rolePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {DECISION_POWER.map((power) => (
                <SelectItem key={power.value} value={power.value}>
                  <div>
                    <span>{power.label[locale]}</span>
                    <span className="text-text-secondary ml-2 text-sm">
                      - {power.description[locale]}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 w-4 h-4" /> {tControls('back')}
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          {tControls('continue')} <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
