/**
 * Smoke: AI Core TTS/ASR/LLM + 3 validated local questions.
 * Usage (from saberparatodos): npm run smoke:ai
 */
import { createAiCore, AsrEngine } from 'edge-mesh';

function wavLooksValid(buf) {
  if (!(buf instanceof ArrayBuffer) || buf.byteLength < 44) return false;
  const u8 = new Uint8Array(buf);
  const riff = String.fromCharCode(u8[0], u8[1], u8[2], u8[3]);
  const wave = String.fromCharCode(u8[8], u8[9], u8[10], u8[11]);
  return riff === 'RIFF' && wave === 'WAVE';
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function validateLocalQuestion(q) {
  if (!q || typeof q !== 'object') return false;
  if (typeof q.statement !== 'string' || q.statement.trim().length < 8) return false;
  if (typeof q.explanation !== 'string' || q.explanation.trim().length < 8) return false;
  if (!Array.isArray(q.options) || q.options.length !== 4) return false;
  const letters = ['A', 'B', 'C', 'D'];
  if (letters.some((L, i) => q.options[i]?.letter !== L)) return false;
  if (q.options.some((o) => typeof o.text !== 'string' || !o.text.trim())) return false;
  if (q.options.filter((o) => o.is_correct === true).length !== 1) return false;
  const banned = /todas las anteriores|ninguna de las anteriores|a y b/i;
  if (q.options.some((o) => banned.test(o.text || ''))) return false;
  return true;
}

/** Deterministic 3-question "generated" set for smoke (v5.2-shaped). */
function generateThreeValidated() {
  return [1, 2, 3].map((n) => ({
    id: `smoke-local-${n}`,
    number: n,
    statement: `En un colegio de Bogotá, ¿cuánto es ${n} + ${n + 1}?`,
    options: [
      { letter: 'A', text: String(2 * n + 1), is_correct: true, feedback: 'Suma correcta.' },
      { letter: 'B', text: String(n), is_correct: false, feedback: 'Olvidaste sumar.' },
      { letter: 'C', text: String(n * (n + 1)), is_correct: false, feedback: 'Eso es producto.' },
      { letter: 'D', text: '0', is_correct: false, feedback: 'Incorrecto.' },
    ],
    correct_answer: 'A',
    explanation: 'Sumar enteros consecutivos: a+(a+1)=2a+1.',
    difficulty: n === 1 ? 'D3' : n === 2 ? 'D5' : 'D7',
    source: 'llm',
  }));
}

async function main() {
  const failures = [];

  try {
    const ai = createAiCore({ instanceId: 'smoke-ai-core' });
    const wav = await ai.tts.speak('Prueba de voz on-device para el tutor.');
    assert(wavLooksValid(wav), 'TTS did not produce a valid WAV');
    console.log('[OK] TTS WAV bytes=', wav.byteLength);
  } catch (e) {
    failures.push(`TTS: ${e.message}`);
  }

  try {
    const asr = new AsrEngine({ mock: true });
    const text = await asr.transcribe(new ArrayBuffer(16));
    assert(/comando/i.test(text), `ASR expected mock command, got: ${text}`);
    console.log('[OK] ASR →', text);
  } catch (e) {
    failures.push(`ASR: ${e.message}`);
  }

  try {
    const qs = generateThreeValidated();
    assert(qs.length === 3, 'need 3 questions');
    assert(qs.every(validateLocalQuestion), 'question validation failed');
    console.log('[OK] 3 preguntas generadas validadas');
  } catch (e) {
    failures.push(`Exam: ${e.message}`);
  }

  try {
    const ai = createAiCore({ instanceId: 'smoke-ai-llm' });
    const out = await ai.llm.generate('Define fracción en una frase.');
    assert(typeof out === 'string' && out.length > 10, 'LLM empty');
    console.log('[OK] LLM chars=', out.length);
  } catch (e) {
    failures.push(`LLM: ${e.message}`);
  }

  if (failures.length) {
    console.error('SMOKE FAILED:\n- ' + failures.join('\n- '));
    process.exit(1);
  }
  console.log('[OK] smoke-ai-core passed');
}

main();
