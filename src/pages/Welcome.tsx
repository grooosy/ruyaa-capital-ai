import React from 'react';
import { m } from 'framer-motion';

const WelcomePage: React.FC = () => {
  return (
    <div className="min-hscreen flex flex-col justify-center bg-gradient-to-b from-black to-gray-400 px-8 pb-12 rounded-lg">
      <div className="max-w-2xl text-center">
        <span className="text-xl font-bold block">Stubtitle</span>
        <h1 className="text-7l font-bold tracking-tight">Real Power by AI</h1>
        <p className="text-lg">Simple elevation text for start with clean website data and future plan</p>
        <button className="border bg-neutral text-sm py-3 px6 rounded-tlg mt-2">Get Started</button>
        <div className="mt-4 bg-slate py-20">IMAGE SLOT</div>
      </div>
    </div>
  );
};

export default WelcomePage;
