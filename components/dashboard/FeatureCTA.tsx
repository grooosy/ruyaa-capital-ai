"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Shield, TrendingUp, Bot, Star, Sparkles } from "lucide-react"

interface FeatureCTAProps {
  feature?: {
    title: string
    description: string
    benefits: string[]
    ctaText: string
    ctaAction: () => void
    isNew?: boolean
    isPremium?: boolean
  }
}

export default function FeatureCTA({ feature }: FeatureCTAProps) {
  const defaultFeature = {
    title: "AI-Powered Portfolio Optimization",
    description:
      "Unlock advanced AI algorithms that automatically optimize your trading portfolio for maximum returns with minimal risk.",
    benefits: [
      "Automated risk management",
      "Real-time market analysis",
      "Personalized trading strategies",
      "24/7 portfolio monitoring",
    ],
    ctaText: "Upgrade to Pro",
    ctaAction: () => console.log("Upgrade clicked"),
    isNew: true,
    isPremium: true,
  }

  const featureData = feature || defaultFeature

  return (
    <Card className="bg-gradient-to-br from-black/60 via-gray-900/40 to-black/60 backdrop-blur-xl border-gray-800/50 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden group">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-12 right-8 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
      </div>

      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-500/30">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                {featureData.title}
                {featureData.isNew && (
                  <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    NEW
                  </Badge>
                )}
              </CardTitle>
            </div>
          </div>

          {featureData.isPremium && (
            <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
              <Star className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        {/* Description */}
        <p className="text-gray-300 leading-relaxed">{featureData.description}</p>

        {/* Benefits List */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            Key Benefits
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {featureData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-300">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-black/30 rounded-lg border border-gray-800/50">
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">+127%</div>
            <div className="text-xs text-gray-400">Avg. Returns</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400 flex items-center justify-center gap-1">
              <Shield className="w-4 h-4" />
              94%
            </div>
            <div className="text-xs text-gray-400">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">24/7</div>
            <div className="text-xs text-gray-400">Monitoring</div>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={featureData.ctaAction}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 group/btn relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            {featureData.ctaText}
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </div>
        </Button>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-xs text-gray-400">Join 10,000+ traders already using AI optimization</p>
        </div>
      </CardContent>
    </Card>
  )
}
