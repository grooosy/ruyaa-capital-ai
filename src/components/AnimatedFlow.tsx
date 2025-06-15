import React from 'react';
import { motion } from 'framer-motion';
import { Key, Scale, Download, Bot } from 'lucide-react';

const flowSteps = [
  { icon: Key, description: "Sign in to Ruyaa" },
  { icon: Scale, description: "Choose your path: Gold/Forex or Crypto" },
  { icon: Download, description: "Enter your info + deposit amount" },
  { icon: Bot, description: "Start trading smarter with Ruyaa AI — Not Alone" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const AnimatedFlow: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="mb-16 mt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="AI process flow"
    >
      <div className="relative flex flex-col md:flex-row items-stretch justify-center gap-y-8 md:gap-x-4">
        {flowSteps.map((step, index) => (
          <React.Fragment key={step.description}>
            <motion.div className="flex flex-col items-center text-center px-4 md:flex-1" variants={itemVariants}>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gold/50 bg-card flex items-center justify-center mb-4 shadow-gold-glow shrink-0">
                <step.icon className="w-8 h-8 md:w-10 md:h-10 text-gold" />
              </div>
              <p className="font-semibold text-white text-sm md:text-base leading-snug max-w-[200px]">{step.description}</p>
            </motion.div>

            {index < flowSteps.length - 1 && (
              <motion.div 
                className="self-center flex items-center"
                variants={itemVariants}
              >
                <div className="block md:hidden w-px h-8 bg-gradient-to-b from-gold/50 to-gold/0" />
                <div className="hidden md:block h-px w-8 lg:w-16 bg-gradient-to-r from-gold/50 to-gold/0" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedFlow;
