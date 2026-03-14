-- Create API logs table for rate limiting and analytics
-- This table tracks every API request for security and billing

CREATE TABLE IF NOT EXISTS api_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_id UUID NOT NULL REFERENCES api_keys(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  response_time_ms INTEGER,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for rate limiting queries (last minute per key)
CREATE INDEX IF NOT EXISTS idx_api_logs_api_key_created
ON api_logs(api_key_id, created_at DESC);

-- Index for monthly usage queries
CREATE INDEX IF NOT EXISTS idx_api_logs_month
ON api_logs(api_key_id, created_at DESC)
WHERE created_at >= DATE_TRUNC('month', NOW());

-- Index for analytics
CREATE INDEX IF NOT EXISTS idx_api_logs_endpoint
ON api_logs(endpoint, created_at DESC);

-- Enable RLS
ALTER TABLE api_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Service role can do everything
CREATE POLICY "Service role can manage api_logs"
ON api_logs FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Policy: API key owner can read their own logs
CREATE POLICY "API key owners can read own logs"
ON api_logs FOR SELECT
TO authenticated
USING (
  api_key_id IN (
    SELECT id FROM api_keys
    WHERE owner_id = auth.uid()
  )
);

COMMENT ON TABLE api_logs IS 'Logs every API request for rate limiting, quota tracking, and analytics';
