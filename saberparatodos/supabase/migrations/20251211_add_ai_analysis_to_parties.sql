-- Add ai_analysis column to parties table
alter table public.parties
add column if not exists ai_analysis text;
