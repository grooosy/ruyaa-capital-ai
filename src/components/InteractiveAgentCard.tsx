
import React from 'react';
import { motion, Variants } from 'framer-motion';
import ProcessTimeline from './ProcessTimeline';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { agentData } from '@/data/agentFlows';

type AgentType = 'mt' | 'crypto';

interface InteractiveAgentCardProps {
  type: AgentType;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.2
    }
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const InteractiveAgentCard: React.FC<InteractiveAgentCardProps> = ({ type }) => {
  const data = agentData[type];
  const cardBorderColor = type === 'mt' ? 'border-green/20' : 'border-gold/20';
  const buttonBg = type === 'mt' ? 'bg-green hover:bg-green/90' : 'bg-gold hover:bg-gold/90';
  const buttonTextColor = 'text-dark-charcoal';

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`w-full bg-card/50 backdrop-blur-sm border ${cardBorderColor} rounded-2xl p-8 overflow-hidden`}
    >
        <motion.div variants={contentVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 flex flex-col">
                <motion.div variants={contentVariants} className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="text-3xl font-bold text-white">{data.title}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {data.logos.map(logo => (
                            <img 
                                key={logo.alt}
                                src={logo.src}
                                alt={logo.alt}
                                className={`${
                                    type === 'mt' ? 'w-24 h-auto' : 'w-8 h-8'
                                } object-contain transition-transform duration-300 hover:scale-110`}
                            />
                        ))}
                    </div>
                </motion.div>
                <motion.p variants={contentVariants} className="text-gray-300 mb-6 flex-grow">{data.description}</motion.p>
                <motion.div variants={contentVariants}>
                    <Button className={`${buttonBg} ${buttonTextColor} font-bold`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div>
            </div>
            <div className="md:col-span-2">
                <ProcessTimeline timeline={data.timeline} theme={data.theme as 'green' | 'gold'} />
            </div>
        </motion.div>
    </motion.div>
  );
};

export default InteractiveAgentCard;
