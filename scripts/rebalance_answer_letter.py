#!/usr/bin/env python3
"""Rebalance the correct-answer letter distribution inside one bundle.

The problem: agents emit the correct option wherever their template put it, so a
whole country can end up with 99% of its answers on A (measured: Paraguay 99% A,
El Salvador 89% A, Peru 67% A, while Uruguay is 79% B). A student who always
answers the most common letter scores far above chance without reading anything.

What this changes: only which letter carries [x]. The option text, the feedback
comment attached to it, and the question id stay exactly where they were, so the
pedagogy is untouched: the explanation still travels with the option it explains.

What this does NOT do: it does not invent content, reorder questions, or touch
Explicacion Pedagogica. It is a pure key permutation.

Balance is computed over the whole bundle, not per question. Balancing question
by question would just rotate a 100%-A bundle to 100%-B, which is the same defect
with a different letter.

Idempotent: re-running on a balanced bundle is a no-op.

Usage:
    python3 rebalance_answer_letter.py <bundle.md> [more.md ...] [--dry-run]
"""
import random
import re
import sys
from collections import Counter

# An option line plus its optional feedback comment, captured whole so the
# rewrite never has to re-join a partial line.
OPT_BLOCK = re.compile(
    r"^(\s*[-*]\s*)\[([ xX])\](\s*)([A-D])(\)\s[^\n]*(?:\n(?!\s*[-*]\s*\[)[^\n]*)*)$",
    re.M,
)
QUESTION_HEAD = re.compile(r"^## Question \d+", re.M)
LETTERS = "ABCD"


def split_questions(text):
    """Split into (start, end) blocks that cover the WHOLE document.

    Block 0 is the preamble (YAML frontmatter, title, intro) up to the first
    "## Question". It is included so a rewrite can never drop it: an earlier
    version started at the first question and silently deleted the frontmatter.
    """
    starts = [m.start() for m in QUESTION_HEAD.finditer(text)]
    bounds = [0] + starts + [len(text)]
    seen, blocks = set(), []
    for i in range(len(bounds) - 1):
        s, e = bounds[i], bounds[i + 1]
        if (s, e) in seen or s >= e:
            continue
        seen.add((s, e))
        blocks.append((s, e))
    return blocks


def answer_letters(text):
    """Correct letter per question, in document order."""
    out = []
    for start, end in split_questions(text):
        opts = list(OPT_BLOCK.finditer(text[start:end]))
        correct = [o.group(4) for o in opts if o.group(2) in "xX"]
        if len(opts) >= 2 and len(correct) == 1:
            out.append(correct[0])
    return out


def target_key(blocks_text, parsed, offered_per_q, seed):
    """Deal a balanced key over the letters each question actually offers."""
    rng = random.Random(seed)
    # Round-robin position, but jittered, so a 20-question bundle does not become
    # a mechanical A,B,C,D,A,B,C,D cycle that a student could learn.
    idx = 0
    out = []
    for letters_on_offer in offered_per_q:
        if not letters_on_offer:
            out.append(None)
            continue
        unique = sorted(set(letters_on_offer))
        pick = unique[(idx + rng.randrange(len(unique))) % len(unique)]
        out.append(pick)
        idx += 1
    return out


def rewrite(text, seed):
    """Rebalance the block, returning (new_text, moved)."""
    blocks = split_questions(text)
    parsed = []
    offered_per_q = []
    for start, end in blocks:
        opts = list(OPT_BLOCK.finditer(text[start:end]))
        correct = [o.group(4) for o in opts if o.group(2) in "xX"]
        # Only touch a question with a single correct option and no duplicate
        # labels; anything else is not ours to reorder.
        if len(opts) >= 2 and len(correct) == 1 and len({o.group(4) for o in opts}) == len(opts):
            parsed.append(correct[0])
            offered_per_q.append([o.group(4) for o in opts])
        else:
            parsed.append(None)
            offered_per_q.append([])

    movable = [L for L in parsed if L]
    if len(movable) < 2:
        return text, 0
    # A question must keep the letter it is given, so the target for question i
    # is drawn from the letters that question actually offers.
    targets = target_key(blocks, parsed, offered_per_q, seed)

    # Block 0 is the preamble and has no options, so targets[0] is None. The
    # iterator is aligned to the blocks that actually have a target; consuming a
    # target for the preamble shifted every question by one and wrote "None".
    pending = [x for x in targets if x is not None]
    it = iter(pending)
    out, moved = [], 0
    for idx, (start, end) in enumerate(blocks):
        block = text[start:end]
        if parsed[idx] is None:
            out.append(block)
            continue
        new_letter = next(it)
        cur_letter = parsed[idx]
        if new_letter == cur_letter:
            out.append(block)
            continue
        opts = list(OPT_BLOCK.finditer(block))
        # Permute labels only: every option keeps its text and its feedback, and
        # keeps its position; only the A/B/C/D it is labelled with is reassigned.
        letters_in_order = [o.group(4) for o in opts]
        free = [L for L in letters_in_order if L != cur_letter]
        mapping = {cur_letter: new_letter}
        for old, nxt in zip(free, [L for L in letters_in_order if L != new_letter]):
            mapping[old] = nxt
        pieces, prev = [], 0
        for o in opts:
            pieces.append(block[prev:o.start()])
            pieces.append(f"{o.group(1)}[{o.group(2)}]{o.group(3)}{mapping[o.group(4)]}{o.group(5)}")
            prev = o.end()
        pieces.append(block[prev:])
        out.append("".join(pieces))
        moved += 1
    # Every character of the document belongs to exactly one block, and the
    # preamble before the first "## Question" is block 0. Appending text[last:]
    # here would duplicate the whole file.
    return "".join(out), moved


def process(path, dry=False, seed=None):
    text = open(path, encoding="utf-8").read()
    new_text, moved = rewrite(text, seed if seed is not None else path)
    if moved and not dry:
        open(path, "w", encoding="utf-8").write(new_text)
    return moved


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry = "--dry-run" in sys.argv
    if not args:
        print(__doc__)
        return 1
    total = 0
    for p in args:
        m = process(p, dry)
        total += m
        if m:
            print(f"  {m:>3} rebalanced  {p}")
    verb = "would rebalance" if dry else "rebalanced"
    print(f"{verb}: {total} questions")
    return 0


if __name__ == "__main__":
    sys.exit(main())
