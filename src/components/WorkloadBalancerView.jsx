import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TodayPlanView } from './TodayPlanView';
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Zap, 
  Layers,
  ChevronRight
} from 'lucide-react';

export const WorkloadBalancerView = () => {
  const { 
    workloadState, 
    availableHoursToday, 
    updateAvailableHours, 
    toggleTaskComplete 
  } = useTaskContext();

  const { todayTasks, tomorrowTasks, upcomingTasks, explanation, totalHoursToday, capacityPercentage } = workloadState;

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">

      {/* Visually Prominent AI Workload Balancer Header Badge */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 text-white p-5 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm border border-white/20">
            <Sparkles className="w-3.5 h-3.5 fill-white" />
            AI Workload Balancer
          </span>
          <span className="text-[11px] font-bold text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
            Core Differentiator
          </span>
        </div>

        <h2 className="text-xl font-bold tracking-tight mt-3">Smart Dynamic Scheduling</h2>
        <p className="text-xs text-blue-100 mt-1 leading-relaxed">
          AI analyzes task effort, urgency & available hours to build realistic stress-free plans.
        </p>

        {/* Live Interactive Capacity Slider inside Header */}
        <div className="mt-4 pt-3 border-t border-white/20 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-blue-100 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Available Today Capacity:
            </span>
            <span className="text-white text-sm bg-white/20 px-2.5 py-0.5 rounded-lg border border-white/30">
              {availableHoursToday} Hours
            </span>
          </div>

          <input 
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={availableHoursToday}
            onChange={(e) => updateAvailableHours(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
          />
          <div className="flex justify-between text-[10px] text-blue-200 font-semibold">
            <span>1 Hour</span>
            <span>4 Hours (Default)</span>
            <span>10 Hours</span>
          </div>
        </div>
      </div>

      {/* AI Rationale Natural Language Card */}
      <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-sm space-y-2 relative">
        <div className="flex items-center gap-2 text-xs font-extrabold text-blue-600">
          <Zap className="w-4 h-4 fill-blue-600" />
          <span>AI Execution Strategy & Rationale</span>
        </div>
        <p className="text-xs text-slate-700 font-medium leading-relaxed bg-blue-50/60 p-3 rounded-xl border border-blue-100">
          "{explanation}"
        </p>
      </div>

      {/* Workload Allocation Columns: TODAY vs TOMORROW */}
      <div className="grid grid-cols-1 gap-4">

        {/* TODAY'S SCHEDULED TASKS */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></div>
              <h3 className="text-sm font-bold text-slate-900">Today's Schedule</h3>
            </div>
            <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {totalHoursToday}h / {availableHoursToday}h Total
            </span>
          </div>

          {todayTasks.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 text-center italic">No tasks scheduled for today.</p>
          ) : (
            <div className="space-y-2">
              {todayTasks.map((task) => (
                <div 
                  key={task.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => toggleTaskComplete(task.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{task.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Due: <span className="font-semibold text-slate-700">{task.deadline}</span> • Effort: <span className="font-bold text-blue-600">{task.effort}h</span>
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    task.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TOMORROW'S DEFERRED / OVERFLOW TASKS */}
        {tomorrowTasks.length > 0 && (
          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-100"></div>
                <h3 className="text-sm font-bold text-slate-900">Tomorrow's Schedule (AI Auto-Shifted)</h3>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                {tomorrowTasks.reduce((acc, t) => acc + t.effort, 0)}h Total
              </span>
            </div>

            <div className="space-y-2">
              {tomorrowTasks.map((task) => (
                <div 
                  key={task.id}
                  className="p-3 rounded-xl bg-white border border-amber-200/80 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{task.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Due: <span className="font-semibold text-slate-700">{task.deadline}</span> • Effort: <span className="font-bold text-amber-700">{task.effort}h</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    Shifted to Tomorrow
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Timeline Section */}
      <div className="pt-2">
        <TodayPlanView />
      </div>

    </div>
  );
};
