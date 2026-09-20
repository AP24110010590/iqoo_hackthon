import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Sparkles, Laptop, Zap } from 'lucide-react';

export const Navbar = () => {
  const { setActiveTab, setIsSyncModalOpen, setIsDemoRunning, setDemoStep } = useTaskContext();

  const handleStartDemo = () => {
    setIsDemoRunning(true);
    setDemoStep(1);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => setActiveTab('home')}
          className="cursor-pointer group flex items-center gap-2.5"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 fill-white/20" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
              Snap2Action <span className="text-xs font-extrabold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 uppercase">AI</span>
            </h1>
            <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">From information to action</p>
          </div>
        </div>

        {/* Action Header Items */}
        <div className="flex items-center gap-2">
          {/* Laptop Sync Icon */}
          <button
            onClick={() => setIsSyncModalOpen(true)}
            title="Continue on Laptop"
            className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors relative"
          >
            <Laptop className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </button>

          {/* Prominent Try Demo Button */}
          <button
            onClick={handleStartDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-md shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try Demo</span>
          </button>
        </div>

      </div>
    </header>
  );
};
