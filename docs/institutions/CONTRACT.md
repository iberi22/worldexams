# Institutions panel — API contract v1 (2026-10-20)

Source of truth for three parallel work items: API (W2.04), teacher panel (W2.05) and student join/results (W2.06).
Change this file only in the API PR, and only additively.

## Decisions

- **Storage:** D1 database already bound as `RANKED_DB` (`worldexams-ranked`). New migration `apps/worldexams-api/migrations/0002_institutions.sql`. No KV writes (KV allows 1,000 writes/day for the whole Cloudflare account).
- **Teacher auth:** passwordless magic link (the project rule in `docs/AUTHENTICATION_MAGIC_LINK.md`). Email goes out through an `EmailSender` interface. The production implementation uses the Cloudflare Email Sending binding `env.EMAIL` when it is present. When it is missing, `/auth/request` returns `503 {error:"EMAIL_UNAVAILABLE"}`. With `env.INST_DEV_LOGIN === "1"` (local and tests only) the response includes `devToken`.
- **Sessions:** opaque random token (32 bytes, hex). D1 stores only its SHA-256 hash. TTL 30 days for teachers and 180 days for students. Sent as `Authorization: Bearer <token>`.
- **Students are minors:** no email, no real name required. A student is `nickname` plus `anonymousId` (the app's existing anonymous device id) plus an optional `studentCode` that the teacher assigns. Nicknames are trimmed, 2–24 chars, and pass the same validation as ranked nicknames.
- **Plans:** `institutions.plan` is `'free' | 'school' | 'district'`, default `'free'`. Limits live in one exported constant `PLAN_LIMITS` in `institutions.ts`. Free: 2 groups, 60 students, 10 active assignments. School: 30 groups, 1,500 students. District: unlimited. No billing in v1. An admin changes the plan in D1 by hand.
- **CORS:** same allowlist helper as the rest of the API.
- **Errors:** `{ error: "CODE", message?: string }` with HTTP 400/401/403/404/409/429/503.

## Tables (0002_institutions.sql)

```sql
institutions(id TEXT PK, name TEXT, country TEXT, city TEXT, plan TEXT DEFAULT 'free', created_at INTEGER)
teachers(id TEXT PK, institution_id TEXT NULL, email TEXT UNIQUE, name TEXT, role TEXT DEFAULT 'teacher' /* owner|teacher */, created_at INTEGER)
inst_login_tokens(token_hash TEXT PK, email TEXT, expires_at INTEGER, used_at INTEGER NULL)      -- 15 min, single use
inst_sessions(token_hash TEXT PK, subject_type TEXT /* teacher|student */, subject_id TEXT, expires_at INTEGER)
groups(id TEXT PK, institution_id TEXT, teacher_id TEXT, name TEXT, grade INTEGER, join_code TEXT UNIQUE, archived INTEGER DEFAULT 0, created_at INTEGER)
students(id TEXT PK, group_id TEXT, nickname TEXT, anonymous_id TEXT, student_code TEXT NULL, joined_at INTEGER, UNIQUE(group_id, anonymous_id))
assignments(id TEXT PK, group_id TEXT, title TEXT, country TEXT, grade INTEGER, subject TEXT NULL, question_count INTEGER, due_at INTEGER NULL, created_at INTEGER)
results(id TEXT PK, student_id TEXT, group_id TEXT, assignment_id TEXT NULL, source TEXT /* assignment|practice|neurogym */, subject TEXT NULL, grade INTEGER, total INTEGER, correct INTEGER, duration_s INTEGER, per_area TEXT NULL /* JSON {area:{total,correct}} */, created_at INTEGER)
```

The join code has 6 characters from `ABCDEFGHJKMNPQRSTUVWXYZ23456789` (no 0/O/1/I/L), drawn with `crypto.getRandomValues`.

## Endpoints (base `https://api.saberparatodos.space/v1/inst`)

### Teacher auth
| Method | Path | Body | Response |
|---|---|---|---|
| POST | `/auth/request` | `{email}` | `202 {ok:true}` (+ `devToken` in dev). Rate limit: 5 per email per hour (D1 count). |
| POST | `/auth/verify` | `{token}` | `200 {sessionToken, teacher:{id,email,name,role}, institution: Institution\|null}` |
| GET | `/me` | — | `200 {teacher, institution}` |
| POST | `/auth/logout` | — | `204` |

The magic link points to `${SITE_ORIGIN}/institucion/entrar?token=<token>`. `SITE_ORIGIN` is a wrangler var, default `https://saberparatodos.space`.

### Institution and groups (teacher session)
| Method | Path | Body | Response |
|---|---|---|---|
| POST | `/institutions` | `{name, country, city}` | `201 Institution`. Allowed only when the teacher has none; the teacher becomes `owner`. |
| PATCH | `/me` | `{name}` | `200 {teacher}` |
| POST | `/groups` | `{name, grade}` | `201 Group` (with `joinCode`). Enforces `PLAN_LIMITS.groups`. |
| GET | `/groups` | — | `200 {groups: Group[]}` (each with `studentCount`, `assignmentCount`) |
| GET | `/groups/:id/students` | — | `200 {students:[{id,nickname,studentCode,joinedAt,lastResultAt,avgPct}]}` |
| PATCH | `/groups/:id/students/:sid` | `{studentCode}` | `200` |
| DELETE | `/groups/:id/students/:sid` | — | `204` (removes the student and their results) |
| POST | `/groups/:id/assignments` | `{title,country,grade,subject\|null,questionCount(10..60),dueAt\|null}` | `201 Assignment` |
| GET | `/groups/:id/assignments` | — | `200 {assignments:[...with completedCount]}` |
| GET | `/groups/:id/results` | query `assignmentId?` | `200 {rows:[{studentId,nickname,studentCode,source,subject,total,correct,pct,durationS,createdAt}], summary:{students,avgPct,bySubject:{[s]:{avgPct,n}}}}` |
| GET | `/groups/:id/results.csv` | query `assignmentId?` | `text/csv; charset=utf-8` with a BOM, columns `nickname,student_code,source,subject,total,correct,pct,duration_s,created_at_iso` |

A teacher can only touch groups of their own institution (`403 FORBIDDEN` otherwise). An owner sees every group of the institution. A plain teacher sees only their own.

### Student (no account)
| Method | Path | Body | Response |
|---|---|---|---|
| POST | `/join` | `{joinCode, nickname, anonymousId}` | `200 {studentToken, student:{id,nickname}, group:{id,name,grade}, institution:{name,country}}`. Idempotent per `(group, anonymousId)`. Enforces `PLAN_LIMITS.students`. |
| GET | `/student/me` | — | `200 {student, group, institution}` |
| GET | `/student/assignments` | — | `200 {assignments:[{id,title,country,grade,subject,questionCount,dueAt,done:boolean}]}` |
| POST | `/student/results` | `{assignmentId?, source, subject?, grade, total, correct, durationS, perArea?}` | `201 {id}`. Validates `0 ≤ correct ≤ total ≤ 200` and `durationS ≤ 14400`. Max 60 results per student per day. |
| POST | `/student/leave` | — | `204` (deletes the student row, their results and their session) |

## Frontend surfaces

- `/institucion` (teacher panel, W2.05): login, create institution, groups, join code with a copy button and a printable QR, students, assignments, results table, CSV download.
- `/institucion/entrar` (W2.05): consumes `?token=`, stores the session token in `localStorage['inst.teacher.session']`.
- Student side (W2.06): `src/lib/institution-client.ts` (typed client for `/join`, `/student/*`), a "Unirme a mi colegio" entry that replaces the localStorage-only handshake, and opt-in result sharing after an exam and after NeuroGym. Student token in `localStorage['inst.student.session']`. Results are sent **only** when the student has joined a group and has the "compartir con mi colegio" switch on (default on after joining, visible and reversible).
- The API base comes from the existing helper the app already uses for `PUBLIC_API_BASE_URL`. Watch the existing `/v1/v1` double-prefix bug: build URLs from the origin, never by concatenating `/v1` twice.
