<script lang="ts">
  import { t, normalizeLang, type I18nLang } from '../../lib/i18n';

  interface FacetCountry {
    slug: string;
    name: string;
    flag: string;
  }

  interface Props {
    lang?: string;
    countries: FacetCountry[];
    gradesByCountry: Record<string, string[]>;
    subjectsByKey: Record<string, string[]>;
    initialCountry?: string;
    initialGrade?: string;
    initialSubject?: string;
    initialQuery?: string;
  }

  let {
    lang = 'es',
    countries = [],
    gradesByCountry = {},
    subjectsByKey = {},
    initialCountry = '',
    initialGrade = '',
    initialSubject = '',
    initialQuery = '',
  }: Props = $props();

  const L: I18nLang = $derived(normalizeLang(lang));

  let country = $state(initialCountry);
  let grade = $state(initialGrade);
  let subject = $state(initialSubject);
  let query = $state(initialQuery);

  const grades = $derived(country ? gradesByCountry[country] ?? [] : []);
  const subjects = $derived(country && grade ? subjectsByKey[`${country}/${grade}`] ?? [] : []);

  $effect(() => {
    if (country && grade && !(gradesByCountry[country] ?? []).includes(grade)) grade = '';
    if (country && grade && subject && !(subjectsByKey[`${country}/${grade}`] ?? []).includes(subject)) subject = '';
  });

  function submit() {
    if (subject && country && grade) {
      window.location.href = `/preguntas/${country}/${grade}/${subject}/`;
      return;
    }
    if (grade && country) {
      window.location.href = `/preguntas/${country}/${grade}/`;
      return;
    }
    if (country) {
      window.location.href = `/preguntas/${country}/`;
      return;
    }
    const q = query.trim();
    window.location.href = q ? `/preguntas/?q=${encodeURIComponent(q)}` : '/preguntas/';
  }
</script>

<form
  class="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 md:p-5 shadow-xl"
  aria-label={t('preguntas.search.placeholder', L)}
  onsubmit={(e) => {
    e.preventDefault();
    submit();
  }}
>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
    <label class="flex flex-col gap-1 text-xs font-semibold text-slate-300">
      {t('preguntas.search.country', L)}
      <select
        class="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
        bind:value={country}
        name="country"
      >
        <option value="">{t('preguntas.search.all', L)}</option>
        {#each countries as c}
          <option value={c.slug}>{c.flag} {c.name}</option>
        {/each}
      </select>
    </label>

    <label class="flex flex-col gap-1 text-xs font-semibold text-slate-300">
      {t('preguntas.search.grade', L)}
      <select
        class="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none disabled:opacity-40"
        bind:value={grade}
        name="grade"
        disabled={!country}
      >
        <option value="">{t('preguntas.search.all', L)}</option>
        {#each grades as g}
          <option value={g}>{g}</option>
        {/each}
      </select>
    </label>

    <label class="flex flex-col gap-1 text-xs font-semibold text-slate-300">
      {t('preguntas.search.subject', L)}
      <select
        class="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none disabled:opacity-40"
        bind:value={subject}
        name="subject"
        disabled={!grade}
      >
        <option value="">{t('preguntas.search.all', L)}</option>
        {#each subjects as s}
          <option value={s}>{s}</option>
        {/each}
      </select>
    </label>

    <label class="flex flex-col gap-1 text-xs font-semibold text-slate-300">
      {t('preguntas.search.topic', L)}
      <input
        type="search"
        name="q"
        bind:value={query}
        placeholder={t('preguntas.search.placeholder', L)}
        class="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
      />
    </label>
  </div>

  <div class="mt-4 flex justify-end">
    <button
      type="submit"
      class="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold rounded-lg transition shadow"
    >
      {t('preguntas.search.submit', L)} →
    </button>
  </div>
</form>
