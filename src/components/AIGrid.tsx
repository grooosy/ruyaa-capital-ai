
import React from "react";
import { AnimatePresence } from "framer-motion";
import InteractiveAgentCard from "@/components/InteractiveAgentCard";
import AgentDetailModal from "@/components/AgentDetailModal";
import AnimatedFlow from "@/components/AnimatedFlow";
import { useTranslation } from "react-i18next";

type ActiveView = 'mt' | 'crypto' | null;

const AIGrid: React.FC<{ startAnimation?: boolean }> = ({ startAnimation = false }) => {
  const [detailView, setDetailView] = React.useState<ActiveView>(null);
  const { t } = useTranslation();

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
          {t('how_it_works')}
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {t('how_it_works_desc')}
        </p>
      </div>

      <AnimatedFlow isVisible={startAnimation} />

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
