"use client"

import type { ReactNode } from "react"

interface BackgroundWrapperProps {
  children: ReactNode
  className?: string
}

export function BackgroundWrapper({ children, className = "" }: BackgroundWrapperProps) {
  return <div className={`relative min-h-screen ${className}`}>{children}</div>
}

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass-card rounded-xl p-6 ${className}`}>{children}</div>
}

export function ContentSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`relative z-10 py-8 ${className}`}>{children}</section>
}
