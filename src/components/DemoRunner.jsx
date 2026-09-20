import React, { useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { 
  Sparkles, 
  Camera, 
  Cpu, 
  Calendar, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export const DemoRunner = () => {
  const { isDemoRunning, setIsDemoRunning, demoStep, setDemoStep, resetToDemoState, setActiveTab } = useTaskContext();

  if (!isDemoRunning) return null;

  const handleNextStep = () => {
    if (demoStep === 1) {
      setDemoStep(2);
    } else if (demoStep === 2) {
      setDemoStep(3);
    } else if (demoStep === 3) {
      resetToDemoState();
      setIsDemoRunning(false);
      setActiveTab('plan');
    }
  };

  const handleClose = () => {
    setIsDemoRunning(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-5 relative">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Step Counter */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Hackathon Presentation Demo</h3>
              <p className="text-[11px] font-bold text-blue-600">Step {demoStep} of 3</p>
            </div>
          </div>

          <div className="flex gap-1">
            <div className={`w-3 h-1.5 rounded-full ${demoStep >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
            <div className={`w-3 h-1.5 rounded-full ${demoStep >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
            <div className={`w-3 h-1.5 rounded-full ${demoStep >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          </div>
        </div>

        {/* STEP 1: CAPTURE WHITEBOARD */}
        {demoStep === 1 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase">1. CAPTURE</span>
              <h4 className="text-base font-bold text-slate-900">Whiteboard Photo Intake</h4>
              <p className="text-xs text-slate-500">Student snaps photo of a classroom whiteboard</p>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 border border-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80" 
                alt="Whiteboard Photo"
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-blue-900/20">
                <div className="w-full h-1 bg-sky-400 shadow-[0_0_15px_#38bdf8] animate-laser-scan absolute"></div>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1 font-mono text-slate-700">
              <p className="font-bold text-slate-900">📷 Captured Content:</p>
              <p>• ML Assignment – Friday – 2h</p>
              <p>• Java Viva – Tomorrow – 2h</p>
              <p>• DBMS Project – Monday – 3h</p>
            </div>
          </div>
        )}

        {/* STEP 2: UNDERSTAND / OCR EXTRACTION */}
        {demoStep === 2 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase">2. UNDERSTAND</span>
              <h4 className="text-base font-bold text-slate-900">AI Task & Deadline Extraction</h4>
              <p className="text-xs text-slate-500">Computer Vision extracts structured tasks & effort</p>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-900">Java Viva Preparation</p>
                  <p className="text-[10px] text-slate-500">Due: Tomorrow • Effort: 2 hrs</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">High</span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-900">ML Assignment</p>
                  <p className="text-[10px] text-slate-500">Due: Friday • Effort: 2 hrs</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">High</span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-900">DBMS Project</p>
                  <p className="text-[10px] text-slate-500">Due: Monday • Effort: 3 hrs</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Medium</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: WORKLOAD BALANCER & PLAN */}
        {demoStep === 3 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase">3. PLAN & ACT</span>
              <h4 className="text-base font-bold text-slate-900">AI Workload Balancer Output</h4>
              <p className="text-xs text-slate-500">Balances 7 hours total task effort against 4h daily limit</p>
            </div>

            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 text-xs space-y-2">
              <p className="font-bold text-blue-900">AI Workload Rationale:</p>
              <p className="text-slate-700 leading-relaxed">
                "You have 4 hours available today. The AI scheduled Java Viva (2h) + ML Assignment (2h) for Today (4h total), and automatically moved DBMS Project (3h) to tomorrow to avoid overloading your day."
              </p>
            </div>

            <div className="space-y-1.5 text-xs font-semibold">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 flex justify-between">
                <span>Today: Java Viva + ML Assignment</span>
                <span className="font-bold">4 Hours</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex justify-between">
                <span>Tomorrow: DBMS Project</span>
                <span className="font-bold">3 Hours</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handleClose}
            className="w-1/3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleNextStep}
            className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span>{demoStep === 3 ? 'Load Schedule Plan' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
