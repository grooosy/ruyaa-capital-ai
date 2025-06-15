
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Play, Clock, CheckCircle, Star, ArrowRight, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VideoPlayer from "@/components/VideoPlayer";
import CourseCurriculum from "@/components/CourseCurriculum";
import CourseProgress from "@/components/CourseProgress";
import { useCourseData, useLessonsData, useUserProgress } from "@/hooks/useCourseData";
import { useAuthState } from "@/hooks/chat/useAuthState";
import { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";

type Lesson = Tables<'video_lessons'>;

const AcademyPage = () => {
  const { t, i18n } = useTranslation();
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
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-green/10 text-green border-green/20">
                {isArabic ? 'دورة تداول مجانية' : 'Free Trading Course'}
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                {isArabic ? 'أكاديمية' : 'RuyaaCapital'} <span className="text-gold">{isArabic ? 'رؤيا كابيتال' : 'Academy'}</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                {currentCourse ? (isArabic ? currentCourse.description_ar : currentCourse.description) : 
                  (isArabic ? 
                    'أتقن تداول MT4/MT5 مع دورتنا الشاملة. تعلم من خبراء الصناعة وابدأ التداول بثقة باستخدام منصة رؤيا المدعومة بالذكاء الاصطناعي.' :
                    'Master MT4/MT5 trading with our comprehensive video course. Learn from industry experts and start trading with confidence using Ruyaa\'s AI-powered platform.'
                  )
                }
              </p>
              <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {lessons ? `${lessons.length} ${isArabic ? 'دروس' : 'Lessons'}` : '5 Lessons'} • 
                    {currentCourse ? ` ${Math.round(currentCourse.total_duration_minutes / 60)} ${isArabic ? 'ساعات' : 'Hours'}` : ' 2 Hours Total'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{isArabic ? '2,500+ طالب' : '2,500+ Students'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold fill-current" />
                  <span>{isArabic ? 'تقييم 4.9/5' : '4.9/5 Rating'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

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
              {selectedLesson && (
                <div className="mb-6">
                  <VideoPlayer
                    key={`${selectedLesson.id}-${videoKey}`}
                    videoUrl={selectedLesson.video_url}
                    title={isArabic ? selectedLesson.title_ar : selectedLesson.title}
                    onVideoEnd={handleVideoEnd}
                  />
                  <div className="mt-6 p-6 bg-card border border-green/20 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {isArabic ? selectedLesson.title_ar : selectedLesson.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {isArabic ? selectedLesson.description_ar : selectedLesson.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(isArabic ? selectedLesson.topics_ar : selectedLesson.topics)?.map((topic, index) => (
                        <Badge key={index} variant="outline" className="border-gold/30 text-gold">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      onClick={handleManualComplete}
                      className="w-full bg-green hover:bg-green/90"
                      disabled={completedLessons.includes(selectedLesson.id)}
                    >
                      {completedLessons.includes(selectedLesson.id) ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {isArabic ? 'مكتمل' : 'Completed'}
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          {isArabic ? 'تسجيل كمكتمل' : 'Mark as Complete'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Course Completion CTA */}
              {progressPercentage === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6"
                >
                  <Card className="bg-gradient-to-r from-green/20 to-gold/20 border-green/30">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4">
                        <CheckCircle className="w-12 h-12 text-green mx-auto mb-2" />
                        <h3 className="text-xl font-bold text-white">
                          {isArabic ? 'تهانينا!' : 'Congratulations!'}
                        </h3>
                        <p className="text-gray-300">
                          {isArabic ? 
                            'لقد أكملت دورة تداول MT4/MT5' : 
                            'You\'ve completed the MT4/MT5 Trading Course'
                          }
                        </p>
                      </div>
                      <Link to="/agents/mt4mt5">
                        <Button className="bg-gold hover:bg-gold/90 text-dark-charcoal font-semibold">
                          {isArabic ? 'ابدأ التداول مع رؤيا AI' : 'Start Trading with Ruyaa AI'}
                          <ArrowRight className={`w-4 h-4 ${isArabic ? 'mr-2' : 'ml-2'}`} />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
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
              <Card className="bg-gradient-to-br from-gold/10 to-green/10 border-gold/20 mt-6">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-10 h-10 text-gold mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">
                    {isArabic ? 'مستعد لبدء التداول؟' : 'Ready to Start Trading?'}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {isArabic ? 
                      'افتح حساب MT4/MT5 مع رؤيا AI واحصل على إشارات تداول احترافية.' :
                      'Open your MT4/MT5 account with Ruyaa AI and get access to professional trading signals.'
                    }
                  </p>
                  <Link to="/agents/mt4mt5">
                    <Button className="w-full bg-gold hover:bg-gold/90 text-dark-charcoal font-semibold">
                      {isArabic ? 'افتح حساب تداول' : 'Open Trading Account'}
                      <ArrowRight className={`w-4 h-4 ${isArabic ? 'mr-2' : 'ml-2'}`} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AcademyPage;
