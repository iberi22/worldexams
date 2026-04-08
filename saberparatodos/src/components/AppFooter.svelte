<script lang="ts">
  import { countryConfig } from '../config';
  import { getSiteShellContent } from '../config/site-shell-content';

  const currentYear = new Date().getFullYear();
  const shellContent = getSiteShellContent(countryConfig);
</script>

<footer class="w-full border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm mt-auto">
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="space-y-4 md:col-span-2">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center">
            <span class="text-emerald-500 font-bold text-lg">WE</span>
          </div>
          <div>
            <h3 class="font-bold text-lg text-[#F5F5DC]">{countryConfig.product.siteName}</h3>
            <p class="text-xs text-white/40">{countryConfig.flag} {countryConfig.name}</p>
          </div>
        </div>
        <p class="text-sm text-white/50 max-w-sm leading-relaxed">{shellContent.footerDescription}</p>
      </div>

      <div class="space-y-4">
        <h4 class="text-xs font-bold uppercase tracking-widest text-white/60">Recursos</h4>
        <ul class="space-y-2">
          <li><a href="/" class="text-sm text-white/40 hover:text-emerald-500 transition-colors">Inicio</a></li>
          <li><a href="/guia-examen" class="text-sm text-white/40 hover:text-emerald-500 transition-colors">Guia {countryConfig.product.guideLabel}</a></li>
          <li><a href="/manual-plataforma" class="text-sm text-white/40 hover:text-emerald-500 transition-colors">Manual de uso</a></li>
          <li><a href="/sobre-nosotros" class="text-sm text-white/40 hover:text-emerald-500 transition-colors">Sobre nosotros</a></li>
          <li><a href="/contacto" class="text-sm text-white/40 hover:text-emerald-500 transition-colors">Contacto</a></li>
        </ul>
      </div>

      <div class="space-y-4">
        <h4 class="text-xs font-bold uppercase tracking-widest text-white/60">Comunidad</h4>
        <div class="flex gap-3">
          <a
            href="https://github.com/world-exams"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
            aria-label="GitHub"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

  <div class="max-w-6xl mx-auto px-4 py-4">
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
      <p>
        © {currentYear} {countryConfig.product.siteName}. Proyecto de
        <a href="https://github.com/world-exams" target="_blank" rel="noopener noreferrer" class="text-white/60 hover:text-emerald-500 transition-colors">
          World Exams Organization
        </a>
      </p>
      <p class="text-center md:text-right">{shellContent.footerDisclaimer}</p>
    </div>
  </div>

  <div class="w-full h-1 flex">
    <div class="flex-[2]" style={`background-color: ${countryConfig.theme.primary};`}></div>
    <div class="flex-1" style={`background-color: ${countryConfig.theme.secondary};`}></div>
    <div class="flex-1" style={`background-color: ${countryConfig.theme.accent};`}></div>
  </div>
</footer>

<style>
  footer {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
</style>
