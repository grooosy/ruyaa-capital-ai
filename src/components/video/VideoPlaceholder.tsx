
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Play, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlaceholderProps {
  title: string;
  videoUrl?: string;
  message?: string;
}

const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({ 
  title, 
  videoUrl, 
  message = "Video content will be available soon" 
}) => {
  const handleExternalLink = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="bg-card border-green/20 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gradient-to-br from-green/10 to-gold/10 flex items-center justify-center">
          <div className="text-center text-white max-w-md mx-auto p-6">
            <Video className="w-16 h-16 mx-auto mb-4 text-green" />
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-400 mb-4">{message}</p>
            
            {videoUrl && (
              <Button
                onClick={handleExternalLink}
                variant="outline"
                className="border-green text-green hover:bg-green hover:text-black"
              >
                <Play className="w-4 h-4 mr-2" />
                Open Video Externally
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlaceholder;
