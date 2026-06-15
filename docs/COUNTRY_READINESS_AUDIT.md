# Country Readiness Audit

La metrica oficial de cobertura para pruebas finales es:

```text
preguntas v5.2 validas, canonicas y publicadas en packs API con prefijo de pais / 2000
```

No cuentan como avance oficial:
- bundles legacy;
- bundles sin ruta canonica weekly 2026;
- bundles que fallan `npm run validate`;
- packs genericos sin prefijo de pais;
- respuestas del API que vienen de fallback generico.

## Comandos

```bash
npm run audit:country-readiness
npm run audit:country-readiness -- --json
npm run audit:country-readiness -- --smoke-public
```

`--smoke-public` consulta `https://api.saberparatodos.space/v1/questions` para detectar si el pais responde con pack propio o con fallback.

## Estados

- `published_validated`: cuenta oficialmente hacia la meta de 2000.
- `validated_not_published`: el markdown es valido, pero falta generar/publicar packs.
- `legacy_or_invalid`: existe contenido, pero requiere reparacion o regeneracion.
- `missing`: no hay contenido usable.

## Uso En Issues Jules

Para crear issues de generacion, usar el gap del reporte como fuente de verdad.
Cada issue debe indicar:

- pais, asignatura, grado y semanas exactas;
- cantidad esperada de bundles y preguntas;
- ruta canonica esperada;
- que el PR no esta listo hasta pasar `npm run validate` y actualizar packs;
- que el avance solo se confirma con `npm run audit:country-readiness`.

Para distribuir avance entre los 20 paises, priorizar lotes de 200 a 400 preguntas por pais antes de sobreproducir un solo pais.
