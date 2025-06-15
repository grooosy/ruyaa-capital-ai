
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import OnboardingChatModal from '@/components/chat/OnboardingChatModal';
import ParticleBackground from '@/components/ParticleBackground';

const Mt4Mt5AgentPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This simulates the auth check.
  // In a real app, you'd check Supabase auth status here.
  useEffect(() => {
    // For demonstration, we open the modal immediately.
    // A real implementation would check for a valid session first.
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 500); // Small delay to let the page render
    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optionally navigate back or to a dashboard
    // navigate('/agents'); 
  };

  return (
    <div className="relative min-h-screen bg-bg">
      <ParticleBackground />
      <Navbar />
      <div className="w-full min-h-screen flex items-center justify-center text-center text-white p-6">
        <div>
          <h1 className="text-3xl font-bold">Connecting to MT4/MT5 Agent...</h1>
          <p className="text-gray-400 mt-2">Please wait while we prepare your onboarding session.</p>
        </div>
      </div>
      <OnboardingChatModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Mt4Mt5AgentPage;
