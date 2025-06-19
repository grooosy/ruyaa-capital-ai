-- Add table for storing uploaded voice recordings
CREATE TABLE public.chat_recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  thread_id uuid REFERENCES public.chat_threads(id) ON DELETE CASCADE,
  file_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_recordings REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_recordings;

CREATE POLICY "Users manage own recordings" ON public.chat_recordings
  FOR ALL USING (auth.uid() = user_id);
