import argparse
import json
import os
import re
import subprocess
import tempfile
import wave
from datetime import datetime
from pathlib import Path

from moviepy import (
    AudioFileClip,
    ColorClip,
    CompositeVideoClip,
    TextClip,
    concatenate_videoclips,
)


PROJECT_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_ROOT = PROJECT_ROOT / "src" / "content" / "questions" / "colombia" / "matematicas" / "grado-11" / "periodo-1"
MANIFEST_FILE = PROJECT_ROOT / "src" / "content" / "video" / "video-manifest-v41.json"


def find_job_files(root: Path):
    jobs = []
    for p in root.rglob("*.json"):
        if f"{os.sep}jobs{os.sep}" in str(p):
            jobs.append(p)
    return sorted(jobs)


def read_json(path: Path, default=None):
    if not path.exists():
        return default
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def write_json(path: Path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def trim_words(text: str, max_words: int) -> str:
    words = re.findall(r"\S+", text or "")
    return " ".join(words[:max_words]).strip()


def build_short_script(job: dict) -> str:
    statement = trim_words(job.get("content", {}).get("statement", ""), 14)
    explanation = trim_words(job.get("content", {}).get("explanation", ""), 22)
    return (
        f"Resolvamos en tres pasos. {statement}. "
        f"Aplicamos la operación clave y verificamos el resultado. {explanation}. "
        "Respuesta final confirmada."
    )


def tts_local_windows(text: str, wav_out: Path):
    safe_text = text.replace("`", "``").replace("$", "`$").replace('"', '`"')
    script = f"""
Add-Type -AssemblyName System.Speech
$s = New-Object System.Speech.Synthesis.SpeechSynthesizer
$s.Rate = -1
$s.Volume = 100
$s.SetOutputToWaveFile("{str(wav_out).replace('\\', '\\\\')}")
$s.Speak("{safe_text}")
$s.Dispose()
"""
    with tempfile.NamedTemporaryFile(delete=False, suffix=".ps1", mode="w", encoding="utf-8") as tmp:
        tmp.write(script)
        tmp_path = tmp.name
    try:
        proc = subprocess.run(
            ["powershell", "-ExecutionPolicy", "Bypass", "-File", tmp_path],
            capture_output=True,
            text=True,
            check=False,
        )
        if proc.returncode != 0:
            raise RuntimeError(proc.stderr.strip() or "TTS powershell failed")
    finally:
        try:
            os.remove(tmp_path)
        except OSError:
            pass


def wav_duration_seconds(wav_path: Path) -> float:
    with wave.open(str(wav_path), "rb") as w:
        frames = w.getnframes()
        rate = w.getframerate()
        return frames / float(rate) if rate else 0.0


def generate_word_timings(text: str, total_seconds: float):
    words = [w for w in re.findall(r"\S+", text or "") if w.strip()]
    if not words:
        return []
    slot = max(total_seconds / len(words), 0.02)
    out = []
    for i, word in enumerate(words):
        start = round(i * slot, 3)
        end = round((i + 1) * slot, 3)
        out.append({"word": word, "start": start, "end": end})
    return out


def sec_to_srt(ts: float) -> str:
    ms = int(round(ts * 1000))
    h = ms // 3600000
    ms -= h * 3600000
    m = ms // 60000
    ms -= m * 60000
    s = ms // 1000
    ms -= s * 1000
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def write_srt_from_timings(timings, srt_path: Path, chunk_size=4):
    lines = []
    idx = 1
    for i in range(0, len(timings), chunk_size):
        chunk = timings[i:i + chunk_size]
        if not chunk:
            continue
        text = " ".join([w["word"] for w in chunk])
        start = chunk[0]["start"]
        end = chunk[-1]["end"]
        lines.append(str(idx))
        lines.append(f"{sec_to_srt(start)} --> {sec_to_srt(end)}")
        lines.append(text)
        lines.append("")
        idx += 1
    srt_path.parent.mkdir(parents=True, exist_ok=True)
    srt_path.write_text("\n".join(lines), encoding="utf-8")


def render_vertical_video(job: dict, audio_path: Path, video_path: Path):
    width = int(job.get("format", {}).get("width", 1080))
    height = int(job.get("format", {}).get("height", 1920))
    total_seconds = float(job.get("format", {}).get("total_seconds", 15))
    intro_seconds = float(job.get("format", {}).get("intro_seconds", 3))
    outro_seconds = float(job.get("format", {}).get("outro_seconds", 3))
    middle_seconds = max(total_seconds - intro_seconds - outro_seconds, 1)

    question_id = str(job.get("question_id", "QUESTION"))
    statement = trim_words(job.get("content", {}).get("statement", ""), 28)
    explanation = trim_words(job.get("content", {}).get("explanation", ""), 36)

    intro_bg = ColorClip((width, height), color=(7, 25, 74), duration=intro_seconds)
    middle_bg = ColorClip((width, height), color=(18, 18, 18), duration=middle_seconds)
    outro_bg = ColorClip((width, height), color=(32, 8, 8), duration=outro_seconds)

    intro_title = TextClip(
        text="WORLDEXAMS\nSABERPARATODOS",
        font_size=80,
        color="#FCD116",
        size=(width - 120, None),
        method="caption",
        text_align="center",
    ).with_position("center").with_duration(intro_seconds)
    intro_sub = TextClip(
        text="Resolucion express de matematicas",
        font_size=42,
        color="white",
        size=(width - 180, None),
        method="caption",
        text_align="center",
    ).with_position(("center", height * 0.72)).with_duration(intro_seconds)
    intro_clip = CompositeVideoClip([intro_bg, intro_title, intro_sub], size=(width, height))

    mid_qid = TextClip(
        text=question_id,
        font_size=34,
        color="#FCD116",
        size=(width - 80, None),
        method="caption",
    ).with_position((40, 48)).with_duration(middle_seconds)
    mid_statement = TextClip(
        text=f"Problema: {statement}",
        font_size=54,
        color="white",
        size=(width - 90, None),
        method="caption",
    ).with_position((45, 220)).with_duration(middle_seconds)
    mid_steps = TextClip(
        text=f"Paso 1: datos clave\nPaso 2: ecuacion\nPaso 3: verificar opcion\n\n{explanation}",
        font_size=44,
        color="#E5E7EB",
        size=(width - 120, None),
        method="caption",
    ).with_position((60, 700)).with_duration(middle_seconds)
    middle_clip = CompositeVideoClip([middle_bg, mid_qid, mid_statement, mid_steps], size=(width, height))

    outro_text = TextClip(
        text="Visita el blog para mas preguntas\nYouTube | Instagram | TikTok",
        font_size=52,
        color="white",
        size=(width - 120, None),
        method="caption",
        text_align="center",
    ).with_position("center").with_duration(outro_seconds)
    outro_clip = CompositeVideoClip([outro_bg, outro_text], size=(width, height))

    final = concatenate_videoclips([intro_clip, middle_clip, outro_clip], method="compose")
    audio = AudioFileClip(str(audio_path))
    if audio.duration > total_seconds:
        audio = audio.subclipped(0, total_seconds)
    final = final.with_audio(audio).with_duration(total_seconds)

    video_path.parent.mkdir(parents=True, exist_ok=True)
    final.write_videofile(
        str(video_path),
        fps=30,
        codec="libx264",
        audio_codec="aac",
        preset="ultrafast",
        bitrate="2500k",
        ffmpeg_params=["-movflags", "+faststart"],
        threads=4,
        logger=None,
    )
    final.close()
    audio.close()


def upsert_manifest_status(question_id: str, status: str):
    manifest = read_json(MANIFEST_FILE, {
        "version": "4.1",
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "defaults": {
            "youtube_channel_url": "https://www.youtube.com/@worldexams",
            "instagram_url": "",
            "tiktok_url": "",
        },
        "entries": [],
    })
    entries = manifest.get("entries", [])
    key = question_id.strip().lower()
    found = False
    for entry in entries:
        if str(entry.get("question_id", "")).strip().lower() == key:
            entry["status"] = status
            entry["updated_at"] = datetime.utcnow().isoformat() + "Z"
            found = True
            break
    if not found:
        entries.append({
            "question_id": question_id,
            "protocol_version": "4.1",
            "status": status,
            "updated_at": datetime.utcnow().isoformat() + "Z",
        })
    manifest["entries"] = entries
    manifest["generated_at"] = datetime.utcnow().isoformat() + "Z"
    write_json(MANIFEST_FILE, manifest)


def process_job(job_path: Path, force=False):
    job = read_json(job_path, {})
    qid = str(job.get("question_id", "")).strip()
    if not qid:
        return False, "missing question_id"

    assets_dir = job_path.parents[1]
    outputs = job.get("outputs", {})
    audio_path = assets_dir / outputs.get("audio_path", f"audio/{qid}.mp3")
    timings_path = assets_dir / outputs.get("timings_path", f"timings/{qid}.json")
    subtitles_path = assets_dir / outputs.get("subtitles_path", f"subtitles/{qid}.srt")
    video_path = assets_dir / outputs.get("final_video_path", f"renders/{qid}.mp4")
    wav_temp = audio_path.with_suffix(".wav")

    if video_path.exists() and not force:
        return True, "skipped-existing"

    script = build_short_script(job)
    tts_local_windows(script, wav_temp)

    audio_clip = AudioFileClip(str(wav_temp))
    audio_path.parent.mkdir(parents=True, exist_ok=True)
    audio_clip.write_audiofile(str(audio_path), logger=None)
    audio_clip.close()

    duration = wav_duration_seconds(wav_temp)
    timings = generate_word_timings(script, min(max(duration, 1.0), 15.0))
    write_json(timings_path, {"question_id": qid, "duration_seconds": duration, "words": timings})
    write_srt_from_timings(timings, subtitles_path, chunk_size=4)

    render_vertical_video(job, audio_path, video_path)

    job["status"] = "generated"
    job["generated_at"] = datetime.utcnow().isoformat() + "Z"
    job["updated_at"] = datetime.utcnow().isoformat() + "Z"
    write_json(job_path, job)
    upsert_manifest_status(qid, "generated")

    try:
        wav_temp.unlink(missing_ok=True)
    except Exception:
        pass
    return True, "generated"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=str(DEFAULT_ROOT))
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    jobs = find_job_files(root)
    if args.limit and args.limit > 0:
        jobs = jobs[: args.limit]

    ok, fail, skip = 0, 0, 0
    for job in jobs:
        try:
            success, status = process_job(job, force=args.force)
            if success and status == "generated":
                ok += 1
                print(f"[generated] {job.name}")
            elif success and status == "skipped-existing":
                skip += 1
                print(f"[skip] {job.name}")
            else:
                fail += 1
                print(f"[fail] {job.name}: {status}")
        except Exception as e:
            fail += 1
            print(f"[fail] {job.name}: {e}")

    print(f"done generated={ok} skipped={skip} failed={fail} total={len(jobs)}")


if __name__ == "__main__":
    main()
