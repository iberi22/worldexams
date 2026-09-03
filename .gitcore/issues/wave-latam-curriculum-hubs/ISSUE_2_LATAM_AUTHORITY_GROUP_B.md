## Contexto y Objetivo
Ampliación de las guías de autoridades y estándares evaluativos en `saberparatodos/src/config/authority-guidelines.ts` para el **Lote B** de países de Centroamérica y el Caribe:
- **SV (El Salvador)**: MINED — Prueba AVANZO (Matemática, Lenguaje y Literatura, Ciencias Naturales, Estudios Sociales e Inglés).
- **HN (Honduras)**: SEDUC — Pruebas Formativas Mensuales y Evaluaciones de Fin de Ciclo (Matemáticas, Español, Ciencias Naturales, Ciencias Sociales).
- **NI (Nicaragua)**: MINED — Evaluación de Aprendizajes de Educación Secundaria y Admisión CNU.
- **PR (Puerto Rico)**: Departamento de Educación / College Board — Pruebas META-PR y PAA (Español, Matemáticas, Inglés, Ciencias).
- **ES (España)**: Ministerio de Educación / Universidades — EBAU / Selectividad (PAU) (Lengua Castellana y Literatura, Historia de España, Lengua Extranjera, Matemáticas / Ciencias).
- **GQ (Guinea Ecuatorial)**: UNGE / Ministerio de Educación — Selectividad Nacional (Lengua Española, Matemáticas, Ciencias).

---

## Archivos a Modificar / Crear
- `saberparatodos/src/config/authority-guidelines.ts`
  - Añadir las entradas completas para `SV`, `HN`, `NI`, `PR`, `ES`, `GQ`.
  - Especificar competencias oficiales por cada prueba nacional y enlaces a sus normativas.
- `saberparatodos/tests/unit/curriculum-subject-hub.test.ts`
  - Incluir pruebas de verificación para cada uno de los códigos del lote B.

---

## Acceptance Criteria (AC)
- [ ] `getAuthorityGuidelines('SV')` retorna MINED El Salvador con matriz de prueba AVANZO.
- [ ] `getAuthorityGuidelines('HN')` retorna SEDUC Honduras con competencias para matemática y español.
- [ ] `getAuthorityGuidelines('NI')`, `PR`, `ES`, `GQ` retornan sus respectivas entidades y matrices de competencias.
- [ ] `npm run test:unit -w saberparatodos` pasa al 100%.
