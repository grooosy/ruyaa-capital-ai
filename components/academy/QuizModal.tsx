"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw } from "lucide-react"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: "What is the primary advantage of AI-powered arbitrage trading?",
    options: [
      "Higher profit margins",
      "Speed of execution and opportunity detection",
      "Lower transaction costs",
      "Guaranteed profits",
    ],
    correctAnswer: 1,
    explanation:
      "AI can process market data and execute trades much faster than humans, allowing it to capitalize on brief arbitrage opportunities.",
  },
  {
    id: "2",
    question: "Which risk management strategy is most important in automated trading?",
    options: [
      "Diversification only",
      "Stop-loss orders only",
      "Position sizing and stop-loss combined",
      "Maximum leverage usage",
    ],
    correctAnswer: 2,
    explanation:
      "Combining proper position sizing with stop-loss orders provides comprehensive risk protection in automated trading systems.",
  },
  {
    id: "3",
    question: "What does 'slippage' refer to in trading?",
    options: [
      "The difference between expected and actual execution price",
      "Trading fees and commissions",
      "Market volatility",
      "Profit margins",
    ],
    correctAnswer: 0,
    explanation:
      "Slippage occurs when there's a difference between the expected price of a trade and the actual executed price, often due to market movement or low liquidity.",
  },
]

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  lessonTitle: string
}

export default function QuizModal({ isOpen, onClose, lessonTitle }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      setQuizCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / quizQuestions.length) * 100)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setQuizCompleted(false)
    setTimeLeft(300)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-black/90 backdrop-blur-xl border border-gray-800/50">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Quiz: {lessonTitle}</DialogTitle>
        </DialogHeader>

        {!showResults ? (
          <div className="space-y-6">
            {/* Progress and Timer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </Badge>
                <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="w-32 h-2" />
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Question */}
            <Card className="bg-gray-800/30 border border-gray-700/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-6">{quizQuestions[currentQuestion].question}</h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-blue-500 bg-blue-600/20 text-white"
                          : "border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800/70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswers[currentQuestion] === index
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-600"
                          }`}
                        >
                          {selectedAnswers[currentQuestion] === index && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next"}
              </Button>
            </div>
          </div>
        ) : (
          /* Results */
          <div className="space-y-6 text-center">
            <div className="space-y-4">
              {calculateScore() >= 70 ? (
                <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
              ) : (
                <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-white" />
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {calculateScore() >= 70 ? "Congratulations!" : "Keep Learning!"}
                </h3>
                <p className="text-gray-400">You scored {calculateScore()}% on this quiz</p>
              </div>

              <div className="text-6xl font-bold">
                <span className={calculateScore() >= 70 ? "text-green-400" : "text-red-400"}>{calculateScore()}%</span>
              </div>
            </div>

            {/* Answer Review */}
            <div className="space-y-4 text-left">
              <h4 className="text-lg font-semibold text-white">Review Answers:</h4>
              {quizQuestions.map((question, index) => (
                <Card key={question.id} className="bg-gray-800/30 border border-gray-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {selectedAnswers[index] === question.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-white font-medium mb-2">{question.question}</p>
                        <p className="text-gray-400 text-sm">{question.explanation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <Button onClick={resetQuiz} variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
              <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
                Continue Learning
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
