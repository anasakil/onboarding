"use client"

import Lottie from "lottie-react"
import { useEffect, useState } from "react"

// Local Lottie animation file path
const BUSINESSMEN_TABLE_LOTTIE = "/animations/businessmen-table.json"

interface LottieIllustrationProps {
  step: number
  className?: string
}

export function LottieIllustration({ step, className }: LottieIllustrationProps) {
  const [animationData, setAnimationData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(BUSINESSMEN_TABLE_LOTTIE)
      .then((res) => res.json())
      .then((data) => {
        setAnimationData(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Failed to load Lottie animation:", err)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
          <div className="absolute inset-0 border-4 border-[#6BBE4A] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (!animationData) {
    return <FallbackIllustration step={step} />
  }

  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "auto" }}
      />
      {/* Step indicator overlay */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-gray-100">
        <span className="text-sm font-semibold text-[#6BBE4A]">Step {step}</span>
      </div>
    </div>
  )
}

// Fallback SVG illustration if Lottie fails to load
function FallbackIllustration({ step }: { step: number }) {
  return (
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

        {/* Table */}
        <rect x="80" y="200" width="240" height="15" rx="4" fill="#8B7355" />
        <rect x="90" y="215" width="10" height="80" fill="#8B7355" />
        <rect x="300" y="215" width="10" height="80" fill="#8B7355" />

        {/* Person 1 - Left */}
        <g className="animate-float" style={{ animationDelay: '0s' }}>
          <circle cx="130" cy="150" r="25" fill="#F5D0C5" />
          <path d="M105 140 Q115 115 130 112 Q145 115 155 140" fill="#1F2937" />
          <circle cx="122" cy="148" r="2" fill="#1F2937" />
          <circle cx="138" cy="148" r="2" fill="#1F2937" />
          <path d="M125 158 Q130 162 135 158" stroke="#1F2937" strokeWidth="2" fill="none" />
          <rect x="110" y="175" width="40" height="50" rx="8" fill="#6BBE4A" />
        </g>

        {/* Person 2 - Center */}
        <g className="animate-float" style={{ animationDelay: '0.3s' }}>
          <circle cx="200" cy="140" r="28" fill="#F5D0C5" />
          <path d="M172 130 Q185 100 200 98 Q215 100 228 130" fill="#1F2937" />
          <circle cx="190" cy="138" r="2" fill="#1F2937" />
          <circle cx="210" cy="138" r="2" fill="#1F2937" />
          <path d="M195 150 Q200 155 205 150" stroke="#1F2937" strokeWidth="2" fill="none" />
          <rect x="175" y="168" width="50" height="55" rx="10" fill="#9B8AFB" />
        </g>

        {/* Person 3 - Right */}
        <g className="animate-float" style={{ animationDelay: '0.6s' }}>
          <circle cx="270" cy="150" r="25" fill="#F5D0C5" />
          <path d="M245 140 Q255 115 270 112 Q285 115 295 140" fill="#1F2937" />
          <circle cx="262" cy="148" r="2" fill="#1F2937" />
          <circle cx="278" cy="148" r="2" fill="#1F2937" />
          <path d="M265 158 Q270 162 275 158" stroke="#1F2937" strokeWidth="2" fill="none" />
          <rect x="250" y="175" width="40" height="50" rx="8" fill="#3D5A3D" />
        </g>

        {/* Floating elements */}
        <g className="animate-float" style={{ animationDelay: '0.5s' }}>
          <rect x="320" y="80" width="45" height="45" rx="10" fill="white" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))"/>
          <circle cx="342" cy="102" r="12" fill="#6BBE4A" opacity="0.15"/>
          <text x="342" y="107" textAnchor="middle" fill="#6BBE4A" fontSize="14" fontWeight="700">{step}</text>
        </g>

        {/* Document on table */}
        <rect x="170" y="185" width="60" height="12" rx="2" fill="white" stroke="#E5E7EB" />
        <rect x="175" y="188" width="30" height="2" rx="1" fill="#6BBE4A" opacity="0.5" />
        <rect x="175" y="192" width="20" height="2" rx="1" fill="#E5E7EB" />

        {/* Decorative dots */}
        <circle cx="50" cy="120" r="4" fill="#6BBE4A" className="animate-pulse"/>
        <circle cx="350" cy="250" r="3" fill="#9B8AFB" opacity="0.5"/>
      </svg>
    </div>
  )
}
