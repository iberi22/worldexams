-- Bot practice sessions (Telegram) + public report endpoint
-- Date: 2025-12-16

-- Needed for gen_random_uuid() and gen_random_bytes()
create extension if not exists pgcrypto;

create table if not exists public.bot_practice_sessions (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null references public.profiles(id) on delete cascade,
  telegram_id bigint not null,

  country_code text not null default 'CO',
  exam_type text not null,
  subject text not null,

  -- questions: array of {id,enunciado,opciones,asignatura,explicacion}
  -- Stored to avoid depending on a DB questions table.
  questions jsonb not null default '[]'::jsonb,

  -- answers: [{question_id, selected_index, is_correct, answered_at}]
  answers jsonb not null default '[]'::jsonb,

  started_at timestamptz not null default now(),
  completed_at timestamptz,

  share_token text not null default encode(gen_random_bytes(16), 'hex'),

  constraint bot_practice_sessions_share_token_unique unique (share_token)
);

create index if not exists idx_bot_practice_sessions_user_id on public.bot_practice_sessions(user_id);
create index if not exists idx_bot_practice_sessions_telegram_id on public.bot_practice_sessions(telegram_id);
create index if not exists idx_bot_practice_sessions_share_token on public.bot_practice_sessions(share_token);

alter table public.bot_practice_sessions enable row level security;

-- Only the owner can see/manage their sessions via authenticated client.
drop policy if exists bot_practice_sessions_owner_read on public.bot_practice_sessions;
create policy "bot_practice_sessions_owner_read"
on public.bot_practice_sessions
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists bot_practice_sessions_owner_insert on public.bot_practice_sessions;
create policy "bot_practice_sessions_owner_insert"
on public.bot_practice_sessions
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists bot_practice_sessions_owner_update on public.bot_practice_sessions;
create policy "bot_practice_sessions_owner_update"
on public.bot_practice_sessions
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- NOTE: The Telegram bot Edge Function uses the service role key.
-- Service role bypasses RLS, so it can create/update sessions.

-- =============================================================================
-- RPC: get_bot_practice_report
-- Public (token-based) read to render a report page with ads.
-- Security: token is a random opaque secret; function is SECURITY DEFINER.
-- =============================================================================

create or replace function public.get_bot_practice_report(p_token text)
returns jsonb
language plpgsql
security definer
stable
as $$
declare
  s public.bot_practice_sessions;
begin
  if p_token is null or length(p_token) < 16 then
    return jsonb_build_object('error', 'invalid_token');
  end if;

  select * into s
  from public.bot_practice_sessions
  where share_token = p_token
  limit 1;

  if not found then
    return jsonb_build_object('error', 'not_found');
  end if;

  return jsonb_build_object(
    'session', jsonb_build_object(
      'id', s.id,
      'country_code', s.country_code,
      'exam_type', s.exam_type,
      'subject', s.subject,
      'started_at', s.started_at,
      'completed_at', s.completed_at,
      'answers', s.answers
    ),
    'questions', s.questions
  );
end;
$$;

grant execute on function public.get_bot_practice_report(text) to anon, authenticated;
