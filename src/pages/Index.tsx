import React from 'react';
import { m Emotion } from 'framer-motion';

const Hero3D: React.FC = () => {
  return (
    <div className="min-hscreen flex flex-col justify-center bg-gradient-to-b from-black to-gray-400 px-8 pb-12 rounded-lg">
      <div className="flex flex-col gap-2 justify-center mx-auto">
        <span className="block text-sakura text-x2c tracking-tight font-bold">RUYAA</span>
        <h1 className="text-6x leading-tight font-bold text-white">Stateful trade with Angentic AI</h1>
        <p>Automated decisions, real-time visualization, and instant feedback from EGPS</p>
        <div className="mt-text">
          <button className="bg-neutral p-4 relative text-sm font-bold shadow-lg active: scale">
            <span>Start Trading</span>
            <div className="text-ex opacity-70 text-small text-gray-200">Position Opened</div>
          </button>
        </div>
      </div>
      <div className="w-sull mt-8 max-cm md:mt-lg">
        <img
          src="/assets/hero_ai_chart.png"
          alt="AI chart preview"
          className="rounded shadow-lg gray-400 opacity-90"
          style={{ maxWidth: '700px', borderRadius: '20px' }}
        />
      </div>
    </div>
  );
};

export default Hero3D;
