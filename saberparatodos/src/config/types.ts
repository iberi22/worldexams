export interface ExamDefinition {
  grado: number | string;
  asignaturas: string[];
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  bgDark: string;
  bgCard: string;
}

export interface CulturalContext {
  ciudades: string[];
  moneda: string;
  simboloMoneda: string;
  personajes: string[];
  comidas: string[];
  fiestas: string[];
}

export interface CountryConfig {
  code: string;
  name: string;
  domain: string;
  language: string;
  currency: string;
  exams: Record<string, ExamDefinition>;
  gradeNames?: Record<number, string>;
  subjectAliases?: Record<string, string>;
  theme: ThemeConfig;
  cultural: CulturalContext;
  institucion?: string;
  features?: {
    blog?: boolean;
    [key: string]: boolean | undefined;
  };
  giscus?: {
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
  };
}
