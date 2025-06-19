-- Create table for broker registration forms
CREATE TABLE public.broker_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  country text,
  platform text,
  account_type text,
  deposit numeric,
  kyc_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.broker_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broker_registrations REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.broker_registrations;

CREATE POLICY "Users manage own broker registrations" ON public.broker_registrations
  FOR ALL USING (auth.uid() = user_id);
