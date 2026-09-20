import React from 'react';
import { TaskProvider, useTaskContext } from './context/TaskContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { CaptureModal } from './components/CaptureModal';
import { WorkloadBalancerView } from './components/WorkloadBalancerView';
import { TaskList } from './components/TaskList';
import { LaptopSyncModal } from './components/LaptopSyncModal';
import { DemoRunner } from './components/DemoRunner';
import { ReminderToast } from './components/ReminderToast';
import { Smartphone, Monitor } from 'lucide-react';

const MainContent = () => {
  const { activeTab } = useTaskContext();

  return (
    <main className="p-4 max-w-md mx-auto min-h-screen">
      {activeTab === 'home' && <Dashboard />}
      {activeTab === 'capture' && <CaptureModal />}
      {activeTab === 'tasks' && <TaskList />}
      {activeTab === 'plan' && <WorkloadBalancerView />}
    </main>
  );
};

export function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
        
        {/* Desktop Container Wrapper with Mobile Phone Frame aesthetic */}
        <div className="min-h-screen flex flex-col justify-between">
          <div>
            <Navbar />
            <ReminderToast />
            <MainContent />
          </div>

          <BottomNav />
        </div>

        {/* Modal Overlays */}
        <LaptopSyncModal />
        <DemoRunner />

      </div>
    </TaskProvider>
  );
}

export default App;
