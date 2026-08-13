# [MS-022] — Embed Maloca module in WorldExams (maloca-streaming · worldexams)

| % validado | Estado | Repos | Refs | Prioridad | Esfuerzo |
|:---|:---|:---|:---|:---|:---|
| 0% | open | worldexams | | P3 | 2 days |

## Visión
Conectar la plataforma académica WorldExams con la malla de telemetría de desarrollo de Maloca. Disponer de este módulo en el área de administración permite supervisar el ritmo de entregas y la conformidad arquitectónica en el contexto de desarrollo de exámenes.

## Scope
- Incorporar una nueva vista o sub-panel 'Maloca' en la zona de configuración de WorldExams.
- Consumir el paquete estándar `@swal/maloca-embed`.
- Parametrizar la invocación del componente con `app_id='worldexams'`.
- Mostrar el resumen del backlog (funcionalidades implementadas vs. planeadas), el _score badge_ de GitCore, y los _feeds_ de commits y decisiones.

## Aceptación
- [ ] El componente de Maloca se visualiza correctamente dentro de WorldExams.
- [ ] La instancia usa explícitamente `app_id='worldexams'`.
- [ ] Los componentes subyacentes del módulo embed reflejan la metadata asociada al repositorio `worldexams`.

## Archivos
- `src/components/Admin/MalocaPanel.tsx`
- `src/pages/admin/maloca.tsx`
- `package.json`

## Dependencias
- [MS-016] — Maloca MS-016 (@swal/maloca-embed package)

## Verificación
Levantar el frontend de WorldExams, entrar a la interfaz de administración, y verificar que los _scores_ e historial de GitCore para la aplicación `worldexams` rendericen apropiadamente.
