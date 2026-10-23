import React, { useEffect } from 'react';
import {
  X,
  Bookmark,
  PlayCircle,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { TOOL_ICONS } from '../data/toolIcons.ts';

interface WorkspaceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedToolIds: string[];
  allTools: ToolDefinition[];
  onSelectTool: (toolId: string) => void;
  onRemoveFromWorkspace: (toolId: string) => void;
  onClearWorkspace: () => void;
  isSimulatorDone: (toolId: string) => boolean;
  getTimeSpent: (toolId: string) => number;
}

export function WorkspaceDrawer({
  isOpen,
  onClose,
  savedToolIds,
  allTools,
  onSelectTool,
  onRemoveFromWorkspace,
  onClearWorkspace,
  isSimulatorDone,
  getTimeSpent
}: WorkspaceDrawerProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const savedTools = allTools.filter(t => savedToolIds.includes(t.id));

  const formatTime = (secs: number) => {
    if (!secs || secs < 60) return `${secs || 0}s`;
    const mins = Math.floor(secs / 60);
    return `${mins}m ${secs % 60}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="workspace-drawer-title"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
              <Bookmark className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <h3 id="workspace-drawer-title" className="text-base font-bold text-white leading-tight">
                Personal Workspace
              </h3>
              <p className="text-2xs text-slate-300 font-medium">
                {savedTools.length} {savedTools.length === 1 ? 'framework' : 'frameworks'} saved locally
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close workspace drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {savedTools.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200 shadow-xs">
                <Bookmark className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Your Workspace is Empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Click <strong>"Save to Workspace"</strong> on any simulator to bookmark frameworks for quick access during executive reviews.
              </p>
            </div>
          ) : (
            savedTools.map(tool => {
              const ToolIcon = tool.icon || TOOL_ICONS[tool.id] || Layers;
              const isDone = isSimulatorDone(tool.id);
              const dwellSecs = getTimeSpent(tool.id);

              return (
                <div
                  key={tool.id}
                  className="p-3.5 bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-all shadow-2xs group relative"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      onClick={() => {
                        onSelectTool(tool.id);
                        onClose();
                      }}
                      className="cursor-pointer flex-1 min-w-0"
                    >
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-3xs font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                          {tool.category.split('&')[0].trim()}
                        </span>
                        {isDone && (
                          <span className="text-3xs font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            Completed
                          </span>
                        )}
                        {dwellSecs > 0 && (
                          <span className="text-3xs text-slate-500 font-mono flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            {formatTime(dwellSecs)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0">
                          <ToolIcon className="w-3.5 h-3.5 text-indigo-600" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {tool.name}
                        </h4>
                      </div>

                      <p className="text-2xs text-slate-600 mt-1 line-clamp-2">
                        {tool.tagline}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0 pt-0.5">
                      <button
                        onClick={() => {
                          onSelectTool(tool.id);
                          onClose();
                        }}
                        className="p-1.5 text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-lg transition-colors cursor-pointer"
                        title={`Launch ${tool.shortName} Simulator`}
                        aria-label={`Launch ${tool.shortName} Simulator`}
                      >
                        <PlayCircle className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onRemoveFromWorkspace(tool.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove from workspace"
                        aria-label="Remove from workspace"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {savedTools.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 shrink-0 flex items-center justify-between gap-3 text-xs">
            <button
              onClick={onClearWorkspace}
              className="text-2xs font-semibold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
            >
              Clear All ({savedTools.length})
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
