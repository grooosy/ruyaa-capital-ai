"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import type { Tables } from "@/integrations/supabase/types"

type Course = Tables<"video_courses">
type Lesson = Tables<"video_lessons">
type UserProgress = Tables<"user_progress">

export const useCourseData = (courseId?: string) => {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("video_courses")
          .select("*")
          .eq("id", courseId || "default")
          .single()

        if (error) throw error
        setCourse(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch course")
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  return { course, loading, error }
}

export const useLessonsData = (courseId?: string) => {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("video_lessons")
          .select("*")
          .eq("course_id", courseId || "default")
          .order("order_index")

        if (error) throw error
        setLessons(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch lessons")
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [courseId])

  return { lessons, loading, error }
}

export const useUserProgress = (userId?: string, courseId?: string) => {
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId || !courseId) {
      setLoading(false)
      return
    }

    const fetchProgress = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", userId)
          .eq("course_id", courseId)

        if (error) throw error
        setProgress(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch progress")
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [userId, courseId])

  return { progress, loading, error }
}
