/**
 * Snap2Action AI Engine
 * Handles Natural Language Parsing, OCR Simulation, and AI Workload Balancing.
 */

// Preset OCR samples for demo and testing
export const OCR_PRESETS = [
  {
    id: 'whiteboard',
    title: 'Classroom Whiteboard',
    category: 'Classroom / Lecture',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    rawText: `CS402 - Machine Learning & DB Systems\n------------------------------------\n1. ML Assignment - Submit Friday (2 hours)\n2. Java Viva Preparation - Due Tomorrow (2 hours)\n3. DBMS Project - Final Submission Monday (3 hours)`,
    extractedTasks: [
      { title: 'Java Viva Preparation', deadline: 'Tomorrow', effort: 2, priority: 'High', source: 'Whiteboard OCR' },
      { title: 'ML Assignment', deadline: 'Friday', effort: 2, priority: 'High', source: 'Whiteboard OCR' },
      { title: 'DBMS Project', deadline: 'Monday', effort: 3, priority: 'Medium', source: 'Whiteboard OCR' }
    ]
  },
  {
    id: 'assignment',
    title: 'Printed Assignment Sheet',
    category: 'Document Scan',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    rawText: `DEPARTMENT OF COMPUTER SCIENCE\nSoftware Engineering Lab Quiz - Thursday (1.5 hrs)\nSystem Architecture Design Review - Next Monday (4 hrs)`,
    extractedTasks: [
      { title: 'SE Lab Quiz Prep', deadline: 'Thursday', effort: 1.5, priority: 'High', source: 'Document OCR' },
      { title: 'System Architecture Review', deadline: 'Monday', effort: 4, priority: 'Medium', source: 'Document OCR' }
    ]
  },
  {
    id: 'poster',
    title: 'Campus Hackathon Poster',
    category: 'Event Flyer',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    rawText: `iQOO HACKATHON 2026\nSubmission Deadline: Saturday 11:59 PM\nRecommended Effort: 6 hours pitch & prototype prep`,
    extractedTasks: [
      { title: 'iQOO Hackathon Prototype Prep', deadline: 'Saturday', effort: 6, priority: 'High', source: 'Poster OCR' }
    ]
  }
];

/**
 * Natural Language Task Parser
 * Extracts structured task info from user speech or typed text.
 */
export function parseNaturalLanguage(input) {
  if (!input || !input.trim()) return null;

  const text = input.trim();
  let effort = 2; // Default 2 hours if unspecified
  let deadline = 'Tomorrow'; // Default deadline
  let priority = 'Medium';
  let title = text;

  // Extract Effort in hours / minutes
  const hoursMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:hrs?|hours?|h)/i);
  const minsMatch = text.match(/(\d+)\s*(?:mins?|minutes?|m)/i);

  if (hoursMatch) {
    effort = parseFloat(hoursMatch[1]);
  } else if (minsMatch) {
    effort = Math.round((parseInt(minsMatch[1], 10) / 60) * 10) / 10;
  }

  // Extract Deadline keywords
  const lowerText = text.toLowerCase();
  if (lowerText.includes('today')) deadline = 'Today';
  else if (lowerText.includes('tomorrow')) deadline = 'Tomorrow';
  else if (lowerText.includes('friday')) deadline = 'Friday';
  else if (lowerText.includes('monday')) deadline = 'Monday';
  else if (lowerText.includes('thursday')) deadline = 'Thursday';
  else if (lowerText.includes('wednesday')) deadline = 'Wednesday';
  else if (lowerText.includes('tuesday')) deadline = 'Tuesday';
  else if (lowerText.includes('saturday')) deadline = 'Saturday';
  else if (lowerText.includes('sunday')) deadline = 'Sunday';
  else if (lowerText.includes('next week')) deadline = 'Next Week';

  // Extract Priority keywords
  if (lowerText.includes('urgent') || lowerText.includes('high priority') || lowerText.includes('asap') || lowerText.includes('viva') || lowerText.includes('quiz')) {
    priority = 'High';
  } else if (lowerText.includes('low priority') || lowerText.includes('whenever') || lowerText.includes('optional')) {
    priority = 'Low';
  }

  // Clean title by removing deadline/time buzzwords if applicable
  title = title
    .replace(/(?:due|submit|by|around|about)?\s*(?:today|tomorrow|friday|monday|thursday|wednesday|tuesday|saturday|sunday|next week)/gi, '')
    .replace(/(?:around|about|approx)?\s*\d+(?:\.\d+)?\s*(?:hrs?|hours?|h|mins?|minutes?|m)/gi, '')
    .replace(/(?:high|medium|low|urgent)\s*priority/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Capitalize title
  if (title.length > 0) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
  } else {
    title = text;
  }

  return {
    id: 'task-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    title,
    deadline,
    effort,
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
    source: 'Natural Language'
  };
}

/**
 * AI Workload Balancer Logic (Key Hackathon Differentiator)
 * Balances tasks based on available hours today, task effort, deadlines, and priorities.
 */
export function runWorkloadBalancer(tasks, availableHoursToday = 4) {
  if (!tasks || tasks.length === 0) {
    return {
      todayTasks: [],
      tomorrowTasks: [],
      upcomingTasks: [],
      explanation: 'No active tasks to balance.',
      totalHoursToday: 0,
      availableHoursToday,
      capacityPercentage: 0
    };
  }

  // Priority & Deadline Weighting Map
  const deadlineWeights = {
    'Today': 100,
    'Tomorrow': 80,
    'Thursday': 60,
    'Friday': 50,
    'Saturday': 40,
    'Sunday': 30,
    'Monday': 20,
    'Next Week': 10
  };

  const priorityWeights = {
    'High': 30,
    'Medium': 20,
    'Low': 10
  };

  // Sort uncompleted tasks by urgency score
  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const scoredTasks = activeTasks.map(task => {
    const deadlineScore = deadlineWeights[task.deadline] || 25;
    const priorityScore = priorityWeights[task.priority] || 20;
    return {
      ...task,
      score: deadlineScore + priorityScore
    };
  });

  scoredTasks.sort((a, b) => b.score - a.score);

  const todayTasks = [];
  const tomorrowTasks = [];
  const upcomingTasks = [];
  let currentHoursAcc = 0;

  for (const task of scoredTasks) {
    if (currentHoursAcc + task.effort <= availableHoursToday || todayTasks.length === 0) {
      // If it fits into today's limit (or if it's the single highest priority item), add to today
      if (currentHoursAcc + task.effort <= availableHoursToday) {
        todayTasks.push({ ...task, scheduledDay: 'Today' });
        currentHoursAcc += task.effort;
      } else {
        // Exceeds capacity, move to tomorrow
        tomorrowTasks.push({ ...task, scheduledDay: 'Tomorrow' });
      }
    } else {
      // Overflows today's capacity -> shift to tomorrow or upcoming
      if (tomorrowTasks.reduce((acc, t) => acc + t.effort, 0) < availableHoursToday) {
        tomorrowTasks.push({ ...task, scheduledDay: 'Tomorrow' });
      } else {
        upcomingTasks.push({ ...task, scheduledDay: 'Later' });
      }
    }
  }

  const capacityPercentage = Math.min(100, Math.round((currentHoursAcc / availableHoursToday) * 100));

  // Generate Smart AI Rationale Explanation
  let explanation = '';
  if (tomorrowTasks.length > 0) {
    const overflowNames = tomorrowTasks.map(t => t.title).join(', ');
    explanation = `You have ${availableHoursToday} hours available today. The AI allocated ${todayTasks.map(t => `${t.title} (${t.effort}h)`).join(' and ')} to today, and automatically rescheduled ${overflowNames} to tomorrow to keep your day stress-free and realistic.`;
  } else if (todayTasks.length > 0) {
    explanation = `All ${todayTasks.length} active tasks fit perfectly within your ${availableHoursToday}-hour budget today (${currentHoursAcc}h total scheduled). Great job staying on track!`;
  } else {
    explanation = `You have completed all scheduled tasks for today! Enjoy your free time or add new assignments using Snap or Voice.`;
  }

  return {
    todayTasks,
    tomorrowTasks,
    upcomingTasks,
    completedTasks,
    explanation,
    totalHoursToday: currentHoursAcc,
    availableHoursToday,
    capacityPercentage
  };
}

/**
 * Generate Visual Hourly Timeline Slots for Today Plan
 */
export function generateTodayTimeline(todayTasks) {
  const timeline = [];
  let currentHour = 9; // Starts at 9:00 AM

  todayTasks.forEach((task, idx) => {
    const startHourStr = formatHour(currentHour);
    currentHour += task.effort;
    const endHourStr = formatHour(currentHour);

    timeline.push({
      id: `slot-${task.id}`,
      task,
      timeSlot: `${startHourStr} - ${endHourStr}`,
      isBreak: false
    });

    // Insert lunch/coffee break around 1:00 PM (13:00) if continuous work > 3 hrs
    if (currentHour >= 12.5 && currentHour < 14 && idx < todayTasks.length - 1) {
      timeline.push({
        id: `break-${idx}`,
        task: { title: '🔋 Recommended Break & Reset', effort: 1, isBreak: true },
        timeSlot: `${formatHour(currentHour)} - ${formatHour(currentHour + 1)}`,
        isBreak: true
      });
      currentHour += 1;
    }
  });

  return timeline;
}

function formatHour(decimalHour) {
  const hrs = Math.floor(decimalHour);
  const mins = Math.round((decimalHour - hrs) * 60);
  const period = hrs >= 12 ? 'PM' : 'AM';
  const displayHrs = hrs > 12 ? hrs - 12 : (hrs === 0 ? 12 : hrs);
  const minsStr = mins > 0 ? `:${mins < 10 ? '0' : ''}${mins}` : ':00';
  return `${displayHrs}${minsStr} ${period}`;
}
