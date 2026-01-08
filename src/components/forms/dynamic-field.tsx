"use client"

import { cn } from "@/lib/utils"
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
import { Check, ChevronRight, AlertCircle } from "lucide-react"
import { useTranslations } from 'next-intl'

interface FormField {
  _id?: string
  name: string
  label: string
  type: string
  placeholder?: string
  required: boolean
  options?: string[] | { en: string; it: string }[]
}

interface DynamicFieldProps {
  field: FormField
  value: any
  onChange: (name: string, value: any) => void
  error?: string
}

export function DynamicField({ field, value, onChange, error }: DynamicFieldProps) {
  const t = useTranslations('Common')
  const handleChange = (newValue: any) => {
    onChange(field.name, newValue)
  }

  const hasValue = value && (Array.isArray(value) ? value.length > 0 : true)

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'url':
      case 'number':
        return (
          <div className="relative">
            <Input
              type={field.type === 'phone' ? 'tel' : field.type}
              placeholder={field.placeholder}
              value={value || ''}
              onChange={(e) => handleChange(e.target.value)}
              className={cn(
                "h-10 px-3 text-sm rounded-lg border-2 transition-all duration-200 bg-[#10273A] text-white",
                "placeholder:text-[#8F8F94]",
                "focus:ring-0 focus:ring-offset-0",
                error
                  ? "border-red-400 bg-red-900/20 focus:border-red-400"
                  : hasValue
                    ? "border-[#F6B73A] bg-[#F6B73A]/5 focus:border-[#F6B73A]"
                    : "border-[#1A3A52] hover:border-[#2A5478] focus:border-[#F6B73A]"
              )}
            />
            {hasValue && !error && (
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-[#F6B73A] flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-[#0C1C2A]" />
                </div>
              </div>
            )}
          </div>
        )

      case 'date':
        return (
          <Input
            type="date"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            className={cn(
              "h-10 px-3 text-sm rounded-lg border-2 transition-all duration-200 bg-[#10273A] text-white",
              "focus:ring-0 focus:ring-offset-0",
              error
                ? "border-red-400 bg-red-900/20 focus:border-red-400"
                : hasValue
                  ? "border-[#F6B73A] bg-[#F6B73A]/5 focus:border-[#F6B73A]"
                  : "border-[#1A3A52] hover:border-[#2A5478] focus:border-[#F6B73A]"
            )}
          />
        )

      case 'textarea':
        return (
          <div className="relative">
            <textarea
              placeholder={field.placeholder}
              value={value || ''}
              onChange={(e) => handleChange(e.target.value)}
              rows={3}
              className={cn(
                "w-full rounded-lg border-2 bg-[#10273A] px-3 py-2 text-sm text-white resize-none transition-all duration-200",
                "placeholder:text-[#8F8F94]",
                "focus:outline-none focus:ring-0",
                error
                  ? "border-red-400 bg-red-900/20 focus:border-red-400"
                  : hasValue
                    ? "border-[#F6B73A] bg-[#F6B73A]/5 focus:border-[#F6B73A]"
                    : "border-[#1A3A52] hover:border-[#2A5478] focus:border-[#F6B73A]"
              )}
            />
            {hasValue && !error && (
              <div className="absolute right-2.5 top-2.5">
                <div className="w-4 h-4 rounded-full bg-[#F6B73A] flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-[#0C1C2A]" />
                </div>
              </div>
            )}
          </div>
        )

      case 'select':
        return (
          <Select value={value || ''} onValueChange={handleChange}>
            <SelectTrigger
              className={cn(
                "h-11",
                error && "border-red-400 bg-red-900/20 focus:border-red-400",
                hasValue && !error && "border-[#F6B73A] bg-[#F6B73A]/5"
              )}
            >
              <SelectValue placeholder={field.placeholder || t('selectPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, idx) => {
                const optLabel = typeof option === 'string' ? option : option.en // Default to en as fallback if needed, but we'll pass localized label
                const optValue = typeof option === 'string' ? option : option.en // Internal value is always English
                return (
                  <SelectItem key={idx} value={optValue}>
                    {optLabel}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        )

      case 'multiselect':
        const selectedValues: string[] = value || []
        return (
          <div className="flex flex-wrap gap-2">
            {field.options?.map((option, idx) => {
              const optLabel = typeof option === 'string' ? option : option.en
              const optValue = typeof option === 'string' ? option : option.en
              const isSelected = selectedValues.includes(optValue)
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      handleChange(selectedValues.filter((v) => v !== optValue))
                    } else {
                      handleChange([...selectedValues, optValue])
                    }
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200",
                    "hover:scale-105 active:scale-95",
                    isSelected
                      ? "border-[#F6B73A] bg-[#F6B73A]/15 text-[#F6B73A]"
                      : "border-[#1A3A52] bg-[#10273A] text-white hover:border-[#2A5478]"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {isSelected && <Check className="w-3 h-3" />}
                    {optLabel}
                  </span>
                </button>
              )
            })}
          </div>
        )

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => {
              const optLabel = typeof option === 'string' ? option : option.en
              const optValue = typeof option === 'string' ? option : option.en
              const isSelected = value === optValue

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChange(optValue)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
                    "hover:shadow-sm text-left group",
                    isSelected
                      ? "border-[#F6B73A] bg-[#F6B73A]/5"
                      : "border-[#1A3A52] bg-[#10273A] hover:border-[#2A5478]"
                  )}
                >
                  {/* Radio circle */}
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                      isSelected
                        ? "border-[#F6B73A] bg-[#F6B73A]"
                        : "border-[#1A3A52] group-hover:border-[#2A5478]"
                    )}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0C1C2A]" />
                    )}
                  </div>

                  {/* Text */}
                  <span className={cn(
                    "flex-1 text-sm font-medium",
                    isSelected ? "text-white" : "text-[#8F8F94]"
                  )}>
                    {optLabel}
                  </span>

                  {/* Arrow or check */}
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-[#F6B73A] flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#0C1C2A]" />
                    </div>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#8F8F94] group-hover:text-white" />
                  )}
                </button>
              )
            })}
          </div>
        )

      case 'checkbox':
        return (
          <label
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200",
              "hover:shadow-sm",
              value
                ? "border-[#F6B73A] bg-[#F6B73A]/5"
                : "border-[#1A3A52] bg-[#10273A] hover:border-[#2A5478]"
            )}
          >
            <Checkbox
              checked={value || false}
              onCheckedChange={handleChange}
              className={cn(
                "w-5 h-5 rounded border-2 transition-all",
                value ? "border-[#F6B73A] bg-[#F6B73A]" : "border-[#1A3A52]"
              )}
            />
            <span className={cn(
              "text-sm font-medium",
              value ? "text-white" : "text-[#8F8F94]"
            )}>
              {field.placeholder}
            </span>
          </label>
        )

      default:
        return (
          <Input
            type="text"
            placeholder={field.placeholder}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            className="h-10 rounded-lg border-2 border-[#1A3A52] bg-[#10273A] text-white px-3 text-sm"
          />
        )
    }
  }

  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-[#8F8F94] flex items-center gap-1">
        {field.label}
        {field.required && (
          <span className="text-red-400">*</span>
        )}
      </Label>

      {renderField()}

      {error && (
        <div className="flex items-center gap-1.5 text-red-500 animate-fade-in">
          <AlertCircle className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{error}</span>
        </div>
      )}
    </div>
  )
}
