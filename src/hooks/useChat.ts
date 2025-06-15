import { useState, useEffect, useContext } from 'react';
import { useChatContext, AgentId } from '@/context/ChatContext';
import OpenAI from 'openai';
import { Message } from '@/types/chat';
import { getInitialMessage } from '@/config/agentConfig';
import { fetchAiResponse, getFallbackResponse } from '@/services/aiService';

// ==================================================================
// IMPORTANT: SECURITY & SETUP
// ==================================================================
// To use the OpenRouter API, you need to set your API key as an
// environment variable in your Lovable project settings.
//
// 1. Go to Project Settings > Environment Variables.
// 2. Create a new variable with the name VITE_OPENROUTER_API_KEY
//    and your OpenRouter API key as the value.
//
// NOTE: This key is still exposed on the client-side because this is
// a frontend-only application. For a production environment, it is
// strongly recommended to use a backend proxy to protect your key.
// ==================================================================
const openRouterApiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

const openrouter = new OpenAI({
  apiKey: openRouterApiKey || "dummy-key", // The check in handleSubmit prevents usage of this dummy key.
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export const useChat = (agentIdOverride?: AgentId) => {
  const { selectedAgent: agentFromContext } = useChatContext();
  const selectedAgent = agentIdOverride !== undefined ? agentIdOverride : agentFromContext;

  const [messages, setMessages] = useState<Message[]>([getInitialMessage(selectedAgent)]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessages([getInitialMessage(selectedAgent)]);
    setInput('');
  }, [selectedAgent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!openRouterApiKey) {
        const errorMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: "The OpenRouter API key is not configured. Please set the VITE_OPENROUTER_API_KEY in your project's environment variables."
        };
        setMessages(prev => [...prev, errorMessage]);
        return;
    }

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      let botResponseContent: string;

      if (selectedAgent) {
        botResponseContent = await fetchAiResponse(newMessages, selectedAgent);
      } else {
        botResponseContent = await getFallbackResponse(currentInput);
      }
      
      const botMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: botResponseContent };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      let errorMessageContent = "Sorry, I'm having trouble connecting. Please try again later.";
      if (error instanceof OpenAI.APIError) {
        errorMessageContent = `OpenRouter API Error: ${error.status} ${error.type} - ${error.message}`;
      }
      const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: errorMessageContent };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceRecording = () => {
    // Placeholder for voice recording logic
    console.log("Voice recording initiated.");
    alert("Voice recording is not yet implemented.");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Placeholder for file upload logic
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log("File selected:", file.name);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'user',
        content: `File attached: ${file.name}`
      }]);
      // In a real app, you would upload the file here.
      alert(`File "${file.name}" attached (upload functionality not implemented).`);
    }
  };

  return {
    messages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    handleVoiceRecording,
    handleFileUpload,
  };
};
