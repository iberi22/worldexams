Tarea WX-102 — Parchear contentErrors EL SALVADOR (35) + ARGENTINA (12)

REPO: /home/belal/proyectosSWAL/apps/worldexams (worktree wx/ola1-102, rama wx/ola1-102)
LEE PRIMERO: AGENTS.md raíz (protocolo v5.2). Contexto regional: skills/bundle-creator/rules/SV.md y AR.md si existen.

ISLA (SOLO): questions_data/el-salvador/** y questions_data/argentina/**

PASOS:
1. npm run validate 2>&1 | tee /tmp/wx102-before.txt → filtra errores de SV y AR.
2. Parchea: bundle_index faltante, calibration faltante, dificultad en rango ([D3-D4] etc., nunca [D#] suelto), conteo por grado (G3-G5=8, G6-G7=10, G8-G10=12, G11/3EM=20), feedback en todas las opciones, exactamente una [x].
3. AR: contexto NAP/Aprender, voseo moderado, ARS. SV: sin marca de entidad dentro de preguntas (usa **EJE:** no **ICFES:**).
4. Re-valida: objetivo 0 contentErrors en esas dos carpetas.
5. git add questions_data/el-salvador questions_data/argentina && git commit -m "fix(content-sv-ar): parcheo contentErrors v5.2 (35 SV + 12 AR)"

Reporta antes/después y archivos tocados.
