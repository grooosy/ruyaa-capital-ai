
```tsx
import React from "react";
import { AnimatePresence } from "framer-motion";
import InteractiveAgentCard from "@/components/InteractiveAgentCard";
import AgentDetailModal from "@/components/AgentDetailModal";

type ActiveView = 'mt' | 'crypto' | null;

const AIGrid: React.FC = () => {
  const [detailView, setDetailView] = React.useState<ActiveView>(null);

  const handleOpenDetails = (view: 'mt' | 'crypto') => {
    setDetailView(view);
  };

  const handleCloseDetails = () => {
    setDetailView(null);
  };
  
  return (
    <section id="ai" className="w-full max-w-6xl mx-auto py-20 scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          <span className="text-gradient-green">How It Works</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Our AI ecosystem operates through specialized agents. Click on a card to explore the step-by-step process for each.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <InteractiveAgentCard type="mt" onOpenDetails={() => handleOpenDetails('mt')} />
        <InteractiveAgentCard type="crypto" onOpenDetails={() => handleOpenDetails('crypto')} />
      </div>
      
      <AnimatePresence>
        {detailView && (
            <AgentDetailModal 
                key={detailView} 
                type={detailView} 
                onClose={handleCloseDetails} 
            />
        )}
      </AnimatePresence>
    </section>
  );
};

export default AIGrid;
```
