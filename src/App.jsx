import React, { useState, useEffect } from 'react';
import { CheckCircle2, Flame, Sword, Target, TrendingUp, Zap, Clock, ShieldAlert } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

// --- DATA MOCKS ---
const MOCK_CHART = [{s:40},{s:70},{s:50},{s:90},{s:60},{s:95},{s:100}];

export default function App() {
  // 1. Core State
  const [xp, setXp] = useState(550);
  const [streak, setStreak] = useState(5);
  const [urgeActive, setUrgeActive] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: "No Cheap Dopamine", done: false },
    { id: 2, text: "Read 10 Pages", done: false },
    { id: 3, text: "Deep Work Session", done: false },
  ]);

  // 2. Logic Functions
  const toggleTask = (id) => {
    setTasks(tasks.map(t => {
      if(t.id === id && !t.done) setXp(prev => prev + 50);
      return t.id === id ? { ...t, done: !t.done } : t;
    }));
  };

  const triggerUrge = () => setUrgeActive(true);

  return (
    <div className="min-h-screen bg-black text-white pb-24 select-none">
      
      {/* --- HEADER SECTION --- */}
      <header className="p-6 border-b border-gray-900 sticky top-0 bg-black/80 backdrop-blur-md z-40">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-black tracking-widest text-red-600 underline decoration-2 underline-offset-4">DISCIPLINE.OS</h1>
          <div className="flex items-center gap-2 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            <Flame size={16} className="text-orange-500" />
            <span className="text-orange-500 font-bold text-sm">{streak} DAYS</span>
          </div>
        </div>
        
        {/* XP Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[10px] mb-1 font-mono text-gray-500">
            <span>LVL 4: SIGMA</span>
            <span>{xp} / 1000 XP</span>
          </div>
          <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
            <div className="h-full bg-white transition-all duration-500" style={{ width: `${(xp/1000)*100}%` }}></div>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        
        {/* --- PERFORMANCE GRAPH --- */}
        <section className="bg-zinc-950 p-4 rounded-3xl border border-white/5">
          <h2 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Growth Analytics</h2>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_CHART}>
                <Line type="step" dataKey="s" stroke="#444" strokeWidth={2} dot={false} />
                <Tooltip content={null} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* --- DAILY MISSIONS --- */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">Daily Missions</h2>
          {tasks.map(task => (
            <div 
              key={task.id} 
              onClick={() => toggleTask(task.id)}
              className={`p-5 rounded-2xl flex justify-between items-center border transition-all ${
                task.done ? 'bg-green-500/5 border-green-500/20 opacity-50' : 'bg-zinc-900 border-white/5 shadow-xl'
              }`}
            >
              <span className={`font-medium ${task.done ? 'line-through' : ''}`}>{task.text}</span>
              <CheckCircle2 size={24} className={task.done ? 'text-green-500' : 'text-zinc-700'} />
            </div>
          ))}
        </section>

        {/* --- WORKOUT TOGGLE --- */}
        <section className="bg-zinc-900 p-5 rounded-3xl border border-white/5">
          <h2 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Movement Log</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white text-black py-3 rounded-xl font-bold active:scale-95 transition">⚡ LIGHT</button>
            <button className="bg-red-600 text-white py-3 rounded-xl font-bold active:scale-95 transition underline decoration-black">💪 FULL</button>
          </div>
        </section>

      </main>

      {/* --- FLOATING ACTION DOCK --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm flex justify-around items-center bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-3 rounded-full shadow-2xl z-50">
        <button className="p-3 text-gray-400"><TrendingUp size={24} /></button>
        <button onClick={triggerUrge} className="bg-red-600 p-5 rounded-full -mt-10 border-4 border-black shadow-lg animate-pulse">
          <Sword size={28} className="text-white" />
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
  );
                                     }
     
