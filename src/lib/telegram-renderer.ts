/**
 * Telegram Renderer Service
 * Renders responses as interactive HTML for Telegram web preview
 */

export interface RenderOptions {
  title?: string;
  theme?: 'light' | 'dark';
  compact?: boolean;
}

export class TelegramRenderer {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://preview.saberparatodos.space') {
    this.baseUrl = baseUrl;
  }

  /**
   * Render a table as HTML for preview
   */
  renderTable(headers: string[], rows: string[][], options?: RenderOptions): string {
    const table = `
      <table style="width:100%;border-collapse:collapse;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
        <thead>
          <tr style="background:#f5f5f5;">
            ${headers.map(h => `<th style="padding:8px;border:1px solid #ddd;text-align:left;">${h}</th>`).join('')}
        </thead>
        <tbody>
          ${rows.map(row => `
            <tr>
              ${row.map(cell => `<td style="padding:8px;border:1px solid #ddd;">${cell}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    return this.wrapInHTML(table, options);
  }

  /**
   * Render a status badge
   */
  renderBadge(text: string, type: 'success' | 'warning' | 'error' | 'info'): string {
    const colors = {
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3',
    };

    return `<span style="background:${colors[type]};color:white;padding:2px 8px;border-radius:4px;font-size:12px;">${text}</span>`;
  }

  /**
   * Render a progress bar
   */
  renderProgress(value: number, max: number = 100): string {
    const percent = Math.min(100, Math.max(0, (value / max) * 100));
    const color = percent >= 70 ? '#4CAF50' : percent >= 40 ? '#FF9800' : '#F44336';

    return `
      <div style="background:#eee;border-radius:4px;height:20px;width:100%;">
        <div style="background:${color};height:100%;width:${percent}%;border-radius:4px;text-align:center;color:white;font-size:12px;">
          ${Math.round(percent)}%
        </div>
      </div>
    `;
  }

  /**
   * Render a card
   */
  renderCard(title: string, content: string, actions?: { label: string; url: string }[]): string {
    return `
      <div style="background:white;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);padding:16px;margin:8px 0;">
        <h3 style="margin:0 0 8px 0;font-size:16px;">${title}</h3>
        <p style="margin:0;color:#666;">${content}</p>
        ${actions ? `
          <div style="margin-top:12px;">
            ${actions.map(a => `
              <a href="${a.url}" style="display:inline-block;background:#007bff;color:white;padding:8px 16px;border-radius:4px;text-decoration:none;margin-right:8px;">${a.label}</a>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Wrap content in HTML template
   */
  private wrapInHTML(content: string, options?: RenderOptions): string {
    const bg = options?.theme === 'dark' ? '#1a1a2e' : '#ffffff';
    const text = options?.theme === 'dark' ? '#ffffff' : '#333333';

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${options?.title || 'SWAL Labs'}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: ${bg}; color: ${text}; margin: 0; padding: 16px; }
    .container { max-width: 600px; margin: 0 auto; }
  </style>
</head>
<body>
  <div class="container">
    ${content}
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Generate a preview URL for Telegram
   */
  getPreviewUrl(content: string): string {
    // In production, this would save to a temporary URL
    // For now, return a data URL
    const html = this.wrapInHTML(content);
    return `data:text/html;base64,${Buffer.from(html).toString('base64')}`;
  }
}

export const telegramRenderer = new TelegramRenderer();
