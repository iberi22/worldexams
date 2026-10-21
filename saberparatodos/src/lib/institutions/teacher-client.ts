/**
 * Typed fetch client for the teacher endpoints of the institutions API.
 * Contract: docs/institutions/CONTRACT.md (base `/v1/inst`).
 */
import type {
  Assignment,
  AuthRequestResponse,
  Group,
  Institution,
  InstitutionPlan,
  MeResponse,
  NewAssignment,
  ResultsResponse,
  Student,
  Teacher,
  TeacherApi,
  VerifyResponse,
} from './types';

export const TEACHER_SESSION_KEY = 'inst.teacher.session';

/** Countries the institutions API accepts (CONTRACT, W2.04 clarifications). */
export const INSTITUTION_COUNTRIES = [
  'co', 'mx', 'ar', 'br', 'cl', 'pe', 'ec', 'pa', 'cr', 'gt',
  'do', 'sv', 'hn', 'ni', 'es', 'pr', 'gq', 'uy', 'py', 'bo',
] as const;

export function isInstitutionCountry(code: string | null | undefined): boolean {
  return (INSTITUTION_COUNTRIES as readonly string[]).includes(String(code ?? '').toLowerCase());
}
export const DEFAULT_API_ORIGIN = 'https://api.saberparatodos.space';

/** Display-side mirror of the API `PLAN_LIMITS` (the API enforces them). */
export const PLAN_LIMITS: Record<InstitutionPlan, { groups: number; students: number; activeAssignments: number }> = {
  free: { groups: 2, students: 60, activeAssignments: 10 },
  school: { groups: 30, students: 1500, activeAssignments: Infinity },
  district: { groups: Infinity, students: Infinity, activeAssignments: Infinity },
};

export const PLAN_LABELS: Record<InstitutionPlan, string> = {
  free: 'plan gratuito',
  school: 'plan colegio',
  district: 'plan distrito',
};

/**
 * Builds the institutions base URL from the API origin only.
 * `PUBLIC_API_BASE_URL` is `/api`, `https://api…` or `https://api…/v1` depending on the
 * environment, so appending `/v1` to it can produce `/v1/v1`. Taking the origin avoids that.
 * The site `/api` proxy only serves questions and packs, so relative values fall back to the
 * public API origin.
 */
export function resolveInstApiBase(raw?: string | null): string {
  const value = String(raw ?? '').trim();
  let origin = DEFAULT_API_ORIGIN;
  if (/^https?:\/\//i.test(value)) {
    try {
      origin = new URL(value).origin;
    } catch {
      origin = DEFAULT_API_ORIGIN;
    }
  }
  return `${origin}/v1/inst`;
}

function envApiBase(): string | undefined {
  return typeof import.meta !== 'undefined' ? import.meta.env?.PUBLIC_API_BASE_URL : undefined;
}

// ---------------------------------------------------------------------------
// Session token storage
// ---------------------------------------------------------------------------

export function loadTeacherSession(): string | null {
  try {
    const value = globalThis.localStorage?.getItem(TEACHER_SESSION_KEY);
    return value && value.trim() ? value : null;
  } catch {
    return null;
  }
}

export function saveTeacherSession(token: string): void {
  try {
    globalThis.localStorage?.setItem(TEACHER_SESSION_KEY, token);
  } catch {
    // Storage blocked (private mode): the session lives only in memory for this page.
  }
}

export function clearTeacherSession(): void {
  try {
    globalThis.localStorage?.removeItem(TEACHER_SESSION_KEY);
  } catch {
    // Nothing to clear.
  }
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export class InstApiError extends Error {
  readonly status: number;
  readonly code: string;
  /** `PLAN_LIMIT` carries the exhausted resource: `groups`, `students` or `activeAssignments`. */
  readonly resource?: string;

  constructor(status: number, code: string, message?: string, resource?: string) {
    super(message || code);
    this.name = 'InstApiError';
    this.status = status;
    this.code = code;
    this.resource = resource;
  }
}

export function isUnauthorized(error: unknown): boolean {
  return error instanceof InstApiError && (error.status === 401 || error.code === 'UNAUTHORIZED');
}

const ERROR_MESSAGES: Record<string, string> = {
  PLAN_LIMIT:
    'Llegaste al límite de tu plan (grupos, estudiantes o tareas activas). Archiva lo que ya no uses o escríbenos para ampliar el plan.',
  EMAIL_UNAVAILABLE: 'El envío de correos no está disponible en este momento. Intenta de nuevo en unos minutos.',
  FORBIDDEN: 'No tienes permiso para ver o cambiar este grupo.',
  UNAUTHORIZED: 'Tu sesión expiró. Vuelve a entrar con tu correo.',
  INVALID_TOKEN: 'El enlace no es válido, ya se usó o expiró. Pide uno nuevo.',
  TOKEN_EXPIRED: 'El enlace expiró. Pide uno nuevo.',
  TOKEN_USED: 'Este enlace ya se usó. Pide uno nuevo.',
  INVALID_EMAIL: 'Escribe un correo válido.',
  NO_INSTITUTION: 'Primero crea tu institución.',
  BODY_TOO_LARGE: 'Los datos enviados son demasiado grandes.',
  RATE_LIMITED: 'Demasiados intentos. Espera un momento antes de volver a intentarlo.',
  NOT_FOUND: 'No encontramos ese recurso. Puede que ya no exista.',
  CONFLICT: 'Ese cambio entra en conflicto con datos existentes.',
  INSTITUTION_EXISTS: 'Tu cuenta ya tiene una institución creada.',
  INVALID_INPUT: 'Revisa los datos del formulario.',
  NETWORK: 'No pudimos conectar con el servidor. Revisa tu conexión a internet.',
};

const STATUS_FALLBACK: Record<number, string> = {
  400: 'INVALID_INPUT',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  429: 'RATE_LIMITED',
};

/** Spanish message for any error thrown by the client. */
const PLAN_LIMIT_MESSAGES: Record<string, string> = {
  groups: 'Llegaste al límite de grupos de tu plan. Archiva un grupo o escríbenos para ampliar el plan.',
  students: 'Tu institución llegó al límite de estudiantes del plan. Escríbenos para ampliar el plan.',
  activeAssignments:
    'Llegaste al límite de tareas activas de tu plan. Espera a que venza alguna o escríbenos para ampliar el plan.',
};

export function teacherErrorMessage(error: unknown): string {
  if (error instanceof InstApiError) {
    if (error.status === 401 && ERROR_MESSAGES[error.code] && error.code !== 'UNAUTHORIZED') return ERROR_MESSAGES[error.code];
    if (error.status === 401) return ERROR_MESSAGES.UNAUTHORIZED;
    if (error.code === 'PLAN_LIMIT' && error.resource && PLAN_LIMIT_MESSAGES[error.resource]) {
      return PLAN_LIMIT_MESSAGES[error.resource];
    }
    const known = ERROR_MESSAGES[error.code] ?? ERROR_MESSAGES[STATUS_FALLBACK[error.status] ?? ''];
    if (known) return known;
  }
  return 'Ocurrió un error inesperado. Intenta de nuevo.';
}

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

export interface TeacherClientOptions {
  /** Full base including `/v1/inst`. Defaults to `resolveInstApiBase(PUBLIC_API_BASE_URL)`. */
  baseUrl?: string;
  fetch?: typeof fetch;
  getToken?: () => string | null;
}

export function createTeacherClient(options: TeacherClientOptions = {}): TeacherApi {
  const baseUrl = (options.baseUrl ?? resolveInstApiBase(envApiBase())).replace(/\/+$/, '');
  const doFetch = options.fetch ?? ((...args: Parameters<typeof fetch>) => fetch(...args));
  const getToken = options.getToken ?? loadTeacherSession;

  function url(path: string, query?: Record<string, string | undefined>): string {
    const target = new URL(`${baseUrl}${path}`);
    for (const [key, value] of Object.entries(query ?? {})) {
      if (value) target.searchParams.set(key, value);
    }
    return target.toString();
  }

  async function send(method: string, path: string, body?: unknown, query?: Record<string, string | undefined>) {
    const headers: Record<string, string> = { Accept: 'application/json' };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    if (body !== undefined) headers['Content-Type'] = 'application/json';

    let response: Response;
    try {
      response = await doFetch(url(path, query), {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch {
      throw new InstApiError(0, 'NETWORK');
    }

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as
        | { error?: string; message?: string; resource?: string }
        | null;
      const code = payload?.error || STATUS_FALLBACK[response.status] || `HTTP_${response.status}`;
      throw new InstApiError(response.status, code, payload?.message, payload?.resource);
    }
    return response;
  }

  async function json<T>(method: string, path: string, body?: unknown, query?: Record<string, string | undefined>) {
    const response = await send(method, path, body, query);
    return (await response.json()) as T;
  }

  const groupPath = (groupId: string) => `/groups/${encodeURIComponent(groupId)}`;

  return {
    requestLogin: (email) => json<AuthRequestResponse>('POST', '/auth/request', { email }),
    verify: (token) => json<VerifyResponse>('POST', '/auth/verify', { token }),
    me: () => json<MeResponse>('GET', '/me'),
    logout: async () => {
      await send('POST', '/auth/logout');
    },
    updateMe: (input) => json<{ teacher: Teacher }>('PATCH', '/me', input),
    createInstitution: (input) => json<Institution>('POST', '/institutions', input),
    createGroup: (input) => json<Group>('POST', '/groups', input),
    listGroups: async () => (await json<{ groups: Group[] }>('GET', '/groups')).groups,
    listStudents: async (groupId) =>
      (await json<{ students: Student[] }>('GET', `${groupPath(groupId)}/students`)).students,
    updateStudentCode: async (groupId, studentId, studentCode) => {
      await send('PATCH', `${groupPath(groupId)}/students/${encodeURIComponent(studentId)}`, { studentCode });
    },
    removeStudent: async (groupId, studentId) => {
      await send('DELETE', `${groupPath(groupId)}/students/${encodeURIComponent(studentId)}`);
    },
    createAssignment: (groupId, input: NewAssignment) =>
      json<Assignment>('POST', `${groupPath(groupId)}/assignments`, input),
    listAssignments: async (groupId) =>
      (await json<{ assignments: Assignment[] }>('GET', `${groupPath(groupId)}/assignments`)).assignments,
    getResults: (groupId, assignmentId) =>
      json<ResultsResponse>('GET', `${groupPath(groupId)}/results`, undefined, { assignmentId }),
    downloadResultsCsv: async (groupId, assignmentId) => {
      const response = await send('GET', `${groupPath(groupId)}/results.csv`, undefined, { assignmentId });
      return response.blob();
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers shared by the components
// ---------------------------------------------------------------------------

/** ISO-8601 timestamp from the API → epoch milliseconds, or null when missing or invalid. */
export function parseTimestamp(value: string | null | undefined): number | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  const ms = Date.parse(value);
  return Number.isNaN(ms) ? null : ms;
}

export function formatDate(value: string | null | undefined, locale = 'es'): string {
  const ms = parseTimestamp(value);
  if (ms === null) return '—';
  try {
    return new Date(ms).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return new Date(ms).toISOString().slice(0, 10);
  }
}

/** `YYYY-MM-DD` from a date input → ISO-8601 UTC string for the end of that local day. */
export function dueDateToIso(value: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d, 23, 59, 59);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function planUsageLabel(plan: InstitutionPlan, used: number): string {
  const limit = PLAN_LIMITS[plan].groups;
  const noun = used === 1 && limit === 1 ? 'grupo' : 'grupos';
  if (!Number.isFinite(limit)) return `${used} ${noun} en ${PLAN_LABELS[plan]} (sin límite)`;
  return `${used} de ${limit} ${noun} en ${PLAN_LABELS[plan]}`;
}

export function canCreateGroup(plan: InstitutionPlan, used: number): boolean {
  return used < PLAN_LIMITS[plan].groups;
}

/**
 * The student panel lives at `/perfil#mi-colegio` and reads the code from `?colegio=` (W2.06).
 * `?join=` is already taken by exam rooms.
 */
export const JOIN_PATH = '/perfil';
export const JOIN_QUERY_PARAM = 'colegio';
export const JOIN_HASH = '#mi-colegio';

export function joinUrl(joinCode: string, siteOrigin?: string): string {
  const origin =
    siteOrigin ||
    (typeof window !== 'undefined' && /^https?:/.test(window.location?.origin ?? '')
      ? window.location.origin
      : 'https://saberparatodos.space');
  return `${origin.replace(/\/+$/, '')}${JOIN_PATH}?${JOIN_QUERY_PARAM}=${encodeURIComponent(joinCode)}${JOIN_HASH}`;
}
