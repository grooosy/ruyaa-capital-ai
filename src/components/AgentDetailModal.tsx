
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { agentData } from '@/data/agentFlows';
import ProcessTimeline from './ProcessTimeline';
import { Button } from './ui/button';

interface AgentDetailModalProps {
    type: 'mt' | 'crypto';
    onClose: () => void;
}

const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const contentVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    visible: { 
        scale: 1, 
        opacity: 1, 
        y: 0,
        transition: {
            delay: 0.1,
            duration: 0.3,
            ease: "easeOut"
        }
    },
};

const AgentDetailModal: React.FC<AgentDetailModalProps> = ({ type, onClose }) => {
    const data = agentData[type];
    const buttonBg = type === 'mt' ? 'bg-green hover:bg-green/90' : 'bg-gold hover:bg-gold/90';
    const buttonTextColor = 'text-dark-charcoal';

    return (
        <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                variants={contentVariants}
                className={`bg-card rounded-2xl border ${data.theme === 'green' ? 'border-green/20' : 'border-gold/20'} p-8 w-full max-w-4xl relative shadow-lg shadow-black/50`}
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>
                
                <div className="flex items-start gap-4 mb-6">
                    <h2 className="text-3xl font-bold text-white flex-grow" >
                        {data.title}
                    </h2>
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
                
                <p className="text-gray-300 mb-8 max-w-3xl">{data.description}</p>
                
                <ProcessTimeline timeline={data.timeline} theme={data.theme as 'green' | 'gold'} />
                
                <div className="mt-8 text-center">
                    <Button className={`${buttonBg} ${buttonTextColor} font-bold px-8 py-3 text-lg`}>
                        Start with this Agent
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AgentDetailModal;
