
import fs from 'fs';
import matter from 'gray-matter';
// Mocking the required types and functions to match questionParser.ts as closely as possible

function cleanExplanation(explanation) {
  if (!explanation) return undefined;
  let cleaned = explanation.replace(/##\s*📊\s*Metadata\s*de\s*Validación[\s\S]*/gi, '');
  cleaned = cleaned.replace(/^\|.*\|$/gm, '');
  cleaned = cleaned.replace(/^\|[-:\s|]+\|$/gm, '');
  cleaned = cleaned.replace(/^Source ID:.*$/gm, '');
  cleaned = cleaned.replace(/^Fecha de creación:.*$/gm, '');
  cleaned = cleaned.replace(/^Contexto cultural:.*$/gm, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();
  return cleaned || undefined;
}

function parseQuestionSection(content, sectionNumber, sectionType, bundleId) {
  const idMatch = content.match(/\*\*ID:\*\*\s*`([^`]+)`/);
  const questionId = idMatch ? idMatch[1] : `${bundleId}-v${sectionNumber}`;

  const contextMatch = content.match(/### (?:Contexto|Context)\s+([\s\S]*?)(?=### (?:Enunciado|Question|Opciones|Options))/i);
  const specificContext = contextMatch ? contextMatch[1].trim() : undefined;

  const enunciadoMatch = content.match(/### (?:Enunciado|Question)\s+([\s\S]*?)(?=### (?:Opciones|Options))/i);
  const questionText = enunciadoMatch ? enunciadoMatch[1].trim() : '';

  if (!questionText) return null;

  const optionsMatch = content.match(/### (?:Opciones|Options)\s+([\s\S]*?)(?=### (?:Explicación|Explanation)|$)/i);
  const optionsBlock = optionsMatch ? optionsMatch[1].trim() : '';

  const options = [];
  let correctOptionId = '';

  const optionLines = optionsBlock.split('\n');
  optionLines.forEach(line => {
    const match = line.match(/^\s*-\s*\[([xX\s])\]\s*([A-Z])\)\s*(.*)/i);
    if (match) {
      const isCorrect = match[1].toLowerCase() === 'x';
      const id = match[2];
      const text = match[3].trim();

      options.push({ id, text });
      if (isCorrect) {
        correctOptionId = id;
      }
    }
  });

  const explanationMatch = content.match(/### (?:Explicación Pedagógica|Explanation)\s+([\s\S]*?)(?=---\s*$|## (?:Pregunta|Question)|$)/i);
  const explanation = cleanExplanation(explanationMatch ? explanationMatch[1].trim() : undefined) || '';

  return {
    id: questionId,
    text: questionText,
    correctOptionId,
    explanation
  };
}

function parseBundleQuestions(body, bundleId) {
  const questions = [];
  const sectionRegex = /(?:^|\n)## (?:Pregunta|Question)\s+(\d+)\s*\(([^)]+)\)[\s\S]*?(?=(?:^|\n)## (?:Pregunta|Question)\s+\d+|(?:^|\n)## 📊 Metadata|---\s*$|$)/gi;

  let match;
  while ((match = sectionRegex.exec(body)) !== null) {
    const sectionNumber = parseInt(match[1]);
    const sectionType = match[2].trim();
    const sectionContent = match[0];

    const question = parseQuestionSection(sectionContent, sectionNumber, sectionType, bundleId);
    if (question) {
      questions.push(question);
    }
  }
  return questions;
}

const filePath = 'e:/scripts-python/worldexams/saberparatodos/src/content/questions/ingles/grado-05/sports-play/CO-ENG-05-sports-play-105-bundle.md';
const content = fs.readFileSync(filePath, 'utf-8');
const { data, content: body } = matter(content);

const questions = parseBundleQuestions(body, data.id);
const q7 = questions.find(q => q.id === 'CO-ENG-05-sports-play-105-v7');

console.log('Question 7 Data:');
console.log(JSON.stringify(q7, null, 2));
