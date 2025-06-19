import React from 'react';
import { Activity } from 'lucide-react';

const AIMarketFooter: React.FC = () => {
  return (
    <div className="p-3 bg-green/5 backdrop-blur-md border border-green/10 rounded-xl">
      <div className="flex items-center gap-2 text-xs text-green">
        <Activity className="w-3 h-3 animate-pulse" />
        <span>AI-powered real-time analysis • Market data refreshed every 5 seconds</span>
      </div>
    </div>
  );
};

export default AIMarketFooter;
