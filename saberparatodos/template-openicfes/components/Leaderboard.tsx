import React from 'react';
import { LeaderboardEntry } from '../types';

const MOCK_DATA: LeaderboardEntry[] = [
  { rank: 1, user: "sys_admin_01", score: 980, time: "12:05" },
  { rank: 2, user: "ghost_shell", score: 945, time: "14:20" },
  { rank: 3, user: "null_ptr", score: 890, time: "11:00" },
  { rank: 4, user: "cyber_punk", score: 850, time: "15:45" },
  { rank: 5, user: "react_dev", score: 820, time: "13:30" },
];

const Leaderboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold uppercase tracking-tighter text-[#F5F5DC]">
          Top_Performers
        </h2>
        <button 
          onClick={onBack}
          className="text-xs font-bold uppercase tracking-[0.3em] opacity-60 hover:opacity-100 hover:text-emerald-500 transition-colors"
        >
          [ Return_Home ]
        </button>
      </div>

      <div className="w-full border border-white/10 backdrop-blur-md bg-[#121212]/50">
        <div className="grid grid-cols-4 p-4 border-b border-white/10 bg-white/5">
          <div className="text-xs font-bold uppercase tracking-[0.2em] opacity-40">Rank</div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 col-span-2">User_ID</div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 text-right">Score</div>
        </div>
        
        {MOCK_DATA.map((entry) => (
          <div 
            key={entry.rank}
            className="grid grid-cols-4 p-4 border-b border-white/5 hover:bg-white/[0.06] transition-colors duration-200 group cursor-default"
          >
            <div className="font-mono text-emerald-500/80 group-hover:text-emerald-400 transition-colors">
              #{entry.rank.toString().padStart(2, '0')}
            </div>
            <div className="col-span-2 font-mono text-[#F5F5DC]/80 group-hover:text-[#F5F5DC] transition-colors">
              {entry.user}
            </div>
            <div className="font-mono text-right text-[#F5F5DC]/60 group-hover:text-[#F5F5DC] transition-colors">
              {entry.score}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs font-mono opacity-30">
          // DATA_SYNC_COMPLETE :: NODE_HK_24
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;