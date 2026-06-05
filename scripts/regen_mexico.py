#!/usr/bin/env python3
"""Regen mexico ciencias with NEW system prompt (inline feedback + pedagogic explanations)."""
import aiohttp, asyncio, json, sys
from pathlib import Path

BASE = Path(__file__).parent.parent
QUEUE = BASE / ".worldexams" / "generation" / "queue.json"
SYSPROMPT = BASE / ".worldexams" / "generation" / "system-prompt.md"
API_KEY = "sk-wMepzFhQrFxfq0RsKIM7fp3gPWftUL18E71lAq6rrqRDoFXLsHOI2HGxWINiaUmi"
API_BASE = "https://opencode.ai/zen/go/v1"

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

async def regen(task_id, model="minimax-m2.7"):
    sp = SYSPROMPT.read_text(encoding="utf-8") if SYSPROMPT.exists() else ""
    prompt = f"{sp}\n\nGenera un bundle de 20 preguntas MASTERY para:\nPais: mexico\nAsignatura: ciencias-naturales\nGrado: 11\nPeriodo: 1\nTema: biologia\n\nCRITICAL: Each option MUST have inline HTML feedback comment. Include Explicacion Pedagogica section in Spanish. No raw thinking text."
    
    print(f"Regenerating {task_id} with {model}...")
    
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    payload = {"model": model, "messages": [{"role": "user", "content": prompt}], "max_tokens": 8000, "temperature": 0.7}
    
    async with aiohttp.ClientSession() as session:
        for attempt in range(3):
            try:
                async with session.post(f"{API_BASE}/chat/completions", headers=headers, json=payload,
                                         timeout=aiohttp.ClientTimeout(total=600)) as resp:
                    if resp.status == 200:
                        data = await resp.json()
                        content = data["choices"][0]["message"]["content"]
                        
                        # Check it has inline feedback
                        has_feedback = "<!-- feedback:" in content
                        has_pedagog = "Explicaci" in content or "explicaci" in content
                        
                        if len(content) < 1000:
                            print(f"  Too short ({len(content)} chars), retry {attempt+1}")
                            await asyncio.sleep(5)
                            continue
                        
                        if not has_feedback:
                            print(f"  Missing inline feedback, retry {attempt+1}")
                            await asyncio.sleep(5)
                            continue
                        
                        # Save
                        outdir = BASE / "questions_data" / "mexico" / "ciencias-naturales" / "grado-11" / "periodo-1" / "biologia"
                        outdir.mkdir(parents=True, exist_ok=True)
                        outpath = outdir / f"{task_id}-MASTERY-bundle.md"
                        outpath.write_text(content, encoding="utf-8")
                        print(f"  Saved: {outpath} ({len(content)} chars)")
                        print(f"  Has feedback: {has_feedback} | Has pedagogic: {has_pedagog}")
                        
                        # Update queue
                        with open(QUEUE, "r", encoding="utf-8") as f:
                            q = json.load(f)
                        for t in q["tasks"]:
                            if t["id"] == task_id:
                                t["status"] = "completed"
                                t["outputPath"] = str(outpath)
                                t.pop("error", None)
                        with open(QUEUE, "w", encoding="utf-8") as f:
                            json.dump(q, f, indent=2, ensure_ascii=False)
                        print(f"  Done!")
                        return True
                    else:
                        err = await resp.text()
                        print(f"  Status {resp.status}: {err[:200]}")
                        await asyncio.sleep(10)
            except Exception as e:
                print(f"  Error: {e}")
                await asyncio.sleep(10)
    
    print(f"  FAILED after 3 attempts")
    return False

async def main():
    success = await regen("mexico-ciencias-naturales-11-P1-biologia-2")
    if success:
        print(f"\nMexico bundle regenerated with correct format!")
        # Verify
        with open("questions_data/mexico/ciencias-naturales/grado-11/periodo-1/biologia/mexico-ciencias-naturales-11-P1-biologia-2-MASTERY-bundle.md", "r", encoding="utf-8") as f:
            c = f.read()
        q = c.count("<!-- feedback:")
        p = 1 if "Explicaci" in c else 0
        print(f"Total inline feedbacks: {q} (expected 80 = 20q * 4options)")
        print(f"Has pedagogic sections: {p}")
    else:
        print(f"\nFAILED to regenerate")

if __name__ == "__main__":
    asyncio.run(main())
