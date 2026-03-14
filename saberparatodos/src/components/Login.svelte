<script>
  import { supabase } from '../lib/supabase';
  import FlashlightCard from './FlashlightCard.svelte';

  export let onBack;

  let email = '';
  let loading = false;
  let message = '';
  let error = '';

  async function handleLogin() {
    if (!email) {
      error = 'Por favor ingresa tu correo.';
      return;
    }

    loading = true;
    error = '';
    message = '';

    try {
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
          shouldCreateUser: false,
        },
      });

      if (err) throw err;

      message = '¡Enlace mágico enviado! Revisa tu correo.';
    } catch (e) {
      error = e.message || 'Error al intentar ingresar.';
    } finally {
      loading = false;
    }
  }
</script>

<div class="flex flex-col items-center justify-center space-y-6 animate-fade-in-up">
  <div class="text-center space-y-2">
    <h2 class="text-3xl font-bold uppercase tracking-tighter text-[#F5F5DC]">
      Acceso <span class="text-emerald-500">Seguro</span>
    </h2>
    <p class="text-sm opacity-60 max-w-xs mx-auto">
      Ingresa sin contraseña. Te enviaremos un enlace mágico a tu correo.
    </p>
  </div>

  <div class="w-full max-w-md p-6 sm:p-8 rounded-xl border border-white/10 bg-[#121212]/50 backdrop-blur-md shadow-2xl">
    <div class="space-y-6">
      <div>
        <label for="email" class="block text-xs uppercase tracking-widest opacity-60 mb-2">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          bind:value={email}
          placeholder="estudiante@ejemplo.com"
          class="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-[#F5F5DC] focus:outline-none focus:border-emerald-500 transition-colors"
          disabled={loading}
        />
      </div>

      {#if error}
        <div class="text-red-400 text-xs text-center bg-red-500/10 p-2 rounded border border-red-500/20">
          {error}
        </div>
      {/if}

      {#if message}
        <div class="text-emerald-400 text-xs text-center bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
          {message}
        </div>
      {/if}

      <button
        disabled
        class="w-full py-3 bg-gray-500/10 border border-white/10 rounded-lg text-gray-500 font-bold uppercase tracking-widest cursor-not-allowed"
      >
        Pronto
      </button>
      <p class="text-[10px] text-center opacity-40 uppercase tracking-tighter">
        El sistema de recompensas y perfiles estará disponible próximamente.
      </p>
    </div>
  </div>

  {#if onBack}
    <button
      on:click={onBack}
      class="text-xs uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-emerald-500 transition-colors"
    >
      Cancelar
    </button>
  {/if}
</div>
