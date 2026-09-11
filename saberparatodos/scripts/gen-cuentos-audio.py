#!/usr/bin/env python3
"""Batch narration audio for cuentos (edge-tts, free).
Voice default: es-MX-DaliaNeural (warm, neutral). Alternative: es-CO-SalomeNeural.
Usage: python3 scripts/gen-cuentos-audio.py [--voice=X] [--slug=Y]
Output: saberparatodos/public/audio/cuentos/<slug>/p<N>.mp3
"""
import re, subprocess, sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
CUENTOS = REPO / "questions_data" / "cuentos"
OUTBASE = REPO / "saberparatodos" / "public" / "audio" / "cuentos"
VOICE = "es-MX-DaliaNeural"
RATE = "-5%"

args = sys.argv[1:]
for i, a in enumerate(args):
    if a.startswith("--voice="):
        VOICE = a.split("=", 1)[1]
    if a == "--slug" and i + 1 < len(args):
        only = args[i + 1]
    elif a.startswith("--slug="):
        only = a.split("=", 1)[1]

only = locals().get("only", None)

def page_texts(md: str):
    blocks = re.split(r"^## Pagina \d+\n", md, flags=re.M)[1:]
    out = []
    for b in blocks:
        body = b.split("\n## ")[0]
        body = re.sub(r"!\[alt:[^\]]*\]\([^)]*\)", "", body)
        body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
        out.append(" ".join(body.split()))
    return out

count = 0
for d in sorted(CUENTOS.iterdir()):
    if not d.is_dir() or (only and d.name != only):
        continue
    md = d / "cuento.md"
    if not md.exists():
        continue
    for n, text in enumerate(page_texts(md.read_text()), 1):
        if len(text.split()) < 5:
            continue
        out = OUTBASE / d.name / f"p{n}.mp3"
        out.parent.mkdir(parents=True, exist_ok=True)
        if out.exists() and out.stat().st_size > 1000:
            continue
        r = subprocess.run(
            ["uv", "tool", "run", "--from", "edge-tts", "edge-tts",
             "--voice", VOICE, f"--rate={RATE}", "--text", text,
             "--write-media", str(out)],
            capture_output=True, text=True, timeout=120,
        )
        if r.returncode != 0 or not out.exists():
            print(f"FAIL {d.name} p{n}: {r.stderr[-200:]}")
        else:
            count += 1
            print(f"OK {d.name} p{n} ({out.stat().st_size // 1024} KB)")
print(f"TOTAL: {count} archivos, voz={VOICE}")
