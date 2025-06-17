
import React from 'react';
import AiBrainIcon from './icons/AiBrainIcon';
import ConvergingArrowsIcon from './icons/ConvergingArrowsIcon';
import VerifiedShieldIcon from './icons/VerifiedShieldIcon';
import { GraduationCap, LineChart } from 'lucide-react';

const features = [
  {
    icon: <VerifiedShieldIcon />,
    title: 'Verified Broker',
    subtitle: '1-Click Withdraw',
    color: 'from-green/20 to-emerald-500/20',
  },
  {
    icon: <AiBrainIcon />,
    title: '24/7 Ruyaa AI Assistant',
    subtitle: 'Always available to help',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: 'Trading Academy + Mentor',
    subtitle: 'Learn with guidance',
    color: 'from-gold/20 to-yellow-500/20',
  },
  {
    icon: <LineChart className="w-8 h-8" />,
    title: 'Live Ticker + Signal Feed',
    subtitle: 'Real-time trading data',
    color: 'from-green/20 to-emerald-500/20',
  },
  {
    icon: <ConvergingArrowsIcon />,
    title: 'Crypto Arbitrage System',
    subtitle: 'Auto profit scan',
    color: 'from-purple-500/20 to-violet-500/20',
  },
];

const FeatureGrid: React.FC = () => {

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 justify-items-center">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="group relative flex flex-col items-center justify-center text-center w-40 h-40 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-4 transition-all duration-500 hover:scale-105 active:scale-95 hover:border-green/40 hover:shadow-green-glow"
          >
            {/* Dynamic AI Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Neural Network Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] rounded-2xl" />

            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green/0 via-green/50 to-green/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-beam-flow" 
                 style={{
                   background: 'linear-gradient(90deg, transparent, rgba(16, 161, 105, 0.3), transparent)',
                   backgroundSize: '200% 100%'
                 }} />

            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-3 p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/20 transition-transform duration-300 group-hover:scale-110 group-hover:border-green/40">
                {React.cloneElement(feature.icon, { 
                  className: 'w-8 h-8 text-white group-hover:text-green transition-colors duration-300' 
                })}
              </div>
              
              <h3 className="text-sm font-bold text-white mb-1 transition-all duration-300 group-hover:text-green font-spacegrotesk">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {feature.subtitle}
              </p>
            </div>

            {/* AI Pulse Effect */}
            <div className="absolute inset-0 rounded-2xl border border-green/0 group-hover:border-green/30 group-hover:animate-pulse-subtle transition-all duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
