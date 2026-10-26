import React, { useEffect } from 'react';
import { X, Keyboard, Command, Sparkles } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Cmd / Ctrl + K', action: 'Global Search & Quick Jump', desc: 'Search across all 57 tools, categories, and frameworks' },
    { key: '[  /  ]', action: 'Previous / Next Framework', desc: 'Navigate sequentially across the active pillar simulation stack' },
    { key: 'A', action: 'Strategy Health Audit', desc: 'Open 10-indicator executive radar assessment and action plan' },
    { key: 'W', action: 'Toggle Save to Workspace', desc: 'Bookmark or unbookmark active framework to local workspace' },
    { key: 'E', action: 'View Mock Examples Modal', desc: 'Open realistic industry templates (SaaS, DTC, Industrial)' },
    { key: 'C', action: 'Compare within Pillar', desc: 'Toggle side-by-side benchmark comparison with peer tools' },
    { key: 'S', action: 'Share Deep-Link URL', desc: 'Generate and copy active configuration URL to clipboard' },
    { key: 'R', action: 'Framework Recommender', desc: 'Open 3-step strategic challenge diagnostic wizard' },
    { key: 'Space / M / R', action: 'Flashcard Study Controls', desc: 'Space to flip card, M to mark Mastered, R to mark Review' },
    { key: '?', action: 'Keyboard Shortcuts Cheatsheet', desc: 'Show this keyboard navigation cheatsheet' },
    { key: 'Esc', action: 'Close Modal or Drawer', desc: 'Dismiss any active overlay or slide-out drawer' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 id="shortcuts-title" className="text-base font-bold text-white leading-tight">
                Keyboard Shortcuts
              </h3>
              <p className="text-2xs text-slate-300">
                Speed up executive analysis and navigation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="p-5 divide-y divide-slate-100 text-xs">
          {shortcuts.map((sc, i) => (
            <div key={i} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-slate-900">{sc.action}</div>
                <div className="text-2xs text-slate-500">{sc.desc}</div>
              </div>
              <kbd className="px-2.5 py-1 bg-slate-100 border border-slate-300 font-mono text-2xs font-bold text-slate-800 rounded-md shadow-2xs shrink-0 whitespace-nowrap">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
