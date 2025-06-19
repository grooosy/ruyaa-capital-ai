
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type AgentId = 'mt4mt5' | 'crypto' | 'arbitrage' | 'support';

interface ChatContextType {
  isChatOpen: boolean;
  selectedAgent: AgentId;
  openChat: (agentId: AgentId | null) => void;
  closeChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentId>('support');

  const openChat = (agentId: AgentId | null) => {
    setSelectedAgent(agentId ?? 'support');
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedAgent('support');
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
