"use client"

import Lottie from "lottie-react"
import { useEffect, useState } from "react"

interface LoadingAnimationProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
}

const sizes = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32"
}

export function LoadingAnimation({ size = "md", text, className }: LoadingAnimationProps) {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    fetch("/animations/loading.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err))
  }, [])

  return (
    <div className={`flex flex-col items-center justify-center ${className || ""}`}>
      {animationData ? (
        <div className={sizes[size]}>
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ) : (
        <div className={`${sizes[size]} flex items-center justify-center`}>
          <div className="w-8 h-8 border-3 border-gray-200 border-t-[#6BBE4A] rounded-full animate-spin" />
        </div>
      )}
      {text && (
        <p className="mt-3 text-gray-500 text-sm">{text}</p>
      )}
    </div>
  )
}
