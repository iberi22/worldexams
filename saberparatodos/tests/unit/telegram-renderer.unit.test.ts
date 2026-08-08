import { describe, it, expect } from 'vitest';
import { TelegramRenderer } from '../../../src/lib/telegram-renderer';

describe('TelegramRenderer Unit Tests', () => {
  const renderer = new TelegramRenderer();

  it('should render table headers and rows as valid HTML', () => {
    const headers = ['Tema', 'Preguntas', 'Estado'];
    const rows = [
      ['Matemáticas', '10', 'Completo'],
      ['Ciencias', '5', 'En progreso'],
    ];

    const html = renderer.renderTable(headers, rows, { title: 'Test Report', theme: 'light' });

    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Test Report');
    expect(html).toContain('Matemáticas');
    expect(html).toContain('En progreso');
    expect(html).toContain('<table');
    expect(html).toContain('Tema</th>');
    expect(html).toContain('Completo</td>');
  });

  it('should support dark theme rendering', () => {
    const html = renderer.renderTable(['Col'], [['Val']], { theme: 'dark' });
    expect(html).toContain('background: #1a1a2e');
    expect(html).toContain('color: #ffffff');
  });

  it('should render status badges with correct colors', () => {
    const successBadge = renderer.renderBadge('OK', 'success');
    expect(successBadge).toContain('background:#4CAF50');
    expect(successBadge).toContain('color:white');
    expect(successBadge).toContain('OK');

    const errorBadge = renderer.renderBadge('FAIL', 'error');
    expect(errorBadge).toContain('background:#F44336');
    expect(errorBadge).toContain('FAIL');
  });

  it('should render progress bar with correct percentage and colors', () => {
    const progressGood = renderer.renderProgress(80, 100);
    expect(progressGood).toContain('80%');
    expect(progressGood).toContain('background:#4CAF50'); // green for >= 70

    const progressWarn = renderer.renderProgress(50, 100);
    expect(progressWarn).toContain('50%');
    expect(progressWarn).toContain('background:#FF9800'); // orange for >= 40

    const progressBad = renderer.renderProgress(20, 100);
    expect(progressBad).toContain('20%');
    expect(progressBad).toContain('background:#F44336'); // red for < 40
  });

  it('should render cards with or without action buttons', () => {
    const cardNoActions = renderer.renderCard('No Actions', 'Some body content');
    expect(cardNoActions).toContain('No Actions');
    expect(cardNoActions).toContain('Some body content');
    expect(cardNoActions).not.toContain('<a href=');

    const cardWithActions = renderer.renderCard('With Actions', 'Some body content', [
      { label: 'Click Me', url: 'https://example.com' },
    ]);
    expect(cardWithActions).toContain('With Actions');
    expect(cardWithActions).toContain('<a href="https://example.com"');
    expect(cardWithActions).toContain('Click Me');
  });

  it('should generate a base64 encoded data URL preview', () => {
    const previewUrl = renderer.getPreviewUrl('<h2>Hello World</h2>');
    expect(previewUrl.startsWith('data:text/html;base64,')).toBe(true);

    const base64Data = previewUrl.replace('data:text/html;base64,', '');
    const decoded = Buffer.from(base64Data, 'base64').toString('utf-8');
    expect(decoded).toContain('<h2>Hello World</h2>');
  });
});
