
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getYouTubeVideoId } from '@/utils/videoUtils';

interface YouTubePlayerProps {
  videoUrl: string;
  title: string;
  onVideoEnd?: () => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoUrl, title, onVideoEnd }) => {
  const playerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const videoId = getYouTubeVideoId(videoUrl);

  useEffect(() => {
    setHasEnded(false);
    setIsReady(false);
  }, [videoUrl]);

  useEffect(() => {
    if (!videoId) return;

    const initializePlayer = () => {
      if (window.YT && window.YT.Player) {
        console.log('Initializing YouTube player for:', title);
        
        // Destroy existing player if it exists
        if (playerRef.current) {
          try {
            playerRef.current.destroy();
          } catch (error) {
            console.log('Error destroying existing player:', error);
          }
        }

        playerRef.current = new window.YT.Player(`youtube-player-${videoId}`, {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            fs: 1,
            cc_load_policy: 0,
            iv_load_policy: 3,
            autohide: 0
          },
          events: {
            onReady: (event: any) => {
              console.log('YouTube player ready');
              setIsReady(true);
            },
            onStateChange: (event: any) => {
              console.log('YouTube player state changed:', event.data);
              
              if (event.data === window.YT.PlayerState.ENDED && !hasEnded) {
                console.log('YouTube video ended:', title);
                setHasEnded(true);
                if (onVideoEnd) {
                  onVideoEnd();
                }
              }
            },
            onError: (event: any) => {
              console.error('YouTube player error:', event.data);
            }
          }
        });
      }
    };

    // Load YouTube API if not already loaded
    if (!window.YT) {
      console.log('Loading YouTube API...');
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
          playerRef.current = null;
        } catch (error) {
          console.log('Error cleaning up YouTube player:', error);
        }
      }
    };
  }, [videoId, onVideoEnd, hasEnded, title]);

  if (!videoId) return null;

  return (
    <Card className="bg-card border-green/20 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gradient-to-br from-green/10 to-gold/10">
          <div
            id={`youtube-player-${videoId}`}
            className="w-full h-full"
          />
          
          {/* Loading overlay */}
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green mx-auto mb-2"></div>
                <p className="text-sm">Loading YouTube player...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubePlayer;
