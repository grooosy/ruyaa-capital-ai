"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MarketData {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export default function LiveMarketTicker() {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: "BTC/USD", price: 43250.5, change: 1250.3, changePercent: 2.98 },
    { symbol: "ETH/USD", price: 2650.75, change: -45.2, changePercent: -1.68 },
    { symbol: "XRP/USD", price: 0.6234, change: 0.0123, changePercent: 2.01 },
    { symbol: "ADA/USD", price: 0.4567, change: -0.0089, changePercent: -1.91 },
    { symbol: "SOL/USD", price: 98.45, change: 3.21, changePercent: 3.37 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => ({
          ...item,
          price: item.price + (Math.random() - 0.5) * 10,
          change: (Math.random() - 0.5) * 20,
          changePercent: (Math.random() - 0.5) * 5,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black/50 backdrop-blur-sm border-b border-gray-800 py-2 overflow-hidden">
      <div className="animate-scroll flex space-x-8 whitespace-nowrap">
        {[...marketData, ...marketData].map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="flex items-center space-x-2 text-sm">
            <span className="text-gray-300 font-medium">{item.symbol}</span>
            <span className="text-white font-bold">${item.price.toFixed(2)}</span>
            <div className={`flex items-center space-x-1 ${item.change >= 0 ? "text-green-400" : "text-red-400"}`}>
              {item.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span className="font-medium">
                {item.change >= 0 ? "+" : ""}
                {item.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
