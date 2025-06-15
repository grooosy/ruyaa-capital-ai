import { useState, useEffect, useContext } from 'react';
import { useChatContext, AgentId } from '@/context/ChatContext';
import OpenAI from 'openai';

// ==================================================================
// IMPORTANT: SECURITY WARNING
// ==================================================================
// The OpenAI API key is included directly in the client-side code.
// This is INSECURE and should NOT be used in a production environment.
// An attacker could easily find and use your API key, leading to
// unexpected charges on your OpenAI account.
//
// For production, you should use a backend proxy to securely handle
// the API key.
// ==================================================================
const openai = new OpenAI({
  apiKey: "YOUR_OPENAI_API_KEY_HERE", // <-- 🚨 PASTE YOUR OPENAI API KEY HERE
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

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      let botResponseContent: string;

      if (selectedAgent === 'mt4') {
        const modelMap = {
            mt4: "g-684ea3edaa9081919a8dbd9ac4b450ad-ruyaa-mt4-mt5-agent",
            crypto: "gpt-4-turbo-preview", // Placeholder
            arbitrage: "gpt-4-turbo-preview", // Placeholder
        };
        
        // OpenAI API expects messages without the 'id' field
        const apiMessages = newMessages.map(({ id, ...rest }) => rest);

        const completion = await openai.chat.completions.create({
          model: modelMap[selectedAgent] || 'g-684ea3edaa9081919a8dbd9ac4b450ad-ruyaa-mt4-mt5-agent',
          messages: apiMessages,
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
        errorMessageContent = `OpenAI API Error: ${error.status} ${error.type} - ${error.message}`;
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
