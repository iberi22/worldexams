<script>
  import { institutionalService } from '../../lib/institutional-service';
  export let organizationId;

  let members = [];
  let loading = true;
  let showInviteModal = false;
  let newMemberEmail = '';
  let inviting = false;

  $: if (organizationId) loadMembers();

  async function loadMembers() {
    loading = true;
    try {
      members = await institutionalService.getOrganizationMembers(organizationId);
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  }

  async function handleInvite() {
    inviting = true;
    try {
      await institutionalService.inviteMember(organizationId, newMemberEmail, 'member');
      alert('Invitación enviada (Simulación)');
      showInviteModal = false;
      newMemberEmail = '';
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      inviting = false;
    }
  }
</script>

<div class="mt-8">
  <div class="flex justify-between items-center mb-4">
    <h3 class="text-lg font-bold text-zinc-900 dark:text-white">Estudiantes y Miembros</h3>
    <button
      on:click={() => showInviteModal = true}
      class="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700"
    >
      + Invitar
    </button>
  </div>

  {#if loading}
    <div class="animate-pulse space-y-2">
      <div class="h-10 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
      <div class="h-10 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
    </div>
  {:else if members.length === 0}
    <div class="text-zinc-500 text-sm">No hay miembros en esta organización.</div>
  {:else}
    <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
      <table class="w-full text-sm text-left">
        <thead class="bg-zinc-50 dark:bg-zinc-800 text-zinc-500 uppercase font-medium text-xs">
          <tr>
            <th class="px-4 py-3">Usuario (ID)</th>
            <th class="px-4 py-3">Rol</th>
            <th class="px-4 py-3">Estado</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">
          {#each members as member}
            <tr>
              <td class="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300">{member.user_id.substring(0,8)}...</td>
              <td class="px-4 py-3">
                <span class="px-2 py-0.5 rounded text-xs font-bold
                  {member.role === 'owner' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}">
                  {member.role}
                </span>
              </td>
              <td class="px-4 py-3 text-green-600 text-xs">Activo</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  <!-- Invite Modal -->
  {#if showInviteModal}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-zinc-900 rounded-xl shadow-xl max-w-sm w-full p-6">
        <h3 class="font-bold text-zinc-900 dark:text-white mb-4">Invitar Estudiante</h3>
        <form on:submit|preventDefault={handleInvite} class="space-y-4">
          <input
            type="email"
            bind:value={newMemberEmail}
            placeholder="correo@estudiante.com"
            class="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
            required
          />
          <div class="flex justify-end gap-2">
            <button type="button" on:click={() => showInviteModal = false} class="px-3 py-1.5 text-zinc-500">Cancelar</button>
            <button type="submit" disabled={inviting} class="px-3 py-1.5 bg-blue-600 text-white rounded-lg">
              {inviting ? 'Enviando...' : 'Enviar Invitación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>
