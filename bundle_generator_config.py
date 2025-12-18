#!/usr/bin/env python3
"""
Generator de bundles Protocol v2.0 para World Exams
Regenera preguntas faltantes siguiendo estándar pedagógico
"""

MATH_BUNDLES = {
    # ÁLGEBRA
    "CO-MAT-11-ALG-001": {
        "tema": "Ecuaciones Lineales",
        "subtemas": ["Ecuaciones simples", "Ecuaciones con variables en ambos lados", "Problemas de aplicación"]
    },
    "CO-MAT-11-ALG-002": {
        "tema": "Sistemas de Ecuaciones Lineales",
        "subtemas": ["Métodos de solución", "Interpretación gráfica", "Aplicaciones"]
    },
    "CO-MAT-11-ALG-003": {
        "tema": "Inecuaciones Lineales",
        "subtemas": ["Inecuaciones simples", "Sistemas de inecuaciones", "Aplicaciones"]
    },
    "CO-MAT-11-ALG-004": {
        "tema": "Ecuaciones Cuadráticas",
        "subtemas": ["Factorización", "Fórmula cuadrática", "Aplicaciones"]
    },
    "CO-MAT-11-ALG-005": {
        "tema": "Polinomios",
        "subtemas": ["Operaciones básicas", "Factorización", "División sintética"]
    },
    "CO-MAT-11-algebra-002": {
        "tema": "Expresiones Algebraicas",
        "subtemas": ["Simplificación", "Fracciones algebraicas", "Radicales"]
    },

    # CÁLCULO
    "CO-MAT-11-derivadas-001": {
        "tema": "Límites",
        "subtemas": ["Límites por definición", "Propiedades", "Límites al infinito"]
    },
    "CO-MAT-11-derivadas-002": {
        "tema": "Derivadas Básicas",
        "subtemas": ["Definición de derivada", "Regla de potencia", "Derivadas de funciones básicas"]
    },
    "CO-MAT-11-derivadas-003": {
        "tema": "Reglas de Derivación",
        "subtemas": ["Regla del producto", "Regla del cociente", "Regla de la cadena"]
    },
    "CO-MAT-11-derivadas-004": {
        "tema": "Derivadas Trigonométricas",
        "subtemas": ["Derivadas de sen/cos", "Derivadas de tan", "Aplicaciones"]
    },
    "CO-MAT-11-derivadas-005": {
        "tema": "Aplicaciones de Derivadas",
        "subtemas": ["Máximos y mínimos", "Monotonía", "Optimización"]
    },
    "CO-MAT-11-derivadas-006": {
        "tema": "Análisis de Funciones",
        "subtemas": ["Concavidad", "Puntos de inflexión", "Gráficas"]
    },

    # ESTADÍSTICA
    "CO-MAT-11-EST-001": {
        "tema": "Medidas de Tendencia Central",
        "subtemas": ["Media", "Mediana", "Moda"]
    },
    "CO-MAT-11-EST-002": {
        "tema": "Medidas de Dispersión",
        "subtemas": ["Rango", "Varianza", "Desviación estándar"]
    },
    "CO-MAT-11-EST-003": {
        "tema": "Probabilidad Básica",
        "subtemas": ["Espacios muestrales", "Eventos", "Probabilidad simple"]
    },
    "CO-MAT-11-EST-004": {
        "tema": "Probabilidad Condicional",
        "subtemas": ["Probabilidad condicional", "Teorema de Bayes", "Independencia"]
    },
    "CO-MAT-11-EST-005": {
        "tema": "Distribuciones",
        "subtemas": ["Distribución normal", "Distribución binomial", "Aplicaciones"]
    },
    "CO-MAT-11-estadistica-001": {
        "tema": "Análisis de Datos",
        "subtemas": ["Tablas de frecuencia", "Gráficos", "Correlación"]
    },

    # GEOMETRÍA
    "CO-MAT-11-GEO-001": {
        "tema": "Trigonometría Básica",
        "subtemas": ["Razones trigonométricas", "Triángulos rectángulos", "Identidades"]
    },
    "CO-MAT-11-GEO-002": {
        "tema": "Funciones Trigonométricas",
        "subtemas": ["Gráficas", "Período y amplitud", "Transformaciones"]
    },
    "CO-MAT-11-GEO-003": {
        "tema": "Leyes de Senos y Cosenos",
        "subtemas": ["Ley de senos", "Ley de cosenos", "Resolución de triángulos"]
    },
    "CO-MAT-11-GEO-004": {
        "tema": "Vectores en el Plano",
        "subtemas": ["Operaciones vectoriales", "Producto escalar", "Aplicaciones"]
    },
    "CO-MAT-11-GEO-005": {
        "tema": "Geometría Analítica",
        "subtemas": ["Rectas", "Cónicas", "Distancia entre puntos"]
    },
    "CO-MAT-11-geometria-mix-001": {
        "tema": "Geometría Integrada",
        "subtemas": ["Ángulos", "Áreas", "Volúmenes"]
    },

    # OTROS
    "CO-MAT-11-poligonos-001": {
        "tema": "Propiedades de Polígonos",
        "subtemas": ["Ángulos internos", "Perímetro", "Clasificación"]
    },
    "CO-MAT-11-poligonos-002": {
        "tema": "Cuadriláteros",
        "subtemas": ["Paralelogramos", "Trapecios", "Propiedades especiales"]
    },
    "CO-MAT-11-poligonos-003": {
        "tema": "Polígonos Regulares",
        "subtemas": ["Propiedades", "Apotema", "Área"]
    },
    "CO-MAT-11-poligonos-004": {
        "tema": "Círculos y Arcos",
        "subtemas": ["Circunferencia", "Arcos", "Sectores"]
    },
    "CO-MAT-11-poligonos-005": {
        "tema": "Simetría y Transformaciones",
        "subtemas": ["Simetría", "Rotaciones", "Reflexiones"]
    },
    "CO-MAT-11-poligonos-006": {
        "tema": "Polígonos Complejos",
        "subtemas": ["Áreas combinadas", "Perímetros", "Problemas prácticos"]
    },

    "CO-MAT-11-porcentajes-001": {
        "tema": "Porcentajes Básicos",
        "subtemas": ["Cálculo de porcentajes", "Cambios porcentuales", "Aplicaciones"]
    },
    "CO-MAT-11-porcentajes-002": {
        "tema": "Descuentos e Incrementos",
        "subtemas": ["Descuentos simples", "Descuentos compuestos", "IVA"]
    },
    "CO-MAT-11-porcentajes-003": {
        "tema": "Interés Simple",
        "subtemas": ["Fórmulas", "Aplicaciones financieras", "Problemas de tiempo"]
    },
    "CO-MAT-11-porcentajes-004": {
        "tema": "Interés Compuesto",
        "subtemas": ["Capitalización", "Períodos diferentes", "Aplicaciones"]
    },
    "CO-MAT-11-porcentajes-005": {
        "tema": "Proporciones",
        "subtemas": ["Regla de tres", "Proporciones directas", "Proporciones inversas"]
    },
    "CO-MAT-11-porcentajes-006": {
        "tema": "Aplicaciones Financieras",
        "subtemas": ["Amortización", "Anualidades", "Problemas complejos"]
    },

    "CO-MAT-11-raices-001": {
        "tema": "Radicales Básicos",
        "subtemas": ["Definición", "Simplificación", "Operaciones básicas"]
    },
    "CO-MAT-11-raices-002": {
        "tema": "Operaciones con Radicales",
        "subtemas": ["Suma y resta", "Multiplicación y división", "Racionalización"]
    },
    "CO-MAT-11-raices-003": {
        "tema": "Exponentes Racionales",
        "subtemas": ["Propiedades", "Conversión", "Simplificación"]
    },
    "CO-MAT-11-raices-004": {
        "tema": "Ecuaciones con Radicales",
        "subtemas": ["Resolución", "Verificación", "Aplicaciones"]
    },
    "CO-MAT-11-raices-005": {
        "tema": "Radicales Complejos",
        "subtemas": ["Anidados", "Combinaciones", "Simplificación avanzada"]
    },
    "CO-MAT-11-raices-006": {
        "tema": "Aplicaciones de Radicales",
        "subtemas": ["Geometría", "Física", "Problemas prácticos"]
    },

    "CO-MAT-11-operaciones-basicas-001": {
        "tema": "Operaciones Aritméticas Avanzadas",
        "subtemas": ["Orden de operaciones", "Fracciones", "Decimales"]
    },
    "CO-MAT-11-operaciones-basicas-002": {
        "tema": "Números Enteros",
        "subtemas": ["Propiedades", "Operaciones", "Divisibilidad"]
    },
    "CO-MAT-11-operaciones-basicas-003": {
        "tema": "Números Racionales",
        "subtemas": ["Comparación", "Operaciones", "Representación"]
    },
    "CO-MAT-11-operaciones-basicas-004": {
        "tema": "Números Reales",
        "subtemas": ["Irracionales", "Propiedades", "Recta numérica"]
    },
    "CO-MAT-11-operaciones-basicas-005": {
        "tema": "Números Complejos",
        "subtemas": ["Forma algebraica", "Operaciones", "Aplicaciones"]
    },
    "CO-MAT-11-operaciones-basicas-006": {
        "tema": "Operaciones Combinadas",
        "subtemas": ["Problemas multi-paso", "Estrategias", "Contextualización"]
    },

    "CO-MAT-11-funciones-001": {
        "tema": "Funciones Elementales",
        "subtemas": ["Lineal", "Cuadrática", "Polinómica"]
    },
}

LECTURA_BUNDLES = {
    "CO-LEC-11-argumentativo-001": {
        "tema": "Análisis de Argumentos",
        "competencia": "Identificar tesis, argumentos y evaluar validez"
    },
    "CO-LEC-11-argumentativo-002": {
        "tema": "Falacias Lógicas",
        "competencia": "Identificar y analizar falacias en argumentos"
    },
    "CO-LEC-11-comprension-001": {
        "tema": "Comprensión Literal",
        "competencia": "Extraer información explícita del texto"
    },
    "CO-LEC-11-comprension-002": {
        "tema": "Inferencia Básica",
        "competencia": "Deducir información implícita del texto"
    },
    "CO-LEC-11-inferencia-001": {
        "tema": "Lectura Entre Líneas",
        "competencia": "Interpretar significados implícitos"
    },
    "CO-LEC-11-inferencia-002": {
        "tema": "Intención del Autor",
        "competencia": "Identificar propósito y tono del autor"
    },
    "CO-LEC-11-inferencia-003": {
        "tema": "Análisis Crítico",
        "competencia": "Evaluar críticamente el contenido"
    },
    "CO-LEC-11-textos-continuos-001": {
        "tema": "Artículos Periodísticos",
        "competencia": "Análisis de textos informativos"
    },
    "CO-LEC-11-textos-continuos-002": {
        "tema": "Ensayos",
        "competencia": "Análisis de textos argumentativos"
    },
    "CO-LEC-11-textos-continuos-003": {
        "tema": "Literatura Colombiana",
        "competencia": "Comprensión de textos literarios"
    },
    "CO-LEC-11-textos-continuos-004": {
        "tema": "Textos Científicos",
        "competencia": "Comprensión de textos técnico-científicos"
    },
    "CO-LEC-11-textos-continuos-005": {
        "tema": "Textos Históricos",
        "competencia": "Análisis de documentos históricos"
    },
    "CO-LEC-11-textos-continuos-mix-001": {
        "tema": "Textos Mixtos",
        "competencia": "Análisis de múltiples tipologías"
    },
    "CO-LEC-11-vocabulario-001": {
        "tema": "Palabras en Contexto",
        "competencia": "Deducir significado de palabras desconocidas"
    },
}

print(f"Total bundles Matemáticas: {len(MATH_BUNDLES)}")
print(f"Total bundles Lectura Crítica: {len(LECTURA_BUNDLES)}")
print(f"Total bundles: {len(MATH_BUNDLES) + len(LECTURA_BUNDLES)}")
