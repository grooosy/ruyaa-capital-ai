
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimelineStepProps {
    step: {
        title: string;
        description: string;
    };
    index: number;
    isLast: boolean;
    theme: 'gold' | 'green';
}

const TimelineStep: React.FC<TimelineStepProps> = ({ step, index, isLast, theme }) => {
    const themeClasses = {
        gold: {
            bg: 'bg-gold',
            text: 'text-gold',
            line: 'bg-gold/30',
        },
        green: {
            bg: 'bg-green',
            text: 'text-green',
            line: 'bg-green/30',
        },
    };

    const currentTheme = themeClasses[theme];

    return (
        <motion.div 
            className="flex items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <div className="flex flex-col items-center mr-6">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-dark-charcoal", currentTheme.bg)}>
                    {index + 1}
                </div>
                {!isLast && <div className={cn("w-0.5 grow mt-2", currentTheme.line)} style={{ minHeight: '4rem' }} />}
            </div>
            <div className="flex-1 pb-8">
                <h4 className="font-bold text-lg text-white mb-1">{step.title}</h4>
                <p className="text-gray-400">{step.description}</p>
            </div>
        </motion.div>
    );
};

export default TimelineStep;
