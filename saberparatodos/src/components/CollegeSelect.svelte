<script>
  import { supabase } from '../lib/supabase';

  export let selectedCollegeId = '';
  export let selectedGrade = '';
  export let selectedSection = '';

  let searchQuery = '';
  let colleges = [];
  let filteredColleges = [];
  let loading = false;
  let showDropdown = false;
  let selectedCollege = null;
  let searchTimeout = null;

  const grades = ['6°', '7°', '8°', '9°', '10°', '11°'];
  const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  async function searchColleges(query) {
    if (query.length < 2) {
      filteredColleges = [];
      return;
    }

    loading = true;
    try {
      const { data, error } = await supabase
        .from('colleges')
        .select('id, cod_dane, name, department, municipality')
        .or(`name.ilike.%${query}%,cod_dane.ilike.%${query}%`)
        .order('name')
        .limit(20);

      if (error) throw error;
      filteredColleges = data || [];
    } catch (err) {
      console.error('Error searching colleges:', err);
      filteredColleges = [];
    } finally {
      loading = false;
    }
  }

  function handleSearchInput(e) {
    const query = e.target.value;
    searchQuery = query;
    selectedCollege = null;
    selectedCollegeId = '';
    
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => searchColleges(query), 300);
  }

  function selectCollege(college) {
    selectedCollege = college;
    selectedCollegeId = college.id;
    searchQuery = `${college.name} (${college.municipality}, ${college.department})`;
    showDropdown = false;
  }

  function handleFocus() {
    showDropdown = true;
    if (colleges.length === 0) {
      searchColleges('');
    }
  }

  function handleBlur() {
    setTimeout(() => {
      showDropdown = false;
    }, 200);
  }

  function clearSelection() {
    selectedCollege = null;
    selectedCollegeId = '';
    searchQuery = '';
    filteredColleges = [];
  }
</script>

<div class="space-y-4">
  <!-- College Search -->
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      🏫 Colegio (opcional)
    </label>
    <div class="relative">
      <input
        type="text"
        value={searchQuery}
        on:input={handleSearchInput}
        on:focus={handleFocus}
        on:blur={handleBlur}
        placeholder="Buscar colegio por nombre o código DANE..."
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      />
      {#if selectedCollegeId}
        <button
          type="button"
          on:click={clearSelection}
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      {/if}
      
      {#if showDropdown && (filteredColleges.length > 0 || loading)}
        <div class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {#if loading}
            <div class="p-3 text-center text-gray-500">
              <span class="inline-block animate-spin mr-2">⏳</span>
              Buscando...
            </div>
          {:else}
            {#each filteredColleges as college}
              <button
                type="button"
                on:click={() => selectCollege(college)}
                class="w-full text-left px-4 py-2 hover:bg-emerald-50 border-b border-gray-100 last:border-0"
              >
                <div class="font-medium text-gray-900">{college.name}</div>
                <div class="text-xs text-gray-500">
                  📍 {college.municipality}, {college.department} • Código: {college.cod_dane}
                </div>
              </button>
            {/each}
          {/if}
        </div>
      {/if}
    </div>
    {#if !selectedCollegeId}
      <p class="text-xs text-gray-500 mt-1">
        Vincula tu colegio para competir con tu institución
      </p>
    {/if}
  </div>

  <!-- Grade and Section (only show if college is selected) -->
  {#if selectedCollegeId}
    <div class="grid grid-cols-2 gap-4 animate-fade-in">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          📚 Grado
        </label>
        <select
          bind:value={selectedGrade}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="">Seleccionar...</option>
          {#each grades as grade}
            <option value={grade}>{grade}</option>
          {/each}
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          👥 Sección
        </label>
        <select
          bind:value={selectedSection}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="">Seleccionar...</option>
          {#each sections as section}
            <option value={section}>{section}</option>
          {/each}
        </select>
      </div>
    </div>
  {/if}
</div>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
</style>
