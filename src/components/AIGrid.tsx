
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import InteractiveAgentCard from "@/components/InteractiveAgentCard";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Cpu, Bot } from 'lucide-react';

type ActiveView = 'mt' | 'crypto' | null;

const AIGrid: React.FC = () => {
  const [activeView, setActiveView] = React.useState<ActiveView>('mt');

  const handleToggle = (view: 'mt' | 'crypto') => {
    setActiveView(prev => (prev === view ? null : view));
  };
  
  return (
    <section id="ai" className="w-full max-w-6xl mx-auto py-20 scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          How It Works
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Our AI ecosystem operates through specialized agents. Select a path below to see the step-by-step process for MT4/5 automation or Crypto arbitrage.
        </p>
      </div>

      <div className="flex justify-center items-center gap-4 mb-8">
        <Button 
          onClick={() => handleToggle('mt')}
          className={cn(
              "font-bold text-lg px-8 py-6 transition-all duration-300 border-2 rounded-xl",
              activeView === 'mt'
                  ? 'bg-green/20 border-green text-green'
                  : 'bg-card/50 border-transparent hover:bg-card/90 text-gray-300'
          )}
        >
          <Cpu className="mr-2 h-5 w-5" />
          MT4 / MT5 Agents
        </Button>
        <Button 
          onClick={() => handleToggle('crypto')}
          className={cn(
              "font-bold text-lg px-8 py-6 transition-all duration-300 border-2 rounded-xl",
              activeView === 'crypto'
                  ? 'bg-gold/20 border-gold text-gold'
                  : 'bg-card/50 border-transparent hover:bg-card/90 text-gray-300'
          )}
        >
          <Bot className="mr-2 h-5 w-5" />
          Crypto Arbitrage
        </Button>
      </div>
      
      <div className="min-h-[320px]">
        <AnimatePresence mode="wait">
          {activeView && <InteractiveAgentCard key={activeView} type={activeView} />}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AIGrid;
