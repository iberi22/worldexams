/**
 * Validation Registry for Question Bundles
 * Defines the quality status of different exam domains.
 */

export type ValidationStatus = 'verified' | 'in_review' | 'unreviewed';

export interface ValidationMeta {
  status: ValidationStatus;
  label: string;
  icon: string;
  description: string;
  color: string;
}

export const VALIDATION_STATUSES: Record<ValidationStatus, ValidationMeta> = {
  verified: {
    status: 'verified',
    label: 'Revisado',
    icon: '✅',
    description: 'Contenido verificado con feedback detallado (MASTERY 5.1+)',
    color: '#10b981' // emerald-500
  },
  in_review: {
    status: 'in_review',
    label: 'En Revisión',
    icon: '⚠️',
    description: 'Actualizando contenido y agregando explicaciones',
    color: '#f59e0b' // amber-500
  },
  unreviewed: {
    status: 'unreviewed',
    label: 'Sin Revisión',
    icon: '⏳',
    description: 'Contenido legacy (v3.0). Feedback limitado.',
    color: '#6b7280' // slate-500
  }
};

/**
 * Heuristic to determine validation status from question metadata
 */
export function deriveValidationStatus(protocolVersion?: string, hasFeedback?: boolean): ValidationStatus {
  if (!protocolVersion) return 'unreviewed';
  
  const version = parseFloat(protocolVersion);
  
  if (version >= 5.1) return 'verified';
  if (version >= 5.0) return 'in_review';
  
  return 'unreviewed';
}

/**
 * Manual overrides for specific domains if needed
 */
export const DOMAIN_VALIDATION_OVERRIDE: Record<string, ValidationStatus> = {
  // Key format: "grade-subject"
  '11-ingles': 'verified',
  '11-ciencias_naturales': 'verified',
  '11-matematicas': 'in_review',
  '11-lectura_critica': 'in_review',
  '11-sociales_y_ciudadanas': 'in_review',
  
  // Grade 3-9 are mostly legacy for now
  '9-ingles': 'verified', // 🆕 Protocol 4.1 for English Grade 9 is high quality
  '9-matematicas': 'unreviewed',
  '5-matematicas': 'unreviewed',
};

/**
 * Get the effective status for a given grade and subject
 */
export function getDomainStatus(grade: number, subject: string): ValidationStatus {
  // Robust normalization (strip accents and spaces)
  const normalized = String(subject || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s-]+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .replace(/^_+|_+$/g, '');

  const key = `${grade}-${normalized}`;
  return DOMAIN_VALIDATION_OVERRIDE[key] || 'unreviewed';
}
