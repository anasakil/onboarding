"use client"

import { cn } from "@/lib/utils"

interface IllustrationPanelProps {
  variant?: "plan" | "info" | "goals" | "preferences" | "awareness" | "invite" | "verify" | "success" | "work" | "default"
  className?: string
}

export function IllustrationPanel({
  variant = "default",
  className,
}: IllustrationPanelProps) {
  return (
    <div
      className={cn(
        "hidden lg:flex flex-1 bg-[#F7F8FA] items-center justify-center p-12 relative overflow-hidden",
        className
      )}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-secondary/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-20 w-16 h-16 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-lg w-full relative z-10">
        <IllustrationSVG variant={variant} />
      </div>
    </div>
  )
}

function IllustrationSVG({ variant }: { variant: string }) {
  switch (variant) {
    case "plan":
      return <PlanIllustration />
    case "info":
      return <InfoIllustration />
    case "goals":
      return <GoalsIllustration />
    case "preferences":
      return <PreferencesIllustration />
    case "awareness":
      return <AwarenessIllustration />
    case "invite":
      return <InviteIllustration />
    case "verify":
      return <VerifyIllustration />
    case "success":
      return <SuccessIllustration />
    case "work":
      return <InfoIllustration />
    default:
      return <DefaultIllustration />
  }
}

// Plan illustration - Two people with calendar/task board
function PlanIllustration() {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Ground shadow */}
      <ellipse cx="250" cy="370" rx="180" ry="25" fill="#E5E7EB" opacity="0.5" />

      {/* Task board/Calendar */}
      <g className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <rect x="180" y="80" width="200" height="160" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="2" />
        <rect x="180" y="80" width="200" height="35" rx="12" fill="#F3F4F6" />
        <rect x="180" y="103" width="200" height="12" fill="#F3F4F6" />

        {/* Calendar header items */}
        <rect x="195" y="90" width="50" height="8" rx="4" fill="#9CA3AF" />

        {/* Calendar grid items */}
        <rect x="195" y="130" width="30" height="8" rx="2" fill="#6BBE4A" opacity="0.3" />
        <rect x="235" y="130" width="30" height="8" rx="2" fill="#9B8AFB" />
        <rect x="275" y="130" width="45" height="8" rx="2" fill="#E5E7EB" />
        <rect x="330" y="130" width="35" height="8" rx="2" fill="#6BBE4A" />

        <rect x="195" y="155" width="25" height="8" rx="2" fill="#E5E7EB" />
        <rect x="230" y="155" width="35" height="8" rx="2" fill="#6BBE4A" opacity="0.5" />
        <circle cx="285" cy="159" r="6" fill="#6BBE4A" />
        <path d="M282 159 L284 161 L289 156" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="300" y="155" width="40" height="8" rx="2" fill="#E5E7EB" />

        <rect x="195" y="180" width="40" height="8" rx="2" fill="#E5E7EB" />
        <text x="250" y="186" fill="#EF4444" fontSize="10" fontWeight="bold">X</text>
        <rect x="270" y="180" width="30" height="8" rx="2" fill="#E5E7EB" />
        <rect x="310" y="180" width="25" height="8" rx="2" fill="#9B8AFB" opacity="0.5" />

        <rect x="195" y="205" width="35" height="8" rx="2" fill="#E5E7EB" />
        <text x="250" y="211" fill="#6BBE4A" fontSize="12">&#9733;</text>
      </g>

      {/* Floating notification */}
      <g className="animate-float" style={{ animationDelay: '0.5s' }}>
        <rect x="340" y="60" width="50" height="30" rx="8" fill="#6BBE4A" />
        <rect x="350" y="68" width="30" height="4" rx="2" fill="white" />
        <rect x="350" y="76" width="20" height="4" rx="2" fill="white" opacity="0.7" />
      </g>

      {/* Person 1 - Woman with purple top */}
      <g className="animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
        {/* Body */}
        <path d="M120 280 C120 240 100 220 100 200" stroke="#9B8AFB" strokeWidth="35" strokeLinecap="round" fill="none" />
        {/* Pants */}
        <path d="M100 260 L85 340" stroke="#3D5A3D" strokeWidth="22" strokeLinecap="round" />
        <path d="M100 260 L115 340" stroke="#3D5A3D" strokeWidth="22" strokeLinecap="round" />
        {/* Shoes */}
        <ellipse cx="85" cy="350" rx="15" ry="8" fill="#1F2937" />
        <ellipse cx="115" cy="350" rx="15" ry="8" fill="#1F2937" />
        {/* Head */}
        <circle cx="100" cy="155" r="28" fill="#F5D0C5" />
        {/* Hair */}
        <path d="M72 145 Q75 115 100 110 Q125 115 128 145 Q130 160 125 165" stroke="#1F2937" strokeWidth="3" fill="#1F2937" />
        <ellipse cx="135" cy="155" rx="8" ry="15" fill="#1F2937" />
        {/* Face */}
        <circle cx="90" cy="152" r="2" fill="#1F2937" />
        <circle cx="110" cy="152" r="2" fill="#1F2937" />
        <path d="M95 165 Q100 170 105 165" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Arm pointing */}
        <path d="M125 200 L165 175" stroke="#F5D0C5" strokeWidth="14" strokeLinecap="round" />
        <circle cx="170" cy="172" r="8" fill="#F5D0C5" />
      </g>

      {/* Person 2 - Man with green top */}
      <g className="animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
        {/* Body */}
        <path d="M380 290 C380 250 400 230 400 200" stroke="#3D5A3D" strokeWidth="40" strokeLinecap="round" fill="none" />
        {/* Pants */}
        <path d="M400 270 L385 350" stroke="#1F2937" strokeWidth="24" strokeLinecap="round" />
        <path d="M400 270 L420 350" stroke="#1F2937" strokeWidth="24" strokeLinecap="round" />
        {/* Shoes */}
        <ellipse cx="385" cy="358" rx="16" ry="8" fill="#1F2937" />
        <ellipse cx="420" cy="358" rx="16" ry="8" fill="#1F2937" />
        {/* Head */}
        <circle cx="400" cy="150" r="30" fill="#F5D0C5" />
        {/* Hair */}
        <path d="M370 140 Q380 115 400 110 Q420 115 430 140" stroke="#1F2937" strokeWidth="8" fill="none" />
        {/* Face */}
        <circle cx="390" cy="147" r="2" fill="#1F2937" />
        <circle cx="410" cy="147" r="2" fill="#1F2937" />
        <path d="M392 162 Q400 168 408 162" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Arm on hip */}
        <path d="M365 210 L340 250" stroke="#F5D0C5" strokeWidth="14" strokeLinecap="round" />
        <path d="M340 250 L365 280" stroke="#F5D0C5" strokeWidth="14" strokeLinecap="round" />
      </g>

      {/* Decorative elements */}
      <circle cx="60" cy="120" r="8" fill="#6BBE4A" opacity="0.4" className="animate-pulse" />
      <circle cx="440" cy="300" r="6" fill="#9B8AFB" opacity="0.5" className="animate-pulse" style={{ animationDelay: '1s' }} />
      <rect x="50" cy="250" width="12" height="12" rx="3" fill="#6BBE4A" opacity="0.3" transform="rotate(15 56 256)" />
    </svg>
  )
}

// Info illustration - Team collaboration
function InfoIllustration() {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Ground shadow */}
      <ellipse cx="250" cy="370" rx="200" ry="25" fill="#E5E7EB" opacity="0.5" />

      {/* Background desk/workspace */}
      <g className="animate-fade-in">
        <rect x="100" y="250" width="300" height="120" rx="8" fill="#F3F4F6" />
        <rect x="100" y="250" width="300" height="8" fill="#E5E7EB" />

        {/* Monitor screens */}
        <rect x="150" y="180" width="80" height="55" rx="4" fill="#6BBE4A" opacity="0.1" />
        <rect x="155" y="185" width="70" height="40" rx="2" fill="white" />
        <rect x="165" y="195" width="50" height="4" rx="2" fill="#E5E7EB" />
        <rect x="165" y="205" width="35" height="4" rx="2" fill="#9B8AFB" opacity="0.5" />
        <rect x="165" y="215" width="45" height="4" rx="2" fill="#E5E7EB" />
        <rect x="180" y="235" width="20" height="15" fill="#9CA3AF" />

        <rect x="270" y="180" width="80" height="55" rx="4" fill="#9B8AFB" opacity="0.1" />
        <rect x="275" y="185" width="70" height="40" rx="2" fill="white" />
        <rect x="285" y="195" width="50" height="4" rx="2" fill="#E5E7EB" />
        <rect x="285" y="205" width="40" height="4" rx="2" fill="#6BBE4A" opacity="0.5" />
        <rect x="300" y="235" width="20" height="15" fill="#9CA3AF" />
      </g>

      {/* Chat bubbles */}
      <g className="animate-float" style={{ animationDelay: '0.3s' }}>
        <rect x="60" y="100" width="60" height="35" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="2" />
        <rect x="70" y="110" width="40" height="4" rx="2" fill="#E5E7EB" />
        <rect x="70" y="120" width="30" height="4" rx="2" fill="#6BBE4A" opacity="0.5" />
        <polygon points="85,135 95,135 90,145" fill="white" stroke="#E5E7EB" strokeWidth="2" />
      </g>

      <g className="animate-float" style={{ animationDelay: '0.6s' }}>
        <rect x="380" y="80" width="60" height="35" rx="8" fill="#9B8AFB" opacity="0.2" />
        <rect x="390" y="90" width="40" height="4" rx="2" fill="#9B8AFB" opacity="0.6" />
        <rect x="390" y="100" width="30" height="4" rx="2" fill="#9B8AFB" opacity="0.4" />
      </g>

      {/* Person 1 - Woman at desk */}
      <g className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
        <path d="M170 340 C170 300 155 280 155 260" stroke="#9B8AFB" strokeWidth="30" strokeLinecap="round" fill="none" />
        <circle cx="155" cy="215" r="25" fill="#F5D0C5" />
        <path d="M130 205 Q135 180 155 175 Q175 180 180 205" fill="#1F2937" />
        <ellipse cx="130" cy="215" rx="6" ry="12" fill="#1F2937" />
        <circle cx="147" cy="212" r="2" fill="#1F2937" />
        <circle cx="163" cy="212" r="2" fill="#1F2937" />
        <path d="M150 225 Q155 230 160 225" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Waving arm */}
        <path d="M180 260 L210 220" stroke="#F5D0C5" strokeWidth="12" strokeLinecap="round" />
        <circle cx="215" cy="215" r="7" fill="#F5D0C5" />
      </g>

      {/* Person 2 - Person with laptop */}
      <g className="animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
        <path d="M330 340 C330 300 345 280 345 260" stroke="#6BBE4A" strokeWidth="30" strokeLinecap="round" fill="none" />
        <circle cx="345" cy="215" r="25" fill="#F5D0C5" />
        <path d="M320 205 Q330 175 345 175 Q360 175 370 205" fill="#1F2937" />
        <circle cx="337" cy="212" r="2" fill="#1F2937" />
        <circle cx="353" cy="212" r="2" fill="#1F2937" />
        <path d="M340 225 Q345 230 350 225" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Arms on desk */}
        <path d="M310 270 L280 260" stroke="#F5D0C5" strokeWidth="12" strokeLinecap="round" />
        <path d="M380 270 L400 250" stroke="#F5D0C5" strokeWidth="12" strokeLinecap="round" />
      </g>

      {/* Floating elements */}
      <circle cx="50" cy="180" r="6" fill="#6BBE4A" opacity="0.4" className="animate-pulse" />
      <circle cx="450" cy="250" r="8" fill="#9B8AFB" opacity="0.4" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
      <rect x="430" y="150" width="10" height="10" rx="2" fill="#6BBE4A" opacity="0.3" transform="rotate(20 435 155)" />
    </svg>
  )
}

// Goals illustration - Person flying with creative elements
function GoalsIllustration() {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Ground shadow */}
      <ellipse cx="250" cy="370" rx="150" ry="20" fill="#E5E7EB" opacity="0.4" />

      {/* Floating creative elements */}
      <g className="animate-float" style={{ animationDelay: '0s' }}>
        {/* Image/photo icon */}
        <rect x="80" y="80" width="50" height="40" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="2" />
        <path d="M90 105 L100 95 L110 105 L120 90" stroke="#6BBE4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="115" cy="95" r="5" fill="#9B8AFB" opacity="0.5" />
      </g>

      <g className="animate-float" style={{ animationDelay: '0.5s' }}>
        {/* Document icon */}
        <rect x="400" y="150" width="45" height="55" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="2" />
        <rect x="410" y="165" width="25" height="3" rx="1" fill="#E5E7EB" />
        <rect x="410" y="175" width="20" height="3" rx="1" fill="#9B8AFB" opacity="0.5" />
        <rect x="410" y="185" width="25" height="3" rx="1" fill="#E5E7EB" />
      </g>

      <g className="animate-float" style={{ animationDelay: '1s' }}>
        {/* Envelope */}
        <rect x="60" y="250" width="45" height="30" rx="4" fill="#9B8AFB" opacity="0.2" />
        <path d="M60 255 L82.5 270 L105 255" stroke="#9B8AFB" strokeWidth="2" fill="none" />
      </g>

      {/* Circular rings around person */}
      <g className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <ellipse cx="250" cy="230" rx="120" ry="50" stroke="#6BBE4A" strokeWidth="3" fill="none" opacity="0.2" />
        <ellipse cx="250" cy="230" rx="90" ry="35" stroke="#6BBE4A" strokeWidth="2" fill="none" opacity="0.3" />
      </g>

      {/* Main person - floating/flying */}
      <g className="animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
        {/* Body in motion */}
        <path d="M250 250 C230 250 220 280 220 300" stroke="#9B8AFB" strokeWidth="35" strokeLinecap="round" fill="none" />
        {/* Pants */}
        <path d="M235 295 L200 350" stroke="#3D5A3D" strokeWidth="22" strokeLinecap="round" />
        <path d="M240 295 L260 355" stroke="#3D5A3D" strokeWidth="22" strokeLinecap="round" />
        {/* Shoes */}
        <ellipse cx="195" cy="355" rx="18" ry="10" fill="#1F2937" />
        <ellipse cx="265" cy="360" rx="18" ry="10" fill="#1F2937" />
        {/* Head */}
        <circle cx="260" cy="195" r="30" fill="#F5D0C5" />
        {/* Hair */}
        <path d="M230 185 Q240 155 260 150 Q285 155 295 190" fill="#1F2937" />
        <ellipse cx="225" cy="200" rx="8" ry="15" fill="#1F2937" />
        {/* Face */}
        <circle cx="250" cy="192" r="2" fill="#1F2937" />
        <circle cx="270" cy="192" r="2" fill="#1F2937" />
        <path d="M255 208 Q260 213 268 208" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Arms spread out */}
        <path d="M285 230 L340 190" stroke="#F5D0C5" strokeWidth="14" strokeLinecap="round" />
        <circle cx="345" cy="185" r="8" fill="#F5D0C5" />
        <path d="M220 250 L160 220" stroke="#F5D0C5" strokeWidth="14" strokeLinecap="round" />
        {/* Laptop in hand */}
        <rect x="145" y="205" width="35" height="25" rx="3" fill="#9CA3AF" />
        <rect x="148" y="208" width="29" height="18" rx="2" fill="#E5E7EB" />
      </g>

      {/* Floating small elements */}
      <g>
        <circle cx="380" cy="100" r="10" fill="#6BBE4A" opacity="0.3" className="animate-pulse" />
        <circle cx="120" cy="170" r="6" fill="#9B8AFB" opacity="0.4" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        <rect x="370" cy="280" width="15" height="15" rx="3" fill="#6BBE4A" opacity="0.2" transform="rotate(15 377 287)" />
        <path d="M430 230 L440 215 L450 230" stroke="#9B8AFB" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      </g>
    </svg>
  )
}

// Preferences illustration - Two people with puzzle pieces
function PreferencesIllustration() {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Ground shadow */}
      <ellipse cx="250" cy="370" rx="180" ry="25" fill="#E5E7EB" opacity="0.5" />

      {/* Large puzzle piece */}
      <g className="animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
        <path d="M200 150
                 L200 180
                 C180 180 180 210 200 210
                 L200 260
                 L250 260
                 C250 280 280 280 280 260
                 L330 260
                 L330 210
                 C350 210 350 180 330 180
                 L330 150
                 L280 150
                 C280 130 250 130 250 150
                 Z"
              fill="#3D5A3D" />
      </g>

      {/* Second puzzle piece being placed */}
      <g className="animate-float" style={{ animationDelay: '0.3s' }}>
        <path d="M280 100
                 L280 130
                 C260 130 260 160 280 160
                 L280 200
                 L330 200
                 C330 220 360 220 360 200
                 L410 200
                 L410 160
                 C430 160 430 130 410 130
                 L410 100
                 L360 100
                 C360 80 330 80 330 100
                 Z"
              fill="#6BBE4A" opacity="0.7" />
      </g>

      {/* Small floating puzzle */}
      <g className="animate-float" style={{ animationDelay: '0.8s' }}>
        <path d="M90 200 L90 215 C80 215 80 230 90 230 L90 250 L110 250 C110 260 125 260 125 250 L145 250 L145 230 C155 230 155 215 145 215 L145 200 L125 200 C125 190 110 190 110 200 Z"
              fill="#9B8AFB" opacity="0.5" />
      </g>

      {/* Person 1 - Woman holding puzzle */}
      <g className="animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
        {/* Body */}
        <path d="M160 340 C160 300 150 280 150 250" stroke="#1F2937" strokeWidth="35" strokeLinecap="round" fill="none" />
        {/* Pants */}
        <path d="M150 320 L130 370" stroke="#1F2937" strokeWidth="24" strokeLinecap="round" />
        <path d="M155 320 L175 370" stroke="#1F2937" strokeWidth="24" strokeLinecap="round" />
        {/* Shoes */}
        <ellipse cx="125" cy="375" rx="18" ry="8" fill="#1F2937" />
        <ellipse cx="180" cy="375" rx="18" ry="8" fill="#1F2937" />
        {/* Head */}
        <circle cx="150" cy="200" r="28" fill="#F5D0C5" />
        {/* Hair */}
        <path d="M122 190 Q130 160 150 155 Q170 160 178 190" fill="#1F2937" />
        <path d="M122 190 L120 220" stroke="#1F2937" strokeWidth="10" strokeLinecap="round" />
        <path d="M178 190 L182 210" stroke="#1F2937" strokeWidth="10" strokeLinecap="round" />
        {/* Face */}
        <circle cx="140" cy="197" r="2" fill="#1F2937" />
        <circle cx="160" cy="197" r="2" fill="#1F2937" />
        <path d="M145 212 Q150 217 155 212" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Arms holding puzzle */}
        <path d="M175 255 L200 200" stroke="#F5D0C5" strokeWidth="14" strokeLinecap="round" />
        <path d="M125 260 L110 230" stroke="#F5D0C5" strokeWidth="14" strokeLinecap="round" />
      </g>

      {/* Person 2 - Woman reaching */}
      <g className="animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
        {/* Body */}
        <path d="M360 340 C360 300 370 280 370 250" stroke="#6BBE4A" strokeWidth="35" strokeLinecap="round" fill="none" />
        {/* Pants */}
        <path d="M365 320 L345 370" stroke="#1F2937" strokeWidth="24" strokeLinecap="round" />
        <path d="M375 320 L400 370" stroke="#1F2937" strokeWidth="24" strokeLinecap="round" />
        {/* Shoes */}
        <ellipse cx="340" cy="375" rx="18" ry="8" fill="#1F2937" />
        <ellipse cx="405" cy="375" rx="18" ry="8" fill="#1F2937" />
        {/* Head */}
        <circle cx="370" cy="200" r="28" fill="#F5D0C5" />
        {/* Hair - bun */}
        <path d="M342 190 Q350 160 370 155 Q390 160 398 190" fill="#1F2937" />
        <circle cx="370" cy="155" r="12" fill="#1F2937" />
        {/* Face */}
        <circle cx="360" cy="197" r="2" fill="#1F2937" />
        <circle cx="380" cy="197" r="2" fill="#1F2937" />
        <path d="M365 212 Q370 217 375 212" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Arm on hip */}
        <path d="M340 255 L310 290" stroke="#F5D0C5" strokeWidth="14" strokeLinecap="round" />
        <path d="M310 290 L335 320" stroke="#F5D0C5" strokeWidth="14" strokeLinecap="round" />
      </g>

      {/* Decorative dots */}
      <circle cx="70" cy="120" r="8" fill="#6BBE4A" opacity="0.4" className="animate-pulse" />
      <circle cx="440" cy="280" r="6" fill="#9B8AFB" opacity="0.5" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
    </svg>
  )
}

// Awareness illustration - Person with megaphone
function AwarenessIllustration() {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Ground shadow */}
      <ellipse cx="280" cy="370" rx="150" ry="20" fill="#E5E7EB" opacity="0.5" />

      {/* Large megaphone */}
      <g className="animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
        <ellipse cx="180" cy="200" rx="100" ry="80" fill="#6BBE4A" opacity="0.15" />
        <path d="M130 180 L80 120 L80 260 L130 200 Z" fill="#E5E7EB" />
        <ellipse cx="130" cy="190" rx="25" ry="40" fill="#1F2937" />
        <ellipse cx="130" cy="190" rx="15" ry="25" fill="#3D5A3D" />
      </g>

      {/* Sound waves */}
      <g className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <path d="M60 170 Q40 190 60 210" stroke="#6BBE4A" strokeWidth="3" fill="none" opacity="0.5" strokeDasharray="5,5" />
        <path d="M45 155 Q15 190 45 225" stroke="#6BBE4A" strokeWidth="3" fill="none" opacity="0.3" strokeDasharray="5,5" />
      </g>

      {/* Paper planes flying */}
      <g className="animate-float" style={{ animationDelay: '0s' }}>
        <path d="M380 80 L420 100 L390 105 Z" fill="#6BBE4A" />
        <path d="M390 105 L385 120 L420 100 Z" fill="#3D5A3D" />
        <path d="M420 100 L380 80" stroke="#6BBE4A" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
      </g>

      <g className="animate-float" style={{ animationDelay: '0.6s' }}>
        <path d="M100 80 L130 70 L115 90 Z" fill="#9B8AFB" opacity="0.7" />
        <path d="M115 90 L120 105 L130 70 Z" fill="#9B8AFB" opacity="0.5" />
      </g>

      {/* Floating envelope */}
      <g className="animate-float" style={{ animationDelay: '1s' }}>
        <rect x="400" y="200" width="50" height="35" rx="4" fill="#9B8AFB" opacity="0.3" />
        <path d="M400 205 L425 222 L450 205" stroke="#9B8AFB" strokeWidth="2" fill="none" />
      </g>

      {/* Main person - with phone */}
      <g className="animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
        {/* Body */}
        <path d="M300 340 C300 290 320 260 320 230" stroke="#9B8AFB" strokeWidth="40" strokeLinecap="round" fill="none" />
        {/* Pants */}
        <path d="M310 310 L280 370" stroke="#3D5A3D" strokeWidth="26" strokeLinecap="round" />
        <path d="M320 310 L355 365" stroke="#3D5A3D" strokeWidth="26" strokeLinecap="round" />
        {/* Shoes */}
        <ellipse cx="275" cy="375" rx="20" ry="10" fill="#1F2937" />
        <ellipse cx="360" cy="370" rx="20" ry="10" fill="#1F2937" />
        {/* Head */}
        <circle cx="330" cy="175" r="32" fill="#F5D0C5" />
        {/* Hair */}
        <path d="M298 165 Q310 130 330 125 Q360 130 370 170" fill="#1F2937" />
        {/* Face */}
        <circle cx="318" cy="172" r="3" fill="#1F2937" />
        <circle cx="342" cy="172" r="3" fill="#1F2937" />
        <path d="M323 190 Q330 196 340 190" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Arm with phone */}
        <path d="M355 240 L390 200" stroke="#F5D0C5" strokeWidth="16" strokeLinecap="round" />
        <rect x="385" y="175" width="25" height="40" rx="4" fill="#1F2937" />
        <rect x="388" y="180" width="19" height="30" rx="2" fill="#6BBE4A" opacity="0.3" />
        {/* Other arm */}
        <path d="M285 240 L240 280" stroke="#F5D0C5" strokeWidth="16" strokeLinecap="round" />
        <circle cx="235" cy="285" r="10" fill="#F5D0C5" />
      </g>

      {/* Decorative elements */}
      <circle cx="450" cy="300" r="8" fill="#6BBE4A" opacity="0.4" className="animate-pulse" />
      <circle cx="60" cy="300" r="6" fill="#9B8AFB" opacity="0.4" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
    </svg>
  )
}

// Invite illustration - Team cards
function InviteIllustration() {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background circles */}
      <circle cx="100" cy="100" r="60" fill="#E5E7EB" opacity="0.3" />
      <circle cx="420" cy="350" r="80" fill="#E5E7EB" opacity="0.3" />

      {/* Team member cards */}
      {/* Card 1 - Editor */}
      <g className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <rect x="120" y="100" width="280" height="70" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="2" />
        <circle cx="165" cy="135" r="22" fill="#6BBE4A" />
        <rect x="200" y="120" width="100" height="8" rx="4" fill="#6BBE4A" opacity="0.6" />
        <rect x="200" y="135" width="140" height="6" rx="3" fill="#E5E7EB" />
        <rect x="200" y="148" width="80" height="6" rx="3" fill="#E5E7EB" />
        <text x="360" y="140" fill="#6B7280" fontSize="14" fontWeight="500">Editor</text>
      </g>

      {/* Card 2 - Admin */}
      <g className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <rect x="120" y="185" width="280" height="70" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="2" />
        <circle cx="165" cy="220" r="22" fill="#9B8AFB" />
        <rect x="200" y="205" width="80" height="8" rx="4" fill="#9B8AFB" opacity="0.6" />
        <rect x="200" y="220" width="130" height="6" rx="3" fill="#E5E7EB" />
        <rect x="200" y="233" width="100" height="6" rx="3" fill="#E5E7EB" />
        <text x="360" y="225" fill="#6B7280" fontSize="14" fontWeight="500">Admin</text>
      </g>

      {/* Card 3 - Editor */}
      <g className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <rect x="120" y="270" width="280" height="70" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="2" />
        <circle cx="165" cy="305" r="22" fill="#6BBE4A" opacity="0.7" />
        <rect x="200" y="290" width="90" height="8" rx="4" fill="#6BBE4A" opacity="0.6" />
        <rect x="200" y="305" width="120" height="6" rx="3" fill="#E5E7EB" />
        <rect x="200" y="318" width="70" height="6" rx="3" fill="#E5E7EB" />
        <text x="360" y="310" fill="#6B7280" fontSize="14" fontWeight="500">Editor</text>
      </g>

      {/* Floating decorative circles */}
      <circle cx="80" cy="200" r="40" fill="#E5E7EB" opacity="0.5" className="animate-float" />
      <circle cx="440" cy="150" r="30" fill="#E5E7EB" opacity="0.4" className="animate-float" style={{ animationDelay: '0.5s' }} />

      {/* Small dots */}
      <circle cx="60" cy="300" r="6" fill="#6BBE4A" opacity="0.5" className="animate-pulse" />
      <circle cx="450" cy="250" r="8" fill="#9B8AFB" opacity="0.4" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
    </svg>
  )
}

// Verify illustration - Person relaxing with email sent
function VerifyIllustration() {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Ground shadow */}
      <ellipse cx="280" cy="370" rx="150" ry="20" fill="#E5E7EB" opacity="0.5" />

      {/* Flying paper planes */}
      <g className="animate-float" style={{ animationDelay: '0s' }}>
        <path d="M350 60 L400 90 L360 100 Z" fill="#6BBE4A" />
        <path d="M360 100 L355 125 L400 90 Z" fill="#3D5A3D" />
        {/* Trail */}
        <path d="M350 60 C300 80 280 100 260 120" stroke="#6BBE4A" strokeWidth="2" strokeDasharray="6,6" fill="none" opacity="0.4" />
      </g>

      <g className="animate-float" style={{ animationDelay: '0.8s' }}>
        <path d="M420 130 L450 145 L425 155 Z" fill="#6BBE4A" opacity="0.6" />
        <path d="M425 155 L420 170 L450 145 Z" fill="#3D5A3D" opacity="0.6" />
      </g>

      {/* Envelope icon */}
      <g className="animate-float" style={{ animationDelay: '0.4s' }}>
        <rect x="80" y="100" width="70" height="50" rx="6" fill="#F5D0C5" />
        <path d="M80 110 L115 135 L150 110" stroke="#E8B4A8" strokeWidth="3" fill="none" />
        <rect x="95" y="85" width="40" height="25" rx="3" fill="#EF4444" opacity="0.8" />
        <path d="M105 95 L110 100 L125 88" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Bean bag / chair */}
      <g className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <ellipse cx="300" cy="320" rx="100" ry="60" fill="#6BBE4A" />
        <ellipse cx="280" cy="290" rx="80" ry="50" fill="#6BBE4A" />
        <ellipse cx="330" cy="260" rx="50" ry="40" fill="#6BBE4A" />
      </g>

      {/* Person relaxing */}
      <g className="animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
        {/* Legs */}
        <path d="M220 310 L180 370" stroke="#E5E7EB" strokeWidth="28" strokeLinecap="round" />
        <path d="M250 320 L300 380" stroke="#E5E7EB" strokeWidth="28" strokeLinecap="round" />
        {/* Shoes */}
        <ellipse cx="175" cy="375" rx="22" ry="12" fill="#3D5A3D" />
        <ellipse cx="305" cy="385" rx="22" ry="12" fill="#3D5A3D" />
        {/* Body */}
        <path d="M270 280 C250 280 240 310 240 330" stroke="#9B8AFB" strokeWidth="35" strokeLinecap="round" fill="none" />
        {/* Head */}
        <circle cx="290" cy="230" r="32" fill="#F5D0C5" />
        {/* Hair */}
        <path d="M258 220 Q270 185 290 180 Q320 185 335 230" fill="#1F2937" />
        {/* Face - relaxed/happy */}
        <path d="M275 225 Q278 228 281 225" stroke="#1F2937" strokeWidth="2" fill="none" />
        <path d="M298 225 Q301 228 304 225" stroke="#1F2937" strokeWidth="2" fill="none" />
        <path d="M282 248 Q290 256 300 248" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Arms with tablet */}
        <path d="M305 270 L340 240" stroke="#F5D0C5" strokeWidth="14" strokeLinecap="round" />
        <path d="M235 300 L200 270" stroke="#F5D0C5" strokeWidth="14" strokeLinecap="round" />
        {/* Tablet/laptop */}
        <rect x="330" y="215" width="50" height="35" rx="4" fill="#E5E7EB" />
        <rect x="335" y="220" width="40" height="24" rx="2" fill="white" />
        <circle cx="355" cy="232" r="8" fill="#6BBE4A" opacity="0.3" />
      </g>

      {/* Decorative elements */}
      <circle cx="450" cy="200" r="8" fill="#9B8AFB" opacity="0.5" className="animate-pulse" />
      <circle cx="60" cy="250" r="6" fill="#6BBE4A" opacity="0.4" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
      <rect x="420" y="300" width="12" height="12" rx="3" fill="#6BBE4A" opacity="0.3" transform="rotate(20 426 306)" />
    </svg>
  )
}

// Success illustration
function SuccessIllustration() {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Celebration background */}
      <circle cx="250" cy="200" r="120" fill="#6BBE4A" opacity="0.1" />
      <circle cx="250" cy="200" r="80" fill="#6BBE4A" opacity="0.15" />

      {/* Large checkmark */}
      <g className="animate-bounce-in">
        <circle cx="250" cy="180" r="60" fill="#6BBE4A" />
        <path d="M220 180 L240 200 L280 155" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Confetti */}
      <g className="animate-float">
        <rect x="120" y="100" width="15" height="15" rx="2" fill="#9B8AFB" opacity="0.7" transform="rotate(15 127 107)" />
        <rect x="350" y="120" width="12" height="12" rx="2" fill="#6BBE4A" opacity="0.6" transform="rotate(-20 356 126)" />
        <circle cx="100" cy="200" r="8" fill="#6BBE4A" opacity="0.5" />
        <circle cx="400" cy="180" r="10" fill="#9B8AFB" opacity="0.4" />
        <rect x="380" y="260" width="10" height="10" rx="2" fill="#6BBE4A" opacity="0.5" transform="rotate(30 385 265)" />
        <rect x="130" y="280" width="12" height="12" rx="2" fill="#9B8AFB" opacity="0.6" transform="rotate(-15 136 286)" />
      </g>

      {/* Stars */}
      <g className="animate-pulse">
        <path d="M150 150 L155 160 L165 160 L157 167 L160 177 L150 170 L140 177 L143 167 L135 160 L145 160 Z" fill="#FFD700" opacity="0.8" />
        <path d="M340 90 L343 97 L350 97 L344 102 L346 109 L340 104 L334 109 L336 102 L330 97 L337 97 Z" fill="#FFD700" opacity="0.7" />
        <path d="M420 250 L423 257 L430 257 L424 262 L426 269 L420 264 L414 269 L416 262 L410 257 L417 257 Z" fill="#FFD700" opacity="0.6" />
      </g>

      {/* Ground */}
      <ellipse cx="250" cy="350" rx="150" ry="20" fill="#E5E7EB" opacity="0.5" />
    </svg>
  )
}

// Default illustration
function DefaultIllustration() {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Ground shadow */}
      <ellipse cx="250" cy="350" rx="150" ry="20" fill="#E5E7EB" opacity="0.5" />

      {/* Abstract shapes */}
      <g className="animate-float">
        <circle cx="200" cy="150" r="50" fill="#6BBE4A" opacity="0.2" />
        <circle cx="300" cy="200" r="70" fill="#9B8AFB" opacity="0.15" />
        <rect x="150" y="220" width="80" height="80" rx="16" fill="#6BBE4A" opacity="0.15" transform="rotate(15 190 260)" />
      </g>

      {/* Decorative elements */}
      <circle cx="100" cy="120" r="8" fill="#6BBE4A" opacity="0.5" className="animate-pulse" />
      <circle cx="400" cy="100" r="6" fill="#9B8AFB" opacity="0.5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
      <circle cx="380" cy="280" r="10" fill="#6BBE4A" opacity="0.4" className="animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Lines */}
      <path d="M120 200 Q180 180 200 220" stroke="#E5E7EB" strokeWidth="3" fill="none" />
      <path d="M300 150 Q350 170 380 140" stroke="#E5E7EB" strokeWidth="3" fill="none" />
    </svg>
  )
}
