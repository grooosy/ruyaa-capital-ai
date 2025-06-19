"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Users, Clock, Award } from "lucide-react"

export default function AcademyHero() {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-400 border-blue-500/30">
                AI Trading Academy
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Master AI-Powered
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {" "}
                  Trading
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Learn advanced trading strategies with our AI-powered educational platform. From basics to expert-level
                arbitrage techniques.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-lg">
                <Play className="mr-2 h-5 w-5" />
                Start Learning
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg">
                View Curriculum
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm text-gray-400">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Expert Instructors</h3>
                    <p className="text-gray-400">Learn from industry professionals with years of trading experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50 hover:border-cyan-500/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-lg">
                    <Clock className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Flexible Learning</h3>
                    <p className="text-gray-400">Study at your own pace with 24/7 access to all course materials</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg">
                    <Award className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Certification</h3>
                    <p className="text-gray-400">Earn recognized certificates upon course completion</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
