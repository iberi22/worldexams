export interface IcfesBenchmarkConfig {
  key: string;
  label: string;
  year: number;
  benchmarkScore: number;
  goalScore: number;
  sourceNote: string;
}

export const CO_ICFES_2026_BENCHMARK: IcfesBenchmarkConfig = {
  key: 'co-icfes-2026',
  label: 'ICFES 2026',
  year: 2026,
  benchmarkScore: 250,
  goalScore: 300,
  sourceNote: 'Referencia local temporal mientras producto define el benchmark oficial.'
};

export function getBenchmarkConfig(countryCode: string, examName: string): IcfesBenchmarkConfig {
  if (String(countryCode || '').toUpperCase() === 'CO') {
    return CO_ICFES_2026_BENCHMARK;
  }

  return {
    key: `${String(countryCode || 'global').toLowerCase()}-practice-2026`,
    label: `${examName} 2026`,
    year: 2026,
    benchmarkScore: 250,
    goalScore: 300,
    sourceNote: `Referencia local temporal para ${examName} mientras producto define el benchmark oficial.`
  };
}
