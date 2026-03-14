-- Add is_approved column to question_comments
-- Default is false, implying moderation is active
ALTER TABLE public.question_comments ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT FALSE;

-- Update Select policy to only show approved comments to the public
-- Note: We drop and recreate because USING clause changes
DROP POLICY IF EXISTS "Anyone can view comments" ON public.question_comments;

CREATE POLICY "Anyone can view comments"
ON public.question_comments
FOR SELECT USING (is_approved = TRUE);

-- We don't change the INSERT policy, as users should still be able to post (they just won't see it yet)
