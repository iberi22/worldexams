import argparse
import json
from datetime import UTC, datetime
from pathlib import Path

import cv2


PROJECT_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_VIDEO_ROOT = PROJECT_ROOT / "src" / "content" / "questions" / "colombia" / "matematicas" / "grado-11" / "periodo-1"
DEFAULT_PUBLIC_OUT = PROJECT_ROOT / "public" / "video-frame-analysis" / "e2e-latest"
PERCENTS = [0.05, 0.25, 0.5, 0.75, 0.95]


def find_videos(root: Path):
    return sorted(root.rglob("*.mp4"))


def extract_frames(video_path: Path, out_dir: Path):
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        return {"video": str(video_path), "error": "cannot_open", "frames": []}

    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0
    duration = frame_count / fps if fps > 0 else 0
    frames = []

    for idx, p in enumerate(PERCENTS, 1):
        ts = duration * p
        cap.set(cv2.CAP_PROP_POS_MSEC, max(0, ts * 1000))
        ok, frame = cap.read()
        if not ok or frame is None:
            frames.append({
                "index": idx,
                "percent": p,
                "timestamp_seconds": round(ts, 2),
                "error": "read_failed",
            })
            continue
        frame_name = f"{video_path.stem}__f{idx}.png"
        frame_path = out_dir / frame_name
        cv2.imwrite(str(frame_path), frame)
        frames.append({
            "index": idx,
            "percent": p,
            "timestamp_seconds": round(ts, 2),
            "path": frame_name,
        })

    cap.release()
    return {
        "video": video_path.name,
        "duration_seconds": round(duration, 2),
        "frames": frames,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--video-root", default=str(DEFAULT_VIDEO_ROOT))
    parser.add_argument("--out", default=str(DEFAULT_PUBLIC_OUT))
    parser.add_argument("--limit", type=int, default=3)
    parser.add_argument("--include", default="")
    args = parser.parse_args()

    video_root = Path(args.video_root).resolve()
    out = Path(args.out).resolve()
    out.mkdir(parents=True, exist_ok=True)

    videos = find_videos(video_root)
    if args.include:
        allowed = {x.strip() for x in args.include.split(",") if x.strip()}
        videos = [v for v in videos if v.name in allowed]
    if args.limit > 0:
        videos = videos[:args.limit]

    results = []
    for video in videos:
        results.append(extract_frames(video, out))

    manifest = {
        "generated_at": datetime.now(UTC).isoformat().replace("+00:00", "Z"),
        "video_root": str(video_root),
        "count": len(results),
        "items": results,
    }

    with (out / "manifest.json").open("w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print(f"manifest={out / 'manifest.json'}")
    print(f"videos={len(results)}")


if __name__ == "__main__":
    main()
