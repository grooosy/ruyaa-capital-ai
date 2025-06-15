
import React from "react";
import { AnimatePresence } from "framer-motion";
import { AGENTS, ORBIT_RADIUS } from "@/data/agents";
import AICore from "@/components/AICore";
import AgentCard from "@/components/AgentCard";

const AIGrid: React.FC = () => {
  const [active, setActive] = React.useState(false);

  return (
    <section className="w-full max-w-6xl mx-auto py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          AI-Powered Trading Ecosystem
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Six intelligent agents working together to optimize your trading experience
        </p>
      </div>

      <div className="relative w-[500px] h-[500px] mx-auto flex items-center justify-center">
        {/* Central AI Core */}
        <AICore active={active} onClick={() => setActive(!active)} />

        {/* Orbiting agent cards */}
        <AnimatePresence>
          {active &&
            AGENTS.map((agent, i) => (
              <AgentCard
                key={agent.label}
                agent={agent}
                index={i}
                orbitRadius={ORBIT_RADIUS}
              />
            ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AIGrid;
