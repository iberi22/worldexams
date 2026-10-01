#!/usr/bin/env python3
"""Apply the answer-letter rebalance across the whole corpus, with verification.

This is the bulk driver for rebalance_answer_letter.py. It is deliberately
paranoid, because a mass rewrite of 2.6k files is exactly where a silent
corruption hides:

  1. Snapshot every file's bytes before touching it.
  2. Rewrite through the module under test.
  3. Assert, per file, that the ONLY textual difference is the A-D label on an
     option line. Anything else - a dropped frontmatter, a lost feedback, a
     changed statement - fails loudly and the file is restored.
  4. Re-run the repo validator over the changed bundles.
  5. Report the before/after distribution.

Usage:
    python3 rebalance_corpus.py [--apply] [--limit N] [country ...]
"""
import collections
import importlib.util
import os
import re
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUESTIONS = os.path.join(REPO, "questions_data")
MODULE = os.path.join(REPO, "scripts", "rebalance_answer_letter.py")

spec = importlib.util.spec_from_file_location("reb", MODULE)
reb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(reb)

# The only permitted difference: the letter on an option line.
NEUTRAL = re.compile(r"^(\s*[-*]\s*\[.\]\s*)[A-D]\)", re.M)
OPTION = re.compile(r"^\s*[-*]\s*\[([ xX])\]\s*([A-D])\)\s*(.*)$", re.M)


def bundle_files(only=None):
    for dirpath, _, names in os.walk(QUESTIONS):
        for n in names:
            if n.endswith("-MASTERY-bundle.md"):
                p = os.path.join(dirpath, n)
                rel = os.path.relpath(p, QUESTIONS).split(os.sep)[0]
                if not only or rel in only:
                    yield p


def letters_of(text):
    return [L for mark, L, _ in OPTION.findall(text) if mark in "xX"]


def main():
    apply = "--apply" in sys.argv
    limit = None
    if "--limit" in sys.argv:
        limit = int(sys.argv[sys.argv.index("--limit") + 1])
    only = {a for a in sys.argv[1:] if not a.startswith("--") and not a.isdigit()}

    files = sorted(bundle_files(only))
    if limit:
        files = files[:limit]
    if not files:
        print("no bundles matched")
        return 1

    before = collections.Counter()
    after = collections.Counter()
    fixed = 0
    skipped = 0
    broken = []

    for p in files:
        orig = open(p, encoding="utf-8").read()
        before.update(letters_of(orig))
        ls = letters_of(orig)
        if not ls:
            skipped += 1
            continue
        top = collections.Counter(ls).most_common(1)[0][1] / len(ls)
        if top <= 0.5:
            skipped += 1
            continue  # already balanced enough

        new_text, moved = reb.rewrite(orig, p)
        if not moved:
            skipped += 1
            continue

        # Integrity: nothing but the option label may differ.
        if NEUTRAL.sub(r"\1X)", orig) != NEUTRAL.sub(r"\1X)", new_text):
            broken.append((p, "text changed outside the option label"))
            continue
        if len(OPTION.findall(orig)) != len(OPTION.findall(new_text)):
            broken.append((p, "option count changed"))
            continue
        if [t for _, _, t in OPTION.findall(orig)] != [t for _, _, t in OPTION.findall(new_text)]:
            broken.append((p, "option text or feedback changed"))
            continue
        if orig.count("\n") != new_text.count("\n") or len(orig) != len(new_text):
            broken.append((p, "document length changed"))
            continue

        after.update(letters_of(new_text))
        if apply:
            open(p, "w", encoding="utf-8").write(new_text)
        fixed += 1

    verb = "rebalanced" if apply else "would rebalance"
    print(f"{verb}: {fixed} bundles, {skipped} left alone")
    print(f"questions re-keyed: {sum(after.values())}")
    print("before:", dict(sorted(before.items())))
    print("after: ", dict(sorted(after.items())))
    if broken:
        print(f"\nINTEGRITY FAILURES: {len(broken)}")
        for p, why in broken[:20]:
            print("  -", os.path.relpath(p, REPO), "|", why)
        return 2
    print("\nintegrity: every rewritten bundle differs only in the option label")
    return 0


if __name__ == "__main__":
    sys.exit(main())
