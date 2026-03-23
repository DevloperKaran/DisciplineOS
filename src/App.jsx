import React, { useState, useEffect } from 'react';

// Simplified inline components to ensure it loads even if files are missing
const Dashboard = ({ xp, streak }) => (
  <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
    <h2 className="text-orange-500 font-bold">LEVEL {Math.floor(xp / 100) + 1}</h2>
    <div className="text-4xl font-black mt-2">{xp} XP</div>
    <div className="mt-4 bg-zinc-800 h-2 rounded-full overflow-hidden">
      <div className="bg-orange-500 h-full" style={{ width: `${xp % 100}%` }}></div>
    </div>
  </div>
);

export default function App() {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  // Safety Check: Load data carefully
  useEffect(() => {
    try {
      const saved = localStorage.getItem('disciplineOS_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        setXp(parsed.xp || 0);
        setStreak(parsed.streak || 0);
      }
    } catch (e) {
      console.error("Local storage failed", e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6 tracking-tighter">
        DISCIPLINE<span className="text-orange-500">OS</span>
      </h1>
      
      <Dashboard xp={xp} streak={streak} />

      <div className="mt-8 space-y-4">
        <button 
          onClick={() => setXp(prev => prev + 10)}
          className="w-full bg-orange-600 py-4 rounded-xl font-bold"
        >
          +10 XP (Test Button)
        </button>
        
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-center">
          <p className="text-zinc-500 text-sm">CURRENT STREAK</p>
          <p className="text-2xl font-bold">🔥 {streak} Days</p>
        </div>
      </div>
    </div>
  );
}
        </button>
        <button className="p-3 text-gray-400"><Clock size={24} /></button>
      </div>

      {/* --- URGE BATTLE OVERLAY --- */}
      {urgeActive && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-8 text-center">
          <ShieldAlert size={80} className="text-red-600 mb-6 animate-bounce" />
          <h2 className="text-4xl font-black italic mb-4">REMAIN CALM.</h2>
          <p className="text-gray-400 mb-10 leading-relaxed">The urge is temporary. Regret is forever. <br/> Choose your weapon:</p>
          <div className="space-y-4 w-full">
            <button onClick={() => setUrgeActive(false)} className="w-full bg-white text-black py-5 rounded-2xl font-black text-xl">20 PUSHUPS</button>
            <button onClick={() => setUrgeActive(false)} className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold border border-white/10 italic">COLD WATER FACE WASH</button>
          </div>
        </div>
      )}
    </div>
          {/* --- FOOTER / SIGNATURE --- */}
      <footer className="mt-12 pb-24 text-center">
        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] mb-1">
          System Engineered by
        </p>
        <h2 className="text-xl font-light italic tracking-widest text-zinc-400 font-serif">
          Architect <span className="font-bold text-white">Karan</span>
        </h2>
        <div className="flex justify-center mt-2">
          <div className="h-[1px] w-8 bg-red-600/50"></div>
        </div>
      </footer>

      {/* --- FLOATING ACTION DOCK (Keep this below the footer) --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] ...">
         {/* ... (Existing Dock Code) ... */}
      </div>
  
  );
                                     }
     
