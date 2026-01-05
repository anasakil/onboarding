"use client"

import { cn } from "@/lib/utils"

interface StepProgressProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function StepProgress({
  currentStep,
  totalSteps,
  className,
}: StepProgressProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Segmented Progress Bars */}
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className="relative h-1.5 flex-1 rounded-full overflow-hidden bg-gray-200"
          >
            <div
              className={cn(
                "absolute inset-0 rounded-full transition-all duration-500 ease-out",
                index < currentStep
                  ? "bg-primary w-full"
                  : index === currentStep
                  ? "bg-primary animate-progress"
                  : "w-0"
              )}
              style={{
                width: index <= currentStep ? '100%' : '0%',
              }}
            />
          </div>
        ))}
      </div>
      {/* Step Counter */}
      <p className="text-sm text-gray-500 font-medium">
        {currentStep + 1} of {totalSteps}
      </p>
    </div>
  )
}
