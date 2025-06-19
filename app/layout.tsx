import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ruyaa AI Capital Flow - Advanced Trading Intelligence",
  description: "Harness the power of AI for sophisticated capital flow analysis and trading strategies",
  generator: "Ruyaa AI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        {/* Background elements */}
        <div className="grid-background" />
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
        <div className="gradient-orb gradient-orb-3" />

        {/* Main content wrapper */}
        <div className="content-wrapper">{children}</div>
      </body>
    </html>
  )
}
