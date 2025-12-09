<script lang="ts">
  import { onMount } from 'svelte';
  import { signInWithGithub, signOut, getUser } from '../lib/auth';
  import type { User } from '@supabase/supabase-js';

  let user: User | null = null;
  let loading = true;

  onMount(async () => {
    user = await getUser();
    loading = false;

    // Listen for auth changes
    const { data: { subscription } } = await import('../lib/supabase').then(m => m.supabase.auth.onAuthStateChange((_event, session) => {
      user = session?.user ?? null;
    }));

    return () => {
      subscription.unsubscribe();
    };
  });

  async function handleLogin() {
    try {
      await signInWithGithub();
    } catch (e) {
      alert('Error al iniciar sesión');
    }
  }

  async function handleLogout() {
    try {
      await signOut();
    } catch (e) {
      alert('Error al cerrar sesión');
    }
  }
</script>

{#if !loading}
  {#if user}
    <div class="flex items-center gap-3">
      {#if user.user_metadata.avatar_url}
        <img
          src={user.user_metadata.avatar_url}
          alt={user.user_metadata.full_name}
          class="w-8 h-8 rounded-full border border-white/20"
        />
      {/if}
      <button
        on:click={handleLogout}
        class="text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
      >
        Salir
      </button>
    </div>
  {:else}
    <button
      on:click={handleLogin}
      class="flex items-center gap-2 px-4 py-2 bg-[#24292F] hover:bg-[#24292F]/80 text-white text-xs font-bold uppercase tracking-widest rounded transition-all border border-white/10"
    >
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
      </svg>
      <span>Ingresar con GitHub</span>
    </button>
  {/if}
{/if}
