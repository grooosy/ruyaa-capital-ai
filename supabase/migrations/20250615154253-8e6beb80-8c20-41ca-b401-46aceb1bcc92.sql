-- Drop old tables and related types to avoid conflicts
DROP TABLE IF EXISTS public.messages;
DROP TABLE IF EXISTS public.conversations;
DROP TYPE IF EXISTS public.message_role;
DROP TYPE IF EXISTS public.agent_type;

-- Create table for chat threads as per your specification
CREATE TABLE public.chat_threads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  agent text NOT NULL CHECK (agent IN ('arbitrage', 'mt4mt5', 'crypto', 'support')),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create table for chat messages as per your specification
CREATE TABLE public.chat_messages (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  thread_id uuid NOT NULL REFERENCES public.chat_threads(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security on the new tables
ALTER TABLE public.chat_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS policy for users to manage their own threads
CREATE POLICY "Users can manage their own threads"
ON public.chat_threads
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS policy for users to manage messages within their own threads
CREATE POLICY "Users can manage messages in their threads"
ON public.chat_messages
FOR ALL
USING (
    EXISTS (
        SELECT 1
        FROM public.chat_threads
        WHERE public.chat_threads.id = chat_messages.thread_id AND public.chat_threads.user_id = auth.uid()
    )
);
