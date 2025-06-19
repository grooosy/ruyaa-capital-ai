"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type AgentId = "arbitrage" | "analysis" | "education" | "support"

interface ChatContextType {
  activeAgent: AgentId
  setActiveAgent: (agent: AgentId) => void
  isConnected: boolean
  setIsConnected: (connected: boolean) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [activeAgent, setActiveAgent] = useState<AgentId>("arbitrage")
  const [isConnected, setIsConnected] = useState(false)

  return (
    <ChatContext.Provider
      value={{
        activeAgent,
        setActiveAgent,
        isConnected,
        setIsConnected,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider")
  }
  return context
}
