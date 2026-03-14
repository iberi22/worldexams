with open('src/components/App.svelte', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix header
text = text.replace('<!-- Global Header -->\n  <header class="fixed top-0 left-0 right-0 z-50 border-b border-white/5">', '<!-- Global Header -->\n  {#if currentView !== AppView.EXAM && currentView !== AppView.REVIEW}\n  <header class="fixed top-0 left-0 right-0 z-50 border-b border-white/5">')
text = text.replace('<!-- Global Header -->\r\n  <header class="fixed top-0 left-0 right-0 z-50 border-b border-white/5">', '<!-- Global Header -->\r\n  {#if currentView !== AppView.EXAM && currentView !== AppView.REVIEW}\r\n  <header class="fixed top-0 left-0 right-0 z-50 border-b border-white/5">')

btn = """        {:else}
          <button
            onclick={() => setView(AppView.LOGIN)}
            class="px-3 py-1.5 text-xs uppercase tracking-widest border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 transition-colors rounded"
          >
            Ingresar
          </button>
        {/if}"""

replacement = """        {:else}
          <button
            disabled
            class="px-3 py-1.5 text-xs uppercase tracking-widest border border-emerald-500/50 text-emerald-500 opacity-50 cursor-not-allowed rounded"
          >
            Pronto
          </button>
        {/if}"""

text = text.replace(btn, replacement).replace(btn.replace('\n', '\r\n'), replacement.replace('\n', '\r\n'))

with open('src/components/App.svelte', 'w', encoding='utf-8') as f:
    f.write(text)
print("Done fixing App.svelte")
