import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavigationButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-6 start-6 flex flex-col gap-2 z-40 rtl:start-auto rtl:end-6">
      <button
        aria-label="Go back"
        onClick={() => navigate(-1)}
        className="bg-card border border-white/10 p-2 rounded-full hover:bg-green/10 transition"
      >
        <ArrowLeft className="w-5 h-5 text-white rtl:rotate-180" />
      </button>
      <button
        aria-label="Go forward"
        onClick={() => navigate(1)}
        className="bg-card border border-white/10 p-2 rounded-full hover:bg-green/10 transition"
      >
        <ArrowRight className="w-5 h-5 text-white rtl:rotate-180" />
      </button>
    </div>
  );
};

export default NavigationButtons;
