-- Migration: Add User Profile Fields
-- Description: Adds user-facing profile fields (display_name, avatar_url, institution, subjects_interest, country)

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS display_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS institution TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS subjects_interest TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country TEXT;
