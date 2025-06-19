"use client"

import type { ReactNode } from "react"

interface FuturisticWrapperProps {
  children: ReactNode
  className?: string
}

export function FuturisticWrapper({ children, className = "" }: FuturisticWrapperProps) {
  return <div className={`futuristic-card rounded-xl p-6 ${className}`}>{children}</div>
}

export function FuturisticButton({ children, className = "", ...props }: any) {
  return (
    <button
      className={`futuristic-button px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function GlowText({
  children,
  className = "",
  variant = "blue",
}: { children: ReactNode; className?: string; variant?: "blue" | "cyan" }) {
  const glowClass = variant === "cyan" ? "text-glow-cyan" : "text-glow"
  return <span className={`${glowClass} ${className}`}>{children}</span>
}
