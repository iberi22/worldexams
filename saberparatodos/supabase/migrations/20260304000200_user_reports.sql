-- Migration to add user_reports table
-- Date: 2026-03-04

CREATE TABLE IF NOT EXISTS public.user_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_type TEXT NOT NULL,
    question_id TEXT,
    message TEXT NOT NULL,
    user_context TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, reviewing, resolved, ignored
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT user_reports_status_check CHECK (status IN ('pending', 'reviewing', 'resolved', 'ignored'))
);

-- Enable RLS
ALTER TABLE public.user_reports ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Service role can view all reports"
ON public.user_reports
FOR SELECT
TO service_role
USING (true);

-- Anyone can submit a report
CREATE POLICY "Anyone can submit reports"
ON public.user_reports
FOR INSERT
WITH CHECK (
    length(trim(report_type)) > 0
    AND length(trim(message)) > 0
    AND status = 'pending'
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_user_reports_created_at ON public.user_reports(created_at);
CREATE INDEX IF NOT EXISTS idx_user_reports_status ON public.user_reports(status);
