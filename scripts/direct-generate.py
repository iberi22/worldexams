#!/usr/bin/env python3
"""
WorldExams Direct Generation via MiniMax API
Bypasses opencode subprocess - calls API directly for reliability.
"""
import json
import os
import re
import sys
import time
import requests
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')
from pathlib import Path
from datetime import datetime

# Config
WORLDEXAMS_ROOT = Path(r"E:\scripts-python\worldexams")
QUEUE_FILE = WORLDEXAMS_ROOT / ".worldexams" / "generation" / "queue.json"
API_KEY = "sk-cp-Darz5xszZ7UrPXZD1FWzg7WpDNvIgMopxn4yjoG1f2uBoLpcgoGHo0FQGwVDs0GotFnrkFIz0dvJkkWPVlrUQkKCQok7aYxiHfTAwE0zy-uowWHnQIZtEyY"

# Try multiple MiniMax API endpoints
API_ENDPOINTS = [
    "https://api.minimaxi.chat/v1/chat/completions",
    "https://api.minimax.chat/v1/chat/completions",
]

SUBJECT_LABELS = {
    'matematicas': 'Matemáticas',
    'lectura-critica': 'Lectura Crítica',
    'ciencias-naturales': 'Ciencias Naturales',
    'sociales-ciudadanas': 'Sociales Ciudadanas',
    'ingles': 'Inglés'
}


def load_queue():
    with open(QUEUE_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_queue(queue):
    queue['lastUpdated'] = datetime.utcnow().isoformat() + 'Z'
    with open(QUEUE_FILE, 'w', encoding='utf-8') as f:
        json.dump(queue, f, indent=2, ensure_ascii=False)


def generate_prompt(subject, grado, periodo, topic, bundle_index):
    bundle_id = f"CO-{subject[:3].upper()}-{grado}-P{periodo}-{topic}-{str(bundle_index).zfill(3)}-MASTERY"
    subject_label = SUBJECT_LABELS.get(subject, subject)
    ts = datetime.utcnow().isoformat()

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
protocol_version: "5.1"
bundle_size: 20
bundle_index: {bundle_index}
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "{ts}"
  prompt_version: "v2-direct"
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


def call_minimax_api(prompt, endpoint, retries=3):
    """Call MiniMax API with the prompt."""
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "MiniMax-M2.7",
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 6000,
        "temperature": 0.7
    }
    for attempt in range(retries):
        try:
            # (connect_timeout, read_timeout) - aggressive to prevent hanging
            response = requests.post(endpoint, headers=headers, json=payload, timeout=(10, 90))
            if response.status_code == 529:
                wait = 30 * (attempt + 1)
                print(f"   Rate limited (529), waiting {wait}s...")
                time.sleep(wait)
                continue
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"]
        except (requests.HTTPError, requests.Timeout, requests.ConnectionError) as e:
            print(f"   Attempt {attempt+1}/{retries} failed: {str(e)[:80]}")
            if attempt < retries - 1:
                time.sleep(10)
                continue
            raise
    raise Exception("Max retries exceeded")


def save_bundle(content, subject, grado, periodo, topic, bundle_id):
    """Save the generated bundle to the correct path."""
    output_dir = WORLDEXAMS_ROOT / "questions_data" / "colombia" / subject / f"grado-{grado}" / f"periodo-{periodo}" / topic
    output_dir.mkdir(parents=True, exist_ok=True)
    output_file = output_dir / f"{bundle_id}-bundle.md"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    return str(output_file)


def process_task(task, endpoint):
    """Process a single generation task."""
    prompt = generate_prompt(
        task['subject'], task['grado'], task['periodo'],
        task['topic'], task['bundleIndex']
    )
    bundle_id = f"CO-{task['subject'][:3].upper()}-{task['grado']}-P{task['periodo']}-{task['topic']}-{str(task['bundleIndex']).zfill(3)}-MASTERY"
    
    content = call_minimax_api(prompt, endpoint)
    output_path = save_bundle(content, task['subject'], task['grado'], task['periodo'], task['topic'], bundle_id)
    return output_path


def status():
    """Show queue status."""
    queue = load_queue()
    tasks = queue['tasks']
    pending = [t for t in tasks if t['status'] == 'pending']
    running = [t for t in tasks if t['status'] == 'running']
    completed = [t for t in tasks if t['status'] == 'completed']
    failed = [t for t in tasks if t['status'] == 'failed']
    
    print(f"\n📋 GENERATION QUEUE STATUS")
    print(f"   Batch: {queue['batchId']}")
    print(f"   Total: {len(tasks)}")
    print(f"   Pending: {len(pending)}")
    print(f"   Running: {len(running)}")
    print(f"   Completed: {len(completed)}")
    print(f"   Failed: {len(failed)}")
    if failed:
        print(f"\n   Failed tasks:")
        for t in failed[:5]:
            print(f"   - {t['id']}: {t.get('error', 'unknown')[:80]}")


def reset_failed():
    """Reset failed/running tasks back to pending."""
    queue = load_queue()
    reset_count = 0
    for task in queue['tasks']:
        if task['status'] in ('failed', 'running'):
            task['status'] = 'pending'
            task.pop('error', None)
            reset_count += 1
    save_queue(queue)
    print(f"✅ Reset {reset_count} tasks to pending")


def find_working_endpoint():
    """Find a working API endpoint."""
    test_payload = {
        "model": "MiniMax-M2.7",
        "messages": [{"role": "user", "content": "Say OK"}],
        "max_tokens": 5
    }
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    
    for endpoint in API_ENDPOINTS:
        try:
            r = requests.post(endpoint, headers=headers, json=test_payload, timeout=15)
            if r.status_code == 200:
                print(f"✅ Working endpoint: {endpoint}")
                return endpoint
            else:
                print(f"❌ {endpoint}: {r.status_code}")
        except Exception as e:
            print(f"❌ {endpoint}: {e}")
    return None


def run_batch(batch_size=3, max_tasks=None):
    """Run a batch of generation tasks."""
    # Use primary endpoint directly (skip test call to preserve rate limit)
    endpoint = API_ENDPOINTS[0]
    if not endpoint:
        print("❌ No working endpoint found")
        sys.exit(1)

    queue = load_queue()
    pending = [t for t in queue['tasks'] if t['status'] == 'pending']
    
    if not pending:
        print("✅ No pending tasks")
        return
    
    if max_tasks:
        pending = pending[:max_tasks]
    
    print(f"\n🚀 STARTING BATCH")
    print(f"   Tasks to process: {min(batch_size, len(pending))}")
    print(f"   Total pending: {len(pending)}")
    
    completed = 0
    failed = 0
    
    for i, task in enumerate(pending[:batch_size]):
        print(f"\n[{i+1}/{min(batch_size, len(pending))}] Processing: {task['id']}")
        
        # Mark as running
        task['status'] = 'running'
        save_queue(queue)
        
        try:
            output_path = process_task(task, endpoint)
            task['status'] = 'completed'
            task['completedAt'] = datetime.utcnow().isoformat() + 'Z'
            task['outputPath'] = output_path
            completed += 1
            print(f"   ✅ Saved: {os.path.basename(output_path)}")
        except Exception as e:
            task['status'] = 'failed'
            task['error'] = str(e)[:200]
            task['completedAt'] = datetime.utcnow().isoformat() + 'Z'
            failed += 1
            print(f"   ❌ Failed: {str(e)[:100]}")
        
        save_queue(queue)
        if i < batch_size - 1:  # Don't sleep after last task
            print(f"   Waiting 60s (rate limit)...")
            time.sleep(60)
    
    print(f"\n📊 BATCH COMPLETE")
    print(f"   Completed: {completed}")
    print(f"   Failed: {failed}")
    print(f"   Remaining pending: {len(pending) - completed - failed}")


if __name__ == "__main__":
    args = sys.argv[1:]
    
    if not args or args[0] == '--status':
        status()
    elif args[0] == '--test':
        endpoint = find_working_endpoint()
        print(f"Endpoint: {endpoint}")
    elif args[0] == '--reset':
        reset_failed()
    elif args[0] == '--run':
        batch_size = 5
        for a in args:
            if a.startswith('--batch='):
                batch_size = int(a.split('=')[1])
        run_batch(batch_size=batch_size)
    else:
        print("""
WorldExams Direct Generator (MiniMax API)

Usage:
  python direct-generate.py --status         Show queue status
  python direct-generate.py --test           Test API connectivity
  python direct-generate.py --reset          Reset failed/running to pending
  python direct-generate.py --run            Run 5 tasks
  python direct-generate.py --run --batch=10 Run 10 tasks
""")
