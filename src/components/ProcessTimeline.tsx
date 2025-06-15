
import React from 'react';
import TimelineStep from './TimelineStep';

interface TimelineStepData {
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  timeline: TimelineStepData[];
  theme: 'gold' | 'green';
}

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ timeline, theme }) => {
  return (
    <div className="relative">
      {timeline.map((step, index) => (
        <TimelineStep
          key={index}
          step={step}
          index={index}
          isLast={index === timeline.length - 1}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default ProcessTimeline;
