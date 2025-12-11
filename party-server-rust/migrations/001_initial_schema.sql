-- Migration: 001_initial_schema
-- Description: Create tables for Party Mode (parties, players, suspicious_events)
-- Author: AI-WorldExams
-- Date: 2025-12-01

-- Parties table
CREATE TABLE IF NOT EXISTS parties (
    id TEXT PRIMARY KEY NOT NULL,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    mode TEXT NOT NULL CHECK(mode IN ('practice', 'competitive', 'classroom')),
    host_id TEXT NOT NULL,
    host_name TEXT NOT NULL,
    max_players INTEGER NOT NULL DEFAULT 100,
    status TEXT NOT NULL CHECK(status IN ('waiting', 'starting', 'in_progress', 'paused', 'finished', 'cancelled')) DEFAULT 'waiting',
    current_question INTEGER NOT NULL DEFAULT 0,
    total_questions INTEGER NOT NULL,
    time_limit_seconds INTEGER,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    started_at TEXT,
    finished_at TEXT,
    config TEXT NOT NULL, -- JSON serialized PartyConfig
    CONSTRAINT check_max_players CHECK(max_players > 0 AND max_players <= 1000),
    CONSTRAINT check_current_question CHECK(current_question >= 0),
    CONSTRAINT check_total_questions CHECK(total_questions > 0)
);

-- Index for fast code lookup
CREATE INDEX idx_parties_code ON parties(code);
CREATE INDEX idx_parties_status ON parties(status);
CREATE INDEX idx_parties_created_at ON parties(created_at DESC);

-- Players table
CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY NOT NULL,
    party_id TEXT NOT NULL,
    name TEXT NOT NULL,
    is_host INTEGER NOT NULL DEFAULT 0, -- SQLite boolean (0/1)
    score REAL NOT NULL DEFAULT 0.0,
    correct_answers INTEGER NOT NULL DEFAULT 0,
    total_answers INTEGER NOT NULL DEFAULT 0,
    streak INTEGER NOT NULL DEFAULT 0,
    best_streak INTEGER NOT NULL DEFAULT 0,
    avg_response_time REAL NOT NULL DEFAULT 0.0,
    joined_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_activity TEXT NOT NULL DEFAULT (datetime('now')),
    disconnected_at TEXT,
    FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE CASCADE,
    CONSTRAINT check_score CHECK(score >= 0),
    CONSTRAINT check_correct_answers CHECK(correct_answers >= 0),
    CONSTRAINT check_total_answers CHECK(total_answers >= 0),
    CONSTRAINT check_streak CHECK(streak >= 0),
    CONSTRAINT check_avg_response_time CHECK(avg_response_time >= 0)
);

-- Indexes for fast queries
CREATE INDEX idx_players_party_id ON players(party_id);
CREATE INDEX idx_players_score ON players(score DESC);
CREATE INDEX idx_players_joined_at ON players(joined_at);

-- Suspicious events table (anti-cheat)
CREATE TABLE IF NOT EXISTS suspicious_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id TEXT NOT NULL,
    party_id TEXT NOT NULL,
    event_type TEXT NOT NULL CHECK(event_type IN (
        'tab_switch',
        'window_blur',
        'copy_paste',
        'dev_tools',
        'rapid_answer',
        'inactivity',
        'multiple_tabs'
    )),
    question_index INTEGER,
    timestamp TEXT NOT NULL DEFAULT (datetime('now')),
    metadata TEXT, -- JSON with additional context
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE CASCADE
);

-- Indexes for anti-cheat analysis
CREATE INDEX idx_suspicious_events_player_id ON suspicious_events(player_id);
CREATE INDEX idx_suspicious_events_party_id ON suspicious_events(party_id);
CREATE INDEX idx_suspicious_events_event_type ON suspicious_events(event_type);
CREATE INDEX idx_suspicious_events_timestamp ON suspicious_events(timestamp DESC);

-- View: Party summary with player count
CREATE VIEW IF NOT EXISTS party_summary AS
SELECT 
    p.id,
    p.code,
    p.name,
    p.mode,
    p.status,
    p.current_question,
    p.total_questions,
    p.created_at,
    p.started_at,
    p.finished_at,
    COUNT(pl.id) as player_count,
    p.max_players
FROM parties p
LEFT JOIN players pl ON p.id = pl.party_id AND pl.disconnected_at IS NULL
GROUP BY p.id;

-- View: Player rankings with suspicious event count
CREATE VIEW IF NOT EXISTS player_rankings AS
SELECT 
    pl.id,
    pl.party_id,
    pl.name,
    pl.score,
    pl.correct_answers,
    pl.total_answers,
    CASE 
        WHEN pl.total_answers > 0 
        THEN ROUND(CAST(pl.correct_answers AS REAL) / pl.total_answers * 100, 2)
        ELSE 0.0
    END as accuracy_percentage,
    pl.streak,
    pl.best_streak,
    pl.avg_response_time,
    COUNT(se.id) as suspicious_event_count,
    RANK() OVER (PARTITION BY pl.party_id ORDER BY pl.score DESC) as rank
FROM players pl
LEFT JOIN suspicious_events se ON pl.id = se.player_id
WHERE pl.disconnected_at IS NULL
GROUP BY pl.id;

-- Trigger: Update last_activity on player updates
CREATE TRIGGER IF NOT EXISTS update_player_last_activity
AFTER UPDATE OF score, correct_answers, total_answers ON players
BEGIN
    UPDATE players 
    SET last_activity = datetime('now')
    WHERE id = NEW.id;
END;

-- Trigger: Prevent party modifications when finished
CREATE TRIGGER IF NOT EXISTS prevent_finished_party_updates
BEFORE UPDATE OF status ON parties
WHEN OLD.status = 'finished'
BEGIN
    SELECT RAISE(ABORT, 'Cannot modify finished party');
END;
