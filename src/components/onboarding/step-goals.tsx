"use client"

import { cn } from "@/lib/utils"
import { ArrowRight, ArrowLeft, TrendingUp, Zap, Palette, Rocket, Maximize, Target, Globe, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { GOALS } from "@/lib/constants"
import { useTranslations, useLocale } from "next-intl"

interface GoalsData {
  goals: string[]
  challenges: string
}

interface StepGoalsProps {
  data: GoalsData
  onChange: (data: GoalsData) => void
  onNext: () => void
  onBack: () => void
}

const iconMap = {
  TrendingUp,
  Zap,
  Palette,
  Rocket,
  Expand: Maximize,
  Target,
  Globe,
  Clock,
}

export function StepGoals({ data, onChange, onNext, onBack }: StepGoalsProps) {
  const t = useTranslations('Onboarding.Steps.Goals')
  const tControls = useTranslations('Onboarding.Controls')
  const locale = useLocale() as 'en' | 'it'

  const toggleGoal = (goalValue: string) => {
    if (data.goals.includes(goalValue)) {
      onChange({ ...data, goals: data.goals.filter((g) => g !== goalValue) })
    } else {
      onChange({ ...data, goals: [...data.goals, goalValue] })
    }
  }

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

      <div className="space-y-3">
        {GOALS.map((goal) => {
          const Icon = iconMap[goal.icon as keyof typeof iconMap]
          const isSelected = data.goals.includes(goal.value)

          return (
            <button
              key={goal.value}
              onClick={() => toggleGoal(goal.value)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left",
                isSelected
                  ? "border-primary bg-primary-50"
                  : "border-border bg-white hover:border-gray-300"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg",
                  isSelected ? "bg-primary-100" : "bg-gray-100"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5",
                    isSelected ? "text-primary" : "text-gray-500"
                  )}
                />
              </div>
              <span
                className={cn(
                  "font-medium",
                  isSelected ? "text-primary-700" : "text-text-primary"
                )}
              >
                {goal.label[locale]}
              </span>
              <ArrowRight
                className={cn(
                  "w-5 h-5 ml-auto",
                  isSelected ? "text-primary" : "text-gray-400"
                )}
              />
            </button>
          )
        })}
      </div>

      {/* Optional challenges textarea */}
      <div className="space-y-2">
        <Label>{t('challengesLabel')}</Label>
        <textarea
          className="w-full min-h-[100px] p-3 rounded-md border border-border bg-white text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
          placeholder={t('challengesPlaceholder')}
          value={data.challenges}
          onChange={(e) => onChange({ ...data, challenges: e.target.value })}
        />
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 w-4 h-4" /> {tControls('back')}
        </Button>
        <Button onClick={onNext} disabled={data.goals.length === 0}>
          {tControls('continue')} <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
