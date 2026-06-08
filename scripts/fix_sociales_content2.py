#!/usr/bin/env python3
"""
Second pass: more aggressive content improvement for social studies bundles.
Fixes remaining raw subtema_id text in distractors and general text quality.
"""
import os, re, glob

BASE = "questions_data/colombia/sociales-ciudadanas"

# Comprehensive replacement mapping
SUB = {}
SUB["geografia-fisica-colombia"] = ("la geografía física colombiana", "La geografía física colombiana")
SUB["constitucion-1991-principios"] = ("los principios fundamentales de la Constitución de 1991", "Los principios fundamentales de la Constitución de 1991")
SUB["derechos-fundamentales"] = ("los derechos fundamentales", "Los derechos fundamentales")
SUB["organizacion-estado"] = ("la organización del Estado colombiano", "La organización del Estado colombiano")
SUB["participacion-ciudadana"] = ("los mecanismos de participación ciudadana", "Los mecanismos de participación ciudadana")
SUB["partidos-politicos-colombia"] = ("los partidos y movimientos políticos en Colombia", "Los partidos y movimientos políticos en Colombia")
SUB["descentralizacion"] = ("la descentralización territorial en Colombia", "La descentralización territorial en Colombia")
SUB["economia-colombiana"] = ("la economía colombiana", "La economía colombiana")
SUB["sistema-financiero"] = ("el sistema financiero colombiano", "El sistema financiero colombiano")
SUB["presupuesto-nacional"] = ("el Presupuesto General de la Nación", "El Presupuesto General de la Nación")
SUB["derechos-humanos-ddhh"] = ("los derechos humanos en Colombia", "Los derechos humanos en Colombia")
SUB["accion-tutela"] = ("la acción de tutela", "La acción de tutela")
SUB["organismos-control"] = ("los organismos de control en Colombia", "Los organismos de control en Colombia")
SUB["servicio-publico"] = ("la función pública en Colombia", "La función pública en Colombia")
SUB["politica-exterior"] = ("la política exterior colombiana", "La política exterior colombiana")
SUB["fuerzas-militares"] = ("las Fuerzas Militares y la Policía Nacional", "Las Fuerzas Militares y la Policía Nacional")
SUB["derechos-colectivos"] = ("los derechos colectivos y del ambiente", "Los derechos colectivos y del ambiente")
SUB["derechos-etnicos"] = ("los derechos étnicos en Colombia", "Los derechos étnicos en Colombia")
SUB["derechos-sexuales"] = ("los derechos sexuales y reproductivos", "Los derechos sexuales y reproductivos")
SUB["libertad-economica"] = ("la libertad económica", "La libertad económica")
SUB["tributacion-colombia"] = ("la tributación en Colombia", "La tributación en Colombia")
SUB["comercio-exterior"] = ("el comercio exterior colombiano", "El comercio exterior colombiano")
SUB["regiones-autonomas"] = ("las regiones autónomas y las RAP", "Las regiones autónomas y las RAP")
SUB["bogota-dc"] = ("el régimen especial de Bogotá D.C.", "El régimen especial de Bogotá D.C.")
SUB["entidades-territoriales"] = ("las entidades territoriales colombianas", "Las entidades territoriales colombianas")
SUB["estado-social-derecho"] = ("el Estado Social de Derecho", "El Estado Social de Derecho")
SUB["corte-constitucional"] = ("la Corte Constitucional colombiana", "La Corte Constitucional colombiana")
SUB["derecho-internacional"] = ("el Derecho Internacional Humanitario", "El Derecho Internacional Humanitario")
SUB["ciudadania-global"] = ("la ciudadanía global y los ODS", "La ciudadanía global y los ODS")
SUB["etica-publica"] = ("la ética pública y la transparencia", "La ética pública y la transparencia")
SUB["catedra-paz"] = ("la Cátedra de Paz", "La Cátedra de Paz")

# Add all remaining subtemas
SUB["regiones-naturales"] = ("las regiones naturales de Colombia", "Las regiones naturales de Colombia")
SUB["clima-colombia"] = ("el clima colombiano", "El clima colombiano")
SUB["hidrografia-colombia"] = ("la hidrografía colombiana", "La hidrografía colombiana")
SUB["riesgos-naturales"] = ("los riesgos naturales en Colombia", "Los riesgos naturales en Colombia")
SUB["cambio-climatico-colombia"] = ("el cambio climático en Colombia", "El cambio climático en Colombia")
SUB["suelos-colombia"] = ("los suelos colombianos", "Los suelos colombianos")
SUB["biodiversidad-colombia"] = ("la biodiversidad colombiana", "La biodiversidad colombiana")
SUB["areas-protegidas"] = ("las áreas protegidas de Colombia", "Las áreas protegidas de Colombia")
SUB["oceanos-costas-colombia"] = ("los océanos y costas colombianas", "Los océanos y costas colombianas")
SUB["deforestacion-colombia"] = ("la deforestación en Colombia", "La deforestación en Colombia")
SUB["recursos-naturales"] = ("los recursos naturales de Colombia", "Los recursos naturales de Colombia")
SUB["ordenamiento-territorial"] = ("el ordenamiento territorial colombiano", "El ordenamiento territorial colombiano")
SUB["desastres-naturales"] = ("los desastres naturales en Colombia", "Los desastres naturales en Colombia")
SUB["geografia-economica"] = ("la geografía económica de Colombia", "La geografía económica de Colombia")
SUB["pisos-termicos"] = ("los pisos térmicos", "Los pisos térmicos")
SUB["cuencas-hidrograficas"] = ("las cuencas hidrográficas colombianas", "Las cuencas hidrográficas colombianas")
SUB["cambio-climatico-causas"] = ("las causas del cambio climático", "Las causas del cambio climático")
SUB["paramos-colombia"] = ("los páramos colombianos", "Los páramos colombianos")
SUB["contaminacion-recursos"] = ("la contaminación de los recursos hídricos", "La contaminación de los recursos hídricos")
SUB["biodiversidad-pacifico"] = ("la biodiversidad del Pacífico colombiano", "La biodiversidad del Pacífico colombiano")
SUB["region-caribe"] = ("la región Caribe", "La región Caribe")
SUB["region-andina"] = ("la región Andina", "La región Andina")
SUB["region-orinoquia"] = ("la región Orinoquía", "La región Orinoquía")
SUB["region-amazonia"] = ("la región Amazonía", "La región Amazonía")
SUB["region-pacifica"] = ("la región Pacífica", "La región Pacífica")
SUB["region-insular"] = ("la región Insular colombiana", "La región Insular colombiana")
SUB["geografia-cundiboyacense"] = ("la geografía del altiplano Cundiboyacense", "La geografía del altiplano Cundiboyacense")
SUB["rio-magdalena"] = ("el río Magdalena", "El río Magdalena")
SUB["sostenibilidad-ambiental"] = ("la sostenibilidad ambiental en Colombia", "La sostenibilidad ambiental en Colombia")

# Grado 8
SUB["poblacion-colombiana"] = ("la población colombiana", "La población colombiana")
SUB["migraciones-colombia"] = ("las migraciones en Colombia", "Las migraciones en Colombia")
SUB["urbanizacion-colombia"] = ("la urbanización colombiana", "La urbanización colombiana")
SUB["conflictos-territoriales"] = ("los conflictos territoriales en Colombia", "Los conflictos territoriales en Colombia")
SUB["etnias-colombia"] = ("la diversidad étnica colombiana", "La diversidad étnica colombiana")
SUB["cultura-colombiana"] = ("la cultura colombiana", "La cultura colombiana")
SUB["desigualdad-social"] = ("la desigualdad social en Colombia", "La desigualdad social en Colombia")
SUB["educacion-colombia"] = ("la educación en Colombia", "La educación en Colombia")
SUB["salud-colombia"] = ("el sistema de salud colombiano", "El sistema de salud colombiano")
SUB["trabajo-colombia"] = ("el mercado laboral colombiano", "El mercado laboral colombiano")
SUB["vivienda-colombia"] = ("la vivienda en Colombia", "La vivienda en Colombia")
SUB["servicios-publicos"] = ("los servicios públicos en Colombia", "Los servicios públicos en Colombia")
SUB["seguridad-colombia"] = ("la seguridad ciudadana en Colombia", "La seguridad ciudadana en Colombia")
SUB["justicia-colombia"] = ("el sistema judicial colombiano", "El sistema judicial colombiano")
SUB["genero-colombia"] = ("la equidad de género en Colombia", "La equidad de género en Colombia")
SUB["juventud-colombia"] = ("la juventud colombiana", "La juventud colombiana")
SUB["tercera-edad"] = ("la población adulta mayor en Colombia", "La población adulta mayor en Colombia")
SUB["discapacidad-colombia"] = ("la inclusión de personas con discapacidad", "La inclusión de personas con discapacidad")
SUB["migracion-venezolana"] = ("la migración venezolana en Colombia", "La migración venezolana en Colombia")
SUB["desplazamiento-conflicto"] = ("el desplazamiento forzado en Colombia", "El desplazamiento forzado en Colombia")
SUB["movilidad-humana"] = ("la movilidad humana", "La movilidad humana")
SUB["poblacion-rural"] = ("la población rural colombiana", "La población rural colombiana")
SUB["poblacion-costera"] = ("la población de las costas colombianas", "La población de las costas colombianas")
SUB["poblacion-fronteriza"] = ("la población en zonas de frontera", "La población en zonas de frontera")
SUB["cartografia-social"] = ("la cartografía social", "La cartografía social")
SUB["indicadores-sociales"] = ("los indicadores sociales en Colombia", "Los indicadores sociales en Colombia")
SUB["politicas-publicas-sociales"] = ("las políticas públicas sociales en Colombia", "Las políticas públicas sociales en Colombia")
SUB["cultura-identidad-nacional"] = ("la identidad nacional colombiana", "La identidad nacional colombiana")
SUB["patrimonio-cultural"] = ("el patrimonio cultural colombiano", "El patrimonio cultural colombiano")
SUB["colombia-mundo"] = ("Colombia en el contexto global", "Colombia en el contexto global")

# Grado 9
SUB["independencia-1810"] = ("la independencia de Colombia", "La independencia de Colombia")
SUB["campana-libertadora"] = ("la Campaña Libertadora", "La Campaña Libertadora")
SUB["gran-colombia"] = ("la Gran Colombia", "La Gran Colombia")
SUB["federalismo-centralismo"] = ("el federalismo y el centralismo en Colombia", "El federalismo y el centralismo en Colombia")
SUB["guerras-civiles-siglo19"] = ("las guerras civiles del siglo XIX", "Las guerras civiles del siglo XIX")
SUB["constitucion-1863"] = ("la Constitución de 1863", "La Constitución de 1863")
SUB["regeneracion-nunez"] = ("la Regeneración de Rafael Núñez", "La Regeneración de Rafael Núñez")
SUB["guerra-mil-dias"] = ("la Guerra de los Mil Días", "La Guerra de los Mil Días")
SUB["separacion-panama"] = ("la separación de Panamá", "La separación de Panamá")
SUB["economia-siglo19"] = ("la economía colombiana del siglo XIX", "La economía colombiana del siglo XIX")
SUB["sociedad-siglo19"] = ("la sociedad colombiana del siglo XIX", "La sociedad colombiana del siglo XIX")
SUB["iglesia-estado-siglo19"] = ("la relación Iglesia-Estado en el siglo XIX", "La relación Iglesia-Estado en el siglo XIX")
SUB["hegemonia-conservadora"] = ("la hegemonía conservadora", "La hegemonía conservadora")
SUB["partidos-politicos-siglo19"] = ("los partidos políticos del siglo XIX", "Los partidos políticos del siglo XIX")
SUB["abolicion-esclavitud"] = ("la abolición de la esclavitud", "La abolición de la esclavitud")
SUB["educacion-siglo19"] = ("la educación en el siglo XIX", "La educación en el siglo XIX")
SUB["prensa-opinion-siglo19"] = ("la prensa y la opinión pública en el siglo XIX", "La prensa y la opinión pública en el siglo XIX")
SUB["arte-cultura-siglo19"] = ("el arte y la cultura del siglo XIX", "El arte y la cultura del siglo XIX")
SUB["expansion-cafetera"] = ("la expansión cafetera", "La expansión cafetera")
SUB["ferrocarriles-colombia"] = ("los ferrocarriles en Colombia", "Los ferrocarriles en Colombia")
SUB["colonizacion-antioquena"] = ("la colonización antioqueña", "La colonización antioqueña")
SUB["constitucion-1886"] = ("la Constitución de 1886", "La Constitución de 1886")
SUB["republica-conservadora"] = ("la República conservadora", "La República conservadora")
SUB["movimientos-obreros-siglo19"] = ("los movimientos obreros", "Los movimientos obreros")
SUB["fronteras-siglo19"] = ("las fronteras colombianas del siglo XIX", "Las fronteras colombianas del siglo XIX")
SUB["relaciones-exteriores-siglo19"] = ("las relaciones internacionales de Colombia", "Las relaciones internacionales de Colombia")
SUB["historiografia-colombia"] = ("la historiografía colombiana", "La historiografía colombiana")
SUB["region-cauca"] = ("la región del Cauca", "La región del Cauca")
SUB["region-costena-siglo19"] = ("la región Caribe en el siglo XIX", "La región Caribe en el siglo XIX")
SUB["region-santanderes"] = ("la región de Santanderes", "La región de Santanderes")

# Grado 10
SUB["hegemonia-conservadora-tardia"] = ("la hegemonía conservadora tardía", "La hegemonía conservadora tardía")
SUB["republica-liberal"] = ("la República Liberal", "La República Liberal")
SUB["bogotazo-1948"] = ("el Bogotazo de 1948", "El Bogotazo de 1948")
SUB["la-violencia"] = ("el período de La Violencia", "El período de La Violencia")
SUB["gobierno-rojas-pinilla"] = ("el gobierno de Gustavo Rojas Pinilla", "El gobierno de Gustavo Rojas Pinilla")
SUB["frente-nacional"] = ("el Frente Nacional", "El Frente Nacional")
SUB["guerrillas-colombia"] = ("el surgimiento de las guerrillas en Colombia", "El surgimiento de las guerrillas en Colombia")
SUB["narcotrafico-colombia"] = ("el narcotráfico en Colombia", "El narcotráfico en Colombia")
SUB["paramilitarismo"] = ("el paramilitarismo en Colombia", "El paramilitarismo en Colombia")
SUB["constitucion-1991"] = ("la Constitución de 1991", "La Constitución de 1991")
SUB["procesos-paz-siglo20"] = ("los procesos de paz del siglo XX", "Los procesos de paz del siglo XX")
SUB["desplazamiento-siglo20"] = ("el desplazamiento forzado en el siglo XX", "El desplazamiento forzado en el siglo XX")
SUB["economia-siglo20"] = ("la economía colombiana del siglo XX", "La economía colombiana del siglo XX")
SUB["reforma-agraria"] = ("la reforma agraria en Colombia", "La reforma agraria en Colombia")
SUB["urbanizacion-siglo20"] = ("la urbanización en el siglo XX", "La urbanización en el siglo XX")
SUB["cultura-siglo20"] = ("la cultura colombiana del siglo XX", "La cultura colombiana del siglo XX")
SUB["deportes-colombia"] = ("el deporte colombiano", "El deporte colombiano")
SUB["movimientos-sociales"] = ("los movimientos sociales en Colombia", "Los movimientos sociales en Colombia")
SUB["violencia-partidista"] = ("la violencia partidista en Colombia", "La violencia partidista en Colombia")
SUB["masacres-colombia"] = ("las masacres emblemáticas en Colombia", "Las masacres emblemáticas en Colombia")
SUB["toma-palacio-justicia"] = ("la toma del Palacio de Justicia", "La toma del Palacio de Justicia")
SUB["plan-colombia"] = ("el Plan Colombia", "El Plan Colombia")
SUB["seguridad-democratica"] = ("la Seguridad Democrática", "La Seguridad Democrática")
SUB["justicia-paz"] = ("la justicia transicional y la JEP", "La justicia transicional y la JEP")
SUB["acuerdo-paz-2016"] = ("el Acuerdo de Paz con las FARC", "El Acuerdo de Paz con las FARC")
SUB["posconflicto-colombia"] = ("el posconflicto colombiano", "El posconflicto colombiano")
SUB["proceso-paz-eln"] = ("el proceso de paz con el ELN", "El proceso de paz con el ELN")
SUB["lideres-sociales"] = ("el liderazgo social y la defensa de los DDHH", "El liderazgo social y la defensa de los DDHH")
SUB["crisis-humanitaria"] = ("la crisis humanitaria en Colombia", "La crisis humanitaria en Colombia")
SUB["memoria-historica"] = ("la memoria histórica en Colombia", "La memoria histórica en Colombia")


def fix_file(filepath: str) -> bool:
    """Fix all remaining raw subtema_id text in the file."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Find which subtema this file is about
    m = re.search(r'^tema:\s*"([^"]+)"', content, re.MULTILINE)
    if not m:
        return False
    subtema_id = m.group(1)
    if subtema_id not in SUB:
        return False

    lowercase, titlecase = SUB[subtema_id]
    raw = subtema_id.replace("-", " ")
    raw_title = subtema_id.replace("-", " ").title()
    
    # Replace raw text with proper Spanish
    # 1. The raw form "constitucion 1991 principios" (with spaces from dash replacement)
    replacements = [
        (raw, lowercase),
        (raw_title, titlecase),
        (f"de {lowercase}", f"de {lowercase}"),
    ]
    
    # Aggressive: replace ALL occurrences of the spaced subtema_id
    # but NOT inside the frontmatter tema field
    frontmatter_end = content.find("---\n\n", content.index("---") + 3) + 5
    body = content[frontmatter_end:]
    header = content[:frontmatter_end]
    
    # Replace in body only
    body = body.replace(raw, lowercase)
    body = body.replace(raw_title, titlecase)
    # Also fix any remaining "constitucion 1991 principios" patterns
    # where the text was "de constitucion 1991 principios" etc
    body = body.replace(f"sobre {lowercase}", f"sobre {lowercase}")
    body = body.replace(f"de {lowercase}", f"de {lowercase}")
    body = body.replace(f"{lowercase} es", f"{lowercase} es")
    
    # Replace double spaces
    body = re.sub(r'  +', ' ', body)
    
    content = header + body
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    return True


def main():
    stats = {g: 0 for g in [7, 8, 9, 10, 11]}
    for grado in stats:
        dirpath = os.path.join(BASE, f"grado-{grado}", "2026", "weekly")
        for fp in sorted(glob.glob(os.path.join(dirpath, "*.md"))):
            try:
                if fix_file(fp):
                    stats[grado] += 1
            except Exception as e:
                print(f"ERROR {fp}: {e}")
        print(f"Grado {grado}: {stats[grado]} archivos")
    print("Segundo pass completado.")


if __name__ == "__main__":
    main()
