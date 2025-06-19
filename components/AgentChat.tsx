"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, TrendingUp, CheckCircle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "agent" | "system"
  content: string
  timestamp: Date
  data?: any
}

interface AgentChatProps {
  agentId: string
  agentName: string
  onClose?: () => void
}

export default function AgentChat({ agentId, agentName, onClose }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "agent",
      content: `Hello! I'm ${agentName}, your AI trading assistant. I'm here to help you with market analysis, trading strategies, and portfolio optimization. How can I assist you today?`,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: generateAgentResponse(inputValue),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAgentResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("market") || input.includes("analysis")) {
      return "Based on current market conditions, I'm seeing strong bullish momentum in the crypto sector. BTC is showing consolidation around key support levels, while ETH is displaying relative strength. Would you like me to provide a detailed technical analysis?"
    }

    if (input.includes("strategy") || input.includes("trading")) {
      return "I recommend a diversified approach combining momentum and mean-reversion strategies. Given current volatility, consider position sizing at 2-3% per trade with stop losses at 1.5%. Shall I set up some automated alerts for you?"
    }

    if (input.includes("risk") || input.includes("portfolio")) {
      return "Your current portfolio shows good diversification. I suggest maintaining a 60/30/10 split between crypto, forex, and commodities. Risk metrics are within acceptable ranges. Would you like me to run a stress test scenario?"
    }

    return "I understand your question. Let me analyze the current market data and provide you with actionable insights. Based on my algorithms, I can offer several recommendations tailored to your trading style and risk tolerance."
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-[600px] bg-black/40 border-gray-800 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500">
              <AvatarFallback className="bg-transparent text-white">
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-white text-lg">{agentName}</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-400">Online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <TrendingUp className="h-3 w-3 mr-1" />
              Active
            </Badge>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
                ×
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Avatar
                  className={`h-8 w-8 ${
                    message.type === "user"
                      ? "bg-gradient-to-br from-green-500 to-blue-500"
                      : "bg-gradient-to-br from-blue-500 to-purple-500"
                  }`}
                >
                  <AvatarFallback className="bg-transparent text-white text-xs">
                    {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>

                <div className={`max-w-[80%] ${message.type === "user" ? "text-right" : ""}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-gray-800 text-gray-100 border border-gray-700"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500">
                  <AvatarFallback className="bg-transparent text-white text-xs">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-800">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about market analysis, trading strategies..."
              className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Secure connection</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
