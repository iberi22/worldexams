<script lang="ts">
  import {
    getActiveAgreementForInstitution,
    createAgreement,
    revokeAgreement,
    getStudentNodeHash,
    type InstitutionAgreement
  } from '../../lib/institution-handshake';

  let {
    isOpen = false,
    institutionId = 'COL-BOG-2026',
    institutionName = 'Colegio Mayor',
    onClose = () => {}
  } = $props<{
    isOpen?: boolean;
    institutionId?: string;
    institutionName?: string;
    onClose?: () => void;
  }>();

  let inputInstitutionId = $state(institutionId);
  let inputInstitutionName = $state(institutionName);
  let selectedScopes = $state<Array<'all' | 'mathematics' | 'reading' | 'sciences' | 'socials' | 'english'>>(['all']);
  let validityDays = $state(30);
  let activeAgreement = $state<InstitutionAgreement | null>(null);
  let feedbackMsg = $state<string | null>(null);

  const studentNodeHash = $derived(getStudentNodeHash());

  $effect(() => {
    if (isOpen) {
      if (!inputInstitutionId && institutionId) {
        inputInstitutionId = institutionId;
      }
      if (!inputInstitutionName && institutionName) {
        inputInstitutionName = institutionName;
      }
      refreshAgreement();
    }
  });

  function refreshAgreement() {
    if (inputInstitutionId.trim()) {
      activeAgreement = getActiveAgreementForInstitution(inputInstitutionId.trim());
    } else {
      activeAgreement = null;
    }
  }

  function toggleScope(scope: 'all' | 'mathematics' | 'reading' | 'sciences' | 'socials' | 'english') {
    if (scope === 'all') {
      selectedScopes = ['all'];
      return;
    }
    let updated = selectedScopes.filter(s => s !== 'all');
    if (updated.includes(scope)) {
      updated = updated.filter(s => s !== scope);
    } else {
      updated.push(scope);
    }
    if (updated.length === 0) {
      updated = ['all'];
    }
    selectedScopes = updated;
  }

  function handleCreate() {
    if (!inputInstitutionId.trim() || !inputInstitutionName.trim()) {
      feedbackMsg = 'Por favor ingrese el ID y nombre de la institución.';
      return;
    }
    const agr = createAgreement({
      institutionId: inputInstitutionId,
      institutionName: inputInstitutionName,
      scope: selectedScopes,
      validityDays
    });
    activeAgreement = agr;
    feedbackMsg = 'Acuerdo P2P autorizado y registrado localmente.';
  }

  function handleRevoke() {
    if (activeAgreement) {
      revokeAgreement(activeAgreement.agreementId);
      activeAgreement = null;
      feedbackMsg = 'Acceso institucional revocado de forma inmediata.';
    }
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 select-none">
    <div class="bg-[#121212] border border-white/20 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl overflow-y-auto max-h-[90vh]">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-white/10 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">🏛️</span>
          <div>
            <h3 class="text-base font-bold text-white">Acuerdo P2P Institucional</h3>
            <span class="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Handshake Soberano de Consentimiento
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
            0% PII | On-Device
          </span>
        </div>
        <p class="text-[11px] text-white/80 leading-relaxed">
          Solo se autoriza la exportación de <strong>índices cognitivos agregados</strong> (Proxy CI, Memoria de Trabajo WMI, Velocidad PSI). Los tiempos de reacción crudos y datos identificables jamás abandonan tu dispositivo.
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

      <!-- Agreement State Display -->
      {#if activeAgreement}
        <div class="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-2xl space-y-3">
          <div class="flex items-center justify-between">
            <span class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Acuerdo Activo Vigente
            </span>
            <span class="text-[10px] font-mono text-white/50">
              Checksum: {activeAgreement.checksum}
            </span>
          </div>

          <div class="space-y-1 text-xs">
            <p class="text-white font-bold">{activeAgreement.institutionName}</p>
            <p class="text-white/60 font-mono text-[11px]">ID Institución: {activeAgreement.institutionId}</p>
            <p class="text-white/60 text-[11px]">
              Alcance: <strong class="text-emerald-300">{activeAgreement.scope.join(', ')}</strong>
            </p>
            <p class="text-white/40 text-[10px]">
              Concedido: {new Date(activeAgreement.grantedAt).toLocaleDateString()} |
              Expira: {new Date(activeAgreement.expiresAt).toLocaleDateString()}
            </p>
          </div>

          <button
            type="button"
            onclick={handleRevoke}
            class="w-full py-2.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300 hover:text-rose-200 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🚫</span> Revocar Acceso Inmediatamente
          </button>
        </div>
      {:else}
        <!-- Create Agreement Form -->
        <div class="space-y-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
          <h4 class="text-xs font-bold text-white uppercase tracking-wider">Autorizar Nueva Institución</h4>

          <div class="space-y-2">
            <div>
              <label for="inst-id-input" class="block text-[10px] text-white/60 mb-1 font-semibold uppercase">
                ID de la Institución
              </label>
              <input
                id="inst-id-input"
                type="text"
                bind:value={inputInstitutionId}
                oninput={refreshAgreement}
                placeholder="Ej. COL-BOG-2026"
                class="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label for="inst-name-input" class="block text-[10px] text-white/60 mb-1 font-semibold uppercase">
                Nombre de la Institución
              </label>
              <input
                id="inst-name-input"
                type="text"
                bind:value={inputInstitutionName}
                placeholder="Ej. Colegio Mayor de Bogotá"
                class="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <span class="block text-[10px] text-white/60 mb-1 font-semibold uppercase">
                Alcance del Consentimiento
              </span>
              <div class="flex flex-wrap gap-1.5">
                {#each [
                  { id: 'all', label: 'Todo' },
                  { id: 'mathematics', label: 'Matemáticas' },
                  { id: 'reading', label: 'Lectura' },
                  { id: 'sciences', label: 'Ciencias' },
                  { id: 'socials', label: 'Sociales' },
                  { id: 'english', label: 'Inglés' }
                ] as scopeItem}
                  <button
                    type="button"
                    onclick={() => toggleScope(scopeItem.id as any)}
                    class="px-2.5 py-1 text-[11px] rounded-lg border font-semibold transition-all cursor-pointer {selectedScopes.includes(scopeItem.id as any) ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-black/40 border-white/10 text-white/50 hover:text-white'}"
                  >
                    {scopeItem.label}
                  </button>
                {/* Each item rendered */}
                {/each}
              </div>
            </div>

            <div>
              <label for="validity-input" class="block text-[10px] text-white/60 mb-1 font-semibold uppercase">
                Vigencia (Días)
              </label>
              <select
                id="validity-input"
                bind:value={validityDays}
                class="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value={15}>15 días</option>
                <option value={30}>30 días</option>
                <option value={90}>90 días</option>
                <option value={365}>365 días (1 año)</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onclick={handleCreate}
            class="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-2"
          >
            <span>🔐</span> Autorizar y Firmar Acuerdo P2P
          </button>
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
