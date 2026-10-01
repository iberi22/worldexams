#!/usr/bin/env python3
"""Audit difficulty labels against calibration.difficulty_band.

Reports, it does not enforce. And the reason it does not enforce is the
interesting part.

`calibration.difficulty_band` is where the bundle STARTS, not a ceiling. 2,699 of
2,718 bundles carry a deliberate ladder -- D3-D4, D5-D6, D7-D8, D9-D10 -- so a
rule that required every question label to sit inside the band would reject
almost the whole corpus. A subagent regenerated 20 bundles under the belief that
it was a ceiling, put D5-D6 labels in a D3-D4 band, and caught itself only by
writing this check by hand. The validator has never tested it.

So the output is a census, for whoever decides the policy:

    python3 scripts/audit-difficulty-band.py

Reading the band as a ceiling finds ~20,061 questions in 1,956 bundles, and
that number is not a defect list -- it is the ladder doing what it was built to
do. 338 bundles declare the wider D3-D10 band and come out clean under the same
test, which is the proof that the audit works: D3-D4 sits inside D3-D10.

Written line by line rather than with a whole-file regex so that a "[D5-D6]"
quoted inside an explanation cannot inflate the count.
"""
import os
import re

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT = os.path.join(REPO, "questions_data")

HEAD = re.compile(r"^## Question \d+ \[([A-Z0-9\-]+)\]")
BAND = re.compile(r'difficulty_band:\s*"?([A-Z0-9\-]+)')


def span(text):
    """Difficulty range as (low, high), or None when there is no D-number.

    "D10" is difficulty ten, not difficulty one followed by a zero. A naive
    D(\\d) capture turns D3-D10 into (1, 3), and then every D3-D4 question looks
    like it exceeds the band -- 43,712 false violations, once.
    """
    n = [int(x) for x in re.findall(r"D(\d+)", text or "")]
    return (min(n), max(n)) if n else None


def scan(path):
    """Return (band_text, band, labels); band is None when none is declared."""
    text, band, labels = "?", None, []
    with open(path, encoding="utf-8", errors="ignore") as fh:
        for line in fh:
            if band is None and (m := BAND.search(line)):
                if band := span(m.group(1)):
                    text = m.group(1)
            if m := HEAD.match(line):
                labels.append(m.group(1))
    return text, band, labels


def outside(label, band):
    """True when the label's difficulty range escapes the declared band."""
    other = span(label)
    return other is not None and (other[0] < band[0] or other[1] > band[1])


def main():
    files = [os.path.join(d, n) for d, _, ns in os.walk(ROOT) for n in ns if n.endswith(".md")]

    total = no_band = 0
    offenders = []  # (questions outside, path, band text, labels)
    for path in files:
        text, band, labels = scan(path)
        if band is None:
            no_band += 1
            continue
        total += len(labels)
        bad = [l for l in labels if outside(l, band)]
        if bad:
            offenders.append((len(bad), path, text, labels))

    print(f"bundles scanned      : {len(files)}")
    print(f"bundles without band : {no_band}")
    print(f"questions with header: {total}")
    print(f"bundles out of band  : {len(offenders)}")
    print(f"questions out of band: {sum(c for c, *_ in offenders)}")
    print()
    for count, path, text, labels in sorted(offenders, key=lambda t: -t[0])[:15]:
        rel = os.path.relpath(path, REPO)
        distinct = sorted({l for l in labels if outside(l, span(text))})
        print(f"  {count:>3}/{len(labels):<3} band={text:<8} {rel.split('/')[-1][:44]}")
        print(f"        offending labels: {', '.join(distinct)}")


if __name__ == "__main__":
    main()
