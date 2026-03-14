# 🚀 Protocolo de Preguntas Modernas v2.0

> Specialized overlay. Este documento no reemplaza el protocolo principal vigente.
> Úsalo solo si la tarea pide explícitamente contextos modernos y después de reconciliarlo con `docs/QUESTION_GENERATION_PROTOCOL_V3.md` y `docs/specs/ACTIVE_PROTOCOLS.md`.

> **Versión:** 2.0 (actualizado con gamificación y contextos virales)
> **Fecha:** 2025-12-17
> **Estado:** Especializado
> **Aplica a:** Colombia (extensible a otros países)

---

## 📌 Resumen Ejecutivo

Este protocolo define las reglas para crear preguntas con **contextos modernos, divertidas y virales** para estudiantes de la Generación Z y Alpha. Las preguntas están diseñadas para ser:

- 🎮 **Gamificadas**: Inspiradas en Kahoot, Duolingo y Quizlet
- 📱 **Relevantes**: Usan apps, videojuegos y memes actuales
- 🧠 **Microlearning**: Conceptos en formato bite-sized
- 🔥 **Virales**: Contextos de TikTok, Instagram, YouTube

### Diferencias con el Protocolo Principal (v2.1)

| Aspecto | Protocolo v2.1 | Protocolo Moderno v2.0 |
|---------|---------------|------------------------|
| Alineación | ICFES/Entes reguladores | Ministerio de Educación |
| Contextos | Tradicionales/culturales | **Tecnología, IA, Videojuegos, Memes** |
| Tono | Formal/académico | **Casual, divertido, relatable** |
| Tag especial | N/A | `modern_context: true` |
| Fuentes | Preguntas liberadas ICFES | Tendencias virales, cultura digital |

---

## 🏷️ Campos de Metadata Adicionales

Además de los campos del protocolo v2.1, las preguntas modernas **DEBEN** incluir:

```yaml
---
# === METADATA GLOBAL (heredado de v2.1) ===
id: "CO-TEC-7-programacion-001"
country: "co"
grado: 7
asignatura: "Tecnología e Informática"
tema: "Pensamiento computacional"
protocol_version: "2.1"
total_questions: 7
estado: "draft"

# === METADATA MODERNA (NUEVO) ===
modern_context: true                    # OBLIGATORIO
context_type: "technology"              # Ver tabla abajo
context_tags: ["Scratch", "algoritmos", "videojuegos"]
curriculum_alignment: "MEN"             # MEN = Ministerio de Educación Nacional
icfes_evaluated: false                  # No es evaluado por ICFES
---
```

### Tipos de Contexto (`context_type`)

| Valor | Descripción | Ejemplos de uso |
|-------|-------------|-----------------|
| `ai` | Inteligencia Artificial | ChatGPT, asistentes virtuales, Machine Learning |
| `social_media` | Redes Sociales | TikTok, Instagram, WhatsApp, ciberseguridad |
| `technology` | Tecnología general | Apps, dispositivos, Internet de las cosas |
| `robotics` | Robótica | Drones, robots, automatización |
| `digital_citizenship` | Ciudadanía digital | Privacidad, derechos digitales, fake news |
| `programming` | Programación | Scratch, Python, lógica computacional |
| `gaming` | Videojuegos | Minecraft, Fortnite, Roblox, League of Legends |
| `memes` | Cultura meme | Memes educativos, humor relatable |

---

## 🎮 Principios de Gamificación

Las preguntas modernas deben aplicar principios de gamificación probados por plataformas exitosas:

### Inspirado en Kahoot

- ⚡ **Inmediatez**: Feedback instantáneo sobre respuestas
- 🏆 **Competencia sana**: Elementos de puntuación y ranking
- 🎨 **Visual y colorido**: Enunciados con contextos visuales atractivos
- ⏱️ **Tensión temporal**: Sensación de urgencia (implícita en exámenes)

### Inspirado en Duolingo

- 🔥 **Streaks y progresión**: Preguntas que construyen sobre lo anterior
- 💚 **Feedback positivo**: Celebrar aciertos en las explicaciones
- 🦉 **Mascota/Tono amigable**: Lenguaje cercano, no intimidante
- 📱 **Bite-sized**: Conceptos pequeños y digeribles

### Inspirado en Quizlet

- 🃏 **Variedad de formatos**: No solo opción múltiple
- 🔄 **Repetición espaciada**: Variantes refuerzan el mismo concepto
- 👥 **Colaborativo**: Preguntas que invitan discusión
- 📊 **Progreso visible**: Distribución clara de dificultades

---

## 🇨🇴 Contextos Virales Colombia 2024-2025

Usar estos temas culturalmente relevantes para estudiantes colombianos:

### 📱 Apps y Plataformas Populares

| Categoría | Apps para usar en contextos |
|-----------|----------------------------|
| Redes Sociales | TikTok, Instagram, WhatsApp, YouTube |
| Streaming | Netflix, Max, Spotify |
| Finanzas | Nequi, Daviplata, Rappi |
| Shopping | Temu, MercadoLibre, Shein |
| Productividad | ChatGPT, Google, Notion |

### 🎮 Videojuegos Trending

Usar estos juegos como contextos para problemas:

- **Minecraft**: Construcción, volúmenes, geometría, recursos
- **Fortnite**: Estrategia, probabilidad, estadísticas de juego
- **Roblox**: Creatividad, programación básica, economía virtual
- **League of Legends**: Trabajo en equipo, estadísticas, tiempo
- **GTA V**: Ética, decisiones, urbanismo (grados altos)
- **Call of Duty**: Física, trayectorias (conceptual)
- **EA Sports FC (FIFA)**: Estadísticas, porcentajes, probabilidad

### 🔥 Tendencias para Contextos

| Tendencia | Cómo usarla |
|-----------|-------------|
| Shorts/Reels | Duración de videos, engagement, algoritmos |
| Influencers | Estadísticas, followers, alcance |
| Streaming | Música, playlists, recomendaciones |
| E-commerce | Descuentos, envíos, comparación precios |
| Memes | Comunicación visual, viralidad, cultura |

---

## 🧠 Diseño para Gen Z y Alpha

### Preferencias de Aprendizaje

| Generación | Características | Implicación en preguntas |
|------------|-----------------|-------------------------|
| **Gen Z** (1997-2012) | Visual, autónomo, busca propósito | Conectar con vida real, explicar el "por qué" |
| **Gen Alpha** (2010+) | Nativo IA, multitarea, interactivo | Gamificado, inmediato, multimedia |

### Principios de Diseño

1. **Microlearning**: Un concepto por pregunta, explicaciones cortas
2. **Relevancia inmediata**: "¿Para qué me sirve esto?"
3. **Humor aceptable**: Tono casual, no aburrido
4. **Sin sermones**: Mostrar, no predicar
5. **Autenticidad**: Usar apps reales, no inventadas
6. **Progresión visible**: Saber dónde están en su aprendizaje

### Frases de Contexto Efectivas

```
✅ "Estás scrolleando TikTok cuando..."
✅ "Tu equipo en Fortnite tiene 3 jugadores con..."
✅ "El algoritmo de Spotify te recomienda..."
✅ "Un streamer de Twitch pregunta a su chat..."
✅ "En el grupo de WhatsApp del salón..."
✅ "Tu primo te envía un link diciendo que..."

❌ "En un libro antiguo se menciona..."
❌ "Según estudios académicos..."
❌ "El sabio profesor explicó..."
```

---

## 📂 Nuevas Áreas de Contenido

### Tecnología e Informática

**Carpeta:** `src/content/questions/colombia/tecnologia-informatica/`

**Grados:** 3, 5, 7, 9, 11

**Temas por grado:**

| Grado | Temas sugeridos |
|-------|-----------------|
| 3 | Uso básico del computador, partes del PC, navegación segura |
| 5 | Ofimática básica, búsqueda en internet, ciudadanía digital básica |
| 7 | Introducción a programación (Scratch), redes, ciberseguridad |
| 9 | Programación básica, bases de datos conceptual, IA conceptual |
| 11 | Desarrollo web básico, ética de la tecnología, emprendimiento digital |

### Filosofía

**Carpeta:** `src/content/questions/colombia/filosofia/`

**Grados:** 10, 11 (según malla curricular de media)

**Temas sugeridos:**
- Ética de la inteligencia artificial
- Filosofía de la mente vs máquinas
- Derechos digitales y privacidad
- Pensamiento crítico en la era de la información
- Fake news y epistemología

---

## 🎯 Reglas de Contextualización Moderna

### ✅ SÍ hacer:

1. **Usar apps y plataformas reales:**
   - TikTok, Instagram, WhatsApp, YouTube, Spotify
   - ChatGPT, Google, Wikipedia
   - Scratch, Python, micro:bit

2. **Plantear problemas de la vida digital:**
   - "María recibe un mensaje sospechoso en WhatsApp..."
   - "Pedro quiere crear un videojuego en Scratch..."
   - "Tu colegio quiere usar cámaras con reconocimiento facial..."

3. **Incluir tecnologías actuales:**
   - Inteligencia artificial y chatbots
   - Drones y robots
   - Realidad virtual y aumentada
   - Criptomonedas y blockchain (conceptual)

4. **Desarrollar pensamiento crítico digital:**
   - Identificar fake news
   - Evaluar fuentes de información
   - Entender algoritmos de recomendación

### ❌ NO hacer:

1. **NO usar tecnologías obsoletas** como CD-ROM, disquetes, Encarta
2. **NO plantear escenarios irreales** para la generación actual
3. **NO ser alarmista** sobre la tecnología
4. **NO usar marcas ficticias** cuando existen reales

---

## 📝 Ejemplos de Preguntas

### Ejemplo 1: Tecnología e Informática (Grado 7)

```markdown
---
id: "CO-TEC-7-ciudadania-001"
modern_context: true
context_type: "digital_citizenship"
context_tags: ["phishing", "seguridad", "WhatsApp"]
---

## Pregunta 1 (Original - Dificultad 3)

### Enunciado

Carlos recibe un mensaje de WhatsApp de un número desconocido que dice:
*"¡Felicitaciones! Has ganado un iPhone 15. Haz clic aquí para reclamarlo: bit.ly/gratis-iphone"*

¿Cuál es la acción más segura que Carlos debería tomar?

### Opciones

- [x] A) Ignorar el mensaje y bloquear el número
- [ ] B) Hacer clic en el enlace para ver si es real
- [ ] C) Reenviar el mensaje a sus amigos por si también ganaron
- [ ] D) Responder al mensaje pidiendo más información

### Explicación Pedagógica

**¿Por qué A es correcta?**
Este tipo de mensajes son intentos de **phishing** - una técnica para robar datos personales. Los premios legítimos nunca llegan por mensajes de números desconocidos con enlaces sospechosos.

**¿Por qué las otras son incorrectas?**
- **B)** Hacer clic en enlaces desconocidos puede instalar malware o robar datos
- **C)** Reenviar difunde la estafa y puede afectar a tus contactos
- **D)** Responder confirma que tu número está activo, invitando más spam
```

### Ejemplo 2: Matemáticas con contexto IA

```markdown
---
id: "CO-MAT-9-estadistica-001"
modern_context: true
context_type: "ai"
context_tags: ["ChatGPT", "algoritmos", "recomendaciones"]
---

## Pregunta 1 (Original - Dificultad 3)

### Enunciado

El algoritmo de TikTok analiza que de cada 100 videos que te muestra, tú le das "like" a 15.
Si en una sesión el algoritmo te muestra 40 videos, ¿cuántos "likes" espera el algoritmo que darás,
según tu historial?

### Opciones

- [x] A) 6 likes
- [ ] B) 15 likes
- [ ] C) 40 likes
- [ ] D) 10 likes

### Explicación Pedagógica

**¿Por qué A es correcta?**
La probabilidad de like es 15/100 = 0.15 (15%).
Con 40 videos: 40 × 0.15 = 6 likes esperados.

Esto se llama **valor esperado** y es la base de cómo los algoritmos predicen tu comportamiento.
```

### Ejemplo 3: Geometría con Minecraft (Grado 5)

```markdown
---
id: "CO-MAT-5-volumen-001"
modern_context: true
context_type: "gaming"
context_tags: ["Minecraft", "bloques", "construcción"]
---

## Pregunta 1 (Original - Dificultad 3)

### Enunciado

🎮 En Minecraft, estás construyendo una piscina con forma de prisma rectangular.
La piscina mide 10 bloques de largo, 5 bloques de ancho y 3 bloques de profundidad.

¿Cuántos bloques de agua necesitas para llenarla completamente?

### Opciones

- [x] A) 150 bloques
- [ ] B) 18 bloques
- [ ] C) 50 bloques
- [ ] D) 100 bloques

### Explicación Pedagógica

**🎯 ¡Bien jugado!**
Volumen = largo × ancho × altura = 10 × 5 × 3 = **150 bloques**

En Minecraft cada bloque es 1m³, así que tu piscina tendría 150 metros cúbicos de agua.
¡Suficiente para hacer una épica competencia de natación! 🏊
```

### Ejemplo 4: Lectura Crítica con Memes (Grado 7)

```markdown
---
id: "CO-LEC-7-interpretacion-001"
modern_context: true
context_type: "memes"
context_tags: ["humor", "interpretación", "redes"]
---

## Pregunta 1 (Original - Dificultad 3)

### Enunciado

📱 Un meme viral muestra a un estudiante con dos botones:
- Botón 1: "Estudiar para el examen"
- Botón 2: "Ver solo UN video más de YouTube"

El estudiante aparece sudando mientras mira ambos botones.

¿Cuál es la intención comunicativa principal de este meme?

### Opciones

- [x] A) Mostrar con humor la dificultad de evitar las distracciones digitales
- [ ] B) Criticar a los estudiantes que no estudian
- [ ] C) Promocionar el uso de YouTube para estudiar
- [ ] D) Informar sobre los efectos negativos de internet

### Explicación Pedagógica

**🎯 ¡Captaste el meme!**
Los memes usan **humor relatable** para conectar con experiencias comunes.
Este meme no juzga ni informa, simplemente refleja una situación que muchos reconocen.
La clave está en identificar el TONO (humorístico) y el PROPÓSITO (generar identificación).
```

### Ejemplo 5: Ciencias con Nequi (Grado 9)

```markdown
---
id: "CO-NAT-9-energia-001"
modern_context: true
context_type: "technology"
context_tags: ["Nequi", "batería", "energía"]
---

## Pregunta 1 (Original - Dificultad 3)

### Enunciado

📱 Tu celular tiene una batería de 5000 mAh (miliamperios-hora).
Si la app de Nequi consume en promedio 200 mA cuando está activa,
¿cuántas horas podrías usar SOLO la app de Nequi antes de que se agote la batería?

### Opciones

- [x] A) 25 horas
- [ ] B) 5 horas
- [ ] C) 1000 horas
- [ ] D) 10 horas

### Explicación Pedagógica

**🔋 ¡Energía bien calculada!**
Tiempo = Capacidad / Consumo = 5000 mAh / 200 mA = **25 horas**

Claro, en la vida real usamos más apps a la vez, por eso la batería
no dura tanto. Este cálculo asume que SOLO usas Nequi...
¿pero quién puede resistir revisar TikTok? 😅
```

---

## 🔄 Integración con Protocolo v2.1

Las preguntas modernas **DEBEN** seguir la estructura de 7 variantes del protocolo v2.1:

| # | Tipo | Dificultad |
|---|------|------------|
| 1 | Original | 3 |
| 2 | Fácil A | 1-2 |
| 3 | Fácil B | 1-2 |
| 4 | Media A | 3 |
| 5 | Media B | 3 |
| 6 | Difícil A | 4-5 |
| 7 | Difícil B | 4-5 |

---

## 📊 Convenciones de ID

El prefijo de asignatura para las nuevas áreas:

| Área | Prefijo |
|------|---------|
| Tecnología e Informática | `TEC` |
| Filosofía | `FIL` |

**Ejemplo:** `CO-TEC-7-programacion-001-v1`

---

## ✅ Checklist de Validación

Antes de aprobar una pregunta moderna:

### Contenido Moderno
- [ ] Campo `modern_context: true` presente
- [ ] Campo `context_type` válido
- [ ] Contexto usa tecnología/apps actuales (post-2020)
- [ ] No usa tecnología obsoleta

### Pedagogía
- [ ] Desarrolla pensamiento crítico digital
- [ ] Explicaciones conectan con ciudadanía digital
- [ ] Distractores reflejan errores comunes de generación digital

### Alineación Curricular
- [ ] Campo `curriculum_alignment: "MEN"` presente
- [ ] Competencia alineada a Estándares Básicos de Competencias MEN
- [ ] Apropiado para el grado

---

## 🔗 Referencias

- [Protocolo v2.1](./QUESTION_GENERATION_PROTOCOL_V2.md)
- [Ley 115 de 1994 - Art. 23](https://www.mineducacion.gov.co/1621/articles-85906_archivo_pdf.pdf)
- [Estándares Básicos de Competencias en Tecnología](https://www.mineducacion.gov.co/1621/articles-340021_recurso_1.pdf)

---

*Documento creado: 2025-12-17 | Protocolo activo desde esta fecha*
