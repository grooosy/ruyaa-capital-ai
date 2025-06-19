"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import {
  Play,
  Clock,
  Star,
  Users,
  TrendingUp,
  BookOpen,
  Award,
  Target,
  CheckCircle,
  Lock,
  ArrowRight,
} from "lucide-react"

interface PathStep {
  id: string
  title: string
  description: string
  duration: string
  isCompleted: boolean
  isLocked: boolean
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

interface LearningPath {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  studentsCount: number
  rating: number
  progress: number
  steps: PathStep[]
  prerequisites?: string[]
  outcomes: string[]
}

interface PathModalProps {
  isOpen: boolean
  onClose: () => void
  path?: LearningPath
}

export default function PathModal({ isOpen, onClose, path }: PathModalProps) {
  const [selectedStep, setSelectedStep] = useState<string | null>(null)

  const defaultPath: LearningPath = {
    id: "1",
    title: "AI Trading Fundamentals",
    description:
      "Master the basics of AI-powered trading strategies and learn how to leverage machine learning algorithms for profitable trading decisions.",
    category: "Trading",
    difficulty: "Beginner",
    duration: "6 weeks",
    studentsCount: 12847,
    rating: 4.8,
    progress: 35,
    steps: [
      {
        id: "1",
        title: "Introduction to AI Trading",
        description: "Understanding the fundamentals of algorithmic trading and AI applications in financial markets.",
        duration: "45 min",
        isCompleted: true,
        isLocked: false,
        difficulty: "Beginner",
      },
      {
        id: "2",
        title: "Market Analysis with Machine Learning",
        description: "Learn how to use ML algorithms for technical and fundamental analysis.",
        duration: "1.5 hours",
        isCompleted: true,
        isLocked: false,
        difficulty: "Beginner",
      },
      {
        id: "3",
        title: "Risk Management Strategies",
        description: "Implement AI-driven risk management techniques to protect your capital.",
        duration: "1 hour",
        isCompleted: false,
        isLocked: false,
        difficulty: "Intermediate",
      },
      {
        id: "4",
        title: "Building Your First Trading Bot",
        description: "Create and deploy your first automated trading strategy.",
        duration: "2 hours",
        isCompleted: false,
        isLocked: false,
        difficulty: "Intermediate",
      },
      {
        id: "5",
        title: "Advanced Portfolio Optimization",
        description: "Use AI to optimize portfolio allocation and maximize returns.",
        duration: "1.5 hours",
        isCompleted: false,
        isLocked: true,
        difficulty: "Advanced",
      },
    ],
    prerequisites: ["Basic trading knowledge", "Understanding of financial markets"],
    outcomes: [
      "Build and deploy AI trading strategies",
      "Implement risk management systems",
      "Optimize portfolio performance",
      "Understand market analysis with ML",
    ],
  }

  const pathData = path || defaultPath

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "Advanced":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const handleStartPath = () => {
    console.log("Starting learning path:", pathData.id)
    onClose()
  }

  const handleStepClick = (stepId: string, isLocked: boolean) => {
    if (!isLocked) {
      setSelectedStep(stepId)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 backdrop-blur-xl border-gray-800/50">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-500/30">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            {pathData.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Path Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-gray-300 leading-relaxed">{pathData.description}</p>

              {/* Path Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">{pathData.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-4 h-4 text-green-400" />
                  <span className="text-sm">{pathData.studentsCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">{pathData.rating}/5.0</span>
                </div>
                <Badge className={getDifficultyColor(pathData.difficulty)}>{pathData.difficulty}</Badge>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{pathData.progress}% Complete</span>
                </div>
                <Progress value={pathData.progress} className="h-2" />
              </div>
            </div>

            {/* Action Panel */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <CardContent className="p-6 space-y-4">
                <Button
                  onClick={handleStartPath}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {pathData.progress > 0 ? "Continue Learning" : "Start Path"}
                </Button>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span>{pathData.steps.length} lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span>Certificate included</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span>Lifetime access</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prerequisites */}
          {pathData.prerequisites && pathData.prerequisites.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Prerequisites</h3>
              <div className="flex flex-wrap gap-2">
                {pathData.prerequisites.map((prereq, index) => (
                  <Badge key={index} className="bg-gray-700/50 text-gray-300 border-gray-600/50">
                    {prereq}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Learning Outcomes */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold">What You'll Learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pathData.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Curriculum */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Course Curriculum</h3>
            <div className="space-y-3">
              {pathData.steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    step.isLocked
                      ? "bg-gray-800/30 border-gray-700/50 opacity-60"
                      : selectedStep === step.id
                        ? "bg-blue-500/10 border-blue-500/30 cursor-pointer"
                        : "bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50 cursor-pointer"
                  }`}
                  onClick={() => handleStepClick(step.id, step.isLocked)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step.isCompleted
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : step.isLocked
                              ? "bg-gray-700/50 text-gray-500 border border-gray-600/30"
                              : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {step.isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : step.isLocked ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-medium">{step.title}</h4>
                          <Badge className={getDifficultyColor(step.difficulty)}>{step.difficulty}</Badge>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{step.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-sm">{step.duration}</span>
                      {!step.isLocked && <ArrowRight className="w-4 h-4 text-gray-400" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
