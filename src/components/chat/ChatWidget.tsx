
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X } from 'lucide-react';
import ChatPane from './ChatPane';
import { useChatContext } from '@/context/ChatContext';
import { useLocation } from 'react-router-dom';

const ChatWidget = () => {
  const { isChatOpen, openChat, closeChat } = useChatContext();
  const location = useLocation();

  const toggleChat = () => {
    if (isChatOpen) {
      closeChat();
    } else {
      openChat(null); // Open generic chat if opened from widget button
    }
  };

  if (location.pathname.startsWith('/agents/')) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100]">
        <motion.button
          onClick={toggleChat}
          className="bg-gold text-dark-charcoal p-4 rounded-full shadow-gold-glow hover:bg-gold/90 transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle AI Chat"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isChatOpen ? 'x' : 'bot'}
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {isChatOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[99] w-[400px] h-[600px]"
            style={{ originY: 'bottom', originX: 'right' }}
          >
            <ChatPane />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
