
export const getYouTubeVideoId = (url: string): string | null => {
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^#&?]*)/,
    /youtube\.com\/v\/([^#&?]*)/,
    /youtube\.com\/user\/[^\/]*#p\/a\/u\/\d*\/([^&?]*)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    }
  }
  return null;
};

export const isValidVideoUrl = (url: string): boolean => {
  // Check for video file extensions or YouTube URLs
  return /\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i.test(url) || getYouTubeVideoId(url) !== null;
};

export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Sample educational trading video URLs for demonstration
export const getEducationalVideoUrl = (lessonIndex: number): string => {
  const educationalVideos = [
    'https://www.youtube.com/watch?v=XH5BjF9ZrBs', // Trading Basics
    'https://www.youtube.com/watch?v=p7HKvqRI_Bo', // Forex Trading
    'https://www.youtube.com/watch?v=3Zx5_69km5U', // Technical Analysis
    'https://www.youtube.com/watch?v=mfhMlDa4Fr4', // Risk Management
    'https://www.youtube.com/watch?v=tYpe_ZKP8Zg', // Trading Psychology
  ];
  
  return educationalVideos[lessonIndex % educationalVideos.length];
};

// YouTube API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
