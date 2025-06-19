-- 1. For chat_threads: Prevent duplicate (user_id, agent) combinations (one thread per user per agent)
ALTER TABLE public.chat_threads
  ADD CONSTRAINT unique_user_agent_thread UNIQUE (user_id, agent);

-- 2. For chat_threads, chat_messages, wallets: Enable realtime support
ALTER TABLE public.chat_threads REPLICA IDENTITY FULL;
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;
ALTER TABLE public.wallets REPLICA IDENTITY FULL;

-- Add to supabase_realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_threads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.wallets;
