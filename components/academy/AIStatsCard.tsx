"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Zap, Brain, Target } from "lucide-react"

interface AIMetric {
  label: string
  value: string
  change: number
  trend: "up" | "down" | "stable"
  icon: React.ReactNode
}

const aiMetrics: AIMetric[] = [
  {
    label: "Success Rate",
    value: "94.7%",
    change: 2.3,
    trend: "up",
    icon: <Target className="h-5 w-5" />,
  },
  {
    label: "Avg Response Time",
    value: "12ms",
    change: -15.2,
    trend: "up", // Lower response time is better
    icon: <Zap className="h-5 w-5" />,
  },
  {
    label: "Model Accuracy",
    value: "97.2%",
    change: 1.8,
    trend: "up",
    icon: <Brain className="h-5 w-5" />,
  },
  {
    label: "Active Strategies",
    value: "156",
    change: 8.4,
    trend: "up",
    icon: <Activity className="h-5 w-5" />,
  },
]

const performanceData = [
  { period: "Last 24h", trades: 1247, profit: "+$12,450", winRate: "96.2%" },
  { period: "Last 7d", trades: 8934, profit: "+$89,340", winRate: "94.8%" },
  { period: "Last 30d", trades: 38567, profit: "+$385,670", winRate: "94.1%" },
]

export default function AIStatsCard() {
  return (
    <div className="space-y-6">
      {/* AI Performance Metrics */}
      <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-400" />
            AI Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg text-blue-400">
                    {metric.icon}
                  </div>
                  <Badge
                    className={`text-xs ${
                      metric.trend === "up"
                        ? "bg-green-600/20 text-green-400 border-green-500/30"
                        : metric.trend === "down"
                          ? "bg-red-600/20 text-red-400 border-red-500/30"
                          : "bg-gray-600/20 text-gray-400 border-gray-500/30"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : metric.trend === "down" ? (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    ) : (
                      <Activity className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(metric.change)}%
                  </Badge>
                </div>

                <div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trading Performance */}
      <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-400" />
            Trading Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.map((data, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50"
              >
                <div>
                  <div className="text-white font-medium">{data.period}</div>
                  <div className="text-sm text-gray-400">{data.trades} trades executed</div>
                </div>

                <div className="text-right">
                  <div className="text-green-400 font-bold text-lg">{data.profit}</div>
                  <div className="text-sm text-gray-400">Win Rate: {data.winRate}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Learning Progress */}
      <Card className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-400" />
            AI Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Model Training</span>
                <span className="text-white">87%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  style={{ width: "87%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Pattern Recognition</span>
                <span className="text-white">92%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Risk Assessment</span>
                <span className="text-white">95%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                  style={{ width: "95%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-black/30 rounded-lg">
            <p className="text-gray-300 text-sm">
              Our AI continuously learns from market data and trading patterns to improve performance. The system
              processes over 10,000 data points per second to identify optimal trading opportunities.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
