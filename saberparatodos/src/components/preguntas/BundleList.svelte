<script lang="ts">
  import { t, normalizeLang, type I18nLang } from '../../lib/i18n';

  interface ListBundle {
    id: string;
    country: string;
    countryName?: string;
    flag?: string;
    subject: string;
    gradeSlug: string;
    grade: number | null;
    week: string;
    tema: string;
    total: number;
    url: string;
  }

  interface Props {
    lang?: string;
    bundles: ListBundle[];
    showCountry?: boolean;
    pageSize?: number;
    label?: string;
  }

  let {
    lang = 'es',
    bundles = [],
    showCountry = false,
    pageSize = 12,
    label = 'bundles',
  }: Props = $props();

  const L: I18nLang = $derived(normalizeLang(lang));

  let search = $state('');
  let page = $state(1);

  const filtered = $derived.by(() => {
    const q = search.trim().toLowerCase();
    if (!q) return bundles;
    return bundles.filter(
      (b) =>
        b.tema.toLowerCase().includes(q) ||
        b.subject.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.week.toLowerCase().includes(q)
    );
  });

  const totalPages = $derived(Math.max(1, Math.ceil(filtered.length / pageSize)));
  const pageItems = $derived(filtered.slice((page - 1) * pageSize, page * pageSize));

  function fmtWeek(week: string): string {
    const n = Number(week.replace(/^W/i, ''));
    return Number.isFinite(n) && n > 0 ? `${t('preguntas.week', L)} ${n}` : week;
  }
</script>

<section aria-label={label}>
  <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
    <p class="text-sm text-slate-400">
      {filtered.length} {t('preguntas.results', L)}
      {#if search}· “{search}”{/if}
    </p>
    <input
      type="search"
      bind:value={search}
      oninput={() => (page = 1)}
      placeholder={t('preguntas.search.placeholder', L)}
      aria-label={t('preguntas.search.placeholder', L)}
      class="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none w-full sm:w-72"
    />
  </div>

  {#if pageItems.length === 0}
    <p class="text-sm text-slate-400 bg-slate-800/50 border border-slate-700/60 rounded-xl p-6 text-center">
      {filtered.length === 0 ? t('preguntas.noResults', L) : t('preguntas.empty', L)}
    </p>
  {:else}
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
      {#each pageItems as b (b.id)}
        <li>
          <a
            href={b.url}
            class="group block bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 p-5 rounded-2xl transition shadow-md"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                {fmtWeek(b.week)}
              </span>
              <span class="text-xs text-slate-400">{b.total} {t('preguntas.questions', L)}</span>
            </div>
            <h3 class="text-sm font-bold text-white group-hover:text-emerald-300 transition break-words">
              {b.tema || b.subject}
            </h3>
            <p class="text-xs text-slate-400 mt-1.5">
              {#if showCountry && b.countryName}{b.flag ?? ''} {b.countryName} · {/if}{b.subject} · {b.gradeSlug}
            </p>
            <span class="mt-3 inline-block text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition">
              {t('preguntas.viewBundle', L)} →
            </span>
          </a>
        </li>
      {/each}
    </ul>
  {/if}

  {#if totalPages > 1}
    <nav class="mt-6 flex items-center justify-center gap-3 text-sm" aria-label="pagination">
      <button
        type="button"
        class="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:border-emerald-500/60 hover:text-white transition disabled:opacity-40"
        disabled={page <= 1}
        onclick={() => (page -= 1)}
      >
        ← {t('preguntas.prev', L)}
      </button>
      <span class="text-slate-400">
        {t('preguntas.page', L)} {page} {t('preguntas.of', L)} {totalPages}
      </span>
      <button
        type="button"
        class="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:border-emerald-500/60 hover:text-white transition disabled:opacity-40"
        disabled={page >= totalPages}
        onclick={() => (page += 1)}
      >
        {t('preguntas.next', L)} →
      </button>
    </nav>
  {/if}
</section>
