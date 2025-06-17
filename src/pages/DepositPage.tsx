import React from 'react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';

const DepositPage: React.FC = () => {
  const tab = new URLSearchParams(window.location.search).get('tab') || 'deposit';
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <main className="pt-32 pb-20 w-full max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-6">Deposit Options</h1>
        <div className="bg-card border border-white/10 rounded-xl p-6 space-y-4">
          <p className="text-gray-300">Selected: {tab}</p>
          <p>Here you can manage deposits, withdrawals, exchanges and WORLD money.</p>
        </div>
      </main>
    </div>
  );
};

export default DepositPage;
