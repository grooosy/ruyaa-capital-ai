"use client"

import { useState, useEffect } from "react"
import { ArrowRight, TrendingUp, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ArbitrageOpportunity {
  pair: string
  exchange1: string
  exchange2: string
  price1: number
  price2: number
  profit: number
  profitPercent: number
}

export default function CryptoArbitrageSection() {
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([
    {
      pair: "BTC/USDT",
      exchange1: "Binance",
      exchange2: "Coinbase",
      price1: 43250.5,
      price2: 43380.75,
      profit: 130.25,
      profitPercent: 0.3,
    },
    {
      pair: "ETH/USDT",
      exchange1: "Kraken",
      exchange2: "Bitfinex",
      price1: 2650.75,
      price2: 2695.2,
      profit: 44.45,
      profitPercent: 1.68,
    },
    {
      pair: "XRP/USDT",
      exchange1: "Huobi",
      exchange2: "KuCoin",
      price1: 0.6234,
      price2: 0.6289,
      profit: 0.0055,
      profitPercent: 0.88,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setOpportunities((prev) =>
        prev.map((opp) => ({
          ...opp,
          price1: opp.price1 + (Math.random() - 0.5) * 10,
          price2: opp.price2 + (Math.random() - 0.5) * 10,
          profit: Math.random() * 200,
          profitPercent: Math.random() * 3,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Live Arbitrage
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}
              Opportunities
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our AI continuously scans multiple exchanges to identify profitable arbitrage opportunities in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            {opportunities.map((opp, index) => (
              <Card
                key={`${opp.pair}-${index}`}
                className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-green-500/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-lg font-bold text-white">{opp.pair}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-lg">+{opp.profitPercent.toFixed(2)}%</div>
                      <div className="text-gray-400 text-sm">${opp.profit.toFixed(2)} profit</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-center">
                      <div className="text-gray-400">{opp.exchange1}</div>
                      <div className="text-white font-medium">${opp.price1.toFixed(2)}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-400" />
                    <div className="text-center">
                      <div className="text-gray-400">{opp.exchange2}</div>
                      <div className="text-white font-medium">${opp.price2.toFixed(2)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Zap className="w-6 h-6 text-green-400" />
                <span>Automated Arbitrage</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Active Opportunities</span>
                  <span className="text-white font-bold">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Average Profit</span>
                  <span className="text-green-400 font-bold">1.24%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Execution Speed</span>
                  <span className="text-blue-400 font-bold">0.02s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-purple-400 font-bold">99.7%</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                Start Arbitrage Trading
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
