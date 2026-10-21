-- Institutions panel v1 (docs/institutions/CONTRACT.md).
-- Timestamps are unix seconds, like 0001_ranked.sql. Tokens are stored only as
-- SHA-256 hex hashes; the raw token never reaches D1.

CREATE TABLE IF NOT EXISTS institutions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'school', 'district')),
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS teachers (
  id TEXT PRIMARY KEY,
  institution_id TEXT NULL,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'teacher' CHECK (role IN ('owner', 'teacher')),
  created_at INTEGER NOT NULL,
  FOREIGN KEY (institution_id) REFERENCES institutions (id)
);

-- Magic-link tokens: 15 min, single use. `expires_at` doubles as the creation
-- clock for the per-email rate limit (created_at = expires_at - 900).
CREATE TABLE IF NOT EXISTS inst_login_tokens (
  token_hash TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  used_at INTEGER NULL
);

-- `subject_id` points at teachers.id or students.id depending on
-- `subject_type`, so it carries no foreign key.
CREATE TABLE IF NOT EXISTS inst_sessions (
  token_hash TEXT PRIMARY KEY,
  subject_type TEXT NOT NULL CHECK (subject_type IN ('teacher', 'student')),
  subject_id TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS groups (
  id TEXT PRIMARY KEY,
  institution_id TEXT NOT NULL,
  teacher_id TEXT NOT NULL,
  name TEXT NOT NULL,
  grade INTEGER NOT NULL,
  join_code TEXT NOT NULL UNIQUE,
  archived INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (institution_id) REFERENCES institutions (id),
  FOREIGN KEY (teacher_id) REFERENCES teachers (id)
);

CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  group_id TEXT NOT NULL,
  nickname TEXT NOT NULL,
  anonymous_id TEXT NOT NULL,
  student_code TEXT NULL,
  joined_at INTEGER NOT NULL,
  UNIQUE (group_id, anonymous_id),
  FOREIGN KEY (group_id) REFERENCES groups (id)
);

CREATE TABLE IF NOT EXISTS assignments (
  id TEXT PRIMARY KEY,
  group_id TEXT NOT NULL,
  title TEXT NOT NULL,
  country TEXT NOT NULL,
  grade INTEGER NOT NULL,
  subject TEXT NULL,
  question_count INTEGER NOT NULL CHECK (question_count BETWEEN 10 AND 60),
  due_at INTEGER NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (group_id) REFERENCES groups (id)
);

CREATE TABLE IF NOT EXISTS results (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  group_id TEXT NOT NULL,
  assignment_id TEXT NULL,
  source TEXT NOT NULL CHECK (source IN ('assignment', 'practice', 'neurogym')),
  subject TEXT NULL,
  grade INTEGER NOT NULL,
  total INTEGER NOT NULL CHECK (total BETWEEN 0 AND 200),
  correct INTEGER NOT NULL CHECK (correct BETWEEN 0 AND total),
  duration_s INTEGER NOT NULL CHECK (duration_s BETWEEN 0 AND 14400),
  per_area TEXT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES groups (id),
  FOREIGN KEY (assignment_id) REFERENCES assignments (id)
);

-- Abuse counters for /auth/request and /join (one row per attempt, pruned per
-- bucket on write). `bucket` is e.g. `join:ip:<sha256(ip)>`, never a raw IP.
CREATE TABLE IF NOT EXISTS inst_rate_events (
  bucket TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

-- Foreign keys (UNIQUE columns already carry their own index:
-- teachers.email, groups.join_code, students(group_id, anonymous_id)).
CREATE INDEX IF NOT EXISTS idx_teachers_institution ON teachers (institution_id);
CREATE INDEX IF NOT EXISTS idx_groups_institution ON groups (institution_id);
CREATE INDEX IF NOT EXISTS idx_groups_teacher ON groups (teacher_id);
CREATE INDEX IF NOT EXISTS idx_students_group ON students (group_id);
CREATE INDEX IF NOT EXISTS idx_assignments_group ON assignments (group_id);
CREATE INDEX IF NOT EXISTS idx_results_assignment ON results (assignment_id);

-- Query paths: teacher results per group, per-student daily cap and history,
-- per-email login rate limit, session cleanup per subject.
CREATE INDEX IF NOT EXISTS idx_results_group_created ON results (group_id, created_at);
CREATE INDEX IF NOT EXISTS idx_results_student_created ON results (student_id, created_at);
CREATE INDEX IF NOT EXISTS idx_inst_login_tokens_email_expires ON inst_login_tokens (email, expires_at);
CREATE INDEX IF NOT EXISTS idx_inst_rate_events_bucket_created ON inst_rate_events (bucket, created_at);
CREATE INDEX IF NOT EXISTS idx_inst_sessions_subject ON inst_sessions (subject_type, subject_id);
