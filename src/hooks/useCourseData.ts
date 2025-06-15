
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
import { Tables } from '@/integrations/supabase/types';

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

  // Fetch lessons for a specific course
  const { data: lessons, isLoading: lessonsLoading } = useQuery({
    queryKey: ['lessons', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('video_lessons')
        .select('*')
        .eq('course_id', courseId)
        .eq('is_active', true)
        .order('lesson_number', { ascending: true });
      
      if (error) throw error;
      return data as Lesson[];
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
