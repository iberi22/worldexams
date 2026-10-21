<script lang="ts">
  import {
    getActiveLegacyAgreements,
    revokeAgreement,
    getStudentNodeHash,
    type InstitutionAgreement
  } from '../../lib/institution-handshake';
  import StudentInstitutionPanel from '../institucion-estudiante/StudentInstitutionPanel.svelte';

  let {
    isOpen = false,
    onClose = () => {}
  } = $props<{
    isOpen?: boolean;
    /** @deprecated Ignored: the institution comes from the group the student joined. */
    institutionId?: string;
    /** @deprecated Ignored: the institution comes from the group the student joined. */
    institutionName?: string;
    onClose?: () => void;
  }>();

  let legacyAgreements = $state<InstitutionAgreement[]>([]);
  let feedbackMsg = $state<string | null>(null);

  const studentNodeHash = $derived(getStudentNodeHash());

  $effect(() => {
    if (isOpen) {
      legacyAgreements = getActiveLegacyAgreements();
    }
  });

  function handleRevokeLegacy(agreementId: string) {
    revokeAgreement(agreementId);
    legacyAgreements = getActiveLegacyAgreements();
    feedbackMsg = 'Acuerdo local anterior revocado.';
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div class="bg-[#121212] border border-white/20 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl overflow-y-auto max-h-[90vh]">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-white/10 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">🏛️</span>
          <div>
            <h3 class="text-base font-bold text-white">Compartir con mi colegio</h3>
            <span class="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Consentimiento revocable
            </span>
          </div>
        </div>
        <button
          type="button"
          onclick={onClose}
          class="text-white/50 hover:text-white text-lg font-bold p-1 transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          ✕
        </button>
      </div>

      <!-- Zero-PII Sovereign Privacy Banner -->
      <div class="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-1">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-emerald-400">Garantía Soberana (FERPA / GDPR)</span>
          <span class="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
            0% PII | Opt-in
          </span>
        </div>
        <p class="text-[11px] text-white/80 leading-relaxed">
          Al final de cada sesión solo se envía un <strong>resumen agregado</strong> (aciertos, total y duración), y solo si te uniste a tu colegio y tienes activado compartir. Los tiempos de reacción crudos y datos identificables jamás abandonan tu dispositivo.
        </p>
      </div>

      <!-- Node Hash Identifier -->
      <div class="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-2xl">
        <span class="text-xs text-white/60">Identificador Soberano de Nodo:</span>
        <span class="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
          {studentNodeHash}
        </span>
      </div>

      <!-- Feedback Message Toast -->
      {#if feedbackMsg}
        <div class="p-2.5 text-xs text-center font-semibold rounded-xl border bg-emerald-950/80 border-emerald-500/50 text-emerald-300">
          {feedbackMsg}
        </div>
      {/if}

      <!-- Joined institution (API) or join flow -->
      <StudentInstitutionPanel showAssignments={false} />

      <!-- Legacy on-device agreements (pre-API handshake), still revocable -->
      {#if legacyAgreements.length > 0}
        <div class="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
          <h4 class="text-xs font-bold text-white uppercase tracking-wider">Acuerdos locales anteriores</h4>
          <p class="text-[11px] text-white/50">
            Se crearon solo en este dispositivo y nunca enviaron datos. Ya no son necesarios: usa el código de tu colegio.
          </p>
          {#each legacyAgreements as agreement (agreement.agreementId)}
            <div class="flex items-center justify-between gap-2 text-xs">
              <span class="text-white/80 truncate">
                {agreement.institutionName || agreement.institutionId}
                <span class="font-mono text-white/40">({agreement.institutionId})</span>
              </span>
              <button
                type="button"
                onclick={() => handleRevokeLegacy(agreement.agreementId)}
                class="shrink-0 px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300 text-[11px] font-bold rounded-lg cursor-pointer"
              >
                Revocar
              </button>
            </div>
          {/each}
        </div>
      {/if}

      <!-- Action Footer -->
      <div class="flex justify-end pt-1">
        <button
          type="button"
          onclick={onClose}
          class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
{/if}
