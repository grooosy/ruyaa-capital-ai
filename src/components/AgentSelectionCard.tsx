"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface AgentSelectionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onSelect: () => void
  isSelected?: boolean
}

const AgentSelectionCard = ({ title, description, icon, onSelect, isSelected = false }: AgentSelectionCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer transition-all duration-300 ${isSelected ? "ring-2 ring-green" : ""}`}
      onClick={onSelect}
    >
      <Card className={`h-full ${isSelected ? "border-green bg-green/5" : "border-gray-700 hover:border-green/50"}`}>
        <CardContent className="p-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-green/10 border border-green/20 rounded-full flex items-center justify-center">
            {icon}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
          </div>

          <Button
            className={`w-full ${isSelected ? "bg-green" : "bg-gray-700 hover:bg-green"}`}
            onClick={(e) => {
              e.stopPropagation()
              onSelect()
            }}
          >
            {isSelected ? "Selected" : "Select Agent"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AgentSelectionCard
