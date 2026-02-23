-- Phase 3 hardening
-- Date: 2026-02-22
-- Scope:
-- 1) Reduce permissive RLS expressions in Party tables while preserving guest flow.
-- 2) Set fixed search_path on flagged functions.

-- ============================================================================
-- party_sessions RLS
-- ============================================================================
DROP POLICY IF EXISTS "Public create parties" ON public.party_sessions;
CREATE POLICY "Public create parties"
  ON public.party_sessions
  FOR INSERT
  TO public
  WITH CHECK (
    party_code ~ '^[A-Z0-9]{6}$'
    AND length(trim(host_name)) > 0
    AND status = 'waiting'
    AND current_question >= 0
    AND expires_at > now()
    AND expires_at <= now() + interval '24 hours'
  );

DROP POLICY IF EXISTS "Public update parties" ON public.party_sessions;
CREATE POLICY "Public update parties"
  ON public.party_sessions
  FOR UPDATE
  TO public
  USING (
    party_code ~ '^[A-Z0-9]{6}$'
    AND expires_at > now()
    AND status <> 'finished'
  )
  WITH CHECK (
    party_code ~ '^[A-Z0-9]{6}$'
    AND current_question >= 0
    AND expires_at > now() - interval '5 minutes'
  );

-- ============================================================================
-- party_players RLS
-- ============================================================================
DROP POLICY IF EXISTS "Allow anyone to join party" ON public.party_players;
CREATE POLICY "Allow anyone to join party"
  ON public.party_players
  FOR INSERT
  TO public
  WITH CHECK (
    length(trim(player_id)) > 0
    AND length(trim(nickname)) > 0
    AND EXISTS (
      SELECT 1
      FROM public.party_sessions ps
      WHERE ps.party_code = party_players.party_id
        AND ps.status IN ('waiting', 'active', 'paused')
        AND ps.expires_at > now()
    )
  );

DROP POLICY IF EXISTS "Allow service role to update players" ON public.party_players;
CREATE POLICY "Allow service role to update players"
  ON public.party_players
  FOR UPDATE
  TO public
  USING (
    length(trim(player_id)) > 0
    AND EXISTS (
      SELECT 1
      FROM public.party_sessions ps
      WHERE ps.party_code = party_players.party_id
        AND ps.expires_at > now()
    )
  )
  WITH CHECK (
    length(trim(player_id)) > 0
  );

-- ============================================================================
-- Function search_path hardening
-- ============================================================================
ALTER FUNCTION public.increment_api_usage(uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.cleanup_old_submissions() SET search_path = public, pg_temp;
ALTER FUNCTION public.cleanup_old_rate_limits() SET search_path = public, pg_temp;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public, pg_temp;
ALTER FUNCTION public.get_bot_practice_report(text) SET search_path = public, pg_temp;
