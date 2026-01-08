'use client'

import { cn } from "@/lib/utils"
import { useEffect, useState, memo, useRef, useCallback, useMemo } from 'react'
import { Link, useRouter } from '@/navigation'
import { Logo } from '@/components/shared/logo'
import LangSwitcher from '@/components/shared/LangSwitcher'
import { useTranslations, useLocale } from 'next-intl'
import { LoadingAnimation } from '@/components/shared/loading-animation'
import { SERVICES, Service as StaticService } from '@/lib/services-data'
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
  Facebook
} from 'lucide-react'

// Icon map
const iconMap: Record<string, React.ElementType> = {
  Globe, TrendingUp, Mail, FileText, Code, Palette, Megaphone,
  Smartphone, Sparkles, Briefcase, ShoppingCart, Cpu, PenTool,
  Search, Share2, Bot, Layers, Facebook
}

// Types
interface Service extends StaticService { }

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
      <div className={`${s.box} bg-[#10273A] shadow-xl shadow-black/30 flex items-center justify-center border border-[#1A3A52]`}>
        <Icon className={`${s.icon} text-[#F6B73A]`} strokeWidth={1.5} />
      </div>
    </div>
  )
})

// Memoized ServiceCard
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
  const locale = useLocale()
  const Icon = iconMap[service.icon || ''] || Globe

  const getName = (s: Service) => {
    if (typeof s.name === 'string') return s.name
    return (s.name as unknown as { en: string; it: string })[locale as 'en' | 'it'] || (s.name as unknown as { en: string; it: string }).en
  }

  const getDescription = (s: Service) => {
    if (!s.description) return 'Professional solutions tailored for your business needs.'
    if (typeof s.description === 'string') return s.description
    return (s.description as unknown as { en: string; it: string })[locale as 'en' | 'it'] || (s.description as unknown as { en: string; it: string }).en
  }

  return (
    <button
      onClick={onSelect}
      className={`group w-full text-center h-full will-change-transform transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="h-full rounded-2xl p-8 bg-[#10273A] border border-[#1A3A52] shadow-sm hover:shadow-xl hover:shadow-[#F6B73A]/10 hover:border-[#F6B73A]/30 hover:-translate-y-1 transition-all duration-300">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#0C1C2A] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Icon className="w-8 h-8 text-[#F6B73A]" strokeWidth={1.5} />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#F6B73A] transition-colors duration-200">
          {getName(service)}
        </h3>
        <p className="text-[#8F8F94] text-sm leading-relaxed mb-6 line-clamp-2">
          {getDescription(service)}
        </p>
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#1A3A52] flex items-center justify-center group-hover:border-[#F6B73A] group-hover:bg-[#F6B73A] transition-all duration-200">
            <ArrowRight className="w-4 h-4 text-[#8F8F94] group-hover:text-[#0C1C2A] transition-colors duration-200" />
          </div>
        </div>
      </div>
    </button>
  )
})

// SVG Background - curved connecting lines with animations
const HeroSVG = memo(function HeroSVG() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F6B73A" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#1A3A52" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F6B73A" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Left side curves */}
      <path d="M 60 160 Q 200 200 240 280" fill="none" stroke="#1A3A52" strokeWidth="1" strokeDasharray="4 4" className="animate-dash" />
      <path d="M 96 440 Q 180 400 216 280" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="6 4" className="animate-dash-reverse" />
      <path d="M 144 640 Q 250 500 300 400" fill="none" stroke="#10273A" strokeWidth="1" strokeDasharray="4 4" className="animate-dash" />
      <path d="M 216 280 Q 350 320 400 400" fill="none" stroke="#1A3A52" strokeWidth="1" strokeDasharray="4 4" className="animate-dash-slow" />

      {/* Right side curves */}
      <path d="M 1140 200 Q 1000 240 960 320" fill="none" stroke="#1A3A52" strokeWidth="1" strokeDasharray="4 4" className="animate-dash-reverse" />
      <path d="M 1080 400 Q 980 380 960 320" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="6 4" className="animate-dash" />
      <path d="M 1104 600 Q 1000 500 920 420" fill="none" stroke="#10273A" strokeWidth="1" strokeDasharray="4 4" className="animate-dash-reverse" />
      <path d="M 960 320 Q 850 360 800 400" fill="none" stroke="#1A3A52" strokeWidth="1" strokeDasharray="4 4" className="animate-dash-slow" />

      {/* Center connecting arcs */}
      <path d="M 400 400 Q 500 300 600 320" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="6 4" className="animate-dash" />
      <path d="M 800 400 Q 700 300 600 320" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="6 4" className="animate-dash-reverse" />
      <path d="M 600 320 Q 600 450 600 520" fill="none" stroke="#10273A" strokeWidth="1" strokeDasharray="4 4" className="animate-dash-slow" />

      {/* Connection dots with pulse */}
      <circle cx="240" cy="280" r="4" fill="#F6B73A" className="animate-pulse-dot" />
      <circle cx="960" cy="320" r="4" fill="#F6B73A" className="animate-pulse-dot" style={{ animationDelay: '0.5s' }} />
      <circle cx="600" cy="320" r="5" fill="#F6B73A" className="animate-pulse-dot" style={{ animationDelay: '1s' }} />
      <circle cx="400" cy="400" r="3" fill="#1A3A52" className="animate-pulse-dot" style={{ animationDelay: '0.3s' }} />
      <circle cx="800" cy="400" r="3" fill="#1A3A52" className="animate-pulse-dot" style={{ animationDelay: '0.8s' }} />

      {/* Extra floating dots */}
      <circle cx="180" cy="350" r="2" fill="#F6B73A" opacity="0.5" className="animate-pulse-dot" style={{ animationDelay: '1.2s' }} />
      <circle cx="1020" cy="280" r="2" fill="#F6B73A" opacity="0.5" className="animate-pulse-dot" style={{ animationDelay: '0.7s' }} />
      <circle cx="500" cy="250" r="2" fill="#1A3A52" className="animate-pulse-dot" style={{ animationDelay: '1.5s' }} />
      <circle cx="700" cy="250" r="2" fill="#1A3A52" className="animate-pulse-dot" style={{ animationDelay: '0.2s' }} />
    </svg>
  )
})

export default function HomePage() {
  const t = useTranslations('HomePage')
  const locale = useLocale()
  const router = useRouter()
  const [services, setServices] = useState<Service[]>(SERVICES)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  const heroAnim = useScrollAnimation()
  const servicesAnim = useScrollAnimation()
  const footerAnim = useScrollAnimation()

  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(services.map(s => s.category).filter(Boolean)))
    return ['all', ...cats]
  }, [services])

  const filteredServices = useMemo(() => {
    if (activeTab === 'all') return services
    return services.filter(s => s.category === activeTab)
  }, [services, activeTab])

  const handleSelect = useCallback((slug: string) => {
    router.push(`/onboarding/${slug}`)
  }, [router])

  return (
    <div className="min-h-screen bg-[#0C1C2A] overflow-x-hidden">
      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#0C1C2A]/95 backdrop-blur-xl border-b border-[#1A3A52] shadow-sm'
        : 'bg-[#0C1C2A]/60 backdrop-blur-xl border-b border-transparent'
        }`}>
        <div className={`max-w-6xl mx-auto px-6 ${isScrolled ? 'py-3' : 'py-4'} flex justify-between items-center transition-all duration-300`}>
          <div className="w-20" /> {/* Spacer for centering logo */}
          <Logo size="sm" />
          <div className="w-20 flex justify-end">
            <LangSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#10273A]/50 to-[#0C1C2A]" />
        <HeroSVG />

        {floatingIcons.map((item, i) => (
          <FloatingIcon key={i} icon={item.icon} pos={item.pos} size={item.size as 'sm' | 'md' | 'lg'} delay={item.delay} />
        ))}

        {/* Badges */}
        <div className="absolute left-[15%] top-[28%] hidden lg:block animate-float-pro" style={{ animationDelay: '800ms' }}>
          <div className="px-3 py-1.5 rounded-full bg-[#F6B73A] text-[#0C1C2A] text-xs font-semibold shadow-lg">+24</div>
        </div>
        <div className="absolute right-[15%] bottom-[35%] hidden lg:block animate-float-pro" style={{ animationDelay: '1000ms' }}>
          <div className="px-3 py-1.5 rounded-full bg-[#F6B73A] text-[#0C1C2A] text-xs font-semibold shadow-lg">+18</div>
        </div>

        <div ref={heroAnim.ref} className="max-w-6xl mx-auto relative w-full">
          <div className="max-w-3xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F6B73A]/10 text-[#F6B73A] text-sm font-medium mb-8 border border-[#F6B73A]/20 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Sparkles className="w-4 h-4" />
              {t('hero.badge')}
            </div>

            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '150ms' }}>
              {t('hero.titleStart')}
              <br />
              <span className="bg-gradient-to-r from-[#F6B73A] to-[#E9A30E] bg-clip-text text-transparent">
                {t('hero.titleEnd')}
              </span>
            </h1>

            <p className={`text-xl text-[#8F8F94] max-w-xl mx-auto leading-relaxed transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
              {t('hero.description')}
            </p>

            <div className={`mt-12 flex justify-center transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '450ms' }}>
              <div className="w-6 h-10 rounded-full border-2 border-[#1A3A52] flex justify-center pt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F6B73A] animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6">
        <div ref={servicesAnim.ref} className="max-w-6xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${servicesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-[#F6B73A] text-sm font-semibold mb-3 block tracking-wider uppercase">{t('services.label')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {t('services.titleStart')}
              <br />
              <span className="text-[#8F8F94]">{t('services.titleEnd')}</span>
            </h2>

            {/* Category Filter */}
            {categories.length > 1 && (
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((cat) => {
                  const isActive = activeTab === cat;

                  const getCategoryLabel = (c: string) => {
                    if (c === 'all') return locale === 'it' ? 'Tutti i Servizi' : 'All Services';
                    const labels: Record<string, { en: string, it: string }> = {
                      'Growth & Ads': { en: 'Growth & Ads', it: 'Crescita & Ads' },
                      'SEO & Content': { en: 'SEO & Content', it: 'SEO & Contenuti' },
                      'Development': { en: 'Development', it: 'Sviluppo' },
                      'AI & Automation': { en: 'AI & Automation', it: 'AI & Automazione' }
                    };
                    return labels[c]?.[locale as 'en' | 'it'] || c;
                  };

                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveTab(cat)}
                      className={cn(
                        "relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2",
                        "group overflow-hidden border",
                        isActive
                          ? "bg-gradient-to-r from-[#F6B73A] to-[#E9A30E] text-[#0C1C2A] border-[#F6B73A] shadow-lg shadow-[#F6B73A]/20"
                          : "bg-[#10273A] text-[#8F8F94] border-[#1A3A52] hover:border-[#F6B73A]/50 hover:text-white"
                      )}
                    >
                      {/* Active background glow */}
                      {isActive && (
                        <span className="absolute inset-0 bg-white/20 animate-pulse-slow" />
                      )}

                      {/* Icon for category */}
                      {cat === 'all' && <Layers className="w-4 h-4" />}
                      {cat === 'Growth & Ads' && <TrendingUp className="w-4 h-4" />}
                      {cat === 'SEO & Content' && <Search className="w-4 h-4" />}
                      {cat === 'Development' && <Code className="w-4 h-4" />}
                      {cat === 'AI & Automation' && <Bot className="w-4 h-4" />}
                      {!['all', 'Growth & Ads', 'SEO & Content', 'Development', 'AI & Automation'].includes(cat) && <Briefcase className="w-4 h-4" />}

                      <span className="relative z-10">
                        {getCategoryLabel(cat)}
                      </span>

                      {/* Small counter */}
                      <span className={cn(
                        "text-[10px] ml-1 px-1.5 py-0.5 rounded-md",
                        isActive ? "bg-black/20 text-[#0C1C2A]" : "bg-[#1A3A52] text-[#8F8F94]"
                      )}>
                        {cat === 'all' ? services.length : services.filter(s => s.category === cat).length}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, i) => (
              <ServiceCard
                key={service._id}
                service={service}
                index={i}
                isVisible={servicesAnim.isVisible}
                onSelect={() => handleSelect(service.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#1A3A52]">
        <div ref={footerAnim.ref} className="max-w-6xl mx-auto">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 ${footerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Logo size="sm" />
            <p className="text-[#8F8F94] text-sm">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
