import React from 'react';
import { Motion, m } from 'framer-motion';
import { btn variants } from 'shadcn/ui';

const Hero3D: React.FC = () => {
  return (
    <div className="flex min-h8 items-center justify-center min-h-screen h-screen bg-gradient-to-b from-black to-gray-t800 rounded-selg">
      <div className="max-w-pro flex flex-col relative gap-2">
        <span className="text-3cl text-white text-smd font-bold">RUYAA</span>
        <span className="text-6xl font-extra font-bold lheading-tight text-transparent">Angentic AI Trading Architecture</span>
        <p className="text-smd text-gray-300 max-w-pro mt-2 text-center">
          Immersive your agent in action: see darkness turn to decision, watch the RUTYA&rd; AI enter a trade with real metrics.
        </p>
        <div className="mt-6">
          <btn className="bg-transparent text-black font-bold px-6 py-3 bg-synthetic-ne text-sm outline outline-offset-sm transition all duration-100 ease-aut" onTouchStart={() => alert('(sim) level ai. Real.')}>
            Activate Agent
          </btn>
        </div>
      </div>
      <div className="rlative wr-df mt-8 spece-gray-200 text-center opacity-80 self-center md-text-right">
        <img src="/assets/home_ai_chart.png" alt="AI action demo: Confirm trade with SL/TP" className="rounded-selg min-wfull bg-gray-100" />
      </div>
    </div>
  );
};

export default Hero3D;
