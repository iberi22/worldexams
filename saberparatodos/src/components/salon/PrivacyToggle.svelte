<script lang="ts">
  import { PRIVACY_MODES, type PrivacyMode } from '$lib/mesh/salon-privacy';
  import { t, type SalonLocale } from '$lib/i18n';

  interface Props {
    value?: PrivacyMode;
    locale?: SalonLocale;
    onChange: (mode: PrivacyMode) => void;
  }

  let { value = 'public', locale = 'es-CO', onChange }: Props = $props();

  const modeKey: Record<PrivacyMode, string> = {
    public: 'salon.privacy.public',
    anon: 'salon.privacy.anon',
    private: 'salon.privacy.private',
  };
</script>

<div class="flex items-center gap-2" role="radiogroup" aria-label={t('salon.privacy.label', locale)}>
  <span class="text-sm text-neutral-400">{t('salon.privacy.label', locale)}</span>
  {#each PRIVACY_MODES as mode (mode)}
    <button
      type="button"
      role="radio"
      aria-checked={mode === value}
      class="rounded-full px-3 py-1 text-xs {mode === value
        ? 'bg-emerald-600 text-white font-semibold'
        : 'bg-neutral-800 text-neutral-300'}"
      onclick={() => onChange(mode)}
    >
      {t(modeKey[mode], locale)}
    </button>
  {/each}
</div>
