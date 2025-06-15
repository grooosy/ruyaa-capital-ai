
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import AiBrainIcon from './icons/AiBrainIcon';
import ConvergingArrowsIcon from './icons/ConvergingArrowsIcon';
import OneClickIcon from './icons/OneClickIcon';
import VerifiedShieldIcon from './icons/VerifiedShieldIcon';

const getFeatures = (t: TFunction) => [
  {
    icon: <AiBrainIcon />,
    title: t('feature_1'),
    subtitle: "Always available to help",
  },
  {
    icon: <ConvergingArrowsIcon />,
    title: t('feature_2'),
    subtitle: "Execute trades precisely",
  },
  {
    icon: <OneClickIcon />,
    title: t('feature_3'),
    subtitle: "Instant access to funds",
  },
  {
    icon: <VerifiedShieldIcon />,
    title: t('feature_4'),
    subtitle: "Partnered with the best",
  },
];

const FeatureGrid: React.FC = () => {
  const { t } = useTranslation();
  const features = getFeatures(t);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 justify-items-center">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="group relative flex flex-col items-center justify-center text-center w-40 h-40 bg-[#20211A] backdrop-blur-md rounded-2xl border border-[#262615] shadow-[0_4px_36px_#23221c90] p-4 transition-transform duration-300 hover:scale-105 hover:shadow-neon"
          >
            <div className="absolute bg-[#00FF9D]/20 w-32 h-32 rounded-full -z-10 blur-[60px] animate-pulse-slow" />

            <div className="mb-2 transition-transform duration-300 group-hover:drop-shadow-[0_0_8px_#00FF9D] animate-rotate-subtle">
              {React.cloneElement(feature.icon, { className: 'w-12 h-12 text-gold' })}
            </div>
            
            <h3 className="text-base font-bold text-[#F3EBC3] mb-1 transition-transform duration-300 group-hover:-translate-y-0.5">{feature.title}</h3>
            <p className="text-xs text-neutral-400">{feature.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
