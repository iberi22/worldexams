-- Parties table
CREATE TABLE IF NOT EXISTS parties (
    id TEXT PRIMARY KEY NOT NULL,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    host_id TEXT NOT NULL,
    host_name TEXT NOT NULL,
    max_players INTEGER NOT NULL,
    time_per_question INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    grade INTEGER NOT NULL,
    subject TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL,
    started_at TEXT,
    finished_at TEXT
);

-- Players table
CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY NOT NULL,
    party_id TEXT NOT NULL,
    name TEXT NOT NULL,
    is_online INTEGER NOT NULL DEFAULT 1,
    is_host INTEGER NOT NULL DEFAULT 0,
    joined_at TEXT NOT NULL,
    left_screen_count INTEGER NOT NULL DEFAULT 0,
    last_activity_at TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    correct_answers INTEGER NOT NULL DEFAULT 0,
    total_answers INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE CASCADE
);

-- Suspicious events table
CREATE TABLE IF NOT EXISTS suspicious_events (
    id TEXT PRIMARY KEY NOT NULL,
    player_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    duration_ms INTEGER,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);

-- Answers table
CREATE TABLE IF NOT EXISTS answers (
    id TEXT PRIMARY KEY NOT NULL,
    player_id TEXT NOT NULL,
    party_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    answer TEXT NOT NULL,
    is_correct INTEGER NOT NULL,
    time_spent_ms INTEGER NOT NULL,
    timestamp TEXT NOT NULL,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE CASCADE
);
