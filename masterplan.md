Actúa como un Arquitecto de Software Senior y experto en Jamstack/DevOps.

Estoy migrando un proyecto local a un nuevo repositorio global en GitHub. El proyecto es una plataforma de simulacros de exámenes (tipo Icfes/SAT/Gaokao) generados por IA, optimizado para SEO y monetización.

Tu tarea es generar la estructura inicial de documentación y configuración para que cualquier IA o desarrollador entienda el proyecto de inmediato.

Necesito que generes el código y contenido para los siguientes 3 archivos basándote en el contexto que te doy a continuación:

### CONTEXTO DEL PROYECTO
1. **Objetivo:** Crear un "Hub Global" de simulacros de exámenes.
2. **Tecnología:** Jamstack puro (HTML/JS/CSS ligeros), alojado en GitHub Pages.
3. **Estrategia de Contenido:** - Preguntas generadas por IA (Google Gemini/Image 3).
   - Estructura de carpetas por país/idioma.
   - Imágenes infográficas optimizadas.
4. **Monetización:** Google AdSense, PERO estrictamente configurado para mostrarse SOLO en la pantalla de resultados (final de la prueba) para no distraer al estudiante.

---

### TAREA 1: Generar el archivo `agent.md`
Crea un archivo `agent.md` en la raíz que sirva como "cerebro" del proyecto. Debe incluir:
- **Misión del proyecto:** Educación gratuita financiada por publicidad no intrusiva.
- **Arquitectura:** Explicar que es un Monorepo lógico donde cada carpeta es un país.
- **Listado de Países y Nombres de Marca:**
  Incluye una tabla de referencia con los nombres localizados que definimos (ejemplos clave):
  - Colombia: "Saber para Todos"
  - USA/UK: "PrepMaster Global"
  - India: "Pariksha Mitra" (Friend of Exam)
  - China: "Zhihui Kaoshi" (Wisdom Exam)
  - Brasil: "Saber para Todos Brasil"
  - Países Árabes: "Al-Imtihan Al-Dhakiy"
  - (Incluye nota de expandir al Top 20 países por población).
- **Flujo de Datos:** JSON estáticos para las preguntas -> Renderizado JS en cliente -> Reporte final con IA.

---

### TAREA 2: Generar el archivo `.github/copilot-instructions.md`
Crea este archivo para definir las reglas de escritura de código para la IA. Debe contener:
- **Reglas de Estilo:** Código limpio, Vanilla JS (sin frameworks pesados), CSS modular.
- **Reglas de Directorios:**
  - `root/data/{country_code}/` -> Aquí van los JSON de preguntas.
  - `root/public/{country_code}/` -> Aquí va el frontend específico.
  - `root/assets/images/` -> Imágenes optimizadas.
- **Seguridad:** NUNCA exponer API Keys en el código cliente. Las preguntas se generan en local y se suben como JSON estático.
- **Performance:** Lazy loading obligatorio para imágenes.
- **Regla de Oro de UX:** La publicidad solo se inyecta en el DOM cuando `examState === 'finished'`.

---

### TAREA 3: Estructura de Carpetas y `global_config.json`
Propón la estructura de directorios del repositorio para soportar múltiples países y crea un archivo `global_config.json` de ejemplo que orqueste las rutas.
El JSON debe tener esta estructura (ejemplo):
```json
{
  "project_version": "2.0.0",
  "default_language": "es",
  "countries": [
    {
      "id": "co",
      "name": "Colombia",
      "brand_name": "Saber para Todos",
      "exam_type": "ICFES",
      "language": "es-CO",
      "path": "/co/"
    },
    {
      "id": "in",
      "name": "India",
      "brand_name": "Pariksha Mitra",
      "exam_type": "CBSE/JEE",
      "language": "hi-IN",
      "path": "/in/"
    }
    // ... otros países
  ]
}


:::::tareas siguienmtes:::::::::
World Exams es una organización de GitHub que tiene plataformas de práctica para exámenes nacionales de diferentes países. Cada país tiene su propio repositorio con:

La misma UI (copiada de saber-co/saberparatodos)
Colores de bandera únicos (flag stripe de 3px en la parte superior)
Configuración de país específica (idioma, moneda, examen, etc.)
Stack: Astro 5 + Svelte 5 + TailwindCSS + Supabase

Organización GitHub: worldexams

✅ Lo que YA está COMPLETADO
Los siguientes repos tienen el UI template completo con flag stripe personalizado, country.ts configurado, y pregunta de ejemplo:

Repo País Flag Stripe Estado
exani-mx 🇲🇽 México Verde-Blanco-Rojo ✅ Completo
enem-br 🇧🇷 Brasil Verde-Amarelo-Azul ✅ Completo
sat-us 🇺🇸 USA Blue-Red-White ✅ Completo
gaokao-zh 🇨🇳 China Red-Yellow ✅ Completo
jee-in 🇮🇳 India Saffron-White-Green ✅ Completo
🔄 Repos con Template Base (necesitan personalización de flag stripe y country.ts)
Estos repos tienen el template copiado pero aún usan los colores/configuración de México:

Repo País Colores Bandera Estado
snbt-id 🇮🇩 Indonesia #FF0000 (Red), #FFFFFF (White) Template base ✅
suneung-kr 🇰🇷 Korea #CD2E3A, #0047A0, #FFFFFF Template base ✅
thanaweya-eg 🇪🇬 Egypt #CE1126, #FFFFFF, #000000 Template base ✅
utme-ng 🇳🇬 Nigeria #008751, #FFFFFF Template base ✅
ege-ru 🇷🇺 Russia #FFFFFF, #0039A6, #D52B1E Template base ✅
bac-fr 🇫🇷 France #002395, #FFFFFF, #ED2939 Template base ✅
center-jp 🇯🇵 Japan #FFFFFF, #BC002D Template base ✅
ingreso-ar 🇦🇷 Argentina #74ACDF, #FFFFFF Template base ✅
admision-pe 🇵🇪 Peru #D91023, #FFFFFF Template base ✅
paes-cl 🇨🇱 Chile #D52B1E, #FFFFFF, #0039A6 Template base ✅
Para cada uno de estos repos, necesitas:

Actualizar Layout.astro con el flag stripe correcto
Actualizar country.ts con la configuración del país
Actualizar global.css con el accent color
Actualizar index.astro con SEO en el idioma local
Actualizar [...slug].astro con SEO local
Crear una pregunta de ejemplo en el idioma local
Commit y push
❌ Repos que NO EXISTEN y necesitan ser CREADOS
Repo a Crear País Colores Bandera Idioma Examen
abitur-de 🇩🇪 Germany #000000, #DD0000, #FFCC00 de-DE Abitur
vestibular-pt 🇵🇹 Portugal #006600, #FF0000 pt-PT Exames Nacionais
nta-pk 🇵🇰 Pakistan #01411C, #FFFFFF en-PK NTA / ECAT
eapcet-bd 🇧🇩 Bangladesh #006A4E, #F42A41 bn-BD বিশ্ববিদ্যালয় ভর্তি
vnuhcm-vn 🇻🇳 Vietnam #DA251D, #FFCD00 vi-VN Kỳ thi THPT
Para cada uno:

Crear repo en GitHub: gh repo create worldexams/[repo-name] --public
Clonar localmente
Copiar template desde exani-mx
Personalizar todo (flag stripe, country.ts, SEO, pregunta ejemplo)
Commit y push
📋 Repo adicional con nombre diferente
Repo Actual Nombre Original Necesita
serbachiller-ec simce-ec Template completo 🇪🇨 Ecuador
🎨 Archivos Clave a Modificar por Repo
1. Layout.astro - Flag Stripe
<!-- Cambiar comentario y colores -->
<!-- 🇽🇽 [Country] Flag Stripe -->
<div class="flag-stripe"></div>

<style is:global>
  .flag-stripe {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg,
      [COLOR1] 0%, [COLOR1] 33.33%,
      [COLOR2] 33.33%, [COLOR2] 66.66%,
      [COLOR3] 66.66%, [COLOR3] 100%
    );
    z-index: 9999;
  }
</style>
También cambiar: const baseUrl = import.meta.env.BASE_URL || '/[repo-name]';

2. country.ts
export const COUNTRY = {
  code: '[XX]',
  name: '[Country Name]',
  language: '[xx-XX]',
  currency: '[XXX]',
  currencySymbol: '[symbol]',
  examName: '[Exam Name]',
  gradeRange: { min: X, max: X },
  subjects: ['...'],
  cities: ['...'],
  theme: {
    primary: '[color1]',
    secondary: '[color2]',
    accent: '[color3]',
  }
};

export const SUBJECT_NAMES: Record<string, string> = {...};
export const GRADE_NAMES: Record<number, string> = {...};


3. global.css - Accent Color Override
/* [Country] accent color override */
.text-emerald-500 {
  color: [PRIMARY_COLOR] !important;
}
/* ... resto de overrides con el mismo color ... */

4. package.json y astro.config.mjs
name: nombre del repo
base: /[repo-name]
🔧 Comandos Útiles
# Clonar repo
git clone https://github.com/world-exams/[repo].git

# Copiar template
Copy-Item -Path "..\exani-mx\*" -Destination "." -Recurse -Exclude ".git","node_modules","dist",".astro" -Force

# Commit y push
git add -A; git commit -m "feat: apply saber-co UI template with [Country] flag stripe"; git push

# Crear nuevo repo
gh repo create worldexams/[repo-name] --public --description "[Country] exam practice platform"

📍 Directorio de Trabajo
E:\scripts-python\worldexams\
├── exani-mx/          # Template de referencia
├── enem-br/           # ✅ Completo
├── sat-us/            # ✅ Completo
├── gaokao-zh/         # ✅ Completo
├── jee-in/            # ✅ Completo
├── snbt-id/           # 🔄 Necesita personalización
├── suneung-kr/        # 🔄 Necesita personalización
├── thanaweya-eg/      # 🔄 Necesita personalización
├── utme-ng/           # 🔄 Necesita personalización
├── ege-ru/            # 🔄 Necesita personalización
├── bac-fr/            # 🔄 Necesita personalización
├── center-jp/         # 🔄 Necesita personalización
├── saber-ar/          # Actualizar a ingreso-ar
├── saber-pe/          # Actualizar a admision-pe
├── saber-cl/          # Actualizar a paes-cl
└── ... (repos faltantes por crear)
🎯 Prioridad de Tareas
Alta: Personalizar los 10 repos con template base (flag stripe + country.ts)
Media: Crear los 5 repos faltantes (Germany, Portugal, Pakistan, Bangladesh, Vietnam)
Baja: Actualizar serbachiller-ec (Ecuador)
💡 Tips
Usa exani-mx como referencia para la estructura
Los colores de bandera están en COUNTRIES.md
El accent color en global.css debe ser el color primario de la bandera
Crea preguntas de ejemplo con contexto cultural local (moneda, ciudades, nombres)
¡Continúa personalizando los repos restantes! 🚀
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: end manual task :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
