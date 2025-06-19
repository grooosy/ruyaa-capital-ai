"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Share2, Trophy, Star } from "lucide-react"

export default function CourseCompletionCard() {
  return (
    <Card className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800/50 overflow-hidden">
      <CardContent className="p-8 text-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />

        {/* Trophy Animation */}
        <div className="relative z-10 mb-6">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/25 animate-pulse">
            <Trophy className="h-12 w-12 text-white" />
          </div>

          {/* Floating Stars */}
          <div className="absolute -top-2 -left-2 animate-bounce delay-100">
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
          </div>
          <div className="absolute -top-4 -right-1 animate-bounce delay-300">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
          </div>
          <div className="absolute -bottom-1 -left-4 animate-bounce delay-500">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
          </div>
        </div>

        {/* Congratulations Text */}
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-white">Congratulations! 🎉</h2>
          <p className="text-xl text-gray-300">You've successfully completed the</p>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            AI Trading Fundamentals Course
          </h3>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-sm text-gray-400">Completion</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">5/5</div>
            <div className="text-sm text-gray-400">Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">A+</div>
            <div className="text-sm text-gray-400">Grade</div>
          </div>
        </div>

        {/* Certificate Badge */}
        <div className="mb-8">
          <Badge className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border-green-500/30 px-4 py-2 text-lg">
            <Award className="mr-2 h-5 w-5" />
            Certificate Earned
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3">
            <Download className="mr-2 h-5 w-5" />
            Download Certificate
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 px-6 py-3">
            <Share2 className="mr-2 h-5 w-5" />
            Share Achievement
          </Button>
        </div>

        {/* Next Steps */}
        <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
          <h4 className="text-lg font-semibold text-white mb-2">What's Next?</h4>
          <p className="text-gray-400 text-sm mb-4">Continue your learning journey with advanced courses</p>
          <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/10">
            Explore Advanced Courses →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
