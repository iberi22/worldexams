export type PreuResearchStatus = 'verified' | 'in_research' | 'queued';
export type PreuEntryType = 'core' | 'overlay';
export type PreuCycleStatus = 'verified' | 'pending' | 'stale';

export interface PreuSourceRef {
  title: string;
  url: string;
  kind: 'ranking' | 'admissions' | 'calendar' | 'guide' | 'documentation';
  lastVerifiedAt?: string;
}

export interface PreuExamCycle {
  label: string;
  costCop?: number;
  registrationWindow?: string;
  examWindow?: string;
  status: PreuCycleStatus;
  lastVerifiedAt?: string;
}

export interface PreuCatalogEntry {
  id: string;
  slug: string;
  institutionName: string;
  city: string;
  displayName: string;
  entryType: PreuEntryType;
  researchStatus: PreuResearchStatus;
  summary: string;
  components: string[];
  targetPrograms: string[];
  requiredDocs: string[];
  rankingBasis: string;
  officialAdmissionsUrl?: string;
  documentationUrl?: string;
  cycle?: PreuExamCycle;
  sourceRefs: PreuSourceRef[];
  researchNotes: string;
}
