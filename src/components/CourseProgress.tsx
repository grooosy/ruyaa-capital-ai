
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

interface CourseProgressProps {
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
}

const CourseProgress: React.FC<CourseProgressProps> = ({
  completedLessons,
  totalLessons,
  progressPercentage,
}) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <Card className="bg-card border-green/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">
              {isArabic ? 'تقدم الدورة' : 'Course Progress'}
            </CardTitle>
            <CardDescription>
              {isArabic 
                ? 'أكمل جميع الدروس لفتح مزايا التداول' 
                : 'Complete all lessons to unlock trading benefits'
              }
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green">{Math.round(progressPercentage)}%</div>
            <div className="text-sm text-gray-400">
              {completedLessons}/{totalLessons} {isArabic ? 'مكتمل' : 'completed'}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green to-gold h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseProgress;
