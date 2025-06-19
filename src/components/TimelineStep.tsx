import React from "react";
import { LucideIcon } from "lucide-react";

interface TimelineStepProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  index: number;
  theme: 'green' | 'gold';
}

const TimelineStep: React.FC<TimelineStepProps> = ({ 
  icon: Icon, 
  title, 
  desc, 
  index, 
  theme
}) => {
  const iconColor = theme === 'green' ? 'text-green' : 'text-gold';
  const ringColor = theme === 'green' ? 'bg-green/10' : 'bg-gold/10';
  const borderColor = theme === 'green' ? 'border-green/50' : 'border-gold/50';

  return (
    <div
      className="relative z-10 flex md:flex-col items-center md:items-center md:w-1/6 w-full gap-4 md:gap-0"
      style={{ minWidth: 120 }}
    >
      {/* Icon in ring */}
      <div className="relative flex items-center justify-center md:mb-3 mb-0">
        <div className={`absolute w-16 h-16 rounded-full ${ringColor} animate-pulse-glow`} style={{ animationDelay: `${index * 150}ms` }} />
        <div
          className={`relative rounded-full border ${borderColor} bg-[#1a1913] w-14 h-14 flex items-center justify-center`}
        >
          <Icon size={28} className={iconColor} />
        </div>
      </div>
      {/* Caption */}
      <div className="flex flex-col items-center md:mt-2 mt-0">
        <span className="font-semibold text-white text-base md:text-md text-center">
          {title}
        </span>
        <span className="text-gray-400 text-xs mt-1 leading-tight text-center max-w-[125px]">
          {desc}
        </span>
      </div>
    </div>
  );
};

export default TimelineStep;
