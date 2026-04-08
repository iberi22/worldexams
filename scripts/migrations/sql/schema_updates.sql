-- ============================================
-- WorldExams Database Migrations
-- Execute in Supabase SQL Editor
-- ============================================

-- 1. Tabla api_logs
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

-- Índices para api_logs
CREATE INDEX IF NOT EXISTS idx_api_logs_api_key_created ON api_logs(api_key_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_api_logs_endpoint ON api_logs(endpoint, created_at DESC);

-- Habilitar RLS
ALTER TABLE api_logs ENABLE ROW LEVEL SECURITY;

-- Política RLS
CREATE POLICY "Service role can manage api_logs" ON api_logs FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 2. Enhancements para api_keys
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS organization_id UUID;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'free';
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS monthly_limit INTEGER DEFAULT 100;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS current_usage INTEGER DEFAULT 0;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS key_prefix TEXT;

CREATE INDEX IF NOT EXISTS idx_api_keys_organization ON api_keys(organization_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_tier ON api_keys(tier);

-- ============================================
-- Verify
-- ============================================
SELECT 'api_logs table:' as info, count(*) as count FROM api_logs;
SELECT 'api_keys columns added:' as info, column_name FROM information_schema.columns WHERE table_name = 'api_keys' AND column_name IN ('organization_id', 'tier', 'monthly_limit', 'current_usage', 'is_active', 'key_prefix');
