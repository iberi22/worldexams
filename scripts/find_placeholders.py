import os

ROOT_DIR = r"e:\scripts-python\worldexams\src\content\questions"
PLACEHOLDER_TEXT = "pendiente de recuperación"

def find_placeholders():
    files_with_placeholders = []
    for root, dirs, files in os.walk(ROOT_DIR):
        for file in files:
            if file.endswith(".md"):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    if PLACEHOLDER_TEXT in f.read():
                        files_with_placeholders.append(path)

    print(f"Found {len(files_with_placeholders)} files with placeholders.")
    for f in files_with_placeholders:
        print(f" - {os.path.basename(f)}")

if __name__ == "__main__":
    find_placeholders()
