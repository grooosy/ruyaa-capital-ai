
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface AgentSelectionCardProps {
  title: string;
  description: string;
  logoSrc: string;
  href: string;
}

const AgentSelectionCard: React.FC<AgentSelectionCardProps> = ({ title, description, logoSrc, href }) => {
  return (
    <Link to={href} className="block group h-full">
      <Card className="bg-card border-neutral-800/50 h-full p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-gold/50 hover:shadow-gold-glow cursor-pointer">
        <img src={logoSrc} alt={`${title} logo`} className="w-16 h-16 mb-6" />
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{title}</h3>
        <p className="text-neutral-400 text-sm">{description}</p>
      </Card>
    </Link>
  );
};

export default AgentSelectionCard;
