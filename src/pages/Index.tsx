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

  const handleStartNowClick = () => {
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

  return (
    <div
      className="relative min-h-screen bg-gray-900"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <ParticleBackground />
      <Navbar />
      <LiveMarketTicker />

      <main className="pt-32 pb-20 w-full">
        {/* Hero Section */}
        <section className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 gap-12">
          {/* Enhanced Modern Dark Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-pulse-slow" />

            {/* Moving geometric lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20"
              viewBox="0 0 800 600"
            >
              <defs>
                <linearGradient
                  id="heroGlow"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#FFA500" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Animated flowing paths */}
              <motion.path
                d="M0,300 Q200,150 400,300 Q600,450 800,300"
                stroke="url(#heroGlow)"
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

              {/* Geometric nodes */}
              <motion.circle
                cx="200"
                cy="200"
                r="3"
                fill="#FFD700"
                opacity="0.4"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.circle
                cx="600"
                cy="250"
                r="2"
                fill="#FFA500"
                opacity="0.3"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              />
            </svg>

            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-yellow-500/30"
                  style={{
                    left: `${15 + i * 12}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.6, 0.3],
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
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl animate-pulse-slow" />
            <div
              className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl animate-pulse-slow"
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* Left Side: Text content */}
          <div className="lg:w-1/2 text-center lg:text-start">
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t("hero_title_1")}{" "}
              <span className="text-gradient-accent">{t("hero_title_2")}</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-yellow-500 font-semibold">
                It works while you sleep.
              </span>{" "}
              We make it do things for you, not only reply to you.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                onClick={handleStartNowClick}
                className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300 inline-flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Open Account • Start Now
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </motion.button>

              <motion.button
                onClick={() => openChat(null)}
                className="bg-gray-800 border border-gray-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-700 hover:border-gray-500 hover:scale-102 transition-all duration-300 inline-flex items-center gap-2 relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Bot className="w-5 h-5" />
                Ask Ruyaa AI
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side: Dashboard */}
          <motion.div 
            className="lg:w-1/2 w-full mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <HeroDashboard />
          </motion.div>
        </section>

        {/* Enhanced Features Section */}
        <section className="w-full items-center text-center py-16 mt-12 relative">
          {/* Dark background */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />

          {/* Subtle animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/10 rounded-full"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.3, 0.1],
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

          <div className="w-full max-w-5xl mx-auto flex flex-col items-center px-6 relative z-10">
            <div className="mb-12">
              {/* Enhanced Title */}
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
                  <Brain className="w-10 h-10 text-yellow-500" />
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
                  <Zap className="w-10 h-10 text-yellow-500" />
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