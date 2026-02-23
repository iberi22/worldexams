-- Phase 0 Security Hardening
-- Restrict institutional data access to authenticated organization members.

-- ============================================================================
-- organizations
-- ============================================================================
DROP POLICY IF EXISTS "Authenticated can create organizations" ON public.organizations;
CREATE POLICY "Authenticated can create organizations"
  ON public.organizations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ============================================================================
-- organization_members
-- ============================================================================
DROP POLICY IF EXISTS "Members can read org memberships" ON public.organization_members;
CREATE POLICY "Members can read org memberships"
  ON public.organization_members
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.organization_members om
      WHERE om.organization_id = organization_members.organization_id
        AND om.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Bootstrap owner membership insert" ON public.organization_members;
CREATE POLICY "Bootstrap owner membership insert"
  ON public.organization_members
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND role = 'owner'
    AND NOT EXISTS (
      SELECT 1
      FROM public.organization_members om
      WHERE om.organization_id = organization_members.organization_id
    )
  );

-- ============================================================================
-- colleges
-- ============================================================================
DROP POLICY IF EXISTS "Allow public insert colleges" ON public.colleges;

-- ============================================================================
-- organization_students
-- ============================================================================
DROP POLICY IF EXISTS "Org members can read students" ON public.organization_students;
DROP POLICY IF EXISTS "Org members can insert students" ON public.organization_students;

CREATE POLICY "Org members can read students"
  ON public.organization_students
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.organization_members om
      WHERE om.organization_id = organization_students.organization_id
        AND om.user_id = auth.uid()
    )
  );

CREATE POLICY "Org admins can insert students"
  ON public.organization_students
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.organization_members om
      WHERE om.organization_id = organization_students.organization_id
        AND om.user_id = auth.uid()
        AND om.role IN ('owner', 'admin')
    )
  );

-- ============================================================================
-- organization_groups
-- ============================================================================
DROP POLICY IF EXISTS "Org members can read groups" ON public.organization_groups;
DROP POLICY IF EXISTS "Org members can insert groups" ON public.organization_groups;

CREATE POLICY "Org members can read groups"
  ON public.organization_groups
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.organization_members om
      WHERE om.organization_id = organization_groups.organization_id
        AND om.user_id = auth.uid()
    )
  );

CREATE POLICY "Org admins can insert groups"
  ON public.organization_groups
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.organization_members om
      WHERE om.organization_id = organization_groups.organization_id
        AND om.user_id = auth.uid()
        AND om.role IN ('owner', 'admin')
    )
  );
