import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const dir = 'src/content/questions/colombia';

function scan(d) {
  let r = [];
  if (!fs.existsSync(d)) return r;
  fs.readdirSync(d).forEach(f => {
    const fp = path.join(d, f);
    if (fs.statSync(fp).isDirectory()) {
      r = r.concat(scan(fp));
    } else if (f.endsWith('.md') && !f.startsWith('_') && f !== 'PROTOCOL.md') {
      try {
        const { data, content } = matter(fs.readFileSync(fp, 'utf-8'));
        const qcount = (content.match(/^## Pregunta/gm) || []).length;
        r.push({ file: f, grado: data.grado, asignatura: data.asignatura, qcount });
      } catch(e) {
        console.error(`Error parsing ${fp}:`, e.message);
      }
    }
  });
  return r;
}

const all = scan(dir);

// Agrupar por grado
const byGrade = {};
all.forEach(q => {
  const grade = q.grado || 'Sin Grado';
  if (!byGrade[grade]) byGrade[grade] = { bundles: 0, questions: 0, subjects: {} };
  byGrade[grade].bundles++;
  byGrade[grade].questions += q.qcount;

  const subj = q.asignatura || 'Sin Asignatura';
  if (!byGrade[grade].subjects[subj]) byGrade[grade].subjects[subj] = { bundles: 0, questions: 0 };
  byGrade[grade].subjects[subj].bundles++;
  byGrade[grade].subjects[subj].questions += q.qcount;
});

console.log('\n========================================');
console.log('📊 RESUMEN DE PREGUNTAS POR GRADO');
console.log('========================================\n');

const grades = Object.keys(byGrade).sort((a, b) => Number(a) - Number(b));
let totalBundles = 0;
let totalQuestions = 0;

grades.forEach(grade => {
  const data = byGrade[grade];
  console.log(`\n📚 Grado ${grade}: ${data.questions} preguntas (${data.bundles} bundles)`);
  console.log('   ----------------------------------------');

  Object.keys(data.subjects).sort().forEach(subj => {
    const s = data.subjects[subj];
    console.log(`   📖 ${subj}: ${s.questions} preguntas (${s.bundles} bundles)`);
  });

  totalBundles += data.bundles;
  totalQuestions += data.questions;
});

console.log('\n========================================');
console.log('📊 TOTALES GLOBALES');
console.log('========================================');
console.log(`   Total Bundles: ${totalBundles}`);
console.log(`   Total Preguntas: ${totalQuestions}`);
console.log('========================================\n');
