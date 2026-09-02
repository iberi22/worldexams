<script lang="ts">
  import { normalizeRoomPin, PIN_LENGTH } from '$lib/mesh/salon-pin';
  import { t, type SalonLocale } from '$lib/i18n';

  interface Props {
    open: boolean;
    hasPin: boolean;
    locale?: SalonLocale;
    onJoin: (pin: string) => void;
    onClose: () => void;
  }

  let { open, hasPin, locale = 'es-CO', onJoin, onClose }: Props = $props();

  let pin = $state('');
  let error = $state('');

  function submit() {
    if (hasPin && normalizeRoomPin(pin).length !== PIN_LENGTH) {
      error = t('salon.pin.invalid', locale, { n: 0 });
      return;
    }
    error = '';
    onJoin(normalizeRoomPin(pin));
  }
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" role="dialog" aria-modal="true">
    <div class="w-80 rounded-xl bg-[#111] p-6 text-[#F5F5DC] shadow-xl">
      <h2 class="mb-4 text-lg font-semibold">{t('salon.pin.title', locale)}</h2>
      {#if hasPin}
        <input
          class="mb-2 w-full rounded border border-neutral-600 bg-neutral-900 px-3 py-2 tracking-widest"
          type="password"
          inputmode="numeric"
          maxlength={PIN_LENGTH}
          placeholder={t('salon.pin.placeholder', locale)}
          bind:value={pin}
        />
        <p class="text-xs text-red-400">{error}</p>
      {/if}
      <div class="mt-4 flex justify-end gap-2">
        <button class="rounded px-3 py-1.5 text-sm bg-neutral-700" onclick={onClose}>
          {t('salon.pin.cancel', locale)}
        </button>
        <button class="rounded px-3 py-1.5 text-sm bg-emerald-600 font-semibold" onclick={submit}>
          {t('salon.pin.join', locale)}
        </button>
      </div>
    </div>
  </div>
{/if}
