
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap } from 'lucide-react';

const WhoAreWeCorner = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100, y: -20 }}
      animate={{ 
        opacity: hasAnimated ? 1 : 0, 
        x: hasAnimated ? 0 : -100, 
        y: hasAnimated ? 0 : -20 
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.5 
      }}
      className="fixed top-4 left-4 z-50"
    >
      <motion.div
        className={`bg-[#1A1A1A]/90 backdrop-blur-md rounded-xl border border-green-400/20 overflow-hidden transition-all duration-300 ${
          isExpanded ? 'w-80' : 'w-32'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="p-3">
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Brain className="w-5 h-5 text-green-400" />
            <span className="text-white font-semibold text-sm">Who ARE WE</span>
            <Zap className="w-4 h-4 text-gold animate-pulse" />
          </motion.div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="mt-3 pt-3 border-t border-green-400/20"
              >
                <p className="text-gray-300 text-xs leading-relaxed mb-2">
                  RuyaACapital-Ai pioneers autonomous trading with cutting-edge AI agents.
                </p>
                <p className="text-green-400 text-xs font-medium">
                  It works while you sleep.
                </p>
                <motion.div 
                  className="mt-2 h-1 bg-gradient-to-r from-green-400 to-gold rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WhoAreWeCorner;
