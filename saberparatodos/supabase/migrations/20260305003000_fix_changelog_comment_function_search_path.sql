-- Security hardening: set immutable search_path for trigger function
CREATE OR REPLACE FUNCTION public.update_changelog_comment_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = pg_catalog, public
AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$;
