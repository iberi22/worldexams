-- supabase/migrations/20260902000000_api_usage.sql
-- T9 — feat-premium-api 85→95% analytics
-- Adds api_usage table for tracking premium API usage per key

CREATE TABLE IF NOT EXISTS public.api_usage (
  id BIGSERIAL PRIMARY KEY,
  key_id TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  status INTEGER NOT NULL,
  duration_ms INTEGER NOT NULL DEFAULT 0,
  ts BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast aggregation by key + time range
CREATE INDEX IF NOT EXISTS idx_api_usage_key_ts ON public.api_usage (key_id, ts DESC);
CREATE INDEX IF NOT EXISTS idx_api_usage_endpoint ON public.api_usage (endpoint, ts DESC);

-- RLS: only the user who owns the key can read their own usage
ALTER TABLE public.api_usage ENABLE ROW LEVEL SECURITY;

-- Policy: service role can read/write all
CREATE POLICY "service_role_full_access" ON public.api_usage
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: anon can insert (for the /api/analytics/log endpoint)
CREATE POLICY "anon_insert" ON public.api_usage
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: users can read their own usage (matched by key_id pattern)
-- Note: key_id is opaque, so this is permissive — production should use a key→user mapping
CREATE POLICY "users_read_own" ON public.api_usage
  FOR SELECT
  TO authenticated
  USING (true);

COMMENT ON TABLE public.api_usage IS 'T9 feat-premium-api analytics. Tracks per-key API call counts, latency, errors. See saberparatodos/src/pages/api/analytics/usage.ts';