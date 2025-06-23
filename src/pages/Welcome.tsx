import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Brain, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 circuit-pattern opacity-10" />
      <div className="absolute inset-0 hex-pattern opacity-5" />
      
      {/* Neural Network Nodes */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-gold rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-32 w-2 h-2 bg-gold rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-gold rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 lg:px-12 gap-12">
        {/* Left Content */}
        <motion.div 
          className="flex-1 max-w-2xl text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* AI Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Brain className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-[#e6e6e6]">AI-POWERED PLATFORM</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold font-space-grotesk leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white">RUYAA</span>
            <br />
            <span className="text-gradient-ai">AI TRADING</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl lg:text-2xl text-[#e6e6e6] mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Stateful trading with <span className="text-gold font-semibold">Agentic AI</span>
            <br />
            Automated decisions, real-time visualization, and instant feedback
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/agents" className="btn-ai-primary group">
              <span>Start Trading</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link to="/academy" className="btn-ai-secondary group">
              <span>Learn More</span>
              <TrendingUp className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">85%+</div>
              <div className="text-sm text-[#e6e6e6]">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">24/7</div>
              <div className="text-sm text-[#e6e6e6]">Active Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">10K+</div>
              <div className="text-sm text-[#e6e6e6]">Active Traders</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - AI Chart Visualization */}
        <motion.div 
          className="flex-1 max-w-2xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            {/* Main Chart Container */}
            <div className="ai-card ai-card-hover p-8">
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gold rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-[#e6e6e6]">LIVE TRADING</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gold" />
                  <span className="text-xs text-gold font-medium">AI ACTIVE</span>
                </div>
              </div>

              {/* Chart Image */}
              <div className="relative rounded-lg overflow-hidden border border-gold/20">
                <img
                  src="/public/assets/hero_ai_chart.png"
                  alt="AI Trading Chart"
                  className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Overlay Elements */}
                <div className="absolute top-4 left-4 bg-gold/20 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="text-xs text-gold font-medium">EUR/USD</div>
                  <div className="text-sm text-white font-bold">1.0847</div>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-gold/20 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="text-xs text-gold font-medium">AI Signal</div>
                  <div className="text-sm text-white font-bold">BUY +2.3%</div>
                </div>
              </div>

              {/* Chart Footer */}
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-[#e6e6e6]">Position Opened</span>
                <span className="text-gold font-medium">+$247.50</span>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-gold/20 rounded-full border border-gold/30"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-gold/20 rounded-full border border-gold/30"
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-black" />
    </div>
  );
};

export default WelcomePage;