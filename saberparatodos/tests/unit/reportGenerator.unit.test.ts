import { describe, it, expect, vi, beforeEach } from 'vitest';
import { reportGeneratorService } from '../../src/modules/exam-room/services/reportGenerator';
import type { RoomResults } from '../../src/modules/exam-room/types';

// Mock jsPDF using standard variables to trace calls
const mockText = vi.fn();
const mockSetFontSize = vi.fn();
const mockAddPage = vi.fn();
const mockOutput = vi.fn().mockReturnValue(new Blob(['pdf-data'], { type: 'application/pdf' }));
const mockInternal = {
  pageSize: {
    getWidth: () => 595,
    getHeight: () => 842,
  },
};

class MockjsPDF {
  text = mockText;
  setFontSize = mockSetFontSize;
  addPage = mockAddPage;
  output = mockOutput;
  internal = mockInternal;
  splitTextToSize(text: string) {
    return [text];
  }
}

vi.mock('jspdf', () => {
  return {
    jsPDF: MockjsPDF,
  };
});

describe('ReportGenerator HTML Generation', () => {
  let sampleResults: RoomResults;

  beforeEach(() => {
    vi.clearAllMocks();
    sampleResults = {
      roomId: 'ROOM123',
      roomName: 'Examen de Prueba',
      totalPlayers: 2,
      completedPlayers: 2,
      averageScore: 75,
      averageTime: 45000,
      generatedAt: new Date('2026-08-05T12:00:00Z'),
      playerStats: [
        {
          playerId: 'p1',
          playerName: 'Estudiante A',
          score: 80,
          correctAnswers: 8,
          totalQuestions: 10,
          averageTimePerQuestion: 4000,
          suspiciousEvents: 0,
          recommendation: 'Excelente desempeño.',
        },
        {
          playerId: 'p2',
          playerName: 'Estudiante B',
          score: 70,
          correctAnswers: 7,
          totalQuestions: 10,
          averageTimePerQuestion: 5000,
          suspiciousEvents: 2,
          recommendation: 'Buen trabajo, mantén el ritmo.',
        },
      ],
      questionStats: [
        { questionId: 'q1', correctCount: 2, incorrectCount: 0 },
        { questionId: 'q2', correctCount: 1, incorrectCount: 1 },
      ],
    };
  });

  it('should generate a complete HTML report structure', async () => {
    const report = await reportGeneratorService.generateFullReport(sampleResults, {
      format: 'html',
      includeCharts: true,
      includeRecommendations: true,
    });

    expect(typeof report).toBe('string');
    const htmlReport = report as string;

    expect(htmlReport).toContain('Reporte de Examen');
    expect(htmlReport).toContain('Examen de Prueba');
    expect(htmlReport).toContain('Estudiante A');
    expect(htmlReport).toContain('Estudiante B');
    expect(htmlReport).toContain('Excelente desempeño.');
    expect(htmlReport).toContain('Buen trabajo, mantén el ritmo.');
    expect(htmlReport).toContain('scoreDistributionChart');
  });

  it('should generate HTML report without charts or recommendations when options are disabled', async () => {
    const report = await reportGeneratorService.generateFullReport(sampleResults, {
      format: 'html',
      includeCharts: false,
      includeRecommendations: false,
    });

    const htmlReport = report as string;
    expect(htmlReport).not.toContain('Análisis Visual');
    expect(htmlReport).not.toContain('Recomendaciones Personalizadas');
  });
});

describe('ReportGenerator PDF Generation & Edge Cases', () => {
  let sampleResults: RoomResults;

  beforeEach(() => {
    vi.clearAllMocks();
    sampleResults = {
      roomId: 'ROOM123',
      roomName: 'Examen de Geometría',
      totalPlayers: 3,
      completedPlayers: 3,
      averageScore: 85,
      averageTime: 30000,
      generatedAt: new Date('2026-08-05T12:00:00Z'),
      playerStats: [
        {
          playerId: 'p1',
          playerName: 'Lucía',
          score: 90,
          correctAnswers: 9,
          totalQuestions: 10,
          averageTimePerQuestion: 3000,
          suspiciousEvents: 0,
          recommendation: 'Dominio excepcional del tema.',
        },
        {
          playerId: 'p2',
          playerName: 'Hugo',
          score: 90, // Tie
          correctAnswers: 9,
          totalQuestions: 10,
          averageTimePerQuestion: 2800,
          suspiciousEvents: 0,
          recommendation: 'Sigue practicando.',
        },
        {
          playerId: 'p3',
          playerName: 'Martín',
          score: 45, // Low Score
          correctAnswers: 4,
          totalQuestions: 10,
          averageTimePerQuestion: 4500,
          suspiciousEvents: 5, // High suspicious count
          recommendation: 'Necesita repasar los conceptos básicos.',
        },
      ],
      questionStats: [],
    };
  });

  it('should generate a PDF report calling jsPDF methods', async () => {
    const report = await reportGeneratorService.generateFullReport(sampleResults, {
      format: 'pdf',
      includeCharts: true,
      includeRecommendations: true,
    });

    expect(report).toBeInstanceOf(Blob);
    expect(mockSetFontSize).toHaveBeenCalled();
    expect(mockText).toHaveBeenCalledWith(expect.stringContaining('Examen de Geometría'), expect.any(Number), expect.any(Number));
    expect(mockText).toHaveBeenCalledWith(expect.stringContaining('Lucía'), expect.any(Number), expect.any(Number));
    expect(mockText).toHaveBeenCalledWith(expect.stringContaining('Hugo'), expect.any(Number), expect.any(Number));
    expect(mockText).toHaveBeenCalledWith(expect.stringContaining('Martín'), expect.any(Number), expect.any(Number));
  });

  it('should generate player-specific report correctly', async () => {
    const report = await reportGeneratorService.generatePlayerReport(sampleResults, 'p3', {
      format: 'pdf',
      includeCharts: false,
      includeRecommendations: true,
    });

    expect(report).toBeInstanceOf(Blob);
    expect(mockText).toHaveBeenCalledWith(expect.stringContaining('Martín'), expect.any(Number), expect.any(Number));
    // Hugo and Lucía shouldn't be included as playerStats is filtered to just Martín
    expect(mockText).not.toHaveBeenCalledWith(expect.stringContaining('Lucía'), expect.any(Number), expect.any(Number));
  });

  it('should throw error when generating report for non-existent player', async () => {
    await expect(
      reportGeneratorService.generatePlayerReport(sampleResults, 'unknown-id')
    ).rejects.toThrow('Player not found in results');
  });

  it('should handle edge case of 0 players', async () => {
    const emptyResults: RoomResults = {
      roomId: 'EMPTY',
      roomName: 'No Players Room',
      totalPlayers: 0,
      completedPlayers: 0,
      averageScore: 0,
      averageTime: 0,
      generatedAt: new Date(),
      playerStats: [],
      questionStats: [],
    };

    const report = await reportGeneratorService.generateFullReport(emptyResults, {
      format: 'html',
      includeCharts: false,
      includeRecommendations: false,
    });

    expect(report).toContain('No Players Room');
    expect(report).toContain('0'); // Average score & players
  });

  it('should trigger browser download on downloadReport', () => {
    const mockAnchor = {
      href: '',
      download: '',
      click: vi.fn(),
    };

    // Stub global document operations
    const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor as any);
    const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockAnchor as any);
    const removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockAnchor as any);
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:url');
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    reportGeneratorService.downloadReport('dummy-html', 'mi-reporte', 'html');

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalledWith(mockAnchor);
    expect(mockAnchor.download).toBe('mi-reporte.html');
    expect(mockAnchor.click).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalledWith(mockAnchor);
    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:url');
  });
});
