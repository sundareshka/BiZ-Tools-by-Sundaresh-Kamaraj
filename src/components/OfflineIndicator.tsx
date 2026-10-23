import React from 'react';
import { WifiOff, Database } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus.ts';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900/95 text-white text-xs font-semibold shadow-xl border border-amber-500/40 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
      <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
      <span className="font-bold text-amber-200">Offline Mode Active</span>
      <span className="text-3xs text-slate-300 border-l border-slate-700 pl-2 hidden sm:inline">
        All 57 frameworks & simulators cached
      </span>
    </div>
  );
};
