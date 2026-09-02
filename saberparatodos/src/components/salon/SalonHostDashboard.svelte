<script lang="ts">
  import RoomPinModal from './RoomPinModal.svelte';
  import KickPeerButton from './KickPeerButton.svelte';
  import PrivacyToggle from './PrivacyToggle.svelte';
  import StudentResultsView from './StudentResultsView.svelte';
  import AuditLog from './AuditLog.svelte';
  import ExportGradesButton from './ExportGradesButton.svelte';
  import GenerateReportButton from './GenerateReportButton.svelte';

  import { createSalonEventBus, type SalonPeer, type SalonResult, type SalonTenant } from '$lib/mesh/salon-shared';
  import { createRoomPinGate, generateRoomPin } from '$lib/mesh/salon-pin';
  import { createSalonKickRegistry } from '$lib/mesh/salon-kick';
  import { createSalonTimeoutManager } from '$lib/mesh/salon-timeout';
  import { createHostResilience } from '$lib/mesh/salon-resilience';
  import type { PrivacyMode } from '$lib/mesh/salon-privacy';
  import { computeRoomMetrics, type OptionLetter } from '$lib/mesh/salon-metrics';
  import { createAntiCheatMonitor } from '$lib/mesh/salon-anti-cheat';
  import type { SalonLocale } from '$lib/i18n';

  interface Props {
    hostId: string;
    tenant: SalonTenant;
    answerKey?: Record<string, OptionLetter>;
    usePin?: boolean;
    locale?: SalonLocale;
  }

  let {
    hostId,
    tenant,
    answerKey = {},
    usePin = true,
    locale = 'es-CO',
  }: Props = $props();

  const bus = createSalonEventBus();
  const pinGate = createRoomPinGate(tenant, usePin ? generateRoomPin() : null, bus);
  const kicks = createSalonKickRegistry(tenant, hostId, bus);
  const timeouts = createSalonTimeoutManager(tenant, hostId, bus);
  const resilience = createHostResilience(tenant, bus);
  const antiCheat = createAntiCheatMonitor(tenant, bus);

  let privacy = $state<PrivacyMode>('public');
  let peers = $state<SalonPeer[]>([{ peerId: hostId, role: 'host', joinedAt: new Date().toISOString() }]);
  let results = $state<SalonResult[]>([]);
  let pinModalOpen = $state(true);
  let lastReport = $state('');

  const metrics = $derived(computeRoomMetrics(results, answerKey));
  const lights = $derived(antiCheat.lights());
  const auditEntries = $derived(antiCheat.entries());

  function handleJoin(pin: string) {
    const res = pinGate.tryJoin(pin, Date.now());
    if (res.allowed) {
      pinModalOpen = false;
    }
  }

  function handleKick(peerId: string) {
    if (kicks.hostKick(hostId, peerId, 'expulsado por el host')) {
      timeouts.apply(peerId, 'expulsion');
      peers = kicks.peers();
    }
  }

  function handlePrivacyChange(mode: PrivacyMode) {
    privacy = mode;
    bus.emit('salon:privacy:change', tenant, { mode, by: hostId });
  }

  function hostSnapshot() {
    resilience.snapshot(
      { peers, results, currentQuestionId: Object.keys(answerKey)[0] ?? null },
      Date.now(),
    );
  }

</script>

<section class="space-y-4 rounded-xl border border-neutral-800 bg-[#0d0d0d] p-5 text-[#F5F5DC]">
  <header class="flex items-center justify-between">
    <h2 class="text-lg font-bold">Salon {tenant.subject} · grado {tenant.grade} ({tenant.country})</h2>
    <PrivacyToggle value={privacy} {locale} onChange={handlePrivacyChange} />
  </header>

  <div class="grid gap-4 md:grid-cols-2">
    <div>
      <h3 class="mb-2 text-sm font-semibold text-neutral-400">Participantes ({peers.length})</h3>
      <ul class="space-y-1 text-sm">
        {#each peers as p (p.peerId)}
          <li class="flex items-center justify-between rounded bg-neutral-900 px-2 py-1">
            <span>{p.peerId}{#if p.role === 'host'} ★{/if}</span>
            <KickPeerButton peerId={p.peerId} {hostId} callerId={hostId} {locale} onKick={handleKick} />
          </li>
        {/each}
      </ul>
      <div class="mt-3 flex gap-2">
        <button class="rounded bg-neutral-800 px-2 py-1 text-xs" onclick={hostSnapshot}>
          Guardar estado del host
        </button>
      </div>
    </div>

    <StudentResultsView {results} viewerPeerId={hostId} role="host" mode={privacy} {locale} />
  </div>

  <AuditLog entries={auditEntries} {lights} {locale} />

  <footer class="flex items-center justify-between gap-3 border-t border-neutral-800 pt-3">
    <p class="text-xs text-neutral-500">
      Metricas: media {metrics.mean} · mediana {metrics.median} · sd {metrics.stdev}
    </p>
    <div class="flex gap-2">
      <ExportGradesButton {tenant} {results} {locale} />
      <GenerateReportButton
        input={{ tenant, results, answerKey, audit: antiCheat, locale }}
        onReport={(md) => (lastReport = md)}
      />
    </div>
  </footer>

  {#if lastReport}
    <pre class="max-h-64 overflow-auto rounded bg-black/50 p-3 text-[11px]">{lastReport}</pre>
  {/if}

  <RoomPinModal open={pinModalOpen} hasPin={usePin} {locale} onJoin={handleJoin} onClose={() => (pinModalOpen = false)} />
</section>
