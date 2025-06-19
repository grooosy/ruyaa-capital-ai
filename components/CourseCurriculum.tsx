"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Play, Lock, BookOpen, Users, Award } from "lucide-react"

interface Module {
  id: string
  title: string
  description: string
  duration: string
  lessons: number
  completed: boolean
  locked: boolean
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

const modules: Module[] = [
  {
    id: "1",
    title: "Trading Fundamentals",
    description: "Learn the basics of financial markets, trading terminology, and market analysis",
    duration: "2h 30m",
    lessons: 8,
    completed: true,
    locked: false,
    difficulty: "Beginner",
  },
  {
    id: "2",
    title: "Technical Analysis",
    description: "Master chart patterns, indicators, and technical analysis tools",
    duration: "3h 45m",
    lessons: 12,
    completed: true,
    locked: false,
    difficulty: "Beginner",
  },
  {
    id: "3",
    title: "AI Trading Strategies",
    description: "Understand how AI algorithms analyze markets and execute trades",
    duration: "4h 20m",
    lessons: 15,
    completed: false,
    locked: false,
    difficulty: "Intermediate",
  },
  {
    id: "4",
    title: "Arbitrage Opportunities",
    description: "Identify and capitalize on price differences across exchanges",
    duration: "3h 15m",
    lessons: 10,
    completed: false,
    locked: false,
    difficulty: "Intermediate",
  },
  {
    id: "5",
    title: "Risk Management",
    description: "Advanced risk assessment and portfolio protection strategies",
    duration: "2h 50m",
    lessons: 9,
    completed: false,
    locked: false,
    difficulty: "Advanced",
  },
  {
    id: "6",
    title: "Advanced Algorithms",
    description: "Deep dive into machine learning models for trading",
    duration: "5h 10m",
    lessons: 18,
    completed: false,
    locked: true,
    difficulty: "Advanced",
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-600/20 text-green-400 border-green-500/30"
    case "Intermediate":
      return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30"
    case "Advanced":
      return "bg-red-600/20 text-red-400 border-red-500/30"
    default:
      return "bg-gray-600/20 text-gray-400 border-gray-500/30"
  }
}

export default function CourseCurriculum() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Course Curriculum</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Comprehensive learning path designed to take you from beginner to expert in AI-powered trading
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">6</div>
              <div className="text-sm text-gray-400">Total Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">72</div>
              <div className="text-sm text-gray-400">Total Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">21h 50m</div>
              <div className="text-sm text-gray-400">Total Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">33%</div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((module, index) => (
          <Card
            key={module.id}
            className={`bg-black/40 backdrop-blur-xl border transition-all duration-300 ${
              module.completed
                ? "border-green-500/30 bg-green-500/5"
                : module.locked
                  ? "border-gray-800/50 opacity-60"
                  : "border-gray-800/50 hover:border-blue-500/30"
            }`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      module.completed
                        ? "bg-green-600 text-white"
                        : module.locked
                          ? "bg-gray-700 text-gray-400"
                          : "bg-blue-600 text-white"
                    }`}
                  >
                    {module.completed ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : module.locked ? (
                      <Lock className="h-6 w-6" />
                    ) : (
                      <BookOpen className="h-6 w-6" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-white text-lg">
                        Module {index + 1}: {module.title}
                      </CardTitle>
                      <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                    </div>

                    <p className="text-gray-400 text-sm mb-3">{module.description}</p>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{module.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{module.lessons} lessons</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {module.completed && (
                    <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                      <Award className="mr-1 h-3 w-3" />
                      Completed
                    </Badge>
                  )}

                  <Button
                    size="sm"
                    disabled={module.locked}
                    className={
                      module.completed
                        ? "bg-green-600 hover:bg-green-700"
                        : module.locked
                          ? "bg-gray-700 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                    }
                  >
                    {module.completed ? (
                      "Review"
                    ) : module.locked ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Certificate Info */}
      <Card className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="h-8 w-8 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Earn Your Certificate</h3>
          </div>
          <p className="text-gray-300 mb-4">Complete all modules to earn your AI Trading Specialist Certificate</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: "33%" }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">2 of 6 modules completed</p>
        </CardContent>
      </Card>
    </div>
  )
}
