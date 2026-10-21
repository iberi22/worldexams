#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = process.cwd();
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const QD = path.join(REPO, 'questions_data');

const CITIES = {
  colombia: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira', 'Manizales'],
  mexico: ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Mérida', 'Querétaro'],
  argentina: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Tucumán', 'Mar del Plata', 'Salta'],
  brasil: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba'],
  chile: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta', 'Temuco', 'Rancagua', 'Talca'],
  peru: ['Lima', 'Arequipa', 'Trujillo', 'Cusco', 'Piura', 'Iquitos', 'Huancayo', 'Chiclayo'],
  ecuador: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Machala', 'Manta', 'Loja', 'Riobamba'],
  panama: ['Ciudad de Panamá', 'Colón', 'David', 'Santiago', 'La Chorrera', 'Penonomé', 'Chitré', 'Aguadulce'],
  'costa-rica': ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Liberia', 'Puntarenas', 'Limón', 'Pérez Zeledón'],
  costarica: ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Liberia', 'Puntarenas', 'Limón', 'Pérez Zeledón'],
  guatemala: ['Ciudad de Guatemala', 'Quetzaltenango', 'Escuintla', 'Mixco', 'Villa Nueva', 'Petapa', 'San Juan Sacatepéquez', 'Chimaltenango'],
  dominican_republic: ['Santo Domingo', 'Santiago', 'La Vega', 'San Pedro de Macorís', 'San Francisco de Macorís', 'Puerto Plata', 'Higüey', 'Barahona'],
  'el-salvador': ['San Salvador', 'Santa Ana', 'San Miguel', 'Soyapango', 'Santa Tecla', 'Mejicanos', 'Apopa', 'Delgado'],
  honduras: ['Tegucigalpa', 'San Pedro Sula', 'Choloma', 'La Ceiba', 'El Progreso', 'Choluteca', 'Comayagua', 'Puerto Cortés'],
  nicaragua: ['Managua', 'León', 'Granada', 'Masaya', 'Chinandega', 'Matagalpa', 'Estelí', 'Jinotepe'],
  spain: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma'],
  uruguay: ['Montevideo', 'Salto', 'Paysandú', 'Las Piedras', 'Rivera', 'Maldonado', 'Tacuarembó', 'Melo'],
  paraguay: ['Asunción', 'Ciudad del Este', 'San Lorenzo', 'Luque', 'Encarnación', 'Pedro Juan Caballero', 'Concepción', 'Caaguazú'],
  bolivia: ['La Paz', 'Santa Cruz', 'Cochabamba', 'Sucre', 'Oruro', 'Potosí', 'Tarija', 'El Alto'],
  'puerto-rico': ['San Juan', 'Bayamón', 'Carolina', 'Ponce', 'Caguas', 'Guaynabo', 'Arecibo', 'Mayagüez'],
  'guinea-ecuatorial': ['Malabo', 'Bata', 'Ebebiyín', 'Aconibe', 'Mongomo', 'Luba', 'Riaba', 'Annobón'],
};

const PH = /(?<!\\[a-zA-Z]+)(?<!\\)(?<![\^_}])(?<!\{)\{[a-z_]{3,}\}/g;

function walk(d, out = []) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p, out);
    else if (f.name.endsWith('.md')) out.push(p);
  }
  return out;
}

function hashCity(id, country) {
  const cities = CITIES[country] || CITIES.colombia;
  const h = crypto.createHash('sha256').update(String(id || '')).digest('hex');
  const n = parseInt(h.slice(0, 8), 16);
  return cities[n % cities.length];
}

function parseFm(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (mm) fm[mm[1]] = mm[2].replace(/^"|"$/g, '').trim();
  }
  return fm;
}

const check = process.argv.includes('--check');

let totalFixed = 0;
const remaining = new Map();
const files = walk(QD);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const fm = parseFm(content);
  const country = fm.country || '';
  const original = content;

  // Replace {alignment} with frontmatter alignment value
  if (content.includes('{alignment}') && fm.alignment) {
    content = content.split('{alignment}').join(fm.alignment);
  }

  // Replace {city} per question block
  if (content.includes('{city}')) {
    // Split into question sections preserving delimiters
    const parts = content.split(/(?=^##\s+Question\s+\d+)/m);
    content = parts.map((part) => {
      if (!part.includes('{city}')) return part;
      const idm = part.match(/\*\*ID:\*\*\s*(.+)/);
      const qid = idm ? idm[1].trim() : fm.id;
      const city = hashCity(qid, country);
      return part.split('{city}').join(city);
    }).join('');
  }

  if (content !== original) {
    if (!check) fs.writeFileSync(file, content);
    totalFixed++;
  }

  // Count remaining placeholders
  const ms = content.match(PH) || [];
  for (const m of ms) remaining.set(m, (remaining.get(m) || 0) + 1);
}

// Report
console.log(`Files scanned: ${files.length}`);
console.log(`Files changed: ${totalFixed}`);
console.log(`Remaining unresolved placeholders: ${[...remaining.values()].reduce((a, b) => a + b, 0)}`);
if (remaining.size) {
  for (const [k, v] of [...remaining.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${v} ${k}`);
}
if (check) {
  const n = [...remaining.values()].reduce((a, b) => a + b, 0);
  process.exit(n === 0 ? 0 : 1);
}
