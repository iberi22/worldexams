-- Allow guest bot practice sessions
-- Date: 2025-12-16

alter table public.bot_practice_sessions
  alter column user_id drop not null;
