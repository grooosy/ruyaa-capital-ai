import React, { useState } from "react";
import { motion } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import AuthCard from "@/components/AuthCard";
import { Brain, Sparkles, Shield, Zap } from "lucide-react";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] font-spacegrotesk">
      <ParticleBackground />
      <Navbar />
      
      {/* AI Neural Network Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="authNeuralGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10A169" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#CFA100" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,400 Q300,200 600,400 Q900,600 1200,400"
            stroke="url(#authNeuralGlow)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />
        </svg>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Welcome Message */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            {/* AI Icon */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green to-gold rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative w-16 h-16 bg-gradient-to-r from-green to-gold rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-[#0A0A0A]" />
                </div>
              </div>
            </motion.div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Sign up for <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-gold">free</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
              To call you by <span className="text-gold">Your name</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of traders who trust RuyaaCapital-AI for intelligent trading solutions powered by advanced artificial intelligence.
            </p>

            {/* AI Features */}
            <div className="space-y-4 mb-8">
              {[
                { icon: Sparkles, text: "AI-Powered Trading Signals", color: "text-green" },
                { icon: Shield, text: "Secure & Regulated Platform", color: "text-gold" },
                { icon: Zap, text: "Real-time Market Analysis", color: "text-green" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-green/20 to-gold/20 rounded-full flex items-center justify-center border border-green/30">
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <span className="text-gray-300 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex items-center gap-6 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green rounded-full animate-pulse" />
                <span>10,000+ Active Traders</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span>85%+ Signal Accuracy</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green/30 rounded-full"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${20 + i * 15}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-md"
          >
            <AuthCard />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;