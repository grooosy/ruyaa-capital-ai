import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import LogoCloud from "@/components/LogoCloud";
import PathModal from "@/components/PathModal";
import AIGrid from "@/components/AIGrid";
import CryptoArbitrageSection from "@/components/CryptoArbitrageSection";
import FeatureGrid from "@/components/FeatureGrid";
import HeroDashboard from "@/components/HeroDashboard";
import { ArrowRight } from "lucide-react";
import ChatWidget from "@/components/chat/ChatWidget";
import ParticleBackground from "@/components/ParticleBackground";
import MarketGrid from "@/components/MarketGrid";
import { useTranslation } from "react-i18next";

const Index = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [startAiFlowAnimation, setStartAiFlowAnimation] = React.useState(false);
  const { t } = useTranslation();

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
              {t('hero_title_1')}{' '}
              <span className="text-gold">
                {t('hero_title_2')}
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero_description')}
            </p>

            <motion.button
              onClick={handleStartNowClick}
              className="bg-gold text-dark-charcoal px-8 py-4 rounded-xl text-lg font-bold shadow-gold-glow hover:bg-gold/90 transition-all duration-300 tracking-wide inline-flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('hero_button')}
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </motion.button>
          </div>

          {/* Right Side: Market Grid */}
          <div className="lg:w-1/2 w-full mt-12 lg:mt-0 flex items-center justify-center">
            <MarketGrid />
          </div>
        </section>

        {/* Feature Grid & Logo Cloud */}
        <section className="w-full items-center text-center py-16 mt-12 bg-gradient-to-tr from-black/20 via-transparent to-black/20 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-50 -z-10" />
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center px-6">
            <div className="mb-12">
              <h2 className="font-manrope text-4xl font-extrabold tracking-tight text-center mb-4 text-gradient-ai">Why Ruyaa AI Outperforms</h2>
              <p className="text-neutral-300">Our intelligent features work while you sleep.</p>
            </div>
            <div className="mb-16">
              <FeatureGrid />
            </div>
            <LogoCloud />
          </div>
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
