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
    const hasVisited = localStorage.getItem("ruyaa-has-visited");
    if (!hasVisited) {
      localStorage.setItem("ruyaa-has-visited", "true");
      navigate("/welcome");
    }
  }, [navigate]);

  const handleSeeHowClick = () => {
    const aiSection = document.getElementById("ai");
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (!startAiFlowAnimation) {
      setTimeout(() => {
        setStartAiFlowAnimation(true);
      }, 300);
    }
  };

  const handleStartTrading = () => {
    navigate("/deposit?tab=deposit");
  };

  return (
    <div
      className="relative min-h-screen bg-bg"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <ParticleBackground />
      {/* Soft candlestick wallpaper */}
      <img
        src="/candles.svg"
        alt="candlestick background"
        className="pointer-events-none absolute inset-0 -z-20 w-full h-full object-cover opacity-10"
      />
      <Navbar />
      <LiveMarketTicker />

      <main className="pt-32 pb-20 w-full">
        {/* Hero Section */}
        <section className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 gap-12">
          <img
            src="/lovable-uploads/4fc94ce9-7009-46fc-ad4b-ed3edffc3240.png"
            alt="RuyaaCapital.AI logo"
            className="absolute top-0 left-0 w-32 md:w-40 opacity-80"
          />
          {/* Enhanced Modern AI Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-gray-950/90 to-black/95" />

            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] animate-pulse-slow" />

            {/* Moving neural network lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30"
              viewBox="0 0 800 600"
            >
              <defs>
                <linearGradient
                  id="heroAiGlow"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00C896" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#7FFF00" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00C896" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient
                  id="heroAiGlow2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#7FFF00" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#00C896" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#7FFF00" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Animated flowing paths */}
              <motion.path
                d="M0,300 Q200,150 400,300 Q600,450 800,300"
                stroke="url(#heroAiGlow)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse-slow"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.path
                d="M0,150 Q300,300 600,150 Q700,50 800,150"
                stroke="url(#heroAiGlow2)"
                strokeWidth="1.5"
                fill="none"
                className="animate-pulse-slow"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1.5,
                }}
              />

              {/* Pulsing neural nodes */}
              <motion.circle
                cx="200"
                cy="200"
                r="4"
                fill="#00C896"
                opacity="0.6"
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.circle
                cx="600"
                cy="250"
                r="3"
                fill="#FFB800"
                opacity="0.5"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              />
              <motion.circle
                cx="400"
                cy="400"
                r="2"
                fill="#00C896"
                opacity="0.4"
                animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2,
                }}
              />
            </svg>

            {/* Floating AI particles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full ${i % 2 === 0 ? "bg-primary/40" : "bg-secondary/40"}`}
                  style={{
                    left: `${15 + i * 12}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Subtle glow effects */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
            <div
              className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-pulse-slow"
              style={{ animationDelay: "2s" }}
            />
          </div>
          {/* Left Side: Text content */}
          <div className="lg:w-1/2 text-center lg:text-start">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t("hero_title_1")}{" "}
              <span className="text-primary">{t("hero_title_2")}</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t("hero_description")}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={handleStartTrading}
                className="btn-ai-primary inline-flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("hero_button")}
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </motion.button>

              <motion.button
                onClick={() => openChat(null)}
                className="btn-ai-secondary inline-flex items-center gap-2 relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Bot className="w-5 h-5" />
                Ask Ruyaa AI
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              <motion.button
                onClick={handleSeeHowClick}
                className="btn-ai-secondary inline-flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See How It Works
              </motion.button>
            </div>
          </div>

          {/* Right Side: Dashboard */}
          <div className="lg:w-1/2 w-full mt-12 lg:mt-0">
            <HeroDashboard />
          </div>
        </section>

        {/* Enhanced AI Features Section */}
        <section className="w-full items-center text-center py-16 mt-12 relative">
          {/* Advanced AI Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-gray-950/50 to-black/90" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

          {/* Subtle animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
              />
            ))}
          </div>

          {/* Animated Neural Network Lines */}
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1200 800"
            >
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
                style={{ animationDelay: "1s" }}
              />
            </svg>
          </div>

          <div className="w-full max-w-5xl mx-auto flex flex-col items-center px-6 relative z-10">
            <div className="mb-12">
              {/* Enhanced Title with AI Elements */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Brain className="w-10 h-10 text-primary" />
                </motion.div>

                <h2 className="font-spacegrotesk text-5xl font-bold tracking-tight text-center bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Why Ruyaa AI Outperforms
                </h2>

                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Zap className="w-10 h-10 text-secondary" />
                </motion.div>
              </div>

              <motion.p
                className="text-gray-400 text-lg text-center max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Our intelligent features work while you sleep
              </motion.p>
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
