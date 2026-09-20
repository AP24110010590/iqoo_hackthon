import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  Zap, 
  Calendar, 
  Camera, 
  Mic, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const Dashboard = () => {
  const { 
    workloadState, 
    availableHoursToday, 
    updateAvailableHours, 
    setActiveTab, 
    toggleTaskComplete 
  } = useTaskContext();

  const { todayTasks, tomorrowTasks, completedTasks, explanation, capacityPercentage } = workloadState;

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">

      {/* Hero Welcome & Quick Action Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white p-5 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute right-4 top-4 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md flex items-center gap-1.5 text-blue-300 text-[11px] font-semibold">
          <Zap className="w-3.5 h-3.5 fill-blue-300" />
          <span>Productivity Track</span>
        </div>

        <p className="text-xs uppercase tracking-wider text-blue-400 font-bold mb-1">Hackathon 2026</p>
        <h2 className="text-xl font-bold tracking-tight">From Information to Action.</h2>
        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-[280px]">
          Capture assignments, posters, or voice clips. Let AI extract deadlines & auto-balance your workload.
        </p>

        {/* Quick Capture Options Bar */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-700/60">
          <button
            onClick={() => setActiveTab('capture')}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
          >
            <Camera className="w-4 h-4 text-blue-400" />
            <span>Snap Photo</span>
          </button>
          <button
            onClick={() => setActiveTab('capture')}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
          >
            <Mic className="w-4 h-4 text-emerald-400" />
            <span>Voice</span>
          </button>
          <button
            onClick={() => setActiveTab('capture')}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Natural Text</span>
          </button>
        </div>
      </div>

      {/* Available Time & Productivity Metrics Card */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Available Time Today</h3>
              <p className="text-[11px] text-slate-500">Adjust your available daily capacity</p>
            </div>
          </div>
          <span className="text-base font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-xl">
            {availableHoursToday} Hours
          </span>
        </div>

        {/* Interactive Hours Slider */}
        <div className="space-y-1.5">
          <input 
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={availableHoursToday}
            onChange={(e) => updateAvailableHours(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
            <span>1 Hour</span>
            <span>4 Hours (Default)</span>
            <span>10 Hours</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-600">Today's Workload Utilization</span>
            <span className={capacityPercentage > 100 ? 'text-rose-600' : 'text-blue-600'}>
              {workloadState.totalHoursToday}h / {availableHoursToday}h ({capacityPercentage}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                capacityPercentage > 100 ? 'bg-rose-500' : 'bg-gradient-to-r from-blue-500 to-indigo-600'
              }`}
              style={{ width: `${Math.min(100, capacityPercentage)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* AI WORKLOAD BALANCER - Key Hackathon Differentiator Card */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50/50 to-blue-50/30 p-4 rounded-2xl border border-blue-200/80 shadow-sm relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              AI Workload Balancer
            </span>
          </div>
          <button 
            onClick={() => setActiveTab('plan')}
            className="text-xs text-blue-700 font-semibold hover:underline flex items-center gap-1"
          >
            View Schedule <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-slate-700 font-medium leading-relaxed bg-white/70 p-3 rounded-xl border border-blue-100/80 backdrop-blur-sm">
          "{explanation}"
        </p>

        {tomorrowTasks.length > 0 && (
          <div className="mt-2.5 flex items-center gap-2 text-[11px] text-amber-800 font-semibold bg-amber-50/80 px-2.5 py-1.5 rounded-lg border border-amber-200/60">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Auto-shifted {tomorrowTasks.length} task({tomorrowTasks.map(t => t.title).join(', ')}) to tomorrow.</span>
          </div>
        )}
      </div>

      {/* Today's Tasks Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            Today's Scheduled Tasks ({todayTasks.length})
          </h3>
          <button 
            onClick={() => setActiveTab('plan')}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Timeline Plan
          </button>
        </div>

        {todayTasks.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="text-xs font-bold text-slate-800">All clear for today!</p>
            <p className="text-[11px] text-slate-500">Snap a photo or add a task to build your schedule.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {todayTasks.map((task) => (
              <div 
                key={task.id}
                className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:border-blue-300 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTaskComplete(task.id)}
                    className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-blue-500 flex items-center justify-center transition-colors"
                  >
                    {task.completed && <div className="w-3 h-3 rounded-full bg-blue-600"></div>}
                  </button>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{task.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-0.5 text-blue-600 font-semibold">
                        <Clock className="w-3 h-3" /> {task.effort}h
                      </span>
                      <span>•</span>
                      <span>Due: {task.deadline}</span>
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  task.priority === 'High' 
                    ? 'bg-rose-100 text-rose-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
