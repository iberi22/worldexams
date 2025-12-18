-- Create table for API rate limiting (guests)
CREATE TABLE IF NOT EXISTS api_rate_limits (
  id BIGSERIAL PRIMARY KEY,
  ip_address TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  last_reset TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast IP lookups
CREATE INDEX IF NOT EXISTS idx_api_rate_limits_ip ON api_rate_limits(ip_address);
CREATE INDEX IF NOT EXISTS idx_api_rate_limits_last_reset ON api_rate_limits(last_reset);

-- Enable Row Level Security
ALTER TABLE api_rate_limits ENABLE ROW LEVEL SECURITY;

-- Policy: Only Edge Functions can read/write (using service role)
-- Guests cannot access this table directly
CREATE POLICY "Service role only" ON api_rate_limits
  FOR ALL
  USING (auth.role() = 'service_role');

-- Cleanup old entries automatically (keep last 24 hours)
-- This should be run as a scheduled job or manually periodically
CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM api_rate_limits
  WHERE last_reset < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users (for manual cleanup)
GRANT EXECUTE ON FUNCTION cleanup_old_rate_limits() TO authenticated;

COMMENT ON TABLE api_rate_limits IS 'Rate limiting for guest API requests (100 requests/hour per IP)';
COMMENT ON COLUMN api_rate_limits.ip_address IS 'Client IP address (from x-forwarded-for or cf-connecting-ip)';
COMMENT ON COLUMN api_rate_limits.request_count IS 'Number of requests in current hour window';
COMMENT ON COLUMN api_rate_limits.last_reset IS 'Start of current hour window';
