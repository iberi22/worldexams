function normalizeTopic(topic) {
  return String(topic || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s-]+/g, '')
    .replace(/[^a-z0-9]/g, '');
}

const questionTopic = normalizeTopic("CO-MAT-11-2026-W01-limites-al-infinito-001-MASTERY-bundle");
const curriculumTopic = normalizeTopic("limites");

console.log("Q:", questionTopic);
console.log("C:", curriculumTopic);
console.log(questionTopic.includes(curriculumTopic));
