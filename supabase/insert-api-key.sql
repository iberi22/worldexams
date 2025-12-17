-- Insertar API key para saberparatodos
-- Ejecutar esto en el SQL Editor de Supabase Dashboard
-- https://supabase.com/dashboard/project/tzmrgvtptdtsjcugwqyq/sql

INSERT INTO api_keys (
  key_hash,
  name,
  quota_limit,
  quota_used,
  status
) VALUES (
  'saberparatodos-dev-2024',
  'SaberParaTodos Development',
  1000000, -- 1 millón de requests
  0,
  'active'
)
ON CONFLICT (key_hash) DO NOTHING;

-- Verificar que se insertó
SELECT * FROM api_keys WHERE key_hash = 'saberparatodos-dev-2024';
