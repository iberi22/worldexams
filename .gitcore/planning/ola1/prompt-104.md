Tarea WX-104 — Validador alineado a D1 + flag subset + recrear audit:country-readiness

REPO: /home/belal/proyectosSWAL/apps/worldexams (worktree wx/ola1-104, rama wx/ola1-104)
LEE PRIMERO: AGENTS.md raíz.

DECISIÓN D1: el validador se ALINEA con AGENTS.md → conteos válidos: G3-G5=8q, G6-G7=10q, G8-G10=12q, G11/3EM Brasil=20q. bundle_index y calibration obligatorios; dificultad SIEMPRE en rango [D3-D4]|[D5-D6]|[D7-D8]|[D9-D10]; warning si [D#] suelto.

ISLA (SOLO): saberparatodos/scripts/** y saberparatodos/package.json

PASOS:
1. Localiza el validador (scripts/validate*.js o similar referenciado en package.json "validate").
2. Aplica D1: aceptar los conteos de arriba como VÁLIDOS (no error); marcar warning (no error) calibration faltante SOLO si AGENTS.md lo marca warning (bundle_index es ERROR, calibration es WARNING — respeta esa semántica); dificultad en rango requerida.
3. Añade flag robusto de subset: --only <ruta|prefijo> (acepta múltiples valores y globs simples) para validar subconjuntos (ej. --only questions_data/colombia).
4. RECREA script audit:country-readiness (no existe hoy pero docs/skills lo referencian): itera países, corre el validador por país con --only, imprime tabla {país, total_archivos, errores, warnings, okPct} y exit code 0 salvo --strict.
5. Registra en package.json: "audit:country-readiness": "node scripts/audit-country-readiness.js".
6. Verifica: npm run validate (sin regresiones), npm run audit:country-readiness (tabla completa), y prueba --only con colombia.
7. git add saberparatodos/scripts saberparatodos/package.json && git commit -m "feat(validator): alineación D1 conteos+rangos, flag --only subset, recrea audit:country-readiness"

NO toques questions_data/** (otra isla lo hace).
