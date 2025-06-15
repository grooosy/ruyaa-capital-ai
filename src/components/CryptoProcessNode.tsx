
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CryptoProcessNodeProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  index: number;
}

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.4,
      duration: 0.5,
      type: 'spring',
      stiffness: 100,
    },
  }),
};

const CryptoProcessNode: React.FC<CryptoProcessNodeProps> = ({ icon: Icon, title, desc, index }) => {
  return (
    <motion.div
      className="flex flex-col items-center text-center w-48"
      variants={nodeVariants}
      custom={index}
    >
      <div className="relative group mb-4">
        {/* Outer glow */}
        <div 
            className="absolute -inset-2 bg-gold rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-pulse-glow"
            style={{ animationDelay: `${index * 150}ms` }}
        />
        {/* Glassmorphic container */}
        <div
          className="relative w-20 h-20 bg-black/40 border border-gold/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-gold/60"
        >
          <div className="absolute inset-0 rounded-full bg-grid-pattern opacity-5" />
          <Icon size={36} className="text-gold transition-transform duration-300 group-hover:scale-105" />
        </div>
      </div>
      <h4 className="font-bold text-lg text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-400 leading-tight max-w-[150px]">{desc}</p>
    </motion.div>
  );
};

export default CryptoProcessNode;
