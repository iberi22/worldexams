#!/usr/bin/env python3
"""
WorldExams Async Generation Pipeline
Concurrent async HTTP calls via aiohttp — 16 API calls in flight at once.
MiniMax primary, Ollama fallback. Target: 50+ tasks/hour.
"""
import argparse
import asyncio
import json
import msvcrt
import os
import random
import re
import signal
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import aiohttp
import requests

# Import normalizer
from normalize_gen import normalize_bundle
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Import validator (skill path)
SKILLS_PATH = Path(r"C:\Users\belal\clawd\skills\worldexams-validator")
if SKILLS_PATH.exists():
    sys.path.insert(0, str(SKILLS_PATH))
    from validate_questions import QuestionValidator

    _validator = QuestionValidator()
else:
    _validator = None
    print("  ⚠️ Validator skill not found - skipping validation")


# ── Post-generation review trigger ──────────────────────────────
_REVIEW_QUEUE_FILE = WORLDEXAMS_ROOT / ".worldexams" / "generation" / "review_queue.jsonl"


def _trigger_review(bundle_path: str, subject: str = None, grado: int = None):
    """
    Queue a valid bundle for deep review via worldexams-question-reviewer skill.
    Writes bundle path to a queue file that the main agent picks up for sessions_spawn.
    Also spawns review_bundles.py async for immediate best-effort review.
    """
    import subprocess
    import threading

    # Ensure queue directory exists
    _REVIEW_QUEUE_FILE.parent.mkdir(parents=True, exist_ok=True)

    # Extract subject and grado from bundle path if not provided
    if subject is None or grado is None:
        # Path format: .../colombia/{subject}/grado-{grado}/periodo-{N}/{topic}/{bundle_id}-bundle.md
        parts = Path(bundle_path).parts
        try:
            subj_idx = parts.index("colombia") + 1
            subject = parts[subj_idx]
            grado_part = [p for p in parts if p.startswith("grado-")]
            if grado_part:
                grado = int(grado_part[0].split("-")[1])
        except (ValueError, IndexError):
            subject = subject or "unknown"
            grado = grado or 0

    # Write to review queue (for main agent's sessions_spawn)
    queue_entry = {
        "bundle_path": bundle_path,
        "subject": subject,
        "grado": grado,
        "queued_at": datetime.now(timezone.utc).isoformat(),
    }
    with open(_REVIEW_QUEUE_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(queue_entry, ensure_ascii=False) + "\n")
    print(f"  📋 Review queued: {Path(bundle_path).name}")

    # Also do immediate best-effort review via review_bundles.py (non-blocking)
    def _review_async():
        try:
            subprocess.run(
                [sys.executable, r"E:\scripts-python\worldexams\scripts\review_bundles.py", bundle_path],
                capture_output=True,
                text=True,
                timeout=300,
            )
        except Exception as e:
            print(f"Review async error: {e}")  # best-effort

    threading.Thread(target=_review_async, daemon=True).start()


# ── Queue lock file ──────────────────────────────────────────────
_QUEUE_LOCK_FILE = None


def _get_lock_path():
    global _QUEUE_LOCK_FILE
    if _QUEUE_LOCK_FILE is None:
        _QUEUE_LOCK_FILE = str(QUEUE_FILE) + ".lock"
    return _QUEUE_LOCK_FILE


def _acquire_file_lock(lock_path, blocking=True, retries=50, retry_delay=0.2):
    lock_dir = os.path.dirname(lock_path) or "."
    os.makedirs(lock_dir, exist_ok=True)
    fd = os.open(lock_path, os.O_RDWR | os.O_CREAT, 0o666)
    mode = msvcrt.LK_NBLCK
    if blocking:
        mode = msvcrt.LK_LOCK
    try:
        msvcrt.locking(fd, mode, 1)
        return fd
    except IOError:
        os.close(fd)
        if not blocking:
            return None
    for _ in range(int(retries)):
        time.sleep(retry_delay)
        try:
            fd = os.open(lock_path, os.O_RDWR | os.O_CREAT, 0o666)
            msvcrt.locking(fd, msvcrt.LK_NBLCK, 1)
            return fd
        except IOError:
            try:
                os.close(fd)
            except Exception as e:
                print(f"Lock release error: {e}")
    return None


def _release_file_lock(fd, lock_path):
    try:
        msvcrt.locking(fd, msvcrt.LK_UNLCK, 1)
        os.close(fd)
    except (IOError, OSError):
        try:
            os.close(fd)
        except Exception as e:
            print(f"Lock release error: {e}")


class FileLock:
    def __init__(self, lock_path, blocking=False):
        self.lock_path = lock_path
        self.blocking = blocking
        self.fd = None

    def __enter__(self):
        self.fd = _acquire_file_lock(self.lock_path, blocking=self.blocking)
        if self.fd is None and not self.blocking:
            raise BlockingIOError(f"Could not acquire lock on {self.lock_path}")
        return self

    def __exit__(self, *args):
        if self.fd is not None:
            _release_file_lock(self.fd, self.lock_path)


# ── Config ──────────────────────────────────────────────────────
sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")

WORLDEXAMS_ROOT = Path(r"E:\scripts-python\worldexams")
QUEUE_FILE = WORLDEXAMS_ROOT / ".worldexams" / "generation" / "queue.json"
API_KEY = os.environ.get("MINIMAX_API_KEY", "")

# MiniMax primary (500 RPM — we fire many concurrent requests)
API_ENDPOINTS = [
    "https://api.minimaxi.chat/v1/chat/completions",
]

# Ollama fallback (local, no rate limit)
OLLAMA_ENDPOINT = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "gemma-4-e2b-q4"

# ── Concurrency tuning ──────────────────────────────────────────
# 16 concurrent tasks → ~16x throughput vs sequential.
# At ~30-45s per task, 16 in flight → ~50+ tasks/hour sustained.
# Total batch of 300 tasks: 300/16 * 45s ≈ 14min (vs 4+ hours sequential)
CONCURRENT_TASKS = 16  # Number of simultaneous API calls
API_TIMEOUT = 120  # seconds per API call (aiohttp read timeout)
REQUEST_TIMEOUT = 180  # total request timeout

SUBJECT_LABELS = {
    "matematicas": "Matemáticas",
    "lectura-critica": "Lectura Crítica",
    "ciencias-naturales": "Ciencias Naturales",
    "sociales-ciudadanas": "Sociales Ciudadanas",
    "ingles": "Inglés",
}

_shutdown_flag: asyncio.Event | None = None


# ── Queue I/O (synchronous, file-locked) ────────────────────────


def _load_queue_raw():
    with open(QUEUE_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def _save_queue_raw(queue):
    queue["lastUpdated"] = datetime.now(timezone.utc).isoformat()
    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        json.dump(queue, f, indent=2, ensure_ascii=False)


def load_queue():
    with FileLock(_get_lock_path(), blocking=True):
        return _load_queue_raw()


def save_queue(queue):
    with FileLock(_get_lock_path(), blocking=True):
        _save_queue_raw(queue)


def update_task_status(task_id, status, output_path=None, error=None):
    """Atomically update a single task's status in the queue."""
    with FileLock(_get_lock_path(), blocking=True):
        queue = _load_queue_raw()
        for task in queue["tasks"]:
            if task["id"] == task_id:
                task["status"] = status
                task["completedAt"] = datetime.now(timezone.utc).isoformat()
                if output_path:
                    task["outputPath"] = output_path
                if error:
                    task["error"] = str(error)[:200]
                _save_queue_raw(queue)
                return
        _save_queue_raw(queue)


def get_pending_tasks(limit=None):
    """Load all pending tasks."""
    with FileLock(_get_lock_path(), blocking=True):
        queue = _load_queue_raw()
        pending = [t for t in queue["tasks"] if t["status"] == "pending"]
        if limit:
            pending = pending[:limit]
        return pending


def claim_tasks(task_ids):
    """Atomically claim tasks by marking them 'running'."""
    with FileLock(_get_lock_path(), blocking=True):
        queue = _load_queue_raw()
        claimed = []
        for task in queue["tasks"]:
            if task["id"] in task_ids and task["status"] == "pending":
                task["status"] = "running"
                claimed.append(dict(task))
        _save_queue_raw(queue)
        return claimed


# ── Prompt generation ──────────────────────────────────────────


def generate_prompt(subject, grado, periodo, topic, bundle_index):
    bundle_id = f"CO-{subject[:3].upper()}-{grado}-P{periodo}-{topic}-{str(bundle_index).zfill(3)}-MASTERY"
    subject_label = SUBJECT_LABELS.get(subject, subject)
    ts = datetime.now(timezone.utc).isoformat()

    return f"""Eres un experto en generar preguntas tipo ICFES Saber 11 para el examen de estado colombiano.

## TU TAREA
Genera EXACTAMENTE 20 preguntas de opción múltiple (A, B, C, D) tipo ICFES para la materia {subject_label}, tema {topic}, grado {grado}, periodo {periodo}.

## FORMATO DE SALIDA - Responde SOLO con el siguiente archivo markdown completo:

---
id: "{bundle_id}"
country: "colombia"
grado: {grado}
asignatura: "{subject}"
tema: "{topic}"
periodo: {periodo}
protocol_version: "5.2"
bundle_size: 20
bundle_index: {bundle_index}
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "MiniMax-M2.7"
  timestamp: "{ts}"
  prompt_version: "v3-async"
quality_status: "UNREVISED"
generation_status: "RAW"
needs_human_review: true
curation:
  human_review_required: true
  human_reviewed: false
  agent_curated: false
  community_curated: false
  community_curation_count: 0
license: "CC BY-NC-SA 4.0"
open_source: false
---

## ESTRUCTURA DE CADA PREGUNTA (usa EXACTAMENTE este formato):

## Question N (Variant Basic - Difficulty X)

**ID:** `{bundle_id}-vN`
**Bloom:** [Remember|Understand|Apply|Analyze|Evaluate|Create]
**ICFES:** [Competencia ICFES específica]
**Context:** [Contexto moderno relevante para Colombia]

### Enunciado
[Pregunta clara y completa]

### Options
- [ ] A) [Opción incorrecta]
- [ ] B) [Opción incorrecta]
- [x] C) [Opción CORRECTA] <!-- feedback: razón por la cual es correcta -->
- [ ] D) [Opción incorrecta] <!-- feedback: razón por la cual es incorrecta -->

### Explicación Pedagógica
[Explicación de por qué la respuesta es correcta y por qué los distractores son plausibles]

---

## REGLAS:
1. Dificultad progresiva: D3-D4 (preguntas 1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
2. Distractores plausibles: errores reales de estudiantes colombianos
3. Alineación ICFES: estilo real del examen Saber 11
4. Contexto colombiano moderno
5. 4 opciones obligatorias, [x] en la correcta
6. Sin "todas las anteriores" o "ninguna de las anteriores"

MATERIA: {subject_label} | Topic: {topic} | Periodo: {periodo} | Grado: {grado}

Genera las 20 preguntas. Responde SOLO con el contenido markdown (frontmatter YAML + 20 preguntas). Sin texto adicional antes ni después."""


# ── MiniMax async API call ──────────────────────────────────────


async def _call_minimax_async(session, prompt, endpoint, retries=3):
    """Async MiniMax API call. Returns content or raises Exception."""
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    payload = {
        "model": "MiniMax-M2.7",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 6000,
        "temperature": 0.7,
    }

    for attempt in range(retries):
        try:
            async with session.post(
                endpoint, headers=headers, json=payload, timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT)
            ) as response:
                status = response.status

                if status == 529:
                    wait = min(10 * (2**attempt) + random.uniform(0, 5), 120)
                    print(f"     Rate limited (529), backoff {wait:.1f}s (attempt {attempt+1})...")
                    await asyncio.sleep(wait)
                    continue

                if status == 401 or status == 403:
                    raise Exception(f"Auth error {status} — check API key")

                response.raise_for_status()
                data = await response.json()
                content = data["choices"][0]["message"]["content"]
                return content

        except aiohttp.ClientError as e:
            err_str = str(e)[:120]
            print(f"     Attempt {attempt+1}/{retries} failed: {err_str}")
            if attempt < retries - 1:
                await asyncio.sleep(10)
                continue
            raise Exception(f"MiniMax async failed after {retries} attempts: {err_str}")

    raise Exception("Max retries exceeded")


# ── Ollama fallback (sync, used inside async task) ──────────────


def call_ollama_sync(prompt, retries=2):
    """Synchronous Ollama API call as fallback."""
    import urllib.request

    for attempt in range(retries):
        payload = {
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False,
            "options": {"temperature": 0.7, "num_predict": 8000},
        }
        data = json.dumps(payload).encode()
        req = urllib.request.Request(OLLAMA_ENDPOINT, data=data, headers={"Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=300) as r:
                resp = json.loads(r.read())
                return resp.get("response", "")
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2)
                continue
            raise Exception(f"Ollama failed after {retries} attempts: {e}")


# ── Save bundle ─────────────────────────────────────────────────


def save_bundle(content, subject, grado, periodo, topic, bundle_id):
    """Save the generated bundle to the correct path."""
    output_dir = (
        WORLDEXAMS_ROOT / "questions_data" / "colombia" / subject / f"grado-{grado}" / f"periodo-{periodo}" / topic
    )
    output_dir.mkdir(parents=True, exist_ok=True)
    output_file = output_dir / f"{bundle_id}-bundle.md"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(content)
    return str(output_file)


# ── Single async task processor ────────────────────────────────


async def process_task_async(session, task, endpoint, semaphore):
    """Process a single task with semaphore-controlled concurrency."""
    async with semaphore:
        task_id = task["id"]
        prompt = generate_prompt(task["subject"], task["grado"], task["periodo"], task["topic"], task["bundleIndex"])
        bundle_id = f"CO-{task['subject'][:3].upper()}-{task['grado']}-P{task['periodo']}-{task['topic']}-{str(task['bundleIndex']).zfill(3)}-MASTERY"

        content = None
        last_error = None

        # Try MiniMax async first
        try:
            content = await _call_minimax_async(session, prompt, endpoint)
            print(f"  ✅ MiniMax success for {task_id}")
        except Exception as e:
            last_error = e
            print(f"  ⚠️  MiniMax failed for {task_id}: {str(e)[:80]}")
            print(f"     Falling back to Ollama...")
            try:
                # Ollama is sync, run in thread pool to not block event loop
                loop = asyncio.get_running_loop()
                content = await loop.run_in_executor(None, call_ollama_sync, prompt)
                print(f"  ✅ Ollama fallback success for {task_id}")
            except Exception as ollama_err:
                print(f"  ❌ Ollama also failed for {task_id}: {str(ollama_err)[:80]}")

        if content is None:
            update_task_status(task_id, "failed", error=last_error)
            return task_id, False, last_error

        # Normalize then save
        try:
            content = normalize_bundle(content)
            output_path = save_bundle(
                content, task["subject"], task["grado"], task["periodo"], task["topic"], bundle_id
            )
            update_task_status(task_id, "completed", output_path=output_path)
            print(f"  💾 Saved: {os.path.basename(output_path)}")

            # Validate the saved bundle — FAIL if invalid
            if _validator and output_path:
                vr = _validator.validate_file(str(output_path))
                if vr.valid:
                    print(f"  ✅ Validated: {vr.valid_count} questions, {vr.issue_count} issues")
                    # Trigger async review via the worldexams-question-reviewer skill
                    _trigger_review(str(output_path), subject=task["subject"], grado=task["grado"])
                    update_task_status(task_id, "completed", output_path=output_path)
                    print(f"  ✅ Bundle ready: {os.path.basename(output_path)}")
                else:
                    # Validation failed — delete bad file and mark task failed
                    critical_issues = [i for i in vr.issues if i.severity in ("CRITICAL", "HIGH")]
                    error_msg = (
                        f"Validation failed: {len(vr.issues)} issues — {[i.message for i in critical_issues[:3]]}"
                    )
                    update_task_status(task_id, "failed", error=error_msg)
                    if os.path.exists(str(output_path)):
                        os.remove(str(output_path))
                    print(f"  ❌ Validation FAILED — bundle deleted: {os.path.basename(output_path)}")
                    print(f"  ❌ Issues: {[i.message for i in vr.issues[:5]]}")
                    return task_id, False, error_msg
            else:
                update_task_status(task_id, "completed", output_path=output_path)

            return task_id, True, None
        except Exception as save_err:
            update_task_status(task_id, "failed", error=save_err)
            print(f"  ❌ Save failed for {task_id}: {save_err}")
            return task_id, False, save_err


# ── Async batch runner ─────────────────────────────────────────


async def run_async_batch(tasks, endpoint, max_concurrent=None):
    """Run tasks concurrently with a semaphore limit."""
    if max_concurrent is None:
        max_concurrent = CONCURRENT_TASKS

    semaphore = asyncio.Semaphore(max_concurrent)

    # Single aiohttp session with connection pooling for all concurrent requests
    connector = aiohttp.TCPConnector(
        limit=max_concurrent,
        limit_per_host=max_concurrent,
        ttl_dns_cache=300,
        keepalive_timeout=30,
    )
    timeout = aiohttp.ClientTimeout(total=REQUEST_TIMEOUT)

    async with aiohttp.ClientSession(connector=connector, timeout=timeout) as session:
        print(f"\n🚀 ASYNC BATCH START — {len(tasks)} tasks, {max_concurrent} concurrent")
        print(f"   Endpoint: {endpoint}")
        print(f"   Expected time: ~{(len(tasks) / max_concurrent) * 40 / 60:.1f} min for {len(tasks)} tasks")

        t0 = time.monotonic()
        results = await asyncio.gather(
            *[process_task_async(session, task, endpoint, semaphore) for task in tasks], return_exceptions=True
        )
        elapsed = time.monotonic() - t0

        completed = sum(1 for r in results if isinstance(r, tuple) and r[1] is True)
        failed = sum(1 for r in results if isinstance(r, Exception) or (isinstance(r, tuple) and r[1] is False))

        if elapsed > 0 and completed > 0:
            rate = completed / (elapsed / 3600)
            print(f"   Throughput: {rate:.0f} tasks/hour ({elapsed:.0f}s elapsed)")

        return completed, failed


# ── Queue status ───────────────────────────────────────────────


def status():
    queue = load_queue()
    tasks = queue["tasks"]
    pending = [t for t in tasks if t["status"] == "pending"]
    running = [t for t in tasks if t["status"] == "running"]
    completed = [t for t in tasks if t["status"] == "completed"]
    failed = [t for t in tasks if t["status"] == "failed"]

    print(f"\n📋 GENERATION QUEUE STATUS")
    print(f"   Batch: {queue['batchId']}")
    print(f"   Total: {len(tasks)}")
    print(f"   Pending: {len(pending)}")
    print(f"   Running: {len(running)}")
    print(f"   Completed: {len(completed)}")
    print(f"   Failed: {len(failed)}")
    if failed:
        print(f"\n   Failed tasks (first 5):")
        for t in failed[:5]:
            print(f"   - {t['id']}: {t.get('error', 'unknown')[:80]}")


def reset_failed():
    queue = load_queue()
    reset_count = 0
    for task in queue["tasks"]:
        if task["status"] in ("failed", "running"):
            task["status"] = "pending"
            task.pop("error", None)
            reset_count += 1
    save_queue(queue)
    print(f"✅ Reset {reset_count} tasks to pending")


def find_working_endpoint():
    """Find a working API endpoint."""
    test_payload = {"model": "MiniMax-M2.7", "messages": [{"role": "user", "content": "Say OK"}], "max_tokens": 5}
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    session = requests.Session()
    adapter = HTTPAdapter(max_retries=Retry(total=2, backoff_factor=1))
    session.mount("https://", adapter)

    for endpoint in API_ENDPOINTS:
        try:
            r = session.post(endpoint, headers=headers, json=test_payload, timeout=30)
            if r.status_code == 200:
                print(f"✅ Working endpoint: {endpoint}")
                r.close()
                return endpoint
            else:
                print(f"❌ {endpoint}: {r.status_code}")
                r.close()
        except Exception as e:
            print(f"❌ {endpoint}: {e}")
    return None


# ── Signal handler ──────────────────────────────────────────────


def _handle_shutdown(signum, frame):
    print("\n⚠️  Shutdown signal received — stopping after current wave...")
    if _shutdown_flag is not None:
        _shutdown_flag.set()


# ── Main entry point ────────────────────────────────────────────


def run_batch(batch_size=300, workers=None, max_concurrent=None):
    """
    Main batch runner.

    Args:
        batch_size: Number of pending tasks to grab and process
        workers: Ignored (kept for CLI compat) — concurrency is via async
        max_concurrent: Override CONCURRENT_TASKS for this run
    """
    global _shutdown_flag
    _shutdown_flag = asyncio.Event()

    signal.signal(signal.SIGINT, _handle_shutdown)
    signal.signal(signal.SIGTERM, _handle_shutdown)

    endpoint = API_ENDPOINTS[0]
    if not API_KEY:
        print("❌ MINIMAX_API_KEY not set")
        sys.exit(1)

    queue = load_queue()
    pending = [t for t in queue["tasks"] if t["status"] == "pending"]

    if not pending:
        print("✅ No pending tasks")
        return

    tasks_to_run = pending[:batch_size]
    task_ids = {t["id"] for t in tasks_to_run}

    # Claim tasks atomically
    claimed = claim_tasks(task_ids)
    if not claimed:
        print("❌ Could not claim tasks (lock contention)")
        return

    print(f"\n📦 Claimed {len(claimed)} tasks")

    if max_concurrent is None:
        max_concurrent = CONCURRENT_TASKS

    # Run async batch
    try:
        completed, failed = asyncio.run(run_async_batch(claimed, endpoint, max_concurrent=max_concurrent))
    except KeyboardInterrupt:
        print("\n⚠️  Interrupted — graceful shutdown")
        _shutdown_flag.set()
        return

    print(f"\n📊 BATCH COMPLETE")
    print(f"   Completed: {completed}")
    print(f"   Failed: {failed}")

    # Refresh queue for final stats
    queue = load_queue()
    completed_now = len([t for t in queue["tasks"] if t["status"] == "completed"])
    failed_now = len([t for t in queue["tasks"] if t["status"] == "failed"])
    pending_now = len([t for t in queue["tasks"] if t["status"] == "pending"])
    print(f"   Total completed: {completed_now}")
    print(f"   Total failed: {failed_now}")
    print(f"   Remaining pending: {pending_now}")

    # Return review queue entries for main agent's sessions_spawn
    review_entries = []
    if _REVIEW_QUEUE_FILE.exists():
        with open(_REVIEW_QUEUE_FILE, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    try:
                        review_entries.append(json.loads(line))
                    except json.JSONDecodeError:
                        pass
        # Clear the queue after reading to prevent duplicates on next run
        open(_REVIEW_QUEUE_FILE, "w", encoding="utf-8").close()

    if review_entries:
        print(f"\n📋 REVIEW_QUEUE:{len(review_entries)}")
        for entry in review_entries:
            print(f"  REVIEW_ENTRY:{entry['bundle_path']}|{entry.get('subject','?')}|{entry.get('grado','?')}")

    return review_entries


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="WorldExams Async Generator")
    parser.add_argument("--status", action="store_true", help="Show queue status")
    parser.add_argument("--test", action="store_true", help="Test API connectivity")
    parser.add_argument("--reset", action="store_true", help="Reset failed/running to pending")
    parser.add_argument("--run", action="store_true", help="Run generation tasks")
    parser.add_argument("--batch", type=int, default=300, help="Number of tasks per batch (default: 300)")
    parser.add_argument("--workers", type=int, default=None, help="Ignored (async concurrency instead)")
    parser.add_argument("--concurrent", type=int, default=None, help="Override concurrent task limit")

    args = parser.parse_args()

    if args.status:
        status()
    elif args.test:
        endpoint = find_working_endpoint()
        print(f"Endpoint: {endpoint}")
    elif args.reset:
        reset_failed()
    elif args.run:
        run_batch(batch_size=args.batch, workers=args.workers, max_concurrent=args.concurrent)
    else:
        parser.print_help()
