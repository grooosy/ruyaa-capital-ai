"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Award, Clock } from "lucide-react"
import { motion } from "framer-motion"

const AIStatsCard = () => {
  const stats = [
    {
      icon: <Users className="w-5 h-5" />,
      label: "Active Students",
      value: "2,547",
      change: "+12%",
      color: "text-green",
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: "Course Completion",
      value: "94%",
      change: "+5%",
      color: "text-gold",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Success Rate",
      value: "87%",
      change: "+8%",
      color: "text-green",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Avg. Study Time",
      value: "2.3h",
      change: "-15min",
      color: "text-blue-400",
    },
  ]

  return (
    <Card className="bg-gradient-to-br from-black/90 via-gray-900/50 to-black/90 backdrop-blur-xl border border-green/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
          AI Academy Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-gray-400">
                {stat.icon}
                <span className="text-xs">{stat.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">{stat.value}</span>
                <span className={`text-xs font-medium ${stat.color}`}>{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default AIStatsCard
