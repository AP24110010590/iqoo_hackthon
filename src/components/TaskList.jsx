import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { 
  CheckSquare, 
  Trash2, 
  Plus, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Tag
} from 'lucide-react';

export const TaskList = () => {
  const { tasks, toggleTaskComplete, deleteTask, setActiveTab } = useTaskContext();
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">

      {/* Top Header & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-blue-600" />
              All Captured Tasks ({tasks.length})
            </h2>
            <p className="text-xs text-slate-500">Full task repository & metadata</p>
          </div>

          <button
            onClick={() => setActiveTab('capture')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              filter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Pending ({tasks.filter(t => !t.completed).length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              filter === 'completed' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Completed ({tasks.filter(t => t.completed).length})
          </button>
        </div>
      </div>

      {/* Task Cards List */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
          <AlertCircle className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-xs font-bold text-slate-700">No tasks found</p>
          <p className="text-[11px] text-slate-400">Try changing your filter or add a new task.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredTasks.map((task) => (
            <div 
              key={task.id}
              className={`p-4 rounded-2xl border transition-all ${
                task.completed ? 'bg-slate-50/80 border-slate-200' : 'bg-white border-slate-200/80 shadow-sm hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTaskComplete(task.id)}
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-blue-500'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>

                  <div>
                    <h3 className={`text-xs font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </h3>

                    {/* Metadata Grid */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1 text-blue-600 font-semibold">
                        <Clock className="w-3 h-3" /> Effort: {task.effort}h
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> Deadline: {task.deadline}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Tag className="w-3 h-3" /> Source: {task.source || 'Manual'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                    task.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {task.priority}
                  </span>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
