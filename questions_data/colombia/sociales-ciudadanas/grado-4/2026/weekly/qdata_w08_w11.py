#!/usr/bin/env python3
# Question data for W08-W11, loaded as module data

import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def make_q(ctx, bloom, icfes, d, stem, opts, exp):
    return {
        "ctx": ctx, "bloom": bloom, "icfes": icfes, "d": d,
        "stem": stem, "opts": opts, "exp": exp
    }

# W08: Organización territorial: veredas, corregimientos, municipios
W08 = [
    make_q("En la clase de Sociales de la I.E. Gabriel García Márquez de Medellín, la profesora explica las formas de organización territorial.",
     "Remember","Uso comprensivo del conocimiento social",3,
     "Una vereda en Colombia es:",
     [("Una división del área rural de un municipio, compuesta por terrenos y viviendas dispersas.", True, "La vereda es la división más pequeña del área rural del municipio colombiano. Se compone de predios rurales dispersos, sin un centro poblado definido."),
      ("Una ciudad pequeña con alcalde propio.", False, "Las ciudades pequeñas son cabeceras municipales, no veredas. La vereda no tiene alcalde propio."),
      ("Un barrio de una gran ciudad.", False, "Los barrios son divisiones del área urbana de las ciudades, mientras que las veredas son rurales."),
      ("Un departamento con gobierno propio.", False, "Los departamentos son entidades territoriales mucho más grandes que agrupan municipios, no veredas.")],
     "Se evalúa el concepto de vereda como unidad rural básica. La vereda es la división más pequeña del área rural municipal. El error común es confundirla con un barrio urbano o con una entidad territorial mayor."),
]

ALL_WEEKS = {"W08": W08}
