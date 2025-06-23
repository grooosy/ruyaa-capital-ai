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
import BackgroundCanvas from "@/components/BackgroundCanvas";
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
      color: "#f5c518"
    },
    {
      icon: Zap,
      title: "Real-Time Execution",
      description: "Lightning-fast trade execution with minimal latency",
      color: "#f5c518"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Intelligent risk assessment and portfolio protection",
      color: "#f5c518"
    },
    {
      icon: TrendingUp,
      title: "Predictive Insights",
      description: "Machine learning models predict market movements",
      color: "#f5c518"
    }
  ];

  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundCanvas />
      <div className="relative z-10 min-h-screen bg-black text-gray-100" dir={isArabic ? "rtl" : "ltr"}>
        <div className="relative">
          <Navbar />
          <div className="absolute top-20 left-20 w-3 h-3 bg-white/80 rounded-full animate-pulse" />
          <div className="absolute top-40 right-32 w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
          
          <div className="max-w-7xl mx-auto px-6 text-center">
            {/* AI Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Brain className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
              <span className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">AI-POWERED TRADING PLATFORM</span>
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
              <span className="text-gold">{t('hero_title_2')}</span>
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
                className="group relative overflow-hidden rounded-full bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-medium text-white transition-all hover:bg-white/20 hover:shadow-lg hover:shadow-white/5"
              >
                <span className="relative z-10 flex items-center">
                  {t('hero_button')}
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -z-10 bg-white/15 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
              
              <button 
                onClick={() => openChat('support')}
                className="group relative overflow-hidden rounded-full border border-white/20 bg-transparent px-8 py-4 text-lg font-medium text-white transition-all hover:bg-white/5 hover:shadow-lg hover:shadow-white/5"
              >
                <span className="relative z-10 flex items-center">
                  Talk to AI Assistant
                  <Brain className="ml-3 h-6 w-6 transition-transform group-hover:scale-110" />
                </span>
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
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold lg:text-5xl font-space-grotesk">
              <span className="text-white">Powered by </span>
              <span className="text-gold">Advanced AI</span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Our cutting-edge artificial intelligence analyzes markets, executes trades, and manages risk with superhuman precision.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 text-center backdrop-blur-sm transition-all hover:bg-white/10 hover:shadow-xl hover:shadow-white/5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative z-10">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
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
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Monitor your AI-powered trading performance with live market data and intelligent insights.
            </p>
          </motion.div>
          <HeroDashboard />
        </div>
      </section>

      {/* Crypto Arbitrage Section */}
      <section className="py-20">
        <CryptoArbitrageSection />
      </section>

      <Footer />
      
      {/* Path Modal */}
      <PathModal open={showPathModal} onClose={() => setShowPathModal(false)} />
    </div>
  );
};

export default Index;