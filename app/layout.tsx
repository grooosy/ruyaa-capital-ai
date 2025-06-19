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
        {/* Futuristic background layers */}
        <div className="futuristic-bg" />
        <div className="grid-pattern" />
        <div className="particles">
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
        </div>

        {/* Main content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
