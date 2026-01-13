import React, { useState } from 'react';
import { AppView } from './types';
import ExamView from './components/ExamView';
import Leaderboard from './components/Leaderboard';
import FlashlightCard from './components/FlashlightCard';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [lastScore, setLastScore] = useState<{score: number, total: number} | null>(null);

  const handleExamFinish = (score: number, total: number) => {
    setLastScore({ score, total });
    setView(AppView.RESULTS);
  };

  const renderLanding = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12 animate-fade-in-up">
      <div className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-500 animate-pulse-slow">
          System Ready :: V.2.0.4
        </p>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase text-[#F5F5DC]">
          Open<span className="text-white/20">Icfes</span>
        </h1>
        <p className="max-w-md mx-auto text-sm font-light leading-relaxed opacity-60">
          Advanced preparatory interface for standardized testing. 
          Cyber-minimalist environment optimized for focus and efficiency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <FlashlightCard 
          onClick={() => setView(AppView.EXAM)}
          className="p-8 flex flex-col items-center justify-center group h-48 hover:border-emerald-500/50"
        >
          <div className="mb-4 text-emerald-500 opacity-80 group-hover:opacity-100 text-3xl">
            {'>_'}
          </div>
          <h3 className="text-xl font-bold uppercase tracking-widest mb-2">Initialize Exam</h3>
          <p className="text-xs opacity-40">Start standard sequence</p>
        </FlashlightCard>

        <FlashlightCard 
          onClick={() => setView(AppView.LEADERBOARD)}
          className="p-8 flex flex-col items-center justify-center group h-48 hover:border-white/40"
        >
          <div className="mb-4 text-[#F5F5DC] opacity-60 group-hover:opacity-100 text-3xl">
            :::
          </div>
          <h3 className="text-xl font-bold uppercase tracking-widest mb-2">Global Data</h3>
          <p className="text-xs opacity-40">View top performers</p>
        </FlashlightCard>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-fade-in-up">
      <h2 className="text-4xl font-bold uppercase tracking-tighter text-[#F5F5DC]">
        Sequence Complete
      </h2>
      
      <div className="p-12 border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 mb-4">Performance Metric</p>
        <div className="text-8xl font-bold text-emerald-500 font-mono mb-2">
          {lastScore ? Math.round((lastScore.score / lastScore.total) * 100) : 0}%
        </div>
        <p className="text-sm opacity-60">
          {lastScore?.score} Correct / {lastScore?.total} Total
        </p>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setView(AppView.LANDING)}
          className="px-8 py-3 border border-white/10 hover:border-white/40 text-xs font-bold uppercase tracking-[0.2em] transition-colors"
        >
          Return to Root
        </button>
        <button
          onClick={() => setView(AppView.EXAM)}
          className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-transparent hover:border-emerald-500/50 text-emerald-500 text-xs font-bold uppercase tracking-[0.2em] transition-all"
        >
          Retry Sequence
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full relative selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Fixed Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{ filter: "url('#noiseFilter')" }}
      />
      
      {/* Navbar / Status Bar */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center border-b border-white/5 bg-[#121212]/80 backdrop-blur-md">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView(AppView.LANDING)}>
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold tracking-[0.2em] opacity-80">OPEN_ICFES</span>
        </div>
        <div className="text-[10px] font-mono opacity-30 hidden md:block">
          SECURE_CONNECTION :: ENCRYPTED
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 px-4 pb-12 w-full max-w-7xl mx-auto min-h-screen flex flex-col relative z-10">
        {view === AppView.LANDING && renderLanding()}
        {view === AppView.EXAM && <ExamView onFinish={handleExamFinish} />}
        {view === AppView.LEADERBOARD && <Leaderboard onBack={() => setView(AppView.LANDING)} />}
        {view === AppView.RESULTS && renderResults()}
      </main>

      {/* Decorative Grid Background (Subtle) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 100%)'
        }}
      />
    </div>
  );
};

export default App;