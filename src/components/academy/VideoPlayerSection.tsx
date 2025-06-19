
import React from 'react';
import { Play } from 'lucide-react';
import InteractiveLessonCard from './InteractiveLessonCard';
import { useTranslation } from 'react-i18next';

import type { Lesson } from './InteractiveLessonCard';

interface VideoPlayerSectionProps {
  selectedLesson: Lesson | null;
  completedLessons: string[];
  videoKey: number;
  onVideoEnd: () => void;
  onManualComplete: () => void;
}

const VideoPlayerSection: React.FC<VideoPlayerSectionProps> = ({
  selectedLesson,
  completedLessons,
  videoKey,
  onVideoEnd,
  onManualComplete
}) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  if (!selectedLesson) {
    return (
      <div className="mb-6">
        <div className="aspect-video bg-gradient-to-br from-green/10 to-gold/10 rounded-lg border border-green/20 flex items-center justify-center">
          <div className="text-center text-white">
            <Play className="w-16 h-16 mx-auto mb-4 text-green" />
            <p className="text-lg font-semibold">
              {isArabic ? 'اختر درساً لبدء التعلم' : 'Select a lesson to start learning'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isCompleted = completedLessons.includes(selectedLesson.id);

  // All lessons are now interactive - show the interactive lesson card
  return (
    <div className="mb-6">
      <InteractiveLessonCard 
        lesson={selectedLesson} 
        isCompleted={isCompleted} 
        onComplete={onManualComplete} 
      />
    </div>
  );
};

export default VideoPlayerSection;
