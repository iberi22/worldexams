/**
 * Types for the teacher side of the institutions API.
 * Mirrors docs/institutions/CONTRACT.md (v1, 2026-10-20).
 */

export type InstitutionPlan = 'free' | 'school' | 'district';
export type TeacherRole = 'owner' | 'teacher';
export type ResultSource = 'assignment' | 'practice' | 'neurogym';

/** Unix timestamp. The API stores INTEGER columns; read with `toEpochMs`. */
export type Timestamp = number;

export interface Institution {
  id: string;
  name: string;
  country: string;
  city: string;
  plan: InstitutionPlan;
  createdAt?: Timestamp;
}

export interface Teacher {
  id: string;
  email: string;
  name: string;
  role: TeacherRole;
}

export interface Group {
  id: string;
  name: string;
  grade: number;
  joinCode: string;
  institutionId?: string;
  teacherId?: string;
  archived?: boolean | number;
  createdAt?: Timestamp;
  studentCount?: number;
  assignmentCount?: number;
}

export interface Student {
  id: string;
  nickname: string;
  studentCode: string | null;
  joinedAt: Timestamp;
  lastResultAt: Timestamp | null;
  avgPct: number | null;
}

export interface Assignment {
  id: string;
  groupId?: string;
  title: string;
  country: string;
  grade: number;
  subject: string | null;
  questionCount: number;
  dueAt: Timestamp | null;
  createdAt?: Timestamp;
  completedCount?: number;
}

export interface NewAssignment {
  title: string;
  country: string;
  grade: number;
  subject: string | null;
  questionCount: number;
  dueAt: Timestamp | null;
}

export interface ResultRow {
  studentId: string;
  nickname: string;
  studentCode: string | null;
  source: ResultSource;
  subject: string | null;
  total: number;
  correct: number;
  pct: number;
  durationS: number;
  createdAt: Timestamp;
}

export interface ResultsSummary {
  students: number;
  avgPct: number | null;
  bySubject: Record<string, { avgPct: number; n: number }>;
}

export interface ResultsResponse {
  rows: ResultRow[];
  summary: ResultsSummary;
}

export interface AuthRequestResponse {
  ok: true;
  devToken?: string;
}

export interface VerifyResponse {
  sessionToken: string;
  teacher: Teacher;
  institution: Institution | null;
}

export interface MeResponse {
  teacher: Teacher;
  institution: Institution | null;
}

/** Everything the teacher panel needs. Implemented by the fetch client and the mock adapter. */
export interface TeacherApi {
  requestLogin(email: string): Promise<AuthRequestResponse>;
  verify(token: string): Promise<VerifyResponse>;
  me(): Promise<MeResponse>;
  logout(): Promise<void>;
  updateMe(input: { name: string }): Promise<{ teacher: Teacher }>;
  createInstitution(input: { name: string; country: string; city: string }): Promise<Institution>;
  createGroup(input: { name: string; grade: number }): Promise<Group>;
  listGroups(): Promise<Group[]>;
  listStudents(groupId: string): Promise<Student[]>;
  updateStudentCode(groupId: string, studentId: string, studentCode: string | null): Promise<void>;
  removeStudent(groupId: string, studentId: string): Promise<void>;
  createAssignment(groupId: string, input: NewAssignment): Promise<Assignment>;
  listAssignments(groupId: string): Promise<Assignment[]>;
  getResults(groupId: string, assignmentId?: string): Promise<ResultsResponse>;
  downloadResultsCsv(groupId: string, assignmentId?: string): Promise<Blob>;
}
