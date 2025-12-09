<script lang="ts">
  import { onMount } from 'svelte';
  import { getUser } from '../lib/auth';
  import type { User } from '@supabase/supabase-js';

  export let user: User | null = null;
  export let className = "";

  // If user is not passed prop, try to fetch it (optional, for standalone usage)
  onMount(async () => {
    if (user === undefined) {
      user = await getUser();
    }
  });
</script>

{#if !user}
  <div class={`p-6 border border-white/10 bg-[#1E1E1E]/30 rounded-lg text-center ${className}`}>
    <p class="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-4">
      Publicidad
    </p>

    <!-- Google AdSense Unit -->
    <div class="min-h-[250px] bg-white/5 flex items-center justify-center mb-4">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-7015371704987876"
           data-ad-slot="auto"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>

    <p class="text-[10px] uppercase tracking-widest opacity-40 max-w-md mx-auto">
      💚 Esto me ayuda a seguir construyendo más software open source.
      <br>
      ¿Te gusta el proyecto? <a href="https://patreon.com/elberi" target="_blank" class="underline hover:text-emerald-500">Apóyame en Patreon</a> y disfruta sin anuncios.
    </p>
  </div>
{/if}
