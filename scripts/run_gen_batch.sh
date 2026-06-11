#!/bin/bash
MODEL="opencode/deepseek-v4-flash-free"
DIR="questions_data/colombia/lengua/grado-6/2026/weekly"
mkdir -p "$DIR"

WEEKS=(1 2 3 4 5 7 8 9 10 11)
TOPICS=(
    "comunicacion-intencion-comunicativa"
    "comunicacion-verbal-no-verbal"
    "comunicacion-asertiva"
    "comunicacion-oral"
    "dialogo-conversacion"
    "narracion"
    "descripcion"
    "exposicion"
    "instruccion"
    "argumentacion"
)

for i in "${!WEEKS[@]}"; do
    WEEK=$(printf "%02d" ${WEEKS[$i]})
    TOPIC=${TOPICS[$i]}
    PROMPT="/app/.worldexams/generation_v52_lengua_g6/prompt-lengua-6-W${WEEKS[$i]}.txt"
    OUTPUT="$DIR/CO-LEN-6-2026-W${WEEK}-${TOPIC}-001-MASTERY-bundle.md"

    echo "Generating Week $WEEK: $TOPIC..."
    opencode run -m "$MODEL" "Genera el contenido para este bundle siguiendo las instrucciones en $PROMPT. Devuelve solo el markdown." > "$OUTPUT" 2>&1
    sleep 2
done
