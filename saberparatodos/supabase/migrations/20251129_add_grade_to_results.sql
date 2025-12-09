-- Add grade column to exam_results table
ALTER TABLE exam_results
ADD COLUMN IF NOT EXISTS grade INTEGER;

-- Add comment to explain the column
COMMENT ON COLUMN exam_results.grade IS 'Grade level of the exam (3, 5, 7, 9, 11)';
