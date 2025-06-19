import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tables } from '@/integrations/supabase/types';
import { useTranslation } from 'react-i18next';

type Lesson = Tables<'video_lessons'>;

interface CourseCurriculumProps {
  lessons: Lesson[];
  selectedLesson: Lesson | null;
  completedLessons: string[];
  onLessonSelect: (lesson: Lesson) => void;
  isLoading?: boolean;
}

const CourseCurriculum: React.FC<CourseCurriculumProps> = ({
  lessons,
  selectedLesson,
  completedLessons,
  onLessonSelect,
  isLoading = false,
}) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleLessonClick = (lesson: Lesson) => {
    console.log('Lesson clicked in curriculum:', {
      id: lesson.id,
      title: lesson.title,
      videoUrl: lesson.video_url
    });
    onLessonSelect(lesson);
  };

  if (isLoading) {
    return (
      <Card className="bg-card border-green/20">
        <CardHeader>
          <CardTitle className="text-white">
            {isArabic ? 'جاري التحميل...' : 'Loading...'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 rounded-lg border border-gray-700 animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-green/20">
      <CardHeader>
        <CardTitle className="text-white">
          {isArabic ? 'منهج الدورة' : 'Course Curriculum'}
        </CardTitle>
        <CardDescription>
          {isArabic ? 'اضغط على أي درس لتشغيله' : 'Click on any lesson to play it'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isSelected = selectedLesson?.id === lesson.id;
          
          return (
            <motion.div
              key={lesson.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-green bg-green/10 shadow-lg'
                  : isCompleted
                  ? 'border-green/50 bg-green/5 hover:border-green/70'
                  : 'border-gray-700 hover:border-gold/50 hover:bg-gold/5'
              }`}
              onClick={() => handleLessonClick(lesson)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green" />
                  ) : isSelected ? (
                    <Play className="w-5 h-5 text-green fill-current" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-gray-400 font-medium">{index + 1}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-semibold text-sm mb-1 truncate ${
                    isSelected ? 'text-green' : isCompleted ? 'text-white' : 'text-gray-200'
                  }`}>
                    {isArabic ? lesson.title_ar : lesson.title}
                  </h4>
                  <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                    {isArabic ? lesson.description_ar : lesson.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">
                        {formatDuration(lesson.duration_seconds)}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="text-xs text-green font-medium">
                        {isArabic ? '▶ يتم التشغيل' : '▶ Now Playing'}
                      </span>
                    )}
                    {isCompleted && !isSelected && (
                      <span className="text-xs text-green font-medium">
                        {isArabic ? '✓ مكتمل' : '✓ Done'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
