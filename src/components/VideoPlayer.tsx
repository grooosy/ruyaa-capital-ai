import React from 'react';
import { getYouTubeVideoId } from '@/utils/videoUtils';
import YouTubePlayer from './video/YouTubePlayer';
import RegularVideoPlayer from './video/RegularVideoPlayer';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onVideoEnd?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, onVideoEnd }) => {
  console.log('VideoPlayer rendering:', { videoUrl, title });

  if (!videoUrl) {
    console.warn('No video URL provided');
    return (
      <div className="aspect-video bg-gradient-to-br from-green/10 to-gold/10 rounded-lg border border-green/20 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg font-semibold">No video URL provided</p>
        </div>
      </div>
    );
  }

  const isYouTubeVideo = getYouTubeVideoId(videoUrl) !== null;
  
  console.log('Video type detected:', isYouTubeVideo ? 'YouTube' : 'Regular video');

  if (isYouTubeVideo) {
    return (
      <YouTubePlayer
        videoUrl={videoUrl}
        title={title}
        onVideoEnd={onVideoEnd}
      />
    );
  }

  return (
    <RegularVideoPlayer
      videoUrl={videoUrl}
      title={title}
      onVideoEnd={onVideoEnd}
    />
  );
};

export default VideoPlayer;
