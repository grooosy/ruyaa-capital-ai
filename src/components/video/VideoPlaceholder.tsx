
import React from 'react';
import { Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface VideoPlaceholderProps {
  title: string;
  videoUrl: string;
}

const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({ title, videoUrl }) => {
  return (
    <Card className="bg-card border-green/20 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gradient-to-br from-green/10 to-gold/10">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Play className="w-16 h-16 text-green mx-auto mb-4" />
              <p className="text-white font-semibold">{title}</p>
              <p className="text-gray-400 text-sm">
                {videoUrl ? 'Invalid video format. Please use MP4, WebM, or OGG.' : 'Video content coming soon'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlaceholder;
