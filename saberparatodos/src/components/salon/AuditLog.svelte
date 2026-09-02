<script lang="ts">
  import type { AuditEntry, TrafficLight } from '$lib/mesh/salon-anti-cheat';
  import { t, type SalonLocale } from '$lib/i18n';

  interface Props {
    entries: AuditEntry[];
    lights: Record<string, TrafficLight>;
    locale?: SalonLocale;
  }

  let { entries, lights, locale = 'es-CO' }: Props = $props();

  const lightClass: Record<TrafficLight, string> = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  const sorted = $derived([...entries].sort((a, b) => b.at - a.at));
</script>

<section class="rounded-lg border border-neutral-800 bg-[#101010] p-4 text-[#F5F5DC]">
  <h3 class="mb-3 font-semibold">{t('salon.audit.title', locale)}</h3>

  <div class="mb-3 flex flex-wrap gap-2">
    {#each Object.entries(lights) as [peer, light] (peer)}
      <span class="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-2 py-0.5 text-xs">
        <span class="h-2 w-2 rounded-full {lightClass[light]}" aria-hidden="true"></span>
        {peer} · {t(`salon.audit.light.${light}`, locale)}
      </span>
    {/each}
  </div>

  <ul class="max-h-48 space-y-1 overflow-y-auto text-xs">
    {#each sorted as e (e.id)}
      <li class="flex justify-between border-b border-neutral-900 pb-1">
        <span>{e.peerId}: {e.signal} (sev {e.severity})</span>
        <span class="text-neutral-500">{new Date(e.at).toLocaleTimeString(locale)}</span>
      </li>
    {:else}
      <li class="text-neutral-500">—</li>
    {/each}
  </ul>
</section>
