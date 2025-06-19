"use client"

import { Brain, Target, BarChart3, Cpu } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const aiFeatures = [
  {
    icon: Brain,
    title: "Neural Networks",
    description: "Deep learning models trained on years of market data to predict price movements.",
    stats: "99.7% Accuracy",
  },
  {
    icon: Target,
    title: "Precision Trading",
    description: "AI algorithms execute trades with surgical precision at optimal entry and exit points.",
    stats: "0.02s Execution",
  },
  {
    icon: BarChart3,
    title: "Market Analysis",
    description: "Real-time analysis of thousands of market indicators and sentiment data.",
    stats: "10,000+ Indicators",
  },
  {
    icon: Cpu,
    title: "Quantum Processing",
    description: "Advanced quantum computing capabilities for complex market calculations.",
    stats: "1M+ Calculations/sec",
  },
]

export default function AIGrid() {
  return (
    <div className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            AI-Powered
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Intelligence
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our advanced AI systems work tirelessly to maximize your trading potential with cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiFeatures.map((feature, index) => (
            <Card
              key={feature.title}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105"
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white group-hover:text-purple-400 transition-colors duration-300">
                  {feature.title}
                </CardTitle>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {feature.stats}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-center">
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
