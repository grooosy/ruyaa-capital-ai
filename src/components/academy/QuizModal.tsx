"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  questions: QuizQuestion[]
}

const QuizModal = ({ isOpen, onClose, onComplete, questions }: QuizModalProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setShowResult(true)
    }
  }

  const handleComplete = () => {
    onComplete()
    onClose()
    // Reset quiz state
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl"
        >
          <Card className="bg-gradient-to-br from-black/95 via-gray-900/90 to-black/95 backdrop-blur-xl border border-green/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Lesson Quiz</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {!showResult ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl text-white font-semibold">{questions[currentQuestion]?.question}</h3>

                    <div className="space-y-3">
                      {questions[currentQuestion]?.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                            selectedAnswer === index
                              ? "border-green bg-green/10 text-white"
                              : "border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white"
                          }`}
                        >
                          <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswer === null}
                      className="bg-green hover:bg-green/90"
                    >
                      {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="space-y-4">
                    {score >= questions.length * 0.7 ? (
                      <CheckCircle className="w-16 h-16 text-green mx-auto" />
                    ) : (
                      <XCircle className="w-16 h-16 text-red-400 mx-auto" />
                    )}

                    <h3 className="text-2xl font-bold text-white">
                      {score >= questions.length * 0.7 ? "Congratulations!" : "Keep Learning!"}
                    </h3>

                    <p className="text-gray-300">
                      You scored {score} out of {questions.length} questions correctly.
                    </p>

                    <div className="text-4xl font-bold text-green">{Math.round((score / questions.length) * 100)}%</div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    {score >= questions.length * 0.7 ? (
                      <Button onClick={handleComplete} className="bg-green hover:bg-green/90">
                        Complete Lesson
                      </Button>
                    ) : (
                      <>
                        <Button onClick={resetQuiz} variant="outline">
                          Retake Quiz
                        </Button>
                        <Button onClick={onClose} variant="ghost">
                          Review Lesson
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default QuizModal
