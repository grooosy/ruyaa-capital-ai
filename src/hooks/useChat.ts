import { useState, useEffect, useContext } from 'react';
import { useChatContext, AgentId } from '@/context/ChatContext';
import OpenAI from 'openai';

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

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

// Mock API call to simulate GPT backend for generic chat
const getBotResponse = async (message: string): Promise<string> => {
  console.log('Simulating API call for message:', message);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return `This is a simulated response to: "${message}". To enable a real AI backend, you will need to provide an API key.`;
};

const getInitialMessage = (agentId: AgentId): Message => {
  if (agentId === 'mt4') {
    return {
      id: 'init',
      role: 'assistant',
      content: "Hello! I am the Ruyaa MT4/MT5 AI Agent. How can I assist with your Gold and Forex trading today?"
    };
  }
  return {
    id: 'init',
    role: 'assistant',
    content: "Hello! How can I help you today? I can answer questions, provide feedback, or connect you with a broker.",
  };
};

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
        const modelMap = {
            mt4: "openai/gpt-4o-mini",
            crypto: "openai/gpt-4o-mini",
            arbitrage: "openai/gpt-4o-mini",
        };
        
        const systemPrompt = `You are Ruyaa’s ${selectedAgent.toUpperCase()} Agent.
[Paste your full system instructions here: language rules, registration flow, cash path, etc.]`;
        
        // OpenAI API expects messages without the 'id' field
        const apiMessages = newMessages.map(({ id, ...rest }) => rest);

        const completion = await openrouter.chat.completions.create({
          model: modelMap[selectedAgent] || 'openai/gpt-4o-mini',
          messages: [
            { role: "system", content: systemPrompt },
            ...apiMessages
          ],
          // I've commented out the function calling for now as the schema wasn't provided.
          // functions: [ /* your register_user schema */ ],
          // function_call: "auto",
        });

        const botResponse = completion.choices[0].message;

        if (botResponse.function_call) {
            console.log("Function call requested:", botResponse.function_call);
            botResponseContent = `I need to perform an action: ${botResponse.function_call.name}. Function calling is not fully implemented yet.`;
        } else {
            botResponseContent = botResponse.content || "Sorry, I received an empty response.";
        }
      } else {
        botResponseContent = await getBotResponse(currentInput);
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
