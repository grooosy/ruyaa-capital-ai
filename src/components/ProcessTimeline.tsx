import React from "react";
import TimelineStep from "@/components/TimelineStep";
import { TimelineStepData } from "@/data/agentFlows";

interface ProcessTimelineProps {
  timeline: TimelineStepData[];
  theme: 'green' | 'gold';
}

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ timeline, theme }) => {
  return (
    <div className="relative flex flex-col md:flex-row md:rtl:flex-row-reverse md:items-start md:gap-0 gap-8 md:justify-between mt-4">
      {/* Vertical line for timeline */}
      <div 
        className={`hidden md:block absolute start-1/2 top-10 bottom-3 w-0.5 -translate-x-1/2 rtl:translate-x-1/2 bg-gradient-to-b rounded-full ${theme === 'green' ? 'from-green/50 via-green/20' : 'from-gold/50 via-gold/20'} to-transparent`} 
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
