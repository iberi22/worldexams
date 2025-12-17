<!--
  Cookie Consent Banner (CMP - Consent Management Platform)
  Required for Google AdSense GDPR compliance
  Shows on first visit, stores consent in localStorage
-->
<script>
  import { onMount } from 'svelte';

  let showBanner = $state(false);
  let isLoading = $state(true);

  onMount(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('cookie-consent');

    if (!hasConsent) {
      // Delay banner display to not interfere with page load
      setTimeout(() => {
        showBanner = true;
        isLoading = false;
      }, 1000);
    } else {
      isLoading = false;
      // Load AdSense if consent was given
      if (hasConsent === 'accepted') {
        loadAdSense();
      }
    }
  });

  function acceptCookies() {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    showBanner = false;
    loadAdSense();
  }

  function rejectCookies() {
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    showBanner = false;
    // Don't load AdSense
  }

  function loadAdSense() {
    // AdSense script already in Layout.astro, just trigger display
    if (window.adsbygoogle && window.adsbygoogle.loaded) {
      console.log('✅ AdSense loaded after consent');
    }
  }
</script>

{#if showBanner && !isLoading}
  <div
    class="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800
           border-t-2 border-yellow-400 shadow-2xl animate-slide-up"
    role="dialog"
    aria-labelledby="consent-title"
    aria-describedby="consent-description"
  >
    <div class="container mx-auto px-4 py-6 md:py-4">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <!-- Content -->
        <div class="flex-1">
          <h2 id="consent-title" class="text-white font-bold text-lg mb-2">
            🍪 Usamos cookies
          </h2>
          <p id="consent-description" class="text-gray-300 text-sm leading-relaxed">
            Usamos cookies y tecnologías similares para personalizar contenido y anuncios,
            ofrecer funciones de redes sociales y analizar el tráfico.
            Al hacer clic en "Aceptar", aceptas el uso de cookies según nuestra
            <a href="/privacy" class="text-yellow-400 hover:text-yellow-300 underline font-medium">
              Política de Privacidad
            </a>.
          </p>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 w-full md:w-auto">
          <button
            onclick={rejectCookies}
            class="flex-1 md:flex-none px-6 py-2 bg-gray-700 hover:bg-gray-600
                   text-white rounded-lg font-medium transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Rechazar cookies"
          >
            Rechazar
          </button>
          <button
            onclick={acceptCookies}
            class="flex-1 md:flex-none px-6 py-2 bg-yellow-400 hover:bg-yellow-300
                   text-gray-900 rounded-lg font-bold transition-all duration-200
                   shadow-lg hover:shadow-yellow-400/50
                   focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Aceptar cookies"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes slide-up {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-slide-up {
    animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
</style>
