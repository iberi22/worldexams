CREATE TABLE IF NOT EXISTS ranked_sessions (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL,
  nickname TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  seed INTEGER NOT NULL,
  question_ids TEXT NOT NULL,
  answer_key TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  submitted_at INTEGER
);

CREATE TABLE IF NOT EXISTS ranked_results (
  session_id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL,
  nickname TEXT NOT NULL,
  season TEXT NOT NULL,
  score INTEGER NOT NULL,
  correct INTEGER NOT NULL,
  answered INTEGER NOT NULL CHECK (answered BETWEEN 0 AND 40),
  status TEXT NOT NULL,
  integrity TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (session_id) REFERENCES ranked_sessions (id)
);

CREATE INDEX IF NOT EXISTS idx_ranked_results_season_status_score ON ranked_results (season, status, score);
CREATE INDEX IF NOT EXISTS idx_ranked_results_device_created ON ranked_results (device_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ranked_sessions_device_created ON ranked_sessions (device_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ranked_sessions_ip_created ON ranked_sessions (ip_hash, created_at);
