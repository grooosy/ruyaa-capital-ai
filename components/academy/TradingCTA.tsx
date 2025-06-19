"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, Shield, ArrowRight, DollarSign } from "lucide-react"

export default function TradingCTA() {
  return (
    <Card className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800/50 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.15),transparent_50%)]" />

      <CardContent className="p-8 relative z-10">
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <Badge className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border-green-500/30">
              <TrendingUp className="mr-2 h-4 w-4" />
              Ready to Trade Live
            </Badge>

            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Start Trading with
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                AI Power
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Apply your knowledge with our AI-powered trading platform. Get real-time market analysis, automated
              arbitrage detection, and risk management tools.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Instant Execution</h3>
              <p className="text-gray-400 text-sm">Lightning-fast trade execution with AI optimization</p>
            </div>

            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Risk Protection</h3>
              <p className="text-gray-400 text-sm">Advanced risk management and stop-loss automation</p>
            </div>

            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Profit Optimization</h3>
              <p className="text-gray-400 text-sm">AI-driven strategies to maximize your returns</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 py-6 border-y border-gray-800/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$2.5M+</div>
              <div className="text-sm text-gray-400">Daily Volume</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">15ms</div>
              <div className="text-sm text-gray-400">Avg Latency</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-lg">
              Start Live Trading
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg">
              Try Demo Account
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 mt-6 max-w-lg mx-auto">
            Trading involves risk. Past performance does not guarantee future results. Please trade responsibly and only
            invest what you can afford to lose.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
