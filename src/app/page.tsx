'use client'

import { useEffect, useState, memo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/shared/logo'
import {
  Globe,
  TrendingUp,
  Mail,
  FileText,
  ArrowRight,
  Code,
  Palette,
  Megaphone,
  Smartphone,
  Sparkles,
  Check,
  Briefcase,
  ShoppingCart,
  Cpu,
  PenTool,
  Search,
  Share2,
  Bot,
  Layers,
  ArrowUpRight,
  Play,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  Globe, TrendingUp, Mail, FileText, Code, Palette, Megaphone,
  Smartphone, Sparkles, Briefcase, ShoppingCart, Cpu, PenTool,
  Search, Share2, Bot, Layers,
}

interface Service {
  _id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color: string
  category: string
}

// Service Card Component - Premium Grid Card (Memoized)
const ServiceCard = memo(function ServiceCard({
  service,
  isSelected,
  onSelect,
}: {
  service: Service
  isSelected: boolean
  onSelect: () => void
}) {
  const Icon = iconMap[service.icon || ''] || Globe

  return (
    <button
      onClick={onSelect}
      className="group relative w-full text-left h-full"
    >
      <div className={cn(
        "relative h-full rounded-3xl p-8 transition-all duration-500 overflow-hidden",
        "bg-white border-2",
        "hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#6BBE4A]/20",
        isSelected
          ? "border-[#6BBE4A] shadow-2xl shadow-[#6BBE4A]/20"
          : "border-gray-100 hover:border-[#6BBE4A]/50"
      )}>
        {/* Background glow */}
        <div className={cn(
          "absolute -top-24 -right-24 w-48 h-48 rounded-full transition-all duration-700",
          "bg-gradient-to-br from-[#6BBE4A]/20 to-transparent blur-3xl",
          "opacity-0 group-hover:opacity-100"
        )} />

        {/* Icon */}
        <div className="relative mb-6">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500",
            "bg-gradient-to-br from-[#6BBE4A] to-[#3d8a2e]",
            "shadow-lg shadow-[#6BBE4A]/30",
            "group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl group-hover:shadow-[#6BBE4A]/40"
          )}>
            <Icon className="w-8 h-8 text-white" />
          </div>

          {/* Floating dot */}
          <div className={cn(
            "absolute -top-1 -right-1 w-4 h-4 rounded-full",
            "bg-[#6BBE4A] opacity-0 group-hover:opacity-100",
            "transition-all duration-500 group-hover:scale-100 scale-0"
          )} />
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className={cn(
            "text-xl font-bold mb-3 transition-colors duration-300",
            "text-gray-900 group-hover:text-[#6BBE4A]"
          )}>
            {service.name}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
            {service.description || 'Professional solutions tailored for your business needs.'}
          </p>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300",
              "text-gray-900 group-hover:text-[#6BBE4A]"
            )}>
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>

            {isSelected && (
              <div className="w-8 h-8 rounded-full bg-[#6BBE4A] flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
          <div className={cn(
            "h-full bg-gradient-to-r from-[#6BBE4A] to-[#3d8a2e] transition-all duration-500",
            "w-0 group-hover:w-full",
            isSelected && "w-full"
          )} />
        </div>
      </div>
    </button>
  )
})

export default function HomePage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services')
        if (res.ok) {
          const data = await res.json()
          setServices(data.filter((s: Service) => s))
        }
      } catch (error) {
        console.error('Failed to fetch services:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchServices()
  }, [])

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service._id)
    setTimeout(() => {
      router.push(`/onboarding/${service.slug}`)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#6BBE4A]/10 via-[#6BBE4A]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#6BBE4A]/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-6xl mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6BBE4A]/10 text-[#6BBE4A] text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              B2B Onboarding Platform
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Start your journey
              <br />
              <span className="bg-gradient-to-r from-[#6BBE4A] to-[#3d8a2e] bg-clip-text text-transparent">
                with us today
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Select a service below to begin your personalized onboarding experience. Quick, simple, and tailored to your needs.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4 mb-16">
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#6BBE4A] to-[#4da339] text-white font-semibold text-lg shadow-xl shadow-[#6BBE4A]/25 hover:shadow-2xl hover:shadow-[#6BBE4A]/30 hover:-translate-y-0.5 transition-all"
              >
                Browse Services
                <ArrowRight className="w-5 h-5" />
              </a>
              <button className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Service
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Select from our range of professional services to get started with your onboarding journey.
            </p>
          </div>

          {/* Services Grid - 4 columns */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-200 rounded-full" />
                <div className="absolute inset-0 w-12 h-12 border-4 border-[#6BBE4A] border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="mt-4 text-gray-400">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No services available</h3>
              <p className="text-gray-500">Services will appear here once configured.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  isSelected={selectedService === service._id}
                  onSelect={() => handleServiceSelect(service)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6BBE4A]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6BBE4A]/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
            Join hundreds of businesses that trust us for their onboarding needs.
          </p>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#6BBE4A] text-white font-semibold text-lg hover:bg-[#5aa83d] transition-colors"
          >
            Start Onboarding
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo size="sm" />
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Onboarding B2B. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link href="#" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
