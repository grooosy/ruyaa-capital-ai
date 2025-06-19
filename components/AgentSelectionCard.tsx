"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Zap, TrendingUp, Shield, Star } from "lucide-react"

interface Agent {
  id: string
  name: string
  description: string
  specialty: string
  performance: number
  risk: "Low" | "Medium" | "High"
  features: string[]
  price: string
  popular?: boolean
}

interface AgentSelectionCardProps {
  agent: Agent
  onSelect: (agentId: string) => void
  selected?: boolean
}

export default function AgentSelectionCard({ agent, onSelect, selected = false }: AgentSelectionCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-400 bg-green-400/10"
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10"
      case "High":
        return "text-red-400 bg-red-400/10"
      default:
        return "text-gray-400 bg-gray-400/10"
    }
  }

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty.toLowerCase()) {
      case "arbitrage":
        return <TrendingUp className="h-5 w-5" />
      case "scalping":
        return <Zap className="h-5 w-5" />
      case "conservative":
        return <Shield className="h-5 w-5" />
      default:
        return <Bot className="h-5 w-5" />
    }
  }

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 cursor-pointer group
        ${
          selected
            ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50 shadow-lg shadow-blue-500/25"
            : "bg-black/40 border-gray-800 hover:border-gray-600"
        }
        ${isHovered ? "transform scale-105 shadow-2xl" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(agent.id)}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Popular Badge */}
      {agent.popular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold">
            <Star className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}

      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
              {getSpecialtyIcon(agent.specialty)}
            </div>
            <div>
              <CardTitle className="text-white text-lg">{agent.name}</CardTitle>
              <CardDescription className="text-gray-400">{agent.specialty}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        <p className="text-gray-300 text-sm leading-relaxed">{agent.description}</p>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-gray-400">Performance</p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${agent.performance}%` }}
                />
              </div>
              <span className="text-sm text-green-400 font-medium">{agent.performance}%</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-gray-400">Risk Level</p>
            <Badge className={getRiskColor(agent.risk)}>{agent.risk}</Badge>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <p className="text-xs text-gray-400 font-medium">Key Features</p>
          <div className="flex flex-wrap gap-1">
            {agent.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div>
            <p className="text-xs text-gray-400">Starting at</p>
            <p className="text-lg font-bold text-white">{agent.price}</p>
          </div>

          <Button
            className={`transition-all duration-300 ${
              selected
                ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
            size="sm"
          >
            {selected ? "Selected" : "Select Agent"}
          </Button>
        </div>
      </CardContent>

      {/* Glow Effect */}
      {selected && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none" />
      )}
    </Card>
  )
}
