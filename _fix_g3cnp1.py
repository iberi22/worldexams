#!/usr/bin/env python3
"""Fix G3 CN P1: extend to 10 questions"""
import json

with open('_questions_data_full.json', encoding='utf-8') as f:
    d = json.load(f)

q = d['3_ciencias-naturales_P1']
print(f'Currently {len(q)} questions')

new_qs = [
    {'c': 'En Sincelejo, aprenden sobre higiene de los sentidos.', 'e': '\u00bfC\u00f3mo cuidamos el gusto?', 'opts': [['A', 'Cepillando la lengua', 'Correcto.'], ['B', 'Comiendo mucho dulce', 'No.'], ['C', 'Comiendo picante', 'No.'], ['D', 'No lavando dientes', 'No.']], 'a': 'A', 'fb': 'Cepillar la lengua mantiene saludables las papilas gustativas.'},
    {'c': 'En Armenia, juegan a identificar sonidos con los ojos cerrados.', 'e': '\u00bfQu\u00e9 sentido usas al escuchar un p\u00e1jaro cantar?', 'opts': [['A', 'Vista', 'No.'], ['B', 'O\u00eddo', 'Correcto.'], ['C', 'Tacto', 'No.'], ['D', 'Olfato', 'No.']], 'a': 'B', 'fb': 'El o\u00eddo capta las ondas sonoras del canto del p\u00e1jaro.'},
    {'c': 'En Neiva, hablan de explorar la naturaleza.', 'e': '\u00bfQu\u00e9 sentido te avisa si algo huele quemado?', 'opts': [['A', 'Gusto', 'No.'], ['B', 'Tacto', 'No.'], ['C', 'Olfato', 'Correcto.'], ['D', 'Vista', 'No.']], 'a': 'C', 'fb': 'El olfato detecta olores, incluso peligrosos como humo o gas.'},
    {'c': 'En Pasto, hacen un ejercicio de mapeo de sabores en la lengua.', 'e': '\u00bfEn qu\u00e9 zona de la lengua se siente el sabor dulce principalmente?', 'opts': [['A', 'Punta', 'Correcto.'], ['B', 'Fondo', 'No, amargo.'], ['C', 'Lados', '\u00c1cido.'], ['D', 'Centro', 'No.']], 'a': 'A', 'fb': 'La punta de la lengua es m\u00e1s sensible al sabor dulce.'},
    {'c': 'En Valledupar, aprenden la funci\u00f3n protectora de los p\u00e1rpados.', 'e': '\u00bfPor qu\u00e9 parpadeamos?', 'opts': [['A', 'Para ver mejor', 'No.'], ['B', 'Para humedecer y proteger los ojos', 'Correcto.'], ['C', 'Para escuchar', 'No.'], ['D', 'Para oler', 'No.']], 'a': 'B', 'fb': 'Parpadear humedece el ojo con l\u00e1grimas y lo protege del polvo.'},
]
for nq in new_qs:
    q.append(nq)

print(f'Now {len(q)} questions')

with open('_questions_data_full.json', 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
print('Saved')
