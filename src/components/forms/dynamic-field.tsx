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

interface FormField {
  _id?: string
  name: string
  label: string
  type: string
  placeholder?: string
  required: boolean
  options?: string[]
}

interface DynamicFieldProps {
  field: FormField
  value: any
  onChange: (name: string, value: any) => void
  error?: string
}

export function DynamicField({ field, value, onChange, error }: DynamicFieldProps) {
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
                "h-10 px-3 text-sm rounded-lg border-2 transition-all duration-200",
                "placeholder:text-gray-400",
                "focus:ring-0 focus:ring-offset-0",
                error
                  ? "border-red-300 bg-red-50/50 focus:border-red-400"
                  : hasValue
                  ? "border-[#6BBE4A] bg-[#6BBE4A]/5 focus:border-[#6BBE4A]"
                  : "border-gray-200 hover:border-gray-300 focus:border-[#6BBE4A]"
              )}
            />
            {hasValue && !error && (
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-[#6BBE4A] flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
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
              "h-10 px-3 text-sm rounded-lg border-2 transition-all duration-200",
              "focus:ring-0 focus:ring-offset-0",
              error
                ? "border-red-300 bg-red-50/50 focus:border-red-400"
                : hasValue
                ? "border-[#6BBE4A] bg-[#6BBE4A]/5 focus:border-[#6BBE4A]"
                : "border-gray-200 hover:border-gray-300 focus:border-[#6BBE4A]"
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
                "w-full rounded-lg border-2 bg-white px-3 py-2 text-sm resize-none transition-all duration-200",
                "placeholder:text-gray-400",
                "focus:outline-none focus:ring-0",
                error
                  ? "border-red-300 bg-red-50/50 focus:border-red-400"
                  : hasValue
                  ? "border-[#6BBE4A] bg-[#6BBE4A]/5 focus:border-[#6BBE4A]"
                  : "border-gray-200 hover:border-gray-300 focus:border-[#6BBE4A]"
              )}
            />
            {hasValue && !error && (
              <div className="absolute right-2.5 top-2.5">
                <div className="w-4 h-4 rounded-full bg-[#6BBE4A] flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
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
                "h-10 rounded-lg border-2 px-3 text-sm transition-all duration-200",
                "focus:ring-0 focus:ring-offset-0",
                error
                  ? "border-red-300 bg-red-50/50"
                  : hasValue
                  ? "border-[#6BBE4A] bg-[#6BBE4A]/5"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <SelectValue placeholder={field.placeholder || 'Select an option'} />
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-gray-200 shadow-lg">
              {field.options?.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="py-2 px-3 text-sm cursor-pointer rounded focus:bg-[#6BBE4A]/10"
                >
                  <div className="flex items-center gap-2">
                    <span>{option}</span>
                    {value === option && (
                      <Check className="w-3.5 h-3.5 text-[#6BBE4A]" />
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case 'multiselect':
        const selectedValues: string[] = value || []
        return (
          <div className="flex flex-wrap gap-2">
            {field.options?.map((option) => {
              const isSelected = selectedValues.includes(option)
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      handleChange(selectedValues.filter((v) => v !== option))
                    } else {
                      handleChange([...selectedValues, option])
                    }
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200",
                    "hover:scale-105 active:scale-95",
                    isSelected
                      ? "border-[#6BBE4A] bg-[#6BBE4A]/10 text-[#6BBE4A]"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {isSelected && <Check className="w-3 h-3" />}
                    {option}
                  </span>
                </button>
              )
            })}
          </div>
        )

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => {
              const isSelected = value === option

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleChange(option)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
                    "hover:shadow-sm text-left group",
                    isSelected
                      ? "border-[#6BBE4A] bg-[#6BBE4A]/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  )}
                >
                  {/* Radio circle */}
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                      isSelected
                        ? "border-[#6BBE4A] bg-[#6BBE4A]"
                        : "border-gray-300 group-hover:border-gray-400"
                    )}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>

                  {/* Text */}
                  <span className={cn(
                    "flex-1 text-sm font-medium",
                    isSelected ? "text-gray-900" : "text-gray-600"
                  )}>
                    {option}
                  </span>

                  {/* Arrow or check */}
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-[#6BBE4A] flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-500" />
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
                ? "border-[#6BBE4A] bg-[#6BBE4A]/5"
                : "border-gray-200 bg-white hover:border-gray-300"
            )}
          >
            <Checkbox
              checked={value || false}
              onCheckedChange={handleChange}
              className={cn(
                "w-5 h-5 rounded border-2 transition-all",
                value ? "border-[#6BBE4A] bg-[#6BBE4A]" : "border-gray-300"
              )}
            />
            <span className={cn(
              "text-sm font-medium",
              value ? "text-gray-900" : "text-gray-600"
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
            className="h-10 rounded-lg border-2 border-gray-200 px-3 text-sm"
          />
        )
    }
  }

  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-gray-600 flex items-center gap-1">
        {field.label}
        {field.required && (
          <span className="text-red-500">*</span>
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
