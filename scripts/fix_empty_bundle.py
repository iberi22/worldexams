#!/usr/bin/env python3
"""Regenerate a single empty bundle using minimax-m2.7 specifically."""
import aiohttp, asyncio, json, sys, os
from pathlib import Path

BASE = Path(__file__).parent.parent
QUEUE = BASE / ".worldexams" / "generation" / "queue.json"
SYSPROMPT = BASE / ".worldexams" / "generation" / "system-prompt.md"
API_KEY = os.environ.get("OPENCODE_API_KEY", "")
API_BASE = "https://opencode.ai/zen/go/v1"
MODEL = "minimax-m2.7"

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

async def regenerate(task_id):
    with open(QUEUE, 'r', encoding='utf-8') as f:
        q = json.load(f)

    task = None
    for t in q["tasks"]:
        if t["id"] == task_id:
            task = t
            break
    if not task:
        print(f"Task {task_id} not found")
        return

    print(f"Regenerating: {task_id} with {MODEL}")
    
    sp = SYSPROMPT.read_text(encoding="utf-8") if SYSPROMPT.exists() else ""
    prompt = f"{sp}\n\nGenera un bundle MASTERY para:\nPais: {task['country']}\nAsignatura: {task['subject']}\nGrado: {task['grado']}\nPeriodo: {task.get('periodo',1)}\nTema: {task['topic']}\n20 preguntas, Protocol v5.1."

    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    payload = {"model": MODEL, "messages": [{"role": "user", "content": prompt}], "max_tokens": 8000, "temperature": 0.7}

    async with aiohttp.ClientSession() as session:
        for attempt in range(3):
            try:
                async with session.post(f"{API_BASE}/chat/completions", headers=headers, json=payload,
                                         timeout=aiohttp.ClientTimeout(total=300)) as resp:
                    if resp.status == 200:
                        data = await resp.json()
                        content = data["choices"][0]["message"]["content"]
                        if len(content) < 100:
                            print(f"  Too short ({len(content)} chars), retry {attempt+1}")
                            continue
                        # Save
                        outdir = BASE / "questions_data" / task["country"] / task["subject"] / f"grado-{task['grado']}" / f"periodo-{task.get('periodo',1)}" / task["topic"]
                        outdir.mkdir(parents=True, exist_ok=True)
                        outpath = outdir / f"{task_id}-MASTERY-bundle.md"
                        outpath.write_text(content, encoding="utf-8")
                        print(f"  Saved: {outpath} ({len(content)} chars)")

                        # Update queue
                        for t in q["tasks"]:
                            if t["id"] == task_id:
                                t["status"] = "completed"
                                t["completedAt"] = asyncio.__dict__.get("__name__", "")
                                t["outputPath"] = str(outpath)
                        with open(QUEUE, "w", encoding="utf-8") as f:
                            json.dump(q, f, indent=2, ensure_ascii=False)
                        print(f"  Done!")
                        return
                    else:
                        err = await resp.text()
                        print(f"  Status {resp.status}: {err[:200]}")
                        await asyncio.sleep(5)
            except Exception as e:
                print(f"  Error: {e}")
                await asyncio.sleep(5)

    print(f"  FAILED after 3 attempts")

if __name__ == "__main__":
    asyncio.run(regenerate("mexico-matematicas-11-P1-algebra-2"))
