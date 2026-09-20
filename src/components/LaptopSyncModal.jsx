import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Smartphone, Laptop, CheckCircle2, X, RefreshCw, Zap, ArrowRight } from 'lucide-react';

export const LaptopSyncModal = () => {
  const { isSyncModalOpen, setIsSyncModalOpen, tasks } = useTaskContext();

  if (!isSyncModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-5 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsSyncModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Title */}
        <div className="space-y-1">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-extrabold uppercase tracking-wider">
            Office Kit Continuum
          </span>
          <h3 className="text-lg font-bold text-slate-900">Continue on Laptop</h3>
          <p className="text-xs text-slate-500">Real-time sync between iQOO Phone & Desktop Workspace</p>
        </div>

        {/* Visual Phone -> Laptop Connection Box */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-5 rounded-2xl text-white space-y-4">
          
          <div className="flex items-center justify-between">
            {/* Phone Icon */}
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center mx-auto text-blue-300 shadow-md">
                <Smartphone className="w-6 h-6" />
              </div>
              <p className="text-[11px] font-bold text-slate-200">Snap Phone</p>
              <p className="text-[10px] text-blue-300 font-semibold">{tasks.length} tasks captured</p>
            </div>

            {/* Sync Pulse Arrow Animation */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></div>
                <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-emerald-400"></div>
                <Zap className="w-4 h-4 text-emerald-400 animate-bounce" />
              </div>
              <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-extrabold">Instant Sync</span>
            </div>

            {/* Laptop Icon */}
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-300 shadow-md">
                <Laptop className="w-6 h-6" />
              </div>
              <p className="text-[11px] font-bold text-slate-200">Office Laptop</p>
              <p className="text-[10px] text-emerald-300 font-semibold">Tasks synced successfully</p>
            </div>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/10 backdrop-blur-md flex items-center gap-2 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200 font-medium">Your schedule, calendar events, and notifications are live-updated on your PC.</span>
          </div>
        </div>

        <button
          onClick={() => setIsSyncModalOpen(false)}
          className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-colors"
        >
          Close Sync Window
        </button>

      </div>
    </div>
  );
};
