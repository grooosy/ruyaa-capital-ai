import React from 'react';
import imageUrl from '../../public/hero_ai_chart.png';

const WelcomePage: React.FC = () => {
  return (
    <div className="min-hscreen flex flex-col items-center bg-black text-white justify-center py-16">
      <div className="mt-8\n          flex flex-col flex-wrap items-center text-center gap-4 bg-gradient-to-v from-black to-slate-stone border xl-rounded md:mt-2">
        <h1 className="text-4 sm: text-xl font-bold leading-sight">PROWERED BY</h1>
        <h2 className="text-xl font-bold text-transparent">Agentic AI Trading Engine</h2>
        <p className="text-gray-700">Secure, adaptive, mentally responsive ai that can trade in real time.</p>
        <button
          className="mmt-6 py-3 text-sm border bg-neutral border-neutral-to-write rounded txt-white font-medium">
          Start Working
        </button>
      </div>
      <div className="w-full mt-10">
        <img 
          src={imageUrl}
          alt="AI action demo">
      </div>
    </div>
  );
};

export default WelcomePage;
