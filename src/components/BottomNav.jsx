import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Home, Camera, CheckSquare, Calendar, Sliders } from 'lucide-react';

export const BottomNav = () => {
  const { activeTab, setActiveTab } = useTaskContext();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'capture', label: 'Capture', icon: Camera, isSpecial: true },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'plan', label: 'Plan', icon: Calendar }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-lg border-t border-slate-200/80 px-4 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center group relative -top-4"
              >
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-105 active:scale-95 transition-all ring-4 ring-white">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-blue-600 mt-1">
                  Snap
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-400 font-medium hover:text-slate-600'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[11px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
