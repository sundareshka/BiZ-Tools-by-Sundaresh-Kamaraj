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

export function exportAllSnapshotsJSON(): void {
  const all = loadAllSnapshots();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(all, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `biztools-scenario-snapshots-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importSnapshotsJSON(jsonString: string): { importedCount: number; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { importedCount: 0, error: 'Invalid JSON format: expected an array of snapshots' };
    }
    const current = loadAllSnapshots();
    const existingIds = new Set(current.map(s => s.id));
    const newItems: ScenarioSnapshot[] = [];

    for (const item of parsed) {
      if (item && item.toolId && item.name) {
        if (!existingIds.has(item.id)) {
          newItems.push(item);
          existingIds.add(item.id);
        } else {
          // generate new ID to avoid clash
          newItems.push({
            ...item,
            id: `snap-${item.toolId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
          });
        }
      }
    }

    const merged = [...newItems, ...current];
    saveAllSnapshots(merged);
    return { importedCount: newItems.length };
  } catch (err: any) {
    return { importedCount: 0, error: err?.message || 'Failed to parse JSON file' };
  }
}

export function encodeSnapshotToURL(snapshot: ScenarioSnapshot): string {
  try {
    const compact = {
      t: snapshot.toolId,
      n: snapshot.name,
      m: snapshot.notes,
      d: snapshot.dataSummary,
      p: snapshot.presetType
    };
    const b64 = btoa(encodeURIComponent(JSON.stringify(compact)));
    const url = new URL(window.location.href);
    url.hash = `scenario=${b64}`;
    return url.toString();
  } catch (err) {
    console.error('Failed to encode snapshot to URL', err);
    return window.location.href;
  }
}

export function decodeSnapshotFromURL(): Partial<ScenarioSnapshot> | null {
  if (typeof window === 'undefined') return null;
  try {
    const hash = window.location.hash;
    const match = hash.match(/scenario=([^&]+)/);
    if (!match) return null;
    const jsonStr = decodeURIComponent(atob(match[1]));
    const parsed = JSON.parse(jsonStr);
    return {
      toolId: parsed.t,
      name: parsed.n,
      notes: parsed.m,
      dataSummary: parsed.d,
      presetType: parsed.p
    };
  } catch (err) {
    console.error('Failed to parse scenario from URL hash', err);
    return null;
  }
}
