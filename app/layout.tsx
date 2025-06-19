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
        {/* Professional background system */}
        <div className="site-background">
          <div className="grid-pattern" />
          <div className="gradient-orbs">
            <div className="gradient-orb orb-1" />
            <div className="gradient-orb orb-2" />
            <div className="gradient-orb orb-3" />
          </div>
        </div>

        {/* Main content wrapper */}
        <div className="main-content">{children}</div>
      </body>
    </html>
  )
}
