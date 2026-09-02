<script lang="ts">
  import { buildStudentView, summarizeOwnResult } from '$lib/mesh/salon-student-view';
  import type { SalonResult } from '$lib/mesh/salon-shared';
  import type { PrivacyMode } from '$lib/mesh/salon-privacy';
  import { t, type SalonLocale } from '$lib/i18n';

  interface Props {
    results: SalonResult[];
    viewerPeerId: string;
    role?: 'host' | 'student';
    mode?: PrivacyMode;
    locale?: SalonLocale;
  }

  let {
    results,
    viewerPeerId,
    role = 'student',
    mode = 'private',
    locale = 'es-CO',
  }: Props = $props();

  const view = $derived(
    buildStudentView(results, { peerId: viewerPeerId, role }, mode),
  );
  const own = $derived(results.find((r) => r.peerId === viewerPeerId) ?? null);
</script>

<section class="rounded-lg border border-neutral-800 bg-[#101010] p-4 text-[#F5F5DC]">
  <h3 class="mb-3 font-semibold">{t('salon.student.title', locale)}</h3>

  {#if own}
    {@const s = summarizeOwnResult(own)}
    <p class="mb-3 text-sm">
      {s.score} / 100 · {s.answered} {locale === 'es-MX' ? 'reacciones' : 'respuestas'} · {s.gradeLabel}
    </p>
    {#if view.ownRank !== null}
      <p class="mb-3 text-xs text-neutral-400">
        {t('salon.student.rank', locale, { rank: view.ownRank, total: view.rows.length })}
      </p>
    {/if}
  {/if}

  <table class="w-full text-sm">
    <tbody>
      {#each view.rows as row (row.alias + String(row.isSelf))}
        <tr class="border-t border-neutral-800">
          <td class="py-1">{row.alias}{#if row.isSelf} (tú){/if}</td>
          <td class="py-1 text-right">
            {row.score === null ? t('salon.student.hidden', locale) : row.score}
          </td>
        </tr>
      {:else}
        <tr><td class="py-2 text-neutral-500">—</td></tr>
      {/each}
    </tbody>
  </table>
</section>
