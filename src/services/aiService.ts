
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
  try {
    const systemPrompt = systemPrompts[selectedAgent] || `You are a helpful AI Assistant.`;
    
    // OpenAI API expects messages without the 'id' field
    const apiMessages = newMessages.map(({ id, ...rest }) => rest);

    console.log(`Making AI request for agent: ${selectedAgent}`);
    console.log(`Using model: ${modelMap[selectedAgent] || 'openai/gpt-4o-mini'}`);

    const completion = await openrouter.chat.completions.create({
      model: modelMap[selectedAgent] || 'openai/gpt-4o-mini',
      messages: [
        { role: "system", content: systemPrompt },
        ...apiMessages
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const botResponse = completion.choices[0].message;

    if (!botResponse || !botResponse.content) {
      console.warn("Received empty response from AI");
      return "I apologize, but I didn't receive a proper response. Could you please try again?";
    }

    if (botResponse.function_call) {
      console.log("Function call requested:", botResponse.function_call);
      return `I need to perform an action: ${botResponse.function_call.name}. Function calling is not fully implemented yet.`;
    }

    console.log("AI response generated successfully");
    return botResponse.content;

  } catch (error) {
    console.error("Error in fetchAiResponse:", error);
    
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return "Authentication failed. Please check your API key configuration.";
      } else if (error.status === 429) {
        return "I'm experiencing high demand right now. Please try again in a moment.";
      } else if (error.status === 500) {
        return "The AI service is temporarily unavailable. Please try again later.";
      }
      throw error; // Re-throw for handling in the calling code
    }
    
    throw error;
  }
};

export const getFallbackResponse = async (message: string): Promise<string> => {
  console.log('Using fallback response for message:', message);
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Provide more intelligent fallback responses
  const fallbackResponses = [
    `Thank you for your message: "${message}". To enable full AI capabilities, please configure your OpenRouter API key.`,
    `I received your request about "${message}". I'm currently in demo mode - for full AI features, an API key is required.`,
    `Your message "${message}" has been received. To unlock advanced AI responses, please set up your API credentials.`
  ];
  
  const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  return randomResponse;
};
