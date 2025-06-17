import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '@/components/ParticleBackground';

const WelcomePage: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ar'>('en');
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Start showing content after a brief delay
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-switch between languages
    const interval = setInterval(() => {
      setCurrentLanguage(prev => prev === 'en' ? 'ar' : 'en');
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    navigate('/auth');
  };

  const welcomeText = {
    en: {
      hello: "Hello",
      welcome: "Welcome to RuyaaCapital-AI",
      subtitle: "Where you feel the power of AI with real benefits",
      continue: "Continue"
    },
    ar: {
      hello: "مرحباً",
      welcome: "مرحباً بك في رؤيا كابيتال-AI",
      subtitle: "حيث تشعر بقوة الذكاء الاصطناعي مع فوائد حقيقية",
      continue: "متابعة"
    }
  };

  const currentText = welcomeText[currentLanguage];

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] font-spacegrotesk overflow-hidden" dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
      <ParticleBackground />
      
      {/* AI Neural Network Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="neuralGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10A169" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#CFA100" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10A169" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Animated neural network paths */}
          <motion.path
            d="M100,400 Q300,200 600,400 Q900,600 1100,400"
            stroke="url(#neuralGlow)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.path
            d="M200,600 Q500,300 800,600 Q1000,400 1200,600"
            stroke="url(#neuralGlow)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
          
          {/* Neural nodes */}
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={i}
              cx={150 + i * 140}
              cy={300 + Math.sin(i) * 200}
              r="4"
              fill="#10A169"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
            />
          ))}
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* AI Icon with Glow Effect */}
              <motion.div
                className="relative mb-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green to-green rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="relative w-24 h-24 mx-auto bg-gradient-to-r from-green to-green rounded-full flex items-center justify-center">
                    <Brain className="w-12 h-12 text-[#0D0D0D]" />
                  </div>
                </div>
              </motion.div>

              {/* Hello Text with Language Animation */}
              <motion.div
                className="mb-6"
                key={currentLanguage}
                initial={{ opacity: 0, x: currentLanguage === 'ar' ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: currentLanguage === 'ar' ? -50 : 50 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green to-green mb-4">
                  {currentText.hello}
                </h1>
              </motion.div>

              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  {currentText.welcome}
                </h2>
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                  {currentText.subtitle}
                </p>
              </motion.div>

              {/* AI Features Showcase */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex items-center justify-center gap-8 mb-12"
              >
                {[
                  { icon: Sparkles, label: currentLanguage === 'ar' ? 'ذكي' : 'Smart' },
                  { icon: Zap, label: currentLanguage === 'ar' ? 'سريع' : 'Fast' },
                  { icon: Brain, label: currentLanguage === 'ar' ? 'قوي' : 'Powerful' }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-green/20 to-green/20 rounded-full flex items-center justify-center border border-green/30">
                      <feature.icon className="w-8 h-8 text-green" />
                    </div>
                    <span className="text-sm text-gray-400 font-medium">{feature.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Continue Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <Button
                  onClick={handleContinue}
                  className="group relative px-12 py-6 text-xl font-bold bg-green hover:bg-green/90 text-[#0D0D0D] rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {currentText.continue}
                    <ArrowRight className={`w-6 h-6 transition-transform group-hover:translate-x-1 ${currentLanguage === 'ar' ? 'rotate-180' : ''}`} />
                  </span>
                  
                  {/* Button glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-green rounded-2xl blur-xl opacity-50"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </Button>
              </motion.div>

              {/* Floating AI Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-green/40 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 2) * 40}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
    </div>
  );
};

export default WelcomePage;