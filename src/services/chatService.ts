import { supabase } from '@/integrations/supabase/client';
import { AgentId } from '@/context/ChatContext';
import { Message } from '@/types/chat';

/**
 * Ensures a single chat thread per user/agent.
 * Will fetch if it exists, or create if not (safe with SQL uniqueness constraint).
 */
export const getOrCreateThread = async (userId: string, agentId: AgentId) => {
    if (!agentId || !userId) return null;

    // Try to fetch
    let { data, error } = await supabase
        .from('chat_threads')
        .select('*')
        .eq('user_id', userId)
        .eq('agent', agentId)
        .maybeSingle();

    // If exists, return it
    if (data) return data;

    // Try to create (if hitting uniqueness error, fetch again)
    const { data: created, error: insertError } = await supabase
        .from('chat_threads')
        .insert({ user_id: userId, agent: agentId })
        .select()
        .single();

    // On successful insert, return
    if (created) return created;

    // If failed to create (maybe because of race), fetch again just in case
    if (insertError && insertError.code === '23505') {
        // Unique violation: fetch the row that was created by another request
        const { data: fallback } = await supabase
            .from('chat_threads')
            .select('*')
            .eq('user_id', userId)
            .eq('agent', agentId)
            .maybeSingle();
        return fallback;
    }
    if (insertError) {
        console.error("Error creating thread:", insertError);
        throw insertError;
    }

    return null;
};

export const getThread = async (userId: string, agentId: AgentId) => {
    // For backward compatibility; this function can be removed if always using getOrCreateThread
    return getOrCreateThread(userId, agentId);
};

export const createThread = async (userId: string, agentId: AgentId) => {
    // Deprecated: use getOrCreateThread instead.
    return getOrCreateThread(userId, agentId);
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

export const logAgentUsage = async (log: {
    user_id: string;
    agent: AgentId;
    msg_role: 'user' | 'assistant';
    content: string;
}) => {
    if (!log.agent || !log.user_id) return;

    const { error } = await supabase
        .from('agent_usage')
        .insert({
            user_id: log.user_id,
            agent: log.agent,
            msg_role: log.msg_role,
            content: log.content,
        });

    if (error) {
        console.error("Error logging agent usage:", error);
    }
};
