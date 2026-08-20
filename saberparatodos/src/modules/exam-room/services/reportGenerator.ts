/**
 * Report Generator Service
 * Genera reportes PDF/HTML con infografías usando Chart.js y jsPDF
 */




import type { RoomResults, PlayerStats, IntegrityReport } from '../types';
import { calculateIntegrityReport } from '../../../lib/anti-cheat/behavior-analysis';

interface ReportOptions {
  format: 'pdf' | 'html';
  includeCharts: boolean;
  includeRecommendations: boolean;
}

class ReportGeneratorService {
  /**
   * Genera un reporte completo de la party
   */
  async generateFullReport(
    results: RoomResults,
    options: ReportOptions = {
      format: 'pdf',
      includeCharts: true,
      includeRecommendations: true,
    }
  ): Promise<Blob | string> {
    if (options.format === 'html') {
      return this.generateHTMLReport(results, options);
    } else {
      return this.generatePDFReport(results, options);
    }
  }

  /**
   * Genera reporte individual para un jugador
   */
  async generatePlayerReport(
    results: RoomResults,
    playerId: string,
    options: ReportOptions = { format: 'pdf', includeCharts: true, includeRecommendations: true }
  ): Promise<Blob | string> {
    const playerStats = results.playerStats.find((s: any) => s.playerId === playerId);
    if (!playerStats) {
      throw new Error('Player not found in results');
    }

    const playerResults: RoomResults = {
      ...results,
      playerStats: [playerStats],
    };

    return this.generateFullReport(playerResults, options);
  }

  /**
   * Genera reporte HTML (preview en navegador)
   */
  private generateHTMLReport(results: RoomResults, options: ReportOptions): string {
    const chartHTML = options.includeCharts ? this.generateChartsHTML(results) : '';
    const recommendationsHTML = options.includeRecommendations
      ? this.generateRecommendationsHTML(results)
      : '';
    const integrityHTML = this.generateIntegrityHTML(results);

    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reporte - ${results.roomName}</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #333;
      padding: 2rem;
    }
    .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 16px; padding: 3rem; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
    h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #667eea; }
    h2 { font-size: 1.8rem; margin: 2rem 0 1rem; color: #764ba2; border-bottom: 3px solid #667eea; padding-bottom: 0.5rem; }
    .header { text-align: center; margin-bottom: 3rem; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin: 2rem 0; }
    .stat-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 12px; text-align: center; }
    .stat-value { font-size: 3rem; font-weight: bold; }
    .stat-label { font-size: 0.9rem; opacity: 0.9; margin-top: 0.5rem; }
    .player-list { margin: 2rem 0; }
    .player-item { display: flex; justify-content: space-between; padding: 1rem; margin: 0.5rem 0; background: #f7fafc; border-radius: 8px; border-left: 4px solid #667eea; }
    .chart-container { margin: 2rem 0; max-width: 600px; margin-left: auto; margin-right: auto; }
    .recommendation { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 1rem 0; border-radius: 8px; }
    .footer { text-align: center; margin-top: 3rem; color: #64748b; font-size: 0.9rem; }
    @media print {
      body { background: white; padding: 0; }
      .container { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎓 Reporte de Examen</h1>
      <p style="font-size: 1.2rem; color: #64748b;">${results.roomName}</p>
      <p style="color: #94a3b8; margin-top: 0.5rem;">Generado el ${new Date(results.generatedAt).toLocaleDateString('es-CO', { dateStyle: 'long' })}</p>
    </div>

    <h2>📊 Estadísticas Generales</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${results.totalPlayers}</div>
        <div class="stat-label">Participantes</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${results.completedPlayers}</div>
        <div class="stat-label">Completaron</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${Math.round(results.averageScore)}</div>
        <div class="stat-label">Promedio</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${Math.round(results.averageTime / 1000)}s</div>
        <div class="stat-label">Tiempo Promedio</div>
      </div>
    </div>

    ${chartHTML}

    ${integrityHTML}

    <h2>👥 Ranking de Participantes</h2>
    <div class="player-list">
      ${results.playerStats
        .sort((a: any, b: any) => b.score - a.score)
        .map(
          (player: any, index: number) => `
        <div class="player-item">
          <div>
            <strong>${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`} ${player.playerName}</strong>
            <p style="font-size: 0.9rem; color: #64748b; margin-top: 0.25rem;">
              ${player.correctAnswers}/${player.totalQuestions} correctas •
              Promedio: ${Math.round(player.averageTimePerQuestion / 1000)}s
              ${player.suspiciousEvents > 0 ? `<span style="color: #ef4444;">⚠️ ${player.suspiciousEvents} eventos sospechosos</span>` : ''}
            </p>
          </div>
          <div style="font-size: 2rem; font-weight: bold; color: ${this.getScoreColor(player.score)};">
            ${player.score}
          </div>
        </div>
      `
        )
        .join('')}
    </div>

    ${recommendationsHTML}

    <div class="footer">
      <p>© ${new Date().getFullYear()} Saber Para Todos • Generado automáticamente</p>
    </div>
  </div>

  ${options.includeCharts ? this.generateChartScripts(results) : ''}
</body>
</html>
    `.trim();
  }

  /**
   * Genera el HTML de las gráficas
   */
  private generateChartsHTML(_results: RoomResults): string {
    return `
    <h2>📈 Análisis Visual</h2>
    <div class="chart-container">
      <canvas id="scoreDistributionChart"></canvas>
    </div>
    <div class="chart-container">
      <canvas id="timeDistributionChart"></canvas>
    </div>
    <div class="chart-container">
      <canvas id="questionDifficultyChart"></canvas>
    </div>
    `;
  }

  /**
   * Genera scripts para renderizar gráficas con Chart.js
   */
  private generateChartScripts(results: RoomResults): string {
    const scores = results.playerStats.map((p: PlayerStats) => p.score);
    const times = results.playerStats.map((p: PlayerStats) => p.averageTimePerQuestion / 1000);
    const questionCorrectness = results.questionStats.map(
      (q: any) => (q.correctCount / (q.correctCount + q.incorrectCount)) * 100
    );

    return `
    <script>
      // Score Distribution
      new Chart(document.getElementById('scoreDistributionChart'), {
        type: 'bar',
        data: {
          labels: ${JSON.stringify(results.playerStats.map((p: any) => p.playerName))},
          datasets: [{
            label: 'Puntaje',
            data: ${JSON.stringify(scores)},
            backgroundColor: 'rgba(102, 126, 234, 0.8)',
            borderColor: 'rgba(102, 126, 234, 1)',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: 'Distribución de Puntajes', font: { size: 18 } },
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true, max: 100 }
          }
        }
      });

      // Time Distribution
      new Chart(document.getElementById('timeDistributionChart'), {
        type: 'line',
        data: {
          labels: ${JSON.stringify(results.playerStats.map((p: any) => p.playerName))},
          datasets: [{
            label: 'Tiempo Promedio (s)',
            data: ${JSON.stringify(times)},
            backgroundColor: 'rgba(118, 75, 162, 0.2)',
            borderColor: 'rgba(118, 75, 162, 1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: 'Tiempo Promedio por Pregunta', font: { size: 18 } }
          }
        }
      });

      // Question Difficulty
      new Chart(document.getElementById('questionDifficultyChart'), {
        type: 'bar',
        data: {
          labels: ${JSON.stringify(results.questionStats.map((_: any, i: number) => `P${i + 1}`))},
          datasets: [{
            label: '% de Aciertos',
            data: ${JSON.stringify(questionCorrectness)},
            backgroundColor: ${JSON.stringify(questionCorrectness.map((p: any) => (p >= 70 ? 'rgba(34, 197, 94, 0.8)' : p >= 50 ? 'rgba(251, 191, 36, 0.8)' : 'rgba(239, 68, 68, 0.8)')))},
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: 'Dificultad Percibida por Pregunta', font: { size: 18 } },
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true, max: 100 }
          }
        }
      });
    </script>
    `;
  }

  /**
   * Genera recomendaciones personalizadas
   */
  private generateRecommendationsHTML(results: RoomResults): string {
    return `
    <h2>💡 Recomendaciones Personalizadas</h2>
    ${results.playerStats
      .map(
        (player: any) => `
      <div class="recommendation">
        <strong>${player.playerName}</strong>
        <p style="margin-top: 0.75rem;">${player.recommendation}</p>
      </div>
    `
      )
      .join('')}
    `;
  }

  /**
   * Genera reporte PDF real con jsPDF (dependencia ya instalada).
   * Construye el documento desde los datos del reporte (no depende del DOM),
   * y cae al HTML como fallback si jsPDF falla (p. ej. entorno sin canvas).
   */
  private async generatePDFReport(
    results: RoomResults,
    options: ReportOptions
  ): Promise<Blob> {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 48;
      let y = margin;

      const ensureSpace = (needed: number) => {
        if (y + needed > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
      };
      const writeWrapped = (text: string, lineHeight: number, size = 11) => {
        doc.setFontSize(size);
        const lines = doc.splitTextToSize(text, pageWidth - margin * 2) as string[];
        for (const line of lines) {
          ensureSpace(lineHeight);
          doc.text(line, margin, y);
          y += lineHeight;
        }
      };

      // Header
      doc.setFontSize(24);
      doc.text('Reporte de Examen', margin, y);
      y += 26;
      doc.setFontSize(14);
      doc.text(String(results.roomName || ''), margin, y);
      y += 18;
      doc.setFontSize(10);
      doc.text(
        `Generado el ${new Date(results.generatedAt).toLocaleDateString('es-CO', { dateStyle: 'long' })}`,
        margin,
        y
      );
      y += 30;

      // General stats
      doc.setFontSize(16);
      doc.text('Estadísticas Generales', margin, y);
      y += 20;
      doc.setFontSize(11);
      const stats: [string, string][] = [
        ['Participantes', String(results.totalPlayers)],
        ['Completaron', String(results.completedPlayers)],
        ['Promedio', String(Math.round(results.averageScore))],
        ['Tiempo promedio', `${Math.round(results.averageTime / 1000)}s`],
      ];
      for (const [label, value] of stats) {
        ensureSpace(16);
        doc.text(`${label}: ${value}`, margin, y);
        y += 16;
      }
      y += 14;

      // Integrity Report Section in PDF
      doc.setFontSize(16);
      ensureSpace(24);
      doc.text('Reporte de Integridad del Examen', margin, y);
      y += 20;

      for (const player of results.playerStats) {
        const report = player.integrityReport || calculateIntegrityReport([], [], player.playerId, player.playerName);
        ensureSpace(40);
        doc.setFontSize(12);
        doc.text(`${player.playerName} — Integrity Score: ${report.score}/100 [${report.status.toUpperCase()}]`, margin, y);
        y += 14;
        doc.setFontSize(10);
        doc.text(
          `Copiar/Pegar: ${report.summary.copyPasteCount} • Clic derecho: ${report.summary.rightClickCount} • DevTools: ${report.summary.devtoolsCount} • Tab Switch: ${report.summary.tabSwitchCount}`,
          margin + 12,
          y
        );
        y += 16;

        if (report.timeline.length > 0) {
          for (const evt of report.timeline) {
            ensureSpace(14);
            const timeStr = new Date(evt.timestamp).toLocaleTimeString('es-CO');
            doc.text(` - [${timeStr}] ${evt.type}: ${evt.description} (-${evt.penalty} pts)`, margin + 20, y);
            y += 14;
          }
        } else {
          ensureSpace(14);
          doc.text(' - Sin eventos sospechosos (100% Integridad)', margin + 20, y);
          y += 14;
        }
        y += 8;
      }
      y += 10;

      // Ranking
      doc.setFontSize(16);
      ensureSpace(24);
      doc.text('Ranking de Participantes', margin, y);
      y += 20;
      const sorted = [...results.playerStats].sort((a: any, b: any) => b.score - a.score);
      sorted.forEach((player: any, index: number) => {
        ensureSpace(34);
        doc.setFontSize(12);
        doc.text(`#${index + 1} ${player.playerName} — ${player.score} pts`, margin, y);
        y += 14;
        doc.setFontSize(10);
        const suspicious =
          player.suspiciousEvents > 0 ? ` • ⚠ ${player.suspiciousEvents} eventos sospechosos` : '';
        doc.text(
          `${player.correctAnswers}/${player.totalQuestions} correctas • Promedio: ${Math.round(player.averageTimePerQuestion / 1000)}s${suspicious}`,
          margin + 12,
          y
        );
        y += 18;
      });
      y += 10;

      // Recommendations
      if (options.includeRecommendations) {
        doc.setFontSize(16);
        ensureSpace(24);
        doc.text('Recomendaciones Personalizadas', margin, y);
        y += 22;
        for (const player of sorted as any[]) {
          ensureSpace(20);
          doc.setFontSize(12);
          doc.text(String(player.playerName), margin, y);
          y += 15;
          writeWrapped(String(player.recommendation || ''), 14, 10);
          y += 10;
        }
      }

      // Footer
      ensureSpace(20);
      doc.setFontSize(9);
      doc.text(
        `© ${new Date().getFullYear()} Saber Para Todos • Generado automáticamente`,
        margin,
        y
      );

      return doc.output('blob');
    } catch (err) {
      console.warn('[ReportGenerator] PDF generation failed, falling back to HTML:', err);
      const html = this.generateHTMLReport(results, options);
      return new Blob([html], { type: 'text/html' });
    }
  }

  /**
   * Descarga el reporte como archivo
   */
  downloadReport(blob: Blob | string, filename: string, format: 'pdf' | 'html'): void {
    const blobObj = typeof blob === 'string' ? new Blob([blob], { type: 'text/html' }) : blob;
    const url = URL.createObjectURL(blobObj);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Genera HTML para el reporte de integridad
   */
  private generateIntegrityHTML(results: RoomResults): string {
    const reports: { player: PlayerStats; report: IntegrityReport }[] = results.playerStats.map(player => {
      const report = player.integrityReport || calculateIntegrityReport([], [], player.playerId, player.playerName);
      return { player, report };
    });

    if (reports.length === 0) return '';

    return `
    <h2>🛡️ Reporte de Integridad</h2>
    <div style="margin: 1.5rem 0;">
      ${reports
        .map(({ player, report }) => {
          const statusBadgeColor =
            report.status === 'clean' ? '#22c55e' : report.status === 'suspicious' ? '#eab308' : '#ef4444';
          const statusLabel =
            report.status === 'clean' ? 'Limpio' : report.status === 'suspicious' ? 'Sospechoso' : 'Marcado';

          const timelineRows = report.timeline.length > 0
            ? report.timeline
                .map(
                  evt => `
              <tr>
                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-size: 0.85rem;">
                  ${new Date(evt.timestamp).toLocaleTimeString('es-CO')}
                </td>
                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-size: 0.85rem;">
                  <strong>${evt.type}</strong>
                </td>
                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-size: 0.85rem;">
                  ${evt.description}
                </td>
                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-size: 0.85rem; color: ${evt.severity === 'high' ? '#ef4444' : evt.severity === 'medium' ? '#eab308' : '#64748b'};">
                  ${evt.severity.toUpperCase()} (-${evt.penalty} pts)
                </td>
              </tr>
            `
                )
                .join('')
            : `<tr><td colspan="4" style="padding: 0.75rem; text-align: center; color: #22c55e;">Sin eventos sospechosos registrados (Integridad Perfecta)</td></tr>`;

          return `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <div>
                <strong style="font-size: 1.2rem; color: #1e293b;">${player.playerName}</strong>
                <span style="display: inline-block; margin-left: 0.5rem; padding: 0.25rem 0.75rem; border-radius: 9999px; background: ${statusBadgeColor}; color: white; font-size: 0.8rem; font-weight: bold;">
                  ${statusLabel}
                </span>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 1.8rem; font-weight: bold; color: ${statusBadgeColor};">${report.score}/100</span>
                <p style="font-size: 0.8rem; color: #64748b; margin-top: -0.2rem;">Score de Integridad</p>
              </div>
            </div>

            <!-- Summary Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.75rem; margin-bottom: 1rem; text-align: center;">
              <div style="background: white; padding: 0.5rem; border-radius: 8px; border: 1px solid #cbd5e1;">
                <div style="font-size: 1.2rem; font-weight: bold;">${report.summary.copyPasteCount}</div>
                <div style="font-size: 0.75rem; color: #64748b;">Copiar/Pegar</div>
              </div>
              <div style="background: white; padding: 0.5rem; border-radius: 8px; border: 1px solid #cbd5e1;">
                <div style="font-size: 1.2rem; font-weight: bold;">${report.summary.rightClickCount}</div>
                <div style="font-size: 0.75rem; color: #64748b;">Clic Derecho</div>
              </div>
              <div style="background: white; padding: 0.5rem; border-radius: 8px; border: 1px solid #cbd5e1;">
                <div style="font-size: 1.2rem; font-weight: bold;">${report.summary.devtoolsCount}</div>
                <div style="font-size: 0.75rem; color: #64748b;">DevTools</div>
              </div>
              <div style="background: white; padding: 0.5rem; border-radius: 8px; border: 1px solid #cbd5e1;">
                <div style="font-size: 1.2rem; font-weight: bold;">${report.summary.tabSwitchCount}</div>
                <div style="font-size: 0.75rem; color: #64748b;">Cambio de Tab</div>
              </div>
            </div>

            ${
              report.summary.patternFlags.length > 0
                ? `<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 0.5rem 1rem; margin-bottom: 1rem; font-size: 0.85rem; color: #991b1b;">
                    ⚠️ Alert de Patrón: ${report.summary.patternFlags.join(', ')}
                   </div>`
                : ''
            }

            <table style="width: 100%; border-collapse: collapse; margin-top: 0.5rem; text-align: left;">
              <thead>
                <tr style="background: #e2e8f0; font-size: 0.8rem; color: #475569;">
                  <th style="padding: 0.5rem;">Hora</th>
                  <th style="padding: 0.5rem;">Tipo</th>
                  <th style="padding: 0.5rem;">Descripción</th>
                  <th style="padding: 0.5rem;">Severidad</th>
                </tr>
              </thead>
              <tbody>
                ${timelineRows}
              </tbody>
            </table>
          </div>
        `;
        })
        .join('')}
    </div>
    `;
  }

  /**
   * Helper: Obtiene color según puntaje
   */
  private getScoreColor(score: number): string {
    if (score >= 80) return '#22c55e'; // green
    if (score >= 60) return '#eab308'; // yellow
    return '#ef4444'; // red
  }
}

// Singleton
export const reportGeneratorService = new ReportGeneratorService();
