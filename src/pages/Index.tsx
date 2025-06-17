"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import LogoCloud from "@/components/LogoCloud";
import PathModal from "@/components/PathModal";
import AIGrid from "@/components/AIGrid";
import CryptoArbitrageSection from "@/components/CryptoArbitrageSection";
import FeatureGrid from "@/components/FeatureGrid";
import HeroDashboard from "@/components/HeroDashboard";
import Footer from "@/components/Footer";
import { ArrowRight, Brain, Zap, Bot, BarChart2, Wallet } from "lucide-react";
import ChatWidget from "@/components/chat/ChatWidget";
import ParticleBackground from "@/components/ParticleBackground";
import LiveMarketTicker from "@/components/LiveMarketTicker";
import { useChatContext } from "@/context/ChatContext";
import { useTranslation } from "react-i18next";


const Index = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [startAiFlowAnimation, setStartAiFlowAnimation] = React.useState(false);
  const { openChat } = useChatContext();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Check if user is visiting for the first time
  useEffect(() => {
    const hasVisited = localStorage.getItem('ruyaa-has-visited');
    if (!hasVisited) {
      localStorage.setItem('ruyaa-has-visited', 'true');
      navigate('/welcome');
    }
  }, [navigate]);

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
    <div
      className="relative min-h-screen bg-bg"
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <ParticleBackground />
      <Navbar />
      <LiveMarketTicker />
      
      <main className="pt-32 pb-20 w-full">
        {/* Hero Section */}
        <section className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 gap-12">
          {/* Modern AI Grid Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-950/95 to-black/90" />
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
            {/* Neural Network Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 600">
              <defs>
                <linearGradient id="heroAiGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ff9d" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#d4af37" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00ff9d" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path 
                d="M0,300 Q200,150 400,300 Q600,450 800,300" 
                stroke="url(#heroAiGlow)" 
                strokeWidth="1" 
                fill="none"
                className="animate-pulse-slow"
              />
              <path 
                d="M0,150 Q300,300 600,150 Q700,50 800,150" 
                stroke="url(#heroAiGlow)" 
                strokeWidth="0.8" 
                fill="none"
                className="animate-pulse-slow"
                style={{ animationDelay: '1.5s' }}
              />
              <circle cx="200" cy="200" r="3" fill="#00ff9d" opacity="0.4" className="animate-pulse" />
              <circle cx="600" cy="250" r="2" fill="#d4af37" opacity="0.3" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
            </svg>
          </div>
          {/* Left Side: Text content */}
          <div className="lg:w-1/2 text-center lg:text-start">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('hero_title_1')}{' '}
              <span className="text-green">{t('hero_title_2')}</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero_description')}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={handleStartNowClick}
                className="btn-ai-primary inline-flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('hero_button')}
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </motion.button>
            </div>
          </div>

          {/* Right Side: Dashboard */}
          <div className="lg:w-1/2 w-full mt-12 lg:mt-0">
            <HeroDashboard />
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="w-full max-w-6xl mx-auto mt-16 px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[
              { icon: () => <img src="/icons/gold-bars.svg" className="w-10 h-10" />, label: 'Open MT5 account' },
              { icon: BarChart2, label: 'Monitor + Learn' },
              { icon: Wallet, label: 'Withdraw Anytime' },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                onClick={() => {
                  if (idx === 0) navigate('/agents/mt4mt5');
                  if (idx === 2) document.getElementById('deposit-btn')?.click();
                }}
                className="ai-card ai-card-hover flex flex-col items-center cursor-pointer text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <step.icon className={`w-10 h-10 mb-4 ${idx % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                <p className="font-semibold text-white text-sm">{step.label}</p>
              </motion.div>
            ))}
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
                <Brain className="w-8 h-8 text-primary animate-pulse" />
                <h2 className="font-manrope text-4xl font-extrabold tracking-tight text-center text-gradient-ai">
                  Why Ruyaa AI Outperforms
                </h2>
                <Zap className="w-8 h-8 text-secondary animate-pulse" />
              </div>
              <p className="text-gray-300 text-lg flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Our intelligent features work while you sleep
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
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
