
import React from "react";
import ProcessTimeline from "@/components/ProcessTimeline";
import ArbitrageTicker from "@/components/ArbitrageTicker";

const CryptoArbitrageSection: React.FC = () => {
  return (
    <section
      id="arbitrage"
      className="w-full mt-24"
      style={{ scrollMarginTop: 120 }}
    >
      <div className="mb-12 flex flex-col items-center gap-2 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">
          Crypto Arbitrage Flow
        </h2>
        <span className="text-green text-lg uppercase font-semibold tracking-widest">
          Institutional Process, Automated
        </span>
      </div>
      
      {/* LIVE MARKET MOVING TICKER */}
      <ArbitrageTicker />
      
      {/* TIMELINE */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <ProcessTimeline />
      </div>
    </section>
  );
};

export default CryptoArbitrageSection;
