import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { Tables } from "@/integrations/supabase/types";
import { getModernLessonContent } from "@/utils/videoUtils";

type Course = Tables<"video_courses">;
type Lesson = Tables<"video_lessons">;
type UserProgress = Tables<"user_course_progress">;

export const useCourseData = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // Fetch courses with optimized loading
  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      // Simulate faster loading with immediate return of mock data
      return [
        {
          id: "mt4-mt5-course",
          title: "MT4/MT5 Trading Mastery",
          title_ar: "إتقان تداول MT4/MT5",
          description: "Complete guide to professional trading",
          description_ar: "دليل شامل للتداول المحترف",
          difficulty_level: "beginner",
          total_lessons: 5,
          total_duration_minutes: 15,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          thumbnail_url: null,
        },
      ] as Course[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    courses,
    coursesLoading,
    isArabic,
  };
};

export const useLessonsData = (courseId: string) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // Create modern interactive lessons with optimized loading
  const { data: lessons, isLoading: lessonsLoading } = useQuery({
    queryKey: ["modern-lessons", courseId],
    queryFn: async () => {
      // Immediate return for faster loading
      const modernLessons = Array.from({ length: 5 }, (_, index) => {
        const lessonContent = getModernLessonContent(index);
        return {
          id: `modern-lesson-${index + 1}`,
          course_id: courseId,
          lesson_number: index + 1,
          title: lessonContent.title,
          title_ar: lessonContent.titleAr,
          description: lessonContent.description,
          description_ar: lessonContent.descriptionAr,
          video_url: "",
          thumbnail_url: null,
          duration_seconds: 180,
          topics: ["Interactive Learning", "AI-Powered"],
          topics_ar: ["تعلم تفاعلي", "مدعوم بالذكاء الاصطناعي"],
          is_active: true,
          created_at: new Date().toISOString(),
          content_type: "interactive",
          interactive_content: lessonContent.content,
        };
      });

      return modernLessons as Lesson[];
    },
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    lessons,
    lessonsLoading,
    isArabic,
  };
};

export const useUserProgress = (
  userId: string | undefined,
  courseId: string,
) => {
  const queryClient = useQueryClient();

  // Fetch user progress
  const { data: progress, isLoading: progressLoading } = useQuery({
    queryKey: ["userProgress", userId, courseId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from("user_course_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("course_id", courseId)
        .maybeSingle();

      if (error) throw error;
      return data as UserProgress | null;
    },
    enabled: !!userId && !!courseId,
  });

  // Update progress mutation
  const updateProgress = useMutation({
    mutationFn: async ({
      completedLessons,
      progressPercentage,
    }: {
      completedLessons: string[];
      progressPercentage: number;
    }) => {
      if (!userId) throw new Error("User not authenticated");

      const progressData = {
        user_id: userId,
        course_id: courseId,
        completed_lessons: completedLessons,
        progress_percentage: progressPercentage,
        last_accessed_at: new Date().toISOString(),
        ...(progressPercentage === 100 && {
          completed_at: new Date().toISOString(),
        }),
      };

      const { data, error } = await supabase
        .from("user_course_progress")
        .upsert(progressData, { onConflict: "user_id,course_id" })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProgress", userId, courseId],
      });
    },
  });

  return {
    progress,
    progressLoading,
    updateProgress,
  };
};
