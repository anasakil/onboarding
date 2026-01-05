'use client'

import { useEffect, useState, memo, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/shared/logo'
import { LoadingAnimation } from '@/components/shared/loading-animation'
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
  Briefcase,
  ShoppingCart,
  Cpu,
  PenTool,
  Search,
  Share2,
  Bot,
  Layers,
} from 'lucide-react'

// Icon map
const iconMap: Record<string, React.ElementType> = {
  Globe, TrendingUp, Mail, FileText, Code, Palette, Megaphone,
  Smartphone, Sparkles, Briefcase, ShoppingCart, Cpu, PenTool,
  Search, Share2, Bot, Layers,
}

// Types
interface Service {
  _id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color: string
  category: string
}

// Optimized scroll animation hook
function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// Floating icons data - defined once
const floatingIcons = [
  { icon: Globe, pos: 'left-[5%] top-[20%]', size: 'lg', delay: 0 },
  { icon: Code, pos: 'left-[8%] top-[55%]', size: 'md', delay: 200 },
  { icon: Mail, pos: 'left-[12%] bottom-[20%]', size: 'sm', delay: 400 },
  { icon: Palette, pos: 'left-[18%] top-[35%]', size: 'md', delay: 600 },
  { icon: TrendingUp, pos: 'right-[5%] top-[25%]', size: 'lg', delay: 100 },
  { icon: Megaphone, pos: 'right-[10%] top-[50%]', size: 'md', delay: 300 },
  { icon: Smartphone, pos: 'right-[8%] bottom-[25%]', size: 'sm', delay: 500 },
  { icon: Search, pos: 'right-[18%] top-[38%]', size: 'md', delay: 700 },
] as const

const sizeMap = {
  sm: { box: 'w-10 h-10 rounded-lg', icon: 'w-5 h-5' },
  md: { box: 'w-12 h-12 rounded-xl', icon: 'w-6 h-6' },
  lg: { box: 'w-14 h-14 rounded-2xl', icon: 'w-7 h-7' },
}

// Memoized Floating Icon
const FloatingIcon = memo(function FloatingIcon({
  icon: Icon,
  pos,
  size = 'md',
  delay = 0,
}: {
  icon: React.ElementType
  pos: string
  size?: 'sm' | 'md' | 'lg'
  delay?: number
}) {
  const s = sizeMap[size]
  return (
    <div className={`absolute ${pos} hidden lg:block animate-float-pro will-change-transform`} style={{ animationDelay: `${delay}ms` }}>
      <div className={`${s.box} bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center border border-gray-100`}>
        <Icon className={`${s.icon} text-[#6BBE4A]`} strokeWidth={1.5} />
      </div>
    </div>
  )
})

// Memoized Service Card
const ServiceCard = memo(function ServiceCard({
  service,
  onSelect,
  index,
  isVisible,
}: {
  service: Service
  onSelect: () => void
  index: number
  isVisible: boolean
}) {
  const Icon = iconMap[service.icon || ''] || Globe

  return (
    <button
      onClick={onSelect}
      className={`group w-full text-center h-full will-change-transform transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="h-full rounded-2xl p-8 bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-[#6BBE4A]/10 hover:border-[#6BBE4A]/30 hover:-translate-y-1 transition-all duration-300">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Icon className="w-8 h-8 text-[#6BBE4A]" strokeWidth={1.5} />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#6BBE4A] transition-colors duration-200">
          {service.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {service.description || 'Professional solutions tailored for your business needs.'}
        </p>
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:border-[#6BBE4A] group-hover:bg-[#6BBE4A] transition-all duration-200">
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
          </div>
        </div>
      </div>
    </button>
  )
})

// SVG Background - extracted and memoized
const HeroSVG = memo(function HeroSVG() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <ellipse cx="600" cy="400" rx="450" ry="300" fill="none" stroke="#d1d5db" strokeWidth="1" strokeDasharray="6 6" className="animate-spin-very-slow origin-center" />
      <ellipse cx="600" cy="400" rx="350" ry="220" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="animate-spin-very-slow-reverse origin-center" />
    </svg>
  )
})

export default function HomePage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  const heroAnim = useScrollAnimation()
  const servicesAnim = useScrollAnimation()
  const footerAnim = useScrollAnimation()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.ok ? res.json() : [])
      .then(data => setServices(data.filter(Boolean)))
      .catch(() => setServices([]))
      .finally(() => setIsLoading(false))
  }, [])

  const handleSelect = useCallback((slug: string) => {
    router.push(`/onboarding/${slug}`)
  }, [router])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm'
          : 'bg-white/60 backdrop-blur-xl border-b border-transparent'
      }`}>
        <div className={`max-w-6xl mx-auto px-6 ${isScrolled ? 'py-3' : 'py-4'} flex justify-center transition-all duration-300`}>
          <Logo size="sm" />
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
        <HeroSVG />

        {floatingIcons.map((item, i) => (
          <FloatingIcon key={i} icon={item.icon} pos={item.pos} size={item.size as 'sm'|'md'|'lg'} delay={item.delay} />
        ))}

        {/* Badges */}
        <div className="absolute left-[15%] top-[28%] hidden lg:block animate-float-pro" style={{ animationDelay: '800ms' }}>
          <div className="px-3 py-1.5 rounded-full bg-[#6BBE4A] text-white text-xs font-semibold shadow-lg">+24</div>
        </div>
        <div className="absolute right-[15%] bottom-[35%] hidden lg:block animate-float-pro" style={{ animationDelay: '1000ms' }}>
          <div className="px-3 py-1.5 rounded-full bg-[#6BBE4A] text-white text-xs font-semibold shadow-lg">+18</div>
        </div>

        <div ref={heroAnim.ref} className="max-w-6xl mx-auto relative w-full">
          <div className="max-w-3xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6BBE4A]/10 text-[#6BBE4A] text-sm font-medium mb-8 border border-[#6BBE4A]/20 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Sparkles className="w-4 h-4" />
              B2B Onboarding Platform
            </div>

            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '150ms' }}>
              Start your journey
              <br />
              <span className="bg-gradient-to-r from-[#6BBE4A] to-[#4a9e35] bg-clip-text text-transparent">
                with us today
              </span>
            </h1>

            <p className={`text-xl text-gray-500 max-w-xl mx-auto leading-relaxed transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
              Select a service below to begin your personalized onboarding experience.
            </p>

            <div className={`mt-12 flex justify-center transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '450ms' }}>
              <div className="w-6 h-10 rounded-full border-2 border-gray-300 flex justify-center pt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6BBE4A] animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6">
        <div ref={servicesAnim.ref} className="max-w-6xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-700 ${servicesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-[#6BBE4A] text-sm font-semibold mb-3 block tracking-wider uppercase">Features Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              A wide range of professional
              <br />
              <span className="text-gray-400">services</span>
            </h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <LoadingAnimation size="lg" text="Loading services..." />
            </div>
          ) : services.length === 0 ? (
            <div className="flex flex-col items-center py-16">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                <FileText className="w-7 h-7 text-gray-400" />
              </div>
              <p className="text-gray-500">No services available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  index={i}
                  isVisible={servicesAnim.isVisible}
                  onSelect={() => handleSelect(service.slug)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div ref={footerAnim.ref} className="max-w-6xl mx-auto">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 ${footerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Logo size="sm" />
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} IntelligentB2B Onboarding</p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-400 hover:text-[#6BBE4A] text-sm transition-colors">Privacy</Link>
              <Link href="#" className="text-gray-400 hover:text-[#6BBE4A] text-sm transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
