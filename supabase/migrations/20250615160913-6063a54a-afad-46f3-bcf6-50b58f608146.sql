
-- Create a table to store user wallets
CREATE TABLE public.wallets (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  chain text NOT NULL,
  address text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT unique_wallet_address_per_user UNIQUE (user_id, chain, address)
);

-- Add an index for faster queries on user_id
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON public.wallets(user_id);

-- Enable Row Level Security to protect user data
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Create policies to allow users to manage their own wallets
CREATE POLICY "Users can view their own wallets"
  ON public.wallets
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wallets"
  ON public.wallets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wallets"
  ON public.wallets
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wallets"
  ON public.wallets
  FOR DELETE
  USING (auth.uid() = user_id);
