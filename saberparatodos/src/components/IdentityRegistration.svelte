<script lang="ts">
  /**
   * IdentityRegistration.svelte
   * Componente para generar ID anónimo del estudiante
   * Colombia - saberparatodos
   */

  import {
    generateAnonymousId,
    saveLocalIdentity,
    getLocalIdentity,
    CIUDADES_COLOMBIA,
    type AnonymousIdentity
  } from '../lib/identity';

  // Props
  export let onComplete: (identity: AnonymousIdentity) => void;
  export let onCancel: (() => void) | null = null;
  export let onSkip: (() => void) | null = null; // Alias for backward compatibility

  // State
  let nombre = '';
  let ciudad = '';
  let colegio = '';
  let curso = '';
  let generatedIdentity: AnonymousIdentity | null = null;
  let showPreview = false;
  let error = '';

  // Lista de ciudades para el selector
  const ciudades = Object.keys(CIUDADES_COLOMBIA).sort();

  // Grados disponibles
  const grados = ['3', '5', '7', '9', '10', '11'];
  const secciones = ['A', 'B', 'C', 'D', 'E'];

  let gradoSeleccionado = '';
  let seccionSeleccionada = 'A';

  $: curso = gradoSeleccionado ? `${gradoSeleccionado}-${seccionSeleccionada}` : '';

  $: canGenerate = nombre.trim().length >= 2 &&
                   ciudad &&
                   colegio.trim().length >= 2 &&
                   gradoSeleccionado;

  function handleGenerate() {
    if (!canGenerate) {
      error = 'Por favor completa todos los campos';
      return;
    }

    error = '';

    generatedIdentity = generateAnonymousId({
      nombre: nombre.trim(),
      ciudad,
      colegio: colegio.trim(),
      curso
    });

    showPreview = true;
  }

  function handleConfirm() {
    if (!generatedIdentity) return;

    saveLocalIdentity(generatedIdentity);
    onComplete(generatedIdentity);
  }

  function handleEdit() {
    showPreview = false;
    generatedIdentity = null;
  }

  // Verificar si ya existe una identidad
  import { onMount } from 'svelte';

  onMount(() => {
    const stored = getLocalIdentity();
    if (stored) {
      generatedIdentity = stored.identity;
      showPreview = true;
    }
  });
</script>

<div class="w-full max-w-lg mx-auto p-6 animate-fade-in-up">
  {#if !showPreview}
    <!-- Formulario de registro -->
    <div class="space-y-6">
      <div class="text-center mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F5F5DC] mb-2">
          🎭 Crea tu identidad
        </h2>
        <p class="text-sm text-white/60">
          Genera un ID único para aparecer en el ranking sin revelar tus datos
        </p>
      </div>

      <!-- Nombre -->
      <div class="space-y-2">
        <label class="block text-xs uppercase tracking-widest text-white/40">
          Tu primer nombre
        </label>
        <input
          type="text"
          bind:value={nombre}
          placeholder="Ej: Juan"
          maxlength="20"
          class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                 text-[#F5F5DC] placeholder-white/20 focus:border-emerald-500/50
                 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
        />
      </div>

      <!-- Ciudad -->
      <div class="space-y-2">
        <label class="block text-xs uppercase tracking-widest text-white/40">
          Ciudad
        </label>
        <select
          bind:value={ciudad}
          class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                 text-[#F5F5DC] focus:border-emerald-500/50 focus:outline-none
                 focus:ring-1 focus:ring-emerald-500/30 transition-all appearance-none
                 cursor-pointer"
        >
          <option value="" disabled>Selecciona tu ciudad</option>
          {#each ciudades as c}
            <option value={c}>{c}</option>
          {/each}
        </select>
      </div>

      <!-- Colegio -->
      <div class="space-y-2">
        <label class="block text-xs uppercase tracking-widest text-white/40">
          Colegio (nombre corto o iniciales)
        </label>
        <input
          type="text"
          bind:value={colegio}
          placeholder="Ej: San Bartolomé o SB"
          maxlength="30"
          class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                 text-[#F5F5DC] placeholder-white/20 focus:border-emerald-500/50
                 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
        />
      </div>

      <!-- Curso -->
      <div class="space-y-2">
        <label class="block text-xs uppercase tracking-widest text-white/40">
          Grado y sección
        </label>
        <div class="flex gap-3">
          <select
            bind:value={gradoSeleccionado}
            class="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                   text-[#F5F5DC] focus:border-emerald-500/50 focus:outline-none
                   focus:ring-1 focus:ring-emerald-500/30 transition-all appearance-none
                   cursor-pointer"
          >
            <option value="" disabled>Grado</option>
            {#each grados as g}
              <option value={g}>{g}°</option>
            {/each}
          </select>

          <select
            bind:value={seccionSeleccionada}
            class="w-24 px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                   text-[#F5F5DC] focus:border-emerald-500/50 focus:outline-none
                   focus:ring-1 focus:ring-emerald-500/30 transition-all appearance-none
                   cursor-pointer"
          >
            {#each secciones as s}
              <option value={s}>{s}</option>
            {/each}
          </select>
        </div>
      </div>

      {#if error}
        <p class="text-red-400 text-sm text-center">{error}</p>
      {/if}

      <!-- Botones -->
      <div class="flex flex-col gap-3 pt-4">
        <button
          on:click={handleGenerate}
          disabled={!canGenerate}
          class="w-full py-4 bg-emerald-900/30 border border-emerald-500/50
                 text-emerald-400 hover:bg-emerald-500 hover:text-[#121212]
                 disabled:opacity-30 disabled:cursor-not-allowed
                 transition-all duration-300 uppercase tracking-widest text-sm font-bold"
        >
          Generar mi ID anónimo
        </button>

        {#if onSkip}
          <button
            on:click={onSkip}
            class="w-full py-3 text-white/40 hover:text-white/80
                   transition-colors text-xs uppercase tracking-widest"
          >
            Continuar sin guardar puntaje
          </button>
        {/if}
      </div>

      <!-- Info -->
      <div class="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
        <p class="text-xs text-blue-300/80 leading-relaxed">
          <strong>🔒 Tu privacidad es importante:</strong> No guardamos tus datos personales.
          Solo generamos un código único que tú puedes verificar ingresando los mismos datos.
          Recuerda esta información para poder identificarte en el ranking.
        </p>
      </div>
    </div>

  {:else if generatedIdentity}
    <!-- Preview del ID generado -->
    <div class="space-y-6 text-center">
      <div class="mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F5F5DC] mb-2">
          ¡Tu identidad está lista!
        </h2>
        <p class="text-sm text-white/60">
          Este será tu nombre en el ranking
        </p>
      </div>

      <!-- ID Card -->
      <div class="relative p-6 bg-gradient-to-br from-emerald-900/20 to-blue-900/20
                  border border-emerald-500/30 rounded-2xl overflow-hidden">
        <!-- Decorative elements -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500"></div>
        <div class="absolute top-2 right-2 text-4xl opacity-20">{generatedIdentity.emoji}</div>

        <div class="relative z-10 space-y-4">
          <div class="text-6xl mb-4">{generatedIdentity.emoji}</div>

          <h3 class="text-2xl font-bold text-[#F5F5DC]">
            {generatedIdentity.adjetivo} {generatedIdentity.animal}
          </h3>

          <div class="flex items-center justify-center gap-2 text-sm text-white/60">
            <span class="px-2 py-1 bg-white/10 rounded">📍 {generatedIdentity.region}</span>
            <span class="px-2 py-1 bg-white/10 rounded">📚 Grado {generatedIdentity.grade}</span>
          </div>

          <div class="mt-4 p-3 bg-black/30 rounded-lg font-mono text-xs text-emerald-400 break-all">
            {generatedIdentity.id}
          </div>
        </div>
      </div>

      <!-- Botones -->
      <div class="flex flex-col gap-3 pt-4">
        <button
          on:click={handleConfirm}
          class="w-full py-4 bg-emerald-500 text-[#121212]
                 hover:bg-emerald-400 transition-all duration-300
                 uppercase tracking-widest text-sm font-bold"
        >
          ¡Listo! Usar esta identidad
        </button>

        <button
          on:click={handleEdit}
          class="w-full py-3 border border-white/20 text-white/60
                 hover:text-white hover:border-white/40
                 transition-all text-xs uppercase tracking-widest"
        >
          Cambiar datos
        </button>
      </div>

      <!-- Recordatorio -->
      <div class="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p class="text-xs text-yellow-300/80 leading-relaxed">
          <strong>⚠️ Importante:</strong> Recuerda los datos que ingresaste
          (nombre, ciudad, colegio, grado). Los necesitarás si quieres verificar
          que eres tú en el ranking desde otro dispositivo.
        </p>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Custom select arrow */
  select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
  }
</style>
