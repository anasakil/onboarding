import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "light"
  showFull?: boolean
}

export function Logo({ className, size = "md", variant = "default", showFull = true }: LogoProps) {
  const iconSizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  }

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Logo Icon */}
      <div
        className={cn(
          "rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg",
          iconSizes[size]
        )}
        style={{
          background: 'linear-gradient(135deg, #6BBE4A 0%, #5AA83D 100%)',
          boxShadow: '0 4px 14px -4px rgba(107, 190, 74, 0.4)'
        }}
      >
        {/* Shine effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)'
          }}
        />

        {/* Icon SVG */}
        <svg
          viewBox="0 0 24 24"
          className="w-[55%] h-[55%] relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L12 20M12 4L6 10M12 4L18 10"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showFull && (
        <div className="flex items-baseline gap-1">
          <span
            className={cn(
              "font-bold tracking-tight",
              textSizes[size],
              variant === "light" ? "text-white" : "text-gray-900"
            )}
          >
            Onboarding
          </span>
          <span
            className={cn(
              "font-semibold px-1.5 py-0.5 rounded-md text-[11px]",
              variant === "light"
                ? "bg-white/20 text-white"
                : "bg-[#6BBE4A]/10 text-[#6BBE4A]"
            )}
          >
            B2B
          </span>
        </div>
      )}
    </div>
  )
}
