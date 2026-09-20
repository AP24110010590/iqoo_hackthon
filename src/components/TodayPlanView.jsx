import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { generateTodayTimeline } from '../utils/aiEngine';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  CheckCircle2, 
  Coffee, 
  Sparkles, 
  Calendar, 
  Circle
} from 'lucide-react';

export const TodayPlanView = () => {
  const { workloadState, toggleTaskComplete } = useTaskContext();
  const { todayTasks } = workloadState;

  const timelineSlots = generateTodayTimeline(todayTasks);

  const handleToggle = (taskId) => {
    toggleTaskComplete(taskId);
    // Trigger celebratory confetti on task completion
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            Today's Timeline Plan
          </h3>
          <p className="text-[11px] text-slate-500">Auto-sequenced based on priority & effort</p>
        </div>
        <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl">
          9:00 AM Start
        </span>
      </div>

      {timelineSlots.length === 0 ? (
        <div className="py-8 text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
          <p className="text-xs font-bold text-slate-800">No scheduled timeline slots</p>
          <p className="text-[11px] text-slate-500">Add tasks using Snap, Voice, or Text input.</p>
        </div>
      ) : (
        <div className="relative pl-4 border-l-2 border-slate-200 space-y-4">
          {timelineSlots.map((slot) => {
            if (slot.isBreak) {
              return (
                <div key={slot.id} className="relative group">
                  <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-400 ring-4 ring-white"></div>
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-amber-900">{slot.task.title}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                      {slot.timeSlot}
                    </span>
                  </div>
                </div>
              );
            }

            const { task } = slot;
            return (
              <div key={slot.id} className="relative group">
                <div className={`absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full ring-4 ring-white transition-colors ${
                  task.completed ? 'bg-emerald-500' : 'bg-blue-600'
                }`}></div>

                <div className={`p-3.5 rounded-2xl border transition-all ${
                  task.completed 
                    ? 'bg-slate-50/70 border-slate-200 opacity-75' 
                    : 'bg-white border-slate-200/80 hover:border-blue-300 shadow-sm'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleToggle(task.id)}
                        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          task.completed 
                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                            : 'border-slate-300 hover:border-blue-500'
                        }`}
                      >
                        {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>

                      <div>
                        <h4 className={`text-xs font-bold ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
                          <span className="text-blue-600 font-semibold">{task.effort} Hours</span>
                          <span>•</span>
                          <span>Due: {task.deadline}</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {slot.timeSlot}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
