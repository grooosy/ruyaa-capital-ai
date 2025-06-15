
import React from 'react';
import Navbar from '@/components/Navbar';
import AgentSelectionCard from '@/components/AgentSelectionCard';
import ParticleBackground from '@/components/ParticleBackground';
import { useChatContext } from '@/context/ChatContext';

const agents = [
  {
    id: 'mt4',
    title: 'Gold/Forex (MT4/MT5)',
    description: 'Connect to MT4/MT5 and automate your forex and commodity trades.',
    logoSrc: '/logos/mt4mt5.svg',
    href: '#',
  },
  {
    id: 'crypto',
    title: 'Crypto Agent',
    description: 'Leverage our AI for intelligent cryptocurrency trading strategies.',
    logoSrc: '/logos/btc-official.svg',
    href: '#',
  },
  {
    id: 'arbitrage',
    title: 'Arbitrage Agent',
    description: 'Automatically find and execute profitable arbitrage opportunities.',
    logoSrc: '/logos/arbitrage.svg',
    href: '#',
  },
];

const AgentsPage: React.FC = () => {
  const { openChat } = useChatContext();

  return (
    <div className="relative min-h-screen bg-bg">
      <ParticleBackground />
      <Navbar />
      <main className="pt-32 pb-20 w-full">
        <section className="w-full max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
              Choose Your AI Agent
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Select an agent to connect your accounts and start leveraging our AI-powered tools.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <AgentSelectionCard
                key={agent.title}
                title={agent.title}
                description={agent.description}
                logoSrc={agent.logoSrc}
                onClick={agent.id === 'mt4' ? () => openChat('mt4') : undefined}
                href={agent.id !== 'mt4' ? agent.href : undefined}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AgentsPage;
