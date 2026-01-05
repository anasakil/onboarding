"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Logo } from "@/components/shared/logo"
import { LottieIllustration } from "@/components/shared/lottie-illustration"
import { LoadingAnimation } from "@/components/shared/loading-animation"
import { DynamicField } from "@/components/forms/dynamic-field"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Loader2,
  Home,
  Check,
  Shield,
  Edit3,
  Send
} from "lucide-react"
import Lottie from "lottie-react"
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
  const [showReview, setShowReview] = useState(false)
  const [documentAnimation, setDocumentAnimation] = useState<any>(null)

  // Load document Lottie animation
  useEffect(() => {
    fetch("/animations/document.json")
      .then((res) => res.json())
      .then((data) => setDocumentAnimation(data))
      .catch((err) => console.error("Failed to load document animation:", err))
  }, [])

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
      } else {
        // Last step completed, show review
        setIsTransitioning(true)
        setTimeout(() => {
          setShowReview(true)
          setIsTransitioning(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 200)
      }
    }
  }, [validateStep, currentStep, service])

  const handleBack = useCallback(() => {
    if (showReview) {
      setIsTransitioning(true)
      setTimeout(() => {
        setShowReview(false)
        setIsTransitioning(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 200)
    } else if (currentStep > 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep(currentStep - 1)
        setIsTransitioning(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 200)
    }
  }, [currentStep, showReview])

  const goToStep = useCallback((step: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setShowReview(false)
      setCurrentStep(step)
      setIsTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 200)
  }, [])

  const handleSubmit = async () => {
    if (!service) return

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
        <LoadingAnimation size="lg" text="Loading..." />
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

  // Helper function to format field value for display
  const formatFieldValue = (field: FormField, value: any) => {
    if (!value) return <span className="text-gray-400 italic">Not provided</span>
    if (Array.isArray(value)) return value.join(", ")
    if (typeof value === "boolean") return value ? "Yes" : "No"
    return String(value)
  }

  // Review page
  if (showReview) {
    return (
      <div className="min-h-screen bg-[#FAFBFC]">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo size="sm" />
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-[#6BBE4A]" />
              <span>Review & Submit</span>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-8">
          <div className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}>
            {/* Header with animation */}
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-10">
              {/* Lottie Animation */}
              <div className="w-full lg:w-1/3 flex justify-center">
                {documentAnimation ? (
                  <div className="w-64 h-64">
                    <Lottie
                      animationData={documentAnimation}
                      loop={true}
                      autoplay={true}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                ) : (
                  <div className="w-64 h-64 bg-gradient-to-br from-[#6BBE4A]/10 to-[#6BBE4A]/5 rounded-3xl flex items-center justify-center">
                    <CheckCircle className="w-20 h-20 text-[#6BBE4A]" />
                  </div>
                )}
              </div>

              {/* Review Title */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6BBE4A]/10 text-[#6BBE4A] text-sm font-medium mb-4">
                  <Check className="w-4 h-4" />
                  All steps completed
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Review Your Information
                </h1>
                <p className="text-gray-500 text-lg max-w-xl">
                  Please review all the information you've provided before submitting. Click on any section to make changes.
                </p>
              </div>
            </div>

            {/* Review Cards */}
            <div className="space-y-6">
              {sortedSteps.map((step) => {
                const stepFields = service.fields
                  .filter((f) => f.step === step.order)
                  .sort((a, b) => a.order - b.order)

                return (
                  <div
                    key={step.order}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${(step.order - 1) * 100}ms` }}
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#6BBE4A] text-white flex items-center justify-center text-sm font-semibold">
                          {step.order}
                        </div>
                        <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      </div>
                      <button
                        onClick={() => goToStep(step.order)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#6BBE4A] hover:bg-[#6BBE4A]/10 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {stepFields.map((field) => (
                          <div
                            key={field.name}
                            className={cn(
                              (field.type === 'textarea' || field.type === 'multiselect' || field.type === 'radio') && "md:col-span-2"
                            )}
                          >
                            <p className="text-sm text-gray-500 mb-1">{field.label}</p>
                            <p className="text-gray-900 font-medium">
                              {formatFieldValue(field, formData[field.name])}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Submit Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 pt-8 border-t border-gray-200">
              <button
                onClick={handleBack}
                className="w-full sm:w-auto h-12 px-8 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all text-sm font-medium text-gray-600 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Edit
              </button>

              <div className="flex-1" />

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto h-12 px-10 rounded-xl text-white text-base font-semibold bg-gradient-to-r from-[#6BBE4A] to-[#5AA83D] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

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

        {/* Right - Lottie Animation */}
        <div className="hidden lg:flex w-1/2 min-h-screen bg-gradient-to-br from-[#f8fdf6] to-[#f0fdf4] items-center justify-center p-8">
          <LottieIllustration step={currentStep} />
        </div>
      </div>
    )
  }

  // Full-width two-column layout for steps 3+
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Shield className="w-4 h-4 text-[#6BBE4A]" />
            <span>Secure Form</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-8">
        {/* Progress bar - full width */}
        <div className="mb-8">
          <StepProgress
            currentStep={currentStep}
            totalSteps={sortedSteps.length}
            steps={sortedSteps}
          />
        </div>

        {/* Full width container */}
        <div className="bg-white rounded-2xl p-6 md:p-10">
          <div className={cn(
            "transition-all duration-200",
            isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          )}>
            {/* Step header - centered */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {currentStepData?.title}
              </h1>
              {currentStepData?.description && (
                <p className="text-gray-500 text-base max-w-2xl mx-auto">{currentStepData.description}</p>
              )}
            </div>

            {/* Two-column grid for form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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

            {/* Navigation - full width */}
            <div className="flex items-center gap-4 mt-10 pt-6 border-t border-gray-100">
              <button
                onClick={handleBack}
                className="h-11 px-6 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all text-sm font-medium text-gray-600 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="flex-1" />

              {isLastStep ? (
                <button
                  onClick={handleNext}
                  className="h-11 px-8 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-[#6BBE4A] to-[#5AA83D] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  Review
                  <Check className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="h-11 px-8 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-[#6BBE4A] to-[#5AA83D] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
