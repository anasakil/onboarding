"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams } from "next/navigation"
import { Link, useRouter } from "@/navigation"
import { Logo } from "@/components/shared/logo"
import { LottieIllustration } from "@/components/shared/lottie-illustration"
import { LoadingAnimation } from "@/components/shared/loading-animation"
import { DynamicField } from "@/components/forms/dynamic-field"
import { getServiceBySlug, Service as StaticService } from "@/lib/services-data"
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
import { useTranslations, useLocale } from "next-intl"

interface FormField {
  _id?: string
  name: string
  label: string | { en: string; it: string }
  type: string
  placeholder?: string | { en: string; it: string }
  required: boolean
  options?: string[] | { en: string; it: string }[]
  step: number
  order: number
  showIf?: { field: string; value: string }
}

interface Step {
  _id?: string
  title: string | { en: string; it: string }
  description?: string | { en: string; it: string }
  order: number
  layout?: 'with-image' | 'two-column'
}

interface Service extends StaticService { }

// Compact Step Progress Bar
const StepProgress = ({
  currentStep,
  totalSteps,
  steps,
  labels
}: {
  currentStep: number
  totalSteps: number
  steps: Step[]
  labels: { step: string; complete: string }
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
                  isCompleted && "bg-[#F6B73A] text-[#0C1C2A]",
                  isCurrent && "bg-[#F6B73A] text-[#0C1C2A] ring-4 ring-[#F6B73A]/20",
                  !isCompleted && !isCurrent && "bg-[#1A3A52] text-[#8F8F94]"
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
                      stepNumber < currentStep ? "bg-[#F6B73A]" : "bg-[#1A3A52]"
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
        <p className="text-xs text-[#8F8F94]">
          {/* We'll pass these as props or context ideally, but for now let's keep it simple or accept t as prop if we move StepProgress out. 
              Actually StepProgress is defined inside the file, so we can't easily access `t` unless we move it inside component or pass it. 
              Let's make StepProgress accept translation strings or moved inside. 
              Better: Accept a `t` prop or strings. Let's pass `labels` object.
          */}
          {/* Wait, StepProgress is outside OnboardingPage. I should change its signature or components structure.
              For simplicity in this refactor, I will move StepProgress definition inside OnboardingPage OR pass t as prop.
              Passing t as prop is cleaner.
           */}
        </p>
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  const t = useTranslations('Onboarding')
  const tCommon = useTranslations('Common')
  const locale = useLocale()
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

  // Helper to get localized string
  const getLoc = useCallback((val: string | { en: string; it: string } | undefined) => {
    if (!val) return ''
    if (typeof val === 'string') return val
    return val[locale as 'en' | 'it'] || val.en
  }, [locale])

  // Helper to check if a field should be visible
  const isFieldVisible = useCallback((field: FormField) => {
    if (!field.showIf) return true
    const dependentValue = formData[field.showIf.field]

    // Handle array values (multiselect)
    if (Array.isArray(dependentValue)) {
      return dependentValue.includes(field.showIf.value)
    }

    return dependentValue === field.showIf.value
  }, [formData])

  // Load document Lottie animation
  useEffect(() => {
    fetch("/animations/document.json")
      .then((res) => res.json())
      .then((data) => setDocumentAnimation(data))
      .catch((err) => console.error("Failed to load document animation:", err))
  }, [])

  useEffect(() => {
    if (params.slug) {
      const staticService = getServiceBySlug(params.slug as string)
      if (staticService) {
        setService(staticService as Service)
        setIsLoading(false)
      } else {
        toast.error(t('Messages.serviceNotFound'))
        router.push("/")
      }
    }
  }, [params.slug, router, t])

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

    const currentFields = (service.fields as FormField[])
      .filter((f) => f.step === currentStep && isFieldVisible(f))
      .sort((a, b) => a.order - b.order)

    const newErrors: Record<string, string> = {}

    for (const field of currentFields) {
      if (field.required) {
        const value = formData[field.name]
        if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[field.name] = t('Validation.required', { label: getLoc(field.label) })
        }
      }

      if (field.type === "email" && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = t('Validation.email')
        }
      }

      if (field.type === "url" && formData[field.name]) {
        try {
          new URL(formData[field.name])
        } catch {
          newErrors[field.name] = t('Validation.url')
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [service, currentStep, formData, getLoc, t])

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
    } else {
      toast.error(t('Validation.fillRequired'))
    }
  }, [validateStep, currentStep, service, t])

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
          serviceSlug: service.slug,
          serviceId: service._id,
          serviceName: getLoc(service.name),
          data: formData,
          clientEmail: formData.email,
          clientName: formData.fullName || formData.name,
          clientPhone: formData.phone,
        }),
      })

      if (res.ok) {
        setIsSubmitted(true)
        toast.success(t('Messages.successTitle'))
      } else {
        throw new Error("Submission failed")
      }
    } catch (error) {
      toast.error(t('Messages.errorDesc'))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0C1C2A]">
        <LoadingAnimation size="lg" text={t('Messages.loading')} />
      </div>
    )
  }

  if (!service) {
    return null
  }

  const getName = (s: Service) => {
    if (typeof s.name === 'string') return s.name
    return (s.name as { en: string; it: string })[locale as 'en' | 'it'] || (s.name as { en: string; it: string }).en
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0C1C2A] flex items-center justify-center p-4">
        <div className="bg-[#10273A] rounded-2xl shadow-lg border border-[#1A3A52] p-8 max-w-sm w-full text-center animate-fade-in-up">
          {/* Success icon */}
          <div className="relative w-16 h-16 mx-auto mb-5">
            <div className="absolute inset-0 bg-[#F6B73A]/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#F6B73A] to-[#E9A30E] flex items-center justify-center shadow-lg shadow-[#F6B73A]/30">
              <CheckCircle className="w-8 h-8 text-[#0C1C2A]" />
            </div>
          </div>

          <h1 className="text-xl font-bold text-white mb-2">{t('Messages.successTitle')}</h1>
          <p className="text-[#8F8F94] text-sm mb-6 leading-relaxed">
            {t('Messages.successDesc', { serviceName: getName(service) })}
          </p>

          <Link href="/">
            <button className="w-full h-10 text-sm font-semibold text-[#0C1C2A] rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-[#F6B73A] to-[#E9A30E] shadow-md hover:shadow-lg transition-all">
              <Home className="w-4 h-4" />
              {t('Controls.backToHome')}
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const sortedSteps = [...service.steps].sort((a, b) => a.order - b.order)
  const currentStepData = sortedSteps.find((s) => s.order === currentStep)
  const currentFields = (service.fields as FormField[])
    .filter((f) => f.step === currentStep && isFieldVisible(f))
    .sort((a, b) => a.order - b.order)

  const isLastStep = currentStep === sortedSteps.length
  // Only show illustration for first 2 steps, after that use full two-column form
  // OVERRIDE: Lead Gen & CRM service never shows illustrations as requested
  const showIllustration = currentStep <= 2 && params.slug !== 'lead-generation-crm'

  // Helper function to format field value for display
  const formatFieldValue = (field: FormField, value: any) => {
    if (!value) return <span className="text-[#8F8F94] italic">{t('Review.notProvided')}</span>
    if (Array.isArray(value)) return value.join(", ")
    if (typeof value === "boolean") return value ? t('Review.yes') : t('Review.no')
    return String(value)
  }

  // Review page
  if (showReview) {
    return (
      <div className="min-h-screen bg-[#0C1C2A]">
        <header className="bg-[#10273A] border-b border-[#1A3A52] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo size="sm" />
            </Link>
            <div className="flex items-center gap-2 text-sm text-[#8F8F94]">
              <Shield className="w-4 h-4 text-[#F6B73A]" />
              <span>{t('Review.headerLabel')}</span>
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
                  <div className="w-64 h-64 bg-gradient-to-br from-[#F6B73A]/10 to-[#F6B73A]/5 rounded-3xl flex items-center justify-center">
                    <CheckCircle className="w-20 h-20 text-[#F6B73A]" />
                  </div>
                )}
              </div>

              {/* Review Title */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F6B73A]/10 text-[#F6B73A] text-sm font-medium mb-4">
                  <Check className="w-4 h-4" />
                  {t('Review.badge')}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {t('Review.title')}
                </h1>
                <p className="text-[#8F8F94] text-lg max-w-xl">
                  {t('Review.description')}
                </p>
              </div>
            </div>

            {/* Review Cards */}
            <div className="space-y-6">
              {sortedSteps.map((step) => {
                const stepFields = (service.fields as FormField[])
                  .filter((f) => f.step === step.order && isFieldVisible(f))
                  .sort((a, b) => a.order - b.order)

                return (
                  <div
                    key={step.order}
                    className="bg-[#10273A] rounded-2xl border border-[#1A3A52] overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${(step.order - 1) * 100}ms` }}
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between px-6 py-4 bg-[#0C1C2A] border-b border-[#1A3A52]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F6B73A] text-[#0C1C2A] flex items-center justify-center text-sm font-semibold">
                          {step.order}
                        </div>
                        <h3 className="font-semibold text-white">{getLoc(step.title)}</h3>
                      </div>
                      <button
                        onClick={() => goToStep(step.order)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#F6B73A] hover:bg-[#F6B73A]/10 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        {t('Review.edit')}
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
                            <p className="text-sm text-[#8F8F94] mb-1">{getLoc(field.label)}</p>
                            <p className="text-white font-medium">
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
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 pt-8 border-t border-[#1A3A52]">
              <button
                onClick={handleBack}
                className="w-full sm:w-auto h-12 px-8 rounded-xl border border-[#1A3A52] bg-[#10273A] hover:bg-[#1A3A52] transition-all text-sm font-medium text-white flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('Controls.backToEdit')}
              </button>

              <div className="flex-1" />

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto h-12 px-10 rounded-xl text-[#0C1C2A] text-base font-semibold bg-gradient-to-r from-[#F6B73A] to-[#E9A30E] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t('Controls.submitting')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('Controls.submit')}
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
        <div className="w-full lg:w-1/2 min-h-screen bg-[#0C1C2A] flex flex-col">
          <header className="px-5 lg:px-8 py-3 border-b border-[#1A3A52]">
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
                labels={{
                  step: t('Progress.step'),
                  complete: t('Progress.complete')
                }}
              />

              <div className={cn(
                "transition-all duration-200",
                isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              )}>
                {/* Step header */}
                <div className="mb-5">
                  <h1 className="text-lg font-bold text-white mb-1">
                    {getLoc(currentStepData?.title)}
                  </h1>
                  {currentStepData?.description && (
                    <p className="text-[#8F8F94] text-sm">{getLoc(currentStepData.description)}</p>
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
                        field={{
                          ...field,
                          label: getLoc(field.label),
                          placeholder: getLoc(field.placeholder),
                          options: field.options?.map(opt => typeof opt === 'string' ? opt : getLoc(opt))
                        }}
                        value={formData[field.name]}
                        onChange={handleFieldChange}
                        error={errors[field.name]}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-[#1A3A52]">
                  {currentStep > 1 ? (
                    <button
                      onClick={handleBack}
                      className="h-9 px-4 rounded-lg border border-[#1A3A52] bg-[#10273A] hover:bg-[#1A3A52] transition-all text-sm font-medium text-white flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      {t('Controls.back')}
                    </button>
                  ) : (
                    <Link href="/">
                      <button className="h-9 px-4 rounded-lg border border-[#1A3A52] bg-[#10273A] hover:bg-[#1A3A52] transition-all text-sm font-medium text-white flex items-center gap-1.5">
                        <ArrowLeft className="w-3.5 h-3.5" />
                        {t('Controls.back')}
                      </button>
                    </Link>
                  )}

                  <div className="flex-1" />

                  <button
                    onClick={handleNext}
                    className="h-9 px-5 rounded-lg text-[#0C1C2A] text-sm font-semibold bg-gradient-to-r from-[#F6B73A] to-[#E9A30E] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
                  >
                    {t('Controls.continue')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Lottie Animation */}
        <div className="hidden lg:flex w-1/2 min-h-screen bg-gradient-to-br from-[#10273A] to-[#0C1C2A] items-center justify-center p-8">
          <LottieIllustration step={currentStep} />
        </div>
      </div>
    )
  }

  // Full-width two-column layout for steps 3+
  return (
    <div className="min-h-screen bg-[#0C1C2A]">
      <header className="bg-[#10273A] border-b border-[#1A3A52] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-2 text-sm text-[#8F8F94]">
            <Shield className="w-4 h-4 text-[#F6B73A]" />
            <span>{t('Review.headerLabel')}</span>
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
            labels={{
              step: t('Progress.step'),
              complete: t('Progress.complete')
            }}
          />
        </div>

        {/* Full width container */}
        <div className="bg-[#10273A] rounded-2xl p-6 md:p-10 border border-[#1A3A52]">
          <div className={cn(
            "transition-all duration-200",
            isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          )}>
            {/* Step header - centered */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {getLoc(currentStepData?.title)}
              </h1>
              {currentStepData?.description && (
                <p className="text-[#8F8F94] text-base max-w-2xl mx-auto">{getLoc(currentStepData.description)}</p>
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
                    field={{
                      ...field,
                      label: getLoc(field.label),
                      placeholder: getLoc(field.placeholder)
                    }}
                    value={formData[field.name]}
                    onChange={handleFieldChange}
                    error={errors[field.name]}
                  />
                </div>
              ))}
            </div>

            {/* Navigation - full width */}
            <div className="flex items-center gap-4 mt-10 pt-6 border-t border-[#1A3A52]">
              <button
                onClick={handleBack}
                className="h-11 px-6 rounded-xl border border-[#1A3A52] bg-[#0C1C2A] hover:bg-[#1A3A52] transition-all text-sm font-medium text-white flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('Controls.back')}
              </button>

              <div className="flex-1" />

              {isLastStep ? (
                <button
                  onClick={handleNext}
                  className="h-11 px-8 rounded-xl text-[#0C1C2A] text-sm font-semibold bg-gradient-to-r from-[#F6B73A] to-[#E9A30E] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  {t('Controls.review')}
                  <Check className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="h-11 px-8 rounded-xl text-[#0C1C2A] text-sm font-semibold bg-gradient-to-r from-[#F6B73A] to-[#E9A30E] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  {t('Controls.continue')}
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
