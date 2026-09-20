import React, { createContext, useContext, useState, useEffect } from 'react';
import { runWorkloadBalancer } from '../utils/aiEngine';

const TaskContext = createContext();

const INITIAL_TASKS = [
  {
    id: 'demo-1',
    title: 'Java Viva Preparation',
    deadline: 'Tomorrow',
    effort: 2,
    priority: 'High',
    completed: false,
    createdAt: new Date().toISOString(),
    source: 'Whiteboard Scan'
  },
  {
    id: 'demo-2',
    title: 'ML Assignment',
    deadline: 'Friday',
    effort: 2,
    priority: 'High',
    completed: false,
    createdAt: new Date().toISOString(),
    source: 'Whiteboard Scan'
  },
  {
    id: 'demo-3',
    title: 'DBMS Project',
    deadline: 'Monday',
    effort: 3,
    priority: 'Medium',
    completed: false,
    createdAt: new Date().toISOString(),
    source: 'Whiteboard Scan'
  }
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('snap2action_tasks');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch (e) {
      return INITIAL_TASKS;
    }
  });

  const [availableHoursToday, setAvailableHoursToday] = useState(() => {
    try {
      const saved = localStorage.getItem('snap2action_hours');
      return saved ? parseFloat(saved) : 4;
    } catch (e) {
      return 4;
    }
  });

  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'capture' | 'tasks' | 'plan' | 'balancer'
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [activeToast, setActiveToast] = useState(null);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('snap2action_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks', e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('snap2action_hours', availableHoursToday.toString());
    } catch (e) {
      console.error('Failed to save hours', e);
    }
  }, [availableHoursToday]);

  // Compute Workload Balancing whenever tasks or available hours change
  const workloadState = runWorkloadBalancer(tasks, availableHoursToday);

  // Task Handlers
  const addTask = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
    showToast(`Added task: "${newTask.title}"`);
  };

  const addMultipleTasks = (newTasksList) => {
    setTasks(prev => [...newTasksList, ...prev]);
    showToast(`Added ${newTasksList.length} new tasks from AI capture!`);
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextState = !t.completed;
        if (nextState) {
          showToast(`Completed: "${t.title}" 🎉`);
        }
        return { ...t, completed: nextState };
      }
      return t;
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    showToast('Task removed.');
  };

  const updateAvailableHours = (hours) => {
    setAvailableHoursToday(hours);
  };

  const showToast = (message, duration = 3500) => {
    setActiveToast({ id: Date.now(), message });
    setTimeout(() => {
      setActiveToast(null);
    }, duration);
  };

  const resetToDemoState = () => {
    setTasks(INITIAL_TASKS);
    setAvailableHoursToday(4);
    showToast('Reset to demo scenario!');
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        availableHoursToday,
        updateAvailableHours,
        workloadState,
        addTask,
        addMultipleTasks,
        toggleTaskComplete,
        deleteTask,
        activeTab,
        setActiveTab,
        isSyncModalOpen,
        setIsSyncModalOpen,
        isDemoRunning,
        setIsDemoRunning,
        demoStep,
        setDemoStep,
        activeToast,
        showToast,
        resetToDemoState
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
