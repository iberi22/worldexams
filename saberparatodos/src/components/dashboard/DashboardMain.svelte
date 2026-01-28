<script>
  import { onMount } from 'svelte';
  import { institutionalService } from '../../lib/institutional-service';
  import OrgStudents from './OrgStudents.svelte';

  let organizations = [];
  let loading = true;
  let showCreateModal = false;
  let selectedOrgId = null; // Track selected org

  // New Org Form
  let newOrgName = '';
  let newOrgSlug = '';
  let creating = false;

  onMount(async () => {
    try {
      const orgs = await institutionalService.getUserOrganizations();
      organizations = orgs || [];

      // If no orgs, show create modal automatically
      if (organizations.length === 0) {
        showCreateModal = true;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  });

  function toggleOrg(id) {
    if (selectedOrgId === id) selectedOrgId = null;
    else selectedOrgId = id;
  }

  async function handleCreateOrg() {
    try {
      creating = true;
      await institutionalService.createOrganization(newOrgName, newOrgSlug, '');
      showCreateModal = false;
      // Refresh
      organizations = await institutionalService.getUserOrganizations();
    } catch (e) {
      alert('Error creando organización: ' + e.message);
    } finally {
      creating = false;
    }
  }
</script>

<div class="h-full flex flex-col">
  {#if loading}
    <div class="flex-1 flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  {:else}
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-zinc-900 dark:text-white">Mis Organizaciones</h2>
      <button
        on:click={() => showCreateModal = true}
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        + Nueva Organización
      </button>
    </div>

    {#if organizations.length === 0}
      <!-- Empty State (Same as before) -->
      <div class="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
        <div class="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4 text-2xl">🏫</div>
        <h3 class="text-lg font-medium text-zinc-900 dark:text-white">No tienes organizaciones</h3>
        <p class="text-zinc-500 max-w-sm mt-2">Crea una organización para empezar a gestionar tus estudiantes y exámenes.</p>
        <button
          on:click={() => showCreateModal = true}
          class="mt-4 text-blue-600 hover:underline"
        >
          Crear mi primera organización
        </button>
      </div>
    {:else}
      <div class="space-y-6">
        {#each organizations as org}
          <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div class="flex justify-between items-start cursor-pointer" on:click={() => toggleOrg(org.id)}>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {org.name.substring(0,2).toUpperCase()}
                </div>
                <div>
                    <h3 class="text-lg font-bold text-zinc-900 dark:text-white">{org.name}</h3>
                    <p class="text-xs text-zinc-500 font-mono">@{org.slug}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                 <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full font-medium capitalize">
                    {org.plan_tier}
                 </span>
                 <span class="text-zinc-400 text-sm">{selectedOrgId === org.id ? '▲' : '▼'}</span>
              </div>
            </div>

            {#if selectedOrgId === org.id}
                <div class="mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-6 animate-fade-in">
                    <OrgStudents organizationId={org.id} />
                </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  {/if}

  <!-- Create Modal (Same as before) -->
  {#if showCreateModal}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-zinc-900 dark:text-white mb-4">Nueva Organización</h3>
        <form on:submit|preventDefault={handleCreateOrg} class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Nombre de la Institución</label>
            <input
              bind:value={newOrgName}
              class="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
              placeholder="Ej. Colegio San José"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Slug (URL)</label>
            <input
              bind:value={newOrgSlug}
              class="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
              placeholder="colegio-san-jose"
              required
            />
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              on:click={() => showCreateModal = false}
              class="px-4 py-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={creating}
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {creating ? 'Creando...' : 'Crear Organización'}
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>
