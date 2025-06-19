import React, { useEffect, useState } from 'react';
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

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Reset state when video changes
  useEffect(() => {
    resetState();
    setIsVideoReady(false);
    setVideoError(false);
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
      setIsVideoReady(true);
      console.log('Video metadata loaded:', { duration: video.duration, title });
    };

    const handleLoadedData = () => {
      setIsVideoReady(true);
      console.log('Video data loaded and ready to play');
    };

    const handleCanPlay = () => {
      setIsVideoReady(true);
      console.log('Video can start playing');
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
      console.log('Video ended:', title);
      if (onVideoEnd && !hasEnded) {
        onVideoEnd();
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      console.log('Video started playing');
    };

    const handlePause = () => {
      setIsPlaying(false);
      console.log('Video paused');
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setVideoError(true);
      setIsVideoReady(false);
    };

    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [onVideoEnd, hasEnded, setIsPlaying, setCurrentTime, setDuration, setHasEnded, setVolume, setIsMuted, title]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video || !isVideoReady) {
      console.log('Video not ready for playback');
      return;
    }

    try {
      if (isPlaying) {
        video.pause();
      } else {
        await video.play();
      }
    } catch (error) {
      console.error('Error toggling video playback:', error);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);
    video.muted = newMuted;
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
    if (!video || !isVideoReady) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!isValidVideoUrl(videoUrl) || videoError) {
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
            preload="metadata"
            playsInline
            controls={false}
          />
          
          {/* Loading overlay */}
          {!isVideoReady && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green mx-auto mb-2"></div>
                <p className="text-sm">Loading video...</p>
              </div>
            </div>
          )}
          
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
