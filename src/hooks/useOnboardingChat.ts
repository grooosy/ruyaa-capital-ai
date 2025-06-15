
import { useState, useEffect } from 'react';

export type OnboardingMessage = {
  id: number;
  role: 'assistant' | 'user-input';
  content: string | React.ReactNode;
};

const chatFlow: Omit<OnboardingMessage, 'id'>[] = [
  { role: 'assistant', content: "Hello there, I’m your personal Ruyaa AI assistant for MT4/MT5. Let’s set up your trading account." },
  { role: 'assistant', content: "First, what is your full name?" },
  { role: 'assistant', content: "And which country are you trading from?" },
  { role: 'assistant', content: "Great. Please provide your email address." },
  { role: 'assistant', content: "Which platform do you prefer? (MT4 or MT5)" },
  { role: 'assistant', content: "Finally, which account type? (Standard or Pro)" },
  { role: 'assistant', content: "Excellent. Your profile is set up. How much would you like to deposit today?" },
  { role: 'assistant', content: "Please choose your payment method:" },
  { role: 'assistant', content: (
      <div className="flex gap-2">
        <span className="bg-gray-700 px-3 py-1 rounded-md text-sm">Card</span>
        <span className="bg-gray-700 px-3 py-1 rounded-md text-sm">Cash</span>
        <span className="bg-gray-700 px-3 py-1 rounded-md text-sm">Crypto</span>
      </div>
  )},
  { role: 'assistant', content: "Let's assume a $1,000 deposit..." },
  { role: 'assistant', content: "Perfect. With a deposit of $500 or more, you now have access to advanced features: real-time trade evaluation, dynamic trailing stops, and weekly insights." },
];

export const useOnboardingChat = (isOpen: boolean) => {
  const [messages, setMessages] = useState<OnboardingMessage[]>([]);
  
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      return;
    };

    let timeouts: NodeJS.Timeout[] = [];
    
    chatFlow.forEach((msg, index) => {
      const timeout = setTimeout(() => {
        setMessages(prev => [...prev, { ...msg, id: Date.now() + index }]);
      }, 1500 * (index + 1));
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    }
  }, [isOpen]);

  return { messages };
};
