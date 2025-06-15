
import React from 'react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import AgentChat from '@/components/AgentChat';

const MT4Page: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-bg">
      <ParticleBackground />
      <Navbar />
      <main className="pt-32 pb-20 w-full flex justify-center">
        <div className="agent-container w-full max-w-3xl px-4">
           <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Gold/Forex AI Agent
            </h1>
            <p className="text-lg text-gray-300">
              Chat with our MT4/MT5 specialist to manage your trades.
            </p>
          </div>
          <AgentChat agentId="mt4" />
        </div>
      </main>
    </div>
  );
};

export default MT4Page;
