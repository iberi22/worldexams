## CORRECCION URGENTE: Formato de Explicaciones

Jules, los bundles actuales NO tienen el formato correcto de explicaciones. Cada opcion necesita UN PARRAFO COMPLETO en el feedback, no solo "Correct" o "Incorrect".

### Formato CORRECTO (cada pregunta):

Cada pregunta debe tener:

1. **ID** con formato de pais correcto (CO-, MX-, AR-, BR-, CL-, PE-, EC-)
2. **Bloom Level** + **ICFES Competency** (o equivalente local)
3. **Contexto** local del pais
4. **Enunciado** con la pregunta
5. **4 opciones** con inline feedback HTML donde CADA feedback es UN PARRAFO COMPLETO explicando POR QUE:
   ```
   - [ ] A) Opcion incorrecta (contenido educacional)
     <!-- feedback: Incorrect. [Explicacion detallada de 1-2 oraciones de por que es incorrecta, que error conceptual representa, y por que parece plausible al estudiante.] -->
   - [x] B) Opcion correcta
     <!-- feedback: Correct. [Explicacion detallada de 1-2 oraciones de por que es correcta, que concepto se evalua, y por que las otras opciones no funcionan.] -->
   ```
6. **### Explicacion Pedagogica** al final: parrafo de 3-5 lineas en ESPANOL analizando:
   - El concepto cientifico detras de la pregunta
   - Por que la respuesta correcta es correcta
   - Que errores comunes representan los distractores
   - Relevancia del tema en contexto real

### REGLAS ESTRICTAS:

1. Cada feedback inline DEBE ser un PARRAFO COMPLETO (no solo "Correct" o "Incorrect")
   - MAL: `<!-- feedback: Correct. -->`
   - BIEN: `<!-- feedback: Correct. La permeabilidad selectiva permite a la membrana regular el paso de sustancias, dejando entrar lo necesario y bloqueando lo danino, manteniendo la homeostasis celular. -->`

2. Cada feedback debe explicar POR QUE esa opcion es correcta o incorrecta, no solo decirlo

3. Debe mencionar el error conceptual que llevaria al estudiante a escoger esa opcion

4. La Explicacion Pedagogica debe ser un parrafo de 3-5 lineas en espanol

5. 80 feedbacks por bundle (20 preguntas x 4 opciones)

6. Contexto local del pais en cada pregunta (no usar Colombia para otros paises)

7. NO incluir raw thinking, solo el bundle formateado

### BUNDLE DE REFERENCIA (formato exacto a seguir):
Archivo: questions_data/colombia/ciencias-naturales/grado-11/periodo-1/celula-biologia/CO-CIE-11-P1-celula-biologia-057-MASTERY-bundle.md

Ese bundle tiene exactamente el formato que necesitamos en TODOS los nuevos bundles.
