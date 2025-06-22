import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Zap, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureGrid from "@/components/FeatureGrid";
import AIGrid from "@/components/AIGrid";
import CryptoArbitrageSection from "@/components/CryptoArbitrageSection";
import HeroDashboard from "@/components/HeroDashboard";
import LogoCloud from "@/components/LogoCloud";
import PathModal from "@/components/PathModal";
import { useChatContext } from "@/context/ChatContext";
import { useTranslation } from "react-i18next";

const Index = () => {
  const [showPathModal, setShowPathModal] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const { openChat } = useChatContext();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  React.useEffect(() => {
    const timer = setTimeout(() => setStartAnimation(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced neural networks analyze market patterns 24/7",
      color: "#00b4d8"
    },
    {
      icon: Zap,
      title: "Real-Time Execution",
      description: "Lightning-fast trade execution with minimal latency",
      color: "#bf00ff"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Intelligent risk assessment and portfolio protection",
      color: "#00b4d8"
    },
    {
      icon: TrendingUp,
      title: "Predictive Insights",
      description: "Machine learning models predict market movements",
      color: "#bf00ff"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white" dir={isArabic ? "rtl" : "ltr"}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 circuit-pattern opacity-10" />
        <div className="absolute top-20 left-20 w-4 h-4 bg-[#00b4d8] rounded-full animate-pulse opacity-60" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-[#bf00ff] rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-3.5 h-3.5 bg-[#00b4d8] rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* AI Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00b4d8]/20 to-[#bf00ff]/20 border border-[#00b4d8]/30 rounded-full mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Brain className="w-5 h-5 text-[#00b4d8]" />
            <span className="text-lg font-medium text-[#e6e6e6]">AI-POWERED TRADING PLATFORM</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-6xl lg:text-8xl font-bold font-space-grotesk leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">{t('hero_title_1')}</span>
            <br />
            <span className="text-gradient-ai">{t('hero_title_2')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-2xl lg:text-3xl text-[#e6e6e6] mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('hero_description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              onClick={() => setShowPathModal(true)}
              className="btn-ai-primary group text-xl px-8 py-4"
            >
              <span>{t('hero_button')}</span>
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => openChat('support')}
              className="btn-ai-secondary group text-xl px-8 py-4"
            >
              <span>Talk to AI Assistant</span>
              <Brain className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>

          {/* Logo Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <LogoCloud />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-space-grotesk mb-6">
              <span className="text-white">Powered by </span>
              <span className="text-gradient-ai">Advanced AI</span>
            </h2>
            <p className="text-xl text-[#e6e6e6] max-w-3xl mx-auto">
              Our cutting-edge artificial intelligence analyzes markets, executes trades, and manages risk with superhuman precision.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="ai-card ai-card-hover text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${feature.color}20`, border: `1px solid ${feature.color}30` }}
                >
                  <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-[#e6e6e6]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold font-space-grotesk mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-white">Complete Trading </span>
            <span className="text-gradient-ai">Ecosystem</span>
          </motion.h2>
          <FeatureGrid />
        </div>
      </section>

      {/* AI Grid */}
      <AIGrid startAnimation={startAnimation} />

      {/* Hero Dashboard */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-space-grotesk mb-6">
              <span className="text-white">Real-Time </span>
              <span className="text-gradient-ai">AI Dashboard</span>
            </h2>
            <p className="text-xl text-[#e6e6e6] max-w-3xl mx-auto">
              Monitor your AI-powered trading performance with live market data and intelligent insights.
            </p>
          </motion.div>
          <HeroDashboard />
        </div>
      </section>

      {/* Crypto Arbitrage Section */}
      <CryptoArbitrageSection />

      <Footer />
      
      {/* Path Modal */}
      <PathModal open={showPathModal} onClose={() => setShowPathModal(false)} />
    </div>
  );
};

export default Index;