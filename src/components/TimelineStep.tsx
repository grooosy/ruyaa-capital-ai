
import React from "react";
import { ArrowDown, LucideIcon } from "lucide-react";

interface TimelineStepProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  index: number;
  isLast: boolean;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ 
  icon: Icon, 
  title, 
  desc, 
  index, 
  isLast 
}) => {
  return (
    <div
      className="relative z-10 flex md:flex-col items-center md:items-center md:w-1/6 w-full gap-4 md:gap-0"
      style={{ minWidth: 120 }}
    >
      {/* Icon in ring */}
      <div className="relative flex items-center justify-center md:mb-3 mb-0">
        <div className="absolute w-16 h-16 rounded-full bg-green/10 animate-pulse-glow" style={{ animationDelay: `${index * 150}ms` }} />
        <div
          className="relative rounded-full border border-green/50 bg-[#1a1913] w-14 h-14 flex items-center justify-center"
        >
          <Icon size={28} className="text-green" />
        </div>
        {/* Connector arrow */}
        {!isLast && (
          <span className="hidden md:flex absolute left-1/2 bottom-[-32px] -translate-x-1/2 z-20">
            <ArrowDown size={18} strokeWidth={2.2} className="text-gold" />
          </span>
        )}
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
      {/* Horizontal arrow for mobile only */}
      {!isLast && (
        <span className="md:hidden flex px-2">
          <ArrowDown size={16} strokeWidth={2.2} className="rotate-90 text-gold" />
        </span>
      )}
    </div>
  );
};

export default TimelineStep;
