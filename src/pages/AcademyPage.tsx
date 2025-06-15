
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AcademyHero from "@/components/academy/AcademyHero";
import VideoPlayerSection from "@/components/academy/VideoPlayerSection";
import CourseCompletionCard from "@/components/academy/CourseCompletionCard";
import TradingCTA from "@/components/academy/TradingCTA";
import CourseCurriculum from "@/components/CourseCurriculum";
import CourseProgress from "@/components/CourseProgress";
import { useCourseData, useLessonsData, useUserProgress } from "@/hooks/useCourseData";
import { useAuthState } from "@/hooks/chat/useAuthState";
import { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type Lesson = Tables<'video_lessons'>;

const AcademyPage = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const { session, userId } = useAuthState();
  
  const { courses, coursesLoading } = useCourseData();
  const currentCourse = courses?.[0]; // Get the first (main) course
  
  const { lessons, lessonsLoading } = useLessonsData(currentCourse?.id || '');
  const { progress, updateProgress } = useUserProgress(userId, currentCourse?.id || '');
  
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [videoKey, setVideoKey] = useState(0); // Key to force video player re-render

  // Set initial lesson and completed lessons from progress
  useEffect(() => {
    if (lessons && lessons.length > 0 && !selectedLesson) {
      setSelectedLesson(lessons[0]);
    }
    if (progress?.completed_lessons) {
      setCompletedLessons(progress.completed_lessons);
    }
  }, [lessons, progress, selectedLesson]);

  const handleLessonSelect = (lesson: Lesson) => {
    console.log('Selecting lesson:', lesson.title);
    setSelectedLesson(lesson);
    // Force video player to re-render with new content
    setVideoKey(prev => prev + 1);
  };

  const markLessonComplete = async (lessonId: string, showToast = true) => {
    if (!completedLessons.includes(lessonId) && lessons) {
      const newCompletedLessons = [...completedLessons, lessonId];
      const progressPercentage = (newCompletedLessons.length / lessons.length) * 100;
      
      setCompletedLessons(newCompletedLessons);
      
      if (userId) {
        try {
          await updateProgress.mutateAsync({
            completedLessons: newCompletedLessons,
            progressPercentage: Math.round(progressPercentage),
          });
          
          if (showToast) {
            const lessonTitle = isArabic ? selectedLesson?.title_ar : selectedLesson?.title;
            toast.success(
              isArabic 
                ? `تم إكمال الدرس: ${lessonTitle}` 
                : `Lesson completed: ${lessonTitle}`
            );
          }

          // If course is completed, show celebration
          if (progressPercentage === 100) {
            toast.success(
              isArabic 
                ? '🎉 تهانينا! لقد أكملت الدورة!' 
                : '🎉 Congratulations! You completed the course!'
            );
          }
        } catch (error) {
          console.error('Error updating progress:', error);
          toast.error(
            isArabic 
              ? 'خطأ في حفظ التقدم' 
              : 'Error saving progress'
          );
          // Revert the state change
          setCompletedLessons(completedLessons);
        }
      }
    }
  };

  const handleVideoEnd = () => {
    console.log('Video ended for lesson:', selectedLesson?.title);
    if (selectedLesson && !completedLessons.includes(selectedLesson.id)) {
      markLessonComplete(selectedLesson.id, true);
    }
  };

  const handleManualComplete = () => {
    if (selectedLesson) {
      markLessonComplete(selectedLesson.id, true);
    }
  };

  const progressPercentage = lessons ? (completedLessons.length / lessons.length) * 100 : 0;

  if (coursesLoading || lessonsLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green mx-auto mb-4"></div>
          <p className="text-white text-lg">
            {isArabic ? 'جاري تحميل الأكاديمية...' : 'Loading Academy...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]" dir={isArabic ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <AcademyHero currentCourse={currentCourse} lessons={lessons} />

        {/* Course Progress */}
        <section className="max-w-7xl mx-auto px-6 mb-12">
          <CourseProgress
            completedLessons={completedLessons.length}
            totalLessons={lessons?.length || 0}
            progressPercentage={progressPercentage}
          />
        </section>

        {/* Main Course Content */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <VideoPlayerSection
                selectedLesson={selectedLesson}
                completedLessons={completedLessons}
                videoKey={videoKey}
                onVideoEnd={handleVideoEnd}
                onManualComplete={handleManualComplete}
              />

              {/* Course Completion CTA */}
              <CourseCompletionCard progressPercentage={progressPercentage} />
            </div>

            {/* Course Playlist */}
            <div className="lg:col-span-1">
              {lessons && (
                <CourseCurriculum
                  lessons={lessons}
                  selectedLesson={selectedLesson}
                  completedLessons={completedLessons}
                  onLessonSelect={handleLessonSelect}
                  isLoading={lessonsLoading}
                />
              )}

              {/* Start Trading CTA */}
              <TradingCTA />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AcademyPage;
