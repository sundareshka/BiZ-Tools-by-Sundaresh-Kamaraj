import React, { useState, useMemo } from 'react';
import {
  X,
  SplitSquareVertical,
  ArrowRight,
  Sparkles,
  Layers,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Plus,
  Play,
  RotateCcw,
  Presentation
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { getToolIcon } from '../data/toolIcons.ts';
import { saveDeckSlide } from '../utils/slideDeck.ts';

interface MultiFrameworkWorkbenchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allTools: ToolDefinition[];
  initialToolIdA?: string;
  initialToolIdB?: string;
  onLaunchTool: (toolId: string) => void;
}

export function MultiFrameworkWorkbenchModal({
  isOpen,
  onClose,
  allTools,
  initialToolIdA = 'wardley',
  initialToolIdB = 'blueocean',
  onLaunchTool
}: MultiFrameworkWorkbenchModalProps) {
  const [toolIdA, setToolIdA] = useState<string>(initialToolIdA);
  const [toolIdB, setToolIdB] = useState<string>(initialToolIdB);
  const [marketVelocity, setMarketVelocity] = useState<number>(65); // 0-100%
  const [competitivePressure, setCompetitivePressure] = useState<number>(75); // 0-100%
  const [capitalConstraint, setCapitalConstraint] = useState<number>(50); // 0-100%
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toolA = useMemo(() => allTools.find(t => t.id === toolIdA) || allTools[0], [allTools, toolIdA]);
  const toolB = useMemo(() => allTools.find(t => t.id === toolIdB) || allTools[1] || allTools[0], [allTools, toolIdB]);

  // Compute Synergy & Dialectic Insights
  const synergyEvaluation = useMemo(() => {
    const sameCategory = toolA.category === toolB.category;
    const sameHorizon = toolA.horizon === toolB.horizon;
    const sameScope = toolA.scope === toolB.scope;

    let baseSynergy = 72;
    if (sameCategory) baseSynergy += 8;
    if (sameHorizon) baseSynergy += 6;
    if (!sameScope) baseSynergy += 10; // Complementary scopes (e.g. Enterprise + Squad) are valuable

    const synergyScore = Math.min(98, Math.max(55, baseSynergy));

    // Dialectic Analysis
    const strategicTension = sameHorizon
      ? `Synchronized Horizon: Both frameworks operate in ${toolA.horizon}, creating high execution focus but requiring strong resource discipline.`
      : `Bimodal Horizon Tension: ${toolA.name} focuses on ${toolA.horizon}, whereas ${toolB.name} addresses ${toolB.horizon}. Essential for ambidextrous governance.`;

    const synthesisInsight = `Combining ${toolA.name} with ${toolB.name} creates an executive bridge between ${toolA.corePurpose.slice(0, 60)}... and ${toolB.corePurpose.slice(0, 60)}...`;

    return {
      synergyScore,
      strategicTension,
      synthesisInsight,
      recommendedSequence: `${toolA.shortName} → ${toolB.shortName}`
    };
  }, [toolA, toolB]);

  if (!isOpen) return null;

  const IconA = toolA.icon || getToolIcon(toolA.id);
  const IconB = toolB.icon || getToolIcon(toolB.id);

  const handleAddToDeck = () => {
    saveDeckSlide({
      toolId: `${toolA.id}-${toolB.id}`,
      toolName: `${toolA.shortName} + ${toolB.shortName} Dual Studio`,
      pillar: 'Strategic Synthesis',
      title: `Dual Analysis: ${toolA.name} & ${toolB.name}`,
      executiveSummary: synergyEvaluation.synthesisInsight,
      keyMetrics: [
        { label: 'Synergy Score', value: `${synergyEvaluation.synergyScore}%`, trend: 'up' },
        { label: 'Market Velocity Factor', value: `${marketVelocity}%` },
        { label: 'Competitive Pressure', value: `${competitivePressure}%` }
      ],
      strategicRecommendations: [
        `Apply ${toolA.shortName} for diagnostic baseline and mapping`,
        `Sequence into ${toolB.shortName} for opportunity execution`,
        `Stress-test quarterly against dynamic competitive feedback`
      ],
      notes: 'Captured from Multi-Framework Dual Studio workbench.'
    });
    setToastMsg('Dual Framework Analysis added to Board Deck!');
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <SplitSquareVertical className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base">Multi-Framework Strategy Workbench</span>
                <span className="text-3xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/80 px-2 py-0.5 rounded">
                  Dual Studio
                </span>
              </div>
              <p className="text-3xs text-slate-400">
                Stress-test 2 frameworks simultaneously to reveal strategic synergies and blindspots
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToDeck}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Save dual analysis into presentation deck"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Add to Deck</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workbench Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Framework Selectors Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            {/* Framework A Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold uppercase tracking-wider text-slate-500">
                  Framework Alpha (A)
                </span>
                <span className="text-3xs font-mono text-slate-400">{toolA.category}</span>
              </div>
              <select
                value={toolIdA}
                onChange={e => setToolIdA(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer shadow-2xs"
              >
                {allTools.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.shortName})
                  </option>
                ))}
              </select>
            </div>

            {/* Framework B Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold uppercase tracking-wider text-slate-500">
                  Framework Beta (B)
                </span>
                <span className="text-3xs font-mono text-slate-400">{toolB.category}</span>
              </div>
              <select
                value={toolIdB}
                onChange={e => setToolIdB(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer shadow-2xs"
              >
                {allTools.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.shortName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Strategic Synergy Score Banner */}
          <div className="p-4 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-indigo-800/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                  Cross-Framework Synthesis
                </span>
                <span className="text-3xs font-mono font-bold bg-indigo-800/80 text-white px-2 py-0.5 rounded">
                  Recommended: {synergyEvaluation.recommendedSequence}
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {synergyEvaluation.synthesisInsight}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 bg-slate-950/60 p-3 rounded-xl border border-indigo-700/50">
              <div className="text-right">
                <div className="text-3xs text-slate-400 font-extrabold uppercase">Synergy Index</div>
                <div className="text-2xl font-black text-emerald-400 tabular-nums">
                  {synergyEvaluation.synergyScore}%
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-indigo-500/30 border-t-emerald-400 flex items-center justify-center font-bold text-xs">
                ★
              </div>
            </div>
          </div>

          {/* Side-by-Side Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tool A Card */}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                    <IconA className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{toolA.name}</h3>
                    <span className="text-3xs text-slate-500 font-medium">{toolA.tagline}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onLaunchTool(toolA.id);
                  }}
                  className="px-2.5 py-1 text-3xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current text-emerald-400" />
                  Launch Sim
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-0.5">Core Purpose:</span>
                  {toolA.corePurpose}
                </div>
                <div className="grid grid-cols-2 gap-2 text-3xs">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200/60">
                    <span className="text-slate-400 block font-bold">Horizon</span>
                    <span className="font-bold text-slate-800">{toolA.horizon}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200/60">
                    <span className="text-slate-400 block font-bold">Scope</span>
                    <span className="font-bold text-slate-800">{toolA.scope}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tool B Card */}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                    <IconB className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{toolB.name}</h3>
                    <span className="text-3xs text-slate-500 font-medium">{toolB.tagline}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onLaunchTool(toolB.id);
                  }}
                  className="px-2.5 py-1 text-3xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current text-emerald-400" />
                  Launch Sim
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-0.5">Core Purpose:</span>
                  {toolB.corePurpose}
                </div>
                <div className="grid grid-cols-2 gap-2 text-3xs">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200/60">
                    <span className="text-slate-400 block font-bold">Horizon</span>
                    <span className="font-bold text-slate-800">{toolB.horizon}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200/60">
                    <span className="text-slate-400 block font-bold">Scope</span>
                    <span className="font-bold text-slate-800">{toolB.scope}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Environment Stress-Testing Sliders */}
          <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Simulated Market Environment Stress-Test
                </span>
              </div>
              <span className="text-3xs font-mono text-slate-400">
                Real-time dynamic parameter sensitivity
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between text-2xs">
                  <span className="text-slate-400">Market Velocity / Tech Shift</span>
                  <span className="font-mono text-indigo-400 font-bold">{marketVelocity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={marketVelocity}
                  onChange={e => setMarketVelocity(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-2xs">
                  <span className="text-slate-400">Competitive Rivalry</span>
                  <span className="font-mono text-amber-400 font-bold">{competitivePressure}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={competitivePressure}
                  onChange={e => setCompetitivePressure(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-2xs">
                  <span className="text-slate-400">Capital Buffer Constraint</span>
                  <span className="font-mono text-rose-400 font-bold">{capitalConstraint}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={capitalConstraint}
                  onChange={e => setCapitalConstraint(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Dynamic Dialectic: </span>
                {synergyEvaluation.strategicTension} At {competitivePressure}% rivalry and {marketVelocity}% velocity, prioritizing {toolA.shortName} creates structural defensibility, while {toolB.shortName} prevents commodity obsolescence.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Toast */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-slate-900 text-white rounded-xl shadow-xl text-xs font-bold border border-slate-700 animate-in fade-in">
            {toastMsg}
          </div>
        )}
      </div>
    </div>
  );
}
