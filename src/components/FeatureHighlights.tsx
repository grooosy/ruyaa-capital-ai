
import React from 'react';
import { ShieldCheck, Zap, MessageSquare, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeatureHighlights: React.FC = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <MessageSquare className="h-7 w-7 text-gold" />,
      text: t('feature_1'),
    },
    {
      icon: <Zap className="h-7 w-7 text-gold" />,
      text: t('feature_2'),
    },
    {
      icon: <Wallet className="h-7 w-7 text-gold" />,
      text: t('feature_3'),
    },
    {
      icon: <ShieldCheck className="h-7 w-7 text-gold" />,
      text: t('feature_4'),
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center gap-3 group cursor-pointer">
            <div className="transform transition-transform duration-300 group-hover:scale-110">
              {feature.icon}
            </div>
            <p className="text-base font-medium text-gray-300 transition-colors duration-300 group-hover:text-white">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;
