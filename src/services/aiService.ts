
import OpenAI from 'openai';
import { Message } from '@/types/chat';
import { AgentId } from '@/context/ChatContext';
import { systemPrompts, modelMap } from '@/config/agentConfig';

const openRouterApiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

const openrouter = new OpenAI({
  apiKey: openRouterApiKey || "dummy-key",
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export const fetchAiResponse = async (
  newMessages: Message[],
  selectedAgent: AgentId
): Promise<string> => {
  const systemPrompt = systemPrompts[selectedAgent] || `You are a helpful AI Assistant.`;
  
  // OpenAI API expects messages without the 'id' field
  const apiMessages = newMessages.map(({ id, ...rest }) => rest);

  const completion = await openrouter.chat.completions.create({
    model: modelMap[selectedAgent] || 'openai/gpt-4o-mini',
    messages: [
      { role: "system", content: systemPrompt },
      ...apiMessages
    ],
  });

  const botResponse = completion.choices[0].message;

  if (botResponse.function_call) {
      console.log("Function call requested:", botResponse.function_call);
      return `I need to perform an action: ${botResponse.function_call.name}. Function calling is not fully implemented yet.`;
  } else {
      return botResponse.content || "Sorry, I received an empty response.";
  }
};

export const getFallbackResponse = async (message: string): Promise<string> => {
  console.log('Simulating API call for message:', message);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return `This is a simulated response to: "${message}". To enable a real AI backend, you will need to provide an API key.`;
};
