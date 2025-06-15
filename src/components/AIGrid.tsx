
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import InteractiveAgentCard from "@/components/InteractiveAgentCard";
import AnimatedFlow from "@/components/AnimatedFlow";
import AgentDetailPanel from "./AgentDetailPanel";

type ActiveView = 'mt' | 'crypto' | 'arbitrage' | null;

const AIGrid: React.FC<{ startAnimation?: boolean }> = ({ startAnimation = false }) => {
  const [detailView, setDetailView] = React.useState<ActiveView>(null);
  const detailPanelRef = React.useRef<HTMLDivElement>(null);

  const handleOpenDetails = (view: ActiveView) => {
    if (detailView === view) {
      setDetailView(null);
    } else {
      setDetailView(view);
      setTimeout(() => {
        detailPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleStartAgent = (type: ActiveView) => {
    alert(`Starting agent: ${type}. User authentication and registration flow will be implemented here after Supabase integration.`);
    // Here we will handle the logic for sign-in and registration
  };
  
  return (
    <section id="ai" className="w-full max-w-7xl mx-auto py-20 px-6 scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          How It Works
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Our AI ecosystem operates through specialized agents. Click on a card to explore the step-by-step process for each.
        </p>
      </div>

      <AnimatedFlow isVisible={startAnimation} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        <InteractiveAgentCard type="mt" onOpenDetails={() => handleOpenDetails('mt')} isSelected={detailView === 'mt'} />
        <InteractiveAgentCard type="crypto" onOpenDetails={() => handleOpenDetails('crypto')} isSelected={detailView === 'crypto'} />
        <InteractiveAgentCard type="arbitrage" onOpenDetails={() => handleOpenDetails('arbitrage')} isSelected={detailView === 'arbitrage'} />
      </div>
      
      <div ref={detailPanelRef} className="mt-12 -mx-6">
        <AnimatePresence>
          {detailView && (
              <AgentDetailPanel
                  key={detailView} 
                  type={detailView} 
                  onStart={() => handleStartAgent(detailView)}
              />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AIGrid;
