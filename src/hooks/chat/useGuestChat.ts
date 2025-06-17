import { useState } from 'react';
import { Message } from '@/types/chat';
import { fetchAiResponse } from '@/services/aiService';
import { AgentId } from '@/context/ChatContext';

export const useGuestChat = (selectedAgent: AgentId) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm Ruyaa AI. You can ask me anything. Sign in for a personalized experience.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      const botContent = await fetchAiResponse([...messages, userMsg], selectedAgent);
      const botMsg: Message = {
        id: Date.now().toString() + '-bot',
        role: 'assistant',
        content: botContent,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '-err',
          role: 'assistant',
          content: "Sorry, I'm having trouble right now.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
};
