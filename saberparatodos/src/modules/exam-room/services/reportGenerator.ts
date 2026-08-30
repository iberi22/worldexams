/**
 * Report Generator Service
 * Genera reportes PDF/HTML con infografías usando Chart.js y jsPDF
 */




import type { RoomResults, PlayerStats } from '../types';

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
   * Genera planilla CSV / Excel descargable con UTF-8 BOM
   */
  exportResultsToCSV(results: RoomResults): Blob {
    const BOM = '\uFEFF'; // Para compatibilidad nativa con acentos en Excel
    const headers = [
      'Estudiante',
      'Puntaje',
      'Respuestas_Correctas',
      'Total_Preguntas',
      'Precision_Porcentaje',
      'Tiempo_Promedio_Segundos',
      'Nivel_Integridad',
      'Alertas_Sospechosas'
    ];

    const rows = (results.playerStats || []).map((p) => {
      const precision = p.totalQuestions > 0 ? Math.round((p.correctAnswers / p.totalQuestions) * 100) : 0;
      const avgTimeSec = Math.round(p.averageTimePerQuestion / 1000);
      const integrity = p.suspiciousEvents > 4 ? 'Alerta (Rojo)' : p.suspiciousEvents >= 2 ? 'Atención (Amarillo)' : 'Limpio (Verde)';
      
      return [
        `"${(p.playerName || 'Anónimo').replace(/"/g, '""')}"`,
        p.score,
        p.correctAnswers,
        p.totalQuestions,
        `${precision}%`,
        avgTimeSec,
        `"${integrity}"`,
        p.suspiciousEvents || 0
      ].join(',');
    });

    const csvContent = BOM + [headers.join(','), ...rows].join('\r\n');
    return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  }

  /**
   * Genera resumen pedagógico ejecutivo en Markdown (.md)
   */
  exportResultsToMarkdown(results: RoomResults): string {
    const total = results.totalPlayers || results.playerStats.length || 0;
    const avgScore = results.averageScore || 0;
    const sorted = [...(results.playerStats || [])].sort((a, b) => b.score - a.score);

    let md = `# 📊 Informe de Resultados: ${results.roomName || 'Sala de Examen'}\n\n`;
    md += `**Fecha:** ${new Date(results.generatedAt || Date.now()).toLocaleString()}\n`;
    md += `**Total Estudiantes:** ${total} | **Promedio del Grupo:** ${Math.round(avgScore)} pts\n\n`;
    md += `## 🏆 Tabla de Posiciones y Calificaciones\n\n`;
    md += `| Pos | Estudiante | Puntaje | Aciertos | Tiempo Prom. | Integridad |\n`;
    md += `|---|---|---|---|---|---|\n`;

    sorted.forEach((p, idx) => {
      const integrity = p.suspiciousEvents > 4 ? '🔴 Alerta' : p.suspiciousEvents >= 2 ? '🟡 Atención' : '🟢 Limpio';
      const avgTime = `${Math.round(p.averageTimePerQuestion / 1000)}s`;
      md += `| ${idx + 1} | ${p.playerName} | **${p.score}** | ${p.correctAnswers}/${p.totalQuestions} | ${avgTime} | ${integrity} |\n`;
    });

    if (results.questionStats && results.questionStats.length > 0) {
      md += `\n## 🔍 Preguntas con Mayor Tasa de Dificultad\n\n`;
      const hardest = [...results.questionStats].sort((a, b) => a.correctCount - b.correctCount).slice(0, 3);
      hardest.forEach((q, i) => {
        const totalAnswers = (q.correctCount || 0) + (q.incorrectCount || 0);
        const passRate = totalAnswers > 0 ? Math.round((q.correctCount / totalAnswers) * 100) : 0;
        md += `* **Pregunta #${q.questionId}**: ${passRate}% de aciertos (${q.correctCount}/${totalAnswers}).\n`;
      });
    }

    md += `\n---\n*Generado por SaberParaTodos / WorldExams — Plataforma Educativa Abierta*\n`;
    return md;
  }

  /**
   * Genera reporte HTML (preview en navegador)
   */
  private generateHTMLReport(results: RoomResults, options: ReportOptions): string {
    const chartHTML = options.includeCharts ? this.generateChartsHTML(results) : '';
    const recommendationsHTML = options.includeRecommendations
      ? this.generateRecommendationsHTML(results)
      : '';

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
