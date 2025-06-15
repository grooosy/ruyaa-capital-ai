import React, { createContext, useState, useContext, ReactNode } from 'react';

export type AgentId = 'mt4' | 'crypto' | 'arbitrage' | null;

interface ChatContextType {
  isChatOpen: boolean;
  selectedAgent: AgentId;
  openChat: (agentId: AgentId) => void;
  closeChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentId>(null);

  const openChat = (agentId: AgentId) => {
    setSelectedAgent(agentId);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    // Keep selectedAgent in case we want to reopen, or set to null.
    // Setting to null is cleaner to avoid stale state.
    setSelectedAgent(null);
  };

  return (
    <ChatContext.Provider value={{ isChatOpen, selectedAgent, openChat, closeChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
