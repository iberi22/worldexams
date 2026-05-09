"""
render_math_video.py — Pipeline orquestador para generar videos explicativos de matemáticas.

Flujo:
  1. Carga una pregunta de la cola (pending-v41-math.json)
  2. La parsea en steps educativos (parse_question.py)
  3. Genera TTS (PowerShell → System.Speech → WAV)
  4. Convierte WAV a MP3
  5. Calcula timecodes basados en duración del audio
  6. Renderiza con Remotion (llamando a @remotion/renderer)
  7. QA básico
  8. Marca como completado en la cola

Uso:
  python render_math_video.py                    # Procesa la primera pregunta pendiente
  python render_math_video.py --index 5           # Procesa la pregunta #5
  python render_math_video.py --batch 10          # Procesa 10 preguntas
  python render_math_video.py --dry-run           # Solo muestra qué se procesaría
"""

import json
import os
import subprocess
import sys
import tempfile
import time
import wave
from pathlib import Path

from parse_question import parse_question

# ── Config ─────────────────────────────────────────────────────────────────────

REPO_ROOT = Path(r"E:\scripts-python\worldexams\saberparatodos")
REMOTION_DIR = REPO_ROOT / "video-pipeline" / "remotion"
QUEUE_FILE = REPO_ROOT / "video-pipeline" / "queue" / "pending-v41-math.json"
OUTPUT_DIR = REPO_ROOT / "video-pipeline" / "output"
PIPELINE_DIR = REPO_ROOT / "video-pipeline" / "pipeline"

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(REMOTION_DIR / "out", exist_ok=True)

# ── Helpers ────────────────────────────────────────────────────────────────────


def generate_tts(text: str, output_wav: str) -> float:
    """Generate TTS using Windows System.Speech via PowerShell. Returns duration in seconds."""
    ps_script = str(PIPELINE_DIR / "generate_tts.ps1")

    # Escapar texto para PowerShell
    escaped_text = text.replace("'", "''")

    cmd = [
        "powershell",
        "-NoProfile",
        "-ExecutionPolicy",
        "Bypass",
        "-File",
        ps_script,
        "-Text",
        escaped_text,
        "-OutputFile",
        output_wav,
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if result.returncode != 0:
        print(f"⚠️  TTS failed: {result.stderr[:200]}")
        return 0

    # Get duration via Python wave module
    try:
        with wave.open(output_wav, "rb") as w:
            frames = w.getnframes()
            rate = w.getframerate()
            duration = frames / rate if rate > 0 else 0
        return duration
    except Exception as e:
        print(f"  ⚠️  Could not read WAV duration: {e}")
        return 0


def calculate_timecodes(
    duration_seconds: int, num_steps: int, intro_seconds: int = 3, outro_seconds: int = 3
) -> list[int]:
    """Calculate frame offsets for each step based on audio duration."""
    fps = 30
    total_frames = int(duration_seconds * fps)
    intro_frames = intro_seconds * fps
    avail_frames = total_frames - intro_frames - (outro_seconds * fps)

    if num_steps == 0:
        return []

    step_frames = avail_frames // num_steps
    return [intro_frames + i * step_frames for i in range(num_steps)]


def render_with_remotion(
    question_id: str, parsed: dict, audio_wav: str, timecodes: list[int], duration_seconds: float
) -> str:
    """
    Render the video using Remotion SSR (@remotion/renderer).
    Luego aplica FFmpeg post-process (scale+pad a 9:16, merge audio).
    Returns path to output MP4.
    """
    remotion_out = REMOTION_DIR / "out"
    raw_video = str(remotion_out / f"{question_id}_raw.mp4")
    final_video = str(OUTPUT_DIR / f"{question_id}.mp4")

    # Copy audio to Remotion's public/ for staticFile() access
    audio_public = REMOTION_DIR / "public" / f"{question_id}_tts.wav"
    if os.path.exists(audio_wav):
        import shutil

        shutil.copy2(audio_wav, str(audio_public))

    total_frames = int(duration_seconds * 30) if duration_seconds > 0 else 300
    props = {
        "id": question_id,
        "title": parsed["title"],
        "topic": parsed["topic"],
        "steps": parsed["steps"],
        "timecodes": timecodes,
        "duration": total_frames,
        "audioSrc": f"{question_id}_tts.wav",
    }

    props_file = REMOTION_DIR / "out" / f"{question_id}_props.json"
    with open(props_file, "w", encoding="utf-8") as f:
        json.dump(props, f, ensure_ascii=False)

    # ── Step A: Render via CLI wrapper ──
    render_script = str(PIPELINE_DIR / "render-cli.mjs")
    cmd = [
        "node",
        render_script,
        "--props",
        str(props_file),
        "--output",
        raw_video,
        "--composition",
        "VerticalMathTemplate",
        "--remotionDir",
        str(REMOTION_DIR),
        "--scale",
        "1",
    ]

    print(f"  🎬 Rendering {question_id}...")
    start = time.time()

    result = subprocess.run(cmd, capture_output=True, text=True, timeout=600, cwd=str(REMOTION_DIR))

    elapsed = time.time() - start

    if result.returncode != 0:
        print(f"  ❌ Render failed: {result.stderr[-300:].strip()}")
        return None

    if not os.path.exists(raw_video):
        print(f"  ❌ Output not found at {raw_video}")
        return None

    raw_size = os.path.getsize(raw_video)
    print(f"  ✅ Raw render in {elapsed:.1f}s — {raw_size / 1024:.0f} KB")

    # ── Step B: FFmpeg post-process ──
    # Usando la lógica de crear-corto.ps1: scale + pad a 9:16 con calidad CRF 18
    # Try ffmpeg via different paths
    ffmpeg_paths = [
        str(Path.home() / "scoop" / "shims" / "ffmpeg.exe"),  # scoop install
        r"C:\ffmpeg-2026-04-01-git-eedf8f0165-full_build\bin\ffmpeg.exe",  # tu ffmpeg local
        str(REPO_ROOT / "node_modules" / "@remotion" / "compositor-win32-x64-msvc" / "ffmpeg.exe"),
    ]
    ffmpeg_bin = None
    for p in ffmpeg_paths:
        if os.path.exists(p):
            ffmpeg_bin = p
            break

    if ffmpeg_bin:
        ffmpeg_cmd = [
            ffmpeg_bin,
            "-y",
            "-i",
            raw_video,
            "-vf",
            "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black",
            "-c:v",
            "libx264",
            "-preset",
            "fast",
            "-crf",
            "18",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            final_video,
        ]

        print(f"  🎞️  Post-processing with FFmpeg...")
        ff_start = time.time()

        ff_result = subprocess.run(ffmpeg_cmd, capture_output=True, text=True, timeout=120)

        ff_elapsed = time.time() - ff_start

        if ff_result.returncode == 0 and os.path.exists(final_video):
            final_size = os.path.getsize(final_video)
            print(f"  ✅ Post-processed in {ff_elapsed:.1f}s — {final_size / 1024:.0f} KB")
            try:
                os.remove(raw_video)
            except:
                pass
            return final_video
        else:
            print(f"  ⚠️  FFmpeg post-process failed (rc={ff_result.returncode}), using raw")
    else:
        print(f"  ⚠️  FFmpeg not found on system, using raw output")

    # Fallback: copy raw as final
    import shutil as shutil2

    shutil2.copy2(raw_video, final_video)

    ff_elapsed = time.time() - ff_start

    if ff_result.returncode != 0 or not os.path.exists(final_video):
        print(f"  ⚠️  FFmpeg post-process failed: {ff_result.stderr[-200:].strip()}")
        print(f"     Using raw video as final output")
        # fallback: rename raw to final
        import shutil

        shutil.copy2(raw_video, final_video)
    else:
        final_size = os.path.getsize(final_video)
        print(f"  ✅ Post-processed in {ff_elapsed:.1f}s — {final_size / 1024:.0f} KB")
        # Clean up raw
        try:
            os.remove(raw_video)
        except:
            pass

    return final_video


def load_queue():
    """Load and return the pending video queue."""
    if not QUEUE_FILE.exists():
        print(f"Queue file not found: {QUEUE_FILE}")
        return None

    with open(QUEUE_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_queue(queue: dict):
    """Save the updated queue."""
    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        json.dump(queue, f, indent=2, ensure_ascii=False)


# ── Main ──────────────────────────────────────────────────────────────────────


def process_single(item: dict, index: int, dry_run: bool = False) -> bool:
    """Process a single question. Returns True if successful."""
    question_id = item.get("question_id", "unknown")
    print(f"\n[{index}] {question_id}")

    if dry_run:
        print(f"  📋 {item['payload']['content']['statement'][:80]}...")
        return True

    # Step 1: Parse question into steps
    parsed = parse_question(item)
    print(f"  📝 {parsed['title'][:60]}")
    topic_label = parsed.get("topic", "desconocido")
    print(f"  🏷️  Topic: {topic_label} | Steps: {len(parsed['steps'])} | Est. {parsed['estimated_seconds']}s")

    # Step 2: Generate TTS
    tts_wav = REMOTION_DIR / "out" / f"{question_id}_tts.wav"

    duration = generate_tts(parsed["narration_script"], str(tts_wav))
    if duration <= 0:
        duration = parsed["estimated_seconds"]
        print(f"  ⚠️  TTS failed, using estimated duration: {duration}s")
    else:
        print(f"  🎤 TTS generated: {duration:.1f}s")

    # Step 3: Calculate timecodes (proporcional al audio real)
    timecodes = calculate_timecodes(int(duration) + 1, len(parsed["steps"]))
    print(f"  ⏱️  Timecodes: {timecodes} (total: {duration:.0f}s)")

    # Step 4: Render via SSR + post-process
    output_path = render_with_remotion(question_id, parsed, str(tts_wav), timecodes, duration)
    if not output_path:
        return False

    # Step 5: Organize by topic (copy to topic folder)
    topic_dir = OUTPUT_DIR / topic_label.replace(" ", "-").lower()
    os.makedirs(topic_dir, exist_ok=True)
    import shutil

    shutil.copy2(output_path, str(topic_dir / f"{question_id}.mp4"))
    print(f"  📁 Copied to {topic_dir.name}/")

    # Step 6: Mark as completed
    item["status"] = "completed"

    return True


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Render math tutorial videos")
    parser.add_argument("--index", type=int, default=0, help="Start index in queue")
    parser.add_argument("--batch", type=int, default=1, help="Number of videos to render")
    parser.add_argument("--dry-run", action="store_true", help="Just show what would be processed")

    args = parser.parse_args()

    queue = load_queue()
    if not queue:
        sys.exit(1)

    items = queue.get("items", [])
    pending = [i for i in items if i.get("status") == "pending_generation"]

    print(f"Queue: {len(items)} total, {len(pending)} pending")

    if args.dry_run:
        print(f"\nWould process {args.batch} questions starting at index {args.index}")
        for i, item in enumerate(pending[args.index : args.index + args.batch]):
            print(f"\n  [{i}] {item['question_id']}")
            print(f"      {item['payload']['content']['statement'][:80]}")
        return

    # Interactive mode: process one at a time, ask before next
    success = 0
    batch_items = pending[args.index : args.index + args.batch]

    for i, item in enumerate(batch_items):
        if i > 0:
            # Ask user before continuing
            print(f"\n{'─'*40}")
            print(f"Next up: [{i}] {item['question_id']}")
            print(f"  {item['payload']['content']['statement'][:80]}...")
            ans = input("Continue? [Y/n/q(uit)]: ").strip().lower()
            if ans in ("n", "q", "quit"):
                print("⏹️  Stopped by user")
                break

        if process_single(item, i, dry_run=False):
            success += 1
            save_queue(queue)

    print(f"\n{'='*60}")
    print(f"Done: {success}/{len(batch_items)} videos rendered")


if __name__ == "__main__":
    main()
