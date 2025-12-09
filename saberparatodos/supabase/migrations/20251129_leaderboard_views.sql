-- Weekly Leaderboard View
CREATE OR REPLACE VIEW leaderboard_weekly AS
SELECT
  user_name,
  SUM(score) as total_score,
  COUNT(*) as exams_taken,
  MAX(created_at) as last_active
FROM exam_results
WHERE created_at >= date_trunc('week', CURRENT_DATE)
GROUP BY user_name
ORDER BY total_score DESC;

-- Monthly Leaderboard View
CREATE OR REPLACE VIEW leaderboard_monthly AS
SELECT
  user_name,
  SUM(score) as total_score,
  COUNT(*) as exams_taken,
  MAX(created_at) as last_active
FROM exam_results
WHERE created_at >= date_trunc('month', CURRENT_DATE)
GROUP BY user_name
ORDER BY total_score DESC;

-- Yearly Leaderboard View (Resets every year)
CREATE OR REPLACE VIEW leaderboard_yearly AS
SELECT
  user_name,
  SUM(score) as total_score,
  COUNT(*) as exams_taken,
  MAX(created_at) as last_active
FROM exam_results
WHERE created_at >= date_trunc('year', CURRENT_DATE)
GROUP BY user_name
ORDER BY total_score DESC;
