
import React from "react";
import TimelineStep from "@/components/TimelineStep";
import { TimelineStepData } from "@/data/agentFlows";

interface ProcessTimelineProps {
  timeline: TimelineStepData[];
  theme: 'green' | 'gold' | 'blue';
}

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ timeline, theme }) => {
  const fromColor = theme === 'green' ? 'from-green/50' : theme === 'gold' ? 'from-gold/50' : 'from-blue-500/50';
  const viaColor = theme === 'green' ? 'via-green/20' : theme === 'gold' ? 'via-gold/20' : 'via-blue-500/20';

  return (
    <div className="relative flex flex-col md:flex-row md:items-start md:gap-0 gap-8 md:justify-between mt-4">
      {/* Vertical line for timeline */}
      <div 
        className={`hidden md:block absolute left-1/2 top-10 bottom-3 w-0.5 -translate-x-1/2 bg-gradient-to-b rounded-full ${fromColor} ${viaColor} to-transparent`} 
        style={{ 
          height: "calc(100% - 54px)", 
          minHeight: 210, 
          zIndex: 0 
        }} 
      />
      {timeline.map((step, i) => (
        <TimelineStep
          key={i}
          icon={step.icon}
          title={step.title}
          desc={step.desc}
          index={i}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default ProcessTimeline;
