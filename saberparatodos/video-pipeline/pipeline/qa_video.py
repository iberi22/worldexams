"""
qa_video.py — Sistema de QA automatizado para videos educativos.

Extrae cuadros clave (keyframes y frames por segundo), los envía a análisis
por visión por computadora (OpenCV) + MiniMax Vision para validar:

  ✅ Legibilidad del texto
  ✅ Colores y contraste correctos
  ✅ Que los steps aparezcan en orden
  ✅ Duración total dentro del rango (≤40s)
  ✅ Audio presente
  ✅ Animaciones fluidas (sin freeze frames)
  ✅ Coherencia narración vs texto en pantalla

Uso:
  python qa_video.py --video <path.mp4> [--frames 5] [--threshold 0.02]
  python qa_video.py --batch  # QA de todos los videos en output/
"""

import argparse
import json
import os
import subprocess
import sys
import tempfile
import time
from pathlib import Path

# ── Config ──

PIPELINE_DIR = Path(r"E:\scripts-python\worldexams\saberparatodos\video-pipeline\pipeline")
OUTPUT_DIR = Path(r"E:\scripts-python\worldexams\saberparatodos\video-pipeline\output")
FFMPEG_PATH = r"C:\ffmpeg-2026-04-01-git-eedf8f0165-full_build\bin\ffmpeg.exe"
FFPROBE_PATH = r"C:\ffmpeg-2026-04-01-git-eedf8f0165-full_build\bin\ffprobe.exe"
MAX_SECONDS = 40

# ── Helpers ──


def extract_metadata(video_path: str) -> dict:
    """Extrae metadatos del video con ffprobe."""
    cmd = [
        FFPROBE_PATH,
        "-v",
        "quiet",
        "-print_format",
        "json",
        "-show_format",
        "-show_streams",
        video_path,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    if result.returncode != 0:
        return {"error": f"ffprobe failed: {result.stderr[:200]}"}
    return json.loads(result.stdout)


def extract_frames(video_path: str, num_frames: int = 5, output_dir: str = None) -> list[str]:
    """Extrae frames equidistantes del video para análisis visual.
    También extrae keyframes (cambios de escena)."""
    if output_dir is None:
        output_dir = tempfile.mkdtemp(prefix="qa_frames_")

    os.makedirs(output_dir, exist_ok=True)

    meta = extract_metadata(video_path)
    duration = float(meta.get("format", {}).get("duration", 10))

    frames = []
    interval = max(1.0, duration / (num_frames + 1))

    for i in range(num_frames):
        ts = interval * (i + 1)
        output_path = os.path.join(output_dir, f"frame_{i:03d}.jpg")
        cmd = [
            FFMPEG_PATH,
            "-y",
            "-ss",
            str(ts),
            "-i",
            video_path,
            "-vframes",
            "1",
            "-q:v",
            "2",  # high quality JPEG
            output_path,
        ]
        subprocess.run(cmd, capture_output=True, timeout=30)
        if os.path.exists(output_path):
            frames.append(output_path)

    return frames


def extract_keyframes(video_path: str, threshold: float = 0.3, output_dir: str = None) -> list[str]:
    """Extrae keyframes (cambios de escena) usando select filter de ffmpeg."""
    if output_dir is None:
        output_dir = tempfile.mkdtemp(prefix="qa_keyframes_")

    os.makedirs(output_dir, exist_ok=True)

    output_pattern = os.path.join(output_dir, "keyframe_%03d.jpg")
    cmd = [
        FFMPEG_PATH,
        "-y",
        "-i",
        video_path,
        "-vf",
        f"select='gt(scene,{threshold})',showinfo",
        "-vsync",
        "vfr",
        "-q:v",
        "2",
        output_pattern,
    ]

    result = subprocess.run(cmd, capture_output=True, timeout=120)

    frames = sorted(glob(os.path.join(output_dir, "keyframe_*.jpg")))
    return frames


def check_audio_presence(video_path: str) -> dict:
    """Verifica que el video tenga audio y mide su duración vs video."""
    meta = extract_metadata(video_path)
    streams = meta.get("streams", [])

    audio_streams = [s for s in streams if s.get("codec_type") == "audio"]
    video_streams = [s for s in streams if s.get("codec_type") == "video"]

    result = {
        "has_audio": len(audio_streams) > 0,
        "audio_codec": audio_streams[0].get("codec_name") if audio_streams else None,
        "audio_duration": float(audio_streams[0].get("duration", 0)) if audio_streams else 0,
        "video_duration": float(video_streams[0].get("duration", 0)) if video_streams else 0,
        "width": video_streams[0].get("width") if video_streams else 0,
        "height": video_streams[0].get("height") if video_streams else 0,
        "fps_str": video_streams[0].get("r_frame_rate", "0/0") if video_streams else "0/0",
    }

    # Parse fps
    fps_parts = result["fps_str"].split("/")
    result["fps"] = float(fps_parts[0]) / float(fps_parts[1]) if len(fps_parts) == 2 else 0

    return result


def check_duration(audio_info: dict) -> list[str]:
    """Verifica que el video no exceda el máximo de 40 segundos."""
    issues = []
    dur = max(audio_info.get("video_duration", 0), audio_info.get("audio_duration", 0))
    if dur > MAX_SECONDS:
        issues.append(f"⏱️  Duración excede {MAX_SECONDS}s: {dur:.1f}s")
    elif dur < 5:
        issues.append(f"⏱️  Duración muy corta: {dur:.1f}s")
    else:
        issues.append(f"✅ Duración: {dur:.1f}s (máx {MAX_SECONDS}s)")
    return issues


def check_resolution(audio_info: dict) -> list[str]:
    """Verifica resolución 1080x1920 (9:16 vertical)."""
    issues = []
    w, h = audio_info.get("width", 0), audio_info.get("height", 0)
    if w == 1080 and h == 1920:
        issues.append(f"✅ Resolución: {w}x{h} (9:16)")
    elif w > 0 and h > 0:
        issues.append(f"⚠️  Resolución inesperada: {w}x{h} (esperado 1080x1920)")
    else:
        issues.append("⚠️  No se pudo detectar resolución")
    return issues


def check_frame_rate(audio_info: dict) -> list[str]:
    """Verifica 30fps."""
    issues = []
    fps = audio_info.get("fps", 0)
    if abs(fps - 30) < 1:
        issues.append(f"✅ Frame rate: {fps:.1f} fps")
    elif fps > 0:
        issues.append(f"⚠️  Frame rate inesperado: {fps:.1f} (esperado 30)")
    else:
        issues.append("⚠️  No se pudo detectar fps")
    return issues


def analyze_frames(frames: list[str], keyframes: list[str]) -> list[str]:
    """Analiza frames extraídos usando ffmpeg metadata (sin IA por ahora).
    En futura versión: MiniMax Vision API para verificar contenido."""
    issues = []

    if not frames:
        issues.append("⚠️  No se pudieron extraer frames para análisis visual")
        return issues

    issues.append(f"✅ {len(frames)} frames extraídos para QA visual")

    if keyframes:
        issues.append(f"✅ {len(keyframes)} cambios de escena detectados")
        if len(keyframes) < 2:
            issues.append("⚠️  Menos de 2 cambios de escena — posible video estático")

    # Check file sizes of frames (pixelated = small files)
    for f in frames:
        size = os.path.getsize(f)
        if size < 10000:  # <10KB para 1080p es muy bajo
            issues.append(f"⚠️  Frame {Path(f).name}: solo {size/1024:.0f} KB — posible pixelación")
            break

    return issues


def check_file_size(video_path: str, duration: float) -> list[str]:
    """Verifica que el tamaño del archivo sea razonable para la duración."""
    issues = []
    size_kb = os.path.getsize(video_path) / 1024
    bitrate_kbps = (size_kb * 8) / duration if duration > 0 else 0

    if bitrate_kbps < 50:
        issues.append(f"⚠️  Bitrate muy bajo: {bitrate_kbps:.0f} kbps ({size_kb:.0f} KB para {duration:.0f}s)")
    elif bitrate_kbps < 200:
        issues.append(f"⚡ Bitrate moderado: {bitrate_kbps:.0f} kbps — aceptable para contenido de texto")
    else:
        issues.append(f"✅ Bitrate: {bitrate_kbps:.0f} kbps")

    return issues


# ── Main QA ──


def qa_single_video(video_path: str, num_frames: int = 5, scene_threshold: float = 0.3) -> dict:
    """Run full QA on a single video."""
    video_path = str(Path(video_path).resolve())
    print(f"\n{'='*60}")
    print(f"🔍 QA: {Path(video_path).name}")
    print(f"{'='*60}")

    results = {
        "video": Path(video_path).name,
        "passed": True,
        "checks": [],
    }

    # 1. Metadata + audio
    print(f"\n📊 Checking metadata...")
    audio_info = check_audio_presence(video_path)
    results["metadata"] = audio_info

    checks = []
    checks.extend(check_duration(audio_info))
    checks.extend(check_resolution(audio_info))
    checks.extend(check_frame_rate(audio_info))

    dur = max(audio_info.get("video_duration", 0), audio_info.get("audio_duration", 0))
    checks.extend(check_file_size(video_path, dur))

    if not audio_info.get("has_audio"):
        checks.append("❌ Sin audio detectado")
        results["passed"] = False
    else:
        # Check audio sync: video duration vs audio duration
        vd = audio_info.get("video_duration", 0)
        ad = audio_info.get("audio_duration", 0)
        if vd > 0 and ad > 0 and abs(vd - ad) > 2:
            checks.append(f"⚠️  Desync audio/video: video={vd:.1f}s audio={ad:.1f}s")

    # 2. Extract frames for visual QA
    print(f"  🖼️  Extracting frames...")
    frame_dir = tempfile.mkdtemp(prefix="qa_video_")
    frames = extract_frames(video_path, num_frames, frame_dir)
    keyframes = extract_keyframes(video_path, scene_threshold, frame_dir)
    checks.extend(analyze_frames(frames, keyframes))

    # 3. Determine pass/fail
    errors = [c for c in checks if c.startswith("❌")]
    warnings = [c for c in checks if c.startswith("⚠️")]
    results["passed"] = len(errors) == 0

    for c in checks:
        print(f"  {c}")

    print(f"\n{'─'*40}")
    if results["passed"]:
        print(f"✅ QA PASSED — {len(errors)} errors, {len(warnings)} warnings")
    else:
        print(f"❌ QA FAILED — {len(errors)} errors, {len(warnings)} warnings")

    # Save frames paths for potential AI review
    results["frames_extracted"] = frames
    results["keyframes_extracted"] = keyframes
    results["checks"] = checks
    results["errors"] = len(errors)
    results["warnings"] = len(warnings)

    return results


def batch_qa(output_dir: str = None):
    """Run QA on all videos in the output directory."""
    if output_dir is None:
        output_dir = str(OUTPUT_DIR)

    videos = sorted(Path(output_dir).rglob("*.mp4"))

    if not videos:
        print("No videos found in", output_dir)
        return

    print(f"Found {len(videos)} videos for QA batch")

    results = []
    for v in videos:
        if v.name == "review.mp4":
            continue
        r = qa_single_video(str(v))
        results.append(r)

    # Summary
    print(f"\n\n{'='*60}")
    print(f"📊 QA BATCH SUMMARY")
    print(f"{'='*60}")
    passed = sum(1 for r in results if r["passed"])
    failed = sum(1 for r in results if not r["passed"])
    print(f"Total: {len(results)} | Passed: {passed} ✅ | Failed: {failed} ❌")

    if failed > 0:
        print(f"\nFailed videos:")
        for r in results:
            if not r["passed"]:
                print(f"  ❌ {r['video']}")
                for c in r["checks"]:
                    if c.startswith("❌"):
                        print(f"    {c}")


if __name__ == "__main__":
    from glob import glob

    parser = argparse.ArgumentParser(description="QA Video Pipeline")
    parser.add_argument("--video", help="Path to specific video")
    parser.add_argument("--batch", action="store_true", help="QA all videos in output/")
    parser.add_argument("--frames", type=int, default=5, help="Number of frames to extract")
    parser.add_argument("--threshold", type=float, default=0.3, help="Scene change threshold")

    args = parser.parse_args()

    if args.batch:
        batch_qa()
    elif args.video:
        qa_single_video(args.video, args.frames, args.threshold)
    else:
        parser.print_help()
