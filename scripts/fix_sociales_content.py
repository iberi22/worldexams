#!/usr/bin/env python3
"""
Post-processor: Fix content quality in social sciences weekly bundles.
Replaces raw subtema_id text with proper Spanish in questions.
"""
import os, re, glob

BASE = "questions_data/colombia/sociales-ciudadanas"

# Map subtema_id -> proper Spanish noun phrase
SUB_REPLACEMENTS = {}
SUB_REPLACEMENTS["geografia-fisica-colombia"] = "la geografía física colombiana"
SUB_REPLACEMENTS["regiones-naturales"] = "las regiones naturales de Colombia"
SUB_REPLACEMENTS["clima-colombia"] = "el clima colombiano"
SUB_REPLACEMENTS["hidrografia-colombia"] = "la hidrografía colombiana"
SUB_REPLACEMENTS["riesgos-naturales"] = "los riesgos naturales en Colombia"
SUB_REPLACEMENTS["cambio-climatico-colombia"] = "el cambio climático en Colombia"
SUB_REPLACEMENTS["suelos-colombia"] = "los suelos colombianos"
SUB_REPLACEMENTS["biodiversidad-colombia"] = "la biodiversidad colombiana"
SUB_REPLACEMENTS["areas-protegidas"] = "las áreas protegidas de Colombia"
SUB_REPLACEMENTS["oceanos-costas-colombia"] = "los océanos y costas colombianas"
SUB_REPLACEMENTS["deforestacion-colombia"] = "la deforestación en Colombia"
SUB_REPLACEMENTS["recursos-naturales"] = "los recursos naturales de Colombia"
SUB_REPLACEMENTS["ordenamiento-territorial"] = "el ordenamiento territorial colombiano"
SUB_REPLACEMENTS["desastres-naturales"] = "los desastres naturales en Colombia"
SUB_REPLACEMENTS["geografia-economica"] = "la geografía económica de Colombia"
SUB_REPLACEMENTS["pisos-termicos"] = "los pisos térmicos"
SUB_REPLACEMENTS["cuencas-hidrograficas"] = "las cuencas hidrográficas colombianas"
SUB_REPLACEMENTS["cambio-climatico-causas"] = "las causas del cambio climático"
SUB_REPLACEMENTS["paramos-colombia"] = "los páramos colombianos"
SUB_REPLACEMENTS["contaminacion-recursos"] = "la contaminación de los recursos hídricos"
SUB_REPLACEMENTS["biodiversidad-pacifico"] = "la biodiversidad del Pacífico colombiano"
SUB_REPLACEMENTS["region-caribe"] = "la región Caribe"
SUB_REPLACEMENTS["region-andina"] = "la región Andina"
SUB_REPLACEMENTS["region-orinoquia"] = "la región Orinoquía"
SUB_REPLACEMENTS["region-amazonia"] = "la región Amazonía"
SUB_REPLACEMENTS["region-pacifica"] = "la región Pacífica"
SUB_REPLACEMENTS["region-insular"] = "la región Insular colombiana"
SUB_REPLACEMENTS["geografia-cundiboyacense"] = "la geografía del altiplano Cundiboyacense"
SUB_REPLACEMENTS["rio-magdalena"] = "el río Magdalena"
SUB_REPLACEMENTS["sostenibilidad-ambiental"] = "la sostenibilidad ambiental en Colombia"

SUB_REPLACEMENTS["poblacion-colombiana"] = "la población colombiana"
SUB_REPLACEMENTS["migraciones-colombia"] = "las migraciones en Colombia"
SUB_REPLACEMENTS["urbanizacion-colombia"] = "la urbanización colombiana"
SUB_REPLACEMENTS["conflictos-territoriales"] = "los conflictos territoriales en Colombia"
SUB_REPLACEMENTS["etnias-colombia"] = "la diversidad étnica colombiana"
SUB_REPLACEMENTS["cultura-colombiana"] = "la cultura colombiana"
SUB_REPLACEMENTS["desigualdad-social"] = "la desigualdad social en Colombia"
SUB_REPLACEMENTS["educacion-colombia"] = "la educación en Colombia"
SUB_REPLACEMENTS["salud-colombia"] = "el sistema de salud colombiano"
SUB_REPLACEMENTS["trabajo-colombia"] = "el mercado laboral colombiano"
SUB_REPLACEMENTS["vivienda-colombia"] = "la vivienda en Colombia"
SUB_REPLACEMENTS["servicios-publicos"] = "los servicios públicos en Colombia"
SUB_REPLACEMENTS["seguridad-colombia"] = "la seguridad ciudadana en Colombia"
SUB_REPLACEMENTS["justicia-colombia"] = "el sistema judicial colombiano"
SUB_REPLACEMENTS["genero-colombia"] = "la equidad de género en Colombia"
SUB_REPLACEMENTS["juventud-colombia"] = "la juventud colombiana"
SUB_REPLACEMENTS["tercera-edad"] = "la población adulta mayor en Colombia"
SUB_REPLACEMENTS["discapacidad-colombia"] = "la inclusión de personas con discapacidad"
SUB_REPLACEMENTS["migracion-venezolana"] = "la migración venezolana en Colombia"
SUB_REPLACEMENTS["desplazamiento-conflicto"] = "el desplazamiento forzado en Colombia"
SUB_REPLACEMENTS["movilidad-humana"] = "la movilidad humana"
SUB_REPLACEMENTS["poblacion-rural"] = "la población rural colombiana"
SUB_REPLACEMENTS["poblacion-costera"] = "la población de las costas colombianas"
SUB_REPLACEMENTS["poblacion-fronteriza"] = "la población en zonas de frontera"
SUB_REPLACEMENTS["cartografia-social"] = "la cartografía social"
SUB_REPLACEMENTS["indicadores-sociales"] = "los indicadores sociales en Colombia"
SUB_REPLACEMENTS["politicas-publicas-sociales"] = "las políticas públicas sociales en Colombia"
SUB_REPLACEMENTS["cultura-identidad-nacional"] = "la identidad nacional colombiana"
SUB_REPLACEMENTS["patrimonio-cultural"] = "el patrimonio cultural colombiano"
SUB_REPLACEMENTS["colombia-mundo"] = "Colombia en el contexto global"

SUB_REPLACEMENTS["independencia-1810"] = "la independencia de Colombia"
SUB_REPLACEMENTS["campana-libertadora"] = "la Campaña Libertadora"
SUB_REPLACEMENTS["gran-colombia"] = "la Gran Colombia"
SUB_REPLACEMENTS["federalismo-centralismo"] = "el federalismo y el centralismo en Colombia"
SUB_REPLACEMENTS["guerras-civiles-siglo19"] = "las guerras civiles del siglo XIX"
SUB_REPLACEMENTS["constitucion-1863"] = "la Constitución de 1863"
SUB_REPLACEMENTS["regeneracion-nunez"] = "la Regeneración de Rafael Núñez"
SUB_REPLACEMENTS["guerra-mil-dias"] = "la Guerra de los Mil Días"
SUB_REPLACEMENTS["separacion-panama"] = "la separación de Panamá"
SUB_REPLACEMENTS["economia-siglo19"] = "la economía colombiana del siglo XIX"
SUB_REPLACEMENTS["sociedad-siglo19"] = "la sociedad colombiana del siglo XIX"
SUB_REPLACEMENTS["iglesia-estado-siglo19"] = "la relación Iglesia-Estado en el siglo XIX"
SUB_REPLACEMENTS["hegemonia-conservadora"] = "la hegemonía conservadora"
SUB_REPLACEMENTS["partidos-politicos-siglo19"] = "los partidos políticos del siglo XIX"
SUB_REPLACEMENTS["abolicion-esclavitud"] = "la abolición de la esclavitud"
SUB_REPLACEMENTS["educacion-siglo19"] = "la educación en el siglo XIX"
SUB_REPLACEMENTS["prensa-opinion-siglo19"] = "la prensa y la opinión pública en el siglo XIX"
SUB_REPLACEMENTS["arte-cultura-siglo19"] = "el arte y la cultura del siglo XIX"
SUB_REPLACEMENTS["expansion-cafetera"] = "la expansión cafetera"
SUB_REPLACEMENTS["ferrocarriles-colombia"] = "los ferrocarriles en Colombia"
SUB_REPLACEMENTS["colonizacion-antioquena"] = "la colonización antioqueña"
SUB_REPLACEMENTS["constitucion-1886"] = "la Constitución de 1886"
SUB_REPLACEMENTS["republica-conservadora"] = "la República conservadora"
SUB_REPLACEMENTS["movimientos-obreros-siglo19"] = "los movimientos obreros"
SUB_REPLACEMENTS["fronteras-siglo19"] = "las fronteras colombianas del siglo XIX"
SUB_REPLACEMENTS["relaciones-exteriores-siglo19"] = "las relaciones internacionales de Colombia"
SUB_REPLACEMENTS["historiografia-colombia"] = "la historiografía colombiana"
SUB_REPLACEMENTS["region-cauca"] = "la región del Cauca"
SUB_REPLACEMENTS["region-costena-siglo19"] = "la región Caribe en el siglo XIX"
SUB_REPLACEMENTS["region-santanderes"] = "la región de Santanderes"

SUB_REPLACEMENTS["hegemonia-conservadora-tardia"] = "la hegemonía conservadora tardía"
SUB_REPLACEMENTS["republica-liberal"] = "la República Liberal"
SUB_REPLACEMENTS["bogotazo-1948"] = "el Bogotazo de 1948"
SUB_REPLACEMENTS["la-violencia"] = "el período de La Violencia"
SUB_REPLACEMENTS["gobierno-rojas-pinilla"] = "el gobierno de Gustavo Rojas Pinilla"
SUB_REPLACEMENTS["frente-nacional"] = "el Frente Nacional"
SUB_REPLACEMENTS["guerrillas-colombia"] = "el surgimiento de las guerrillas en Colombia"
SUB_REPLACEMENTS["narcotrafico-colombia"] = "el narcotráfico en Colombia"
SUB_REPLACEMENTS["paramilitarismo"] = "el paramilitarismo en Colombia"
SUB_REPLACEMENTS["constitucion-1991"] = "la Constitución de 1991"
SUB_REPLACEMENTS["procesos-paz-siglo20"] = "los procesos de paz del siglo XX"
SUB_REPLACEMENTS["desplazamiento-siglo20"] = "el desplazamiento forzado en el siglo XX"
SUB_REPLACEMENTS["economia-siglo20"] = "la economía colombiana del siglo XX"
SUB_REPLACEMENTS["reforma-agraria"] = "la reforma agraria en Colombia"
SUB_REPLACEMENTS["urbanizacion-siglo20"] = "la urbanización en el siglo XX"
SUB_REPLACEMENTS["cultura-siglo20"] = "la cultura colombiana del siglo XX"
SUB_REPLACEMENTS["deportes-colombia"] = "el deporte colombiano"
SUB_REPLACEMENTS["movimientos-sociales"] = "los movimientos sociales en Colombia"
SUB_REPLACEMENTS["violencia-partidista"] = "la violencia partidista en Colombia"
SUB_REPLACEMENTS["masacres-colombia"] = "las masacres emblemáticas en Colombia"
SUB_REPLACEMENTS["toma-palacio-justicia"] = "la toma del Palacio de Justicia"
SUB_REPLACEMENTS["plan-colombia"] = "el Plan Colombia"
SUB_REPLACEMENTS["seguridad-democratica"] = "la Seguridad Democrática"
SUB_REPLACEMENTS["justicia-paz"] = "la justicia transicional y la JEP"
SUB_REPLACEMENTS["acuerdo-paz-2016"] = "el Acuerdo de Paz con las FARC"
SUB_REPLACEMENTS["posconflicto-colombia"] = "el posconflicto colombiano"
SUB_REPLACEMENTS["proceso-paz-eln"] = "el proceso de paz con el ELN"
SUB_REPLACEMENTS["lideres-sociales"] = "el liderazgo social y la defensa de los DDHH"
SUB_REPLACEMENTS["crisis-humanitaria"] = "la crisis humanitaria en Colombia"
SUB_REPLACEMENTS["memoria-historica"] = "la memoria histórica en Colombia"

SUB_REPLACEMENTS["constitucion-1991-principios"] = "los principios fundamentales de la Constitución de 1991"
SUB_REPLACEMENTS["derechos-fundamentales"] = "los derechos fundamentales"
SUB_REPLACEMENTS["organizacion-estado"] = "la organización del Estado colombiano"
SUB_REPLACEMENTS["participacion-ciudadana"] = "los mecanismos de participación ciudadana"
SUB_REPLACEMENTS["partidos-politicos-colombia"] = "los partidos y movimientos políticos en Colombia"
SUB_REPLACEMENTS["descentralizacion"] = "la descentralización territorial en Colombia"
SUB_REPLACEMENTS["economia-colombiana"] = "la economía colombiana"
SUB_REPLACEMENTS["sistema-financiero"] = "el sistema financiero colombiano"
SUB_REPLACEMENTS["presupuesto-nacional"] = "el Presupuesto General de la Nación"
SUB_REPLACEMENTS["derechos-humanos-ddhh"] = "los derechos humanos en Colombia"
SUB_REPLACEMENTS["accion-tutela"] = "la acción de tutela"
SUB_REPLACEMENTS["organismos-control"] = "los organismos de control en Colombia"
SUB_REPLACEMENTS["servicio-publico"] = "la función pública en Colombia"
SUB_REPLACEMENTS["politica-exterior"] = "la política exterior colombiana"
SUB_REPLACEMENTS["fuerzas-militares"] = "las Fuerzas Militares y la Policía Nacional"
SUB_REPLACEMENTS["derechos-colectivos"] = "los derechos colectivos y del ambiente"
SUB_REPLACEMENTS["derechos-etnicos"] = "los derechos étnicos en Colombia"
SUB_REPLACEMENTS["derechos-sexuales"] = "los derechos sexuales y reproductivos"
SUB_REPLACEMENTS["libertad-economica"] = "la libertad económica"
SUB_REPLACEMENTS["tributacion-colombia"] = "la tributación en Colombia"
SUB_REPLACEMENTS["comercio-exterior"] = "el comercio exterior colombiano"
SUB_REPLACEMENTS["regiones-autonomas"] = "las regiones autónomas y las RAP"
SUB_REPLACEMENTS["bogota-dc"] = "el régimen especial de Bogotá D.C."
SUB_REPLACEMENTS["entidades-territoriales"] = "las entidades territoriales colombianas"
SUB_REPLACEMENTS["estado-social-derecho"] = "el Estado Social de Derecho"
SUB_REPLACEMENTS["corte-constitucional"] = "la Corte Constitucional colombiana"
SUB_REPLACEMENTS["derecho-internacional"] = "el Derecho Internacional Humanitario"
SUB_REPLACEMENTS["ciudadania-global"] = "la ciudadanía global y los ODS"
SUB_REPLACEMENTS["etica-publica"] = "la ética pública y la transparencia"
SUB_REPLACEMENTS["catedra-paz"] = "la Cátedra de Paz"


def titlecase_st(subtema_id: str) -> str:
    """Convert subtema_id to proper Title Case Spanish."""
    return subtema_id.replace("-", " ").title()


def fix_bundle_content(filepath: str):
    """Improve question quality in a bundle file."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract subtema_id from frontmatter
    m = re.search(r'^tema:\s*"([^"]+)"', content, re.MULTILINE)
    if not m:
        return
    subtema_id = m.group(1)
    proper = SUB_REPLACEMENTS.get(subtema_id, subtema_id.replace("-", " "))
    
    # Title-cased version for "Geografia Fisica Colombia" -> proper name
    proper_title = subtema_id.replace("-", " ").title()
    
    # Fix occurrences in question body
    # Pattern 1: "de geografia fisica colombia" -> "de la geografía física colombiana"
    raw = subtema_id.replace("-", " ")
    raw_title = subtema_id.replace("-", " ").title()

    # Fix "explicación de geografia fisica colombia" -> "explicación de la geografía física colombiana"
    content = content.replace(f" de {raw} ", f" de {proper} ")
    content = content.replace(f" de {raw}\n", f" de {proper}\n")
    content = content.replace(f"de {raw}.", f"de {proper}.")
    content = content.replace(f" sobre {raw} ", f" sobre {proper} ")
    content = content.replace(f" sobre {raw}\n", f" sobre {proper}\n")
    content = content.replace(f" {raw} es ", f" {proper} es ")
    content = content.replace(f" {raw} en ", f" {proper} en ")
    content = content.replace(f" {raw} con ", f" {proper} con ")
    content = content.replace(f" {raw} mediante ", f" {proper} mediante ")
    content = content.replace(f" de {raw_title} ", f" de {proper_title} ")
    content = content.replace(f" de {raw_title}\n", f" de {proper_title}\n")
    content = content.replace(f" {raw_title} es ", f" {proper_title} es ")
    content = content.replace(f" {raw_title} en ", f" {proper_title} en ")
    content = content.replace(f" {raw_title} es ", f" {proper_title} es ")
    
    # Fix "estudio de geografia fisica colombia" -> "estudio de la geografía física colombiana" 
    content = content.replace(f"estudio de {raw}", f"estudio de {proper}")
    content = content.replace(f"sobre {raw}", f"sobre {proper}")
    content = content.replace(f"{raw} con", f"{proper} con")
    
    # Fix context lines that have the raw name after "de"
    content = content.replace(f"exploran {raw}", f"exploran {proper}")
    content = content.replace(f"explicación de {raw}", f"explicación de {proper}")
    content = content.replace(f"exploran {raw_title}", f"exploran {proper}")
    
    # Fix the "GEOGRAFIA FISICA COLOMBIA" title case in questions
    content = content.replace(raw_title, proper.capitalize())

    # Fix cualquier instancia donde el raw text aparece como sustantivo
    if raw not in content.lower():
        # Already fixed
        pass

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    return True


def fix_all():
    for grado in [7, 8, 9, 10, 11]:
        dirpath = os.path.join(BASE, f"grado-{grado}", "2026", "weekly")
        pattern = os.path.join(dirpath, "*.md")
        files = glob.glob(pattern)
        count = 0
        for fp in sorted(files):
            try:
                fix_bundle_content(fp)
                count += 1
            except Exception as e:
                print(f"  ERROR {fp}: {e}")
        print(f"Grado {grado}: {count}/{len(files)} archivos mejorados")
    print("Listo.")


if __name__ == "__main__":
    fix_all()
