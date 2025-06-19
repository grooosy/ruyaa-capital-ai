"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const FeatureCTA = () => {
  const features = [
    {
      title: "AI Trading Signals",
      description: "Get real-time MT4/MT5 trading signals powered by advanced AI",
      link: "/agents/mt4mt5",
      color: "from-green/20 to-emerald-500/20",
    },
    {
      title: "Crypto Arbitrage",
      description: "Discover profitable arbitrage opportunities across exchanges",
      link: "/agents/arbitrage",
      color: "from-purple-500/20 to-violet-500/20",
    },
    {
      title: "Trading Academy",
      description: "Master trading with our comprehensive video courses",
      link: "/academy",
      color: "from-gold/20 to-yellow-500/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full group hover:border-green/40 transition-all duration-300">
            <CardContent className="p-6 text-center space-y-4">
              <div
                className={`w-16 h-16 mx-auto bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <Zap className="w-8 h-8 text-green" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>

              <Link to={feature.link}>
                <Button className="w-full bg-green hover:bg-green/90 group">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default FeatureCTA
