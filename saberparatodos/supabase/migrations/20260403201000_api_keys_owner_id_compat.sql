-- Keep local schema aligned with the active API key runtime.
-- Remote production already uses owner_id; fresh environments must get it too.

ALTER TABLE public.api_keys
  ADD COLUMN IF NOT EXISTS owner_id uuid REFERENCES auth.users(id);

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'api_keys'
      AND column_name = 'created_by'
  ) THEN
    EXECUTE $sql$
      UPDATE public.api_keys
      SET owner_id = COALESCE(owner_id, created_by)
      WHERE created_by IS NOT NULL
        AND owner_id IS NULL
    $sql$;
  END IF;
END $$;
