import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ChatPane from "./ChatPane";
import { useChatContext } from "@/context/ChatContext";
import { useLocation } from "react-router-dom";

const ChatWidget = () => {
  const { isChatOpen, openChat, closeChat } = useChatContext();
  const location = useLocation();

  const toggleChat = () => {
    if (isChatOpen) {
      closeChat();
    } else {
      openChat('support'); // Open generic chat if opened from widget button
    }
  };

  if (location.pathname.startsWith("/agents/")) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100]">
        <motion.button
          onClick={toggleChat}
          className="relative bg-black/90 border border-gray-700 text-white p-4 rounded-2xl shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
          whileHover={{ scale: 1.05, borderColor: "rgba(0, 200, 150, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle AI Chat"
        >
          {/* Subtle glow effect */}
          <motion.div
            className="absolute inset-0 bg-white/10 rounded-2xl blur-xl"
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={isChatOpen ? "x" : "bot"}
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              {isChatOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <motion.span
                  className="block font-black text-lg"
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                >
                  R
                </motion.span>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Notification dot */}
          {!isChatOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-black"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[99] md:w-[400px] md:h-[600px]"
            style={{
              width: "min(400px, calc(100vw - 2rem))",
              height: "80vh",
              originY: "bottom",
              originX: "right",
            }}
          >
            <div className="relative h-full">
              {/* Modern dark themed container */}
              <div className="h-full bg-black/90 border border-green/30 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden">
                {/* Subtle animated border */}
                <motion.div
                  className="absolute inset-0 bg-green/10 rounded-2xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ padding: "1px" }}
                />
                <div className="relative h-full bg-black/90 rounded-2xl">
                  <ChatPane />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
