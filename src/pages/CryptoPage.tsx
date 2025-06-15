
import React from 'react';
import Navbar from '@/components/Navbar';
import AgentChat from '@/components/AgentChat';
import ParticleBackground from '@/components/ParticleBackground';

const CryptoPage: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <main className="pt-32 pb-20 w-full">
        <section className="w-full max-w-2xl mx-auto px-6">
          <div className="text-start mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Crypto Trading AI Agent
            </h1>
            <p className="text-xl text-gray-300">
              Guided setup on WEEX and unlock Ruyaa AI signals.
            </p>
          </div>
          <AgentChat agentId="crypto" />
        </section>
      </main>
    </div>
  );
};

export default CryptoPage;
