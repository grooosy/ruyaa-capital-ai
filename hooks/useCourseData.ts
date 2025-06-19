"use client"

import { useState, useEffect } from "react"

export interface Course {
  id: string
  title: string
  description: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  progress: number
  lessons: Lesson[]
  completed: boolean
}

export interface Lesson {
  id: string
  title: string
  duration: string
  type: "video" | "quiz" | "reading"
  completed: boolean
  videoUrl?: string
  content?: string
}

export interface UserProgress {
  totalCourses: number
  completedCourses: number
  totalLessons: number
  completedLessons: number
  totalHours: number
  streak: number
  certificates: number
}

export const useCourseData = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses([
        {
          id: "1",
          title: "AI Trading Fundamentals",
          description: "Learn the basics of AI-powered trading strategies",
          duration: "4 hours",
          level: "Beginner",
          progress: 75,
          completed: false,
          lessons: [
            { id: "1-1", title: "Introduction to AI Trading", duration: "30 min", type: "video", completed: true },
            { id: "1-2", title: "Market Analysis with AI", duration: "45 min", type: "video", completed: true },
            { id: "1-3", title: "Risk Management", duration: "30 min", type: "video", completed: false },
          ],
        },
        {
          id: "2",
          title: "Advanced Arbitrage Strategies",
          description: "Master complex arbitrage opportunities",
          duration: "6 hours",
          level: "Advanced",
          progress: 30,
          completed: false,
          lessons: [
            { id: "2-1", title: "Cross-Exchange Arbitrage", duration: "60 min", type: "video", completed: true },
            { id: "2-2", title: "Statistical Arbitrage", duration: "90 min", type: "video", completed: false },
          ],
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return { courses, loading, setCourses }
}

export const useLessonsData = (courseId: string) => {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockLessons: Lesson[] = [
        { id: "1", title: "Introduction to AI Trading", duration: "30 min", type: "video", completed: true },
        { id: "2", title: "Market Analysis", duration: "45 min", type: "video", completed: false },
        { id: "3", title: "Quiz: Basic Concepts", duration: "15 min", type: "quiz", completed: false },
      ]
      setLessons(mockLessons)
      setLoading(false)
    }, 500)
  }, [courseId])

  return { lessons, loading, setLessons }
}

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress>({
    totalCourses: 12,
    completedCourses: 3,
    totalLessons: 48,
    completedLessons: 15,
    totalHours: 24,
    streak: 7,
    certificates: 3,
  })
  const [loading, setLoading] = useState(false)

  return { progress, loading, setProgress }
}
