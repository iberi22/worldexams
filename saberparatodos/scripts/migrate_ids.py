import os
import re
import hashlib
import yaml

# Mappings for prefixes
PREFIX_MAP = {
    'matemáticas': 'MAT',
    'matematicas': 'MAT',
    'ciencias': 'NAT',
    'naturales': 'NAT',
    'sociales': 'SOC',
    'ciudadanas': 'SOC',
    'inglés': 'ING',
    'ingles': 'ING',
    'lectura': 'LEC',
    'crítica': 'LEC',
    'critica': 'LEC',
    'filosofía': 'FIL',
    'filosofia': 'FIL',
    'física': 'FIS',
    'fisica': 'FIS',
    'química': 'QUI',
    'quimica': 'QUI'
}

def get_prefix(subject):
    subject = subject.lower()
    for key, prefix in PREFIX_MAP.items():
        if key in subject:
            return prefix
    return 'GEN'

def generate_id(prefix, content_str, version='01'):
    # Create a stable hash based on the content (excluding frontmatter)
    hasher = hashlib.md5()
    hasher.update(content_str.encode('utf-8'))
    # Take first 5 digits of the integer value of the hash
    hash_int = int(hasher.hexdigest(), 16)
    unique_id = hash_int % 100000
    return f"{prefix}{unique_id:05d}-{version}", f"{prefix}{unique_id:05d}"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split frontmatter and body
    # Assuming standard --- frontmatter ---
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', content, re.DOTALL)
    if not match:
        print(f"Skipping {filepath}: No valid frontmatter found.")
        return

    frontmatter_str = match.group(1)
    body = match.group(2)

    try:
        data = yaml.safe_load(frontmatter_str)
    except yaml.YAMLError as e:
        print(f"Error parsing YAML in {filepath}: {e}")
        return

    # Check if already migrated (simple check: ID matches pattern)
    current_id = str(data.get('id', ''))
    if re.match(r'^[A-Z]{3}\d{5}-\d{2}$', current_id):
        # Already migrated, maybe update hash but keep ID if content hasn't changed?
        # For now, let's skip to avoid changing IDs of already migrated files unless forced.
        # But user said "update specifications", so maybe we should ensure consistency.
        # Let's re-generate to ensure it matches the "database" logic.
        pass

    subject = data.get('asignatura', 'General')
    prefix = get_prefix(subject)

    # Extract version from current ID if possible, else 01
    version = '01'
    if re.search(r'-(\d{2})$', current_id):
        version = re.search(r'-(\d{2})$', current_id).group(1)

    new_id, group_id = generate_id(prefix, body, version)

    # Update data
    data['id'] = new_id
    data['group_id'] = group_id

    # Reconstruct file
    new_frontmatter = yaml.dump(data, allow_unicode=True, sort_keys=False).strip()
    new_content = f"---\n{new_frontmatter}\n---\n{body}"

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Updated {filepath}: {current_id} -> {new_id}")

def main():
    base_dir = os.path.join('src', 'content', 'questions')
    if not os.path.exists(base_dir):
        print(f"Directory {base_dir} not found.")
        return

    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.md'):
                process_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
