-- Phase 2 security advisor remediation
-- Date: 2026-02-22
-- Scope:
-- 1) Reduce permissive INSERT policy on organizations.
-- 2) Add RLS policies to institution_members (table had RLS enabled with no policies).
-- 3) Set leaderboard_global as security_invoker view.

-- ============================================================================
-- organizations: add ownership column + tighten INSERT policy
-- ============================================================================
ALTER TABLE public.organizations
  ADD COLUMN IF NOT EXISTS owner_user_id uuid REFERENCES auth.users(id);

-- Backfill owner_user_id from existing membership data when available.
WITH owner_rows AS (
  SELECT
    om.organization_id,
    om.user_id,
    ROW_NUMBER() OVER (
      PARTITION BY om.organization_id
      ORDER BY CASE WHEN om.role = 'owner' THEN 0 ELSE 1 END, om.created_at
    ) AS rn
  FROM public.organization_members om
)
UPDATE public.organizations o
SET owner_user_id = r.user_id
FROM owner_rows r
WHERE o.id = r.organization_id
  AND r.rn = 1
  AND o.owner_user_id IS NULL;

ALTER TABLE public.organizations
  ALTER COLUMN owner_user_id SET DEFAULT auth.uid();

DROP POLICY IF EXISTS "Authenticated can create organizations" ON public.organizations;
CREATE POLICY "Authenticated can create organizations"
  ON public.organizations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    owner_user_id IS NOT NULL
    AND owner_user_id = auth.uid()
  );

-- ============================================================================
-- institution_members: RLS enabled but had no policies
-- ============================================================================
ALTER TABLE IF EXISTS public.institution_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own institution membership" ON public.institution_members;
CREATE POLICY "Users can read own institution membership"
  ON public.institution_members
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own institution membership" ON public.institution_members;
CREATE POLICY "Users can insert own institution membership"
  ON public.institution_members
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own institution membership" ON public.institution_members;
CREATE POLICY "Users can update own institution membership"
  ON public.institution_members
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own institution membership" ON public.institution_members;
CREATE POLICY "Users can delete own institution membership"
  ON public.institution_members
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================================================
-- leaderboard_global: switch to SECURITY INVOKER behavior
-- ============================================================================
ALTER VIEW public.leaderboard_global SET (security_invoker = true);
