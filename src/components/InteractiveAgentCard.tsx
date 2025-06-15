
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Button } from './ui/button';
import { ArrowRight, Eye } from 'lucide-react';
import { agentData } from '@/data/agentFlows';

type AgentType = 'mt' | 'crypto';

interface InteractiveAgentCardProps {
  type: AgentType;
  onOpenDetails: () => void;
}

const InteractiveAgentCard: React.FC<InteractiveAgentCardProps> = ({ type, onOpenDetails }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const data = agentData[type];
  const cardBorderColor = type === 'mt' ? 'border-green/20' : 'border-gold/20';
  const themeColor = type === 'mt' ? '#16C784' : '#E6C419';
  
  const handleFlip = () => {
      setIsFlipped(!isFlipped);
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
            className={`w-full h-[320px] rounded-2xl relative cursor-pointer`}
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onClick={handleFlip}
        >
            {/* Front Face */}
            <div
                className={`absolute inset-0 bg-card/50 backdrop-blur-sm border ${cardBorderColor} rounded-2xl p-8 overflow-hidden flex flex-col justify-between`}
                style={{ backfaceVisibility: "hidden" }}
            >
                <div>
                    <div className="flex items-center justify-between gap-4 mb-3">
                        <h3 className="text-3xl font-bold text-white">{data.title}</h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {data.logos.map(logo => (
                                <img 
                                    key={logo.alt}
                                    src={logo.src}
                                    alt={logo.alt}
                                    className={`${
                                        type === 'mt' ? 'w-24 h-auto' : 'w-8 h-8'
                                    } object-contain`}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="text-gray-300">{data.description}</p>
                </div>
                <div className="text-sm font-semibold flex items-center gap-2 mt-4" style={{ color: themeColor }}>
                    Click to flip
                    <ArrowRight size={16} />
                </div>
            </div>

            {/* Back Face */}
            <div
                className={`absolute inset-0 bg-card/80 backdrop-blur-sm border ${cardBorderColor} rounded-2xl p-8 overflow-hidden flex flex-col items-center justify-center text-center`}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
                <h4 className="text-2xl font-bold text-white mb-4">See The Full Process</h4>
                <p className="text-gray-300 mb-6">Explore the step-by-step AI workflow, from market scanning to trade execution.</p>
                <Button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetails();
                    }}
                    className={`font-bold text-dark-charcoal`}
                    style={{
                        backgroundColor: themeColor,
                    }}
                >
                    <Eye className="mr-2 h-4 w-4" /> View Details
                </Button>
            </div>
        </motion.div>
    </Tilt>
  );
};

export default InteractiveAgentCard;
