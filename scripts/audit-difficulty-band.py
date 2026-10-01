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
import sys
from collections import Counter

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT = os.path.join(REPO, "questions_data")

HEAD = re.compile(r"^## Question \d+ \[([A-Z0-9\-]+)\]")
BAND = re.compile(r'difficulty_band:\s*"?([A-Z0-9\-]+)')


def nums(text):
    # "D10" is difficulty ten, not difficulty one followed by a zero. A naive
    # D(\d) capture turns D3-D10 into (1, 3) and then every D3-D4 question looks
    # like it exceeds the band.
    return [int(n) for n in re.findall(r"D(\d+)", text or "")]


def main():
    files = []
    for dirpath, _, names in os.walk(ROOT):
        files.extend(os.path.join(dirpath, n) for n in names if n.endswith(".md"))

    total = 0
    no_band = 0
    per_bundle = Counter()
    detail = {}
    for path in files:
        with open(path, encoding="utf-8", errors="ignore") as fh:
            lines = fh.readlines()
        band = None
        heads = []
        for line in lines:
            if band is None:
                m = BAND.search(line)
                if m:
                    n = nums(m.group(1))
                    if n:
                        band = (min(n), max(n))
            m = HEAD.match(line)
            if m:
                heads.append(m.group(1))
        if band is None:
            no_band += 1
            continue
        total += len(heads)
        out = 0
        for label in heads:
            n = nums(label)
            if n and (min(n) < band[0] or max(n) > band[1]):
                out += 1
        if out:
            rel = os.path.relpath(path, REPO)
            per_bundle[rel] = out
            detail[rel] = (out, len(heads), heads)

    print(f"bundles scanned      : {len(files)}")
    print(f"bundles without band : {no_band}")
    print(f"questions with header: {total}")
    print(f"bundles out of band  : {len(per_bundle)}")
    print(f"questions out of band: {sum(per_bundle.values())}")
    print()
    for rel, n in per_bundle.most_common(15):
        out, heads, labels = detail[rel]
        bandtxt = "?"
        with open(os.path.join(REPO, rel), encoding="utf-8", errors="ignore") as fh:
            for line in fh:
                m = BAND.search(line)
                if m:
                    bandtxt = m.group(1)
                    break
        band_nums = nums(bandtxt)
        bad = sorted(
            {
                l
                for l in labels
                if nums(l) and band_nums and (min(nums(l)) < min(band_nums) or max(nums(l)) > max(band_nums))
            }
        )
        print(f"  {out:>3}/{heads:<3} band={bandtxt:<8} {rel.split('/')[-1][:44]}")
        print(f"        offending labels: {', '.join(bad)}")


if __name__ == "__main__":
    sys.exit(main())
