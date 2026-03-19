# Automated Question Generation System - Implementation Plan

## Issue Reference
- **Issue**: #101 - Automated Question Generation System + Remotion Videos
- **Repository**: iberi22/worldexams
- **Priority**: HIGH

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                   Question Generation Pipeline                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐ │
│  │   Input   │──▶│ Generate │──▶│ Evaluate │──▶│ Improve  │ │
│  │(Topic/PDF)│    │  (AI)    │    │ (Algo)   │    │ (Loop)   │ │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘ │
│                                              │                  │
│                                              ▼                  │
│                                       ┌──────────┐             │
│                                       │  Video   │             │
│                                       │(Remotion)│             │
│                                       └──────────┘             │
│                                              │                  │
│                                              ▼                  │
│                                       ┌──────────┐             │
│                                       │ Publish  │             │
│                                       │+ Measure │             │
│                                       └──────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
worldexams/
├── apps/
│   └── worldexams-api/
│       └── src/
│           ├── question-generator/     # NEW: Question generation
│           │   ├── agents/
│           │   │   ├── generator.agent.ts    # AI generator
│           │   │   └── evaluator.agent.ts    # Quality evaluator
│           │   ├── services/
│           │   │   ├── generate.service.ts   # Main generation
│           │   │   ├── improve.service.ts   # Self-improvement
│           │   │   └── evaluate.service.ts  # Quality check
│           │   ├── types/
│           │   │   └── question.types.ts    # Question interfaces
│           │   └── prompts/
│           │       └── question.prompts.ts   # AI prompts
│           │
│           ├── video/                   # NEW: Remotion videos
│           │   ├── src/
│           │   │   ├── components/        # Video components
│           │   │   ├── compositions/       # Video compositions
│           │   │   └── assets/            # Images, audio
│           │   ├── server.ts              # Video server
│           │   └── package.json
│           │
│           └── analytics/               # Metrics
│               ├── services/
│               │   ├── feedback.service.ts
│               │   └── metrics.service.ts
│               └── dashboard/
│
├── supabase/
│   └── migrations/
│       └── 2026_question_system.sql
│
└── docs/
    └── question-system.md
```

---

## Core Components

### 1. Question Generator Agent

```typescript
// src/question-generator/agents/generator.agent.ts

interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  category: string;
}

class QuestionGeneratorAgent {
  private model: Gemini;
  
  async generateFromTopic(topic: string, count: number): Promise<Question[]> {
    const prompt = this.buildPrompt(topic, count);
    const response = await this.model.generateContent(prompt);
    return this.parseResponse(response);
  }
  
  private buildPrompt(topic: string, count: number): string {
    return `Generate ${count} high-quality multiple choice questions about "${topic}".
    
    For each question include:
    - Clear, unambiguous text
    - 4 options (A, B, C, D)
    - One correct answer
    - Detailed explanation
    - Difficulty level
    - Topic category
    
    Format as JSON array.`;
  }
}
```

### 2. Quality Evaluator

```typescript
// src/question-generator/agents/evaluator.agent.ts

interface QuestionMetrics {
  clarity: number;        // 0-100
  difficulty: number;    // 0-100
  accuracy: number;       // 0-100
  uniqueness: number;    // 0-100
  overall: number;        // 0-100
}

class QuestionEvaluator {
  evaluate(question: Question): QuestionMetrics {
    const clarity = this.checkClarity(question);
    const difficulty = this.checkDifficulty(question);
    const accuracy = this.checkAccuracy(question);
    const uniqueness = this.checkUniqueness(question);
    
    return {
      clarity,
      difficulty,
      accuracy,
      uniqueness,
      overall: (clarity + difficulty + accuracy + uniqueness) / 4
    };
  }
  
  private checkClarity(q: Question): number {
    // Algorithm to check question clarity
    // - Word count
    // - Grammar
    // - Ambiguity detection
  }
}
```

### 3. Self-Improvement Loop

```typescript
// src/question-generator/services/improve.service.ts

class QuestionImprover {
  async improve(question: Question, feedback: UserFeedback): Promise<Question> {
    const metrics = this.evaluator.evaluate(question);
    
    if (metrics.overall < 70) {
      // Regenerate with feedback
      return this.regenerate(question, feedback);
    }
    
    // Apply specific improvements
    if (metrics.clarity < 70) {
      question = await this.improveClarity(question);
    }
    if (metrics.difficulty < 50 || metrics.difficulty > 90) {
      question = await this.normalizeDifficulty(question);
    }
    
    return question;
  }
}
```

### 4. Remotion Video Generator

```typescript
// src/video/compositions/QuestionVideo.tsx

import { Composition } from 'remotion';

export const QuestionVideo: Composition = {
  id: 'question-video',
  durationInFrames: 300,
  fps: 30,
  width: 1080,
  height: 1920,
  
  layers: [
    // Background
    { type: 'solid', color: '#1a1a2e' },
    
    // Question text
    { type: 'text', text: '{{question}}', position: { x: 100, y: 300 } },
    
    // Options
    ...options.map((opt, i) => ({
      type: 'text',
      text: opt.text,
      position: { x: 100, y: 600 + i * 150 }
    })),
    
    // Explanation (appears after answer)
    { type: 'text', text: '{{explanation}}', position: { x: 100, y: 1200 } }
  ]
};
```

---

## Database Schema

```sql
-- Questions table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer VARCHAR(1) NOT NULL,
  explanation TEXT,
  difficulty VARCHAR(10) CHECK (difficulty IN ('easy', 'medium', 'hard')),
  topic VARCHAR(100),
  category VARCHAR(100),
  quality_score DECIMAL(5,2),
  success_rate DECIMAL(5,2),
  times_shown INTEGER DEFAULT 0,
  times_correct INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Question feedback
CREATE TABLE question_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id),
  user_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  is_helpful BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Video mappings
CREATE TABLE question_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id),
  video_url TEXT NOT NULL,
  duration_seconds INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/questions/generate | Generate new questions |
| POST | /api/questions/evaluate | Evaluate question quality |
| POST | /api/questions/improve | Improve question based on feedback |
| GET | /api/questions/:id | Get question details |
| POST | /api/questions/:id/feedback | Submit feedback |
| GET | /api/questions/analytics | Get analytics |
| POST | /api/videos/generate | Generate Remotion video |
| GET | /api/videos/:questionId | Get video for question |

---

## Implementation Steps

### Phase 1: Question Generator (Week 1-2)

- [ ] Set up question-generator module
- [ ] Create generator agent with Gemini
- [ ] Implement quality evaluator
- [ ] Create basic API endpoints
- [ ] Integrate with Supabase

### Phase 2: Self-Improvement (Week 3)

- [ ] Implement feedback collection
- [ ] Create improvement loop
- [ ] Add analytics tracking
- [ ] Set up monitoring

### Phase 3: Remotion Videos (Week 4-5)

- [ ] Set up Remotion project
- [ ] Create video compositions
- [ ] Implement video generation API
- [ ] Integrate with questions

### Phase 4: Testing & Launch (Week 6)

- [ ] E2E tests
- [ ] Performance optimization
- [ ] User acceptance testing
- [ ] Launch

---

## Dependencies

```json
{
  "@google/generative-ai": "^0.8.0",
  "remotion": "^4.0.0",
  "@remotion/server": "^4.0.0",
  "zod": "^3.22.0"
}
```

---

*Created: 2026-03-16*
*Part of Issue #101*
