
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useVideoState } from '@/hooks/useVideoState';
import VideoControls from './VideoControls';
import { isValidVideoUrl } from '@/utils/videoUtils';
import VideoPlaceholder from './VideoPlaceholder';

interface RegularVideoPlayerProps {
  videoUrl: string;
  title: string;
  onVideoEnd?: () => void;
}

const RegularVideoPlayer: React.FC<RegularVideoPlayerProps> = ({ videoUrl, title, onVideoEnd }) => {
  const {
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    hasEnded,
    setHasEnded,
    videoRef,
    resetState,
  } = useVideoState();

  // Reset state when video changes
  useEffect(() => {
    resetState();
  }, [videoUrl, resetState]);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
      if (onVideoEnd && !hasEnded) {
        onVideoEnd();
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [onVideoEnd, hasEnded, setIsPlaying, setCurrentTime, setDuration, setHasEnded]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    setIsMuted(!isMuted);
    video.muted = !isMuted;
  };

  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    setVolume(newVolume);
    video.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!isValidVideoUrl(videoUrl)) {
    return <VideoPlaceholder title={title} videoUrl={videoUrl} />;
  }

  return (
    <Card className="bg-card border-green/20 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gradient-to-br from-green/10 to-gold/10">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={videoUrl}
            poster=""
          />
          
          <VideoControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isMuted={isMuted}
            onTogglePlay={togglePlay}
            onToggleMute={toggleMute}
            onVolumeChange={handleVolumeChange}
            onSeek={handleSeek}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RegularVideoPlayer;
