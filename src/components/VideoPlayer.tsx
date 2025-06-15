
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onVideoEnd?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, onVideoEnd }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1` : videoUrl;

  return (
    <Card className="bg-card border-green/20 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gradient-to-br from-green/10 to-gold/10">
          {videoId ? (
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => onVideoEnd && onVideoEnd()}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-green mx-auto mb-4" />
                <p className="text-white font-semibold">{title}</p>
                <p className="text-gray-400 text-sm">Video coming soon</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
