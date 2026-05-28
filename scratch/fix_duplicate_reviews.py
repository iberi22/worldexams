import os
import re


def fix_bundle(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if not content.startswith("---"):
        return

    # Split frontmatter
    parts = content.split("---", 2)
    if len(parts) < 3:
        return

    frontmatter = parts[1]
    body = parts[2]

    # Check for multiple review: keys
    # We want to keep only the last occurrence of 'review:' and its block

    review_blocks = list(re.finditer(r"(?m)^review:\s*$", frontmatter))

    if len(review_blocks) <= 1:
        return

    print(f"Fixing {filepath} ({len(review_blocks)} reviews found)")

    # Find the last review block
    last_review_start = review_blocks[-1].start()

    # Get everything before the first review block
    first_review_start = review_blocks[0].start()
    header = frontmatter[:first_review_start]

    # Get the last review block
    last_review_block = frontmatter[last_review_start:]

    # Reconstruct frontmatter
    # Note: This assumes nothing important exists BETWEEN review blocks that we want to keep
    # In these files, it's just '# REVIEW METADATA' comments.

    new_frontmatter = header + last_review_block

    new_content = "---" + new_frontmatter + "---" + body

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)


def walk_and_fix(root_dir):
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".md"):
                fix_bundle(os.path.join(root, file))


if __name__ == "__main__":
    walk_and_fix("questions_data/colombia")
