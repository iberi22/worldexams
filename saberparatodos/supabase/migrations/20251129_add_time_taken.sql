-- Add time_taken column to exam_results table
-- This stores the time in seconds that the user took to complete the exam

ALTER TABLE exam_results
ADD COLUMN IF NOT EXISTS time_taken INTEGER;

COMMENT ON COLUMN exam_results.time_taken IS 'Time taken to complete the exam in seconds';

-- Create index for better query performance on leaderboard
CREATE INDEX IF NOT EXISTS idx_exam_results_subject_score 
ON exam_results(subject, score DESC);

CREATE INDEX IF NOT EXISTS idx_exam_results_grade 
ON exam_results(grade);

CREATE INDEX IF NOT EXISTS idx_exam_results_created_at 
ON exam_results(created_at DESC);
