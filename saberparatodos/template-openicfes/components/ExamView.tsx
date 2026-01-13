import React, { useState, useEffect } from 'react';
import { Question, Option } from '../types';
import FlashlightCard from './FlashlightCard';

// Mock Data (In a real app, fetch via service)
const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "MATHEMATICS :: ALGEBRA",
    text: "Given the function f(x) = 2x² - 4x + 1, find the coordinate of the vertex.",
    options: [
      { id: 'A', text: "(1, -1)" },
      { id: 'B', text: "(1, 1)" },
      { id: 'C', text: "(-1, -1)" },
      { id: 'D', text: "(2, 1)" }
    ],
    correctOptionId: 'A'
  },
  {
    id: 2,
    category: "CRITICAL READING :: INFERENCE",
    text: "The author implies that the rapid expansion of urban areas leads to...",
    options: [
      { id: 'A', text: "Increased social cohesion." },
      { id: 'B', text: "A decrease in resource consumption." },
      { id: 'C', text: "Fragmentation of natural habitats." },
      { id: 'D', text: "Immediate economic collapse." }
    ],
    correctOptionId: 'C'
  },
  {
    id: 3,
    category: "PHYSICS :: KINEMATICS",
    text: "An object is dropped from rest. After 3 seconds, what is its velocity? (g ≈ 10 m/s²)",
    options: [
      { id: 'A', text: "10 m/s" },
      { id: 'B', text: "20 m/s" },
      { id: 'C', text: "30 m/s" },
      { id: 'D', text: "45 m/s" }
    ],
    correctOptionId: 'C'
  }
];

interface ExamViewProps {
  onFinish: (score: number, total: number) => void;
}

const ExamView: React.FC<ExamViewProps> = ({ onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const question = MOCK_QUESTIONS[currentIdx];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (selectedOption) {
      setAnswers(prev => ({ ...prev, [question.id]: selectedOption }));
    }
    
    if (currentIdx < MOCK_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    // Calculate final score including the current selection if exists
    const finalAnswers = selectedOption 
      ? { ...answers, [question.id]: selectedOption } 
      : answers;
      
    let score = 0;
    MOCK_QUESTIONS.forEach(q => {
      if (finalAnswers[q.id] === q.correctOptionId) {
        score++;
      }
    });
    onFinish(score, MOCK_QUESTIONS.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in-up">
      {/* Header Info */}
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 mb-1">
            Question No. {currentIdx + 1} / {MOCK_QUESTIONS.length}
          </p>
          <h2 className="text-emerald-500 font-mono text-sm tracking-widest">
            {question.category}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 mb-1">
            Time Remaining
          </p>
          <div className={`text-2xl font-bold tracking-widest ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-[#F5F5DC]'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <FlashlightCard className="p-8 mb-6 min-h-[200px] flex items-center">
        <p className="text-xl md:text-2xl font-light leading-relaxed text-[#F5F5DC]">
          {question.text}
        </p>
      </FlashlightCard>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {question.options.map((opt) => (
          <FlashlightCard
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            isActive={selectedOption === opt.id}
            className="p-6 transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <div className="flex items-center space-x-4">
              <span className={`
                flex items-center justify-center w-8 h-8 text-sm font-bold border 
                ${selectedOption === opt.id 
                  ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' 
                  : 'border-white/20 text-white/40'}
              `}>
                {opt.id}
              </span>
              <span className={`${selectedOption === opt.id ? 'text-emerald-100' : 'text-[#F5F5DC]/80'}`}>
                {opt.text}
              </span>
            </div>
          </FlashlightCard>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className={`
            px-8 py-3 border text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300
            ${selectedOption 
              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-black' 
              : 'border-white/10 text-white/20 cursor-not-allowed'}
          `}
        >
          {currentIdx === MOCK_QUESTIONS.length - 1 ? 'Terminate Exam' : 'Next Sequence'}
        </button>
      </div>
    </div>
  );
};

export default ExamView;