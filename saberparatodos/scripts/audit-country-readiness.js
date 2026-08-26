#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const QUESTIONS_ROOT = path.join(ROOT, '..', 'questions_data');
const VALIDATOR = path.join(__dirname, 'validate_content.js');

const args = new Set(process.argv.slice(2));
const outputJson = args.has('--json');
const strict = args.has('--strict');
const smokePublic = args.has('--smoke-public');
const help = args.has('--help') || args.has('-h');

// Soporte para referencias previas: --smoke-public mantiene compat si se solicita
if (help) {
  console.log(`
Uso: node scripts/audit-country-readiness.js [opciones]

Itera países soportados, corre el validador por país con --only y muestra tabla:
  { país, total_archivos, errores, warnings, okPct }

Opciones:
  --json          Salida JSON
  --strict        Exit code 1 si hay errores (por defecto 0)
  --smoke-public  (compat) intenta verificar API pública si está disponible
  --help          Muestra esta ayuda
`);
  process.exit(0);
}

// Mapa canónico país -> carpeta(s) en questions_data
// Se alinea a AGENTS.md Supported Countries y a carpetas reales en repo
const COUNTRIES = [
  { code: 'CO', folder: 'colombia', aliases: [] },
  { code: 'MX', folder: 'mexico', aliases: [] },
  { code: 'AR', folder: 'argentina', aliases: [] },
  { code: 'BR', folder: 'brasil', aliases: [] },
  { code: 'CL', folder: 'chile', aliases: [] },
  { code: 'PE', folder: 'peru', aliases: [] },
  { code: 'EC', folder: 'ecuador', aliases: [] },
  { code: 'PA', folder: 'panama', aliases: [] },
  { code: 'CR', folder: 'costarica', aliases: ['costa-rica'] },
  { code: 'GT', folder: 'guatemala', aliases: [] },
  { code: 'DO', folder: 'dominican_republic', aliases: ['dominican-republic'] },
  { code: 'SV', folder: 'el-salvador', aliases: ['elsalvador'] },
  { code: 'HN', folder: 'honduras', aliases: [] },
  { code: 'NI', folder: 'nicaragua', aliases: [] },
  { code: 'ES', folder: 'spain', aliases: [] },
  { code: 'PR', folder: 'puerto-rico', aliases: [] },
  { code: 'GQ', folder: 'guinea-ecuatorial', aliases: [] },
  { code: 'UY', folder: 'uruguay', aliases: [] },
  { code: 'PY', folder: 'paraguay', aliases: [] },
  { code: 'BO', folder: 'bolivia', aliases: [] },
];

function runValidatorForCountry(country) {
  const candidates = [country.folder, ...(country.aliases || [])];
  const existing = candidates.filter((f) => fs.existsSync(path.join(QUESTIONS_ROOT, f)));
  // Si no existe ninguna carpeta, igualmente intentamos validar — reportará 0 archivos
  const onlyArg = candidates.map((f) => `questions_data/${f}`).join(',');

  const result = spawnSync('node', [VALIDATOR, '--only', onlyArg], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });

  const output = (result.stdout || '') + (result.stderr || '');

  // Parser robusto del reporte del validador
  let total = 0;
  let errores = 0;
  let warnings = 0;

  const mTotal = output.match(/Archivos analizados:\s*(\d+)/i);
  const mErr = output.match(/Errores:\s*(\d+)/i);
  const mWarn = output.match(/Warnings:\s*(\d+)/i);

  if (mTotal) total = Number(mTotal[1]);
  if (mErr) errores = Number(mErr[1]);
  if (mWarn) warnings = Number(mWarn[1]);

  // Fallback: si no hay reporte (validator falló o no encontró archivos), contar ficheros directamente
  if (!mTotal && existing.length > 0) {
    // intentar contar ficheros md existentes bajo esas carpetas
    let count = 0;
    for (const folder of existing) {
      const dir = path.join(QUESTIONS_ROOT, folder);
      const walk = (d) => {
        if (!fs.existsSync(d)) return;
        for (const e of fs.readdirSync(d, { withFileTypes: true })) {
          const full = path.join(d, e.name);
          if (e.isDirectory()) {
            if (e.name.endsWith('.assets')) continue;
            walk(full);
          } else if (e.isFile() && e.name.endsWith('.md') && e.name.toLowerCase() !== 'readme.md') {
            count++;
          }
        }
      };
      walk(dir);
    }
    total = count;
  }

  // Si validador no corrió (ENOENT), marcar como 0
  if (result.error) {
    console.error(`⚠️  Error al ejecutar validador para ${country.code}: ${result.error.message}`);
  }

  const okPct = total > 0 ? ((total - errores) / total) * 100 : 0;

  return {
    pais: country.code,
    folder: country.folder,
    total_archivos: total,
    errores,
    warnings,
    okPct: Number(okPct.toFixed(1)),
    rawOutput: output,
  };
}

function renderTable(rows) {
  const headers = ['País', 'Total', 'Errores', 'Warnings', 'OkPct', 'Carpeta'];
  const data = rows.map((r) => [
    r.pais,
    String(r.total_archivos),
    String(r.errores),
    String(r.warnings),
    `${r.okPct.toFixed(1)}%`,
    r.folder,
  ]);
  const widths = headers.map((h, i) => Math.max(h.length, ...data.map((row) => row[i].length)));
  const format = (line) => line.map((v, i) => v.padEnd(widths[i])).join('  ');
  const sep = widths.map((w) => '-'.repeat(w)).join('  ');
  return [format(headers), sep, ...data.map(format)].join('\n');
}

async function main() {
  const rows = [];
  for (const country of COUNTRIES) {
    const stats = runValidatorForCountry(country);
    rows.push(stats);
  }

  const totalArchivos = rows.reduce((s, r) => s + r.total_archivos, 0);
  const totalErrores = rows.reduce((s, r) => s + r.errores, 0);
  const totalWarnings = rows.reduce((s, r) => s + r.warnings, 0);
  const globalOkPct = totalArchivos > 0 ? ((totalArchivos - totalErrores) / totalArchivos) * 100 : 0;

  if (outputJson) {
    const payload = {
      generated_at: new Date().toISOString(),
      validator: 'scripts/validate_content.js --only',
      summary: {
        total_archivos: totalArchivos,
        total_errores: totalErrores,
        total_warnings: totalWarnings,
        okPct: Number(globalOkPct.toFixed(1)),
      },
      paises: rows.map(({ pais, folder, total_archivos, errores, warnings, okPct }) => ({
        pais,
        folder,
        total_archivos,
        errores,
        warnings,
        okPct,
      })),
    };
    console.log(JSON.stringify(payload, null, 2));
  } else {
    console.log('\n📊 Country Readiness — Audit por país (validador con --only)');
    console.log(`Generado: ${new Date().toISOString()}`);
    console.log(`Validador: node scripts/validate_content.js --only questions_data/<pais>`);
    console.log('');
    console.log(renderTable(rows));
    console.log('');
    console.log(`Total archivos: ${totalArchivos} | Errores: ${totalErrores} | Warnings: ${totalWarnings} | OkPct global: ${globalOkPct.toFixed(1)}%`);
    console.log('');
    console.log('OkPct = % de archivos sin errores (warnings no bloquean). Exit 0 salvo --strict.');
    if (smokePublic) {
      console.log('(Nota: --smoke-public solicitado — validación de packs/API no incluida en esta versión simplificada. Use herramienta de packs si requiere verificación de publicación.)');
    }
  }

  if (strict && totalErrores > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
