-- World Exams Institutional System
-- Created: 2026-02-22
-- Tables for college/institutional system

-- Table: colleges (Todos los colegios de Colombia)
CREATE TABLE IF NOT EXISTS public.colleges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cod_dane varchar(20) UNIQUE NOT NULL,
  name varchar(255) NOT NULL,
  department varchar(100),
  municipality varchar(100),
  sector varchar(20),
  character varchar(50),
  calendar varchar(20),
  address varchar(255),
  phone varchar(50),
  email varchar(255),
  principal varchar(255),
  total_students integer,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_colleges_department ON colleges(department);
CREATE INDEX IF NOT EXISTS idx_colleges_municipality ON colleges(municipality);
CREATE INDEX IF NOT EXISTS idx_colleges_name ON colleges(name);

-- Enable RLS
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read colleges" ON public.colleges;
CREATE POLICY "Allow public read colleges" ON public.colleges FOR SELECT TO public USING (true);

-- Table: organization_students (Vinculación estudiantes-organizaciones)
CREATE TABLE IF NOT EXISTS public.organization_students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  student_id varchar(50) NOT NULL,
  student_name varchar(255),
  grade varchar(10),
  section varchar(5),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_org_students_org ON organization_students(organization_id);

-- Enable RLS
ALTER TABLE public.organization_students ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Org members can read students" ON public.organization_students;
DROP POLICY IF EXISTS "Org members can insert students" ON public.organization_students;
CREATE POLICY "Org members can read students" ON public.organization_students FOR SELECT TO public USING (true);
CREATE POLICY "Org members can insert students" ON public.organization_students FOR INSERT TO public WITH CHECK (true);

-- Table: organization_groups (Grupos/Clases)
CREATE TABLE IF NOT EXISTS public.organization_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  name varchar(100) NOT NULL,
  grade varchar(10),
  section varchar(5),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_org_groups_org ON organization_groups(organization_id);

-- Enable RLS
ALTER TABLE public.organization_groups ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Org members can read groups" ON public.organization_groups;
DROP POLICY IF EXISTS "Org members can insert groups" ON public.organization_groups;
CREATE POLICY "Org members can read groups" ON public.organization_groups FOR SELECT TO public USING (true);
CREATE POLICY "Org members can insert groups" ON public.organization_groups FOR INSERT TO public WITH CHECK (true);

-- Add invite_code to organizations if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'organizations' AND column_name = 'invite_code') THEN
        ALTER TABLE organizations ADD COLUMN invite_code varchar(10) UNIQUE;
    END IF;
END $$;
