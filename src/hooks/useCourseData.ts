import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
import { Tables } from '@/integrations/supabase/types';
import { getModernLessonContent } from '@/utils/videoUtils';

type Course = Tables<'video_courses'>;
type Lesson = Tables<'video_lessons'>;
type UserProgress = Tables<'user_course_progress'>;

export const useCourseData = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  // Fetch courses
  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('video_courses')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Course[];
    },
  });

  return {
    courses,
    coursesLoading,
    isArabic,
  };
};

export const useLessonsData = (courseId: string) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  // Create modern interactive lessons instead of fetching from database
  const { data: lessons, isLoading: lessonsLoading } = useQuery({
    queryKey: ['modern-lessons', courseId],
    queryFn: async () => {
      // Generate 5 modern interactive lessons
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
          video_url: '', // All lessons are now interactive, no video URLs
          thumbnail_url: null,
          duration_seconds: 180, // 3 minutes for interactive content
          topics: ['Interactive Learning', 'AI-Powered'],
          topics_ar: ['تعلم تفاعلي', 'مدعوم بالذكاء الاصطناعي'],
          is_active: true,
          created_at: new Date().toISOString(),
          content_type: 'interactive',
          interactive_content: lessonContent.content
        };
      });
      
      console.log('Generated modern interactive lessons:', modernLessons);
      return modernLessons as any[];
    },
    enabled: !!courseId,
  });

  return {
    lessons,
    lessonsLoading,
    isArabic,
  };
};

export const useUserProgress = (userId: string | undefined, courseId: string) => {
  const queryClient = useQueryClient();

  // Fetch user progress
  const { data: progress, isLoading: progressLoading } = useQuery({
    queryKey: ['userProgress', userId, courseId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from('user_course_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .maybeSingle();
      
      if (error) throw error;
      return data as UserProgress | null;
    },
    enabled: !!userId && !!courseId,
  });

  // Update progress mutation
  const updateProgress = useMutation({
    mutationFn: async ({ completedLessons, progressPercentage }: { 
      completedLessons: string[], 
      progressPercentage: number 
    }) => {
      if (!userId) throw new Error('User not authenticated');

      const progressData = {
        user_id: userId,
        course_id: courseId,
        completed_lessons: completedLessons,
        progress_percentage: progressPercentage,
        last_accessed_at: new Date().toISOString(),
        ...(progressPercentage === 100 && { completed_at: new Date().toISOString() })
      };

      const { data, error } = await supabase
        .from('user_course_progress')
        .upsert(progressData, { onConflict: 'user_id,course_id' })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress', userId, courseId] });
    },
  });

  return {
    progress,
    progressLoading,
    updateProgress,
  };
};
