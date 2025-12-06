#!/usr/bin/env node
/**
 * Script de Migración a Protocol V2.0
 * 
 * Este script automatiza la adición de `protocol_version: "2.0"` a los archivos
 * de preguntas que no lo tienen, y normaliza `country` a minúsculas.
 * 
 * Uso:
 *   node scripts/migrate-to-v2.js [--dry-run] [--path <ruta>]
 * 
 * Opciones:
 *   --dry-run    Solo muestra qué archivos se modificarían, sin hacer cambios
 *   --path       Ruta específica a migrar (default: src/content/questions)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const DEFAULT_PATH = 'src/content/questions';
const DRY_RUN = process.argv.includes('--dry-run');
const CUSTOM_PATH = process.argv.includes('--path') 
  ? process.argv[process.argv.indexOf('--path') + 1] 
  : null;

const TARGET_PATH = CUSTOM_PATH || DEFAULT_PATH;

// Estadísticas
let stats = {
  total: 0,
  migrated: 0,
  skipped: 0,
  errors: 0,
  alreadyV2: 0
};

/**
 * Encuentra todos los archivos .md recursivamente
 */
function findMarkdownFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Directorio no encontrado: ${dir}`);
    process.exit(1);
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findMarkdownFiles(fullPath, files);
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Parsea el frontmatter de un archivo markdown
 */
function parseFrontmatter(content) {
  // Normalize line endings to \n
  const normalizedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const match = normalizedContent.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  }
  
  return { raw: match[0], parsed: frontmatter, fullMatch: match[1], normalizedContent };
}

/**
 * Actualiza el frontmatter para Protocol V2.0
 */
function updateFrontmatter(content, filePath) {
  const fm = parseFrontmatter(content);
  if (!fm) {
    console.log(`  ⚠️  Sin frontmatter válido: ${filePath}`);
    return null;
  }
  
  // Ya tiene protocol_version?
  if (fm.parsed.protocol_version === '2.0') {
    stats.alreadyV2++;
    return null;
  }
  
  // Use normalized content for modifications
  let newContent = fm.normalizedContent;
  let changes = [];
  
  // 1. Agregar protocol_version después de country
  if (!fm.parsed.protocol_version) {
    // Buscar la línea de country para insertar después
    const countryLine = fm.fullMatch.match(/country:\s*.*/);
    if (countryLine) {
      const oldLine = countryLine[0];
      const newLine = `${oldLine}\nprotocol_version: "2.0"`;
      newContent = newContent.replace(oldLine, newLine);
      changes.push('+ protocol_version: "2.0"');
    } else {
      // Si no hay country, insertar al principio del frontmatter
      newContent = newContent.replace('---\n', '---\nprotocol_version: "2.0"\n');
      changes.push('+ protocol_version: "2.0"');
    }
  }
  
  // 2. Normalizar country a minúsculas
  const countryMatch = newContent.match(/country:\s*([A-Z]{2})/);
  if (countryMatch) {
    const oldValue = countryMatch[1];
    const newValue = oldValue.toLowerCase();
    newContent = newContent.replace(
      `country: ${oldValue}`,
      `country: "${newValue}"`
    );
    changes.push(`~ country: ${oldValue} → "${newValue}"`);
  }
  
  if (changes.length === 0) {
    return null;
  }
  
  return { newContent, changes };
}

/**
 * Procesa un archivo
 */
function processFile(filePath) {
  stats.total++;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const result = updateFrontmatter(content, filePath);
    
    if (!result) {
      stats.skipped++;
      return;
    }
    
    const relativePath = path.relative(process.cwd(), filePath);
    
    if (DRY_RUN) {
      console.log(`📝 ${relativePath}`);
      result.changes.forEach(c => console.log(`   ${c}`));
    } else {
      fs.writeFileSync(filePath, result.newContent, 'utf8');
      console.log(`✅ ${relativePath}`);
      result.changes.forEach(c => console.log(`   ${c}`));
    }
    
    stats.migrated++;
    
  } catch (error) {
    console.error(`❌ Error en ${filePath}: ${error.message}`);
    stats.errors++;
  }
}

/**
 * Main
 */
function main() {
  console.log('');
  console.log('🔄 Migración a Protocol V2.0');
  console.log('============================');
  console.log(`📁 Ruta: ${TARGET_PATH}`);
  console.log(`🔍 Modo: ${DRY_RUN ? 'DRY RUN (sin cambios)' : 'REAL'}`);
  console.log('');
  
  const files = findMarkdownFiles(TARGET_PATH);
  console.log(`📊 Archivos encontrados: ${files.length}`);
  console.log('');
  
  for (const file of files) {
    processFile(file);
  }
  
  console.log('');
  console.log('📊 Resumen');
  console.log('==========');
  console.log(`Total archivos:     ${stats.total}`);
  console.log(`Ya en V2.0:         ${stats.alreadyV2}`);
  console.log(`Migrados:           ${stats.migrated}`);
  console.log(`Sin cambios:        ${stats.skipped}`);
  console.log(`Errores:            ${stats.errors}`);
  console.log('');
  
  if (DRY_RUN && stats.migrated > 0) {
    console.log('💡 Ejecuta sin --dry-run para aplicar los cambios');
  }
}

main();
