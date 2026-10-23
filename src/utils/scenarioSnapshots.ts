export interface ScenarioSnapshot {
  id: string;
  toolId: string;
  toolName: string;
  name: string;
  notes: string;
  timestamp: number;
  dateFormatted: string;
  presetType?: 'custom' | 'tech' | 'consumer' | 'industrial';
  dataSummary: { label: string; value: string }[];
}

const STORAGE_KEY = 'biztools_scenario_snapshots';
const EVENT_NAME = 'biztools_snapshots_updated';

export function loadAllSnapshots(): ScenarioSnapshot[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load scenario snapshots', e);
    return [];
  }
}

export function saveAllSnapshots(snapshots: ScenarioSnapshot[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: snapshots }));
  } catch (e) {
    console.error('Failed to save scenario snapshots', e);
  }
}

export function createScenarioSnapshot(
  toolId: string,
  toolName: string,
  name: string,
  notes: string,
  dataSummary: { label: string; value: string }[],
  presetType: 'custom' | 'tech' | 'consumer' | 'industrial' = 'custom'
): ScenarioSnapshot {
  const current = loadAllSnapshots();
  const now = Date.now();
  const newSnapshot: ScenarioSnapshot = {
    id: `snap-${toolId}-${now}`,
    toolId,
    toolName,
    name: name.trim() || `Snapshot ${new Date(now).toLocaleDateString()}`,
    notes: notes.trim(),
    timestamp: now,
    dateFormatted: new Date(now).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    presetType,
    dataSummary
  };

  const updated = [newSnapshot, ...current];
  saveAllSnapshots(updated);
  return newSnapshot;
}

export function deleteScenarioSnapshot(id: string): void {
  const current = loadAllSnapshots();
  const updated = current.filter(s => s.id !== id);
  saveAllSnapshots(updated);
}

export function getSnapshotsForTool(toolId: string): ScenarioSnapshot[] {
  const all = loadAllSnapshots();
  return all.filter(s => s.toolId === toolId);
}
