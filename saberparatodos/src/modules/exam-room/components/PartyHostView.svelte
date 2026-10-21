<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import FlashlightCard from '../../../components/FlashlightCard.svelte';
  import { supportedCountries } from '../../../config';
  import { generateQRCodeSVG } from '../../../lib/qr-generator';
  import PartyScoreboard from './PartyScoreboard.svelte';
  import PartyPodium from './PartyPodium.svelte';
  import { PartyHostSession, type HostState, type SavedHostSession } from '../party/hostSession';
  import { createDefaultPartyTransport, supportsOtherDevices } from '../party/transport';
  import { loadPartyQuestions } from '../party/questionLoader';
  import { PARTY_ERROR_MESSAGES, buildJoinUrl } from '../party/protocol';

  interface Props {
    resume?: SavedHostSession | null;
    onExit: () => void;
  }

  let { resume = null, onExit }: Props = $props();

  const QUESTION_COUNTS = [5, 10, 15, 20];
  const SECONDS_OPTIONS = [10, 15, 20, 30, 45, 60];

  function runtimeCountry(): string {
    try {
      const raw = document.getElementById('api-config')?.textContent;
      const code = raw ? String(JSON.parse(raw).countryCode || '') : '';
      return code.toUpperCase() || 'CO';
    } catch {
      return 'CO';
    }
  }

  let hostName = $state('');
  let countryCode = $state('CO');
  let grado = $state(0);
  let asignatura = $state('');
  let totalQuestions = $state(10);
  let secondsPerQuestion = $state(20);

  let creating = $state(false);
  let setupError = $state('');
  let session: PartyHostSession | null = null;
  let host = $state<HostState | null>(null);
  let now = $state(Date.now());
  let copied = $state(false);
  let ticker: ReturnType<typeof setInterval> | null = null;

  let country = $derived(supportedCountries.find((c) => c.code === countryCode) ?? supportedCountries[0]);
  let grades = $derived(country?.grades ?? []);
  let subjects = $derived(country?.subjects ?? []);

  // Mantener grado/asignatura válidos al cambiar de país.
  $effect(() => {
    if (grades.length && !grades.some((g) => g.id === grado)) grado = grades[grades.length - 1].id;
    if (subjects.length && !subjects.some((s) => s.id === asignatura)) asignatura = subjects[0].id;
  });

  let joinUrl = $derived(
    host?.config && typeof window !== 'undefined' ? buildJoinUrl(window.location.origin, host.config.code) : '',
  );
  let qrSvg = $derived(
    joinUrl ? generateQRCodeSVG(joinUrl, { darkColor: '#0f172a', lightColor: '#ffffff', quietZone: true }) : '',
  );
  let secondsLeft = $derived(host?.deadline ? Math.max(0, Math.ceil((host.deadline - now) / 1000)) : 0);
  let onlinePlayers = $derived(host?.players.filter((p) => p.online) ?? []);
  // Alcance real de la sala: otros dispositivos (PeerJS) o solo este navegador.
  let reach = $derived<'devices' | 'pending' | 'local'>(
    !host || supportsOtherDevices(host.transport)
      ? 'devices'
      : host.transport.pending.includes('peerjs')
        ? 'pending'
        : 'local',
  );

  function attach(s: PartyHostSession) {
    session = s;
    s.subscribe((state) => (host = state));
  }

  onMount(() => {
    countryCode = runtimeCountry();
    ticker = setInterval(() => (now = Date.now()), 250);
    if (resume) {
      const s = new PartyHostSession({ transport: createDefaultPartyTransport('host'), storage: sessionStorage });
      attach(s);
      s.resume(resume).catch(() => {
        setupError = PARTY_ERROR_MESSAGES.transport_unavailable;
      });
    }
  });

  onDestroy(() => {
    if (ticker) clearInterval(ticker);
    // Recargar o navegar no cierra la sala: el estado queda guardado para reanudar.
    session?.dispose();
  });

  async function createRoom() {
    setupError = '';
    creating = true;
    try {
      const subject = subjects.find((s) => s.id === asignatura);
      const questions = await loadPartyQuestions({
        countryCode,
        grado,
        asignatura,
        count: totalQuestions,
      });
      if (questions.length === 0) {
        setupError = PARTY_ERROR_MESSAGES.no_questions;
        return;
      }
      const s = new PartyHostSession({ transport: createDefaultPartyTransport('host'), storage: sessionStorage });
      attach(s);
      try {
        await s.open(
          {
            hostName: hostName || 'Docente',
            countryCode,
            grado,
            asignatura,
            asignaturaLabel: subject?.name ?? asignatura,
            totalQuestions,
            secondsPerQuestion,
            maxPlayers: 60,
          },
          questions,
        );
      } catch {
        s.dispose();
        session = null;
        host = null;
        setupError = PARTY_ERROR_MESSAGES.transport_unavailable;
      }
    } catch (err) {
      console.error('[Party] Error cargando preguntas:', err);
      setupError = PARTY_ERROR_MESSAGES.no_questions;
    } finally {
      creating = false;
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(joinUrl);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {
      copied = false;
    }
  }

  function closeRoom() {
    session?.close();
    session = null;
    host = null;
    onExit();
  }

  function newRoom() {
    session?.close();
    session = null;
    host = null;
  }
</script>

<div class="w-full max-w-5xl mx-auto" data-testid="party-host">
  {#if !host?.config}
    <!-- Configuración de la sala -->
    <div class="w-full max-w-lg mx-auto animate-fade-in-up">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-2">
          Crear sala Party
        </h1>
        <p class="text-sm uppercase tracking-widest opacity-60">Preguntas reales del banco de Práctica</p>
      </div>

      <FlashlightCard className="p-6 text-left">
        <div class="space-y-4">
          <label class="block">
            <span class="block text-xs uppercase tracking-widest opacity-60 mb-2">Tu nombre (docente)</span>
            <input
              type="text"
              bind:value={hostName}
              maxlength="20"
              placeholder="Ej: Profe Ana"
              class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-500"
              data-testid="host-name"
            />
          </label>

          <label class="block">
            <span class="block text-xs uppercase tracking-widest opacity-60 mb-2">País</span>
            <select bind:value={countryCode} class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg" data-testid="host-country">
              {#each supportedCountries as c (c.code)}
                <option value={c.code}>{c.flag} {c.name}</option>
              {/each}
            </select>
          </label>

          <div class="grid grid-cols-2 gap-4">
            <label class="block">
              <span class="block text-xs uppercase tracking-widest opacity-60 mb-2">Grado</span>
              <select bind:value={grado} class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg" data-testid="host-grade">
                {#each grades as g (g.id)}
                  <option value={g.id}>{g.name}</option>
                {/each}
              </select>
            </label>
            <label class="block">
              <span class="block text-xs uppercase tracking-widest opacity-60 mb-2">Asignatura</span>
              <select bind:value={asignatura} class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg" data-testid="host-subject">
                {#each subjects as s (s.id)}
                  <option value={s.id}>{s.name}</option>
                {/each}
              </select>
            </label>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <label class="block">
              <span class="block text-xs uppercase tracking-widest opacity-60 mb-2">Preguntas</span>
              <select bind:value={totalQuestions} class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg" data-testid="host-count">
                {#each QUESTION_COUNTS as n}
                  <option value={n}>{n}</option>
                {/each}
              </select>
            </label>
            <label class="block">
              <span class="block text-xs uppercase tracking-widest opacity-60 mb-2">Segundos por pregunta</span>
              <select bind:value={secondsPerQuestion} class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg" data-testid="host-seconds">
                {#each SECONDS_OPTIONS as n}
                  <option value={n}>{n} s</option>
                {/each}
              </select>
            </label>
          </div>

          {#if setupError}
            <p class="text-sm text-red-300 bg-red-500/10 border border-red-500/40 rounded-lg p-3" role="alert" data-testid="host-error">
              {setupError}
            </p>
          {/if}

          <button
            type="button"
            onclick={createRoom}
            disabled={creating || !grado || !asignatura}
            class="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold uppercase tracking-widest rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="host-create"
          >
            {creating ? 'Cargando preguntas…' : 'Crear sala'}
          </button>
          <button type="button" onclick={onExit} class="w-full py-2 text-sm opacity-60 hover:opacity-100">
            ← Volver
          </button>
        </div>
      </FlashlightCard>
    </div>
  {:else}
    {@const config = host.config}
    <header class="flex flex-wrap items-center justify-between gap-3 mb-6 text-sm opacity-80">
      <span>{config.hostName} · {config.asignaturaLabel} · Grado {config.grado} · {config.countryCode}</span>
      <span class="flex items-center gap-3">
        {#if host.status === 'connecting'}<span class="text-amber-300">Conectando…</span>{/if}
        {#if host.status === 'error'}<span class="text-red-300">{PARTY_ERROR_MESSAGES.transport_unavailable}</span>{/if}
        <button type="button" onclick={closeRoom} class="px-3 py-1 rounded border border-white/20 hover:border-red-400" data-testid="host-close">
          Cerrar sala
        </button>
      </span>
    </header>

    {#if host.phase === 'lobby'}
      <div class="grid md:grid-cols-2 gap-8 items-start">
        <div class="text-center">
          <p class="text-xs uppercase tracking-[0.3em] opacity-60 mb-2">Código de la sala</p>
          <p class="text-6xl sm:text-7xl font-black tracking-widest text-emerald-400 font-mono" data-testid="room-code">
            {config.code}
          </p>
          {#if reach === 'local'}
            <p
              class="mt-6 text-sm text-amber-100 bg-amber-500/15 border border-amber-400/50 rounded-lg p-3 text-left"
              role="alert"
              data-testid="host-reach"
              data-reach="local"
            >
              <strong>Solo pueden unirse pestañas de este mismo navegador.</strong>
              Los celulares o computadores de los estudiantes no podrán entrar con este código ni con el QR,
              porque no se pudo abrir la conexión entre dispositivos. Revisa la conexión a internet y crea la sala de nuevo.
            </p>
          {:else if reach === 'pending'}
            <p class="mt-6 text-sm text-amber-200" data-testid="host-reach" data-reach="pending">
              Activando la conexión para otros dispositivos…
            </p>
          {/if}
          {#if qrSvg}
            <div
              class="mx-auto mt-6 w-48 h-48 bg-white rounded-xl p-2 {reach === 'local' ? 'opacity-40' : ''}"
              aria-label="Código QR para unirse"
            >
              {@html qrSvg}
            </div>
          {/if}
          <p class="mt-4 text-sm break-all opacity-70" data-testid="join-url">{joinUrl}</p>
          <button type="button" onclick={copyLink} class="mt-2 text-xs uppercase tracking-widest text-emerald-300 hover:underline">
            {copied ? '¡Enlace copiado!' : 'Copiar enlace'}
          </button>
          {#if reach === 'devices'}
            <p class="mt-4 text-xs opacity-60" data-testid="host-reach" data-reach="devices">
              Los estudiantes abren el enlace o escriben el código en /party desde cualquier dispositivo con internet.
            </p>
          {/if}
        </div>

        <FlashlightCard className="p-6">
          <h2 class="text-lg font-bold mb-4">
            Jugadores conectados: <span data-testid="player-count">{onlinePlayers.length}</span>
          </h2>
          {#if host.players.length === 0}
            <p class="opacity-50 text-sm">Esperando estudiantes…</p>
          {:else}
            <ul class="flex flex-wrap gap-2 mb-6" data-testid="host-player-list">
              {#each host.players as p (p.id)}
                <li class="px-3 py-1 rounded-full text-sm border {p.online ? 'border-emerald-500/60 bg-emerald-500/10' : 'border-white/10 opacity-50'}">
                  {p.nickname}
                  <button type="button" class="ml-1 opacity-50 hover:opacity-100" aria-label="Retirar a {p.nickname}" onclick={() => session?.kick(p.id)}>×</button>
                </li>
              {/each}
            </ul>
          {/if}
          <button
            type="button"
            onclick={() => session?.start()}
            disabled={onlinePlayers.length === 0}
            class="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold uppercase tracking-widest rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="host-start"
          >
            Empezar ({config.totalQuestions} preguntas · {config.secondsPerQuestion} s)
          </button>
        </FlashlightCard>
      </div>
    {:else if host.phase === 'question' && host.question}
      <div class="grid md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm uppercase tracking-widest opacity-70" data-testid="host-question-index">
              Pregunta {host.question.index + 1} de {host.question.total}
            </span>
            <span class="text-3xl font-mono font-black text-amber-300" data-testid="host-countdown">{secondsLeft}</span>
          </div>
          <FlashlightCard className="p-6">
            {#if host.question.question.context}
              <p class="text-sm opacity-70 mb-3">{host.question.question.context}</p>
            {/if}
            <p class="text-xl leading-relaxed" data-testid="host-question-text">{host.question.question.text}</p>
          </FlashlightCard>
          <ul class="grid sm:grid-cols-2 gap-3">
            {#each host.question.question.options as o (o.id)}
              <li class="p-4 rounded-lg bg-white/5 border border-white/10"><strong class="text-emerald-400">{o.id})</strong> {o.text}</li>
            {/each}
          </ul>
          <div class="flex items-center justify-between">
            <span class="text-sm opacity-70" data-testid="host-answered">Respondieron {host.answeredCount} de {host.expectedCount}</span>
            <button type="button" onclick={() => session?.next()} class="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm" data-testid="host-next">
              Cerrar pregunta
            </button>
          </div>
        </div>
        <PartyScoreboard entries={host.scoreboard} />
      </div>
    {:else if host.phase === 'reveal' && host.reveal}
      {@const revealQuestion = host.currentIndex}
      <div class="grid md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-4">
          <p class="text-sm uppercase tracking-widest opacity-70">Resultado de la pregunta {revealQuestion + 1}</p>
          <FlashlightCard className="p-6">
            <p class="text-lg">Respuesta correcta: <strong class="text-emerald-300" data-testid="host-correct">{host.reveal.correctOptionId}</strong></p>
            {#if host.reveal.explanation}
              <p class="mt-3 text-sm opacity-70">{host.reveal.explanation}</p>
            {/if}
          </FlashlightCard>
          <button type="button" onclick={() => session?.next()} class="px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-bold" data-testid="host-next">
            Siguiente →
          </button>
        </div>
        <PartyScoreboard entries={host.reveal.scoreboard} />
      </div>
    {:else if host.phase === 'finished'}
      <PartyPodium entries={host.scoreboard} />
      <div class="mt-10 flex justify-center gap-4">
        <button type="button" onclick={newRoom} class="px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-bold" data-testid="host-new-room">
          Nueva sala
        </button>
      </div>
    {/if}
  {/if}
</div>
