# SaberParaTodos — Mass Bundle Generation Plan

## Target: 2,000+ questions per country = 100 MASTERY bundles per country
## Current: 220 total bundles → Target: 2,000 total bundles

### Priority by Tier
- **P0**: MX, BR, CL, ES — stable centralized exams, large markets
- **P1**: EC, PE, AR — large populations, transitional/decentralized
- **P2**: CR, DO, GT, PA — stable exams, smaller markets
- **P3**: UY, PY, BO, HN, NI, SV — decentralized, smaller
- **P4**: PR, GQ — different systems

### Bundle creation strategy:
1. Create 3 content bundles at a time (same country, different subjects)
2. Use the `skills/bundle-creator/` skill files and country rule files
3. Validate: 20 questions, unique IDs, exactly one [x] per question
4. Protocol version: 5.1, `modern_context: true`, `distractor_profile: misconception_based`

### Deployment:
After 100 bundles per country → deploy to Cloudflare Workers

## Subjects Matrix (per country)

- **CO**: Lectura Crítica, Matemáticas, Sociales y Ciudadanas, Ciencias Naturales (Biología, Física, Química), Inglés
- **CH**: Competencia Lectora, Competencia Matemática M1, Competencia Matemática M2, Ciencias (Biología, Física, Química), Historia y Ciencias Sociales
- **ME**: Comprensión Lectora, Redacción Indirecta, Pensamiento Matemático, 16 módulos específicos
- **BR**: Linguagens, Códigos e suas Tecnologias; Ciências Humanas; Ciências da Natureza; Matemática; Redação
- **ES**: Lengua Castellana y Literatura, Historia de España, Lengua Extranjera, Matemáticas, Materias de Modalidad
- **EC**: Lengua y Literatura, Matemática, Ciencias Naturales, Estudios Sociales
- **PE**: Razonamiento Verbal, Razonamiento Matemático, Ciencias (depende de universidad)
- **AR**: Lengua, Matemática (evaluación Aprender), más disciplinas por provincia
- **CR**: Español, Matemáticas, Estudios Sociales, Ciencias, Inglés
- **DO**: Lengua Española, Matemática, Ciencias Sociales, Ciencias de la Naturaleza
- **GT**: Lenguaje, Matemática, Ciencias Naturales, Ciencias Sociales, Inglés
- **PA**: Español, Matemáticas, Ciencias, Geografía/Historia, Inglés
- **UY**: Comunicación, Matemática, Ciencias, Filosofía, Historia
- **PY**: Castellano, Matemática, Ciencias, Historia, Geografía
- **BO**: Lenguaje, Matemática, Ciencias, Historia, Geografía
- **PR**: Español, Inglés, Matemáticas, Ciencias, Estudios Sociales
- **GQ**: Lengua Española, Matemáticas, Ciencias, Sociales (sistema español)
- **SV**: Lenguaje, Matemática, Ciencias Naturales, Ciencias Sociales, Inglés
- **HN**: Español, Matemáticas, Ciencias Sociales, Ciencias Naturales
- **NI**: Lengua y Literatura, Matemáticas, Ciencias, Estudios Sociales
