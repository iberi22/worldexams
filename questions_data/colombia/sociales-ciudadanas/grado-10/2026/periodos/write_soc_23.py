#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate Sociales P2-P3 bundles"""
import os

BASE = r"E:\scripts-python\worldexams\questions_data\colombia"

def write_file(subdir, period, filename_prefix, content):
    filename = f"{filename_prefix}-10-2026-P{period}-comprehensive-001-MASTERY-bundle.md"
    path = os.path.join(BASE, subdir, "grado-10", "2026", "periodos", filename)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Written: {filename}")

SOC_P23 = r"""---
id: "CO-SOC-10-2026-P2-comprehensive-001-MASTERY"
country: "colombia"
grado: 10
asignatura: "sociales-ciudadanas"
tema: "geopolitica-mundial, economia-colombiana"
periodo: 2
protocol_version: "5.2"
bundle_index: 1
bundle_size: 20
alignment: "DBA MEN + Pre-ICFES"
modern_context: true
distractor_profile: "plausible_peer_set"
---
# Bundle MASTERY: Geopolitica Mundial, Economia Colombiana (P2)

## Question 1 (D3)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v1
**Bloom:** Remember | **ICFES:** Pensamiento social
**Context:** En clase de geografia economica en Bucaramanga.
**Enunciado:** La globalizacion se refiere a:
**Options:**
- [x] A) La creciente interconexion economica, cultural y politica entre paises.
- [ ] B) El aislamiento de los paises.
- [ ] C) Solo el comercio de tecnologia.
- [ ] D) La desaparicion de las fronteras.

## Question 2 (D3)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v2
**Bloom:** Remember | **ICFES:** Pensamiento social
**Context:** En clase de economia en Cartagena.
**Enunciado:** El producto interno bruto (PIB) mide:
**Options:**
- [ ] A) La poblacion de un pais.
- [x] B) El valor total de bienes y servicios producidos en un pais en un periodo.
- [ ] C) La deuda externa.
- [ ] D) La inflacion.

## Question 3 (D4)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v3
**Bloom:** Understand | **ICFES:** Pensamiento social
**Context:** "La Union Europea es un bloque economico y politico de 27 paises."
**Enunciado:** Una caracteristica clave de la UE es:
**Options:**
- [ ] A) Tener un unico gobierno mundial.
- [x] B) Libre circulacion de personas, bienes, servicios y capitales entre sus miembros.
- [ ] C) Tener un solo idioma oficial.
- [ ] D) Ser una dictadura.

## Question 4 (D4)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v4
**Bloom:** Understand | **ICFES:** Pensamiento social
**Context:** "La inflacion en Colombia en 2023 fue del 9.28%."
**Enunciado:** La inflacion alta afecta principalmente:
**Options:**
- [ ] A) Solo a los ricos.
- [x] B) El poder adquisitivo de las familias, especialmente las de menores ingresos.
- [ ] C) A las exportaciones unicamente.
- [ ] D) Al gobierno exclusivamente.

## Question 5 (D5)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v5
**Bloom:** Apply | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Los BRICS buscan reconfigurar el orden global."
**Enunciado:** Los BRICS representan:
**Options:**
- [ ] A) Un bloque militar.
- [x] B) Un contrapeso al poder economico occidental (G7, FMI, Banco Mundial).
- [ ] C) Una union aduanera como la UE.
- [ ] D) Un tratado de libre comercio.

## Question 6 (D5)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v6
**Bloom:** Analyze | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Colombia exporta petroleo, carbon y cafe, e importa maquinaria y productos quimicos."
**Enunciado:** Esta estructura refleja:
**Options:**
- [ ] A) Alta diversificacion industrial.
- [x] B) Dependencia de materias primas y poca industrializacion.
- [ ] C) Autosuficiencia tecnologica.
- [ ] D) Comercio equilibrado.

## Question 7 (D5)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v7
**Bloom:** Apply | **ICFES:** Pensamiento social
**Context:** "La OTAN es una alianza militar fundada en 1949."
**Enunciado:** Cual es el principio de defensa colectiva de la OTAN?
**Options:**
- [ ] A) Cada pais se defiende solo.
- [x] B) Un ataque contra un miembro es un ataque contra todos (Articulo 5).
- [ ] C) Solo defienden paises europeos.
- [ ] D) No tiene ejercito.

## Question 8 (D6)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v8
**Bloom:** Analyze | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "El FMI otorgo prestamos a Colombia durante la pandemia por 5400 millones USD."
**Enunciado:** Una condicion tipica de los prestamos del FMI es:
**Options:**
- [ ] A) Que no hay condiciones.
- [x] B) Implementar reformas economicas de austeridad.
- [ ] C) Que el pais donante recibe beneficios.
- [ ] D) Que son a fondo perdido.

## Question 9 (D6)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v9
**Bloom:** Apply | **ICFES:** Pensamiento social
**Context:** "Guerra comercial entre EEUU y China afecta cadenas de suministro."
**Enunciado:** Una guerra comercial se refiere a:
**Options:**
- [ ] A) Conflicto militar.
- [x] B) Imposicion reciproca de aranceles y barreras comerciales.
- [ ] C) Acuerdo de libre comercio.
- [ ] D) Cooperacion economica.

## Question 10 (D6)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v10
**Bloom:** Understand | **ICFES:** Pensamiento social
**Context:** "Colombia es el tercer productor mundial de cafe."
**Enunciado:** La cafeultura colombiana se beneficia de:
**Options:**
- [ ] A) Su clima desertico.
- [x] B) Diversidad de pisos termicos y mano de obra calificada en el Eje Cafetero.
- [ ] C) Ausencia de plagas.
- [ ] D) Subsidios del gobierno.

## Question 11 (D7)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v11
**Bloom:** Analyze | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Conflicto Rusia-Ucrania (2022-): impactos globales."
**Enunciado:** Un impacto directo para Colombia ha sido:
**Options:**
- [ ] A) Aumento inversion rusa.
- [x] B) Aumento precio fertilizantes y alimentos importados.
- [ ] C) Migracion masiva de ucranianos a Colombia.
- [ ] D) Cierre comercio con Europa.

## Question 12 (D7)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v12
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "El TLC con EEUU (2012) elimino aranceles para muchos productos."
**Enunciado:** Un efecto NEGATIVO del TLC ha sido:
**Options:**
- [ ] A) Mayor exportacion de cafe.
- [x] B) Competencia desleal para pequenos agricultores vs productos subsidiados estadounidenses.
- [ ] C) Aumento de inversion extranjera.
- [ ] D) Mejora calidad productos.

## Question 13 (D7)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v13
**Bloom:** Evaluate | **ICFES:** Pensamiento social
**Context:** "Colombia ingreso a la OCDE en 2020."
**Enunciado:** Pertenecer a la OCDE implica:
**Options:**
- [ ] A) Perder soberania.
- [x] B) Adoptar estandares internacionales que mejoran la confianza inversionista.
- [ ] C) Pagar altas cuotas.
- [ ] D) Ser evaluado solo economicamente.

## Question 14 (D8)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v14
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "El narcotrafico en Colombia."
**Enunciado:** La relacion entre narcotrafico y economia colombiana es:
**Options:**
- [ ] A) Solo afecta positivamente el PIB.
- [x] B) Genera flujos ilegales que distorsionan la economia y financian actores armados.
- [ ] C) No tiene impacto economico.
- [ ] D) Es el principal sector economico.

## Question 15 (D8)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v15
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "ONU, OEA, OTAN, UA son organismos internacionales."
**Enunciado:** Cual tiene como mision principal la paz y seguridad internacional?
**Options:**
- [ ] A) La OEA.
- [x] B) El Consejo de Seguridad de la ONU.
- [ ] C) La Union Africana.
- [ ] D) La OCDE.

## Question 16 (D8)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v16
**Bloom:** Analyze | **ICFES:** Pensamiento social
**Context:** "Colombia tiene alta tasa de desempleo juvenil (~18% en 2023)."
**Enunciado:** El desempleo juvenil se explica principalmente por:
**Options:**
- [ ] A) Falta de educacion.
- [x] B) Desajuste entre formacion y demandas del mercado laboral, y falta de experiencia.
- [ ] C) Perez de los jovenes.
- [ ] D) Exceso de oferta laboral.

## Question 17 (D9)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v17
**Bloom:** Create | **ICFES:** Pensamiento social
**Context:** Politica para reducir dependencia economica del petroleo.
**Enunciado:** Cual estrategia seria la mas sostenible?
**Options:**
- [ ] A) Extraer mas petroleo.
- [x] B) Invertir en transicion energetica, agroindustria sostenible y turismo.
- [ ] C) No hacer nada.
- [ ] D) Reducir importaciones.

## Question 18 (D9)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v18
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Migracion venezolana: mas de 2.5 millones en Colombia."
**Enunciado:** El impacto demografico y economico ha sido:
**Options:**
- [ ] A) Exclusivamente negativo.
- [x] B) Mixto: presion sobre servicios pero tambien aumento fuerza laboral y consumo.
- [ ] C) Solo positivo.
- [ ] D) Imperceptible.

## Question 19 (D9)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v19
**Bloom:** Create | **ICFES:** Pensamiento social
**Context:** Debate sobre integracion en Alianza del Pacifico.
**Enunciado:** Un argumento a FAVOR de la integracion es:
**Options:**
- [ ] A) Aisla a Colombia.
- [x] B) Acceso a mercados amplios (Mexico, Peru, Chile) y atraccion de inversion.
- [ ] C) Aumenta barreras arancelarias.
- [ ] D) Reduce la soberania.

## Question 20 (D10)
**ID:** CO-SOC-10-2026-P2-comprehensive-001-MASTERY-v20
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Teoria de la dependencia (Prebisch): paises perifericos condicionados por centrales."
**Enunciado:** Un ejemplo actual seria:
**Options:**
- [ ] A) Crecimiento industrial de China.
- [x] B) Colombia exporta materias primas e importa manufacturas de alto valor, generando deficit comercial.
- [ ] C) La ayuda internacional.
- [ ] D) Los TLC.
"""

write_file("sociales-ciudadanas", "2", "CO-SOC", SOC_P23)

SOC_P3 = r"""---
id: "CO-SOC-10-2026-P3-comprehensive-001-MASTERY"
country: "colombia"
grado: 10
asignatura: "sociales-ciudadanas"
tema: "historia-siglo-XX, pensamiento-economico"
periodo: 3
protocol_version: "5.2"
bundle_index: 1
bundle_size: 20
alignment: "DBA MEN + Pre-ICFES"
modern_context: true
distractor_profile: "plausible_peer_set"
---
# Bundle MASTERY: Historia Siglo XX, Pensamiento Economico (P3)

## Question 1 (D3)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v1
**Bloom:** Remember | **ICFES:** Pensamiento social
**Context:** En clase de historia en Tunja.
**Enunciado:** La Primera Guerra Mundial (1914-1918) enfrento a:
**Options:**
- [ ] A) Aliados vs Eje.
- [x] B) Triple Entente vs Imperios Centrales.
- [ ] C) OTAN vs Pacto de Varsovia.
- [ ] D) EEUU vs Japon.

## Question 2 (D3)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v2
**Bloom:** Remember | **ICFES:** Pensamiento social
**Context:** En clase de economia.
**Enunciado:** Adam Smith propuso:
**Options:**
- [ ] A) Intervencion total del Estado.
- [x] B) La mano invisible del mercado como regulador.
- [ ] C) Abolicion de la propiedad privada.
- [ ] D) Control estatal de precios.

## Question 3 (D4)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v3
**Bloom:** Understand | **ICFES:** Pensamiento social
**Context:** "La Gran Depresion de 1929."
**Enunciado:** Una consecuencia global fue:
**Options:**
- [ ] A) Crecimiento economico.
- [ ] B) Fortalecimiento de democracias.
- [x] C) Auge de regimenes totalitarios y proteccionismo.
- [ ] D) Fin del capitalismo.

## Question 4 (D4)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v4
**Bloom:** Understand | **ICFES:** Pensamiento social
**Context:** "Keynes: en crisis, el Estado debe gastar para estimular."
**Enunciado:** Esta teoria es el:
**Options:**
- [ ] A) Liberalismo clasico.
- [x] B) Intervencionismo estatal (keynesianismo).
- [ ] C) Monetarismo.
- [ ] D) Socialismo.

## Question 5 (D5)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v5
**Bloom:** Apply | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "El Bogotazo (9 abril 1948) tras asesinato de Gaitan."
**Enunciado:** La Violencia (1948-1958) se caracterizo por:
**Options:**
- [ ] A) Conflicto entre estados.
- [x] B) Enfrentamientos bipartidistas (liberales vs conservadores) en zonas rurales.
- [ ] C) Guerra civil internacional.
- [ ] D) Movimiento independentista.

## Question 6 (D5)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v6
**Bloom:** Analyze | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Frente Nacional (1958-1974): pacto liberales-conservadores."
**Enunciado:** Una consecuencia fue:
**Options:**
- [ ] A) Fortalecimiento de la democracia participativa.
- [x] B) Exclusion de movimientos alternativos y surgimiento de guerrillas.
- [ ] C) Fin de la violencia.
- [ ] D) Modernizacion agricola.

## Question 7 (D5)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v7
**Bloom:** Apply | **ICFES:** Pensamiento social
**Context:** "Guerra Fria (1947-1991): EEUU vs URSS."
**Enunciado:** Conflicto proxy en America Latina:
**Options:**
- [ ] A) Segunda Guerra Mundial.
- [ ] B) Guerra de Vietnam.
- [x] C) Revolucion Cubana y guerrillas en Centroamerica.
- [ ] D) Primera Guerra Mundial.

## Question 8 (D6)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v8
**Bloom:** Analyze | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Neoliberalismo (Thatcher, Reagan, 80s): privatizacion y desregulacion."
**Enunciado:** En AL, resulto en:
**Options:**
- [ ] A) Reduccion desigualdad.
- [x] B) Privatizacion de empresas estatales y aumento de desigualdad.
- [ ] C) Fortalecimiento Estado bienestar.
- [ ] D) Nacionalizacion banca.

## Question 9 (D6)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v9
**Bloom:** Apply | **ICFES:** Pensamiento social
**Context:** "Revolucion Rusa 1917."
**Enunciado:** Idea central del marxismo-leninismo:
**Options:**
- [ ] A) Democracia liberal.
- [ ] B) Propiedad privada.
- [x] C) Dictadura del proletariado y propiedad colectiva.
- [ ] D) Libre mercado.

## Question 10 (D6)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v10
**Bloom:** Understand | **ICFES:** Pensamiento social
**Context:** "Genocidio de Ruanda 1994."
**Enunciado:** Fue consecuencia de:
**Options:**
- [ ] A) Desastres naturales.
- [x] B) Tensiones etnicas exacerbadas por colonialismo belga.
- [ ] C) Conflictos religiosos.
- [ ] D) Guerra Fria.

## Question 11 (D7)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v11
**Bloom:** Analyze | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Dictaduras militares en Cono Sur (70s, 80s): Plan Condor."
**Enunciado:** El Plan Condor fue:
**Options:**
- [ ] A) Plan economico.
- [x] B) Red de cooperacion entre dictaduras para perseguir opositores.
- [ ] C) Tratado de paz.
- [ ] D) Plan de desarrollo.

## Question 12 (D7)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v12
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Constitucion 1991: tutela, Corte Constitucional, descentralizacion."
**Enunciado:** La descentralizacion implico:
**Options:**
- [ ] A) Mas poder al presidente.
- [x] B) Transferencia de competencias y recursos a municipios y departamentos.
- [ ] C) Eliminacion de gobernaciones.
- [ ] D) Centralizacion en Bogota.

## Question 13 (D7)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v13
**Bloom:** Evaluate | **ICFES:** Pensamiento social
**Context:** "Caida Muro Berlin 1989 = fin Guerra Fria."
**Enunciado:** El orden mundial post-Guerra Fria se caracterizo por:
**Options:**
- [ ] A) Bipolaridad renovada.
- [x] B) Unipolaridad estadounidense y posterior surgimiento de potencias multipolares (China).
- [ ] C) Desaparicion de conflictos.
- [ ] D) Nuevo orden socialista.

## Question 14 (D8)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v14
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Paramilitarismo en Colombia (1990-2000)."
**Enunciado:** La relacion entre paramilitares y Estado fue:
**Options:**
- [ ] A) Legal y constitucional.
- [x] B) Ambivalente: complicidad de sectores del Estado pero tambien condenas judiciales.
- [ ] C) Inexistente.
- [ ] D) Exclusivamente belica.

## Question 15 (D8)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v15
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Marx: historia = lucha de clases."
**Enunciado:** Para Marx, la solucion era:
**Options:**
- [ ] A) Reformar el capitalismo.
- [x] B) Revolucion del proletariado hacia una sociedad sin clases.
- [ ] C) Fortalecer el Estado.
- [ ] D) Promover la empresa privada.

## Question 16 (D8)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v16
**Bloom:** Analyze | **ICFES:** Pensamiento social
**Context:** "Masacre bananeras 1928 en Cienaga."
**Enunciado:** Es relevante porque:
**Options:**
- [ ] A) Hecho aislado.
- [x] B) Marco el inicio del sindicalismo en Colombia; denunciado en Cien anos de soledad.
- [ ] C) Beneficio a trabajadores.
- [ ] D) Evento deportivo.

## Question 17 (D9)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v17
**Bloom:** Create | **ICFES:** Pensamiento social
**Context:** Politica de memoria historica en Colombia.
**Enunciado:** El enfoque mas adecuado:
**Options:**
- [ ] A) Olvidar el pasado.
- [x] B) Combinar verdad (JEP, Comision Verdad), reparacion y garantias de no repeticion.
- [ ] C) Solo castigar perpetradores.
- [ ] D) Reescribir historia oficial.

## Question 18 (D9)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v18
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Friedman: inflacion es fenomeno monetario."
**Enunciado:** Controlar inflacion requiere:
**Options:**
- [ ] A) Aumentar gasto publico.
- [x] B) Controlar la cantidad de dinero en circulacion.
- [ ] C) Congelar precios.
- [ ] D) Aumentar salarios.

## Question 19 (D9)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v19
**Bloom:** Create | **ICFES:** Pensamiento social
**Context:** Debate sobre reforma agraria en Colombia.
**Enunciado:** Argumento a FAVOR:
**Options:**
- [ ] A) Tierra bien distribuida.
- [x] B) Alta concentracion (Gini tierras ~0.86) genera desigualdad y conflicto.
- [ ] C) Campesinos no quieren tierra.
- [ ] D) Agricultura no es importante.

## Question 20 (D10)
**ID:** CO-SOC-10-2026-P3-comprehensive-001-MASTERY-v20
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Fukuyama: fin de la historia. Huntington: choque de civilizaciones."
**Enunciado:** Cual tesis ha sido mas cuestionada?
**Options:**
- [ ] A) La de Huntington.
- [x] B) La de Fukuyama: autoritarismo y populismo han resurgido.
- [ ] C) Ambas correctas.
- [ ] D) Ambas falsas.
"""

write_file("sociales-ciudadanas", "3", "CO-SOC", SOC_P3)
print("SOC P2 and P3 done")
