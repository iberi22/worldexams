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

