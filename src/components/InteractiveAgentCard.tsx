
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ArrowRight, Eye, Clock, Zap, CheckCheck, Check } from 'lucide-react';
import { agentData } from '@/data/agentFlows';

type AgentType = 'mt' | 'crypto' | 'arbitrage';

interface InteractiveAgentCardProps {
  type: AgentType;
  onOpenDetails: () => void;
  isSelected: boolean;
}

const metrics = [
    { Icon: Clock, text: "24/7 Monitoring" },
    { Icon: CheckCheck, text: "99.8% Uptime" },
    { Icon: Zap, text: "Real-Time Sync" },
    { Icon: Check, text: "Verified Execution Speed" },
];

const InteractiveAgentCard: React.FC<InteractiveAgentCardProps> = ({ type, onOpenDetails, isSelected }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const data = agentData[type];
  const cardBorderColor = type === 'mt' ? 'border-gold/20' : type === 'crypto' ? 'border-green/20' : 'border-blue-500/20';
  const themeColor = type === 'mt' ? '#CFA100' : type === 'crypto' ? '#10A169' : '#627EEA';

  const mtPatternStyle = {
    backgroundImage: `linear-gradient(rgba(207, 161, 0, 0.04) 1px, transparent 1px), linear-gradient(to right, rgba(207, 161, 0, 0.04) 1px, transparent 1px)`,
    backgroundSize: '2rem 2rem',
  };

  const cryptoPatternStyle = {
    backgroundImage: `radial-gradient(circle, rgba(16, 161, 105, 0.05) 1px, transparent 1px)`,
    backgroundSize: '1.5rem 1.5rem',
  };

  const arbitragePatternStyle = {
    backgroundImage: `linear-gradient(45deg, rgba(98, 126, 234, 0.03) 25%, transparent 25%), linear-gradient(-45deg, rgba(98, 126, 234, 0.03) 25%, transparent 25%)`,
    backgroundSize: '1rem 1rem',
  };
  
  const getPattern = () => {
    switch(type) {
      case 'mt': return mtPatternStyle;
      case 'crypto': return cryptoPatternStyle;
      case 'arbitrage': return arbitragePatternStyle;
    }
  }
  const patternStyle = getPattern();
  
  const logosToDisplay = type === 'mt'
    ? data.logos.filter(logo => !['Visa', 'Mastercard', 'Phantom'].includes(logo.alt))
    : data.logos;

  const handleFlip = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsFlipped(!isFlipped);
  }

  const handleCardClick = () => {
    if (isFlipped) {
      setIsFlipped(false);
    }
    onOpenDetails();
  }

  return (
    <Tilt
        glareEnable
        glareMaxOpacity={0.1}
        glareColor={themeColor}
        glarePosition="all"
        scale={1.02}
        perspective={1000}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        style={{ transformStyle: "preserve-3d" }}
    >
        <motion.div
            className={`w-full h-[320px] rounded-2xl relative cursor-pointer ring-2 ${isSelected ? 'ring-gold' : 'ring-transparent'} transition-all duration-300`}
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onClick={handleCardClick}
        >
            {/* Front Face */}
            <div
                className={`absolute inset-0 bg-card/50 backdrop-blur-sm border ${cardBorderColor} rounded-2xl p-8 overflow-hidden flex flex-col justify-between`}
                style={{ backfaceVisibility: "hidden" }}
            >
                <div className="absolute inset-0 opacity-50" style={patternStyle} />
                <div className="relative">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-3xl font-bold text-white flex-grow">{data.title}</h3>
                        <div className="flex items-center gap-2 flex-wrap justify-end" style={{maxWidth: '45%'}}>
                            {logosToDisplay.map(logo => {
                                if (logo.src.includes('placeholder')) {
                                    return <div key={logo.alt} className="text-white text-xs bg-white/10 rounded px-2 py-1">{logo.alt}</div>;
                                }
                                return (
                                    <img 
                                        key={logo.alt}
                                        src={logo.src}
                                        alt={logo.alt}
                                        className={`${
                                            logo.alt === 'MT4/MT5 Logo' ? 'w-24 h-auto' : 'w-8 h-8'
                                        } object-contain`}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <p className="text-gray-300 mb-6">{data.description}</p>
                    <div className="border-t border-white/10 pt-4">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                            {metrics.map(({ Icon, text }, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color: themeColor }} />
                                    <span className="text-xs text-gray-400 font-medium">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative text-sm font-semibold flex items-center gap-2 mt-4" style={{ color: themeColor }}>
                    Click to flip
                    <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    >
                        <ArrowRight size={16} />
                    </motion.div>
                </div>
            </div>

            {/* Back Face */}
            <div
                className={`absolute inset-0 bg-card/80 backdrop-blur-sm border ${cardBorderColor} rounded-2xl p-8 overflow-hidden flex flex-col items-center justify-center text-center`}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
                <div className="absolute inset-0 opacity-30" style={patternStyle} />
                <div className="relative">
                    <h4 className="text-2xl font-bold text-white mb-4">See The Full Process</h4>
                    <p className="text-gray-300 mb-6">Explore the step-by-step AI workflow, from market scanning to trade execution.</p>
                    <motion.button
                        onClick={(e) => {
                            e.stopPropagation(); // prevent card click
                            onOpenDetails();
                        }}
                        whileHover={{ scale: 1.05, boxShadow: `0px 0px 20px ${themeColor}60` }}
                        whileTap={{ scale: 0.95 }}
                        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group"
                    >
                        <motion.span
                            className="absolute inset-0 transition-all duration-500"
                            style={{
                                background: `linear-gradient(45deg, ${themeColor}90 0%, ${type === 'mt' ? '#f59e0b' : type === 'crypto' ? '#22c55e' : '#3b82f6'} 100%)`,
                            }}
                            initial={{ backgroundSize: '200% 200%', backgroundPosition: '0% 50%' }}
                            whileHover={{ backgroundPosition: '100% 50%' }}
                        >
                        </motion.span>
                        <span 
                            className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-card/80 rounded-md group-hover:bg-opacity-0"
                        >
                            <div className="flex items-center text-white">
                                <Eye className="mr-2 h-4 w-4" /> View Details
                            </div>
                        </span>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    </Tilt>
  );
};

export default InteractiveAgentCard;
