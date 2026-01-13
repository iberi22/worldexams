# 🌍 Guía de Replicación por País

> [!WARNING]
> **ESTA GUÍA ESTÁ DEPRECADA.**
> Favor ver `PROFESSIONAL_PLAN.md`.
> El proyecto ha migrado a una arquitectura "Single-Repo Multi-Tenant". Ya no se deben crear forks por país.

Este documento explica cómo crear un fork del proyecto adaptado para otro país (LEGADO).

---

## 📋 Pre-requisitos

Antes de crear un fork para otro país:

1. **10,000+ preguntas** en el banco base (Colombia)
2. **3+ meses** de operación estable
3. **Comunidad activa** de colaboradores
4. **Contacto local** en el país target (profesor/educador)

---

## 🚀 Proceso de Replicación

### Paso 1: Fork del Repositorio

```bash
# En GitHub, hacer fork de iberi22/saberparatodos
# Renombrar a: saber-[codigo-pais]
# Ejemplo: saber-mexico, saber-argentina, saber-chile
```

### Paso 2: Configurar País

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

### Paso 3: Adaptar Estructura de Contenido

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

### Paso 4: Actualizar Branding

- `README.md` → Adaptar al país
- `public/favicon.ico` → Bandera/logo local
- `src/styles/global.css` → Colores nacionales (opcional)

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

## 📝 Checklist de Replicación

### Configuración Inicial

- [ ] Fork creado y renombrado
- [ ] `config/country.ts` configurado
- [ ] Estructura de carpetas adaptada
- [ ] README actualizado
- [ ] Supabase configurado

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

## 🎯 Métricas de Éxito por Fork

| Métrica | Mes 1 | Mes 3 | Mes 6 |
|---------|-------|-------|-------|
| Preguntas | 100 | 500 | 2000 |
| Colaboradores | 5 | 20 | 50 |
| Usuarios | 100 | 1000 | 5000 |

---

## 📞 Soporte

Para crear un fork oficial:

1. Abrir issue en el repo principal
2. Título: `[FORK] Solicitud para [País]`
3. Incluir:
   - País target
   - Contacto local
   - Plan inicial
   - Recursos disponibles

El equipo core revisará y apoyará el proceso.
