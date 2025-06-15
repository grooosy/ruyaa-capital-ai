
import React from "react";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import AgentSelectionCard from "@/components/AgentSelectionCard";
import { Currency, Bitcoin } from "lucide-react";

const AgentsPage = () => {
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
              Select an agent to begin your automated trading journey. Each is specialized for different markets and strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AgentSelectionCard
              title="Gold/Forex Trading (MT4/MT5)"
              logo="/lovable-uploads/9dd041af-f3e5-4ac9-b4d8-a8fd480ba5cd.png"
              to="/agents/mt4-mt5"
            />
            <AgentSelectionCard
              title="Crypto Agent"
              logo={Bitcoin}
              to="#" // Placeholder link
              isSvgIcon={true}
            />
            <AgentSelectionCard
              title="Arbitrage Agent"
              logo={Currency}
              to="#" // Placeholder link
              isSvgIcon={true}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AgentsPage;
