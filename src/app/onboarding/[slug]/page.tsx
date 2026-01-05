"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Logo } from "@/components/shared/logo"
import { DynamicField } from "@/components/forms/dynamic-field"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Loader2,
  Home,
  Check,
  Shield
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface FormField {
  _id?: string
  name: string
  label: string
  type: string
  placeholder?: string
  required: boolean
  options?: string[]
  step: number
  order: number
}

interface Step {
  _id?: string
  title: string
  description?: string
  order: number
  layout?: 'with-image' | 'two-column'
}

interface Service {
  _id: string
  name: string
  slug: string
  description?: string
  color: string
  steps: Step[]
  fields: FormField[]
}

// Compact Step Progress Bar
const StepProgress = ({
  currentStep,
  totalSteps,
  steps,
}: {
  currentStep: number
  totalSteps: number
  steps: Step[]
}) => {
  return (
    <div className="mb-6">
      {/* Steps indicator */}
      <div className="flex items-center gap-1">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <div key={index} className="flex items-center flex-1 last:flex-none">
              {/* Step circle */}
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 flex-shrink-0",
                  isCompleted && "bg-[#6BBE4A] text-white",
                  isCurrent && "bg-[#6BBE4A] text-white ring-4 ring-[#6BBE4A]/20",
                  !isCompleted && !isCurrent && "bg-gray-100 text-gray-400"
                )}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  stepNumber
                )}
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      stepNumber < currentStep ? "bg-[#6BBE4A]" : "bg-gray-200"
                    )}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Current step label */}
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-gray-500">
          Step {currentStep} of {totalSteps}
        </p>
        <p className="text-xs font-medium text-[#6BBE4A]">
          {Math.round((currentStep / totalSteps) * 100)}% complete
        </p>
      </div>
    </div>
  )
}

// Compact Illustration
const CompactIllustration = ({ step }: { step: number }) => (
  <div className="relative w-full max-w-sm mx-auto">
    <svg viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6BBE4A"/>
          <stop offset="100%" stopColor="#5AA83D"/>
        </linearGradient>
      </defs>

      {/* Background circles */}
      <circle cx="200" cy="175" r="120" fill="url(#grad1)" opacity="0.05" />
      <circle cx="200" cy="175" r="80" fill="url(#grad1)" opacity="0.08" />

      {/* Main card */}
      <g className="animate-float-slow">
        <rect x="100" y="80" width="200" height="190" rx="16" fill="white" filter="drop-shadow(0 8px 24px rgba(0,0,0,0.08))"/>
        <rect x="120" y="105" width="80" height="10" rx="5" fill="url(#grad1)" />
        <rect x="120" y="125" width="120" height="6" rx="3" fill="#E5E7EB" />
        <rect x="120" y="150" width="160" height="32" rx="6" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1"/>
        <rect x="120" y="195" width="160" height="32" rx="6" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1"/>
        <rect x="120" y="240" width="80" height="28" rx="6" fill="url(#grad1)" />
      </g>

      {/* Floating elements */}
      <g className="animate-float" style={{ animationDelay: '0.5s' }}>
        <rect x="40" y="100" width="45" height="45" rx="10" fill="white" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))"/>
        <circle cx="62" cy="117" r="8" fill="#6BBE4A" opacity="0.2"/>
        <path d="M56 125 L60 129 L70 119" stroke="#6BBE4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>

      <g className="animate-float" style={{ animationDelay: '1s' }}>
        <rect x="315" y="130" width="45" height="45" rx="10" fill="white" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))"/>
        <circle cx="337" cy="152" r="12" fill="#6BBE4A" opacity="0.15"/>
        <text x="337" y="157" textAnchor="middle" fill="#6BBE4A" fontSize="14" fontWeight="700">{step}</text>
      </g>

      <g className="animate-float" style={{ animationDelay: '1.5s' }}>
        <rect x="50" y="220" width="40" height="40" rx="8" fill="white" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))"/>
        <rect x="58" y="233" width="24" height="5" rx="2.5" fill="#6BBE4A"/>
        <rect x="58" y="242" width="16" height="5" rx="2.5" fill="#E5E7EB"/>
      </g>

      {/* Decorative dots */}
      <circle cx="330" cy="90" r="4" fill="#6BBE4A" className="animate-pulse"/>
      <circle cx="60" cy="180" r="3" fill="#9B8AFB" opacity="0.5"/>
    </svg>
  </div>
)

export default function OnboardingPage() {
  const params = useParams()
  const router = useRouter()
  const [service, setService] = useState<Service | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(`/api/services/${params.slug}`)
        if (res.ok) {
          const data = await res.json()
          setService(data)
        } else {
          toast.error("Service not found")
          router.push("/")
        }
      } catch (error) {
        console.error("Failed to fetch service:", error)
        toast.error("Failed to load service")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.slug) {
      fetchService()
    }
  }, [params.slug, router])

  const handleFieldChange = useCallback((name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (prev[name]) {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      }
      return prev
    })
  }, [])

  const validateStep = useCallback(() => {
    if (!service) return false

    const currentFields = service.fields
      .filter((f) => f.step === currentStep)
      .sort((a, b) => a.order - b.order)

    const newErrors: Record<string, string> = {}

    for (const field of currentFields) {
      if (field.required) {
        const value = formData[field.name]
        if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[field.name] = `${field.label} is required`
        }
      }

      if (field.type === "email" && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = "Please enter a valid email address"
        }
      }

      if (field.type === "url" && formData[field.name]) {
        try {
          new URL(formData[field.name])
        } catch {
          newErrors[field.name] = "Please enter a valid URL"
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [service, currentStep, formData])

  const handleNext = useCallback(() => {
    if (validateStep()) {
      if (currentStep < (service?.steps.length || 1)) {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentStep(currentStep + 1)
          setIsTransitioning(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 200)
      }
    }
  }, [validateStep, currentStep, service])

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep(currentStep - 1)
        setIsTransitioning(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 200)
    }
  }, [currentStep])

  const handleSubmit = async () => {
    if (!validateStep() || !service) return

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service._id,
          serviceName: service.name,
          data: formData,
          clientEmail: formData.email,
          clientName: formData.fullName || formData.name,
          clientPhone: formData.phone,
        }),
      })

      if (res.ok) {
        setIsSubmitted(true)
        toast.success("Thank you! We'll be in touch soon.")
      } else {
        throw new Error("Submission failed")
      }
    } catch (error) {
      toast.error("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFBFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 border-3 border-gray-200 rounded-full" />
            <div className="absolute inset-0 w-10 h-10 border-3 border-[#6BBE4A] border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  if (!service) {
    return null
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-sm w-full text-center animate-fade-in-up">
          {/* Success icon */}
          <div className="relative w-16 h-16 mx-auto mb-5">
            <div className="absolute inset-0 bg-[#6BBE4A]/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#6BBE4A] to-[#5AA83D] flex items-center justify-center shadow-lg shadow-[#6BBE4A]/30">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h1>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Your request for <span className="font-semibold text-gray-700">{service.name}</span> has been submitted. We'll respond within 24-48 hours.
          </p>

          <Link href="/">
            <button className="w-full h-10 text-sm font-semibold text-white rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-[#6BBE4A] to-[#5AA83D] shadow-md hover:shadow-lg transition-all">
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const sortedSteps = [...service.steps].sort((a, b) => a.order - b.order)
  const currentStepData = sortedSteps.find((s) => s.order === currentStep)
  const currentFields = service.fields
    .filter((f) => f.step === currentStep)
    .sort((a, b) => a.order - b.order)

  const isLastStep = currentStep === sortedSteps.length
  // Only show illustration for first 2 steps, after that use full two-column form
  const showIllustration = currentStep <= 2

  // Split layout with illustration
  if (showIllustration) {
    return (
      <div className="min-h-screen flex">
        {/* Left - Form */}
        <div className="w-full lg:w-1/2 min-h-screen bg-white flex flex-col">
          <header className="px-5 lg:px-8 py-3 border-b border-gray-100">
            <Link href="/" className="hover:opacity-80 transition-opacity inline-block">
              <Logo size="sm" />
            </Link>
          </header>

          <div className="flex-1 flex items-center justify-center px-5 lg:px-8 py-6">
            <div className="w-full max-w-sm">
              <StepProgress
                currentStep={currentStep}
                totalSteps={sortedSteps.length}
                steps={sortedSteps}
              />

              <div className={cn(
                "transition-all duration-200",
                isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              )}>
                {/* Step header */}
                <div className="mb-5">
                  <h1 className="text-lg font-bold text-gray-900 mb-1">
                    {currentStepData?.title}
                  </h1>
                  {currentStepData?.description && (
                    <p className="text-gray-500 text-sm">{currentStepData.description}</p>
                  )}
                </div>

                {/* Fields */}
                <div className="space-y-4">
                  {currentFields.map((field, index) => (
                    <div
                      key={field._id || field.name}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <DynamicField
                        field={field}
                        value={formData[field.name]}
                        onChange={handleFieldChange}
                        error={errors[field.name]}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
                  {currentStep > 1 ? (
                    <button
                      onClick={handleBack}
                      className="h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all text-sm font-medium text-gray-600 flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                  ) : (
                    <Link href="/">
                      <button className="h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all text-sm font-medium text-gray-600 flex items-center gap-1.5">
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back
                      </button>
                    </Link>
                  )}

                  <div className="flex-1" />

                  <button
                    onClick={handleNext}
                    className="h-9 px-5 rounded-lg text-white text-sm font-semibold bg-gradient-to-r from-[#6BBE4A] to-[#5AA83D] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
                  >
                    Continue
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Illustration */}
        <div className="hidden lg:flex w-1/2 min-h-screen bg-gradient-to-br from-[#f8fdf6] to-[#f0fdf4] items-center justify-center p-8">
          <CompactIllustration step={currentStep} />
        </div>
      </div>
    )
  }

  // Full-width two-column layout
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Shield className="w-3.5 h-3.5 text-[#6BBE4A]" />
            <span>Secure</span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 py-6">
        <StepProgress
          currentStep={currentStep}
          totalSteps={sortedSteps.length}
          steps={sortedSteps}
        />

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">
          <div className={cn(
            "transition-all duration-200",
            isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          )}>
            {/* Step header */}
            <div className="mb-5">
              <h1 className="text-lg font-bold text-gray-900 mb-1">
                {currentStepData?.title}
              </h1>
              {currentStepData?.description && (
                <p className="text-gray-500 text-sm">{currentStepData.description}</p>
              )}
            </div>

            {/* Two-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentFields.map((field, index) => (
                <div
                  key={field._id || field.name}
                  className={cn(
                    "animate-fade-in-up",
                    (field.type === 'textarea' || field.type === 'multiselect' || field.type === 'radio') && "md:col-span-2"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <DynamicField
                    field={field}
                    value={formData[field.name]}
                    onChange={handleFieldChange}
                    error={errors[field.name]}
                  />
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
              <button
                onClick={handleBack}
                className="h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all text-sm font-medium text-gray-600 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>

              <div className="flex-1" />

              {isLastStep ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="h-9 px-6 rounded-lg text-white text-sm font-semibold bg-gradient-to-r from-[#6BBE4A] to-[#5AA83D] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="h-9 px-5 rounded-lg text-white text-sm font-semibold bg-gradient-to-r from-[#6BBE4A] to-[#5AA83D] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
                >
                  Continue
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
