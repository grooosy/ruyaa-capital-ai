"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Play, Lock } from "lucide-react"

interface Module {
  id: string
  title: string
  lessons: Lesson[]
  completed: boolean
}

interface Lesson {
  id: string
  title: string
  duration: string
  type: "video" | "quiz" | "exercise"
  completed: boolean
  locked: boolean
}

const curriculum: Module[] = [
  {
    id: "1",
    title: "Trading Fundamentals",
    completed: true,
    lessons: [
      {
        id: "1-1",
        title: "Introduction to Financial Markets",
        duration: "12:30",
        type: "video",
        completed: true,
        locked: false,
      },
      {
        id: "1-2",
        title: "Understanding Market Orders",
        duration: "15:45",
        type: "video",
        completed: true,
        locked: false,
      },
      { id: "1-3", title: "Basic Trading Quiz", duration: "10:00", type: "quiz", completed: true, locked: false },
    ],
  },
  {
    id: "2",
    title: "AI Trading Concepts",
    completed: false,
    lessons: [
      {
        id: "2-1",
        title: "Introduction to AI in Trading",
        duration: "18:20",
        type: "video",
        completed: true,
        locked: false,
      },
      {
        id: "2-2",
        title: "Machine Learning Basics",
        duration: "22:15",
        type: "video",
        completed: false,
        locked: false,
      },
      { id: "2-3", title: "AI Trading Strategies", duration: "25:30", type: "video", completed: false, locked: false },
      { id: "2-4", title: "Hands-on Exercise", duration: "30:00", type: "exercise", completed: false, locked: false },
    ],
  },
  {
    id: "3",
    title: "Advanced Arbitrage",
    completed: false,
    lessons: [
      { id: "3-1", title: "Arbitrage Fundamentals", duration: "20:45", type: "video", completed: false, locked: true },
      {
        id: "3-2",
        title: "Cross-Exchange Arbitrage",
        duration: "28:10",
        type: "video",
        completed: false,
        locked: true,
      },
      { id: "3-3", title: "Risk Management", duration: "24:30", type: "video", completed: false, locked: true },
      { id: "3-4", title: "Final Assessment", duration: "45:00", type: "quiz", completed: false, locked: true },
    ],
  },
]

export default function CourseCurriculum() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "quiz":
        return <CheckCircle className="h-4 w-4" />
      case "exercise":
        return <Clock className="h-4 w-4" />
      default:
        return <Play className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-600/20 text-blue-400 border-blue-500/30"
      case "quiz":
        return "bg-green-600/20 text-green-400 border-green-500/30"
      case "exercise":
        return "bg-purple-600/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold text-white">Course Curriculum</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Comprehensive learning path designed to take you from beginner to advanced AI trader
        </p>
      </div>

      {curriculum.map((module, moduleIndex) => (
        <Card key={module.id} className="bg-black/40 backdrop-blur-xl border border-gray-800/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    module.completed
                      ? "bg-green-600 text-white"
                      : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                  }`}
                >
                  {module.completed ? <CheckCircle className="h-4 w-4" /> : moduleIndex + 1}
                </div>
                <span className="text-white">{module.title}</span>
              </div>
              <Badge
                className={
                  module.completed
                    ? "bg-green-600/20 text-green-400 border-green-500/30"
                    : "bg-gray-600/20 text-gray-400 border-gray-500/30"
                }
              >
                {module.completed ? "Completed" : "In Progress"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {module.lessons.map((lesson, lessonIndex) => (
                <div
                  key={lesson.id}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                    lesson.locked
                      ? "bg-gray-900/50 opacity-50"
                      : lesson.completed
                        ? "bg-green-600/10 border border-green-500/20"
                        : "bg-gray-800/30 hover:bg-gray-800/50 cursor-pointer"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        lesson.locked
                          ? "bg-gray-700 text-gray-500"
                          : lesson.completed
                            ? "bg-green-600 text-white"
                            : "bg-blue-600 text-white"
                      }`}
                    >
                      {lesson.locked ? (
                        <Lock className="h-3 w-3" />
                      ) : lesson.completed ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        lessonIndex + 1
                      )}
                    </div>

                    <div>
                      <div className={`font-medium ${lesson.locked ? "text-gray-500" : "text-white"}`}>
                        {lesson.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getTypeColor(lesson.type)}>
                          {getTypeIcon(lesson.type)}
                          <span className="ml-1 capitalize">{lesson.type}</span>
                        </Badge>
                        <span className={`text-sm ${lesson.locked ? "text-gray-600" : "text-gray-400"}`}>
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {!lesson.locked && (
                    <div className="text-right">
                      {lesson.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Play className="h-5 w-5 text-blue-400" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Module Summary */}
            <div className="mt-6 pt-4 border-t border-gray-800/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  {module.lessons.filter((l) => l.completed).length} of {module.lessons.length} lessons completed
                </span>
                <span className="text-gray-400">
                  Total:{" "}
                  {module.lessons
                    .reduce((acc, lesson) => {
                      const [minutes, seconds] = lesson.duration.split(":").map(Number)
                      return acc + minutes + seconds / 60
                    }, 0)
                    .toFixed(0)}{" "}
                  minutes
                </span>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(module.lessons.filter((l) => l.completed).length / module.lessons.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
