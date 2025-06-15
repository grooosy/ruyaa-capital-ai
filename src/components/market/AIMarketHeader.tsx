
import React, { useEffect, useState } from 'react';
import { Brain, Zap } from 'lucide-react';

const AIMarketHeader: React.FC = () => {
  const [aiStatus, setAiStatus] = useState('Analyzing Market Patterns...');

  useEffect(() => {
    const statusMessages = [
      'Analyzing Market Patterns...',
      'Processing Real-time Data...',
      'AI Neural Network Active...',
      'Computing Price Predictions...',
      'Monitoring Global Markets...'
    ];
    
    const interval = setInterval(() => {
      setAiStatus(statusMessages[Math.floor(Math.random() * statusMessages.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between p-4 bg-black/30 backdrop-blur-md border border-green/20 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Brain className="w-6 h-6 text-green animate-pulse" />
          <div className="absolute -inset-1 border border-green/30 rounded-full animate-ping" />
        </div>
        <div>
          <h3 className="font-bold text-white font-spacegrotesk">AI Market Intelligence</h3>
          <p className="text-xs text-green">{aiStatus}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-gold animate-pulse" />
        <span className="text-xs text-gold font-medium">LIVE</span>
      </div>
    </div>
  );
};

export default AIMarketHeader;
