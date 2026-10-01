// Tests for the corpus-level clone detection.
//
// The per-file gate structurally cannot see these: a python generator
// hard-codes a few stems and copies them into every week of every country, and
// each copy validates perfectly on its own. The gate has no idea that the same
// question exists 278 times.
//
// Plain node, like scripts/test-feedback-gate.mjs, because the vitest include
// patterns do not reach scripts/.

import assert from 'node:assert/strict';
import {
  findStemClones,
  findReusedFeedback,
  normaliseStem,
  normaliseFeedback,
  REASON_CLONE_MIN,
  FEEDBACK_REUSE_MIN,
} from './check-clones.mjs';

let pass = 0;
let fail = 0;

function test(name, fn) {
  try {
    fn();
    pass += 1;
    console.log(`PASS  ${name}`);
  } catch (e) {
    fail += 1;
    console.log(`FAIL  ${name}`);
    console.log(`      ${e.message}`);
  }
}

const map = (entries) => new Map(entries);

test('normaliseStem collapses whitespace and case so formatting cannot hide a clone', () => {
  assert.equal(normaliseStem('What  is the\nEnglish word?'), 'what is the english word?');
  assert.equal(normaliseStem('WHAT IS THE ENGLISH WORD?'), 'what is the english word?');
});

test('normaliseStem treats a missing stem as empty rather than throwing', () => {
  assert.equal(normaliseStem(undefined), '');
  assert.equal(normaliseStem(null), '');
});

test('normaliseFeedback collapses whitespace and case', () => {
  assert.equal(normaliseFeedback('Review  the\nconcept.'), 'review the concept.');
});

test('findStemClones reports a stem present in three bundles', () => {
  const clones = findStemClones(
    map([['what is the english word for: a place where you live', ['a.md', 'b.md', 'c.md']]]),
    REASON_CLONE_MIN
  );
  assert.equal(clones.length, 1);
  assert.equal(clones[0].count, 3);
  assert.deepEqual(clones[0].bundles, ['a.md', 'b.md', 'c.md']);
});

test('findStemClones ignores a stem in only two bundles', () => {
  assert.equal(findStemClones(map([['a question', ['x.md', 'y.md']]]), REASON_CLONE_MIN).length, 0);
});

test('findStemClones sorts worst first', () => {
  const clones = findStemClones(
    map([
      ['rare', ['a.md', 'b.md', 'c.md']],
      ['common', ['d.md', 'e.md', 'f.md', 'g.md']],
    ]),
    REASON_CLONE_MIN
  );
  assert.equal(clones[0].stem, 'common');
  assert.equal(clones[0].count, 4);
});

test('findReusedFeedback reports one feedback on many distinct stems', () => {
  const stems = new Set();
  for (let i = 0; i < 30; i += 1) stems.add(`stem ${i}`);
  const reused = findReusedFeedback(
    map([['incorrect. review the concept.', stems]]),
    FEEDBACK_REUSE_MIN
  );
  assert.equal(reused.length, 1);
  assert.equal(reused[0].count, 30);
});

test('findReusedFeedback ignores feedback unique to a question', () => {
  const reused = findReusedFeedback(
    map([['la fotosintesis usa luz y agua', new Set(['stem a'])]]),
    FEEDBACK_REUSE_MIN
  );
  assert.equal(reused.length, 0);
});

test('findReusedFeedback counts distinct stems, so one bundle repeating itself is not a clone', () => {
  const reused = findReusedFeedback(
    map([['correcto.', new Set(['only one stem'])]]),
    FEEDBACK_REUSE_MIN
  );
  assert.equal(reused.length, 0);
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
