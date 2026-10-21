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

## Clarifications from the API implementation (W2.04, additive)

These fill gaps the tables above leave open. They change no response shape above.

- **Timestamps:** every timestamp in a response (`createdAt`, `joinedAt`, `lastResultAt`, `dueAt`) is an ISO-8601 UTC string or `null`, like ranked's `expiresAt`. D1 stores unix seconds. `dueAt` in a request body is an ISO-8601 string or `null`. A number is refused.
- **Codes:** `country` (institution and assignment) is one of the supported ISO alpha-2 codes `co mx ar br cl pe ec pa cr gt do sv hn ni es pr gq uy py bo`. Upper case is accepted and stored lower case. `subject` is a lower-case slug (`[a-z0-9_-]{2,40}`) or `null`. `grade` is an integer 1–12.
- **Lengths (trimmed):** institution `name` 2–120 and `city` 1–80, teacher `name` 1–80, group `name` 1–60, assignment `title` 1–120, `studentCode` 1–32 or `null` (`""` also clears it). Control characters are refused. Bodies over 16 KB get `400 BODY_TOO_LARGE`.
- **Nickname:** ranked's character set (letters, digits, space, `_`, `-`), length 2–24 as stated above. Ranked itself keeps 3–20. Both use `isValidNickname` in `src/ranked.ts`.
- **`anonymousId`:** same shape as ranked's `deviceId`, `^[A-Za-z0-9_-]{8,64}$` (a UUID fits).
- **Shapes not spelled out above:**
  - `Institution` is `{id, name, country, city, plan, createdAt}`.
  - `Group` is `{id, institutionId, teacherId, name, grade, joinCode, archived, createdAt, studentCount, assignmentCount}`.
  - `Assignment` is `{id, groupId, title, country, grade, subject, questionCount, dueAt, createdAt, completedCount}`. `completedCount` counts distinct students with at least one result for the assignment.
  - `PATCH /groups/:id/students/:sid` returns `200 {student:{id, nickname, studentCode}}`.
- **Results:**
  - `assignmentId` is required when `source` is `"assignment"` and refused for any other source. It must belong to the student's group, else `404`.
  - `perArea` holds at most 20 areas. Each area is `{total, correct}` with `0 ≤ correct ≤ total ≤ 200`.
  - `pct` is `correct/total` as a percentage with one decimal, and `0` when `total` is 0.
  - `summary.avgPct` and each student's `avgPct` are `null` when there are no results.
  - `summary.students` counts distinct students in `rows`.
  - `bySubject` uses the key `"general"` for results with no subject.
  - The JSON response also carries `truncated: boolean`. Rows are newest first and capped at 10,000, and the CSV has the same cap.
  - The daily cap of 60 results counts per UTC day.
- **Plan limits:**
  - `409 PLAN_LIMIT` also carries `resource` (`"groups"`, `"students"` or `"activeAssignments"`).
  - Students count across the whole institution.
  - An active assignment has `dueAt` null or in the future, counted across the institution.
  - A student who re-joins does not take a new seat.
  - `PLAN_LIMITS` uses `null` for unlimited.
- **Join:**
  - The join code is case-insensitive.
  - A malformed code gets `400 INVALID_JOIN_CODE`. An unknown or archived group gets `404 JOIN_CODE_NOT_FOUND`.
  - A re-join returns the same `student.id`, updates the nickname to the latest value and issues a new `studentToken`. Older tokens stay valid until they expire.
- **Auth errors:**
  - Every missing, malformed or expired session gets `401 UNAUTHORIZED`. So does a session of the wrong kind: a student token on a teacher route, or the reverse.
  - `/auth/verify` answers `401` with `INVALID_TOKEN`, `TOKEN_USED` or `TOKEN_EXPIRED`.
  - A malformed email gets `400 INVALID_EMAIL`.
  - Going over 5 links per email per hour gets `429 RATE_LIMITED`.
  - When the email binding fails to send, the response is `503 EMAIL_UNAVAILABLE` and the token is discarded.
- **Teacher flow:**
  - `POST /institutions` answers `409 INSTITUTION_EXISTS` when the teacher already has an institution.
  - `POST /groups` answers `409 NO_INSTITUTION` before an institution exists.
  - A teacher with no institution gets `GET /groups` → `{groups: []}`.
  - `:id` paths answer `404 NOT_FOUND` for unknown ids and `403 FORBIDDEN` for groups outside the teacher's reach.
  - v1 has no endpoint to invite a second teacher. Set `teachers.institution_id` and `role` in D1 by hand.
- **CSV:**
  - Rows are separated by CRLF.
  - Any cell that starts with `=`, `+`, `-`, `@`, a tab or CR gets a leading `'`.
  - Cells with `,`, `"` or line breaks are quoted.
  - The response has `Content-Disposition: attachment; filename="resultados-<groupId>.csv"`.
- **CORS:** the shared allowlist helper now allows `PATCH` and `DELETE` as well.
- **Abuse limits (rolling hour, counted in D1 table `inst_rate_events`, IPs stored only as SHA-256):** these come on top of the contract's limits, and every one of them answers `429 RATE_LIMITED`.
  - `/auth/request`: 20 per IP.
  - `/join`: 300 requests per IP, plus 200 joins per join code.
  - After 20 unknown join codes from one IP, that IP gets `429` on `/join` for the rest of the hour, even with a valid code. This blocks code guessing without blocking a classroom behind one NAT.
  - The values live in `INST_RATE_LIMITS` in `institutions.ts`.
