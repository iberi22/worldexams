// Helper for hierarchical /preguntas routes — unified data-driven manifest loader
import {
  getCountryManifest,
  getAllCountryManifests,
  getCountriesWithContent,
  type CountryManifest,
} from '../../lib/country-manifest-loader';

export interface BundleInfo {
  country: string; // slug lower, normalized hyphen
  countryRaw: string;
  subject: string; // slug lower
  subjectRaw: string;
  grade: number;
  week: string; // W01
  tema: string;
  id: string;
  filePath: string;
  total_questions: number;
  difficulty_band?: string;
  alignment?: string;
  title?: string;
}

export function toTitleCase(str: string): string {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function canonicalFor(path: string, siteUrl: string): string {
  const base = siteUrl.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function getDisplayForCountry(countrySlug: string): { name: string; flag: string; lang: string } {
  const manifest = getCountryManifest(countrySlug);
  if (manifest) {
    return {
      name: manifest.name,
      flag: manifest.flag,
      lang: manifest.language,
    };
  }
  return {
    name: toTitleCase(countrySlug),
    flag: '🌎',
    lang: 'es',
  };
}

export function getLangForCountry(countrySlug: string): string {
  return getDisplayForCountry(countrySlug).lang;
}

export function getCountries(): { slug: string; display: { name: string; flag: string; lang: string }; count: number }[] {
  const manifests = getCountriesWithContent();
  return manifests.map((m) => ({
    slug: m.slug,
    display: {
      name: m.name,
      flag: m.flag,
      lang: m.language,
    },
    count: m.bundleCount,
  }));
}

export function getSubjectsForCountry(countrySlug: string): { slug: string; count: number; bundles: BundleInfo[] }[] {
  const manifest = getCountryManifest(countrySlug);
  if (!manifest) return [];

  return manifest.subjects.map((sub) => {
    // Generate standard weekly sequences for the subject (up to W10 or subject bundle count)
    const weeksCount = Math.min(10, Math.max(4, Math.floor(manifest.bundleCount / Math.max(1, manifest.subjects.length))));
    const bundles: BundleInfo[] = Array.from({ length: weeksCount }, (_, i) => {
      const weekNum = String(i + 1).padStart(2, '0');
      const week = `W${weekNum}`;
      const tema = `${sub.slug}-semana-${i + 1}`;
      const id = `${manifest.code}-${sub.slug.toUpperCase().slice(0, 3)}-11-2026-${week}-${tema}-001-MASTERY-bundle`;
      return {
        country: manifest.slug,
        countryRaw: manifest.name.toLowerCase(),
        subject: sub.slug,
        subjectRaw: sub.name,
        grade: 11,
        week,
        tema,
        id,
        filePath: `questions_data/${manifest.slug}/${sub.slug}/grado-11/2026/weekly/${id}.md`,
        total_questions: 10,
        difficulty_band: 'D3-D4',
        title: `${sub.name} Semana ${i + 1}`,
      };
    });

    return {
      slug: sub.slug,
      count: bundles.length,
      bundles,
    };
  });
}

export function getBundlesForCountrySubject(countrySlug: string, subjectSlug: string): BundleInfo[] {
  const subjects = getSubjectsForCountry(countrySlug);
  const matched = subjects.find((s) => s.slug === subjectSlug.toLowerCase());
  return matched ? matched.bundles : [];
}

export function getBundleByWeek(countrySlug: string, subjectSlug: string, weekSlug: string): BundleInfo | undefined {
  const bundles = getBundlesForCountrySubject(countrySlug, subjectSlug);
  const normWeek = weekSlug.toUpperCase();
  return bundles.find((b) => b.week === normWeek || b.week === `W${normWeek.replace(/^W/, '')}`);
}

export function getAllBundles(): BundleInfo[] {
  const manifests = getCountriesWithContent();
  return manifests.flatMap((m) => {
    const subjects = getSubjectsForCountry(m.slug);
    return subjects.flatMap((s) => s.bundles);
  });
}
