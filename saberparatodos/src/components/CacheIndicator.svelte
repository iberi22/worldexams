<script lang="ts">
  import { onMount } from 'svelte';
  import { cacheService } from '../lib/cache-service';
  import { getPWAStatus } from '../lib/pwa-detector';

  let cacheStats: { grade: number; count: number; isGuest: boolean; age: number }[] = [];
  let isLoading = true;
  let showDetails = false;
  let pwaStatus = { isPWA: false, displayMode: 'browser', isInstallable: false };

  async function loadStats() {
    try {
      cacheStats = await cacheService.getCacheStats();
      isLoading = false;
    } catch (error) {
      console.error('Error loading cache stats:', error);
      isLoading = false;
    }
  }

  async function clearCache() {
    if (confirm('¿Estás seguro de que quieres limpiar la caché? Esto descargará nuevas preguntas en tu próximo examen.')) {
      await cacheService.clearCache();
      cacheStats = [];
      alert('Caché limpiada exitosamente');
    }
  }
  pwaStatus = getPWAStatus();

  onMount(() => {
    loadStats();
  });

  $: totalQuestions = cacheStats.reduce((sum, stat) => sum + stat.count, 0);
  $: hasCache = cacheStats.length > 0;
</script>

<div class="cache-indicator">
  {#if isLoading}
    <button class="cache-btn" disabled>
      <span class="icon">⏳</span>
      <span class="text">Cargando...</span>
    </button>{pwaStatus.isPWA ? '📱' : '📦'}
  {:else if hasCache}
    <button class="cache-btn active" on:click={() => showDetails = !showDetails}>
      <span class="icon">📦</span>
      <span class="text">{totalQuestions} preguntas</span>
      <span class="badge-mini">{cacheStats[0]?.isGuest ? '🔒' : '🔓'}</span>
    </button>
  {:else}
    <button class="cache-btn" disabled>
      <span class="icon">💾</span>
      <span class="text">Sin caché</span>
    </button>
  {/if}

  {#if showDetails && hasCache}
    <div class="cache-details">
      <div class="details-header">
        <h3>Estado de la Caché {pwaStatus.isPWA ? '📱' : ''}</h3>
        <button class="close-btn" on:click={() => showDetails = false}>✕</button>
      </div>

      {#if pwaStatus.isPWA}
        <div class="pwa-banner">
          <span class="pwa-icon">📱</span>
          <div class="pwa-info">
            <strong>Modo PWA Activado</strong>
            <p>Cache extendido para 7 días de práctica offline</p>
          </div>
        </div>
      {/if}

      <div class="details-content">
        {#each cacheStats as stat}
          <div class="cache-item">
            <div class="item-header">
              <strong>Grado {stat.grade}</strong>
              <span class="badge {stat.isGuest ? 'guest' : 'auth'}">
                {stat.isGuest ? '🔒 Invitado' : '🔓 Autenticado'}
              </span>
            </div>
            <div class="item-details">
              <span>{stat.count} preguntas</span>
              <span class="age">Hace {stat.age} min</span>
            </div>
          </div>
        {/each}
      </div>

      <div class="details-footer">
        <button class="clear-btn" on:click={clearCache}>
          🗑️ Limpiar Caché
        </button>
        <div class="info-box">
          {#if cacheStats[0]?.isGuest}
            <div class="guest-warning">
              <div class="warning-icon">🔒</div>
              <div class="warning-content">
                <strong>Modo Invitado Activo</strong>
                <p>Tienes acceso a 100 preguntas aleatorias para práctica ilimitada.</p>
                <p class="highlight">✨ No se harán más llamadas al servidor</p>
                <p class="upgrade-hint">💎 Inicia sesión para acceso completo</p>
                {#if pwaStatus.isPWA}
                  <p class="pwa-upgrade">📱 En PWA + Auth obtendrías 420 preguntas (7 días de exámenes)</p>
                {/if}
              </div>
            </div>
          {:else}
            <div class="auth-success">
              <span class="success-icon">✅</span>
              <div>
                <strong>Acceso {pwaStatus.isPWA ? 'PWA' : 'Completo'} Activado</strong>
                <p>{pwaStatus.isPWA ? '420 preguntas para 7 días de simulacros' : '200 preguntas disponibles'}</p>
                {#if !pwaStatus.isPWA}
                  <p class="install-hint">💡 Instala la app para 420 preguntas (7 días offline)</p>
                {/if}
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .cache-indicator {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }

  .cache-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: rgba(16, 185, 129, 0.1);
    border: 2px solid rgba(16, 185, 129, 0.3);
    border-radius: 12px;
    color: #10b981;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .cache-btn:hover:not(:disabled) {
    background: rgba(16, 185, 129, 0.2);
    border-color: #10b981;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  .cache-btn.active {
    background: rgba(16, 185, 129, 0.15);
    border-color: #10b981;
  }

  .cache-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon {
    font-size: 18px;
  }

  .cache-details {
    position: absolute;
    bottom: 60px;
    right: 0;
    width: 350px;
    background: rgba(20, 30, 48, 0.95);
    border: 2px solid rgba(16, 185, 129, 0.3);
    border-radius: 16px;
    padding: 20px;
    backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .details-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(16, 185, 129, 0.2);
  }

  .details-header h3 {
    margin: 0;
    color: #10b981;
    font-size: 16px;
  }

  .pwa-banner {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(16, 185, 129, 0.15));
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .pwa-icon {
    font-size: 24px;
    flex-shrink: 0;
  }

  .pwa-info strong {
    color: #a78bfa;
    display: block;
    font-size: 13px;
    margin-bottom: 4px;
  }

  .pwa-info p {
    margin: 0;
    color: #cbd5e1;
    font-size: 11px;
  }

  .pwa-upgrade {
    color: #a78bfa !important;
    font-weight: 600;
    font-size: 11px !important;
    margin-top: 8px !important;
    padding-top: 8px;
    border-top: 1px solid rgba(139, 92, 246, 0.2);
  }

  .install-hint {
    color: #94a3b8;
    font-size: 11px !important;
    margin-top: 6px !important;
    font-weight: normal !important;
  }

  .close-btn {
    background: none;
    border: none;
    color: #94a3b8;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: all 0.2s;
  }

  .close-btn:hover {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
  }

  .details-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
  }

  .cache-item {
    background: rgba(16, 185, 129, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 10px;
    padding: 12px;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .item-header strong {
    color: #fff;
    font-size: 14px;
  }

  .badge {
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
  }

  .badge.guest {
    background: rgba(239, 68, 68, 0.2);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  .badge.auth {
    background: rgba(16, 185, 129, 0.2);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .item-details {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #94a3b8;
  }

  .age {
    color: #64748b;
  }

  .details-footer {
    padding-top: 16px;
    border-top: 1px solid rgba(16, 185, 129, 0.2);
  }

  .clear-btn {
    width: 100%;
    padding: 10px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 8px;
    color: #f87171;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 12px;
  }

  .clear-btn:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: #ef4444;
  }

  .badge-mini {
    font-size: 12px;
    opacity: 0.8;
  }

  .info-box {
    font-size: 12px;
    line-height: 1.6;
  }

  .guest-warning {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.1));
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 10px;
    padding: 16px;
    display: flex;
    gap: 12px;
  }

  .warning-icon {
    font-size: 24px;
    flex-shrink: 0;
  }

  .warning-content {
    flex: 1;
  }

  .warning-content strong {
    color: #fbbf24;
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
  }

  .warning-content p {
    margin: 6px 0;
    color: #cbd5e1;
    font-size: 12px;
  }

  .warning-content .highlight {
    color: #10b981;
    font-weight: 600;
  }

  .warning-content .upgrade-hint {
    color: #a78bfa;
    font-weight: 600;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .auth-success {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 10px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .success-icon {
    font-size: 24px;
  }

  .auth-success strong {
    color: #10b981;
    display: block;
    margin-bottom: 4px;
  }

  .auth-success p {
    margin: 0;
    color: #94a3b8;
    font-size: 12px;
  }

  @media (max-width: 640px) {
    .cache-indicator {
      bottom: 10px;
      right: 10px;
      left: 10px;
    }

    .cache-btn {
      width: 100%;
      justify-content: center;
    }

    .cache-details {
      width: calc(100vw - 40px);
      right: auto;
      left: 0;
    }
  }
</style>
