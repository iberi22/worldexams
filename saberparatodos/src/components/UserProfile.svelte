<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchUserProfile, saveUserProfile, deleteUserProfile, type UserProfile } from '../lib/user-profile';

  let profile = $state<UserProfile>({
    display_name: '',
    avatar_url: '',
    institution: '',
    subjects_interest: [],
    country: 'CO'
  });

  let selectedSubjects = $state<string[]>([]);
  let customAvatarUrl = $state('');
  let selectedPresetAvatar = $state('');
  let isAuth = $state(false);
  let isLoading = $state(true);
  let isSaving = $state(false);
  let message = $state<{ text: string; type: 'success' | 'error' } | null>(null);

  const PRESET_AVATARS = [
    { name: 'Bot', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=WorldExams1' },
    { name: 'Astro', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=AstroTutor' },
    { name: 'Owl', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=WiseOwl' },
    { name: 'Scholar', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=ScholarPro' }
  ];

  const AVAILABLE_SUBJECTS = [
    { id: 'matematicas', label: 'Matemáticas' },
    { id: 'lectura-critica', label: 'Lectura Crítica / Lengua' },
    { id: 'ciencias-naturales', label: 'Ciencias Naturales (Biología/Física/Química)' },
    { id: 'sociales', label: 'Sociales y Ciudadanas' },
    { id: 'ingles', label: 'Inglés' }
  ];

  const COUNTRIES = [
    { code: 'CO', name: 'Colombia 🇨🇴' },
    { code: 'CL', name: 'Chile 🇨🇱' },
    { code: 'ES', name: 'España 🇪🇸' },
    { code: 'MX', name: 'México 🇲🇽' },
    { code: 'PY', name: 'Paraguay 🇵🇾' },
    { code: 'PR', name: 'Puerto Rico 🇵🇷' },
    { code: 'UY', name: 'Uruguay 🇺🇾' }
  ];

  onMount(async () => {
    const res = await fetchUserProfile();
    isAuth = res.isAuth;

    if (res.profile) {
      profile = {
        ...res.profile,
        country: res.profile.country || 'CO'
      };
      selectedSubjects = res.profile.subjects_interest || [];
      customAvatarUrl = res.profile.avatar_url || '';
      if (PRESET_AVATARS.some(a => a.url === res.profile?.avatar_url)) {
        selectedPresetAvatar = res.profile.avatar_url || '';
      }
    }
    isLoading = false;
  });

  function toggleSubject(subjectId: string) {
    if (selectedSubjects.includes(subjectId)) {
      selectedSubjects = selectedSubjects.filter(id => id !== subjectId);
    } else {
      selectedSubjects = [...selectedSubjects, subjectId];
    }
  }

  function selectPresetAvatar(url: string) {
    selectedPresetAvatar = url;
    customAvatarUrl = url;
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    isSaving = true;
    message = null;

    const payload: Partial<UserProfile> = {
      display_name: profile.display_name?.trim() || null,
      avatar_url: customAvatarUrl.trim() || null,
      institution: profile.institution?.trim() || null,
      subjects_interest: selectedSubjects,
      country: profile.country || 'CO'
    };

    const res = await saveUserProfile(payload);
    isSaving = false;

    if (res.success) {
      message = { text: '¡Perfil guardado exitosamente!', type: 'success' };
      if (res.profile) {
        profile = res.profile;
      }
    } else {
      message = { text: res.error || 'Ocurrió un error al guardar el perfil.', type: 'error' };
    }

    setTimeout(() => {
      message = null;
    }, 4000);
  }

  async function handleReset() {
    if (!confirm('¿Deseas limpiar todos los campos opcionales del perfil?')) return;

    isSaving = true;
    const res = await deleteUserProfile();
    isSaving = false;

    if (res.success) {
      profile = {
        display_name: '',
        avatar_url: '',
        institution: '',
        subjects_interest: [],
        country: 'CO'
      };
      selectedSubjects = [];
      customAvatarUrl = '';
      selectedPresetAvatar = '';
      message = { text: 'Perfil limpiado correctamente.', type: 'success' };
    } else {
      message = { text: res.error || 'Error al restablecer perfil.', type: 'error' };
    }

    setTimeout(() => {
      message = null;
    }, 4000);
  }
</script>

<div class="max-w-2xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl text-zinc-100">
  <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
    <div>
      <h2 class="text-xl font-bold flex items-center gap-2 text-white">
        <span>👤</span> Perfil de Usuario
      </h2>
      <p class="text-xs text-zinc-400 mt-1">
        El perfil es <strong class="text-emerald-400">totalmente opcional</strong>. Puedes realizar tus simulacros y prácticas libremente sin completar esta información.
      </p>
    </div>
    <div class="text-xs px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-300 self-start sm:self-auto">
      {isAuth ? '🟢 Usuario Autenticado' : '🟡 Modo Local / Anon'}
    </div>
  </div>

  {#if isLoading}
    <div class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
    </div>
  {:else}
    {#if message}
      <div
        class={`p-4 rounded-xl text-xs font-semibold mb-6 flex items-center gap-2 border ${
          message.type === 'success'
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
            : 'bg-red-950/40 border-red-500/40 text-red-300'
        }`}
      >
        <span>{message.type === 'success' ? '✅' : '⚠️'}</span>
        <span>{message.text}</span>
      </div>
    {/if}

    <form onsubmit={handleSubmit} class="space-y-6">
      <!-- Avatar Section -->
      <div class="space-y-3">
        <label class="block text-xs font-bold uppercase tracking-wider text-zinc-400">
          Avatar (Opcional)
        </label>

        <div class="flex items-center gap-4 mb-3">
          {#if customAvatarUrl}
            <img
              src={customAvatarUrl}
              alt="Avatar seleccionado"
              class="w-16 h-16 rounded-full border-2 border-emerald-500 bg-zinc-800 object-cover"
              onerror={(e) => (e.currentTarget as HTMLImageElement).src = PRESET_AVATARS[0].url}
            />
          {:else}
            <div class="w-16 h-16 rounded-full border-2 border-dashed border-zinc-700 bg-zinc-800 flex items-center justify-center text-zinc-500 text-xl font-bold">
              ?
            </div>
          {/if}

          <div class="space-y-2 flex-1">
            <span class="text-xs text-zinc-400 block">Elige un avatar prediseñado:</span>
            <div class="flex flex-wrap gap-2">
              {#each PRESET_AVATARS as avatar}
                <button
                  type="button"
                  onclick={() => selectPresetAvatar(avatar.url)}
                  class={`p-1 rounded-lg border transition-all ${
                    selectedPresetAvatar === avatar.url
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-zinc-800 hover:border-zinc-700 bg-zinc-800/50'
                  }`}
                  title={avatar.name}
                  aria-label={`Seleccionar avatar ${avatar.name}`}
                >
                  <img src={avatar.url} alt={avatar.name} class="w-8 h-8 rounded-full" />
                </button>
              {/each}
            </div>
          </div>
        </div>

        <div>
          <input
            type="url"
            bind:value={customAvatarUrl}
            placeholder="https://ejemplo.com/mi-avatar.png (URL Personalizada)"
            class="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
      </div>

      <!-- Display Name -->
      <div class="space-y-2">
        <label for="display_name" class="block text-xs font-bold uppercase tracking-wider text-zinc-400">
          Nombre de Mostrar (Display Name)
        </label>
        <input
          id="display_name"
          type="text"
          bind:value={profile.display_name}
          placeholder="Ej: Sofia_Estudiante2026"
          class="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
        />
      </div>

      <!-- Institution -->
      <div class="space-y-2">
        <label for="institution" class="block text-xs font-bold uppercase tracking-wider text-zinc-400">
          Institución / Colegio (Opcional)
        </label>
        <input
          id="institution"
          type="text"
          bind:value={profile.institution}
          placeholder="Ej: Instituto San Martín"
          class="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
        />
      </div>

      <!-- Country -->
      <div class="space-y-2">
        <label for="country" class="block text-xs font-bold uppercase tracking-wider text-zinc-400">
          País
        </label>
        <select
          id="country"
          bind:value={profile.country}
          class="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
        >
          {#each COUNTRIES as c}
            <option value={c.code}>{c.name}</option>
          {/each}
        </select>
      </div>

      <!-- Subjects of Interest -->
      <div class="space-y-3">
        <label class="block text-xs font-bold uppercase tracking-wider text-zinc-400">
          Áreas de Interés
        </label>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {#each AVAILABLE_SUBJECTS as subject}
            <button
              type="button"
              onclick={() => toggleSubject(subject.id)}
              class={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition-all flex items-center justify-between ${
                selectedSubjects.includes(subject.id)
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <span>{subject.label}</span>
              {#if selectedSubjects.includes(subject.id)}
                <span>✓</span>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <!-- Actions -->
      <div class="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onclick={handleReset}
          disabled={isSaving}
          class="w-full sm:w-auto px-4 py-2.5 text-xs text-zinc-400 hover:text-red-400 hover:bg-red-950/30 rounded-xl transition-colors disabled:opacity-50"
        >
          Limpiar Datos Opcionales
        </button>

        <button
          type="submit"
          disabled={isSaving}
          class="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {#if isSaving}
            <div class="w-3.5 h-3.5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin"></div>
            <span>Guardando...</span>
          {:else}
            <span>Guardar Perfil</span>
          {/if}
        </button>
      </div>
    </form>
  {/if}
</div>
