import React, { useState, useEffect } from 'react';
import { ShieldAlert, Clock } from 'lucide-react'; // Ensure you ran: npm install lucide-react

const Dashboard = ({ xp, streak }) => (
  <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg">
    <h2 className="text-orange-500 font-bold uppercase tracking-widest text-xs">Level {Math.floor(xp / 100) + 1}</h2>
    <div className="text-4xl font-black mt-1 text-white">{xp} <span className="text-sm font-normal text-zinc-500">XP</span></div>
    <div className="mt-4 bg-zinc-800 h-2 rounded-full overflow-hidden">
      <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: `${xp % 100}%` }}></div>
    </div>
  </div>
);

export default function App() {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [urgeActive, setUrgeActive] = useState(false); // Added missing state

  useEffect(() => {
    try {
      const saved = localStorage.getItem('disciplineOS_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        setXp(parsed.xp || 0);
        setStreak(parsed.streak || 0);
      }
    } catch (e) { console.error(e); }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 font-sans">
      <h1 className="text-2xl font-bold mb-6 tracking-tighter">
        DISCIPLINE<span className="text-orange-500">OS</span>
      </h1>
      
      <Dashboard xp={xp} streak={streak} />

      <div className="mt-8 space-y-4">
        <button 
          onClick={() => setXp(prev => prev + 10)}
          className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-xl font-bold transition-colors"
        >
          +10 XP (Test Task)
        </button>

        <button 
          onClick={() => setUrgeActive(true)}
          className="w-full bg-zinc-900 border border-red-900/50 py-4 rounded-xl font-bold text-red-500 flex items-center justify-center gap-2"
        >
          <ShieldAlert size={20} /> FIGHT URGE
        </button>
        
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-center">
          <p className="text-zinc-500 text-xs uppercase tracking-widest">Current Streak</p>
          <p className="text-2xl font-bold mt-1">🔥 {streak} Days</p>
        </div>
      </div>

      {/* URGE BATTLE OVERLAY */}
      {urgeActive && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-8 text-center">
           <ShieldAlert size={80} className="text-red-600 mb-6 animate-bounce" />
           <h2 className="text-4xl font-black italic mb-4">REMAIN CALM.</h2>
           <p className="text-zinc-400 mb-10 leading-relaxed">The urge is temporary. Regret is forever.</p>
           <div className="space-y-4 w-full">
              <button onClick={() => setUrgeActive(false)} className="w-full bg-white text-black py-5 rounded-2xl font-black italic uppercase">I Survived</button>
              <button onClick={() => setUrgeActive(false)} className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold">Close</button>
           </div>
        </div>
      )}

      <footer className="mt-12 text-center opacity-40">
        <p className="text-xs uppercase tracking-widest">Architect: Karan</p>
      </footer>
    </div>
  );
}
