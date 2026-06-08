import sys
sys.path.insert(0, r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly\_gen_bundles")
exec(open(r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly\_gen_bundles\run_generator.py", encoding="utf-8").read())
for w in sorted(TOPICS):
    print(f"W{w:02d}: {TOPICS[w]['slug']}")
