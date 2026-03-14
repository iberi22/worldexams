-- Migration to add question_comments table
-- Date: 2026-03-04

CREATE TABLE IF NOT EXISTS public.question_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_name TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.question_comments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view comments"
ON public.question_comments
FOR SELECT USING (true);

CREATE POLICY "Anyone can post comments"
ON public.question_comments
FOR INSERT
WITH CHECK (
    length(trim(content)) > 0
    AND (
        -- Anonymous users can post without user_id
        ((select auth.uid()) IS NULL AND user_id IS NULL)
        -- Authenticated users can only post as themselves
        OR ((select auth.uid()) IS NOT NULL AND user_id = (select auth.uid()))
    )
);

CREATE POLICY "Users can edit their own comments"
ON public.question_comments
FOR UPDATE
TO authenticated
USING ((select auth.uid()) = user_id)
WITH CHECK ((select auth.uid()) = user_id);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_question_comments_question_id ON public.question_comments(question_id);
