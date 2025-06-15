
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import LogoCloud from "@/components/LogoCloud";
import PathModal from "@/components/PathModal";
import AIGrid from "@/components/AIGrid";
import CryptoArbitrageSection from "@/components/CryptoArbitrageSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import HeroDashboard from "@/components/HeroDashboard";
import { ArrowRight } from "lucide-react";
import ChatWidget from "@/components/chat/ChatWidget";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [startAiFlowAnimation, setStartAiFlowAnimation] = React.useState(false);

  const handleStartNowClick = () => {
    const aiSection = document.getElementById('ai');
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (!startAiFlowAnimation) {
      setTimeout(() => {
        setStartAiFlowAnimation(true);
      }, 300);
    }
  };

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      
      <main className="pt-32 pb-20 w-full">
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:rtl:flex-row-reverse items-center justify-between px-6 gap-12">
          {/* Left Side: Text content */}
          <div className="lg:w-1/2 text-center lg:text-start">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your 24/7 AI-driven{' '}
              <span className="text-gold">
                trading assistant and broker connector
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We're not a trading platform. We're a broker connector, offering smart AI tools, signal systems, portfolio feedback, and education with tiered access.
            </p>

            <motion.button
              onClick={handleStartNowClick}
              className="bg-gold text-dark-charcoal px-8 py-4 rounded-xl text-lg font-bold shadow-gold-glow hover:bg-gold/90 transition-all duration-300 tracking-wide inline-flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Open Account • Start Now
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </motion.button>
          </div>

          {/* Right Side: Dashboard */}
          <div className="lg:w-1/2 w-full mt-12 lg:mt-0">
            <HeroDashboard />
          </div>
        </section>

        {/* Feature Highlights & Logo Cloud moved below hero */}
        <section className="w-full max-w-5xl mx-auto flex flex-col items-center text-center px-6 pt-24 pb-12">
          <div className="mb-16">
            <FeatureHighlights />
          </div>
          <LogoCloud />
        </section>


        {/* AI Agents Showcase */}
        <AIGrid startAnimation={startAiFlowAnimation} />

        {/* Crypto Arbitrage Section */}
        <CryptoArbitrageSection />

      </main>

      {/* Path Selection Modal */}
      <PathModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;
