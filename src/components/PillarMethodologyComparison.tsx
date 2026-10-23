import React, { useState } from 'react';
import {
  ArrowRightLeft,
  X,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Workflow,
  Sparkles,
  ArrowRight,
  Compass,
  Layers,
  ChevronDown,
  PlayCircle
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { TOOL_ICONS } from '../data/toolIcons.ts';

interface PillarMethodologyComparisonProps {
  primaryTool: ToolDefinition;
  secondaryTool: ToolDefinition;
  siblingTools: ToolDefinition[];
  pillarNumber: string;
  pillarName: string;
  onSelectSecondaryTool: (toolId: string) => void;
  onSwapTools: () => void;
  onSwitchSimulator: (toolId: string) => void;
  onClose: () => void;
}

export function PillarMethodologyComparison({
  primaryTool,
  secondaryTool,
  siblingTools,
  pillarNumber,
  pillarName,
  onSelectSecondaryTool,
  onSwapTools,
  onSwitchSimulator,
  onClose
}: PillarMethodologyComparisonProps) {
  const [activeTab, setActiveTab] = useState<'matrix' | 'pros_cons' | 'decision_guide'>('matrix');

  const PrimaryIcon = primaryTool.icon || TOOL_ICONS[primaryTool.id] || Compass;
  const SecondaryIcon = secondaryTool.icon || TOOL_ICONS[secondaryTool.id] || Compass;

  // Check if tools mention each other in pairings or workflow
  const primaryPairsWithSecondary =
    primaryTool.bestPairedWith.toLowerCase().includes(secondaryTool.name.toLowerCase()) ||
    primaryTool.bestPairedWith.toLowerCase().includes(secondaryTool.shortName.toLowerCase());

  const secondaryPairsWithPrimary =
    secondaryTool.bestPairedWith.toLowerCase().includes(primaryTool.name.toLowerCase()) ||
    secondaryTool.bestPairedWith.toLowerCase().includes(primaryTool.shortName.toLowerCase());

  return (
    <div className="bg-white border-2 border-indigo-200/80 rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
              <ArrowRightLeft className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-3xs font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  {pillarNumber}: {pillarName}
                </span>
                <span className="text-2xs text-slate-300 font-medium">
                  Methodology Benchmark & Trade-off Analysis
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2 mt-0.5">
                <span>{primaryTool.shortName}</span>
                <span className="text-indigo-400 font-normal">vs</span>
                <span>{secondaryTool.shortName}</span>
              </h3>
            </div>
          </div>

          {/* Secondary Tool Selector & Action Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-200">
              <span className="text-3xs text-slate-400 font-semibold uppercase tracking-wider hidden sm:inline">
                Compare with:
              </span>
              <div className="relative">
                <select
                  value={secondaryTool.id}
                  onChange={(e) => onSelectSecondaryTool(e.target.value)}
                  className="bg-transparent text-white font-bold text-xs pr-6 cursor-pointer focus:outline-none appearance-none"
                  aria-label="Select secondary framework to compare"
                >
                  {siblingTools.map((tool) => (
                    <option key={tool.id} value={tool.id} className="bg-slate-900 text-white">
                      {tool.shortName} — {tool.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Swap Button */}
            <button
              onClick={onSwapTools}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold"
              title="Swap primary and secondary tools"
              aria-label="Swap primary and secondary tools"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-300" />
              <span className="hidden md:inline">Swap</span>
            </button>

            {/* Launch Secondary Simulator */}
            <button
              onClick={() => onSwitchSimulator(secondaryTool.id)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              title={`Switch main simulator view to ${secondaryTool.name}`}
            >
              <PlayCircle className="w-3.5 h-3.5 text-emerald-200" />
              <span>Simulate {secondaryTool.shortName}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Close comparison panel"
              aria-label="Close comparison panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Specification Matrix
          </button>
          <button
            onClick={() => setActiveTab('pros_cons')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'pros_cons'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Strengths & Limitations
          </button>
          <button
            onClick={() => setActiveTab('decision_guide')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'decision_guide'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            When to Use Which & Chaining
          </button>
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="p-5 space-y-6">
        {/* Header Cards for Both Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primary Tool Card */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 relative">
            <span className="absolute top-3 right-3 text-3xs font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-600 text-white font-mono shadow-2xs">
              Primary (Active Simulator)
            </span>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <PrimaryIcon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 leading-tight">
                  {primaryTool.name}
                </h4>
                <p className="text-2xs text-indigo-700 font-semibold font-mono">
                  Origin: {primaryTool.origin}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              {primaryTool.tagline}
            </p>
          </div>

          {/* Secondary Tool Card */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative">
            <span className="absolute top-3 right-3 text-3xs font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">
              Secondary (Benchmark Peer)
            </span>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                <SecondaryIcon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 leading-tight">
                  {secondaryTool.name}
                </h4>
                <p className="text-2xs text-slate-500 font-semibold font-mono">
                  Origin: {secondaryTool.origin}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              {secondaryTool.tagline}
            </p>
          </div>
        </div>

        {/* TAB 1: SPECIFICATION MATRIX */}
        {activeTab === 'matrix' && (
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase text-3xs tracking-wider">
                    <th className="py-2.5 px-4 w-1/4">Methodological Dimension</th>
                    <th className="py-2.5 px-4 w-3/8 text-indigo-950 bg-indigo-50/50 border-r border-slate-200">
                      {primaryTool.shortName} (Primary)
                    </th>
                    <th className="py-2.5 px-4 w-3/8 text-slate-900">
                      {secondaryTool.shortName} (Secondary)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {/* Core Purpose */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/40">
                      Core Strategic Purpose
                    </td>
                    <td className="py-3 px-4 bg-indigo-50/20 border-r border-slate-200 leading-relaxed">
                      {primaryTool.corePurpose}
                    </td>
                    <td className="py-3 px-4 leading-relaxed">
                      {secondaryTool.corePurpose}
                    </td>
                  </tr>

                  {/* Analytical Scope */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/40">
                      Analytical Scope
                    </td>
                    <td className="py-3 px-4 bg-indigo-50/20 border-r border-slate-200">
                      <span className="font-semibold text-indigo-900">{primaryTool.scope}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">{secondaryTool.scope}</span>
                    </td>
                  </tr>

                  {/* Planning Horizon */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/40">
                      Planning Horizon
                    </td>
                    <td className="py-3 px-4 bg-indigo-50/20 border-r border-slate-200">
                      <span className="px-2 py-0.5 rounded font-mono text-3xs font-bold bg-indigo-100 text-indigo-800">
                        {primaryTool.horizon}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded font-mono text-3xs font-bold bg-slate-100 text-slate-800">
                        {secondaryTool.horizon}
                      </span>
                    </td>
                  </tr>

                  {/* Difficulty & Learning Curve */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/40">
                      Execution Difficulty
                    </td>
                    <td className="py-3 px-4 bg-indigo-50/20 border-r border-slate-200">
                      <span className={`px-2 py-0.5 rounded font-bold text-3xs uppercase tracking-wider ${
                        primaryTool.difficulty === 'Beginner'
                          ? 'bg-emerald-100 text-emerald-800'
                          : primaryTool.difficulty === 'Intermediate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {primaryTool.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-3xs uppercase tracking-wider ${
                        secondaryTool.difficulty === 'Beginner'
                          ? 'bg-emerald-100 text-emerald-800'
                          : secondaryTool.difficulty === 'Intermediate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {secondaryTool.difficulty}
                      </span>
                    </td>
                  </tr>

                  {/* Time to Result */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/40">
                      Time to Initial Result
                    </td>
                    <td className="py-3 px-4 bg-indigo-50/20 border-r border-slate-200 font-mono text-slate-800">
                      {primaryTool.timeToResult}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-800">
                      {secondaryTool.timeToResult}
                    </td>
                  </tr>

                  {/* Data Requirements */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/40">
                      Required Data & Inputs
                    </td>
                    <td className="py-3 px-4 bg-indigo-50/20 border-r border-slate-200 leading-relaxed">
                      {primaryTool.dataNeeds}
                    </td>
                    <td className="py-3 px-4 leading-relaxed">
                      {secondaryTool.dataNeeds}
                    </td>
                  </tr>

                  {/* Primary Output Deliverable */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/40">
                      Key Deliverable / Artifact
                    </td>
                    <td className="py-3 px-4 bg-indigo-50/20 border-r border-slate-200 font-semibold text-indigo-950">
                      {primaryTool.keyOutput}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {secondaryTool.keyOutput}
                    </td>
                  </tr>

                  {/* Target Users */}
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 bg-slate-50/40">
                      Primary User Archetypes
                    </td>
                    <td className="py-3 px-4 bg-indigo-50/20 border-r border-slate-200">
                      <div className="flex flex-wrap gap-1">
                        {primaryTool.primaryUsers.map((u, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-indigo-100/70 text-indigo-900 text-3xs font-semibold">
                            {u}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {secondaryTool.primaryUsers.map((u, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 text-3xs font-semibold">
                            {u}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: STRENGTHS & LIMITATIONS */}
        {activeTab === 'pros_cons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Primary Tool Pros & Cons */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-indigo-200 pb-2">
                <div className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  {primaryTool.name}
                </h4>
              </div>

              {/* Strengths */}
              <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wide">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Key Strengths</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {primaryTool.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-black shrink-0">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              <div className="bg-rose-50/50 border border-rose-200/80 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs uppercase tracking-wide">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Known Pitfalls & Limitations</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {primaryTool.limitations.map((lim, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-black shrink-0">•</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Secondary Tool Pros & Cons */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <div className="w-5 h-5 rounded-md bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  {secondaryTool.name}
                </h4>
              </div>

              {/* Strengths */}
              <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wide">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Key Strengths</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {secondaryTool.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-black shrink-0">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              <div className="bg-rose-50/50 border border-rose-200/80 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs uppercase tracking-wide">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Known Pitfalls & Limitations</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {secondaryTool.limitations.map((lim, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-black shrink-0">•</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WHEN TO USE WHICH & CHAINING */}
        {activeTab === 'decision_guide' && (
          <div className="space-y-5">
            {/* Decision Rule Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/60 space-y-2">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                  <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>When to choose {primaryTool.shortName}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Select <strong className="text-indigo-950 font-bold">{primaryTool.name}</strong> when your immediate mandate is{' '}
                  <span className="font-semibold text-slate-900">{primaryTool.corePurpose.toLowerCase()}</span>. Ideal if your team has{' '}
                  <span className="font-semibold">{primaryTool.timeToResult}</span> and requires a{' '}
                  <span className="font-semibold">{primaryTool.scope.toLowerCase()}</span> perspective producing a concrete{' '}
                  <span className="font-semibold">{primaryTool.keyOutput}</span>.
                </p>
                <div className="pt-2 text-2xs text-indigo-800 font-medium">
                  <strong>Recommended pairs:</strong> {primaryTool.bestPairedWith}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Lightbulb className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>When to choose {secondaryTool.shortName}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Select <strong className="text-slate-950 font-bold">{secondaryTool.name}</strong> when your challenge shifts to{' '}
                  <span className="font-semibold text-slate-900">{secondaryTool.corePurpose.toLowerCase()}</span>. Best utilized when the decision requires{' '}
                  <span className="font-semibold">{secondaryTool.timeToResult}</span> and a{' '}
                  <span className="font-semibold">{secondaryTool.scope.toLowerCase()}</span> analytical lens delivering a{' '}
                  <span className="font-semibold">{secondaryTool.keyOutput}</span>.
                </p>
                <div className="pt-2 text-2xs text-slate-600 font-medium">
                  <strong>Recommended pairs:</strong> {secondaryTool.bestPairedWith}
                </div>
              </div>
            </div>

            {/* Chaining & Workflow Integration */}
            <div className="p-4 rounded-xl border border-amber-200/90 bg-amber-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Workflow className="w-4 h-4 text-amber-600" />
                  <span>Strategic Chaining: Connecting Both Frameworks</span>
                </div>
                {(primaryPairsWithSecondary || secondaryPairsWithPrimary) && (
                  <span className="text-3xs font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Directly Complementary Pair
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                Rather than treating {primaryTool.shortName} and {secondaryTool.shortName} as mutual substitutes, leading executives chain them sequentially in the same strategy cycle:
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs w-full sm:w-1/2 shadow-2xs">
                  <div className="text-3xs font-mono font-bold text-indigo-700 uppercase mb-0.5">
                    Step 1 · {primaryTool.shortName}
                  </div>
                  <div className="font-semibold text-slate-800">
                    {primaryTool.keyOutput}
                  </div>
                  <div className="text-3xs text-slate-500 mt-1">
                    Upstream input: {primaryTool.workflowPlacement.upstream}
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-amber-600 shrink-0 rotate-90 sm:rotate-0" />

                <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs w-full sm:w-1/2 shadow-2xs">
                  <div className="text-3xs font-mono font-bold text-slate-700 uppercase mb-0.5">
                    Step 2 · {secondaryTool.shortName}
                  </div>
                  <div className="font-semibold text-slate-800">
                    {secondaryTool.keyOutput}
                  </div>
                  <div className="text-3xs text-slate-500 mt-1">
                    Downstream synthesis: {secondaryTool.workflowPlacement.downstream}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Switch CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 text-xs">
          <div className="text-slate-500 text-2xs">
            Want to test scenarios with <strong className="text-slate-800">{secondaryTool.name}</strong>?
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-semibold transition-colors cursor-pointer"
            >
              Close Benchmark
            </button>
            <button
              onClick={() => onSwitchSimulator(secondaryTool.id)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5 text-indigo-200" />
              <span>Launch {secondaryTool.name} Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
