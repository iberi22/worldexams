-- Migration: Add RLS policies for institution_members
-- Date: 2026-01-01
-- Author: GitHub Copilot

-- Ensure RLS is enabled
ALTER TABLE public.institution_members ENABLE ROW LEVEL SECURITY;

-- 1. SELECT: Users can view their own memberships
CREATE POLICY "Users can view own memberships"
ON public.institution_members FOR SELECT
USING (auth.uid() = user_id);

-- 2. SELECT: Admins and teachers can view all members of their institution
CREATE POLICY "Admins and teachers can view institution members"
ON public.institution_members FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.institution_members im
    WHERE im.institution_id = institution_members.institution_id
    AND im.user_id = auth.uid()
    AND im.role IN ('admin', 'teacher')
  )
);

-- 3. ALL: Institution Owner can manage members
CREATE POLICY "Owner can manage members"
ON public.institution_members FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.institutions i
    WHERE i.id = institution_members.institution_id
    AND i.owner_id = auth.uid()
  )
);

-- 4. ALL: Institution Admins can manage members (except maybe deleting the owner?)
CREATE POLICY "Admins can manage members"
ON public.institution_members FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.institution_members im
    WHERE im.institution_id = institution_members.institution_id
    AND im.user_id = auth.uid()
    AND im.role = 'admin'
  )
);
