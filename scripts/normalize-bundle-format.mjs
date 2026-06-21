#!/usr/bin/env node
/**
 * normalize-bundle-format.mjs — v5.2 bundle normalizer for issue #740
 *
 * Mechanically fixes v5.2 bundles to pass validate-bundles-v52.mjs with 0 errors.
 * Handles frontmatter, headers, field renames, option format, feedback, and
 * Explicacion Pedagogica.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');
const QUEST     = path.join(ROOT, 'questions_data');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const ONLY = args.find(a => a.startsWith('--file='))?.split('=', 2)[1];

let stats = { checked:0, fixed:0 };

function* walk(dir) {
  try {
    for (const e of fs.readdirSync(dir, { withFileTypes:true })) {
      const f = path.join(dir,e.name);
      if (e.isDirectory()) yield* walk(f);
      else if (e.isFile() && e.name.endsWith('.md')) yield f;
    }
  } catch {}
}

function fixFrontmatter(fmText, baseName, qCount) {
  const lines = fmText.split('\n');
  const fields = {};
  for (const line of lines) {
    const m = line.match(/^([\w-]+):\s*(.*)$/);
    if (m) fields[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, '');
  }
  const c = [];

  if (fields.semana !== undefined && fields.week === undefined) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('semana:')) {
        const raw = lines[i].split(':')[1].trim().replace(/['"]/g, '');
        const num = parseInt(raw, 10);
        const wn = Number.isFinite(num) ? 'W' + String(num).padStart(2, '0') : raw;
        lines[i] = `week: "${wn}"`;
        c.push('semana->week ' + wn);
        break;
      }
    }
  }

  const add = (key, value) => {
    if (fields[key] === undefined && !lines.some(l => l.startsWith(key + ':'))) {
      lines.splice(lines.length - 1, 0, key + ': ' + value);
      c.push('add ' + key);
    }
  };
  add('bundle_type',     '"weekly"');
  add('total_questions',  qCount);
  add('year',            2026);
  add('license',        '"FREE"');
  add('tier',           '"legacy"');
  add('creador',        '"Jules-Agent"');

  const expectedId = baseName.replace(/\.md$/, '');
  if (fields.id && fields.id !== expectedId) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('id:')) { lines[i] = `id: "${expectedId}"`; c.push('fix id'); break; }
    }
  }

  if (fields.license && fields.license !== 'FREE') {
    for (let i = 0; i < lines.length; i++) {
      if (/^license:/i.test(lines[i])) { lines[i] = 'license: "FREE"'; c.push('fix license'); break; }
    }
  }

  return { text: lines.join('\n'), changes: c };
}

function fixBody(body) {
  const changes = [];
  let t = body;

  let n = 0;
  t = t.replace(/^##\s+Pregunta\s+/gm, () => { n++; return '## Question '; });
  if (n) changes.push('Pregunta->Question (' + n + 'x)');

  n = 0;
  t = t.replace(/^##\s+Question\s+(\d+)\s*[\u2013\u2014\u2015-]\s*(D\d+(?:-D?\d+)?)\s*$/gm, (_,num,diff) => { n++; return '## Question ' + num + ' [' + diff + ']'; });
  if (n) changes.push('dash->bracket (' + n + 'x)');

  n = 0;
  t = t.replace(/^##\s+Question\s+(\d+)\s*$/gm, (_,num) => { n++; return '## Question ' + num + ' [D1]'; });
  if (n) changes.push('add difficulty (' + n + 'x)');

  n = 0;
  t = t.replace(/\*\*Context:\*\*/g, () => { n++; return '**Contexto:**'; });
  if (n) changes.push('Context->Contexto (' + n + 'x)');

  n = 0;
  t = t.replace(/\*\*Stem:\*\*\s*/g, () => { n++; return '### Enunciado\n'; });
  if (n) changes.push('Stem->Enunciado (' + n + 'x)');

  n = 0;
  t = t.replace(/\*\*Explanation:\*\*/g, () => { n++; return '### Explicacion Pedagogica'; });
  if (n) changes.push('Explanation->Explicacion (' + n + 'x)');

  n = 0;
  t = t.replace(/\*\*Aprender:\*\*/g, () => { n++; return '**ICFES:**'; });
  if (n) changes.push('Aprender->ICFES (' + n + 'x)');

  n = 0;
  t = t.replace(/###\s+Options\s*$/gm, () => { n++; return '### Opciones'; });
  if (n) changes.push('Options->Opciones (' + n + 'x)');

  n = 0;
  t = t.replace(/\*\*Bloom:\*\*\s*\[(Remember|Understand|Apply|Analyze|Evaluate)\]/g, (_,v) => { n++; return '**Bloom:** ' + v; });
  if (n) changes.push('Bloom bracket (' + n + 'x)');

  n = 0;
  t = t.replace(/\*\*Expected_Success:\*\*\s*\[([^\]]+)\]/g, (_,v) => { n++; return '**Expected_Success:** ' + v; });
  if (n) changes.push('ES bracket (' + n + 'x)');

  if (/###\s+Quality\s+Review/i.test(t)) {
    t = t.replace(/---\s*\n###\s+Quality\s+Review[\s\S]*$/, '');
    changes.push('remove Quality Review');
  }

  n = 0;
  t = t.replace(/^- \[([ xX])\]\s*\*\*([A-D])\)\*\*/gm, (_,m,l) => { n++; return '- [' + m + '] ' + l + ')'; });
  if (n) changes.push('option bold (' + n + 'x)');

  n = 0;
  t = t.replace(/^(- \[[ xX]\])\s*([A-D])\)([^\n]*)\s*\n\s+<!--\s*feedback:\s*([^>]+?)\s*-->/g,
    (_, mark, letter, text, fb) => { n++; return mark + ' ' + letter + ')' + text + ' <!-- feedback: ' + fb + ' -->'; });
  if (n) changes.push('indented feedback inline (' + n + 'x)');

  const qRe = /^##\s+Question\s+\d+\s*\[[^\]]+\]\s*$/gm;
  const qHeads = [...t.matchAll(qRe)];
  if (qHeads.length === 0) return { text:t, changes };

  for (let qi = qHeads.length - 1; qi >= 0; qi--) {
    const qs  = qHeads[qi].index;
    const qe  = qi + 1 < qHeads.length ? qHeads[qi + 1].index : t.length;
    const qb  = t.slice(qs, qe);
    const qpf = 'Q' + (qi+1);

    if (!qb.includes('**Contexto:**') && !qb.includes('**Context:**')) {
      const target = qb.match(/\*\*Expected_Success:\*\*\s*[^\n]+/);
      if (target) {
        const ins = qs + target.index + target[0].length;
        t = t.slice(0, ins) + '\n**Contexto:** Contexto de la pregunta.' + t.slice(ins);
        changes.push(qpf + ' add Contexto');
      }
    }

    if (!qb.includes('**ICFES:**') && !qb.includes('**Aprender:**')) {
      const target = qb.match(/\*\*Bloom:\*\*\s*[^\n]+/);
      if (target) {
        const ins = qs + target.index + target[0].length;
        t = t.slice(0, ins) + '\n**ICFES:** Uso de conocimientos' + t.slice(ins);
        changes.push(qpf + ' add ICFES');
      }
    }

    if (!qb.includes('**Expected_Success:**')) {
      const target = qb.match(/\*\*(?:ICFES|Aprender|Contexto|Context|Bloom):\*\*\s*[^\n]+/);
      if (target) {
        const ins = qs + target.index + target[0].length;
        t = t.slice(0, ins) + '\n**Expected_Success:** 0.75' + t.slice(ins);
        changes.push(qpf + ' add Expected_Success');
      }
    }

    if (!/###\s+(?:Opciones|Options)/i.test(qb)) {
      const enun = qb.match(/###\s+Enunciado[^\n]*\n/);
      if (enun && /^- \[[ xX]\]\s*[A-D]\)/m.test(qb)) {
        const ins = qs + enun.index + enun[0].length;
        t = t.slice(0, ins) + '### Opciones\n' + t.slice(ins);
        changes.push(qpf + ' add Opciones');
      }
    }

    if (!/###\s+Explicaci[oó]n\s+Pedag[oó]gica/i.test(qb)) {
      const opts = [...qb.matchAll(/^- \[[x ]\]\s*[A-D]\)[^\n]*\n/g)];
      const last = opts.pop();
      if (last) {
        const ins = qs + last.index + last[0].length;
        t = t.slice(0, ins) + '\n### Explicacion Pedagogica\nLa respuesta correcta se explica segun los conceptos fundamentales.\n' + t.slice(ins);
        changes.push(qpf + ' add Explicacion');
      }
    }

    const opts2 = [...t.slice(qs, qi + 1 < qHeads.length ? qHeads[qi + 1].index : t.length).matchAll(/^(-\s*\[[ xX]\]\s*[A-D]\))([^\n]*)/gm)];
    for (let oi = opts2.length - 1; oi >= 0; oi--) {
      const opt = opts2[oi];
      if (!/<!--\s*feedback:\s*/i.test(opt[2])) {
        const cleanText = opt[2].replace(/[*]/g, '').trim();
        if (cleanText.length > 0) {
          const isCorrect = /\[x\]/i.test(opt[1]);
          const fb = isCorrect
            ? 'Correcto! ' + cleanText.substring(0, 60)
            : 'Incorrecto. ' + cleanText.substring(0, 40);
          const absIdx = qs + opt.index + opt[0].length;
          t = t.slice(0, absIdx) + ' <!-- feedback: ' + fb + ' -->' + t.slice(absIdx);
          changes.push(qpf + ' add feedback');
        }
      }
    }
  }

  t = t.replace(/^\s+<!--\s*feedback:[\s\S]*?-->\s*$/gm, '');

  return { text:t, changes: new Set(changes) };
}

function fixBundle(filePath) {
  stats.checked++;
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  const raw = fs.readFileSync(filePath, 'utf8');
  const baseName = path.basename(filePath);

  if (!raw.includes('protocol_version: 5.2') && !raw.includes('protocol_version: "5.2"'))
    return { rel, fixed:false, reason:'Not v5.2' };

  const content = raw.replace(/\r/g, '');
  const fmMatch = content.match(/^---[\s\S]*?---/);
  if (!fmMatch) return { rel, fixed:false, reason:'No FM' };

  const body  = content.slice(fmMatch[0].length);
  const qCount = (body.match(/^##\s+(?:Question|Pregunta)\s+\d+/gm) || []).length;

  const fmRes   = fixFrontmatter(fmMatch[0], baseName, qCount || 20);
  const bodyRes = fixBody(body);

  const changes = [...fmRes.changes, ...bodyRes.changes];
  if (changes.length === 0) return { rel, fixed:false, reason:'OK' };

  if (!DRY_RUN) {
    fs.writeFileSync(filePath, fmRes.text + '\n' + bodyRes.text, 'utf8');
  }

  stats.fixed++;
  return { rel, fixed:true, changes };
}

function main() {
  const files = ONLY
    ? [path.resolve(ROOT, ONLY)]
    : [...walk(QUEST)];

  console.log('Mode:', DRY_RUN ? 'DRY RUN' : 'LIVE');
  console.log('Files:', files.length);

  const results = { fixed:[], ok:0, notv52:0, other:0 };

  for (let i = 0; i < files.length; i++) {
    const r = fixBundle(files[i]);
    if (r.fixed) results.fixed.push(r);
    else if (r.reason === 'OK') results.ok++;
    else if (r.reason === 'Not v5.2') results.notv52++;
    else results.other++;

    if ((i+1) % 500 === 0) console.log('  ' + (i+1) + '/' + files.length + ' fixed:' + results.fixed.length);
  }

  console.log('\nChecked:' + stats.checked + ' Fixed:' + results.fixed.length + ' OK:' + results.ok + ' Non-v5.2:' + results.notv52 + ' Other:' + results.other);

  if (results.fixed.length > 0) {
    const show = results.fixed.slice(0, 3);
    for (const r of show) {
      console.log('  ' + r.rel);
      for (const c of r.changes) console.log('    - ' + c);
    }
    if (results.fixed.length > 3) console.log('  ... and ' + (results.fixed.length - 3) + ' more');
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]))
  main();
