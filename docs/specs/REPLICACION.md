# 🌍 Guía de Onboarding por País

> [!WARNING]
> **ESTA GUÍA ESTÁ DEPRECADA.**
> Ya no se deben crear forks por país como estrategia por defecto.
> Este documento conserva la intención funcional, pero la implementación correcta es monorepo + lógica compartida + configuración por país.
> La plantilla base operativa vive en `saberparatodos/`; `apps/worldexams-site/` es solo el sitio principal de `worldexams`.

Este documento explica cómo añadir un país nuevo sin duplicar la lógica de aplicación.

---

## 📋 Pre-requisitos

Antes de añadir un país nuevo:

1. **10,000+ preguntas** en el banco base (Colombia)
2. **3+ meses** de operación estable
3. **Comunidad activa** de colaboradores
4. **Contacto local** en el país target (profesor/educador)

---

## 🚀 Proceso de Onboarding

Antes de cualquier onboarding:

- no usar `apps/worldexams-site/` como base de producto;
- usar `saberparatodos/src/` como runtime compartido;
- tratar el sitio raíz como superficie institucional/global.

### Paso 1: Crear Configuración del País

Crear archivo `config/country.ts`:

```typescript
export const countryConfig = {
  name: "México",
  code: "MX",
  examName: "PLANEA",
  currency: "MXN",
  timezone: "America/Mexico_City",

  grades: [
    { id: 3, name: "3° Primaria" },
    { id: 6, name: "6° Primaria" },
    { id: 9, name: "3° Secundaria" },
    { id: 12, name: "3° Preparatoria" },
  ],

  subjects: [
    { id: "espanol", name: "Español", icon: "📖" },
    { id: "matematicas", name: "Matemáticas", icon: "🔢" },
    { id: "ciencias", name: "Ciencias", icon: "🔬" },
    { id: "civica", name: "Formación Cívica", icon: "🏛️" },
  ],
};
```

### Paso 2: Adaptar Estructura de Contenido

```
src/content/questions/
├── espanol/           # Renombrado de "lenguaje"
│   ├── grado-3/
│   ├── grado-6/       # Diferente de Colombia
│   └── grado-9/
├── matematicas/
├── ciencias/
└── civica/            # Nueva asignatura
```

### Paso 3: Actualizar Branding y SEO

- `README.md` → Adaptar al país
- `public/favicon.ico` → Bandera/logo local
- `src/styles/global.css` → Colores nacionales (opcional)

### Paso 4: Conectar con el Modelo de Datos Compartido

No duplicar:

- componentes base
- rutas base
- lógica de scoring
- lógica de auth
- edge functions si el caso es el mismo

Duplicar solo si cambia el runtime o el contrato de negocio.

### Paso 5: Configurar Supabase

1. Crear nuevo proyecto en Supabase
2. Aplicar schema base
3. Configurar variables de entorno

### Paso 6: Reclutar Colaboradores Locales

1. Contactar universidades pedagógicas
2. Buscar comunidades de docentes
3. Publicar en redes locales

---

## 🔧 Adaptaciones Técnicas

### Sistema de Grados

| País | Grados Soportados | Prueba Nacional |
|------|-------------------|-----------------|
| 🇨🇴 Colombia | 3, 5, 7, 9, 11 | ICFES Saber |
| 🇲🇽 México | 3, 6, 9, 12 | PLANEA |
| 🇦🇷 Argentina | 3, 6, 9, 12 | APRENDER |
| 🇨🇱 Chile | 4, 8, 10, 12 | SIMCE |
| 🇵🇪 Perú | 2, 4, 6, 9, 11 | ECE |

### Asignaturas por País

**México:**
- Español (≈ Lenguaje)
- Matemáticas
- Ciencias
- Formación Cívica y Ética

**Argentina:**
- Lengua
- Matemática
- Ciencias Sociales
- Ciencias Naturales

**Chile:**
- Lenguaje
- Matemática
- Historia
- Ciencias Naturales

---

## 📝 Checklist de Onboarding

### Configuración Inicial

- [ ] `config/country.ts` configurado
- [ ] Estructura de carpetas adaptada
- [ ] README actualizado
- [ ] Supabase configurado
- [ ] No se duplicó lógica base de UI o dominio sin necesidad

### Contenido

- [ ] 10 preguntas de ejemplo por asignatura
- [ ] Plantilla de pregunta adaptada
- [ ] QUESTION_TEMPLATE.md localizado

### Comunidad

- [ ] 1+ contacto local confirmado
- [ ] Canal de comunicación (Discord/WhatsApp)
- [ ] Plan de lanzamiento local

### Legal

- [ ] Verificar licencias educativas del país
- [ ] Términos de uso adaptados
- [ ] Política de privacidad (GDPR si aplica)

---

## 🎯 Métricas de Éxito por País

| Métrica | Mes 1 | Mes 3 | Mes 6 |
|---------|-------|-------|-------|
| Preguntas | 100 | 500 | 2000 |
| Colaboradores | 5 | 20 | 50 |
| Usuarios | 100 | 1000 | 5000 |

---

## 📞 Soporte

Para proponer un país nuevo:

1. Abrir issue en el monorepo
2. Título: `[PAÍS] Solicitud para [País]`
3. Incluir:
   - País target
   - contacto local
   - examen objetivo
   - recursos disponibles

El objetivo es evaluar onboarding por configuración y contenido antes de crear nuevas fronteras técnicas.
