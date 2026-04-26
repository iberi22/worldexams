import json, os

q = json.load(open(r'E:\scripts-python\worldexams\.worldexams\generation\queue.json', 'r', encoding='utf-8'))
tasks = q['tasks']

topics_by_grade = {
    6: {
        'ciencias-naturales': ['la-celula', 'propiedades-de-la-materia', 'sistemas-del-cuerpo-humano', 'agricultura-vertical', 'bioetica-animal', 'cambio-climatico-y-geoingenieria', 'mecanica-cuantica-introduccion', 'energia-de-fusion-y-fision', 'exploracion-espacial-y-multiplanetarismo', 'nanotecnologia', 'neurociencias-y-el-cerebro-digital'],
        'sociales-ciudadanas': ['civilizaciones-antiguas', 'gobierno-escolar-y-democracia', 'geografia-de-colombia', 'culturas-precolombinas-de-colombia', 'el-universo']
    },
    9: {
        'ciencias-naturales': ['ecologia-ciclos-biogeoquimicos', 'fisica-movimiento-y-fuerzas', 'biologia-genetica-y-herencia', 'quimica-ph-y-acidez', 'quimica-tabla-periodica-y-enlaces', 'biologia-sistema-nervioso', 'biologia-taxonomia', 'genetica'],
        'sociales-ciudadanas': ['colombia-siglo-xx', 'demografia-y-poblacion', 'derechos-humanos', 'dictaduras-en-america-latina', 'introduccion-a-la-economia', 'sectores-economicos', 'periodo-de-entreguerras', 'geografia-politica-y-humana', 'globalizacion', 'guerra-fria', 'imperialismo-y-colonialismo', 'medio-ambiente-y-desarrollo', 'organismos-internacionales', 'participacion-ciudadana', 'primera-guerra-mundial', 'revolucion-rusa', 'segunda-guerra-mundial']
    }
}

subjects = ['ciencias-naturales', 'sociales-ciudadanas']
periodos = [1, 2, 3, 4]

print("=== FILESYSTEM BUNDLE COUNTS ===")
for g in [6, 9]:
    for subj in subjects:
        path = f"E:\\scripts-python\\worldexams\\questions_data\\colombia\\{subj}\\grado-{g}"
        if not os.path.exists(path):
            print(f"  {subj}/grado-{g}: NO DIRECTORY")
            continue
        total = 0
        for per in ['periodo-1', 'periodo-2', 'periodo-3', 'periodo-4']:
            perpath = os.path.join(path, per)
            if not os.path.isdir(perpath):
                continue
            for top in os.listdir(perpath):
                toppath = os.path.join(perpath, top)
                if os.path.isdir(toppath):
                    cnt = len(os.listdir(toppath))
                    total += cnt
                    marker = " *** LOW ***" if cnt < 3 else ""
                    print(f"  {subj} g{g} {per}/{top}: {cnt} bundles{marker}")
        print(f"  SUBTOTAL {subj} g{g}: {total} bundles")

print("\n=== QUEUE STATUS ===")
for g in [6, 9]:
    for subj in subjects:
        gtasks = [t for t in tasks if t['subject']==subj and t['grado']==g]
        print(f"  {subj} g{g}: {len(gtasks)} tasks in queue")
        for t in gtasks:
            print(f"    P{t['periodo']} {t['topic']}: {t['status']}")