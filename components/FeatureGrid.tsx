"use client"

import { Bot, Zap, Shield, TrendingUp, Globe, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Bot,
    title: "AI-Powered Trading",
    description: "Advanced machine learning algorithms analyze market patterns and execute trades with precision.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast Execution",
    description: "Execute trades in milliseconds with our high-frequency trading infrastructure.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your funds are protected with military-grade encryption and multi-layer security protocols.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "Smart Analytics",
    description: "Real-time market analysis and predictive insights to maximize your trading potential.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Globe,
    title: "Global Markets",
    description: "Access to worldwide cryptocurrency and forex markets from a single platform.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Round-the-clock market monitoring and automated trading even while you sleep.",
    color: "from-teal-500 to-cyan-500",
  },
]

export default function FeatureGrid() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Smart Trading
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the future of trading with our cutting-edge AI technology and comprehensive feature set.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-blue-500/50 transition-all duration-300 group hover:scale-105"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
