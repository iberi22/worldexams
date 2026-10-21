/**
 * Student ↔ institution handshake.
 *
 * The source of truth is now the institutions API (student-client.ts): the
 * student joins a group with the teacher's code and decides whether results are
 * shared. This module keeps its previous exported API so existing callers keep
 * working:
 *
 * - The joined group is exposed as an `InstitutionAgreement` (id `inst_<groupId>`)
 *   whose status follows the "compartir con mi colegio" switch.
 * - Agreements created by the old localStorage-only handshake
 *   (`worldexams_institution_agreements`) stay readable and revocable, but they
 *   never sent anything off the device and still don't.
 */

import { simpleHash } from './identity';
import { getOrCreateSwalInstanceId } from './swal-instance-id';
import {
  getStudentSession,
  setShareWithSchool,
  type StudentSession
} from './institutions/student-client';

export type AgreementScope = 'all' | 'mathematics' | 'reading' | 'sciences' | 'socials' | 'english';

export interface InstitutionAgreement {
  agreementId: string;
  studentNodeHash: string;
  institutionId: string;
  institutionName: string;
  scope: AgreementScope[];
  status: 'active' | 'revoked' | 'expired';
  grantedAt: string; // ISO Date
  expiresAt: string; // ISO Date
  checksum: string;
  /** 'joined' = API group membership; 'legacy' = old on-device agreement. */
  source?: 'joined' | 'legacy';
}

const STORAGE_KEY = 'worldexams_institution_agreements';
const JOINED_PREFIX = 'inst_';
/** Student sessions last 180 days (CONTRACT.md). */
const STUDENT_SESSION_DAYS = 180;

export function getStudentNodeHash(): string {
  const instanceId = getOrCreateSwalInstanceId();
  const hashVal = simpleHash(`node_${instanceId}`).toString(36).toUpperCase().padStart(6, '0').slice(0, 8);
  return `node_${hashVal}`;
}

export function generateAgreementChecksum(
  nodeHash: string,
  institutionId: string,
  timestamp: string
): string {
  const raw = `${nodeHash}:${institutionId}:${timestamp}:swal_verified`;
  return Math.abs(simpleHash(raw)).toString(36);
}

// ---------------------------------------------------------------------------
// Joined group (API)
// ---------------------------------------------------------------------------

export function agreementFromSession(session: StudentSession): InstitutionAgreement {
  const studentNodeHash = getStudentNodeHash();
  const institutionId = session.group.id.toUpperCase();
  const grantedAt = session.joinedAt || new Date(0).toISOString();
  const expires = new Date(new Date(grantedAt).getTime() + STUDENT_SESSION_DAYS * 24 * 60 * 60 * 1000);
  return {
    agreementId: `${JOINED_PREFIX}${session.group.id}`,
    studentNodeHash,
    institutionId,
    institutionName: [session.institution?.name, session.group?.name].filter(Boolean).join(' · '),
    scope: ['all'],
    status: session.shareWithSchool ? 'active' : 'revoked',
    grantedAt,
    expiresAt: Number.isNaN(expires.getTime()) ? new Date(Date.now()).toISOString() : expires.toISOString(),
    checksum: generateAgreementChecksum(studentNodeHash, institutionId, grantedAt),
    source: 'joined'
  };
}

/** The group the student joined with a code, as an agreement, or null. */
export function getJoinedAgreement(): InstitutionAgreement | null {
  const session = getStudentSession();
  return session ? agreementFromSession(session) : null;
}

// ---------------------------------------------------------------------------
// Legacy on-device agreements
// ---------------------------------------------------------------------------

function isAgreementLike(value: any): value is InstitutionAgreement {
  return Boolean(value && typeof value.agreementId === 'string' && typeof value.institutionId === 'string');
}

function readLegacyAgreements(): InstitutionAgreement[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isAgreementLike).map((a) => ({
      ...a,
      institutionName: String(a.institutionName ?? ''),
      scope: Array.isArray(a.scope) && a.scope.length > 0 ? a.scope : ['all'],
      status: a.status === 'active' || a.status === 'revoked' || a.status === 'expired' ? a.status : 'expired',
      source: 'legacy' as const
    }));
  } catch (e) {
    console.warn('[InstitutionHandshake] Error reading stored agreements:', e);
    return [];
  }
}

function writeLegacyAgreements(agreements: InstitutionAgreement[]): boolean {
  if (typeof localStorage === 'undefined') return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agreements.map(({ source: _source, ...rest }) => rest)));
    return true;
  } catch (e) {
    console.warn('[InstitutionHandshake] Error saving agreements:', e);
    return false;
  }
}

/** Legacy agreements still active (not revoked, not expired). */
export function getActiveLegacyAgreements(): InstitutionAgreement[] {
  const now = Date.now();
  return readLegacyAgreements().filter((a) => a.status === 'active' && new Date(a.expiresAt).getTime() > now);
}

// ---------------------------------------------------------------------------
// Previous public API
// ---------------------------------------------------------------------------

/** Joined group first (when any), then legacy agreements. */
export function getStoredAgreements(): InstitutionAgreement[] {
  const joined = getJoinedAgreement();
  const legacy = readLegacyAgreements();
  return joined ? [joined, ...legacy] : legacy;
}

/** Legacy, on-device only. New links go through `joinGroup` (student-client.ts). */
export function saveAgreement(agreement: InstitutionAgreement): void {
  if (agreement.agreementId.startsWith(JOINED_PREFIX)) return;
  const agreements = readLegacyAgreements().filter((a) => a.agreementId !== agreement.agreementId);
  agreements.push({ ...agreement, source: 'legacy' });
  writeLegacyAgreements(agreements);
}

/** Legacy, on-device only. New links go through `joinGroup` (student-client.ts). */
export function createAgreement(input: {
  institutionId: string;
  institutionName: string;
  scope?: AgreementScope[];
  validityDays?: number;
}): InstitutionAgreement {
  const studentNodeHash = getStudentNodeHash();
  const grantedAt = new Date().toISOString();
  const days = input.validityDays || 30;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  const agreement: InstitutionAgreement = {
    agreementId: `agr_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`,
    studentNodeHash,
    institutionId: input.institutionId.trim().toUpperCase(),
    institutionName: input.institutionName.trim(),
    scope: input.scope || ['all'],
    status: 'active',
    grantedAt,
    expiresAt: expires.toISOString(),
    checksum: generateAgreementChecksum(studentNodeHash, input.institutionId, grantedAt),
    source: 'legacy'
  };

  saveAgreement(agreement);
  return agreement;
}

/**
 * Revokes an agreement. For the joined group this turns off result sharing (the
 * student stays in the group; leaving is `leaveGroup()`).
 */
export function revokeAgreement(agreementId: string): boolean {
  if (agreementId.startsWith(JOINED_PREFIX)) {
    const session = getStudentSession();
    if (!session || `${JOINED_PREFIX}${session.group.id}` !== agreementId) return false;
    return setShareWithSchool(false) !== null;
  }

  const agreements = readLegacyAgreements();
  const target = agreements.find((a) => a.agreementId === agreementId);
  if (!target) return false;
  target.status = 'revoked';
  return writeLegacyAgreements(agreements);
}

export function getActiveAgreementForInstitution(institutionId: string): InstitutionAgreement | null {
  const normId = institutionId.trim().toUpperCase();
  const now = Date.now();
  return (
    getStoredAgreements().find(
      (a) => a.institutionId === normId && a.status === 'active' && new Date(a.expiresAt).getTime() > now
    ) || null
  );
}
