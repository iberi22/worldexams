Diff de BotPracticeReport guardado. El resto del PR es ruido CRLF en BlogView.
- Cambio aprovechado: answerMap (O(1)) en BotPracticeReport.svelte → aplicado en develop commit "perf: O(N*M)→O(1)"
- NO aprovechado: BlogView.svelte 659 cambios son solo CRLF→LF (ruido de line endings), sin lógica
- LocalReportsView O(1) ya estaba en main vía #907
