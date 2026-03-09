<script lang="ts">
  import { onMount } from 'svelte';
  import { getUserProfile } from '$lib/supabase';

  interface Profile {
    credits: number;
    credits_refill_at: string;
    subscription_tier: 'free' | 'pro';
  }

  let profile = $state<Profile | null>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let timeUntilRefill = $state('');

  onMount(async () => {
    await loadProfile();
    // Update countdown every second
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  });

  async function loadProfile() {
    try {
      const data = await getUserProfile();
      if (data) {
        profile = {
          credits: data.credits,
          credits_refill_at: data.credits_refill_at,
          subscription_tier: data.subscription_tier
        };
        error = null;
      } else {
        // User not authenticated - show friendly message
        error = 'not_authenticated';
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      error = 'fetch_failed';
    } finally {
      loading = false;
    }
  }

  function updateCountdown() {
    if (!profile?.credits_refill_at) return;

    const now = new Date().getTime();
    const refill = new Date(profile.credits_refill_at).getTime();
    const diff = refill - now;

    if (diff <= 0) {
      timeUntilRefill = 'Recargando...';
      loadProfile(); // Refresh to get new credits
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      timeUntilRefill = `${days}d ${hours}h`;
    } else if (hours > 0) {
      timeUntilRefill = `${hours}h ${minutes}m`;
    } else {
      timeUntilRefill = `${minutes}m`;
    }
  }

  function getProgressPercentage(): number {
    if (!profile) return 0;
    const maxCredits = profile.subscription_tier === 'pro' ? 500 : 50;
    return (profile.credits / maxCredits) * 100;
  }

  function getProgressColor(): string {
    const percentage = getProgressPercentage();
    if (percentage > 60) return 'text-green-400';
    if (percentage > 30) return 'text-yellow-400';
    return 'text-red-400';
  }
</script>

<div class="credit-widget">
  {#if loading}
    <div class="loading">
      <div class="spinner"></div>
    </div>
  {:else if error === 'not_authenticated'}
    <div class="auth-prompt">
      <div class="auth-content">
        <span class="lock-icon">🔒</span>
        <div class="auth-text">
          <h3>Inicia sesión para entrenar</h3>
          <p>Las funcionalidades de IA y el seguimiento de progreso requieren una cuenta.</p>
        </div>
      </div>
      <button class="auth-button" on:click={() => window.location.href = '/practica'}>
        Volver al inicio
      </button>
    </div>
  {:else if error === 'fetch_failed'}
    <div class="error">
      <p>⚠️ Error al cargar créditos</p>
      <button on:click={loadProfile}>Reintentar</button>
    </div>
  {:else if profile}
    <div class="credit-display">
      <div class="circular-progress">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="#1a1a1a"
            stroke-width="8"
          />
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="currentColor"
            stroke-width="8"
            stroke-dasharray={`${2 * Math.PI * 35}`}
            stroke-dashoffset={`${2 * Math.PI * 35 * (1 - getProgressPercentage() / 100)}`}
            transform="rotate(-90 40 40)"
            class={getProgressColor()}
          />
        </svg>
        <div class="credit-number">
          <span class="amount">{profile.credits}</span>
          <span class="label">créditos</span>
        </div>
      </div>

      <div class="details">
        <div class="tier">
          <span class="tier-badge" class:pro={profile.subscription_tier === 'pro'}>
            {profile.subscription_tier === 'pro' ? '⭐ PRO' : '🆓 FREE'}
          </span>
        </div>

        <div class="refill-info">
          <p class="refill-text">Próxima recarga en</p>
          <p class="countdown">{timeUntilRefill}</p>
        </div>

        <button class="buy-button" on:click={() => window.location.href = '/buy-credits'}>
          💳 Comprar Créditos
        </button>
      </div>
    </div>
  {:else}
    <div class="error">
      <p>⚠️ Error desconocido</p>
      <button on:click={loadProfile}>Reintentar</button>
    </div>
  {/if}
</div>

<style>
  .credit-widget {
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 12px;
    padding: 1.5rem;
    color: #f5f5dc;
    font-family: 'Fira Code', monospace;
  }

  .loading,
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    min-height: 150px;
    text-align: center;
  }

  .auth-prompt {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    min-height: 150px;
    padding: 0.5rem;
  }

  .auth-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    text-align: left;
  }

  .lock-icon {
    font-size: 2rem;
    background: rgba(252, 209, 22, 0.1);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid rgba(252, 209, 22, 0.3);
    flex-shrink: 0;
  }

  .auth-text h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1.1rem;
    color: #f5f5dc;
  }

  .auth-text p {
    margin: 0;
    font-size: 0.9rem;
    color: #a0a0a0;
    line-height: 1.4;
  }

  .auth-button,
  .error button {
    background: #003893;
    color: white;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 6px;
    font-family: inherit;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .auth-button:hover,
  .error button:hover {
    background: #0052cc;
  }

  .error p {
    color: #ff6b6b;
    margin: 0;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #333;
    border-top-color: #fcd116;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .credit-display {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .circular-progress {
    position: relative;
    flex-shrink: 0;
  }

  .credit-number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .amount {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
    color: #fcd116;
  }

  .label {
    display: block;
    font-size: 0.7rem;
    color: #a0a0a0;
    text-transform: uppercase;
  }

  .details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .tier-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: #333;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .tier-badge.pro {
    background: linear-gradient(135deg, #fcd116, #ff6b6b);
    color: #000;
  }

  .refill-info {
    font-size: 0.85rem;
  }

  .refill-text {
    color: #a0a0a0;
    margin: 0;
  }

  .countdown {
    color: #fcd116;
    font-weight: bold;
    margin: 0.25rem 0 0;
  }

  .buy-button {
    background: #003893;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-family: inherit;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .buy-button:hover {
    background: #0052cc;
  }

  @media (max-width: 640px) {
    .credit-display {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
