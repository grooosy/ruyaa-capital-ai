import { supabase } from '@/integrations/supabase/client';
import { AgentId } from '@/context/ChatContext';
import { Message } from '@/types/chat';

export const getThread = async (userId: string, agentId: AgentId) => {
    if (!agentId || !userId) return null;

    const { data, error } = await supabase
        .from('chat_threads')
        .select('*')
        .eq('user_id', userId)
        .eq('agent', agentId)
        .maybeSingle();

    if (error) {
        console.error("Error getting thread:", error);
        throw error;
    }
    return data;
};

export const createThread = async (userId: string, agentId: AgentId) => {
    if (!agentId || !userId) {
        throw new Error("A valid user ID and agent ID are required to create a thread.");
    }
    const { data, error } = await supabase
        .from('chat_threads')
        .insert({ user_id: userId, agent: agentId })
        .select()
        .single();

    if (error) {
        console.error("Error creating thread:", error);
        throw error;
    }

    return data;
};

export const getMessages = async (threadId: string): Promise<Message[]> => {
    const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error("Error getting messages:", error);
        throw error;
    }
    return data.map(msg => ({
        ...msg,
        id: msg.id.toString(),
        content: msg.content ?? '',
        role: msg.role as 'user' | 'assistant'
    }));
};

export const addMessage = async (message: {
    thread_id: string;
    role: 'user' | 'assistant';
    content: string;
}): Promise<Message> => {
    const { data, error } = await supabase
        .from('chat_messages')
        .insert(message)
        .select()
        .single();

    if (error) {
        console.error("Error adding message:", error);
        throw error;
    }
    const result = {
        ...data,
        id: data.id.toString(),
        content: data.content ?? '',
        role: data.role as 'user' | 'assistant'
    };
    return result;
};
