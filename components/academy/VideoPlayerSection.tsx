"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, Maximize, Clock, CheckCircle } from "lucide-react"

interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
}

const lessons: Lesson[] = [
  { id: "1", title: "Introduction to AI Trading", duration: "12:30", completed: true },
  { id: "2", title: "Market Analysis Fundamentals", duration: "18:45", completed: true },
  { id: "3", title: "Arbitrage Opportunities", duration: "22:15", completed: false },
  { id: "4", title: "Risk Management", duration: "16:20", completed: false },
  { id: "5", title: "Advanced Strategies", duration: "25:10", completed: false },
]

export default function VideoPlayerSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(lessons[2])

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Video Player */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50 overflow-hidden">
          <CardContent className="p-0">
            {/* Video Container */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
              
              {/* Play Button */}
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="relative z-10 h-20 w-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl shadow-blue-500/25"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>

              {/* Video Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <span className="text-white text-sm">5:23 / 22:15</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-1 mt-4">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Lesson Info */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{currentLesson.title}</h2>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{currentLesson.duration}</span>
                  </div>
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">
                    Lesson 3 of 5
                  </Badge>
                </div>
              </div>
              {currentLesson.completed && (
                <CheckCircle className="h-6 w-6 text-green-500" />
              )}
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Learn how to identify and capitalize on arbitrage opportunities across different exchanges. 
              This lesson covers real-time market analysis, price discrepancies, and automated trading strategies.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lesson Playlist */}
      <div className="space-y-6">
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Course Lessons</h3>
            <div className="space-y-3">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  onClick={() => setCurrentLesson(lesson)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    currentLesson.id === lesson.id\
                      ? 'bg-gradient-to-r
