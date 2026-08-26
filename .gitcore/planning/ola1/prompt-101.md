Tarea WX-101 — Parchear contentErrors de COLOMBIA (questions_data/colombia/**)

REPO: /home/belal/proyectosSWAL/apps/worldexams (estás en un worktree dedicado, rama wx/ola1-101)
LEE PRIMERO: AGENTS.md de la raíz del repo (protocolo bundles v5.2 obligatorio).

ALCANCE (SOLO esta isla):
- questions_data/colombia/** — nada más.

QUÉ HACER:
1. Corre: npm run validate 2>&1 | tee /tmp/wx101-validate-before.txt
2. Identifica TODOS los contentErrors de archivos bajo questions_data/colombia/.
   Errores típicos según decisión D1 (alineación validador↔AGENTS.md):
   - falta bundle_index en frontmatter (obligatorio v5.2)
   - falta calibration: {difficulty_band: "D3-D4", expected_success: X}
   - dificultad suelta [D3] en vez de rango [D3-D4]/[D5-D6]/[D7-D8]/[D9-D10]
   - conteo de preguntas incorrecto según grado (G3-G5=8, G6-G7=10, G8-G10=12, G11=20)
   - opciones sin feedback, más de una [x], "todas las anteriores"
3. Parchea cada archivo respetando el formato EXACTO de AGENTS.md (frontmatter, Question N [rango], Enunciado/Opciones/Explicacion Pedagogica).
4. NO cambies contenido pedagógico salvo para corregir errores de formato/cantidad. No inventes datos científicos/históricos nuevos.
5. Corre de nuevo: npm run validate 2>&1 | tee /tmp/wx101-validate-after.txt
   Objetivo: 0 contentErrors en colombia/** (okPct ≥95).

CIERRE:
- git add questions_data/colombia && git commit -m "fix(content-co): parcheo masivo contentErrors v5.2 (bundle_index, calibration, rangos dificultad, conteos)"
- Reporta: errores antes/después, archivos tocados, okPct final.
