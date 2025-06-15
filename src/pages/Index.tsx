
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import LogoCloud from "@/components/LogoCloud";
import PathModal from "@/components/PathModal";
import AIGrid from "@/components/AIGrid";
import CryptoArbitrageSection from "@/components/CryptoArbitrageSection";
import FeatureHighlights from "@/components/FeatureHighlights";

const Index = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen bg-bg">
      <Navbar />
      
      <main className="pt-32 pb-20 flex flex-col items-center w-full">
        {/* Hero Section */}
        <section className="w-full max-w-4xl mx-auto flex flex-col items-center text-center px-6">
          {/* Main Headline */}
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
            Open a Verified{" "}
            <span className="text-green bg-gradient-to-r from-green to-green/80 bg-clip-text text-transparent">
              MT4 / MT5
            </span>{" "}
            or{" "}
            <span className="text-gold bg-gradient-to-r from-gold to-gold/80 bg-clip-text text-transparent">
              Crypto
            </span>{" "}
            Account in 1 Minute.
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-12 max-w-3xl leading-relaxed">
            Trade Gold, Nasdaq or Bitcoin with Your Personal AI.
          </p>
          
          {/* Feature Highlights */}
          <div className="mb-12">
            <FeatureHighlights />
          </div>
          
          {/* Official Logos */}
          <LogoCloud />
        </section>

        {/* AI Agents Showcase */}
        <AIGrid />

        {/* CTA Section */}
        <section className="w-full max-w-4xl mx-auto flex flex-col items-center text-center px-6 pt-20">
          <motion.button
            onClick={() => setModalOpen(true)}
            className="bg-green text-[#181711] px-10 py-4 rounded-2xl text-xl font-bold shadow-green-glow hover:shadow-lg transition-all duration-300 tracking-wide"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "linear-gradient(135deg, #16C784 0%, #14B574 100%)",
              boxShadow: "0 8px 32px rgba(22, 199, 132, 0.3)"
            }}
          >
            Open Account Now
          </motion.button>
        </section>

        {/* Crypto Arbitrage Section */}
        <CryptoArbitrageSection />

      </main>

      {/* Path Selection Modal */}
      <PathModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;
