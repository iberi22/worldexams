"""
Fix Astro pages to use Astro.locals.country for dynamic country-specific content.
"""

from pathlib import Path

BASE = Path(r"E:\scripts-python\worldexams\saberparatodos\src\pages")


def read(path):
    return path.read_text(encoding="utf-8")


def write(path, content):
    path.write_text(content, encoding="utf-8")


# === preguntas-icfes.astro - COMPLETE REWRITE ===
path = BASE / "preguntas-icfes.astro"
content = read(path)

# Full rewrite with proper Astro syntax
new_content = """---
import Layout from '../layouts/Layout.astro';
import { countryConfig as defaultConfig, toRuntimeCountryConfig } from '../config';

const country = Astro.locals.country ? toRuntimeCountryConfig(Astro.locals.country) : defaultConfig;

const title = `${country.examName} Gratis por Areas | ${country.product.siteName}`;
const description = `Practica preguntas ${country.examName} de ${country.subjects.map(s => s.name.toLowerCase()).join(', ')}. Entrena gratis por areas y mejora tu preparacion.`;
const keywords = `preguntas ${country.examName} gratis, banco de preguntas ${country.examName}`;
---

<Layout title={title} description={description} keywords={keywords}>
  <section class="wrapper">
    <div class="container">
      <p class="eyebrow">Banco de preguntas</p>
      <h1>Preguntas {country.examName} gratis para practicar por areas</h1>
      <p class="lead">
        Esta pagina reun la intencion de quienes buscan <strong>preguntas {country.examName}</strong>,
        <strong>banco de preguntas</strong> y practica gratuita para {country.examFullName} en {country.name}.
      </p>

      <div class="cards">
        {country.subjects.map(subject => (
          <article>
            <h2>{subject.name}</h2>
            <p>Practica {subject.name.toLowerCase()} con ejercicios guiados y feedback instantaneo.</p>
          </article>
        ))}
      </div>

      <div class="cta-row">
        <a href="/practica" class="btn btn-primary">Ir a la practica</a>
        <a href="/guia-examen" class="btn btn-secondary">Ver guia {country.examName}</a>
      </div>
    </div>
  </section>
</Layout>

<style>
  .wrapper { padding: 4rem 1rem; }
  .container { max-width: 1000px; margin: 0 auto; }
  .eyebrow { color: #fcd116; text-transform: uppercase; letter-spacing: 0.12em; font: 0.75rem 'Fira Code', monospace; }
  h1, h2 { color: #f5f5dc; }
  h1 { font-size: clamp(2.25rem, 5vw, 4rem); margin: 1rem 0; max-width: 12ch; }
  .lead { color: rgba(245,245,220,0.7); font-size: 1.2rem; margin: 2rem 0; line-height: 1.6; max-width: 55ch; }
  .cards { display: grid; gap: 1.5rem; margin: 3rem 0; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
  .cards article { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; padding: 1.5rem; }
  .cards h2 { color: #10b981; font-size: 1.1rem; margin-bottom: 0.5rem; }
  .cards p { color: rgba(245,245,220,0.6); font-size: 0.9rem; }
  .cta-row { display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap; }
  .btn { padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; text-decoration: none; transition: all 0.2s; }
  .btn-primary { background: #10b981; color: #000; }
  .btn-primary:hover { background: #059669; transform: translateY(-2px); }
  .btn-secondary { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #f5f5dc; }
  .btn-secondary:hover { border-color: #10b981; color: #10b981; }
</style>
"""

write(path, new_content)
print(f"Fixed: {path}")

# === pruebas-saber-gratis.astro - COMPLETE REWRITE ===
path = BASE / "pruebas-saber-gratis.astro"
content = read(path)

new_content = """---
import Layout from '../layouts/Layout.astro';
import { countryConfig as defaultConfig, toRuntimeCountryConfig } from '../config';

const country = Astro.locals.country ? toRuntimeCountryConfig(Astro.locals.country) : defaultConfig;

const title = `${country.examName} Gratis en ${country.name} | ${country.product.siteName}`;
const description = `Encuentra practica gratuita para ${country.examName}, simulacros y guias de preparacion en ${country.name}. Conoce areas, competencias y recursos.`;
const keywords = `${country.examName} gratis, examenes gratis ${country.name.toLowerCase()}`;
---

<Layout title={title} description={description} keywords={keywords}>
  <section class="wrapper">
    <div class="container">
      <p class="eyebrow">Preparacion {country.name}</p>
      <h1>{country.examName} gratis para practicar mejor en {country.name}</h1>
      <p class="lead">
        Si llegaste buscando <strong>{country.examName} gratis</strong>, <strong>simulacros</strong> o
        <strong>examnes gratis en {country.name}</strong>, aqui encontrars una ruta clara hacia practica, guia y simulacro.
      </p>

      <div class="panel">
        <h2>Que puedes hacer en {country.product.siteName}</h2>
        <ul>
          <li>Practicar por areas en una app de estudio gratuita.</li>
          <li>Entrar a una landing especializada de simulacro {country.examName}.</li>
          <li>Consultar guias de estructura del examen y materiales de apoyo.</li>
          <li>Reforzar competencias antes de presentar {country.examFullName}.</li>
        </ul>
      </div>

      <div class="cta-row">
        <a href="/practica" class="btn btn-primary">Comenzar practica</a>
        <a href="/guia-examen" class="btn btn-secondary">Leer la guia</a>
      </div>
    </div>
  </section>
</Layout>

<style>
  .wrapper { padding: 4rem 1rem; }
  .container { max-width: 1000px; margin: 0 auto; }
  .eyebrow { color: #fcd116; text-transform: uppercase; letter-spacing: 0.12em; font: 0.75rem 'Fira Code', monospace; }
  h1, h2 { color: #f5f5dc; }
  h1 { font-size: clamp(2.25rem, 5vw, 4rem); margin: 1rem 0; }
  .lead { color: rgba(245,245,220,0.7); font-size: 1.2rem; margin: 2rem 0; line-height: 1.6; max-width: 55ch; }
  .panel { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; padding: 2rem; margin: 2rem 0; }
  .panel h2 { color: #10b981; margin-bottom: 1rem; }
  .panel ul { list-style: none; padding: 0; }
  .panel li { color: rgba(245,245,220,0.8); padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .panel li:last-child { border-bottom: none; }
  .cta-row { display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap; }
  .btn { padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; text-decoration: none; transition: all 0.2s; }
  .btn-primary { background: #10b981; color: #000; }
  .btn-primary:hover { background: #059669; transform: translateY(-2px); }
  .btn-secondary { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #f5f5dc; }
  .btn-secondary:hover { border-color: #10b981; color: #10b981; }
</style>
"""

write(path, new_content)
print(f"Fixed: {path}")

# === guia-examen.astro - ADD country import ===
path = BASE / "guia-examen.astro"
content = read(path)

if "toRuntimeCountryConfig" not in content:
    old = "import { countryConfig } from '../config';"
    new = "import { countryConfig as defaultConfig, toRuntimeCountryConfig } from '../config';"
    content = content.replace(old, new)

    old2 = "const guideContent = getExamGuideContent(countryConfig);"
    new2 = """const country = Astro.locals.country ? toRuntimeCountryConfig(Astro.locals.country) : defaultConfig;
const guideContent = getExamGuideContent(country);"""
    content = content.replace(old2, new2)

write(path, content)
print(f"Fixed: {path}")

# === instituciones.astro - ADD country import ===
path = BASE / "instituciones.astro"
content = read(path)

if "toRuntimeCountryConfig" not in content:
    old = """---
import Layout from '../layouts/Layout.astro';
---"""
    new = """---
import Layout from '../layouts/Layout.astro';
import { countryConfig as defaultConfig, toRuntimeCountryConfig } from '../config';

const country = Astro.locals.country ? toRuntimeCountryConfig(Astro.locals.country) : defaultConfig;
---"""
    content = content.replace(old, new)

write(path, content)
print(f"Fixed: {path}")

# === ranking.astro - ADD country import ===
path = BASE / "ranking.astro"
content = read(path)

if "toRuntimeCountryConfig" not in content:
    old = """---
import Layout from '../../layouts/Layout.astro';
import { getCollection } from 'astro:content';
---"""
    new = """---
import Layout from '../../layouts/Layout.astro';
import { getCollection } from 'astro:content';
import { countryConfig as defaultConfig, toRuntimeCountryConfig } from '../config';

const country = Astro.locals.country ? toRuntimeCountryConfig(Astro.locals.country) : defaultConfig;
---"""
    content = content.replace(old, new)

write(path, content)
print(f"Fixed: {path}")

# === preparacion.astro - ADD country import ===
path = BASE / "preparacion.astro"
content = read(path)

if "toRuntimeCountryConfig" not in content:
    old = """---
import Layout from '../layouts/Layout.astro';
---"""
    new = """---
import Layout from '../layouts/Layout.astro';
import { countryConfig as defaultConfig, toRuntimeCountryConfig } from '../config';

const country = Astro.locals.country ? toRuntimeCountryConfig(Astro.locals.country) : defaultConfig;
---"""
    content = content.replace(old, new)

write(path, content)
print(f"Fixed: {path}")

# === normas-men.astro - ADD country import ===
path = BASE / "normas-men.astro"
content = read(path)

if "toRuntimeCountryConfig" not in content:
    old = """---
import Layout from '../layouts/Layout.astro';
---"""
    new = """---
import Layout from '../layouts/Layout.astro';
import { countryConfig as defaultConfig, toRuntimeCountryConfig } from '../config';

const country = Astro.locals.country ? toRuntimeCountryConfig(Astro.locals.country) : defaultConfig;
---"""
    content = content.replace(old, new)

write(path, content)
print(f"Fixed: {path}")

# === changelog.astro - ADD country import ===
path = BASE / "changelog.astro"
content = read(path)

if "toRuntimeCountryConfig" not in content:
    old = """---
import Layout from '../layouts/Layout.astro';
---"""
    new = """---
import Layout from '../layouts/Layout.astro';
import { countryConfig as defaultConfig, toRuntimeCountryConfig } from '../config';

const country = Astro.locals.country ? toRuntimeCountryConfig(Astro.locals.country) : defaultConfig;
---"""
    content = content.replace(old, new)

write(path, content)
print(f"Fixed: {path}")

print("\n=== Phase 1 complete ===")
print(
    "Pages updated: preguntas-icfes, pruebas-saber-gratis, guia-examen, instituciones, ranking, preparacion, normas-men, changelog"
)
