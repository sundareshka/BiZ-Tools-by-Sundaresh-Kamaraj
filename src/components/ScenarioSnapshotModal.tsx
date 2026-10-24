import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Camera,
  Trash2,
  GitCompare,
  RotateCcw,
  Check,
  Calendar,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  Plus,
  Share2,
  Download,
  Upload
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import {
  ScenarioSnapshot,
  loadAllSnapshots,
  createScenarioSnapshot,
  deleteScenarioSnapshot,
  getSnapshotsForTool,
  exportAllSnapshotsJSON,
  importSnapshotsJSON,
  encodeSnapshotToURL
} from '../utils/scenarioSnapshots.ts';

interface ScenarioSnapshotModalProps {
  tool: ToolDefinition;
  isOpen: boolean;
  onClose: () => void;
  onApplySnapshot: (snapshot: ScenarioSnapshot) => void;
}

export function ScenarioSnapshotModal({
  tool,
  isOpen,
  onClose,
  onApplySnapshot
}: ScenarioSnapshotModalProps) {
  const [activeTab, setActiveTab] = useState<'vault' | 'create' | 'compare'>('vault');
  const [snapshots, setSnapshots] = useState<ScenarioSnapshot[]>([]);
  const [newName, setNewName] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Compare mode state
  const [compareIdA, setCompareIdA] = useState<string>('');
  const [compareIdB, setCompareIdB] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const toolSnapshots = getSnapshotsForTool(tool.id);
      setSnapshots(toolSnapshots);
      if (toolSnapshots.length >= 2) {
        setCompareIdA(toolSnapshots[0].id);
        setCompareIdB(toolSnapshots[1].id);
      } else if (toolSnapshots.length === 1) {
        setCompareIdA(toolSnapshots[0].id);
      }
    }
  }, [isOpen, tool.id]);

  if (!isOpen) return null;

  const handleCreateSnapshot = (e: React.FormEvent) => {
    e.preventDefault();
    const mockCurrentData = [
      { label: 'Evaluation Scope', value: tool.scope || 'Enterprise-wide' },
      { label: 'Planning Horizon', value: tool.horizon || 'Strategic (1–3 Yrs)' },
      { label: 'Time to First Result', value: tool.timeToResult },
      { label: 'Target Deliverable', value: tool.keyOutput }
    ];

    const created = createScenarioSnapshot(
      tool.id,
      tool.name,
      newName || `${tool.shortName} ${new Date().toLocaleDateString()}`,
      newNotes || 'Saved baseline configuration for executive simulation review.',
      mockCurrentData,
      'custom'
    );

    const updated = getSnapshotsForTool(tool.id);
    setSnapshots(updated);
    setNewName('');
    setNewNotes('');
    setSuccessToast(`Saved snapshot "${created.name}"!`);
    setActiveTab('vault');
    setTimeout(() => setSuccessToast(null), 2500);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleShareUrl = (s: ScenarioSnapshot) => {
    const url = encodeSnapshotToURL(s);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setSuccessToast(`Scenario link copied to clipboard!`);
      setTimeout(() => setSuccessToast(null), 2500);
    }
  };

  const handleExportAll = () => {
    exportAllSnapshotsJSON();
    setSuccessToast(`Exported all scenarios to JSON file!`);
    setTimeout(() => setSuccessToast(null), 2500);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importSnapshotsJSON(content);
        if (result.error) {
          setSuccessToast(`Import error: ${result.error}`);
        } else {
          setSnapshots(getSnapshotsForTool(tool.id));
          setSuccessToast(`Successfully imported ${result.importedCount} scenarios!`);
        }
        setTimeout(() => setSuccessToast(null), 3000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (id: string, name: string) => {
    deleteScenarioSnapshot(id);
    const updated = getSnapshotsForTool(tool.id);
    setSnapshots(updated);
    setSuccessToast(`Deleted snapshot "${name}"`);
    setTimeout(() => setSuccessToast(null), 2500);
  };

  const snapshotA = snapshots.find(s => s.id === compareIdA);
  const snapshotB = snapshots.find(s => s.id === compareIdB);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                Scenario Snapshot Vault
              </h3>
              <p className="text-xs text-slate-500">
                Save, version, and compare custom simulation parameters for <span className="font-semibold text-slate-700">{tool.shortName}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-slate-100 bg-slate-50/50 text-xs">
          <button
            onClick={() => setActiveTab('vault')}
            className={`pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'vault'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Saved Snapshots ({snapshots.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'create'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Snapshot</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'compare'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Side-by-Side Delta</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 max-h-[65vh] overflow-y-auto">
          {/* TAB 1: SAVED SNAPSHOTS */}
          {activeTab === 'vault' && (
            <div className="space-y-3">
              {/* Global Import/Export Bar */}
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-2xs">
                <span className="text-slate-500 font-medium">Backup & Sharing:</span>
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-slate-700 font-semibold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                    title="Import scenarios from JSON"
                  >
                    <Upload className="w-3 h-3 text-slate-500" />
                    <span>Import JSON</span>
                  </button>
                  <button
                    onClick={handleExportAll}
                    className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-slate-700 font-semibold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                    title="Export all scenarios to JSON"
                  >
                    <Download className="w-3 h-3 text-slate-500" />
                    <span>Export JSON</span>
                  </button>
                </div>
              </div>

              {snapshots.length === 0 ? (
                <div className="text-center py-10 px-4 border border-dashed border-slate-200 rounded-xl space-y-3 bg-slate-50/50">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">No snapshots saved yet</h4>
                    <p className="text-xs text-slate-500 mt-0.5 max-w-sm mx-auto">
                      Take a snapshot of your current inputs to compare scenarios or restore anytime.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create First Snapshot</span>
                  </button>
                </div>
              ) : (
                snapshots.map(s => (
                  <div
                    key={s.id}
                    className="p-3.5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all shadow-2xs space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900">{s.name}</h4>
                          <span className="text-3xs font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            {s.dateFormatted}
                          </span>
                        </div>
                        {s.notes && (
                          <p className="text-xs text-slate-600 mt-1 italic font-normal">
                            "{s.notes}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleShareUrl(s)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                          title="Generate shareable URL link for this scenario"
                        >
                          <Share2 className="w-3 h-3 text-slate-500" />
                          <span className="hidden sm:inline">Share</span>
                        </button>

                        <button
                          onClick={() => {
                            onApplySnapshot(s);
                            onClose();
                          }}
                          className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          title="Load this snapshot into the active simulator"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Restore</span>
                        </button>

                        <button
                          onClick={() => handleDelete(s.id, s.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete snapshot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Snapshot Parameter Summary */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-2xs">
                      {s.dataSummary.map((item, idx) => (
                        <div key={idx} className="bg-slate-50 p-2 rounded-lg">
                          <span className="text-slate-400 block truncate font-medium">{item.label}</span>
                          <span className="font-bold text-slate-800 truncate block">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: CREATE SNAPSHOT */}
          {activeTab === 'create' && (
            <form onSubmit={handleCreateSnapshot} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Snapshot Version Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={`e.g. Q4 Baseline Model, Aggressive 2026 Expansion...`}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Executive Notes & Assumptions (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Record strategic hypotheses, macro assumptions, or risk triggers associated with this iteration..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-normal leading-relaxed"
                />
              </div>

              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-2xs text-indigo-900 space-y-1">
                <span className="font-bold block flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  What will be captured:
                </span>
                <p className="text-indigo-800 font-normal">
                  All active parameters, configuration settings, timeline variables, and calculated outputs currently rendered in your {tool.shortName} session.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('vault')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Save Snapshot</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: SIDE-BY-SIDE DELTA */}
          {activeTab === 'compare' && (
            <div className="space-y-4">
              {snapshots.length < 2 ? (
                <div className="text-center py-8 px-4 border border-dashed border-slate-200 rounded-xl space-y-2">
                  <GitCompare className="w-8 h-8 text-slate-300 mx-auto" />
                  <h4 className="text-xs font-bold text-slate-700">Need at least 2 snapshots to compare</h4>
                  <p className="text-2xs text-slate-500">
                    Create at least two snapshots to inspect side-by-side methodology variations.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Selectors */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Snapshot A (Baseline)
                      </label>
                      <select
                        value={compareIdA}
                        onChange={(e) => setCompareIdA(e.target.value)}
                        className="w-full text-xs font-semibold p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                      >
                        {snapshots.map(s => (
                          <option key={s.id} value={s.id}>{s.name} ({s.dateFormatted})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Snapshot B (Comparison)
                      </label>
                      <select
                        value={compareIdB}
                        onChange={(e) => setCompareIdB(e.target.value)}
                        className="w-full text-xs font-semibold p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                      >
                        {snapshots.map(s => (
                          <option key={s.id} value={s.id}>{s.name} ({s.dateFormatted})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Side-by-Side Card Comparison */}
                  {snapshotA && snapshotB && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {/* Column A */}
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                        <div className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-center justify-between">
                          <span>{snapshotA.name}</span>
                          <span className="text-3xs text-slate-400 font-mono">{snapshotA.dateFormatted}</span>
                        </div>
                        {snapshotA.notes && (
                          <p className="text-2xs text-slate-600 italic">"{snapshotA.notes}"</p>
                        )}
                        <div className="space-y-1.5 pt-1">
                          {snapshotA.dataSummary.map((item, idx) => (
                            <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200/80">
                              <span className="text-3xs text-slate-400 font-semibold uppercase block">{item.label}</span>
                              <span className="font-bold text-slate-800 text-xs block">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Column B */}
                      <div className="p-3.5 bg-indigo-50/50 border border-indigo-200 rounded-xl space-y-2 text-xs">
                        <div className="font-bold text-indigo-950 border-b border-indigo-200 pb-1.5 flex items-center justify-between">
                          <span>{snapshotB.name}</span>
                          <span className="text-3xs text-indigo-500 font-mono">{snapshotB.dateFormatted}</span>
                        </div>
                        {snapshotB.notes && (
                          <p className="text-2xs text-indigo-800 italic">"{snapshotB.notes}"</p>
                        )}
                        <div className="space-y-1.5 pt-1">
                          {snapshotB.dataSummary.map((item, idx) => (
                            <div key={idx} className="bg-white p-2 rounded-lg border border-indigo-200/80">
                              <span className="text-3xs text-indigo-400 font-semibold uppercase block">{item.label}</span>
                              <span className="font-bold text-indigo-900 text-xs block">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-2xs text-slate-500">
            Stored locally in browser storage ({snapshots.length} total)
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
