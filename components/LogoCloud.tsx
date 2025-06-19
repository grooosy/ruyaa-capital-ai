"use client"

import Image from "next/image"

const logos = [
  { name: "Bitcoin", src: "/logos/btc-official.svg" },
  { name: "Ethereum", src: "/logos/eth-official.svg" },
  { name: "USDT", src: "/logos/usdt-official.svg" },
  { name: "XRP", src: "/logos/xrp-official.svg" },
  { name: "MT4/MT5", src: "/logos/mt4mt5.svg" },
]

export default function LogoCloud() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-wider">Supported Platforms & Assets</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div
              key={logo.name}
              className="flex items-center justify-center p-4 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={logo.name}
                width={48}
                height={48}
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
