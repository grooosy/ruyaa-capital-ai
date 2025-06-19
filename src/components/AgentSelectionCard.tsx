
// AgentSelectionCard is used on the landing page to showcase available agent types.
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AgentSelectionCardProps {
  id: string;
  title: string;
  description: string;
  logoSrc: string;
  href?: string;
  onClick?: () => void;
}

const AgentSelectionCard: React.FC<AgentSelectionCardProps> = ({ id, title, description, logoSrc, href, onClick }) => {
  const cardContent = (
    <motion.div
      className={cn(
        "relative group h-full p-8 flex flex-col items-center justify-center text-center overflow-hidden",
        "rounded-2xl shadow-xl transition-all duration-300 cursor-pointer",
        "bg-gradient-to-br from-[#1a1a1c]/70 to-[#111114]/60 backdrop-blur-lg",
        "border-2 border-[#d4af37]/40"
      )}
      whileHover={{ rotateX: 8, rotateY: -8 }}
    >
      {/* Background decorations */}
      {id === 'crypto' && (
        <div className="absolute inset-0 flex items-center justify-center opacity-30" aria-hidden="true">
          <div className="w-48 h-48 border-2 border-[#d4af37]/20 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />
          <div className="absolute w-64 h-64 border border-[#d4af37]/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
        </div>
      )}
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="relative mb-6 h-16 w-16 flex items-center justify-center">
          <img src={logoSrc} alt={`${title} logo`} className="w-16 h-16 transition-transform duration-300 group-hover:scale-110" />
          {id === 'mt4' && (
              <div className="absolute -inset-4 opacity-10" style={{
                  backgroundImage: 'linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(212,175,55,0.5) 1px, transparent 1px)',
                  backgroundSize: '1.5rem 1.5rem',
                  maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
              }}/>
          )}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 transition-colors">{title}</h3>
        <p className="text-neutral-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );

  const cardContainerClasses = "block h-full";

  if (onClick) {
    return (
      <div onClick={onClick} className={cardContainerClasses} role="button" tabIndex={0}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link to={href || '#'} className={cardContainerClasses}>
      {cardContent}
    </Link>
  );
};

export default AgentSelectionCard;
