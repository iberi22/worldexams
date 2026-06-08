import os
d = 'questions_data/colombia/matematicas/grado-3/2026'
errors = []
ok_count = 0
total_q = 0
for root, dirs, files in os.walk(d):
    for f in sorted(files):
        if not f.endswith('.md'):
            continue
        fp = os.path.join(root, f)
        with open(fp, 'r', encoding='utf-8') as fh:
            content = fh.read()
        
        ok_count += 1
        
        # Check frontmatter
        if not content.startswith('---'):
            errors.append(f'{f}: missing frontmatter start')
            continue
        fm_end = content.find('---', 3)
        if fm_end == -1:
            errors.append(f'{f}: missing frontmatter end')
            continue
        frontmatter = content[3:fm_end].strip()
        
        # Check required fields
        for field in ['id:', 'protocol_version:', 'bundle_size:', 'calibration:']:
            if field not in frontmatter:
                errors.append(f'{f}: missing {field}')
        
        # Count questions
        q_count = content.count('## Question')
        total_q += q_count
        
        is_weekly = 'weekly' in root
        is_periodo = 'periodos' in root
        
        if is_weekly and q_count != 10:
            errors.append(f'{f}: expected 10 questions, got {q_count}')
        elif is_periodo and q_count != 15:
            errors.append(f'{f}: expected 15 questions, got {q_count}')
        
        # Check explicacion for each question
        expl_count = content.count('### Explicacion Pedagogica')
        if expl_count != q_count:
            errors.append(f'{f}: expected {q_count} explicaciones, got {expl_count}')
        
        # Check each question has ID
        qid_count = content.count('**ID:**')
        if qid_count != q_count:
            errors.append(f'{f}: expected {q_count} IDs, got {qid_count}')

if errors:
    for e in errors:
        print(f'ERROR: {e}')
    print(f'Total errors: {len(errors)}')
else:
    print(f'ALL {ok_count} bundles VALID!')
    print(f'Total questions: {total_q}')
    w_count = sum(1 for r,d,fs in os.walk(d) for f in fs if f.endswith('.md') and 'weekly' in r)
    p_count = sum(1 for r,d,fs in os.walk(d) for f in fs if f.endswith('.md') and 'periodos' in r)
    print(f'Weekly packs: {w_count}')
    print(f'Period bundles: {p_count}')
