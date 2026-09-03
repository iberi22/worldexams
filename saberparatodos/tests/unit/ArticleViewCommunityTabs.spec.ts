import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

describe('ArticleView and BlogView Native Discussion & Correction Integration', () => {
  const articleCode = fs.readFileSync('src/components/ArticleView.svelte', 'utf8');
  const blogCode = fs.readFileSync('src/components/BlogView.svelte', 'utf8');

  describe('ArticleView Tab Selector and Native Integration', () => {
    it('imports ThreadedExplanation and CorrectionThread components', () => {
      expect(articleCode).toContain("import ThreadedExplanation from './community/ThreadedExplanation.svelte'");
      expect(articleCode).toContain("import CorrectionThread from './corrections/CorrectionThread.svelte'");
    });

    it('defines tab selector buttons for official explanation, community debate, and proposing corrections', () => {
      expect(articleCode).toContain('data-testid="tab-official"');
      expect(articleCode).toContain('data-testid="tab-community"');
      expect(articleCode).toContain('data-testid="tab-correction"');
      expect(articleCode).toContain('💡 Explicación Oficial');
      expect(articleCode).toContain('💬 Debate Comunitario');
      expect(articleCode).toContain('🛠️ Proponer Corrección');
    });

    it('mounts ThreadedExplanation component in Tab 2 with questionId', () => {
      expect(articleCode).toContain('<ThreadedExplanation');
      expect(articleCode).toContain('questionId={String(question.id)}');
      expect(articleCode).toContain('explanationId={`exp-${question.id}`}');
    });

    it('mounts CorrectionThread component in Tab 3 with initialQuestionId and bundle path', () => {
      expect(articleCode).toContain('<CorrectionThread');
      expect(articleCode).toContain('initialQuestionId={String(question.id)}');
      expect(articleCode).toContain('initialBundlePath=');
    });
  });

  describe('BlogView Question Cards and Modal Integration', () => {
    it('imports ThreadedExplanation and CorrectionThread components', () => {
      expect(blogCode).toContain("import ThreadedExplanation from './community/ThreadedExplanation.svelte'");
      expect(blogCode).toContain("import CorrectionThread from './corrections/CorrectionThread.svelte'");
    });

    it('renders contributions badge and "Debatir en Comunidad" CTA button on question cards', () => {
      expect(blogCode).toContain('data-testid="badge-contributions"');
      expect(blogCode).toContain('aportes');
      expect(blogCode).toContain('data-testid="btn-debatir-comunidad"');
      expect(blogCode).toContain('Debatir en Comunidad');
    });

    it('renders modal tabs selector for viewing details and discussions inside the modal', () => {
      expect(blogCode).toContain('data-testid="modal-tabs"');
      expect(blogCode).toContain('data-testid="modal-tab-official"');
      expect(blogCode).toContain('data-testid="modal-tab-community"');
      expect(blogCode).toContain('data-testid="modal-tab-correction"');
      expect(blogCode).toContain('<ThreadedExplanation');
      expect(blogCode).toContain('<CorrectionThread');
    });
  });
});
