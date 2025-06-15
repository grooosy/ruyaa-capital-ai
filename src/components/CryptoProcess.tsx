
import React from 'react';
import { motion } from 'framer-motion';
import { TimelineStepData } from '@/data/agentFlows';
import CryptoProcessNode from './CryptoProcessNode';

interface CryptoProcessProps {
  timeline: TimelineStepData[];
}

const containerVariants = {
  hidden: {},
  visible: {},
};

const CryptoProcess: React.FC<CryptoProcessProps> = ({ timeline }) => {
  return (
    <motion.div
      className="w-full mt-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-y-8 md:gap-y-0">
        {timeline.map((step, index) => (
          <React.Fragment key={index}>
            <CryptoProcessNode
              icon={step.icon}
              title={step.title}
              desc={step.desc}
              index={index}
            />
            {index < timeline.length - 1 && (
              <>
                {/* Desktop connector */}
                <motion.div
                  className="hidden md:flex flex-1 h-0.5 max-w-xs bg-gold/10 relative overflow-hidden"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.4 }}
                >
                  <div 
                    className="absolute inset-0 h-full w-full animate-beam-flow"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #E6C419, transparent)',
                      animationDelay: `${index * 0.4 + 0.5}s`
                    }}
                  />
                </motion.div>
                {/* Mobile connector */}
                <div className="md:hidden w-0.5 h-16 bg-gold/10" />
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default CryptoProcess;
