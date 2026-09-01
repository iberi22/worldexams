import { describe, it, expect, beforeEach } from 'vitest';
import {
  createAgreement,
  revokeAgreement,
  getActiveAgreementForInstitution,
  getStoredAgreements,
  getStudentNodeHash,
  generateAgreementChecksum
} from './institution-handshake';

describe('Institution P2P Handshake & Consent Protocol', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('generates a stable anonymous node hash for the student', () => {
    const hash1 = getStudentNodeHash();
    const hash2 = getStudentNodeHash();
    expect(hash1).toMatch(/^node_[A-Z0-9]{6,8}$/);
    expect(hash1).toBe(hash2);
  });

  it('creates an active agreement with signature and checksum', () => {
    const agreement = createAgreement({
      institutionId: 'COL-BOG-2026',
      institutionName: 'Colegio Mayor de Bogotá',
      scope: ['mathematics', 'reading'],
      validityDays: 15
    });

    expect(agreement.status).toBe('active');
    expect(agreement.institutionId).toBe('COL-BOG-2026');
    expect(agreement.scope).toEqual(['mathematics', 'reading']);
    expect(agreement.checksum).toBeDefined();

    const stored = getStoredAgreements();
    expect(stored.length).toBe(1);
    expect(stored[0].agreementId).toBe(agreement.agreementId);
  });

  it('retrieves active agreement correctly', () => {
    createAgreement({
      institutionId: 'COL-MED-01',
      institutionName: 'Liceo Antioqueño',
      validityDays: 30
    });

    const active = getActiveAgreementForInstitution('col-med-01');
    expect(active).not.toBeNull();
    expect(active?.institutionId).toBe('COL-MED-01');
    expect(active?.status).toBe('active');
  });

  it('allows immediate revocation of institutional access', () => {
    const agreement = createAgreement({
      institutionId: 'COL-CALI-99',
      institutionName: 'Instituto del Valle'
    });

    expect(getActiveAgreementForInstitution('COL-CALI-99')).not.toBeNull();

    const revoked = revokeAgreement(agreement.agreementId);
    expect(revoked).toBe(true);

    const activeAfter = getActiveAgreementForInstitution('COL-CALI-99');
    expect(activeAfter).toBeNull();
  });
});
