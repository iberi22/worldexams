import { describe, expect, it } from 'vitest';
import { icfesExamGuideLinks } from '../../src/config/exam-guide-links';

describe('Icfes exam guide links', () => {
  it('does not keep the legacy broken Saber 11 guide path', () => {
    const legacyPath = 'https://www.icfes.gov.co/evaluaciones-icfes/saber-11/guia-de-orientacion-examen-saber-11/';

    expect(icfesExamGuideLinks.map((link) => link.href)).not.toContain(legacyPath);
  });

  it('keeps current ICFES guide destinations', () => {
    expect(icfesExamGuideLinks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          href: 'https://www.icfes.gov.co/analisis-de-datos/',
        }),
        expect.objectContaining({
          href: 'https://www.icfes.gov.co/wp-content/uploads/2025/05/marco-metodologico-de-la-operacion-estadistica.pdf',
        }),
        expect.objectContaining({
          href: 'https://www.icfes.gov.co/wp-content/uploads/2024/11/FICHA_METODOLOGICA_OE.pdf',
        }),
        expect.objectContaining({
          href: 'https://www.icfes.gov.co/wp-content/uploads/2024/11/Guia-de-interpretacion-de-resultados-02052022.pdf',
        }),
      ]),
    );
  });
});
