-- Add missing columns to api_keys for full API management

-- Add organization_id for multi-tenant support
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS organization_id UUID;

-- Add tier (free, starter, pro, enterprise)
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'starter', 'pro', 'enterprise'));

-- Add monthly request limit
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS monthly_limit INTEGER DEFAULT 100;

-- Add current usage counter
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS current_usage INTEGER DEFAULT 0;

-- Add is_active flag
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Add key_prefix for display purposes
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS key_prefix TEXT;

-- Add index for organization lookups
CREATE INDEX IF NOT EXISTS idx_api_keys_organization ON api_keys(organization_id);

-- Add index for tier lookups
CREATE INDEX IF NOT EXISTS idx_api_keys_tier ON api_keys(tier);

-- Add index for active status
CREATE INDEX IF NOT EXISTS idx_api_keys_active ON api_keys(is_active) WHERE is_active = true;

COMMENT ON COLUMN api_keys.tier IS 'Plan tier: free, starter, pro, enterprise';
COMMENT ON COLUMN api_keys.monthly_limit IS 'Maximum requests per month';
COMMENT ON COLUMN api_keys.current_usage IS 'Current month usage';
COMMENT ON COLUMN api_keys.is_active IS 'Whether the key is active';
