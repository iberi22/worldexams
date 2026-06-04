#!/usr/bin/env python3
"""Regenerate 4 problematic bundles with higher token limits and specific prompts."""
import aiohttp, asyncio, json, sys
from pathlib import Path

BASE = Path(__file__).parent.parent
QUEUE = BASE / ".worldexams" / "generation" / "queue.json"
SYSPROMPT = BASE / ".worldexams" / "generation" / "system-prompt.md"
API_KEY = "sk-wMepzFhQrFxfq0RsKIM7fp3gPWftUL18E71lAq6rrqRDoFXLsHOI2HGxWINiaUmi"
API_BASE = "https://opencode.ai/zen/go/v1"

# Tasks to regenerate with specific constraints
TASKS = [
    {
        "id": "chile-matematicas-11-P1-algebra-1",
        "model": "minimax-m2.7",
        "instruction": "Genera UN bundle COMPLETO de 20 preguntas MASTERY para Chile, Matemáticas Grado 11, Periodo 1, Álgebra. Protocol v5.1. NO te detengas hasta tener las 20 preguntas completas. NO incluyas explicaciones previas ni razonamiento. Empieza DIRECTAMENTE con el YAML frontmatter. NO saltes ninguna pregunta. 20 PREGUNTAS COMPLETAS."
    },
    {
        "id": "peru-ciencias-naturales-11-P1-biologia-1",
        "model": "minimax-m2.7",
        "instruction": "Genera UN bundle COMPLETO de 20 preguntas MASTERY para Perú, Ciencias Naturales Grado 11, Periodo 1, Biología. Protocol v5.1. EXACTAMENTE 20 preguntas completas con 4 opciones cada una. Empieza con --- YAML frontmatter ---. NO incluyas JSON, ni explicaciones, ni razonamiento previo. Solo el bundle markdown."
    },
    {
        "id": "peru-matematicas-11-P2-trigonometria-1",
        "model": "minimax-m2.7",
        "instruction": "Genera un bundle COMPLETO de 20 preguntas MASTERY para Perú, Matemáticas Grado 11, Periodo 2, Trigonometría. Protocol v5.1. Las 20 preguntas con 4 opciones y explicación pedagógica cada una. Arranca DIRECTAMENTE con ---YAML--- No expliques ni pienses en voz alta. SOLO el bundle."
    },
    {
        "id": "brazil-ciencias-naturales-11-P1-ciencias-natureza-1",
        "model": "minimax-m2.7",
        "instruction": "Gere um bundle COMPLETO de 20 questoes MASTERY para Brasil, Ciencias da Natureza, Grado 11, Periodo 1. Protocol v5.1. Idioma: PORTUGUES BRASILEIRO. 20 questoes completas com 4 opcoes cada. Use acentos e caracteres UTF-8 corretamente (não substitua por '?'). Comece COM ---YAML frontmatter---. Nao inclua raciocinio, apenas o bundle."
    }
]

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

async def regenerate(task_spec):
    task_id = task_spec["id"]
    model = task_spec["model"]
    instruction = task_spec["instruction"]
    
    # Build prompt
    sp = SYSPROMPT.read_text(encoding="utf-8") if SYSPROMPT.exists() else ""
    prompt = f"{sp}\n\n{instruction}"
    
    print(f"\n[{task_id}] Regenerating with {model}...")
    
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    payload = {"model": model, "messages": [{"role": "user", "content": prompt}], "max_tokens": 16000, "temperature": 0.6}
    
    async with aiohttp.ClientSession() as session:
        for attempt in range(3):
            try:
                async with session.post(f"{API_BASE}/chat/completions", headers=headers, json=payload,
                                         timeout=aiohttp.ClientTimeout(total=300)) as resp:
                    if resp.status == 200:
                        data = await resp.json()
                        content = data["choices"][0]["message"]["content"]
                        if len(content) < 500:
                            print(f"  Too short ({len(content)} chars), retry {attempt+1}")
                            await asyncio.sleep(5)
                            continue
                        
                        # Save to output dir - figure out path from queue
                        with open(QUEUE, "r", encoding="utf-8") as f:
                            q = json.load(f)
                        
                        task_data = None
                        outpath = None
                        for t in q["tasks"]:
                            if t["id"] == task_id:
                                task_data = t
                                # Determine output path
                                country = t.get("country", "peru")
                                subject = t.get("subject", "matematicas")
                                grado = t.get("grado", 11)
                                periodo = t.get("periodo", 1)
                                topic = t.get("topic", "algebra")
                                
                                country_map = {"peru": "peru", "chile": "chile", "brazil": "brasil"}
                                cdir = country_map.get(country, country)
                                
                                outdir = BASE / "questions_data" / cdir / subject / f"grado-{grado}" / f"periodo-{periodo}" / topic.replace(" ", "-")
                                outdir.mkdir(parents=True, exist_ok=True)
                                outpath = outdir / f"{task_id}-MASTERY-bundle.md"
                                break
                        
                        if outpath:
                            outpath.write_text(content, encoding="utf-8")
                            print(f"  Saved: {outpath} ({len(content)} chars)")
                            
                            # Update queue
                            for t in q["tasks"]:
                                if t["id"] == task_id:
                                    t["status"] = "completed"
                                    t["completedAt"] = "2026-06-02T17:00:00"
                                    t["outputPath"] = str(outpath)
                                    t.pop("error", None)
                            with open(QUEUE, "w", encoding="utf-8") as f:
                                json.dump(q, f, indent=2, ensure_ascii=False)
                            print(f"  Done!")
                            return True
                        else:
                            print(f"  Task {task_id} not found in queue")
                            return False
                    else:
                        err = await resp.text()
                        print(f"  Status {resp.status}: {err[:200]}")
                        await asyncio.sleep(10)
            except Exception as e:
                print(f"  Error: {e}")
                await asyncio.sleep(10)
    
    # Mark as failed
    with open(QUEUE, "r", encoding="utf-8") as f:
        q = json.load(f)
    for t in q["tasks"]:
        if t["id"] == task_id:
            t["status"] = "failed"
            t.setdefault("error", []).append("Failed after 3 regeneration attempts")
    with open(QUEUE, "w", encoding="utf-8") as f:
        json.dump(q, f, indent=2, ensure_ascii=False)
    print(f"  FAILED after 3 attempts")
    return False

async def main():
    print("Regenerating 4 problematic bundles...")
    results = await asyncio.gather(*[regenerate(t) for t in TASKS])
    successes = sum(1 for r in results if r)
    print(f"\nResults: {successes}/{len(TASKS)} regenerated")
    
    # Final status
    with open(QUEUE, "r", encoding="utf-8") as f:
        q = json.load(f)
    pending = [t for t in q["tasks"] if t["status"] == "pending"]
    failed = [t for t in q["tasks"] if t["status"] == "failed"]
    completed = [t for t in q["tasks"] if t["status"] == "completed"]
    print(f"Queue: {len(completed)} completed, {len(pending)} pending, {len(failed)} failed")

if __name__ == "__main__":
    asyncio.run(main())
