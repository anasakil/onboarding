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
          background: 'linear-gradient(135deg, #F6B73A 0%, #E9A30E 100%)',
          boxShadow: '0 4px 14px -4px rgba(246, 183, 58, 0.4)'
        }}
      >
        {/* Logo Image */}
        <img
          src="/logo-merman.png"
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Logo Text */}
      {showFull && (
        <div className="flex items-baseline gap-1">
          <span
            className={cn(
              "font-bold tracking-tight",
              textSizes[size],
              variant === "light" ? "text-white" : "text-white"
            )}
          >
            IntelligentB2B
          </span>
          <span
            className={cn(
              "font-semibold px-1.5 py-0.5 rounded-md text-[11px]",
              variant === "light"
                ? "bg-white/20 text-white"
                : "bg-[#F6B73A]/20 text-[#F6B73A]"
            )}
          >
            Onboarding
          </span>
        </div>
      )}
    </div>
  )
}
