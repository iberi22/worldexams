## Contexto y Objetivo
WorldExams cuenta con un Hub Curricular modular en `/preguntas/[country]/[grade]/[subject]` que provee dos perspectivas pedagógicas:
1. **🎓 Modo Estudiante**: Mapas conceptuales por periodos, trampas comunes/distractores por materia y banco de bundles.
2. **🧑‍🏫 Modo Docente**: Matriz oficial de competencias y componentes evaluados según la entidad rectora del país y generador de talleres evaluativos imprimibles.

Actualmente solo CO, MX, AR, CL y PE tienen su configuración de estándares en `saberparatodos/src/config/authority-guidelines.ts`. Este issue implementa las matrices oficiales de competencias, componentes curriculares y fuentes normativas para el **Lote A**:
- **EC (Ecuador)**: SENESCYT / Ineval — Examen de Acceso a la Educación Superior / Ser Bachiller.
- **BR (Brasil)**: INEP / MEC — Exame Nacional do Ensino Médio (ENEM) (Matemática e suas Tecnologias, Linguagens, Códigos e suas Tecnologias, Ciências da Natureza, Ciências Humanas).
- **PA (Panamá)**: MEDUCA — Pruebas CRECER y Admisión Universitaria (UP, UTP).
- **CR (Costa Rica)**: MEP — Pruebas Nacionales Estandarizadas (PNE) (Matemática, Español, Ciencias, Estudios Sociales).
- **GT (Guatemala)**: MINEDUC / DIGEDUCA — Evaluación Graduandos (Matemáticas, Lectura).
- **DO (República Dominicana)**: MINERD — Pruebas Nacionales (Lengua Española, Matemática, Ciencias Sociales, Ciencias de la Naturaleza).

---

## Archivos a Modificar / Crear
- `saberparatodos/src/config/authority-guidelines.ts`
  - Añadir las entradas completas para `EC`, `BR`, `PA`, `CR`, `GT`, `DO`.
  - Definir para cada una: `authorityName`, `badgeLabel`, `competencias` (competencias y componentes pedagógicos oficiales por cada asignatura), `subjectLabels` y enlaces de referencia `references` a portales ministeriales oficiales.
- `saberparatodos/tests/unit/curriculum-subject-hub.test.ts`
  - Añadir pruebas unitarias verificando que `getAuthorityGuidelines` retorne las competencias de `EC`, `BR`, `PA`, `CR`, `GT`, `DO`.

---

## Acceptance Criteria (AC)
- [ ] `getAuthorityGuidelines('EC')` retorna autoridad SENESCYT / Ineval con competencias para matemática y lengua.
- [ ] `getAuthorityGuidelines('BR')` retorna INEP / ENEM con competencias de las 4 matrices oficiales del ENEM.
- [ ] `getAuthorityGuidelines('PA')`, `CR`, `GT`, `DO` retornan sus respectivas entidades y matrices de competencias oficiales.
- [ ] Se mantienen intactas las configuraciones existentes de CO, MX, AR, CL, PE.
- [ ] `npm run test:unit -w saberparatodos` pasa al 100% con las nuevas aserciones añadidas.
