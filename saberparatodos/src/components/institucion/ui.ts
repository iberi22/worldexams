/** Tailwind class sets shared by the institution panel (same look as /docentes). */
export const ui = {
  card: 'bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6',
  label: 'block text-[11px] font-bold uppercase tracking-widest text-white/60 mb-2',
  input:
    'w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40',
  primary:
    'inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300',
  secondary:
    'inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-amber-400/60 hover:text-amber-200 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300',
  danger:
    'inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300',
  link: 'text-amber-300 underline underline-offset-2 hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 rounded',
  h2: 'text-xl font-bold text-[#F5F5DC]',
  muted: 'text-sm text-white/60',
} as const;

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
  subjects: Array<{ id: string; name: string }>;
  grades: Array<{ id: number; name: string }>;
}

export const SOURCE_LABELS: Record<string, string> = {
  assignment: 'Tarea',
  practice: 'Práctica',
  neurogym: 'NeuroGym',
};

export function findCountry(countries: CountryOption[], code: string | null | undefined): CountryOption | undefined {
  const target = String(code ?? '').toLowerCase();
  return countries.find((c) => c.code.toLowerCase() === target);
}

export function subjectName(country: CountryOption | undefined, subject: string | null | undefined): string {
  if (!subject) return 'Todas las asignaturas';
  return country?.subjects.find((s) => s.id === subject)?.name ?? subject;
}
