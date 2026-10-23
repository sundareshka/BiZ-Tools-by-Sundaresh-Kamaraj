import { useState, useEffect, useCallback } from 'react';

export interface UserProgressData {
  completedSimulators: string[];
  completedQuizzes: string[];
  quizAnswers: Record<string, number>;
  simulatorTimeSpent: Record<string, number>; // in seconds
  savedWorkspace?: string[]; // IDs of tools saved in the user's workspace
  lastUpdated?: number;
}

const STORAGE_KEY = 'stratlearn_user_progress_v1';
const EVENT_NAME = 'stratlearn_progress_updated';

const DEFAULT_PROGRESS: UserProgressData = {
  completedSimulators: [],
  completedQuizzes: [],
  quizAnswers: {},
  simulatorTimeSpent: {},
  savedWorkspace: [],
  lastUpdated: Date.now()
};

export function loadUserProgress(): UserProgressData {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      completedSimulators: Array.isArray(parsed.completedSimulators) ? parsed.completedSimulators : [],
      completedQuizzes: Array.isArray(parsed.completedQuizzes) ? parsed.completedQuizzes : [],
      quizAnswers: parsed.quizAnswers && typeof parsed.quizAnswers === 'object' ? parsed.quizAnswers : {},
      simulatorTimeSpent: parsed.simulatorTimeSpent && typeof parsed.simulatorTimeSpent === 'object' ? parsed.simulatorTimeSpent : {},
      savedWorkspace: Array.isArray(parsed.savedWorkspace) ? parsed.savedWorkspace : [],
      lastUpdated: parsed.lastUpdated || Date.now()
    };
  } catch (e) {
    console.error('Failed to load user progress from localStorage', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(data: UserProgressData): void {
  if (typeof window === 'undefined') return;
  try {
    const payload = {
      ...data,
      lastUpdated: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: payload }));
  } catch (e) {
    console.error('Failed to save user progress to localStorage', e);
  }
}

export function toggleSimulatorComplete(toolId: string): boolean {
  const current = loadUserProgress();
  const exists = current.completedSimulators.includes(toolId);
  const nextSimulators = exists
    ? current.completedSimulators.filter(id => id !== toolId)
    : [...current.completedSimulators, toolId];

  saveUserProgress({
    ...current,
    completedSimulators: nextSimulators
  });

  return !exists;
}

export function setSimulatorComplete(toolId: string, isComplete: boolean): void {
  const current = loadUserProgress();
  const exists = current.completedSimulators.includes(toolId);
  if (exists === isComplete) return;

  const nextSimulators = isComplete
    ? [...current.completedSimulators, toolId]
    : current.completedSimulators.filter(id => id !== toolId);

  saveUserProgress({
    ...current,
    completedSimulators: nextSimulators
  });
}

export function saveQuizAnswersAndCheckCompletion(
  answersUpdate: Record<string, number>,
  toolQuestionsMap: Record<string, string[]> // toolId -> array of questionIds
): void {
  const current = loadUserProgress();
  const mergedAnswers = {
    ...current.quizAnswers,
    ...answersUpdate
  };

  // Re-evaluate which tools have their full quiz answered
  const completedQuizSet = new Set<string>(current.completedQuizzes);

  Object.entries(toolQuestionsMap).forEach(([toolId, qIds]) => {
    if (qIds.length > 0 && qIds.every(qId => mergedAnswers[qId] !== undefined)) {
      completedQuizSet.add(toolId);
    }
  });

  saveUserProgress({
    ...current,
    quizAnswers: mergedAnswers,
    completedQuizzes: Array.from(completedQuizSet)
  });
}

export function toggleQuizComplete(toolId: string): boolean {
  const current = loadUserProgress();
  const exists = current.completedQuizzes.includes(toolId);
  const nextQuizzes = exists
    ? current.completedQuizzes.filter(id => id !== toolId)
    : [...current.completedQuizzes, toolId];

  saveUserProgress({
    ...current,
    completedQuizzes: nextQuizzes
  });

  return !exists;
}

export function markAllSimulatorsComplete(allToolIds: string[]): void {
  const current = loadUserProgress();
  const merged = Array.from(new Set([...current.completedSimulators, ...allToolIds]));
  saveUserProgress({
    ...current,
    completedSimulators: merged
  });
}

export function markPillarComplete(pillarToolIds: string[], type: 'simulators' | 'quizzes' | 'both' = 'both'): void {
  const current = loadUserProgress();
  let nextSims = current.completedSimulators;
  let nextQuizzes = current.completedQuizzes;

  if (type === 'simulators' || type === 'both') {
    nextSims = Array.from(new Set([...nextSims, ...pillarToolIds]));
  }
  if (type === 'quizzes' || type === 'both') {
    nextQuizzes = Array.from(new Set([...nextQuizzes, ...pillarToolIds]));
  }

  saveUserProgress({
    ...current,
    completedSimulators: nextSims,
    completedQuizzes: nextQuizzes
  });
}

export function addSimulatorTimeSpent(toolId: string, secondsToAdd: number): void {
  if (typeof window === 'undefined' || secondsToAdd <= 0) return;
  const current = loadUserProgress();
  const currentSecs = current.simulatorTimeSpent[toolId] || 0;
  saveUserProgress({
    ...current,
    simulatorTimeSpent: {
      ...current.simulatorTimeSpent,
      [toolId]: currentSecs + secondsToAdd
    }
  });
}

export function toggleSaveToWorkspace(toolId: string): boolean {
  const current = loadUserProgress();
  const saved = current.savedWorkspace || [];
  const exists = saved.includes(toolId);
  const nextSaved = exists
    ? saved.filter(id => id !== toolId)
    : [...saved, toolId];

  saveUserProgress({
    ...current,
    savedWorkspace: nextSaved
  });

  return !exists;
}

export function isToolInWorkspace(toolId: string): boolean {
  const current = loadUserProgress();
  return (current.savedWorkspace || []).includes(toolId);
}

export function seedSamplePerformanceData(): void {
  const current = loadUserProgress();
  const sampleCompleted = [
    'swot',
    'blueocean',
    'dupont',
    'breakeven',
    'workingcapital',
    'bmc',
    'jtbd',
    'kanban',
    'sixsigma',
    'growthhacking',
    'riskmatrix',
    'kpis'
  ];

  const sampleTimes: Record<string, number> = {
    swot: 480, // 8m
    blueocean: 720, // 12m
    dupont: 900, // 15m
    breakeven: 420, // 7m
    workingcapital: 660, // 11m
    bmc: 840, // 14m
    jtbd: 540, // 9m
    kanban: 360, // 6m
    sixsigma: 780, // 13m
    growthhacking: 600, // 10m
    riskmatrix: 690, // 11.5m
    kpis: 750 // 12.5m
  };

  saveUserProgress({
    ...current,
    completedSimulators: Array.from(new Set([...current.completedSimulators, ...sampleCompleted])),
    simulatorTimeSpent: {
      ...current.simulatorTimeSpent,
      ...sampleTimes
    }
  });
}

export function getToolComplexity(
  difficulty?: string,
  horizon?: string,
  scope?: string
): {
  score: number; // 1-10
  level: 'Foundational' | 'Moderate' | 'High' | 'Executive';
  color: string;
} {
  let score = 5.0;
  const diffLower = (difficulty || '').toLowerCase();
  if (diffLower.includes('beginner')) score = 3.5;
  else if (diffLower.includes('intermediate')) score = 6.5;
  else if (diffLower.includes('advanced')) score = 9.0;

  const horizonLower = (horizon || '').toLowerCase();
  if (horizonLower.includes('strategic') || horizonLower.includes('3-5')) score += 0.5;

  const scopeLower = (scope || '').toLowerCase();
  if (scopeLower.includes('enterprise')) score += 0.5;

  score = Math.min(10, Math.max(1, Math.round(score * 10) / 10));

  let level: 'Foundational' | 'Moderate' | 'High' | 'Executive' = 'Moderate';
  let color = '#6366f1'; // indigo
  if (score <= 4.0) {
    level = 'Foundational';
    color = '#10b981'; // emerald
  } else if (score <= 7.0) {
    level = 'Moderate';
    color = '#3b82f6'; // blue
  } else if (score <= 8.5) {
    level = 'High';
    color = '#f59e0b'; // amber
  } else {
    level = 'Executive';
    color = '#ef4444'; // rose
  }

  return { score, level, color };
}

export function resetAllUserProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: DEFAULT_PROGRESS }));
  } catch (e) {
    console.error('Failed to reset user progress', e);
  }
}

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgressData>(() => loadUserProgress());

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<UserProgressData>;
      if (customEvent.detail) {
        setProgress(customEvent.detail);
      } else {
        setProgress(loadUserProgress());
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setProgress(loadUserProgress());
      }
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const toggleSimulator = useCallback((toolId: string) => {
    return toggleSimulatorComplete(toolId);
  }, []);

  const toggleQuiz = useCallback((toolId: string) => {
    return toggleQuizComplete(toolId);
  }, []);

  const isSimulatorDone = useCallback(
    (toolId: string) => progress.completedSimulators.includes(toolId),
    [progress.completedSimulators]
  );

  const isQuizDone = useCallback(
    (toolId: string) => progress.completedQuizzes.includes(toolId),
    [progress.completedQuizzes]
  );

  const isSavedInWorkspace = useCallback(
    (toolId: string) => (progress.savedWorkspace || []).includes(toolId),
    [progress.savedWorkspace]
  );

  const toggleWorkspace = useCallback((toolId: string) => {
    return toggleSaveToWorkspace(toolId);
  }, []);

  const getTimeSpent = useCallback(
    (toolId: string) => progress.simulatorTimeSpent?.[toolId] || 0,
    [progress.simulatorTimeSpent]
  );

  const addTimeSpent = useCallback((toolId: string, seconds: number) => {
    addSimulatorTimeSpent(toolId, seconds);
  }, []);

  return {
    progress,
    toggleSimulator,
    toggleQuiz,
    toggleWorkspace,
    isSimulatorDone,
    isQuizDone,
    isSavedInWorkspace,
    getTimeSpent,
    addTimeSpent,
    seedSampleData: seedSamplePerformanceData,
    markAllSimulators: markAllSimulatorsComplete,
    markPillar: markPillarComplete,
    resetProgress: resetAllUserProgress
  };
}
