#!/usr/bin/env python3
"""
WorldExams Bundle Reviewer
Deep pedagogical review after bundle validation passes.
Detects recurring error patterns and modifies generator prompt when needed.
"""
import hashlib
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

CORTEX_URL = "http://localhost:8003/memory/add"
CORTEX_TOKEN = "dev-token"
CORTEX_SEARCH_URL = "http://localhost:8003/memory/search"

PROMPT_PATH_A = Path(r"E:\scripts-python\worldexams\scripts\prompt_template.md")
PROMPT_PATH_B = Path(r"E:\scripts-python\worldexams\.worldexams\generation\system-prompt.md")

# Track patterns across all reviews (in-memory for this session)
_error_patterns = {}  # key: f"{subject}|{topic}|{grade}|{error_type}", value: list of details


def get_bundle_id(bundle_path: str) -> str:
    """Extract bundle_id from filename."""
    return Path(bundle_path).stem


def parse_bundle(bundle_path: str) -> dict:
    """Parse bundle markdown file into structured questions."""
    with open(bundle_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract frontmatter
    frontmatter = {}
    fm_match = re.match(r"^---\n(.*?)\n---", content, re.DOTALL)
    if fm_match:
        for line in fm_match.group(1).split("\n"):
            if ":" in line:
                key, val = line.split(":", 1)
                frontmatter[key.strip()] = val.strip().strip('"')

    # Extract questions
    questions = []
    question_blocks = re.split(r"^## Question \d+", content, flags=re.MULTILINE)[1:]

    for i, block in enumerate(question_blocks):
        q = {"index": i + 1, "raw": block.strip()}

        # Extract statement
        stmt_match = re.search(r"### Enunciado\s*\n(.+?)(?=\n###|\n---)", block, re.DOTALL)
        q["statement"] = stmt_match.group(1).strip() if stmt_match else ""

        # Extract options
        options = re.findall(r"- \[ \] ([A-D])\)\s*(.+?)(?=\n- \[|###|\n---)", block, re.DOTALL)
        q["options"] = [{"letter": opt[0], "text": opt[1].strip()} for opt in options]

        # Extract correct answer
        correct_match = re.search(r"- \[x\] ([A-D])\)\s*(.+?)<!--", block, re.DOTALL)
        q["correct"] = correct_match.group(1) if correct_match else "?"

        # Extract bloom level
        bloom_match = re.search(r"\*\*Bloom:\*\*\s*\[(\w+)\]", block)
        q["bloom"] = bloom_match.group(1) if bloom_match else "?"

        questions.append(q)

    return {"frontmatter": frontmatter, "questions": questions, "raw_content": content}


def review_distractors(q: dict) -> list:
    """Check if all 4 options are plausible distractors."""
    errors = []
    options = q.get("options", [])

    if len(options) < 4:
        errors.append(
            {"type": "distractor", "question": q["index"], "detail": f"Only {len(options)} options found (expected 4)"}
        )
        return errors

    # Check option length variance (too similar = suspicious)
    lengths = [len(o["text"]) for o in options]
    if lengths and max(lengths) - min(lengths) < 5:
        errors.append(
            {
                "type": "distractor",
                "question": q["index"],
                "detail": "All options very similar length — may lack plausibility variation",
            }
        )

    # Check for identical options
    texts = [o["text"].lower() for o in options]
    if len(set(texts)) < 4:
        errors.append({"type": "distractor", "question": q["index"], "detail": "Duplicate options detected"})

    return errors


def review_grammar(q: dict) -> list:
    """Check Spanish grammar issues."""
    errors = []
    text = q.get("statement", "")

    # Check for common Spanish grammar issues
    if text:
        # Double spaces
        if "  " in text:
            errors.append({"type": "grammar", "question": q["index"], "detail": "Double spaces found"})

        # Check for missing punctuation at end
        if text and not text[-1] in ".?!":
            errors.append(
                {"type": "grammar", "question": q["index"], "detail": "Statement doesn't end with punctuation"}
            )

    return errors


def review_coherence(q: dict) -> list:
    """Check question-context coherence."""
    errors = []

    # Check if question is too short
    if q.get("statement") and len(q["statement"]) < 20:
        errors.append({"type": "coherence", "question": q["index"], "detail": "Question statement too short"})

    return errors


def review_difficulty(q: dict) -> list:
    """Check if difficulty matches grade level."""
    errors = []
    # Difficulty is embedded in question variant (D1-D10)
    # This is a placeholder for more sophisticated checks
    return errors


def deep_review(bundle_path: str) -> dict:
    """Perform deep quality analysis on bundle."""
    bundle_id = get_bundle_id(bundle_path)
    bundle = parse_bundle(bundle_path)
    subject = bundle["frontmatter"].get("asignatura", "unknown")
    topic = bundle["frontmatter"].get("tema", "unknown")
    grado = bundle["frontmatter"].get("grado", "unknown")

    all_errors = []
    errors_by_type = {"distractor": [], "grammar": [], "coherence": [], "difficulty": []}

    for q in bundle["questions"]:
        for err in review_distractors(q):
            all_errors.append(err)
            errors_by_type["distractor"].append(err)

        for err in review_grammar(q):
            all_errors.append(err)
            errors_by_type["grammar"].append(err)

        for err in review_coherence(q):
            all_errors.append(err)
            errors_by_type["coherence"].append(err)

    # Pattern detection
    patterns = []
    for error_type, errors_list in errors_by_type.items():
        if len(errors_list) >= 3:
            pattern_key = f"{subject}|{topic}|{grado}|{error_type}"
            pattern = {
                "pattern": f"systematic_{error_type}",
                "subject": subject,
                "topic": topic,
                "grade": grado,
                "count": len(errors_list),
                "fix_applied": False,
                "error_type": error_type,
            }
            patterns.append(pattern)

    # Calculate review score
    total_questions = len(bundle["questions"])
    max_errors = total_questions * 2  # 2 error types per question max
    score = max(0, 100 - (len(all_errors) / max(total_questions, 1)) * 100) if total_questions > 0 else 0

    return {
        "bundle_id": bundle_id,
        "bundle_path": bundle_path,
        "review_score": round(score, 1),
        "total_questions": total_questions,
        "errors": all_errors,
        "patterns": patterns,
        "subject": subject,
        "topic": topic,
        "grade": grado,
    }


def get_current_prompt() -> tuple:
    """Load current generator prompt."""
    for path in [PROMPT_PATH_A, PROMPT_PATH_B]:
        if path.exists():
            with open(path, "r", encoding="utf-8") as f:
                return path, f.read()
    return None, ""


def apply_pattern_fix(pattern: dict, prompt_content: str) -> str:
    """Apply a fix to the prompt based on detected pattern."""
    error_type = pattern["error_type"]
    subject = pattern["subject"]
    topic = pattern["topic"]

    # Add guidance based on error type
    if error_type == "distractor":
        fix_note = f"""
### FIX APPLIED (pattern: systematic_distractor for {subject}/{topic})
When generating distractors for {subject} {topic}:
- Ensure all 4 options are plausible and similar in length
- Distractors should represent REAL student errors
- Avoid duplicate or near-duplicate options
- Vary the wording but keep similar complexity
"""
    elif error_type == "grammar":
        fix_note = f"""
### FIX APPLIED (pattern: systematic_grammar for {subject}/{topic})
When generating questions for {subject} {topic}:
- Double-check Spanish grammar before finalizing
- Ensure proper accent marks and punctuation
- Questions must end with proper punctuation (., ?, !)
"""
    elif error_type == "coherence":
        fix_note = f"""
### FIX APPLIED (pattern: systematic_coherence for {subject}/{topic})
When generating questions for {subject} {topic}:
- Ensure questions have sufficient context
- Statements must be complete and clear
"""
    else:
        fix_note = ""

    # Append fix to prompt
    return prompt_content + fix_note


def modify_generator_prompt(patterns: list) -> tuple:
    """Modify generator prompt for systematic patterns. Returns (modified, commit_hash)."""
    prompt_path, prompt_content = get_current_prompt()
    if not prompt_path:
        return False, ""

    modified = False
    for pattern in patterns:
        if pattern["count"] >= 3 and not pattern["fix_applied"]:
            prompt_content = apply_pattern_fix(pattern, prompt_content)
            pattern["fix_applied"] = True
            modified = True

    if modified:
        # Write back
        with open(prompt_path, "w", encoding="utf-8") as f:
            f.write(prompt_content)

        # Git commit
        try:
            workdir = str(prompt_path.parent.parent.parent)
            subprocess.run(["git", "add", "."], cwd=workdir, capture_output=True)
            result = subprocess.run(
                ["git", "commit", "-m", f"fix(generator): apply pattern fixes from review"],
                cwd=workdir,
                capture_output=True,
                text=True,
            )
            commit_hash = result.stdout.strip()[-8:] if result.stdout else ""
        except Exception as e:
            commit_hash = f"git_error: {e}"

        return True, commit_hash

    return False, ""


def report_to_cortex(review_result: dict):
    """Send review results to Cortex."""
    bundle_id = review_result["bundle_id"]
    payload = {
        "path": f"projects/worldexams/review/{bundle_id}",
        "content": json.dumps(review_result, ensure_ascii=False),
    }

    try:
        import urllib.request

        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            CORTEX_URL, data=data, headers={"Content-Type": "application/json", "X-Cortex-Token": CORTEX_TOKEN}
        )
        with urllib.request.urlopen(req, timeout=10) as r:
            return r.status == 200
    except Exception as e:
        print(f"  ⚠️ Cortex report failed: {e}")
        return False


def main():
    if len(sys.argv) < 2:
        print("Usage: review_bundles.py <bundle_path>")
        sys.exit(1)

    bundle_path = sys.argv[1]

    if not os.path.exists(bundle_path):
        print(f"❌ Bundle not found: {bundle_path}")
        sys.exit(1)

    print(f"🔍 Reviewing bundle: {bundle_path}")

    # Deep review
    review_result = deep_review(bundle_path)

    print(f"  Score: {review_result['review_score']}")
    print(f"  Questions: {review_result['total_questions']}")
    print(f"  Errors: {len(review_result['errors'])}")
    print(f"  Patterns: {len(review_result['patterns'])}")

    if review_result["errors"]:
        for err in review_result["errors"][:5]:
            print(f"    - [{err['type']}] Q{err['question']}: {err['detail']}")

    # Modify generator if systematic patterns found
    generator_modified = False
    commit_hash = ""

    if review_result["patterns"]:
        print(f"\n  🔧 Applying generator fixes for {len(review_result['patterns'])} patterns...")
        generator_modified, commit_hash = modify_generator_prompt(review_result["patterns"])
        if generator_modified:
            print(f"  ✅ Generator prompt modified, commit: {commit_hash}")
        else:
            print(f"  ⚠️ Could not modify generator prompt (file not found)")

    review_result["generator_modified"] = generator_modified
    review_result["commit_hash"] = commit_hash

    # Report to Cortex
    cortex_ok = report_to_cortex(review_result)
    print(f"  📡 Cortex report: {'✅' if cortex_ok else '⚠️ failed'}")

    # Output JSON for main agent
    output = {
        "bundle_id": review_result["bundle_id"],
        "review_score": review_result["review_score"],
        "errors": review_result["errors"],
        "patterns": review_result["patterns"],
        "generator_modified": generator_modified,
        "commit_hash": commit_hash,
    }

    print(f"\n##REVIEW_OUTPUT##{json.dumps(output)}##END_REVIEW_OUTPUT##")


if __name__ == "__main__":
    main()
