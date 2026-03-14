-- Runtime compatibility for API key management and paid question gateway.
-- Aligns legacy columns (quota_*, status) with the newer runtime fields.

ALTER TABLE public.api_keys
  ADD COLUMN IF NOT EXISTS current_usage bigint NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

UPDATE public.api_keys
SET
  current_usage = COALESCE(current_usage, quota_used, 0),
  is_active = COALESCE(is_active, status = 'active', true)
WHERE current_usage IS DISTINCT FROM COALESCE(current_usage, quota_used, 0)
   OR is_active IS DISTINCT FROM COALESCE(is_active, status = 'active', true);

CREATE OR REPLACE FUNCTION public.sync_api_key_runtime_fields()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.current_usage := COALESCE(NEW.current_usage, NEW.quota_used, 0);
  NEW.quota_used := COALESCE(NEW.quota_used, NEW.current_usage::integer, 0);

  NEW.monthly_limit := COALESCE(NEW.monthly_limit, NEW.quota_limit, 100);
  NEW.quota_limit := COALESCE(NEW.quota_limit, LEAST(NEW.monthly_limit, 2147483647)::integer, 1000);

  NEW.is_active := COALESCE(NEW.is_active, NEW.status = 'active', true);
  NEW.status := COALESCE(
    NEW.status,
    CASE WHEN COALESCE(NEW.is_active, true) THEN 'active' ELSE 'revoked' END
  );

  IF NEW.status <> 'active' THEN
    NEW.is_active := false;
  ELSIF NEW.is_active = false THEN
    NEW.status := 'revoked';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS sync_api_key_runtime_fields_before_write ON public.api_keys;
CREATE TRIGGER sync_api_key_runtime_fields_before_write
  BEFORE INSERT OR UPDATE ON public.api_keys
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_api_key_runtime_fields();

CREATE INDEX IF NOT EXISTS idx_api_keys_is_active
  ON public.api_keys (is_active)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_usage_logs_api_key_created_at
  ON public.usage_logs (api_key_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at
  ON public.usage_logs (created_at DESC);
