#!/usr/bin/env python3
"""
WorldExams Bundle Post-Processor
Normalizes generated content to validator's expected format.
Integrated into the generation pipeline.
"""
import re


def normalize_bundle(content):
    """
    Normalize generated bundle to validator's expected format.
    Converts any MiniMax output format to standard ## Question N / - [ ] A) format.

    Returns: normalized content string
    """
    # Extract frontmatter
    fm_match = re.match(r"^(---\n.*?\n---)\n", content, re.DOTALL)
    if not fm_match:
        return content  # No frontmatter, return as-is

    frontmatter = fm_match.group(1)
    body = content[fm_match.end() :]

    # Normalize the body
    body = normalize_body(body)

    return frontmatter + "\n" + body


def normalize_body(body):
    """Normalize the question body to standard format."""
    lines = body.split("\n")
    result = []
    i = 0

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Skip REVIEW METADATA blocks
        if stripped.startswith("# REVIEW METADATA"):
            # Skip until next section
            while i < len(lines) and lines[i].strip() not in ("---", ""):
                i += 1
            i += 1  # skip the --- if present
            continue

        # Convert question headers
        q_match = re.match(r"^#{1,3}\s*(Pregunta|Question|P)\s*(\d+)", stripped, re.IGNORECASE)
        if q_match:
            q_num = q_match.group(2)
            result.append(f"## Question {q_num}")
            i += 1
            continue

        # Skip **P1.** bold markers
        bold_q = re.match(r"^\*\*(P)(\d+)\.\*\*", stripped)
        if bold_q:
            result.append(f"## Question {bold_q.group(2)}")
            i += 1
            continue

        # Skip standalone P1. P2. markers followed by content
        standalone = re.match(r"^\(?(P?)(\d+)\.\s*$", stripped)
        if standalone and i + 1 < len(lines) and len(lines[i + 1].strip()) > 15:
            result.append(f"## Question {standalone.group(2)}")
            i += 1
            continue

        # Convert options
        opt_match = re.match(r"^([A-D])\)\s*(.+)$", stripped)
        if opt_match:
            letter = opt_match.group(1)
            text = opt_match.group(2).strip()
            text = clean_bold(text)
            text = format_feedback(text)
            result.append(f"- [ ] {letter}) {text}")
            i += 1
            continue

        # Handle markdown list options
        md_opt = re.match(r"^-\s*\[([ xX]?)\]\s*([A-D])\)\s*(.+)$", stripped)
        if not md_opt:
            md_opt = re.match(r"^-\s*([A-D])\)\s*(.+)$", stripped)

        if md_opt:
            if len(md_opt.groups()) == 3:
                mark = md_opt.group(1) if md_opt.group(1).strip() else " "
                letter = md_opt.group(2)
                text = md_opt.group(3).strip()
            else:
                letter = md_opt.group(1)
                text = md_opt.group(2).strip()
                mark = "x" if "[x]" in text.lower() else " "
                text = re.sub(r"\[x\]\s*", "", text, flags=re.IGNORECASE)

            text = clean_bold(text)
            text = format_feedback(text)
            result.append(f"- [{mark}] {letter}) {text}")
            i += 1
            continue

        # Remove stray answer markers
        if re.match(r"^\*\*[A-D]\*\*$", stripped):
            i += 1
            continue

        result.append(line)
        i += 1

    return "\n".join(result)


def clean_bold(text):
    """Remove bold markers from text."""
    return re.sub(r"\*\*(.*?)\*\*", r"\1", text)


def format_feedback(text):
    """Ensure feedback is in <!-- feedback: ... --> format."""
    # If already has the tag, do nothing
    if "<!-- feedback:" in text:
        return text

    # Check for common feedback markers
    feedback_markers = [r"Feedback:", r"Retroalimentación:", r"Explicación:", r"Porque:", r"Razón:"]

    for marker in feedback_markers:
        match = re.search(f"{marker}\s*(.+)$", text, re.IGNORECASE)
        if match:
            feedback_content = match.group(1).strip()
            base_text = text[: match.start()].strip()
            return f"{base_text} <!-- feedback: {feedback_content} -->"

    return text
