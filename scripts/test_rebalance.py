#!/usr/bin/env python3
"""Tests for the answer-key rebalance.

Run:  python3 scripts/test_rebalance.py

The invariants here are the ones that a mass rewrite of 2694 bundles cannot
afford to get wrong, plus regression tests for the two bugs this tooling had
while it was written:

  - a duplicated tail that appended the whole document a second time;
  - a dropped preamble block that silently deleted the YAML frontmatter.

Both were caught by the integrity assertion in rebalance_corpus.py, not by a
test, which is why they are pinned here now.
"""
import collections
import importlib.util
import os
import re
import sys
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location(
    "reb", os.path.join(HERE, "rebalance_answer_letter.py")
)
reb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(reb)

# The only permitted difference: the letter on an option line.
NEUTRAL = re.compile(r"^(\s*[-*]\s*\[.\]\s*)[A-D]\)", re.M)
OPTION = re.compile(r"^\s*[-*]\s*\[([ xX])\]\s*([A-D])\)\s*(.*)$", re.M)

PREAMBLE = """---
id: "XX-TST-11-2026-W01-demo-001-MASTERY-bundle"
country: "testland"
grado: 11
week: "W01"
protocol_version: "5.2"
---

# MASTERY Bundle - Demo (W01)

Intro paragraph that must survive.

"""


def question(n, correct):
    opts = []
    for L in "ABCD":
        mark = "x" if L == correct else " "
        fb = "Correcto. Explicado." if L == correct else f"Incorrecto. Razon {L}."
        opts.append(f"- [{mark}] {L}) Opcion {L} de la {n} <!-- feedback: {fb} -->")
    return (
        f"## Question {n} [D3-D4]\n"
        f"**ID:** XX-TST-11-2026-W01-demo-001-MASTERY-v{n}\n"
        "**Bloom:** Remember\n"
        "\n### Enunciado\nEnunciado de la pregunta " + str(n) + ".\n"
        "\n### Opciones\n" + "\n".join(opts) + "\n"
        "\n### Explicacion Pedagogica\nExplicacion pedagogica de la " + str(n) + ".\n\n---\n\n"
    )


def bundle(n_questions=20, correct="A"):
    return PREAMBLE + "".join(question(i, correct) for i in range(1, n_questions + 1))


def mark(text):
    return [L for m, L, _ in OPTION.findall(text) if m in "xX"]


def letters(text):
    return [L for mark, L, _ in OPTION.findall(text) if mark in "xX"]


def assert_only_letters_changed(case, before, after):
    case.assertEqual(
        NEUTRAL.sub(r"\1X)", before),
        NEUTRAL.sub(r"\1X)", after),
        "only the option label may differ",
    )
    case.assertEqual(before.count("\n"), after.count("\n"), "line count changed")
    case.assertEqual(len(before), len(after), "document length changed")
    case.assertEqual(
        len(OPTION.findall(before)), len(OPTION.findall(after)), "option count changed"
    )
    case.assertEqual(
        [t for _, _, t in OPTION.findall(before)],
        [t for _, _, t in OPTION.findall(after)],
        "option text or feedback changed",
    )


class TestSplitCoversWholeDocument(unittest.TestCase):
    def test_preamble_is_part_of_the_blocks(self):
        """Regression: the preamble was dropped, deleting the YAML frontmatter."""
        text = bundle(8)
        blocks = reb.split_questions(text)
        rebuilt = "".join(text[s:e] for s, e in blocks)
        self.assertEqual(rebuilt, text, "blocks must cover the document exactly")

    def test_preamble_block_has_no_options(self):
        text = bundle(8)
        blocks = reb.split_questions(text)
        first = text[blocks[0][0]:blocks[0][1]]
        self.assertIn('id: "XX-TST', first)
        self.assertEqual(OPTION.findall(first), [])

    def test_every_character_is_covered_once(self):
        text = bundle(12)
        covered = []
        for s, e in reb.split_questions(text):
            covered.append((s, e))
        for (s1, e1), (s2, _) in zip(covered, covered[1:]):
            self.assertEqual(e1, s2, "blocks must be contiguous, no gap and no overlap")


class TestRewriteInvariants(unittest.TestCase):
    def _assert_only_letters_changed(self, before, after):
        assert_only_letters_changed(self, before, after)

    def test_regression_no_duplicated_document(self):
        """Regression: the tail was appended, duplicating the whole file."""
        before = bundle(8, "A")
        after, _ = reb.rewrite(before, "seed")
        self.assertEqual(after.count("## Question 1 "), 1)
        self.assertEqual(after.count('id: "XX-TST'), 1)

    def test_regression_no_none_letter(self):
        """Regression: the preamble consumed a target, writing 'None)'."""
        before = bundle(8, "A")
        after, _ = reb.rewrite(before, "seed")
        self.assertNotIn("None)", after)
        for _, L, _ in OPTION.findall(after):
            self.assertIn(L, "ABCD")

    def test_only_letters_change(self):
        before = bundle(20, "A")
        after, moved = reb.rewrite(before, "seed")
        self.assertGreater(moved, 0)
        self._assert_only_letters_changed(before, after)

    def test_frontmatter_survives(self):
        before = bundle(8, "A")
        after, _ = reb.rewrite(before, "seed")
        self.assertTrue(after.startswith("---\nid: \"XX-TST"))

    def test_question_count_is_preserved(self):
        before = bundle(20, "A")
        after, _ = reb.rewrite(before, "seed")
        self.assertEqual(len(reb.answer_letters(before)), len(reb.answer_letters(after)))

    def test_idempotent(self):
        once, _ = reb.rewrite(bundle(20, "A"), "seed")
        twice, moved = reb.rewrite(once, "seed")
        self.assertEqual(once, twice)
        self.assertEqual(moved, 0)

    def test_same_seed_is_reproducible(self):
        a, _ = reb.rewrite(bundle(20, "A"), "seed")
        b, _ = reb.rewrite(bundle(20, "A"), "seed")
        self.assertEqual(a, b)

    def test_single_correct_option_is_required(self):
        """A question with two [x] marks is left alone, not silently 'fixed'."""
        text = bundle(4, "A").replace("- [ ] B) Opcion B", "- [x] B) Opcion B", 1)
        bad = reb.split_questions(text)[1]
        after, _ = reb.rewrite(text, "seed")
        # The malformed question survives byte-for-byte; its three healthy
        # siblings are still rebalanced, which is the point of per-question work.
        start = after.index("## Question 1 ")
        end = after.index("## Question 2 ")
        self.assertEqual(after[start:end], text[bad[0]:bad[1]])
        self.assertEqual(mark(after[start:end]), ["A", "B"])

    def test_duplicate_letters_are_left_alone(self):
        text = bundle(4, "A").replace("- [ ] D) Opcion D", "- [ ] B) Opcion D", 1)
        bad = reb.split_questions(text)[1]
        after, _ = reb.rewrite(text, "seed")
        start = after.index("## Question 1 ")
        end = after.index("## Question 2 ")
        self.assertEqual(after[start:end], text[bad[0]:bad[1]])


class TestDistribution(unittest.TestCase):
    def test_all_A_becomes_balanced(self):
        before = bundle(40, "A")
        after, moved = reb.rewrite(before, "seed")
        self.assertGreater(moved, 0)
        c = collections.Counter(letters(after))
        self.assertEqual(len(c), 4, f"all four letters must appear: {dict(c)}")
        self.assertLessEqual(max(c.values()) / sum(c.values()), 0.45)

    def test_all_B_also_balances(self):
        """The bias is not always A: Uruguay measured 79% B."""
        before = bundle(40, "B")
        after, moved = reb.rewrite(before, "seed")
        self.assertGreater(moved, 0)
        c = collections.Counter(letters(after))
        self.assertEqual(len(c), 4, f"all four letters must appear: {dict(c)}")

    def test_rewrite_shuffles_an_already_balanced_bundle(self):
        """The library rebalances on request; skipping is the driver's job.

        rewrite() has no "is this already fine?" opinion by design: it is given a
        bundle to re-key. rebalance_corpus.py owns the >50% guard, so a balanced
        bundle is never handed to rewrite() in the first place. This test pins
        that split so nobody moves the guard into the library by accident, and so
        nobody reads rewrite() as safe to call blindly.
        """
        text = PREAMBLE + "".join(
            question(i, "ABCD"[(i - 1) % 4]) for i in range(1, 21)
        )
        c = collections.Counter(letters(text))
        self.assertLessEqual(max(c.values()) / sum(c.values()), 0.35)
        after, moved = reb.rewrite(text, "seed")
        self.assertGreater(moved, 0)
        assert_only_letters_changed(self, text, after)
        # still balanced afterwards: shuffling a balanced key keeps it balanced
        c2 = collections.Counter(letters(after))
        self.assertEqual(len(c2), 4)

    def test_target_stays_within_offered_letters(self):
        before = bundle(20, "A")
        after, _ = reb.rewrite(before, "seed")
        for block_start in [m.start() for m in re.finditer(r"^## Question", after, re.M)]:
            block = after[block_start:block_start + 2000]
            offered = {L for _, L, _ in OPTION.findall(block)}
            marks = [L for mark, L, _ in OPTION.findall(block) if mark in "xX"]
            for m in marks:
                self.assertIn(m, offered)


if __name__ == "__main__":
    unittest.main(verbosity=2)
