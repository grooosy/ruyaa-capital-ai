"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Share2, Star } from "lucide-react"

export default function CourseCompletionCard() {
  return (
    <Card className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800/50 overflow-hidden">
      <CardContent className="p-8 text-center">
        {/* Success Animation */}
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/25">
            <Award className="h-12 w-12 text-white" />
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-r from-green-600 to-emerald-600 rounded-full animate-ping opacity-20"></div>
        </div>

        {/* Congratulations */}
        <div className="space-y-4 mb-8">
          <Badge className="bg-green-600/20 text-green-400 border-green-500/30 mb-4">Course Completed</Badge>
          <h2 className="text-3xl font-bold text-white">Congratulations!</h2>
          <p className="text-gray-300 text-lg">You've successfully completed the AI Trading Fundamentals course</p>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8 p-6 bg-black/40 rounded-lg border border-gray-800/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">5</div>
            <div className="text-sm text-gray-400">Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">2.5h</div>
            <div className="text-sm text-gray-400">Duration</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-xl font-bold text-white">4.9</span>
            </div>
            <div className="text-sm text-gray-400">Rating</div>
          </div>
        </div>

        {/* Certificate */}
        <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Your Certificate</h3>
          <p className="text-gray-400 text-sm mb-4">
            Download your completion certificate and showcase your achievement
          </p>
          <div className="flex gap-3 justify-center">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              <Download className="mr-2 h-4 w-4" />
              Download Certificate
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">What's Next?</h3>
          <div className="grid gap-3">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Advanced Trading Strategies
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Risk Management Mastery
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Algorithmic Trading
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
