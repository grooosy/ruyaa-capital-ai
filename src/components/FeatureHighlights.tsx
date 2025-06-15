
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, CircleDollarSign } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-8 h-8 text-green" />,
    title: 'Minimal Slippage',
    description: 'Execute trades with precision thanks to our high-speed infrastructure and deep liquidity.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-green" />,
    title: 'Regulated & Secure',
    description: 'Your funds are protected with a regulated broker, ensuring top-tier security and compliance.',
  },
  {
    icon: <CircleDollarSign className="w-8 h-8 text-green" />,
    title: '1-Click Withdrawals',
    description: 'Access your profits instantly with our streamlined, one-click withdrawal process.',
  },
];

const FeatureHighlights = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          className="bg-card/50 border border-green/20 rounded-xl p-6 text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="mb-4 bg-green/10 p-3 rounded-full">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureHighlights;
