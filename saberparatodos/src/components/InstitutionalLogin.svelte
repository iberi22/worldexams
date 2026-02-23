<script>
  import { supabase } from '../lib/supabase';

  let loading = false;
  let email = '';
  let sent = false;
  let error = null;

  async function handleLogin() {
    try {
      loading = true;
      error = null;
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/dashboard',
          shouldCreateUser: false,
        },
      });
      if (err) throw err;
      sent = true;
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
  <div class="p-8">
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
        <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-zinc-900 dark:text-white">Portal Institucional</h2>
      <p class="text-zinc-600 dark:text-zinc-400 mt-2 text-sm">Gestiona estudiantes y analiza el rendimiento académico.</p>
    </div>

    {#if sent}
      <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
        <h3 class="text-green-800 dark:text-green-300 font-medium mb-2">¡Enlace enviado!</h3>
        <p class="text-green-700 dark:text-green-400 text-sm">Revisa tu correo electrónico <strong>{email}</strong> para iniciar sesión.</p>
        <button on:click={() => sent = false} class="mt-4 text-sm text-green-700 dark:text-green-400 font-medium hover:underline">
          Intentar con otro correo
        </button>
      </div>
    {:else}
      <form on:submit|preventDefault={handleLogin} class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Correo Institucional</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            required
            placeholder="rectoria@colegio.edu.co"
            class="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        {#if error}
          <div class="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
            {error}
          </div>
        {/if}

        <button
          type="submit"
          disabled={loading}
          class="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {#if loading}
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando enlace...
          {:else}
            ✨ Enviar Magic Link
          {/if}
        </button>

        <p class="text-xs text-center text-zinc-500 dark:text-zinc-500 mt-4">
          Al ingresar aceptas nuestros <a href="/terminos" class="underline hover:text-zinc-800 dark:hover:text-zinc-300">términos de servicio</a>.
        </p>
      </form>
    {/if}
  </div>
</div>
