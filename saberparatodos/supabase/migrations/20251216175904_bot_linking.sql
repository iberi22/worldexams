-- Migration: Create bot_linking_codes table

CREATE TABLE IF NOT EXISTS public.bot_linking_codes (
  code TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '10 minutes')
);

ALTER TABLE public.bot_linking_codes ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert a code for themselves
DO $$
BEGIN
  CREATE POLICY "Users can create their own linking codes"
  ON public.bot_linking_codes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Add telegram_id to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS telegram_id BIGINT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS discord_id TEXT;

CREATE INDEX IF NOT EXISTS idx_profiles_telegram_id ON public.profiles(telegram_id);
