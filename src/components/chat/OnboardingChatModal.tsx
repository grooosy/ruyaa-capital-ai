
import React, { useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnboardingChat } from '@/hooks/useOnboardingChat';
import { X } from 'lucide-react';

interface OnboardingChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingChatModal: React.FC<OnboardingChatModalProps> = ({ isOpen, onClose }) => {
  const { messages } = useOnboardingChat(isOpen);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 50, scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-[#1C1C22] w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gold/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img src="/lovable-uploads/9dd041af-f3e5-4ac9-b4d8-a8fd480ba5cd.png" alt="MT4/MT5 Logo" className="h-8 w-auto" />
                <h2 className="font-semibold text-white">MT4/MT5 Agent</h2>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="h-96 p-6 space-y-4 overflow-y-auto">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex"
                  >
                    <div className="bg-gold/10 text-white p-3 rounded-lg max-w-sm text-sm leading-relaxed">
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

             {/* Footer - Explanatory note */}
             <div className="p-4 bg-black/20 text-center">
                <p className="text-xs text-gray-500">
                    This is a simulated onboarding. In a real session, you would provide your answers here.
                </p>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingChatModal;
