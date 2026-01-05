"use client"

import { ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { COMPANY_TYPES, INDUSTRIES, COMPANY_SIZES } from "@/lib/constants"

interface CompanyInfoData {
  companyName: string
  companyType: string
  industry: string
  companySize: string
}

interface StepCompanyInfoProps {
  data: CompanyInfoData
  onChange: (data: CompanyInfoData) => void
  onNext: () => void
  onBack: () => void
}

export function StepCompanyInfo({
  data,
  onChange,
  onNext,
  onBack,
}: StepCompanyInfoProps) {
  const isValid =
    data.companyName && data.companyType && data.industry && data.companySize

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">
          Tell us more about your situation
        </h1>
      </div>

      <div className="space-y-6">
        {/* Company Name */}
        <div className="space-y-2">
          <Label>Company Name</Label>
          <Input
            placeholder="Enter company name"
            value={data.companyName}
            onChange={(e) =>
              onChange({ ...data, companyName: e.target.value })
            }
          />
        </div>

        {/* Company Type */}
        <div className="space-y-2">
          <Label>What kind of company do you work for?</Label>
          <Select
            value={data.companyType}
            onValueChange={(value) =>
              onChange({ ...data, companyType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select company type" />
            </SelectTrigger>
            <SelectContent>
              {COMPANY_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label>What is your industry?</Label>
          <Select
            value={data.industry}
            onValueChange={(value) => onChange({ ...data, industry: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Company Size */}
        <div className="space-y-2">
          <Label>Company Size</Label>
          <Select
            value={data.companySize}
            onValueChange={(value) =>
              onChange({ ...data, companySize: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              {COMPANY_SIZES.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Continue <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
