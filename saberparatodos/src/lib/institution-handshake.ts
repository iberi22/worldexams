/**
 * Protocolo de Acuerdo Nodo Estudiante ↔ Institución (P2P Handshake)
 * Permite a estudiantes compartir diagnósticos con su colegio de forma soberana y privada.
 */

import { simpleHash } from './identity';
import { getOrCreateSwalInstanceId } from './swal-instance-id';

export interface InstitutionAgreement {
  agreementId: string;
  studentNodeHash: string;
  institutionId: string;
  institutionName: string;
  scope: Array<'all' | 'mathematics' | 'reading' | 'sciences' | 'socials' | 'english'>;
  status: 'active' | 'revoked' | 'expired';
  grantedAt: string; // ISO Date
  expiresAt: string; // ISO Date
  checksum: string;
}

const STORAGE_KEY = 'worldexams_institution_agreements';

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

export function getStoredAgreements(): InstitutionAgreement[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('[InstitutionHandshake] Error reading stored agreements:', e);
    return [];
  }
}

export function saveAgreement(agreement: InstitutionAgreement): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const agreements = getStoredAgreements().filter(a => a.agreementId !== agreement.agreementId);
    agreements.push(agreement);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agreements));
  } catch (e) {
    console.warn('[InstitutionHandshake] Error saving agreement:', e);
  }
}

export function createAgreement(input: {
  institutionId: string;
  institutionName: string;
  scope?: Array<'all' | 'mathematics' | 'reading' | 'sciences' | 'socials' | 'english'>;
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
    checksum: generateAgreementChecksum(studentNodeHash, input.institutionId, grantedAt)
  };

  saveAgreement(agreement);
  return agreement;
}

export function revokeAgreement(agreementId: string): boolean {
  if (typeof localStorage === 'undefined') return false;
  const agreements = getStoredAgreements();
  const target = agreements.find(a => a.agreementId === agreementId);
  if (!target) return false;

  target.status = 'revoked';
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agreements));
    return true;
  } catch (e) {
    console.warn('[InstitutionHandshake] Error revoking agreement:', e);
    return false;
  }
}

export function getActiveAgreementForInstitution(institutionId: string): InstitutionAgreement | null {
  const normId = institutionId.trim().toUpperCase();
  const now = new Date().getTime();
  const agreements = getStoredAgreements();

  return agreements.find(a => 
    a.institutionId === normId && 
    a.status === 'active' && 
    new Date(a.expiresAt).getTime() > now
  ) || null;
}
