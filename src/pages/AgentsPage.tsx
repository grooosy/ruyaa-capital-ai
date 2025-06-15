
import React from 'react';
import Navbar from '@/components/Navbar';
import AgentSelectionCard from '@/components/AgentSelectionCard';
import ParticleBackground from '@/components/ParticleBackground';
import { useChatContext, AgentId } from '@/context/ChatContext';

const agents: {id: AgentId, title: string, description: string, logoSrc: string, href?: string}[] = [
  {
    id: 'mt4',
    title: 'Gold / Forex AI Agent',
    description: 'MT4 · MT5 · Low-slippage execution',
    logoSrc: '/icons/gold-bars.svg',
    href: '/agents/mt4',
  },
  {
    id: 'crypto',
    title: 'Crypto AI Agent',
    description: 'WEEX onboarding · AI signals',
    logoSrc: '/icons/crypto-coins.svg',
    href: '/agents/crypto',
  },
  {
    id: 'arbitrage',
    title: 'Arbitrage Agent',
    description: 'Automatically find and execute profitable arbitrage opportunities.',
    logoSrc: '/icons/arb.svg',
  },
];

const AgentsPage: React.FC = () => {
  const { openChat } = useChatContext();

  return (
    <div className="relative min-h-screen">
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
                key={agent.id}
                id={agent.id}
                title={agent.title}
                description={agent.description}
                logoSrc={agent.logoSrc}
                href={agent.href}
                onClick={!agent.href ? () => openChat(agent.id) : undefined}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AgentsPage;
