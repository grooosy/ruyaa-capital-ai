
import { supabase } from '@/integrations/supabase/client';
import { AgentId } from '@/context/ChatContext';
import { getInitialMessage } from '@/config/agentConfig';

export const getConversation = async (userId: string, agentId: AgentId) => {
    if (!agentId) return null;
    const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .eq('agent', agentId)
        .maybeSingle();

    if (error) throw error;
    return data;
};

export const createConversation = async (userId: string, agentId: AgentId) => {
    if (!agentId || (agentId !== 'mt4' && agentId !== 'crypto')) {
        throw new Error("A valid agent ID ('mt4' or 'crypto') is required to create a conversation");
    }
    const { data, error } = await supabase
        .from('conversations')
        .insert({ user_id: userId, agent: agentId, title: `${agentId} conversation` })
        .select()
        .single();

    if (error) throw error;

    // Also add the initial message for the new conversation
    const initialMessage = getInitialMessage(agentId);
    await addMessage({
        conversation_id: data.id,
        role: initialMessage.role,
        content: initialMessage.content,
    });

    return data;
};

export const getMessages = async (conversationId: string) => {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data.map(msg => ({...msg, id: msg.id.toString()}));
};

export const addMessage = async (message: {
    conversation_id: string;
    role: 'user' | 'assistant';
    content: string;
}) => {
    const { data, error } = await supabase
        .from('messages')
        .insert(message)
        .select()
        .single();

    if (error) throw error;
    return {...data, id: data.id.toString()};
};
