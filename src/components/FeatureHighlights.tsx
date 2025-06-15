
import React from 'react';
import { ShieldCheck, Zap, MessageSquare, BookOpen } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="h-7 w-7 text-gold" />,
    text: 'Verified Brokers',
  },
  {
    icon: <Zap className="h-7 w-7 text-gold" />,
    text: 'Instant Account Setup',
  },
  {
    icon: <MessageSquare className="h-7 w-7 text-gold" />,
    text: '24/7 AI Assistant',
  },
  {
    icon: <BookOpen className="h-7 w-7 text-gold" />,
    text: 'Trading Academy',
  },
];

const FeatureHighlights: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center gap-3 group cursor-pointer">
            <div className="transform transition-transform duration-300 group-hover:scale-110">
              {feature.icon}
            </div>
            <p className="text-base font-medium text-gray-300 transition-colors duration-300 group-hover:text-white">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;
