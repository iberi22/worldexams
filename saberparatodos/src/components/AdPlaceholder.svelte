<script>
  export let className = "";
  export let format = "horizontal"; // horizontal | vertical | square
</script>

<div class={`
  relative overflow-hidden border border-white/5 bg-[#1E1E1E]/20
  flex flex-col items-center justify-center text-center p-4
  ${format === 'horizontal' ? 'w-full h-24' : ''}
  ${format === 'vertical' ? 'w-64 h-full min-h-[400px]' : ''}
  ${format === 'square' ? 'w-64 h-64' : ''}
  ${className}
`}>
  <!-- Pattern Background -->
  <div class="absolute inset-0 opacity-10"
    style="background-image: radial-gradient(#34D399 1px, transparent 1px); background-size: 20px 20px;">
  </div>

  <div class="relative z-10 space-y-2">
    <span class="text-xs font-bold uppercase tracking-[0.3em] text-white/20 border border-white/10 px-2 py-1">
      Espacio Publicitario
    </span>
    <p class="text-[10px] uppercase tracking-widest opacity-40">
      Apoya a OpenIcfes
    </p>
  </div>
</div>
