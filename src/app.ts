import http from 'http';
import {
  applySecurityHeaders,
  handleRateLimit,
  sanitizeParam,
  validateRequest,
  jsonResponse,
  errorResponse
} from './middleware/security';

/**
 * Create and configure the Node HTTP Server with mounted security middleware.
 */
export function createServer() {
  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);

      // 1. Get Client IP for Rate Limiting
      const ip =
        (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
        req.socket.remoteAddress ||
        '127.0.0.1';

      // 2. Apply Rate Limiting
      const rate = handleRateLimit(ip);
      if (!rate.allowed) {
        const errRes = errorResponse('Too Many Requests', 429);
        res.writeHead(429, {
          'Content-Type': 'application/json',
          'Retry-After': '60',
          'X-RateLimit-Limit': String(rate.limit),
          'X-RateLimit-Remaining': '0',
          ...Object.fromEntries(errRes.headers.entries())
        });
        res.end(await errRes.text());
        return;
      }

      // 3. Extract and Sanitize Parameters
      const params: Record<string, string> = {};
      url.searchParams.forEach((value, key) => {
        params[key] = sanitizeParam(value);
      });

      // 4. Validate Parameters for protected endpoints
      const path = url.pathname;
      if (path === '/v1/questions' || path === '/get-questions' || path === '/functions/v1/get-questions') {
        const isValid = validateRequest(params);
        if (!isValid) {
          const errRes = errorResponse('Invalid parameters', 400);
          res.writeHead(400, {
            'Content-Type': 'application/json',
            ...Object.fromEntries(errRes.headers.entries())
          });
          res.end(await errRes.text());
          return;
        }
      }

      // 5. Mock questions data for testing / fallback integration
      const mockQuestions = [
        {
          id: 'q-001',
          statement: '¿Cuál es la fórmula para calcular el área de un círculo?',
          options: [
            { letter: 'A', text: 'π * r^2', is_correct: true },
            { letter: 'B', text: '2 * π * r', is_correct: false },
            { letter: 'C', text: 'π * d', is_correct: false },
            { letter: 'D', text: 'r^2', is_correct: false }
          ],
          correct_answer: 'A',
          grade: parseInt(params.grade || '11'),
          subject: params.subject || 'matematicas'
        }
      ];

      const mockData = {
        success: true,
        is_guest: true,
        questions: mockQuestions,
        total_questions: mockQuestions.length,
        country: params.country || 'CO',
        grade: parseInt(params.grade || '11'),
        subject: params.subject || 'matematicas'
      };

      // 6. Build response with standard security headers
      const finalRes = jsonResponse(mockData);
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': String(rate.limit),
        'X-RateLimit-Remaining': String(rate.remaining),
        ...Object.fromEntries(finalRes.headers.entries())
      });
      res.end(await finalRes.text());
    } catch (error: any) {
      const errRes = errorResponse(error.message || 'Internal Server Error', 500);
      res.writeHead(500, {
        'Content-Type': 'application/json',
        ...Object.fromEntries(errRes.headers.entries())
      });
      res.end(await errRes.text());
    }
  });
}

// Start server helper
export function startServer(port = 8791) {
  const server = createServer();
  server.listen(port);
  return server;
}
