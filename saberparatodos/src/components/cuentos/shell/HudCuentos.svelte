<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import {
    getAllProgress,
    getActiveProfile,
    createProfile,
    NEUTRAL_NICKNAMES,
    type ChildProfile
  } from '../../../lib/cuentos/progreso';
  import { getLogrosDesbloqueadosMap } from '../../../lib/cuentos/logros';

  export interface Props {
    className?: string;
  }

  let { className = '' }: Props = $props();

  const SONIDO_KEY = 'cuentos:sonido:v1';
  const VELOCIDAD_KEY = 'cuentos:velocidad:v1';

  // Hydration guard & counts state
  let isMounted = $state(false);
  let starsCount = $state<number | null>(null);
  let checksCount = $state<number | null>(null);
  let pinsCount = $state<number | null>(null);

  // Settings & Profile State
  let isMuted = $state(false);
  let speed = $state<'normal' | 'lento'>('normal');
  let isReducedMotion = $state(false);
  let activeProfile = $state<ChildProfile | null>(null);

  // Popover / Modal Toggles
  let showPerfilModal = $state(false);
  let showAjustesPopover = $state(false);

  onMount(() => {
    isMounted = true;
    refreshCountersAndState();

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  });

  function refreshCountersAndState() {
    if (typeof localStorage === 'undefined') return;

    // 1. Progress & Logros
    const progressMap = getAllProgress();
    const logrosMap = getLogrosDesbloqueadosMap();

    const progressValues = Object.values(progressMap);

    // Checks: Completed stories
    const completedStories = progressValues.filter((p) => p.finished).length;

    // Stars: Calculated from quiz scores and completed readings
    const computedStars = progressValues.reduce((acc, p) => {
      const quizStars = (p.quizBest || 0) * 5;
      const completionStars = p.finished ? 5 : 0;
      return acc + quizStars + completionStars;
    }, 0);

    // Pins: Unlocked achievements count
    const computedPins = Object.keys(logrosMap).length;

    starsCount = computedStars;
    checksCount = completedStories;
    pinsCount = computedPins;

    // 2. Local preferences
    const storedSonido = localStorage.getItem(SONIDO_KEY);
    isMuted = storedSonido === 'muted';

    const storedVelocidad = localStorage.getItem(VELOCIDAD_KEY);
    if (storedVelocidad === 'lento' || storedVelocidad === 'normal') {
      speed = storedVelocidad;
    }

    // 3. Child profile
    activeProfile = getActiveProfile();
  }

  function toggleSonido() {
    isMuted = !isMuted;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(SONIDO_KEY, isMuted ? 'muted' : 'unmuted');
    }
  }

  function setSpeed(newSpeed: 'normal' | 'lento') {
    speed = newSpeed;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(VELOCIDAD_KEY, newSpeed);
    }
  }

  function handleCreateNewProfile() {
    const newProf = createProfile();
    activeProfile = newProf;
    refreshCountersAndState();
  }

  function closeModals() {
    showPerfilModal = false;
    showAjustesPopover = false;
  }
</script>

<header class="hud-cuentos-header {className}">
  <!-- Left Cluster: Progress Counters -->
  <div
    class="hud-cluster-left"
    role="status"
    aria-live="polite"
    aria-label="Progreso de lectura"
  >
    <div class="hud-counter-item" title="Estrellas acumuladas">
      <span class="icon" aria-hidden="true">⭐</span>
      <span class="count-val">{isMounted && starsCount !== null ? starsCount : '--'}</span>
      <span class="denom">/150</span>
    </div>

    <div class="hud-counter-divider" aria-hidden="true"></div>

    <div class="hud-counter-item" title="Cuentos completados">
      <span class="icon" aria-hidden="true">✔</span>
      <span class="count-val">{isMounted && checksCount !== null ? checksCount : '--'}</span>
      <span class="denom">/75</span>
    </div>

    <div class="hud-counter-divider" aria-hidden="true"></div>

    <div class="hud-counter-item" title="Insignias y logros">
      <span class="icon" aria-hidden="true">📌</span>
      <span class="count-val">{isMounted && pinsCount !== null ? pinsCount : '--'}</span>
      <span class="denom">/75</span>
    </div>
  </div>

  <!-- Right Cluster: 4 Round Wooden Toy Buttons (>= 48px) -->
  <div class="hud-cluster-right" role="toolbar" aria-label="Controles del lector">
    <!-- 1. Sonido Toggle Button -->
    <button
      type="button"
      class="wooden-toy-btn {isMuted ? 'is-muted' : 'is-active'}"
      onclick={toggleSonido}
      aria-label={isMuted ? 'Activar sonido de lectura' : 'Silenciar sonido de lectura'}
      title={isMuted ? 'Sonido desactivado' : 'Sonido activado'}
    >
      <span class="btn-emoji" aria-hidden="true">{isMuted ? '🔇' : '🔊'}</span>
    </button>

    <!-- 2. Idioma Badge Button (fixed neutral Spanish, non-navigating) -->
    <button
      type="button"
      class="wooden-toy-btn wooden-toy-badge"
      aria-label="Idioma: Español Neutro"
      title="Idioma: Español Neutro"
      onclick={() => {}}
    >
      <span>ES</span>
    </button>

    <!-- 3. Perfil Switcher Button -->
    <button
      type="button"
      class="wooden-toy-btn"
      onclick={() => (showPerfilModal = !showPerfilModal)}
      aria-label="Perfil del lector"
      title="Perfil del lector"
      aria-expanded={showPerfilModal}
    >
      <span class="btn-emoji" aria-hidden="true">🐻</span>
    </button>

    <!-- 4. Ajustes Popover Button -->
    <button
      type="button"
      class="wooden-toy-btn"
      onclick={() => (showAjustesPopover = !showAjustesPopover)}
      aria-label="Ajustes de lectura"
      title="Ajustes de lectura"
      aria-expanded={showAjustesPopover}
    >
      <span class="btn-emoji" aria-hidden="true">⚙️</span>
    </button>
  </div>
</header>

<!-- Modal Perfil (Local Child Profile Switcher) -->
{#if showPerfilModal}
  <div class="hud-overlay-backdrop" role="dialog" aria-modal="true" aria-label="Perfil de Lectura">
    <div class="hud-popover-card">
      <div class="hud-popover-title">
        <span>Perfil de Lectura</span>
        <button
          type="button"
          class="hud-popover-close"
          onclick={closeModals}
          aria-label="Cerrar modal"
        >
          ✕
        </button>
      </div>

      <div class="profile-info-box">
        <p class="profile-subtitle">Perfil activo en este dispositivo:</p>
        <div class="profile-badge">
          <span class="avatar">🐻</span>
          <span class="nickname">{activeProfile?.nickname || 'Explorador Curioso'}</span>
        </div>
        <p class="profile-hint">
          Los perfiles son 100% anónimos y se guardan solo en tu navegador.
        </p>

        <button
          type="button"
          class="new-profile-btn"
          onclick={handleCreateNewProfile}
        >
          🎲 Crear nuevo perfil anónimo
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Popover Ajustes (Reading Speed & Motion Prefs) -->
{#if showAjustesPopover}
  <div class="hud-overlay-backdrop" role="dialog" aria-modal="true" aria-label="Ajustes de Lectura">
    <div class="hud-popover-card">
      <div class="hud-popover-title">
        <span>Ajustes de Lectura</span>
        <button
          type="button"
          class="hud-popover-close"
          onclick={closeModals}
          aria-label="Cerrar ajustes"
        >
          ✕
        </button>
      </div>

      <div class="settings-group">
        <label class="settings-label" for="speed-options">Velocidad de cambio de página:</label>
        <div id="speed-options" class="speed-toggle-row">
          <button
            type="button"
            class="speed-option-btn {speed === 'normal' ? 'selected' : ''}"
            onclick={() => setSpeed('normal')}
          >
            Normal (6s)
          </button>
          <button
            type="button"
            class="speed-option-btn {speed === 'lento' ? 'selected' : ''}"
            onclick={() => setSpeed('lento')}
          >
            Lento (10s)
          </button>
        </div>
      </div>

      <div class="settings-group">
        <span class="settings-label">Preferencia de movimiento:</span>
        <div class="motion-status-badge">
          {#if isReducedMotion}
            <span>⏸️ Movimiento reducido activo</span>
          {:else}
            <span>✨ Animaciones activadas</span>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .profile-info-box {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .profile-subtitle {
    font-size: 0.85rem;
    font-weight: 600;
    margin: 0;
    color: var(--cuento-texto-oscuro);
  }

  .profile-badge {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background-color: white;
    border: 2px solid var(--cuento-madera-borde);
    padding: 0.6rem 1rem;
    border-radius: 0.85rem;
  }

  .profile-badge .avatar {
    font-size: 1.5rem;
  }

  .profile-badge .nickname {
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--cuento-texto-oscuro);
  }

  .profile-hint {
    font-size: 0.75rem;
    color: rgba(42, 31, 27, 0.7);
    margin: 0;
    line-height: 1.4;
  }

  .new-profile-btn {
    min-height: 48px;
    padding: 0.6rem 1rem;
    background-color: var(--cuento-dorado);
    color: var(--cuento-texto-oscuro);
    border: 2px solid var(--cuento-madera-borde);
    border-radius: 0.75rem;
    font-weight: 800;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .new-profile-btn:hover {
    background-color: #c4993f;
  }

  .settings-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
  }

  .settings-label {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--cuento-texto-oscuro);
  }

  .speed-toggle-row {
    display: flex;
    gap: 0.5rem;
  }

  .speed-option-btn {
    flex: 1;
    min-height: 48px;
    padding: 0.5rem;
    border: 2px solid var(--cuento-madera-borde);
    border-radius: 0.6rem;
    background-color: white;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    color: var(--cuento-texto-oscuro);
  }

  .speed-option-btn.selected {
    background-color: var(--cuento-dorado);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .motion-status-badge {
    padding: 0.6rem 0.85rem;
    background-color: white;
    border: 2px solid var(--cuento-madera-borde);
    border-radius: 0.6rem;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--cuento-texto-oscuro);
  }
</style>
