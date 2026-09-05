import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, unmount } from 'svelte';
import SharedContextLayout from '../../src/components/SharedContextLayout.svelte';

describe('SharedContextLayout.svelte - Context Threshold Logic', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container && container.parentNode) {
      document.body.removeChild(container);
    }
  });

  it('renders short context (<140 chars, single line) inline without split pane or mobile drawer button', async () => {
    const shortText = 'Discussing innovation & startups in Medellín.';
    expect(shortText.length).toBeLessThan(140);
    expect(shortText.includes('\n')).toBe(false);

    const component = mount(SharedContextLayout, {
      target: container,
      props: { context: shortText }
    });

    await new Promise(r => setTimeout(r, 50));

    // Inline badge should be present
    const inlineBadge = container.querySelector('[data-testid="inline-context"]');
    expect(inlineBadge).not.toBeNull();
    expect(inlineBadge?.textContent).toContain('Discussing innovation & startups in Medellín.');

    // Desktop split panel ("Panel de Lectura") should NOT be present
    const html = container.innerHTML;
    expect(html).not.toContain('Panel de Lectura');

    // Mobile floating button ("Ver Lectura") should NOT be present
    expect(html).not.toContain('Ver Lectura');

    unmount(component);
  });

  it('renders long context (>=140 chars) with split panel and mobile floating button', async () => {
    const longText = 'A'.repeat(145);
    expect(longText.length).toBeGreaterThanOrEqual(140);

    const component = mount(SharedContextLayout, {
      target: container,
      props: { context: longText }
    });

    await new Promise(r => setTimeout(r, 50));

    // Inline badge should NOT be present
    const inlineBadge = container.querySelector('[data-testid="inline-context"]');
    expect(inlineBadge).toBeNull();

    // Desktop split panel & mobile trigger should be present
    const html = container.innerHTML;
    expect(html).toContain('Panel de Lectura');
    expect(html).toContain('Ver Lectura');

    unmount(component);
  });

  it('renders multiline context (<140 chars with newline) with split panel and mobile floating button', async () => {
    const multilineText = 'Short line 1\nShort line 2';
    expect(multilineText.length).toBeLessThan(140);
    expect(multilineText.includes('\n')).toBe(true);

    const component = mount(SharedContextLayout, {
      target: container,
      props: { context: multilineText }
    });

    await new Promise(r => setTimeout(r, 50));

    // Inline badge should NOT be present
    const inlineBadge = container.querySelector('[data-testid="inline-context"]');
    expect(inlineBadge).toBeNull();

    // Split panel & mobile trigger should be present
    const html = container.innerHTML;
    expect(html).toContain('Panel de Lectura');
    expect(html).toContain('Ver Lectura');

    unmount(component);
  });

  it('renders standard fallback when context is empty or whitespace', async () => {
    const component = mount(SharedContextLayout, {
      target: container,
      props: { context: '   ' }
    });

    await new Promise(r => setTimeout(r, 50));

    const inlineBadge = container.querySelector('[data-testid="inline-context"]');
    expect(inlineBadge).toBeNull();

    const html = container.innerHTML;
    expect(html).not.toContain('Panel de Lectura');
    expect(html).not.toContain('Ver Lectura');

    unmount(component);
  });
});
