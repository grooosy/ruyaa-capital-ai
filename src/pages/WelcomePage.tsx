// WelcomePage presents a brief animated introduction in both English and Arabic
// using modern motion effects and dark, AI-themed visuals.
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Brain, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import FuturisticBackground from "@/components/FuturisticBackground";

const WelcomePage: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "ar">("en");
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
      setCurrentLanguage((prev) => (prev === "en" ? "ar" : "en"));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    navigate("/auth");
  };

  const welcomeText = {
    en: {
      hello: "Hello",
      welcome: "Welcome to RuyaaCapital-AI",
      subtitle: "Where you feel the power of AI with real benefits",
      continue: "Continue",
    },
    ar: {
      hello: "مرحباً",
      welcome: "مرحباً بك في رؤيا كابيتال-AI",
      subtitle: "حيث تشعر بقوة الذكاء الاصطناعي مع فوائد حقيقية",
      continue: "متابعة",
    },
  };

  const currentText = welcomeText[currentLanguage];

  return (
    <div
      className="relative min-h-screen bg-[#0D0D0D] font-spacegrotesk overflow-hidden"
      dir={currentLanguage === "ar" ? "rtl" : "ltr"}
    >
      <FuturisticBackground />
      <ParticleBackground />

      {/* Enhanced AI Neural Network Background */}
      <div className="absolute inset-0 opacity-25">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="neuralGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A86B" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#B8860B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00A86B" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient
              id="neuralGlow2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#B8860B" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#00A86B" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#B8860B" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="neuralGlow3"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00A86B" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00A86B" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Multiple animated neural network paths */}
          <motion.path
            d="M100,400 Q300,200 600,400 Q900,600 1100,400"
            stroke="url(#neuralGlow)"
            strokeWidth="2.5"
            fill="none"
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
            d="M200,600 Q500,300 800,600 Q1000,400 1200,600"
            stroke="url(#neuralGlow2)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />
          <motion.path
            d="M0,200 Q400,100 800,200 Q1000,300 1200,200"
            stroke="url(#neuralGlow3)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2,
            }}
          />

          {/* Enhanced neural nodes with pulsing animation */}
          {[...Array(12)].map((_, i) => (
            <motion.circle
              key={i}
              cx={100 + i * 100}
              cy={250 + Math.sin(i * 0.8) * 150}
              r={3 + (i % 3)}
              fill={i % 2 === 0 ? "#00A86B" : "#B8860B"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                delay: i * 0.3,
                duration: 3 + (i % 2),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Flowing connection lines */}
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={150 + i * 180}
              y1={200 + Math.sin(i) * 100}
              x2={250 + i * 180}
              y2={400 + Math.cos(i) * 100}
              stroke={i % 2 === 0 ? "#00A86B" : "#B8860B"}
              strokeWidth="1"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          ))}
        </svg>

        {/* Additional floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className={`absolute w-1 h-1 rounded-full ${i % 3 === 0 ? "bg-emerald-500/40" : i % 3 === 1 ? "bg-gold/40" : "bg-emerald-500/30"}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
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
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/70 to-emerald-700/50 rounded-full blur-xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gold/40 to-emerald-600/40 rounded-full blur-2xl"
                    animate={{
                      scale: [1.2, 1.5, 1.2],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                  <div className="relative w-24 h-24 mx-auto bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center shadow-2xl">
                    <Brain className="w-12 h-12 text-[#0D0D0D]" />
                  </div>
                </div>
              </motion.div>

              {/* Hello Text with Language Animation */}
              <motion.div
                className="mb-6 perspective-1000"
                key={currentLanguage}
                initial={{ opacity: 0, rotateX: -45, x: currentLanguage === "ar" ? 50 : -50 }}
                animate={{ opacity: 1, rotateX: 0, x: 0 }}
                exit={{ opacity: 0, rotateX: 45, x: currentLanguage === "ar" ? -50 : 50 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 mb-4 drop-shadow-lg">
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
                  {
                    icon: Sparkles,
                    label: currentLanguage === "ar" ? "ذكي" : "Smart",
                  },
                  {
                    icon: Zap,
                    label: currentLanguage === "ar" ? "سريع" : "Fast",
                  },
                  {
                    icon: Brain,
                    label: currentLanguage === "ar" ? "قوي" : "Powerful",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-emerald-600/20 to-emerald-600/20 rounded-full flex items-center justify-center border border-emerald-600/30 relative overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(0, 168, 107, 0.2)",
                          "0 0 0 10px rgba(0, 168, 107, 0)",
                          "0 0 0 0 rgba(0, 168, 107, 0.2)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-600/10 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          delay: index * 0.3,
                        }}
                      />
                      <feature.icon className="w-8 h-8 text-emerald-500 relative z-10" />
                    </motion.div>
                    <span className="text-sm text-gray-400 font-medium">
                      {feature.label}
                    </span>
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
                  className="group relative px-12 py-6 text-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-[#0D0D0D] rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {currentText.continue}
                    <ArrowRight
                      className={`w-6 h-6 transition-transform group-hover:translate-x-1 ${currentLanguage === "ar" ? "rotate-180" : ""}`}
                    />
                  </span>

                  {/* Button glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-emerald-600 rounded-2xl blur-xl opacity-50"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </Button>
              </motion.div>

              {/* Floating AI Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-emerald-500/40 rounded-full"
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
