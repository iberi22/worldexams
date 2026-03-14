-- Insertar API key para saberparatodos
-- Ejecutar esto en el SQL Editor de Supabase Dashboard
-- https://supabase.com/dashboard/project/tzmrgvtptdtsjcugwqyq/sql

INSERT INTO api_keys (
  owner_id,
  key_prefix,
  key_hash,
  name,
  monthly_limit,
  quota_limit,
  current_usage,
  quota_used,
  status,
  is_active,
  tier
) VALUES (
  NULL,
  'saberpar',
  encode(digest('saberparatodos-dev-2024', 'sha256'), 'hex'),
  'SaberParaTodos Development',
  1000000,
  1000000, -- 1 millón de requests
  0,
  0,
  'active',
  true,
  'pro'
)
ON CONFLICT (key_hash) DO NOTHING;

-- Verificar que se insertó
SELECT * FROM api_keys WHERE key_prefix = 'saberpar';
