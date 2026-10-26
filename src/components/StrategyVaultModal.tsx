import React, { useState, useRef } from 'react';
import {
  X,
  Database,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  FileJson,
  ShieldCheck,
  Save,
  Sparkles
} from 'lucide-react';
import { loadUserProgress, UserProgressData } from '../utils/userProgress.ts';

interface StrategyVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestoreSuccess: (message: string) => void;
}

export function StrategyVaultModal({
  isOpen,
  onClose,
  onRestoreSuccess
}: StrategyVaultModalProps) {
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExportVault = () => {
    try {
      const progress = loadUserProgress();
      const allLocalStorage: Record<string, any> = {};

      // Collect all BizTools keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key.startsWith('biztools_') ||
          key.startsWith('scenario_snapshots_') ||
          key === 'board_deck_slides' ||
          key === 'user_custom_notes'
        )) {
          try {
            allLocalStorage[key] = JSON.parse(localStorage.getItem(key) || '{}');
          } catch {
            allLocalStorage[key] = localStorage.getItem(key);
          }
        }
      }

      const vaultPayload = {
        meta: {
          app: 'BizTools by Sundaresh Kamaraj',
          version: '1.21.0',
          exportedAt: new Date().toISOString(),
          authorUrl: 'https://sundaresh.blog',
          author: 'Sundaresh Kamaraj'
        },
        progress,
        vaultData: allLocalStorage
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(vaultPayload, null, 2));
      const downloadAnchor = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `biztools-strategy-vault-${dateStr}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setImportStatus({
        success: true,
        message: 'Strategy Vault successfully exported as JSON file!'
      });
      setTimeout(() => setImportStatus(null), 4000);
    } catch (err) {
      console.error('Export vault error:', err);
      setImportStatus({
        success: false,
        message: 'Failed to export strategy vault data.'
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Invalid JSON format');
        }

        // Restore localStorage keys
        if (parsed.vaultData && typeof parsed.vaultData === 'object') {
          Object.entries(parsed.vaultData).forEach(([key, value]) => {
            if (typeof value === 'object') {
              localStorage.setItem(key, JSON.stringify(value));
            } else if (typeof value === 'string') {
              localStorage.setItem(key, value);
            }
          });
        }

        // Restore user progress if present
        if (parsed.progress) {
          localStorage.setItem('biztools_user_progress_v2', JSON.stringify(parsed.progress));
        }

        setImportStatus({
          success: true,
          message: 'Strategy Vault successfully restored from file!'
        });
        onRestoreSuccess('Strategy Vault restored! Updating workspace...');
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1200);
      } catch (err) {
        console.error('Import vault error:', err);
        setImportStatus({
          success: false,
          message: 'Invalid file format. Please upload a valid BizTools Strategy Vault JSON file.'
        });
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSampleVault = () => {
    try {
      const sampleCompleted = ['swot', 'pestle', 'fiveforces', 'vrio', 'ansoff', 'blueocean', 'bmc', 'balancedscorecard', 'okrs', 'riskmatrix'];
      const sampleWorkspace = ['swot', 'fiveforces', 'ansoff', 'blueocean'];
      const sampleProgress = {
        completedSimulators: sampleCompleted,
        completedQuizzes: ['swot', 'pestle', 'fiveforces'],
        quizScores: { swot: 100, pestle: 90, fiveforces: 100 },
        savedWorkspace: sampleWorkspace,
        customScenarioCount: 8,
        totalTimeSpentSeconds: 4320,
        simulatorTimeSpent: { swot: 1200, fiveforces: 900, ansoff: 1100, blueocean: 1120 }
      };

      localStorage.setItem('biztools_user_progress_v2', JSON.stringify(sampleProgress));
      setImportStatus({
        success: true,
        message: 'Loaded sample enterprise executive strategy portfolio!'
      });
      onRestoreSuccess('Loaded sample executive portfolio!');
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error('Failed to load sample vault', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vault-modal-title"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white p-0.5 border border-slate-700 shadow-sm shrink-0">
              <img
                src="/assets/aistudio/Sundaresh_Kamaraj_Logo-01_840f0755.jpg"
                alt="BizTools Logo"
                className="w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="vault-modal-title" className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Strategy Portfolio Vault & Backup
                </h3>
                <span className="text-3xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase font-semibold">
                  JSON Portability
                </span>
              </div>
              <p className="text-2xs text-slate-400 mt-0.5">
                Export, backup, or restore client workspaces across browsers without loss
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close vault modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert */}
        {importStatus && (
          <div className={`p-3 text-xs font-semibold flex items-center gap-2 ${
            importStatus.success ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-200' : 'bg-rose-50 text-rose-800 border-b border-rose-200'
          }`}>
            {importStatus.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
            <span>{importStatus.message}</span>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Export Card */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Download Strategy Vault</h4>
                <p className="text-2xs text-slate-500 leading-relaxed">
                  Export all simulator parameters, saved custom snapshots, board deck slides, and competency records into a portable JSON file.
                </p>
              </div>

              <button
                onClick={handleExportVault}
                className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON File</span>
              </button>
            </div>

            {/* Import Card */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Restore Vault from File</h4>
                <p className="text-2xs text-slate-500 leading-relaxed">
                  Upload an existing `.json` vault backup to immediately restore all your frameworks, case data, and certificates.
                </p>
              </div>

              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".json,application/json"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose JSON File</span>
                </button>
              </div>
            </div>
          </div>

          {/* Enterprise Sample Vault Option */}
          <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-amber-950">Load Sample Executive Portfolio</h5>
                <p className="text-3xs text-amber-800">
                  Pre-loads 10 mastered strategic frameworks with realistic enterprise benchmarks.
                </p>
              </div>
            </div>

            <button
              onClick={handleLoadSampleVault}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors shrink-0 cursor-pointer shadow-2xs"
            >
              Load Sample
            </button>
          </div>

          <div className="text-center text-3xs text-slate-400 font-mono">
            All data is encrypted and retained locally on your browser. Zero telemetry or server logging.
          </div>
        </div>
      </div>
    </div>
  );
}
