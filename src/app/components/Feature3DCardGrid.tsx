import React from 'react';
import Feature3DCard from './Feature3DCard';

const features = [
  {
    imageSrc: '/uploads/ruyaa-engine.png', // First attached image
    title: 'RUYAA ENGINE',
    description: 'AI-powered trading engine with advanced analytics.'
  },
  {
    imageSrc: '/uploads/ruyaa-ai-signal.png', // Second attached image
    title: 'AI Signals',
    description: 'Buy and sell signals from RUYAA AI.'
  },
];

const Feature3DCardGrid: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-8 justify-center py-10">
      {features.map((feature) => (
        <Feature3DCard
          key={feature.title}
          imageSrc={feature.imageSrc}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default Feature3DCardGrid;
