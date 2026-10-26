import React, { useState } from 'react';
import {
  Sparkles,
  Building2,
  TrendingUp,
  RotateCcw,
  Camera,
  Layers,
  Check,
  Presentation,
  FileText,
  Building,
  Info,
  ExternalLink
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { getCorporateBenchmarksForTool, CorporateBenchmark } from '../data/corporateBenchmarks.ts';

interface SimulatorPresetToolbarProps {
  tool: ToolDefinition;
  activePresetId: string | null;
  onSelectPreset: (presetId: string, presetName: string, inputs: { label: string; value: string }[]) => void;
  onResetDefault: () => void;
  onOpenSnapshots: () => void;
  snapshotCount: number;
  onAddToDeck?: () => void;
  onCopyMemo?: () => void;
}

export function SimulatorPresetToolbar({
  tool,
  activePresetId,
  onSelectPreset,
  onResetDefault,
  onOpenSnapshots,
  snapshotCount,
  onAddToDeck,
  onCopyMemo
}: SimulatorPresetToolbarProps) {
  const [presetTab, setPresetTab] = useState<'corporate' | 'industry'>('corporate');
  const [activeBenchmark, setActiveBenchmark] = useState<CorporateBenchmark | null>(null);

  // Corporate benchmarks for this tool
  const corporateBenchmarks = getCorporateBenchmarksForTool(tool.id, tool.caseStudy?.company);

  // Industry archetypes for the active tool
  const industryPresets = [
    {
      id: 'preset-saas',
      name: 'B2B Enterprise SaaS',
      icon: TrendingUp,
      badge: 'ARR $42M',
      color: 'hover:border-indigo-400 hover:bg-indigo-50/50',
      activeColor: 'bg-indigo-50 text-indigo-900 border-indigo-300 font-bold shadow-2xs',
      inputs: [
        { label: 'Strategic Segment', value: 'Enterprise Workflow Automation & FinTech' },
        { label: 'Primary Driver', value: `Scaling ${tool.shortName} cadence across North American expansion` },
        { label: 'Horizon & Cadence', value: tool.horizon || 'Quarterly OKR cycles' },
        { label: 'Key Output Focus', value: tool.keyOutput }
      ]
    },
    {
      id: 'preset-dtc',
      name: 'Consumer DTC & Retail',
      icon: Building2,
      badge: 'Rev $28M',
      color: 'hover:border-amber-400 hover:bg-amber-50/50',
      activeColor: 'bg-amber-50 text-amber-900 border-amber-300 font-bold shadow-2xs',
      inputs: [
        { label: 'Strategic Segment', value: 'Omnichannel Functional Health & 2,400 Retail Doors' },
        { label: 'Primary Driver', value: `Applying ${tool.shortName} to defend 64% gross margins against channel cannibalization` },
        { label: 'Execution Scope', value: tool.scope || 'Business unit operations' },
        { label: 'Key Output Focus', value: tool.keyOutput }
      ]
    },
    {
      id: 'preset-industrial',
      name: 'Advanced Industrial OEM',
      icon: Layers,
      badge: 'Rev $160M',
      color: 'hover:border-cyan-400 hover:bg-cyan-50/50',
      activeColor: 'bg-cyan-50 text-cyan-900 border-cyan-300 font-bold shadow-2xs',
      inputs: [
        { label: 'Strategic Segment', value: 'Tier-1 Precision Components & Automation CapEx' },
        { label: 'Primary Driver', value: `Deploying ${tool.shortName} across $14M capital re-shoring program` },
        { label: 'Risk Factor', value: 'Supply chain volatility and long-tail vendor concentration' },
        { label: 'Key Output Focus', value: tool.keyOutput }
      ]
    }
  ];

  const handleSelectCorporateBenchmark = (bench: CorporateBenchmark) => {
    setActiveBenchmark(bench);
    const inputs = bench.metrics.map(m => ({
      label: m.label,
      value: `${m.value} (${m.note || ''})`
    }));
    inputs.unshift({ label: 'Corporate Entity', value: `${bench.companyName} (${bench.industry})` });
    inputs.push({ label: 'Strategic Takeaway', value: bench.strategicTakeaway });
    onSelectPreset(bench.id, bench.companyName, inputs);
  };

  const handleReset = () => {
    setActiveBenchmark(null);
    onResetDefault();
  };

  return (
    <div className="space-y-2">
      <div className="bg-slate-50 border border-slate-200/90 rounded-xl px-3 py-2.5 flex flex-col xl:flex-row xl:items-center justify-between gap-3 text-xs shadow-2xs">
        {/* Left: Mode toggle (Corporate Benchmarks vs Industry Archetypes) + Preset pills */}
        <div className="flex items-center gap-2 overflow-x-auto min-w-0 flex-1 pb-1 xl:pb-0">
          {/* Segmented Preset Mode Switch */}
          <div className="flex items-center bg-slate-200/70 p-0.5 rounded-lg shrink-0 border border-slate-300/60">
            <button
              onClick={() => setPresetTab('corporate')}
              className={`px-2 py-1 text-2xs font-bold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                presetTab === 'corporate'
                  ? 'bg-white text-indigo-950 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building className="w-3 h-3 text-indigo-600" />
              <span>Corporate ({corporateBenchmarks.length})</span>
            </button>
            <button
              onClick={() => setPresetTab('industry')}
              className={`px-2 py-1 text-2xs font-bold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                presetTab === 'industry'
                  ? 'bg-white text-indigo-950 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Archetypes</span>
            </button>
          </div>

          <div className="h-4 w-px bg-slate-200 shrink-0" />

          {/* Reset Baseline Button */}
          <button
            onClick={handleReset}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 shrink-0 border ${
              !activePresetId
                ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-2xs'
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Reset to default theoretical baseline model"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Default</span>
          </button>

          {/* Corporate Benchmarks List */}
          {presetTab === 'corporate' && (
            <div className="flex items-center gap-1.5 shrink-0">
              {corporateBenchmarks.map(bench => {
                const isSelected = activePresetId === bench.id;
                return (
                  <button
                    key={bench.id}
                    onClick={() => handleSelectCorporateBenchmark(bench)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                      isSelected
                        ? 'bg-indigo-50 text-indigo-950 border-indigo-300 font-bold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/40'
                    }`}
                    title={`Load real-world financial & operational metrics for ${bench.companyName} (${bench.headlineMetric})`}
                  >
                    <span className="text-sm">{bench.logoInitial}</span>
                    <span>{bench.companyName}</span>
                    <span className="text-3xs font-mono font-semibold px-1 py-0.2 rounded bg-indigo-100/70 text-indigo-800">
                      {bench.headlineMetric}
                    </span>
                    {isSelected && <Check className="w-3 h-3 text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Industry Archetypes List */}
          {presetTab === 'industry' && (
            <div className="flex items-center gap-1.5 shrink-0">
              {industryPresets.map(p => {
                const Icon = p.icon;
                const isSelected = activePresetId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveBenchmark(null);
                      onSelectPreset(p.id, p.name, p.inputs);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                      isSelected
                        ? p.activeColor
                        : `bg-white border-slate-200 text-slate-700 ${p.color}`
                    }`}
                    title={`Load ${p.name} (${p.badge}) baseline`}
                  >
                    <Icon className={`w-3 h-3 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{p.name}</span>
                    <span className="text-3xs font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-500">
                      {p.badge}
                    </span>
                    {isSelected && <Check className="w-3 h-3 text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Quick C-Suite Export Actions (Add to Deck, Copy Memo, Snapshots) */}
        <div className="flex items-center gap-1.5 shrink-0 self-end xl:self-auto border-t xl:border-t-0 pt-1.5 xl:pt-0 border-slate-200 w-full xl:w-auto justify-end flex-wrap">
          {/* Add to Board Deck Slide */}
          {onAddToDeck && (
            <button
              onClick={onAddToDeck}
              className="px-2.5 py-1 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 hover:border-indigo-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title="Add this simulator state & takeaway directly to your executive Board Deck Presentation"
            >
              <Presentation className="w-3.5 h-3.5 text-indigo-600" />
              <span>Add to Deck</span>
            </button>
          )}

          {/* Copy Executive Memo */}
          {onCopyMemo && (
            <button
              onClick={onCopyMemo}
              className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title="Copy a structured executive strategy memo in Markdown to your clipboard"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <span>Copy Memo</span>
            </button>
          )}

          {/* Snapshot Vault Trigger */}
          <button
            onClick={onOpenSnapshots}
            className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            title="Open Scenario Snapshot Vault to save or compare versioned simulator models"
          >
            <Camera className="w-3.5 h-3.5 text-indigo-600" />
            <span>Snapshots</span>
            <span className="text-3xs font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 px-1.5 py-0.2 rounded-full">
              {snapshotCount}
            </span>
          </button>
        </div>
      </div>

      {/* Active Corporate Benchmark Context Banner (When a real company is loaded) */}
      {activeBenchmark && (
        <div className="p-3 bg-gradient-to-r from-indigo-50/90 via-white to-indigo-50/60 border border-indigo-200/90 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-2xs animate-in fade-in duration-200">
          <div className="flex items-start gap-2.5">
            <span className="text-xl p-1 bg-white rounded-lg border border-indigo-100 shadow-2xs shrink-0">
              {activeBenchmark.logoInitial}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-slate-900 text-xs">
                  {activeBenchmark.companyName}
                </span>
                {activeBenchmark.ticker && (
                  <span className="text-3xs font-mono font-bold px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                    {activeBenchmark.ticker}
                  </span>
                )}
                <span className="text-slate-400">·</span>
                <span className="text-slate-600 font-medium">{activeBenchmark.industry}</span>
                <span className="text-slate-400">·</span>
                <span className="text-indigo-700 font-bold">{activeBenchmark.headlineMetric}</span>
              </div>
              <p className="text-2xs text-slate-600 mt-0.5 leading-relaxed">
                <span className="font-semibold text-indigo-900">Strategic Rationale: </span>
                {activeBenchmark.strategicTakeaway}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-indigo-100/80">
            {activeBenchmark.metrics.map((m, i) => (
              <div key={i} className="px-2 py-1 bg-white border border-indigo-100 rounded-lg text-center shadow-2xs">
                <span className="text-3xs text-slate-400 block font-medium truncate">{m.label}</span>
                <span className="text-xs font-extrabold text-indigo-950 font-mono tabular-nums">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
