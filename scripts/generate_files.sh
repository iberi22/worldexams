#!/bin/bash

# This script generates the missing question bundles directly to avoid environment issues.

# Common content for all files
generate_question_placeholders() {
    local FILE_ID=$1
    local DIFFICULTIES=(1 1 2 2 3 4 4 5 5)
    for i in {0..8}; do
        local q_num=$((i + 2))
        local d=${DIFFICULTIES[$i]}
        cat << EOL
## Pregunta ${q_num} (Variación - Dificultad ${d})

**ID:** "${FILE_ID}-v${q_num}"

### Enunciado
(Placeholder for question with difficulty ${d})

### Opciones
- [x] A) Correcta
- [ ] B) Incorrecta
- [ ] C) Incorrecta
- [ ] D) Incorrecta

### Explicación Pedagógica
(Placeholder for explanation)

---
EOL
    done
}

generate_metadata_tables() {
    local FILE_ID=$1
    local DIFFICULTIES=(3 1 1 2 2 3 4 4 5 5)
    cat << EOL
# === METADATA GLOBAL ===

# === Metadata de Validación ===

| Campo | Valor |
|---|---|
| Total Preguntas | 10 |
| Original (Dificultad 3) | 1 |
| Dificultad 1 | 2 |
| Dificultad 2 | 2 |
| Dificultad 3 | 2 |
| Dificultad 4 | 2 |
| Dificultad 5 | 2 |

## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Validado |
|---|---|---|---|
EOL
    for i in {0..9}; do
        local q_num=$((i + 1))
        local d=${DIFFICULTIES[$i]}
        local diff_str="Medium"
        if [ $d -le 2 ]; then
            diff_str="Low"
        elif [ $d -ge 4 ]; then
            diff_str="High"
        fi
        echo "| ${q_num} | ${FILE_ID}-v${q_num} | ${diff_str} | ⬜ |"
    done
}

# Function to generate a bundle
generate_bundle() {
    local COUNTRY=$1
    local SUBJECT=$2
    local GRADE=$3
    local SLUG=$4
    local FILE_ID_PREFIX=$5
    local TEXT=$6
    local OPTIONS=$7
    local EXPLANATION=$8

    local FILE_ID="${FILE_ID_PREFIX}-${SLUG^^}-001"
    local DIR_PATH="saberparatodos/src/content/questions/$COUNTRY/$SUBJECT/$GRADE/$SLUG"
    local FILE_PATH="$DIR_PATH/${FILE_ID}-bundle.md"

    mkdir -p "$DIR_PATH"

    {
        cat << EOL
---
id: "$FILE_ID"
country: "${COUNTRY^^}"
grado: $GRADE
asignatura: "$SUBJECT"
tema: "$SLUG"
protocol_version: "3.0"
bundle_version: "3.0"
total_questions: 10
estado: "draft"
creador: "Jules"
generation_date: "$(date +%Y-%m-%d)"
source: "AI Generation"
source_license: "AI Generated"
---

## Pregunta 1 (Original - Dificultad 3)

**ID:** "${FILE_ID}-v1"

### Enunciado
$TEXT

### Opciones
$OPTIONS

### Explicación Pedagógica
$EXPLANATION

---
EOL
        generate_question_placeholders "$FILE_ID"
        generate_metadata_tables "$FILE_ID"
    } > "$FILE_PATH"

    echo "Generated $FILE_PATH"
}

# --- Generate all 14 bundles ---

generate_bundle "colombia" "tecnologia" "3" "hardware-software" "CO-TEC-3" \
    "¿Cuál de los siguientes es un ejemplo de hardware?" \
    "- [ ] A) Microsoft Word\n- [ ] B) Google Chrome\n- [x] C) Un ratón (mouse)\n- [ ] D) Windows 10" \
    "El hardware son las partes físicas de un computador, como el ratón."

generate_bundle "colombia" "lenguaje" "3" "sustantivos-propios-comunes" "CO-LEN-3" \
    "En la frase 'El perro Toby juega en el parque', ¿cuál es el sustantivo propio?" \
    "- [ ] A) perro\n- [x] B) Toby\n- [ ] C) parque\n- [ ] D) juega" \
    "Toby es un sustantivo propio porque es el nombre específico de un ser."

generate_bundle "colombia" "sociales-y-ciudadanas" "5" "ramas-poder-publico" "CO-SOC-5" \
    "¿Cuál de las siguientes es una de las tres ramas del poder público en Colombia?" \
    "- [x] A) Rama Ejecutiva\n- [ ] B) Rama Militar\n- [ ] C) Rama Educativa\n- [ ] D) Rama de la Salud" \
    "Las tres ramas del poder público en Colombia son la Ejecutiva, la Legislativa y la Judicial."

generate_bundle "colombia" "tecnologia" "5" "internet-navegadores" "CO-TEC-5" \
    "¿Cuál de estos es un navegador web?" \
    "- [ ] A) PowerPoint\n- [x] B) Google Chrome\n- [ ] C) Photoshop\n- [ ] D) Spotify" \
    "Google Chrome es un navegador web que se utiliza para acceder a sitios en internet."

generate_bundle "colombia" "lectura-critica" "5" "idea-principal" "CO-LEC-5" \
    "Después de leer un cuento, ¿qué pregunta te ayuda a encontrar la idea principal?" \
    "- [ ] A) ¿Quiénes son los personajes?\n- [x] B) ¿De qué trata principalmente el cuento?\n- [ ] C) ¿En qué lugar ocurre la historia?\n- [ ] D) ¿Cuál es tu parte favorita?" \
    "La idea principal resume de qué se trata el texto en su totalidad."

generate_bundle "colombia" "lectura-critica" "6" "inferencia" "CO-LEC-6" \
    "Si ves a alguien con paraguas y botas de lluvia, ¿qué puedes inferir sobre el clima?" \
    "- [ ] A) Que hace mucho sol.\n- [x] B) Que probablemente está lloviendo o va a llover.\n- [ ] C) Que es de noche.\n- [ ] D) Que va a una fiesta." \
    "Inferir es sacar conclusiones a partir de la información que tienes. El paraguas y las botas sugieren lluvia."

generate_bundle "colombia" "sociales-y-ciudadanas" "7" "derechos-deberes" "CO-SOC-7" \
    "Tener un nombre y una nacionalidad es un..." \
    "- [ ] A) Deber\n- [x] B) Derecho\n- [ ] C) Lujo\n- [ ] D) Trabajo" \
    "Tener un nombre y una nacionalidad es un derecho fundamental de todas las personas."

generate_bundle "colombia" "tecnologia" "7" "herramientas-digitales" "CO-TEC-7" \
    "¿Qué herramienta digital se utiliza principalmente para crear presentaciones?" \
    "- [ ] A) Microsoft Excel\n- [x] B) Microsoft PowerPoint\n- [ ] C) Microsoft Word\n- [ ] D) Google Maps" \
    "Microsoft PowerPoint está diseñado específicamente para crear presentaciones con diapositivas."

generate_bundle "colombia" "lectura-critica" "7" "punto-de-vista" "CO-LEC-7" \
    "Cuando un autor escribe un texto para convencerte de algo, está expresando su..." \
    "- [ ] A) Edad\n- [x] B) Punto de vista\n- [ ] C) Dirección\n- [ ] D) Comida favorita" \
    "El punto de vista del autor es la opinión o perspectiva que tiene sobre un tema."

generate_bundle "colombia" "tecnologia" "9" "ciudadania-digital" "CO-TEC-9" \
    "¿Cuál es un comportamiento clave de un buen ciudadano digital?" \
    "- [ ] A) Compartir información falsa.\n- [x] B) Respetar la privacidad de los demás.\n- [ ] C) Usar el wifi del vecino sin permiso.\n- [ ] D) Ignorar el ciberacoso." \
    "La ciudadanía digital implica usar la tecnología de manera responsable, lo que incluye respetar la privacidad ajena."

generate_bundle "colombia" "lectura-critica" "9" "argumentos" "CO-LEC-9" \
    "En un debate, ¿qué es un argumento?" \
    "- [ ] A) Un grito o un insulto.\n- [x] B) Una razón o conjunto de razones para apoyar una idea.\n- [ ] C) Una opinión sin fundamento.\n- [ ] D) Una pregunta difícil." \
    "Un argumento es una justificación lógica y razonada que se usa para defender una postura."

generate_bundle "colombia" "filosofia" "10" "mayeutica-socrates" "CO-FIL-10" \
    "¿Qué buscaba Sócrates con su método de la mayéutica?" \
    "- [ ] A) Ganar todos los debates.\n- [x] B) Ayudar a que las personas descubrieran la verdad por sí mismas.\n- [ ] C) Escribir muchos libros.\n- [ ] D) Ser el hombre más rico de Atenas." \
    "La mayéutica era un método de diálogo en el que Sócrates, a través de preguntas, ayudaba a sus interlocutores a 'dar a luz' el conocimiento que ya poseían."

generate_bundle "colombia" "filosofia" "11" "imperativo-categorico-kant" "CO-FIL-11" \
    "Según el imperativo categórico de Kant, una acción es moralmente buena si..." \
    "- [ ] A) Te trae beneficios personales.\n- [x] B) Deseas que tu acción se convierta en una ley universal para todos.\n- [ ] C) La mayoría de la gente la aprueba.\n- [ ] D) Sigue las leyes de tu país sin cuestionarlas." \
    "El imperativo categórico sostiene que debes actuar de tal manera que la máxima de tu acción pueda convertirse en una ley universal, aplicable a todos sin contradicción."

generate_bundle "colombia" "tecnologia" "11" "inteligencia-artificial" "CO-TEC-11" \
    "¿Qué es la Inteligencia Artificial (IA)?" \
    "- [ ] A) Un tipo de robot físico con forma humana.\n- [x] B) La simulación de procesos de inteligencia humana por parte de máquinas.\n- [ ] C) Un nuevo sistema operativo para computadoras.\n- [ ] D) Una red social para científicos." \
    "La IA es un campo de la informática dedicado a crear sistemas que pueden realizar tareas que normalmente requieren inteligencia humana, como el aprendizaje, el razonamiento y la percepción."

echo "All 14 bundles generated successfully."
