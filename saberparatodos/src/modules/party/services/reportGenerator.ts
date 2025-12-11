/**
 * Report Generator Service
 * Genera reportes PDF/HTML con infografías usando Chart.js y jsPDF
 *
 * TODO: Instalar dependencias:
 * npm install chart.js jspdf html2canvas
 */

import type { PartyResults, PlayerStats, QuestionStats } from '../types';

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
    results: PartyResults,
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
    results: PartyResults,
    playerId: string,
    options: ReportOptions = { format: 'pdf', includeCharts: true, includeRecommendations: true }
  ): Promise<Blob | string> {
    const playerStats = results.playerStats.find((s) => s.playerId === playerId);
    if (!playerStats) {
      throw new Error('Player not found in results');
    }

    const playerResults: PartyResults = {
      ...results,
      playerStats: [playerStats],
    };

    return this.generateFullReport(playerResults, options);
  }

  /**
   * Genera reporte HTML (preview en navegador)
   */
  private generateHTMLReport(results: PartyResults, options: ReportOptions): string {
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
  <title>Reporte - ${results.partyName}</title>
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
      <p style="font-size: 1.2rem; color: #64748b;">${results.partyName}</p>
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
        .sort((a, b) => b.score - a.score)
        .map(
          (player, index) => `
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
  private generateChartsHTML(results: PartyResults): string {
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
  private generateChartScripts(results: PartyResults): string {
    const scores = results.playerStats.map((p) => p.score);
    const times = results.playerStats.map((p) => p.averageTimePerQuestion / 1000);
    const questionCorrectness = results.questionStats.map(
      (q) => (q.correctCount / (q.correctCount + q.incorrectCount)) * 100
    );

    return `
    <script>
      // Score Distribution
      new Chart(document.getElementById('scoreDistributionChart'), {
        type: 'bar',
        data: {
          labels: ${JSON.stringify(results.playerStats.map((p) => p.playerName))},
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
          labels: ${JSON.stringify(results.playerStats.map((p) => p.playerName))},
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
          labels: ${JSON.stringify(results.questionStats.map((_, i) => `P${i + 1}`))},
          datasets: [{
            label: '% de Aciertos',
            data: ${JSON.stringify(questionCorrectness)},
            backgroundColor: ${JSON.stringify(questionCorrectness.map((p) => (p >= 70 ? 'rgba(34, 197, 94, 0.8)' : p >= 50 ? 'rgba(251, 191, 36, 0.8)' : 'rgba(239, 68, 68, 0.8)')))},
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
  private generateRecommendationsHTML(results: PartyResults): string {
    return `
    <h2>💡 Recomendaciones Personalizadas</h2>
    ${results.playerStats
      .map(
        (player) => `
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
   * Genera reporte PDF (requiere jsPDF y html2canvas)
   */
  private async generatePDFReport(
    results: PartyResults,
    options: ReportOptions
  ): Promise<Blob> {
    // TODO: Implementar con jsPDF cuando se instalen las dependencias
    // Por ahora, devolvemos el HTML como fallback
    const html = this.generateHTMLReport(results, options);
    return new Blob([html], { type: 'text/html' });
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
