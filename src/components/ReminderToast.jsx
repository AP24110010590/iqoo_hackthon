import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Bell, Sparkles } from 'lucide-react';

export const ReminderToast = () => {
  const { activeToast } = useTaskContext();

  if (!activeToast) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] animate-fadeIn">
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 backdrop-blur-lg">
        <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md">
          <Bell className="w-4 h-4 animate-bounce" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Snap2Action Notification
          </p>
          <p className="text-xs font-bold text-white truncate mt-0.5">{activeToast.message}</p>
        </div>
      </div>
    </div>
  );
};
