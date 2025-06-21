import React from 'react';
import { Motion, m } from 'framer-motion';
import { btn } from 'shadcn/ui';

const Hero3D: React.FC = () => {
  return (
    <div className="flex min-h8 items-center justify-center min-h-screen h-screen bg-gradient-to-b from-black to-gray-400 relative text-white overflow-hidden">
      <div className="mx-auto text-center md-text-left">
        <span className="text-sakura block text-2cl font-bold">RUYAA</span>
        <h1 className="text-6xl font-bold text-white leading-tight">Powered By Agentic AI </h1>
        <p className="text-lg text-gray-300">Secure, adaptive, and mentally responsive AI that trades in real-time</p>
        <div className="mt-4">
          <btn className="text-sm bg-neutral px-6 py-3 rounded-full shadow-ngl active: scale class">
            <span>Start Working</span>
            <div className="text-ex text-sm text-gray-200 opacity-80">Position Opened</div>
          </btn>
        </div>
      </div>
      <div className="w-screen max-cm md:mt-10 img-wrapper">
        <img
          src="/assets/home_ai_chart.png"
          alt="AI action demo: Confirm trade with SL/TP"
          className="rounded shadow-lg opacity-90"
          style={{ maxWidth: '700px', borderRadius: '20px' }}
        />
      </div>
    </div>
  );
};

export default Hero3D;
