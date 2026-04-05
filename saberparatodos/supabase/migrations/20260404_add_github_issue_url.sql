-- Add github_issue_url column to question_comments
-- Date: 2026-04-04
-- Purpose: Track GitHub issues created from user reports

ALTER TABLE public.question_comments 
ADD COLUMN IF NOT EXISTS github_issue_url TEXT;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_question_comments_github_issue 
ON public.question_comments(github_issue_url) 
WHERE github_issue_url IS NOT NULL;
