
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
  const isYouTubeVideo = getYouTubeVideoId(videoUrl) !== null;

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
