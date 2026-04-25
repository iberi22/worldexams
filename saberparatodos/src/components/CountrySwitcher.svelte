<script lang="ts">
  import { onMount } from 'svelte';
  import { allCountries, type CountryCode } from '../config/countries.config';

  export let currentCountryCode: CountryCode;
  
  let isOpen = false;
  
  function toggle() {
    isOpen = !isOpen;
  }
  
  function selectCountry(code: CountryCode) {
    // Save to cookie and reload
    document.cookie = `spt_country=${code}; path=/; max-age=31536000`; // 1 year
    window.location.reload();
  }
  
  function close(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('.country-switcher')) {
      isOpen = false;
    }
  }
  
  onMount(() => {
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  });
</script>

<div class="country-switcher relative inline-block text-left">
  <div>
    <button 
      type="button" 
      class="inline-flex justify-center w-full rounded-md border border-[rgba(255,255,255,0.1)] px-4 py-2 bg-[rgba(255,255,255,0.05)] text-sm font-medium text-white hover:bg-[rgba(255,255,255,0.1)] focus:outline-none transition-colors"
      on:click={toggle}
    >
      <span class="mr-2">{allCountries.find(c => c.code === currentCountryCode)?.flag || '🌍'}</span>
      {allCountries.find(c => c.code === currentCountryCode)?.name || 'País'}
      <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>

  {#if isOpen}
    <div class="origin-bottom-right absolute right-0 bottom-full mb-2 mt-2 w-56 rounded-md shadow-lg bg-[#1a1a2e] ring-1 ring-black ring-opacity-5 divide-y divide-[rgba(255,255,255,0.1)] focus:outline-none z-50">
      <div class="py-1">
        {#each allCountries as country}
          <button 
            type="button"
            class="group w-full flex items-center px-4 py-2 text-sm text-[rgba(245,245,220,0.8)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors text-left"
            class:bg-[rgba(255,255,255,0.05)]={currentCountryCode === country.code}
            on:click={() => selectCountry(country.code)}
          >
            <span class="mr-3">{country.flag}</span>
            {country.name}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
