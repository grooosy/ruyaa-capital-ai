
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getYouTubeVideoId } from '@/utils/videoUtils';

interface YouTubePlayerProps {
  videoUrl: string;
  title: string;
  onVideoEnd?: () => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoUrl, title, onVideoEnd }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hasEnded, setHasEnded] = useState(false);
  const videoId = getYouTubeVideoId(videoUrl);

  useEffect(() => {
    setHasEnded(false);
  }, [videoUrl]);

  useEffect(() => {
    if (!videoId) return;

    // Load YouTube API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initializePlayer = () => {
      if (window.YT && window.YT.Player && iframeRef.current) {
        const player = new window.YT.Player(iframeRef.current, {
          events: {
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED && !hasEnded) {
                setHasEnded(true);
                if (onVideoEnd) {
                  onVideoEnd();
                }
              }
            }
          }
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      window.onYouTubeIframeAPIReady = initializePlayer;
    }
  }, [videoId, onVideoEnd, hasEnded]);

  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}&autoplay=0&controls=1`;

  return (
    <Card className="bg-card border-green/20 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gradient-to-br from-green/10 to-gold/10">
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            id={`youtube-player-${videoId}`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubePlayer;
