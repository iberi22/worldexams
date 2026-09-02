<script lang="ts">
  import { t, type SalonLocale } from '$lib/i18n';

  interface Props {
    peerId: string;
    hostId: string;
    callerId?: string;
    locale?: SalonLocale;
    onKick: (peerId: string) => void;
  }

  let { peerId, hostId, callerId = hostId, locale = 'es-CO', onKick }: Props = $props();

  const isHost = $derived(callerId === hostId);
</script>

{#if isHost && peerId !== hostId}
  <button
    class="rounded bg-red-700 px-2 py-1 text-xs font-semibold text-white hover:bg-red-600"
    title={t('salon.kick.confirm', locale)}
    onclick={() => onKick(peerId)}
  >
    {t('salon.kick.button', locale)}
  </button>
{/if}
