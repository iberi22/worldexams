
const fs = require('fs');

// Parser Logic (Copied from questionParser.ts)
const cleanExplanation = (explanation) => {
  if (!explanation) return undefined;
  let cleaned = explanation.replace(/##\s*📊\s*Metadata\s*de\s*Validación[\s\S]*/gi, '');
  cleaned = cleaned.replace(/^\|.*\|$/gm, '');
  cleaned = cleaned.replace(/^\|[-:\s|]+\|$/gm, '');
  cleaned = cleaned.replace(/^Source ID:.*$/gm, '');
  cleaned = cleaned.replace(/^Fecha de creación:.*$/gm, '');
  cleaned = cleaned.replace(/^Contexto cultural:.*$/gm, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();
  return cleaned || undefined;
};

function parseQuestionSection(content, sectionNumber, sectionType, bundleId) {
  // Extract question-specific context (optional)
  const contextMatch = content.match(/### (?:Contexto|Context)\s+([\s\S]*?)(?=### (?:Enunciado|Question|Opciones|Options))/i);
  const specificContext = contextMatch ? contextMatch[1].trim() : undefined;

  // Extract enunciado/question text
  const enunciadoMatch = content.match(/### (?:Enunciado|Question)\s+([\s\S]*?)(?=### (?:Opciones|Options))/i);
  const questionText = enunciadoMatch ? enunciadoMatch[1].trim() : '';

  if (!questionText) return null;

  return {
    id: `${bundleId}-v${sectionNumber}`,
    text: questionText,
    context: specificContext,
    fullContentPreview: content.substring(0, 100) + "..."
  };
}

function parseBundleQuestions(body, id) {
  const questions = [];

  // Extract shared context
  const firstQuestionMatch = body.match(/## (?:Pregunta|Question)\s+\d+/i);
  const contextEndIndex = firstQuestionMatch ? firstQuestionMatch.index : 0;
  let context = contextEndIndex ? body.substring(0, contextEndIndex).trim() : '';

  if (context) {
    context = context.replace(/===\s*METADATA\s*GLOBAL\s*===[\s\S]*?(?=#|$)/gi, '');
    context = context.replace(/^\|.*\|$/gm, '');
    context = context.replace(/^\|[-:\s|]+\|$/gm, '');
    context = context.replace(/^---+$/gm, '');
    context = context.replace(/^#\s*Bundle:.*$/gm, '');
     // The fix I made previously:
    // context = context.replace(/^#\s*Topic:.*$/gm, '');
    context = context.replace(/\s*\(Grade\s*\d+\)/gi, '');
    context = context.replace(/\n{3,}/g, '\n\n').trim();
  }

  const sectionRegex = /(?:^|\n)## (?:Pregunta|Question)\s+(\d+)\s*\(([^)]+)\)[\s\S]*?(?=(?:^|\n)## (?:Pregunta|Question)\s+\d+|(?:^|\n)## 📊 Metadata|---\s*$|$)/gi;

  let match;
  while ((match = sectionRegex.exec(body)) !== null) {
    const sectionNumber = parseInt(match[1]);
    const sectionType = match[2].trim();
    const sectionContent = match[0];

    const question = parseQuestionSection(sectionContent, sectionNumber, sectionType, id);
    if (question) {
      // Merge global context
      if (context) {
        question.context = question.context
          ? `${context}\n\n${question.context}` // Combining both
          : context;
      }
      questions.push(question);
    }
  }

  return questions;
}

// Execution
const filePath = 'e:/scripts-python/worldexams/saberparatodos/src/content/questions/ingles/grado-09/UNI-ENG-09-critical-thinking-001-bundle.md';
try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parts = fileContent.split('---\n');
    let body = parts.length >= 3 ? parts.slice(2).join('---\n') : fileContent;

    console.log(`Parsing file: ${filePath}`);
    const questions = parseBundleQuestions(body, 'UNI-ENG-09-TEST');

    const q9 = questions.find(q => q.id.includes('-v9'));
    if (q9) {
        console.log(`\n--- QUESTION 9 CONTEXT ---`);
        console.log(`TYPE: ${typeof q9.context}`);
        console.log(`LENGTH: ${q9.context ? q9.context.length : 0}`);
        console.log(`CONTENT:\n${q9.context}`);
        console.log(`--------------------------`);
    } else {
        console.log("Question 9 not found!");
    }

} catch (err) {
    console.error(err);
}
