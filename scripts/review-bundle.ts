/**
 * Bundle Review Script v2
 * Handles both MASTERY and BASIC formats
 * 
 * Usage: node scripts/review-bundle.ts --bundle=<path>
 */

import * as fs from 'fs';

// Parse frontmatter with simple regex (no external deps)
function parseFrontmatter(content: string): Record<string, string | number> {
  const result: Record<string, string | number> = {};
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return result;
  
  const lines = match[1].split('\n');
  for (const line of lines) {
    const keyMatch = line.match(/^(\w+):\s*(.+)$/);
    if (keyMatch) {
      let value = keyMatch[2].trim();
      value = value.replace(/^["']|["']$/g, '');
      const num = parseInt(value);
      result[keyMatch[1]] = isNaN(num) ? value : num;
    }
  }
  return result;
}

// Count actual questions
function countQuestions(content: string): number {
  const matches = content.match(/##\s+(Question|Pregunta)\s+\d+/gi);
  return matches ? matches.length : 0;
}

// Detect format
function detectFormat(filePath: string, fm: Record<string, string | number>): 'MASTERY' | 'BASIC' {
  const fileName = filePath.includes('\\') ? filePath.split('\\').pop()! : filePath.split('/').pop()!;
  
  if (fileName.includes('MASTERY')) return 'MASTERY';
  if (fm.protocol_version === '5.1') return 'MASTERY';
  if (fm.bundle_size === 20) return 'MASTERY';
  if (fm.total_questions && (fm.total_questions as number) < 20) return 'BASIC';
  if (filePath.includes('periodo-')) return 'MASTERY';
  return 'BASIC';
}

// Extract questions from content (MASTERY format)
function parseMastryQuestions(content: string): any[] {
  const questions: any[] = [];
  const blocks = content.split(/##\s+Question\s+\d+/i);
  
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    const q: any = { id: '', errors: [], warnings: [] };
    
    // Extract ID
    const idMatch = block.match(/\*\*ID:\*\*\s*`([^`]+)`/);
    if (idMatch) q.id = idMatch[1];
    
    // Extract Bloom
    const bloomMatch = block.match(/\*\*Bloom:\*\*\s*(\w+)/i);
    if (bloomMatch) q.bloom = bloomMatch[1];
    
    // Extract ICFES
    const icfesMatch = block.match(/\*\*ICFES:\*\*\s*([^\n]+)/i);
    if (icfesMatch) q.icfes = icfesMatch[1].trim();
    
    // Extract Enunciado
    const enunMatch = block.match(/###\s*Enunciado\n+([^\n#][\s\S]*?)(?=\n+###|\n+---\n|$)/);
    if (enunMatch) q.enunciado = enunMatch[1].trim();
    
    // Count options
    const options = block.match(/\[([ x])\]\s*[A-D]\)/g) || [];
    q.optionCount = options.length;
    q.correctCount = (block.match(/\[x\]\s*[A-D]\)/gi) || []).length;
    
    // Check for prohibited patterns
    const fullText = block;
    if (/todas las anteriores|ninguna de las anteriores|a y b|^(todas|ninguna)/i.test(fullText)) {
      q.errors.push('Prohibited pattern: "todas las anteriores" or similar');
    }
    
    // Check for correct answer clarity
    if (q.optionCount === 4 && q.correctCount !== 1) {
      q.errors.push(`Should have exactly 1 correct answer, found ${q.correctCount}`);
    }
    
    // Word salad check (simple heuristic)
    if (q.enunciado) {
      const words = q.enunciado.split(/\s+/);
      const uniqueWords = new Set(words.map(w => w.toLowerCase()));
      const ratio = uniqueWords.size / words.length;
      if (ratio < 0.3 && words.length > 15) {
        q.warnings.push('Possible word salad detected (low unique word ratio)');
      }
    }
    
    questions.push(q);
  }
  
  return questions;
}

// Extract questions from content (BASIC format)
function parseBasicQuestions(content: string): any[] {
  const questions: any[] = [];
  const blocks = content.split(/##\s+Pregunta\s+\d+/i);
  
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    const q: any = { id: '', errors: [], warnings: [] };
    
    // Extract Enunciado
    const enunMatch = block.match(/###\s*Enunciado\n+([^\n#][\s\S]*?)(?=\n+###|\n+---\n|$)/);
    if (enunMatch) q.enunciado = enunMatch[1].trim();
    
    // Count options
    const options = block.match(/- \[[ x]\]/g) || [];
    q.optionCount = options.length;
    q.correctCount = (block.match(/- \[x\]/gi) || []).length;
    
    // Check
    if (q.optionCount !== 4) {
      q.warnings.push(`Expected 4 options, found ${q.optionCount}`);
    }
    if (q.correctCount !== 1) {
      q.errors.push(`Should have exactly 1 correct answer, found ${q.correctCount}`);
    }
    
    questions.push(q);
  }
  
  return questions;
}

interface ReviewResult {
  bundle_id: string;
  revision_id: string;
  timestamp: string;
  format: 'MASTERY' | 'BASIC';
  total_questions: number;
  errors_found: number;
  warnings: number;
  decision: 'ACEPTAR' | 'CORREGIR_PUNTUAL' | 'REGENERAR_BUNDLE';
  questions_reviewed: any[];
  issues: string[];
  flags: string[];
}

function review(bundlePath: string): ReviewResult {
  console.log(`\n🔍 Revisando bundle: ${bundlePath}\n`);
  
  const content = fs.readFileSync(bundlePath, 'utf-8');
  const fm = parseFrontmatter(content);
  const format = detectFormat(bundlePath, fm);
  const actualQuestions = countQuestions(content);
  
  console.log('='.repeat(50));
  console.log(`📋 REVISIÓN DE BUNDLE`);
  console.log('='.repeat(50));
  console.log(`Path: ${bundlePath}`);
  console.log(`Formato: ${format}`);
  console.log(`ID: ${fm.id || 'MISSING'}`);
  console.log(`Grado: ${fm.grado || 'MISSING'}`);
  console.log(`Asignatura: ${fm.asignatura || 'MISSING'}`);
  console.log(`Periodo: ${fm.periodo || 'NO TIENE'}`);
  console.log(`Preguntas reales: ${actualQuestions}`);
  console.log('='.repeat(50));
  
  const issues: string[] = [];
  
  // Check frontmatter
  if (!fm.id) issues.push('MISSING: id en frontmatter');
  if (!fm.grado) issues.push('MISSING: grado en frontmatter');
  if (!fm.asignatura) issues.push('MISSING: asignatura en frontmatter');
  
  // Check format-specific requirements
  if (format === 'MASTERY') {
    const expected = (fm.bundle_size as number) || 20;
    if (actualQuestions !== expected) {
      issues.push(`MASTERY: Expected ${expected} questions, found ${actualQuestions}`);
    }
    if (!fm.protocol_version) {
      issues.push('MASTERY: Missing protocol_version (should be 5.1)');
    }
  } else {
    const expected = (fm.total_questions as number) || actualQuestions;
    if (actualQuestions < 20) {
      issues.push(`BASIC: Only ${actualQuestions} questions, should have 20 for MASTERY migration`);
    }
  }
  
  // Parse and validate questions
  const questions = format === 'MASTERY' ? parseMastryQuestions(content) : parseBasicQuestions(content);
  
  let errorCount = 0;
  let warningCount = 0;
  
  for (const q of questions) {
    if (q.errors) errorCount += q.errors.length;
    if (q.warnings) warningCount += q.warnings.length;
  }
  
  // Decision
  let decision: ReviewResult['decision'] = 'ACEPTAR';
  if (errorCount >= 2 || issues.length >= 2) {
    decision = 'REGENERAR_BUNDLE';
  } else if (errorCount === 1 || issues.length === 1) {
    decision = 'CORREGIR_PUNTUAL';
  }
  
  // Flags
  const flags: string[] = [];
  if (format === 'BASIC') flags.push('NEEDS_MIGRATION');
  if (actualQuestions < 20) flags.push('INSUFFICIENT_QUESTIONS');
  if (errorCount >= 2) flags.push('LOW_QUALITY');
  
  const result: ReviewResult = {
    bundle_id: (fm.id as string) || 'UNKNOWN',
    revision_id: `rev_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    timestamp: new Date().toISOString(),
    format,
    total_questions: actualQuestions,
    errors_found: errorCount,
    warnings: warningCount + issues.length,
    decision,
    questions_reviewed: questions,
    issues,
    flags
  };
  
  // Print summary
  console.log(`\n📊 RESULTADO: ${decision}`);
  console.log(`   Preguntas revisadas: ${actualQuestions}`);
  console.log(`   Errores encontrados: ${errorCount}`);
  console.log(`   Warnings: ${warningCount + issues.length}`);
  console.log(`   Flags: ${flags.join(', ') || 'ninguna'}`);
  
  if (issues.length > 0) {
    console.log(`\n❌ ISSUES:`);
    for (const issue of issues) {
      console.log(`   - ${issue}`);
    }
  }
  
  console.log('='.repeat(50));
  
  return result;
}

// CLI
const args = process.argv.slice(2);
let bundlePath = '';

for (const arg of args) {
  if (arg.startsWith('--bundle=')) {
    bundlePath = arg.replace('--bundle=', '');
  }
}

if (!bundlePath) {
  console.error('Uso: node scripts/review-bundle.ts --bundle=<path>');
  process.exit(1);
}

try {
  const result = review(bundlePath);
  
  console.log('\n--- JSON OUTPUT ---');
  console.log(JSON.stringify(result, null, 2));
  
  process.exit(result.decision === 'REGENERAR_BUNDLE' ? 2 : 0);
} catch (e) {
  console.error('Error durante revisión:', e);
  process.exit(1);
}
