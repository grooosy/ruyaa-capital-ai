
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import LogoCloud from "@/components/LogoCloud";
import PathModal from "@/components/PathModal";
import AIGrid from "@/components/AIGrid";
import CryptoArbitrageSection from "@/components/CryptoArbitrageSection";
import FeatureGrid from "@/components/FeatureGrid";
import HeroDashboard from "@/components/HeroDashboard";
import Footer from "@/components/Footer";
import { ArrowRight, Brain, Zap } from "lucide-react";
import ChatWidget from "@/components/chat/ChatWidget";
import ParticleBackground from "@/components/ParticleBackground";
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

          {/* Right Side: Dashboard */}
          <div className="lg:w-1/2 w-full mt-12 lg:mt-0">
            <HeroDashboard />
          </div>
        </section>

        {/* Enhanced AI Features Section */}
        <section className="w-full items-center text-center py-16 mt-12 relative">
          {/* Advanced AI Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-green/5 to-black/80" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
          
          {/* Animated Neural Network Lines */}
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
              <defs>
                <linearGradient id="aiGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10A169" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#CFA100" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#10A169" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path 
                d="M0,400 Q300,200 600,400 Q900,600 1200,400" 
                stroke="url(#aiGlow)" 
                strokeWidth="1" 
                fill="none"
                className="animate-pulse-slow"
              />
              <path 
                d="M0,200 Q400,400 800,200 Q1000,0 1200,200" 
                stroke="url(#aiGlow)" 
                strokeWidth="0.5" 
                fill="none"
                className="animate-pulse-slow"
                style={{ animationDelay: '1s' }}
              />
            </svg>
          </div>

          <div className="w-full max-w-5xl mx-auto flex flex-col items-center px-6 relative z-10">
            <div className="mb-12">
              {/* Enhanced Title with AI Elements */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="w-8 h-8 text-green animate-pulse" />
                <h2 className="font-manrope text-4xl font-extrabold tracking-tight text-center text-white">
                  Why Ruyaa AI Outperforms
                </h2>
                <Zap className="w-8 h-8 text-gold animate-pulse" />
              </div>
              <p className="text-gray-300 text-lg flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
                Our intelligent features work while you sleep
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              </p>
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

      {/* Professional Footer */}
      <Footer />

      {/* Path Selection Modal */}
      <PathModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;
