import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { getAuthorityGuidelines } from '../../src/config/authority-guidelines';

describe('Curriculum Subject Hub & Authority Guidelines', () => {
  it('returns authority guidelines for Colombia (CO)', () => {
    const co = getAuthorityGuidelines('CO');
    expect(co.authorityName).toContain('ICFES');
    expect(co.competencias.matematicas).toBeDefined();
    expect(co.competencias.matematicas.competencias.length).toBeGreaterThan(0);
  });

  it('returns authority guidelines for Mexico (MX)', () => {
    const mx = getAuthorityGuidelines('MX');
    expect(mx.authorityName).toContain('EXANI-II');
    expect(mx.competencias.matematicas).toBeDefined();
  });

  it('returns authority guidelines for Argentina (AR)', () => {
    const ar = getAuthorityGuidelines('AR');
    expect(ar.authorityName).toContain('APRENDER');
    expect(ar.competencias.matematica).toBeDefined();
    expect(ar.competencias.matematica.componentes).toContain('Número y Operaciones');
  });

  it('returns authority guidelines for Chile (CL)', () => {
    const cl = getAuthorityGuidelines('CL');
    expect(cl.authorityName).toContain('PAES');
    expect(cl.competencias.matematica).toBeDefined();
    expect(cl.competencias.matematica.competencias).toContain('Resolver problemas');
  });

  it('returns authority guidelines for Peru (PE)', () => {
    const pe = getAuthorityGuidelines('PE');
    expect(pe.authorityName).toContain('ECE');
    expect(pe.competencias.comunicacion).toBeDefined();
  });

  it('returns authority guidelines for Ecuador (EC)', () => {
    const ec = getAuthorityGuidelines('EC');
    expect(ec.authorityName).toContain('SENESCYT');
    expect(ec.competencias.matematica).toBeDefined();
    expect(ec.competencias.lengua).toBeDefined();
  });

  it('returns authority guidelines for Brasil (BR)', () => {
    const br = getAuthorityGuidelines('BR');
    expect(br.authorityName).toContain('ENEM');
    expect(br.competencias.matematica).toBeDefined();
    expect(br.competencias.portugues).toBeDefined();
    expect(br.competencias.ciencias).toBeDefined();
    expect(br.competencias.humanas).toBeDefined();
  });

  it('returns authority guidelines for Panamá (PA)', () => {
    const pa = getAuthorityGuidelines('PA');
    expect(pa.authorityName).toContain('MEDUCA');
    expect(pa.competencias.matematicas).toBeDefined();
    expect(pa.competencias.espanol).toBeDefined();
  });

  it('returns authority guidelines for Costa Rica (CR)', () => {
    const cr = getAuthorityGuidelines('CR');
    expect(cr.authorityName).toContain('MEP');
    expect(cr.competencias.matematica).toBeDefined();
    expect(cr.competencias.espanol).toBeDefined();
    expect(cr.competencias.ciencias).toBeDefined();
    expect(cr.competencias.sociales).toBeDefined();
  });

  it('returns authority guidelines for Guatemala (GT)', () => {
    const gt = getAuthorityGuidelines('GT');
    expect(gt.authorityName).toContain('MINEDUC');
    expect(gt.competencias.matematica).toBeDefined();
    expect(gt.competencias.lenguaje).toBeDefined();
  });

  it('returns authority guidelines for República Dominicana (DO)', () => {
    const doGuidelines = getAuthorityGuidelines('DO');
    expect(doGuidelines.authorityName).toContain('MINERD');
    expect(doGuidelines.competencias.matematica).toBeDefined();
    expect(doGuidelines.competencias['lengua-espanola']).toBeDefined();
    expect(doGuidelines.competencias['ciencias-naturaleza']).toBeDefined();
    expect(doGuidelines.competencias['ciencias-sociales']).toBeDefined();
  });

  it('returns safe fallback for unconfigured country codes', () => {
    const fallback = getAuthorityGuidelines('ZZ' as any);
    expect(fallback.authorityName).toBe('Autoridad Educativa Local');
    expect(fallback.badgeLabel).toBeDefined();
    expect(fallback.competencias).toEqual({});
  });
});

describe('SubjectHubView.svelte Component Verification', () => {
  const hubPath = path.join(__dirname, '../../src/components/preguntas/SubjectHubView.svelte');

  it('component file exists in src/components/preguntas/', () => {
    expect(fs.existsSync(hubPath)).toBe(true);
  });

  it('uses Svelte 5 runes ($props, $state, $derived)', () => {
    const code = fs.readFileSync(hubPath, 'utf8');
    expect(code).toContain('$props()');
    expect(code).toContain('$state');
    expect(code).toContain('$derived');
  });

  it('supports Student Mode and Teacher Mode role perspective switcher', () => {
    const code = fs.readFileSync(hubPath, 'utf8');
    expect(code).toContain('Para Estudiantes');
    expect(code).toContain('Para Profesores');
    expect(code).toContain("activeRole = 'student'");
    expect(code).toContain("activeRole = 'teacher'");
  });

  it('renders concept maps, common misconceptions, and weekly bundles in Student Mode', () => {
    const code = fs.readFileSync(hubPath, 'utf8');
    expect(code).toContain('Mapa de Conceptos Evaluados');
    expect(code).toContain('Errores Comunes Frecuentes');
    expect(code).toContain('BundleList');
  });

  it('renders authority competency matrix and embeds TeacherToolkit in Teacher Mode', () => {
    const code = fs.readFileSync(hubPath, 'utf8');
    expect(code).toContain('Matriz de Competencias Curriculares');
    expect(code).toContain('TeacherToolkit');
    expect(code).toContain('initialSubject={subjectName}');
    expect(code).toContain('initialGrade={gradeNum || 11}');
  });

  it('includes explicit type="button" attributes on interactive buttons', () => {
    const code = fs.readFileSync(hubPath, 'utf8');
    const buttonMatches = code.match(/<button[^>]*>/g) || [];
    expect(buttonMatches.length).toBeGreaterThan(0);
    for (const btnTag of buttonMatches) {
      expect(btnTag).toContain('type="button"');
    }
  });
});

describe('Subject Index Page Breadcrumb Structure Verification', () => {
  const pagePath = path.join(__dirname, '../../src/pages/preguntas/[country]/[grade]/[subject]/index.astro');

  it('page file exists in src/pages/preguntas/[country]/[grade]/[subject]/', () => {
    expect(fs.existsSync(pagePath)).toBe(true);
  });

  it('implements breadcrumb navigation matching Inicio > [País] > Grado [N]° > [Asignatura]', () => {
    const code = fs.readFileSync(pagePath, 'utf8');
    expect(code).toContain('nav aria-label="breadcrumb"');
    expect(code).toContain('href="/"');
    expect(code).toContain('href={`/preguntas/${country}/`}');
    expect(code).toContain('href={`/preguntas/${country}/${grade}/`}');
    expect(code).toContain('{subjectName}');
  });

  it('mounts SubjectHubView client-side component with full metadata', () => {
    const code = fs.readFileSync(pagePath, 'utf8');
    expect(code).toContain('SubjectHubView');
    expect(code).toContain('client:load');
    expect(code).toContain('countryCode={country}');
    expect(code).toContain('gradeSlug={grade}');
    expect(code).toContain('subjectSlug={subject}');
  });
});
