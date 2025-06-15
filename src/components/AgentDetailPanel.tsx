
import React from 'react';
import { motion } from 'framer-motion';
import { agentData } from '@/data/agentFlows';
import ProcessTimeline from './ProcessTimeline';
import { Button } from './ui/button';

type AgentType = 'mt' | 'crypto' | 'arbitrage';

interface AgentDetailPanelProps {
    type: AgentType;
    onStart: () => void;
}

const AgentDetailPanel: React.FC<AgentDetailPanelProps> = ({ type, onStart }) => {
    const data = agentData[type];
    const buttonBg = type === 'mt' ? 'bg-gold hover:bg-gold/90' : type === 'crypto' ? 'bg-green hover:bg-green/90' : 'bg-blue-600 hover:bg-blue-600/90';
    const buttonTextColor = 'text-dark-charcoal';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={`bg-card/80 backdrop-blur-lg rounded-2xl border ${type === 'mt' ? 'border-gold/20' : type === 'crypto' ? 'border-green/20' : 'border-blue-500/20'} p-8 w-full shadow-lg shadow-black/50`}
        >
            <div className="flex items-start gap-4 mb-6">
                <h2 className="text-3xl font-bold text-white flex-grow" >
                    {data.title}
                </h2>
                <div className="flex items-center gap-2 flex-wrap justify-end flex-shrink-0">
                    {data.logos.map(logo => {
                        if (logo.src.includes('placeholder')) {
                            return <div key={logo.alt} className="text-white text-sm bg-white/10 rounded px-2 py-1">{logo.alt}</div>;
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
                        );
                    })}
                </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">{data.description}</p>
            
            <ProcessTimeline timeline={data.timeline} theme={type === 'mt' ? 'gold' : type === 'crypto' ? 'green' : 'blue'} />
            
            <div className="mt-8 text-center">
                <Button onClick={onStart} className={`${buttonBg} ${buttonTextColor} font-bold px-8 py-3 text-lg`}>
                    Start with this Agent
                </Button>
            </div>
        </motion.div>
    );
};

export default AgentDetailPanel;
