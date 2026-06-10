#!/usr/bin/env python3
"""
WorldExams Generation Pipeline v2 - OpenCode Gateway
Replaces MiniMax with OpenCode API (DeepSeek V4 Flash / GLM / Kimi)
"""
import argparse, asyncio, json, os, sys, time, re, traceback
from datetime import datetime, timezone
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
QUEUE_FILE = BASE_DIR / ".worldexams" / "generation" / "queue.json"
LOCK_FILE = BASE_DIR / ".worldexams" / "generation" / "queue.json.lock"
SYSTEM_PROMPT_FILE = BASE_DIR / ".worldexams" / "generation" / "system-prompt.md"
QUESTIONS_DATA = BASE_DIR / "questions_data"

API_KEY = "sk-wMepzFhQrFxfq0RsKIM7fp3gPWftUL18E71lAq6rrqRDoFXLsHOI2HGxWINiaUmi"
API_BASE = "https://opencode.ai/zen/go/v1"

MODELS = [
    "deepseek-v4-flash",
    "glm-5.1",
    "kimi-k2.6",
    "minimax-m2.7",
]

CONCURRENT_TASKS = 1
REQUEST_TIMEOUT = 300

def load_queue():
    with open(QUEUE_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_queue(queue):
    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        json.dump(queue, f, indent=2, ensure_ascii=False)

def load_system_prompt():
    if SYSTEM_PROMPT_FILE.exists():
        return SYSTEM_PROMPT_FILE.read_text(encoding="utf-8")
    return ""

def get_pending_tasks(queue, limit=None):
    pending = [t for t in queue["tasks"] if t["status"] == "pending"]
    if limit:
        pending = pending[:limit]
    return pending

def claim_tasks(queue, task_ids):
    claimed = []
    for task in queue["tasks"]:
        if task["id"] in task_ids and task["status"] == "pending":
            task["status"] = "running"
            task["startedAt"] = datetime.now(timezone.utc).isoformat()
            claimed.append(dict(task))
    save_queue(queue)
    return claimed

def mark_completed(queue, task_id, output_path):
    for task in queue["tasks"]:
        if task["id"] == task_id:
            task["status"] = "completed"
            task["completedAt"] = datetime.now(timezone.utc).isoformat()
            task["outputPath"] = str(output_path)
            break
    save_queue(queue)

def mark_failed(queue, task_id, error):
    for task in queue["tasks"]:
        if task["id"] == task_id:
            task["status"] = "failed"
            task.setdefault("error", [])
            task["error"].append(str(error))
            break
    save_queue(queue)

def build_prompt(task, system_prompt):
    """Build a generation prompt for the task."""
    subject = task.get("subject", "matematicas")
    grado = task.get("grado", 11)
    periodo = task.get("periodo", 1)
    topic = task.get("topic", "algebra")
    country = task.get("country", "colombia")

    # Country metadata
    meta = {
        "colombia": {"label": "Colombia", "code": "CO", "exam": "ICFES Saber 11", "curriculum": "DBA MEN", "dir": "Preguntas de opcion multiple estilo ICFES"},
        "mexico": {"label": "Mexico", "code": "MX", "exam": "EXANI-II", "curriculum": "SEP", "dir": "Preguntas de opcion multiple estilo EXANI-II"},
        "argentina": {"label": "Argentina", "code": "AR", "exam": "Aprender", "curriculum": "NAP", "dir": "Preguntas de opcion multiple estilo Aprender"},
        "newzealand": {"label": "New Zealand", "code": "NZ", "exam": "NCEA", "curriculum": "NZC", "dir": "Multiple-choice questions in English for NCEA preparation"},
        "southafrica": {"label": "South Africa", "code": "ZA", "exam": "NSC Matric", "curriculum": "CAPS", "dir": "Multiple-choice questions in English for NSC Matric preparation"},
    }
    m = meta.get(country, {"label": country, "code": "XX", "exam": "Standard", "curriculum": "National", "dir": "Multiple-choice questions"})

    prompt_parts = []
    if system_prompt and country in ("colombia", "mexico", "argentina"):
        prompt_parts.append(system_prompt)
        prompt_parts.append("\n\n")
    elif country in ("newzealand", "southafrica"):
        prompt_parts.append("# MASTERY Bundle Generator\n")
        prompt_parts.append("## Bundle Rules\n")
        prompt_parts.append("- EXACTLY 20 questions per bundle\n")
        prompt_parts.append("- 4 options per question (A, B, C, D)\n")
        prompt_parts.append("- Use [x] to mark correct answer\n")
        prompt_parts.append("- Difficulty: D3-D4 (Q1-4), D5-D6 (Q5-10), D7-D8 (Q11-16), D9-D10 (Q17-20)\n")
        prompt_parts.append("- All 4 options must be PLAUSIBLE\n")
        prompt_parts.append("- Write ALL questions in English\n")
        prompt_parts.append("- Frontmatter YAML with id, country, grade, subject, topic, periodo\n\n")
    elif system_prompt:
        prompt_parts.append(system_prompt)
        prompt_parts.append("\n\n")

    prompt_parts.append(f"Generate a MASTERY bundle for:\n")
    prompt_parts.append(f"- Country: {m['label']}\n")
    prompt_parts.append(f"- Curriculum: {m['curriculum']}\n")
    prompt_parts.append(f"- Exam: {m['exam']}\n")
    prompt_parts.append(f"- Subject: {subject}\n")
    prompt_parts.append(f"- Grade: {grado}\n")
    prompt_parts.append(f"- Period: {periodo}\n")
    prompt_parts.append(f"- Topic: {topic}\n")
    prompt_parts.append(f"\n{m['dir']}.\n")
    prompt_parts.append(f"Protocol v5.2. Generate EXACTLY 20 questions. Use code {m['code']}.\n")

    return "".join(prompt_parts)

def get_output_path(task):
    """Determine output file path."""
    country = task.get("country", "colombia")
    subject = task.get("subject", "matematicas")
    grado = task.get("grado", 11)
    periodo = task.get("periodo", 1)
    topic = task.get("topic", "algebra")
    task_id = task.get("id", "unknown")

    # Map country names to directory codes
    country_map = {
        "colombia": "colombia", "mexico": "mexico", "argentina": "argentina",
        "chile": "chile", "peru": "peru", "ecuador": "ecuador",
        "brazil": "brasil", "guatemala": "gt", "panama": "pa",
        "spain": "es", "dominican": "do",
        "newzealand": "newzealand", "southafrica": "southafrica",
    }
    country_dir = country_map.get(country, country)

    base = QUESTIONS_DATA / country_dir
    if country == "colombia":
        path = base / subject / f"grado-{grado}" / f"periodo-{periodo}" / topic
    elif country in ("brazil",):
        path = base / subject / f"grado-{grado}" / f"periodo-{periodo}" / topic
    else:
        path = base / subject / f"grado-{grado}" / f"periodo-{periodo}" / topic

    path.mkdir(parents=True, exist_ok=True)
    return path / f"{task_id}-MASTERY-bundle.md"

async def call_model(session, prompt, model_idx=0):
    """Call OpenCode API with model rotation on failure."""
    import aiohttp

    for attempt in range(len(MODELS)):
        model_idx_actual = (model_idx + attempt) % len(MODELS)
        model = MODELS[model_idx_actual]

        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 8000,
            "temperature": 0.7,
        }

        url = f"{API_BASE}/chat/completions"
        try:
            async with session.post(url, headers=headers, json=payload,
                                     timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT)) as resp:
                status = resp.status
                if status == 200:
                    data = await resp.json()
                    content = data["choices"][0]["message"]["content"]
                    print(f"   {model} success ({len(content)} chars)")
                    return content
                elif status == 429:
                    wait_time = 10 * (attempt + 1)
                    print(f"   Rate limited on {model}, waiting {wait_time}s...")
                    await asyncio.sleep(wait_time)
                    continue
                else:
                    error_text = await resp.text()
                    print(f"   {model} status {status}: {error_text[:100]}")
                    continue
        except asyncio.TimeoutError:
            print(f"   Timeout on {model}, trying next model...")
            continue
        except Exception as e:
            print(f"   Error on {model}: {str(e)[:100]}")
            continue

    raise Exception(f"All models failed after {len(MODELS)} attempts")

async def call_model_with_retry(session, prompt, model_idx=0, max_global_retries=3):
    """Call model with global retry + exponential backoff on rate limits."""
    for attempt in range(max_global_retries + 1):
        try:
            return await call_model(session, prompt, model_idx)
        except Exception as e:
            if attempt < max_global_retries:
                wait = 15 * (attempt + 1)
                print(f"   Global retry {attempt+1}/{max_global_retries} after {wait}s...")
                await asyncio.sleep(wait)
            else:
                raise

async def process_task(task, semaphore, model_idx):
    """Process a single generation task."""
    async with semaphore:
        task_id = task["id"]
        print(f"\n   Processing: {task_id}")

        system_prompt = load_system_prompt()
        prompt = build_prompt(task, system_prompt)
        output_path = get_output_path(task)

        import aiohttp
        async with aiohttp.ClientSession() as session:
            try:
                content = await call_model_with_retry(session, prompt, model_idx)
                output_path.write_text(content, encoding="utf-8")
                queue = load_queue()
                mark_completed(queue, task_id, output_path)
                print(f"   Done: {task_id} -> {output_path.name}")
                return True
            except Exception as e:
                queue = load_queue()
                mark_failed(queue, task_id, str(e))
                print(f"   Failed: {task_id} - {str(e)[:100]}")
                return False

async def run_batch(tasks):
    """Run tasks concurrently."""
    semaphore = asyncio.Semaphore(CONCURRENT_TASKS)
    results = await asyncio.gather(
        *[process_task(task, semaphore, i % len(MODELS)) for i, task in enumerate(tasks)],
        return_exceptions=True
    )
    successes = sum(1 for r in results if r is True)
    failures = sum(1 for r in results if r is False)
    return successes, failures

def reset_failed():
    """Reset all failed/running tasks to pending."""
    queue = load_queue()
    reset_count = 0
    for task in queue["tasks"]:
        if task["status"] in ("failed", "running"):
            task["status"] = "pending"
            task.pop("error", None)
            task.pop("startedAt", None)
            task.pop("completedAt", None)
            task.pop("outputPath", None)
            reset_count += 1
    save_queue(queue)
    print(f" Reset {reset_count} tasks to pending")

def show_status():
    queue = load_queue()
    tasks = queue["tasks"]
    pending = [t for t in tasks if t["status"] == "pending"]
    running = [t for t in tasks if t["status"] == "running"]
    completed = [t for t in tasks if t["status"] == "completed"]
    failed = [t for t in tasks if t["status"] == "failed"]

    print("\n[QUEUE STATUS]")
    print(f"   Pending:    {len(pending)}")
    print(f"   Running:    {len(running)}")
    print(f"   Completed:  {len(completed)}")
    print(f"   Failed:     {len(failed)}")
    if failed:
        print(f"\n   Failed tasks (first 5):")
        for t in failed[:5]:
            err = t.get("error", ["N/A"])
            print(f"     - {t['id']}: {err[0][:80]}")

def main():
    parser = argparse.ArgumentParser(description="WorldExams Gateway Generator")
    parser.add_argument("--reset", action="store_true", help="Reset failed/running to pending")
    parser.add_argument("--run", action="store_true", help="Run generation tasks")
    parser.add_argument("--batch", type=int, default=10, help="Tasks per batch")
    parser.add_argument("--status", action="store_true", help="Show queue status")
    args = parser.parse_args()

    if args.status:
        show_status()
        return

    if args.reset:
        reset_failed()
        return

    if args.run:
        print("\n[Gateway Generator v2]")
        print(f"   API: {API_BASE}")
        print(f"   Models: {MODELS}")
        print(f"   Batch: {args.batch}")
        print(f"   Concurrency: {CONCURRENT_TASKS}")
        print(f"   Timeout: {REQUEST_TIMEOUT}s")

        queue = load_queue()
        pending = get_pending_tasks(queue, args.batch)
        if not pending:
            print("\n No pending tasks")
            return

        task_ids = [t["id"] for t in pending]
        print(f"\n Claiming {len(task_ids)} tasks...")
        claimed = claim_tasks(queue, task_ids)
        print(f"   Claimed: {len(claimed)}")

        print(f"\n Running batch...")
        t0 = time.monotonic()
        successes, failures = asyncio.run(run_batch(claimed))
        elapsed = time.monotonic() - t0

        print(f"\n RESULTS")
        print(f"   Success: {successes}")
        print(f"   Failures: {failures}")
        print(f"   Time: {elapsed:.1f}s")
        print(f"   Avg: {elapsed / max(successes + failures, 1):.1f}s/task")

        show_status()
        return

if __name__ == "__main__":
    main()
