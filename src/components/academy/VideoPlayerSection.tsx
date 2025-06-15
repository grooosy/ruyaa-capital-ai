
import React from 'react';
import { Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import VideoPlayer from '@/components/VideoPlayer';
import InteractiveLessonCard from './InteractiveLessonCard';
import { useTranslation } from 'react-i18next';

interface VideoPlayerSectionProps {
  selectedLesson: any;
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
  onManualComplete,
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

  // Handle interactive lessons
  if (selectedLesson.content_type === 'interactive') {
    return (
      <div className="mb-6">
        <InteractiveLessonCard
          lesson={selectedLesson}
          isCompleted={isCompleted}
          onComplete={onManualComplete}
        />
      </div>
    );
  }

  // Handle video lessons
  return (
    <div className="mb-6">
      <VideoPlayer
        key={`${selectedLesson.id}-${videoKey}`}
        videoUrl={selectedLesson.video_url}
        title={isArabic ? selectedLesson.title_ar : selectedLesson.title}
        onVideoEnd={onVideoEnd}
      />
      <div className="mt-6 p-6 bg-card border border-green/20 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-2">
          {isArabic ? selectedLesson.title_ar : selectedLesson.title}
        </h3>
        <p className="text-gray-300 mb-4">
          {isArabic ? selectedLesson.description_ar : selectedLesson.description}
        </p>
        {(isArabic ? selectedLesson.topics_ar : selectedLesson.topics) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {(isArabic ? selectedLesson.topics_ar : selectedLesson.topics)?.map((topic: string, index: number) => (
              <Badge key={index} variant="outline" className="border-gold/30 text-gold">
                {topic}
              </Badge>
            ))}
          </div>
        )}
        <Button 
          onClick={onManualComplete}
          className="w-full bg-green hover:bg-green/90"
          disabled={isCompleted}
        >
          {isCompleted ? (
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
  );
};

export default VideoPlayerSection;
