import React from 'react';
import {
  Sparkles,
  Building2,
  TrendingUp,
  RotateCcw,
  Camera,
  Layers,
  Check,
  ChevronRight
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';

interface SimulatorPresetToolbarProps {
  tool: ToolDefinition;
  activePresetId: string | null;
  onSelectPreset: (presetId: string, presetName: string, inputs: { label: string; value: string }[]) => void;
  onResetDefault: () => void;
  onOpenSnapshots: () => void;
  snapshotCount: number;
}

export function SimulatorPresetToolbar({
  tool,
  activePresetId,
  onSelectPreset,
  onResetDefault,
  onOpenSnapshots,
  snapshotCount
}: SimulatorPresetToolbarProps) {
  // Generate 3 domain-tailored realistic datasets for the active tool
  const presets = [
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

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-xl px-3 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-xs shadow-2xs">
      {/* Left: Preset Selection Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto min-w-0 w-full md:w-auto pb-1 md:pb-0">
        <span className="text-2xs font-extrabold uppercase tracking-wider text-slate-500 mr-1 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-500" />
          Industry Presets:
        </span>

        {/* Reset / Default Baseline */}
        <button
          onClick={onResetDefault}
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

        {/* 3 Industry Profiles */}
        {presets.map(p => {
          const Icon = p.icon;
          const isSelected = activePresetId === p.id;

          return (
            <button
              key={p.id}
              onClick={() => onSelectPreset(p.id, p.name, p.inputs)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                isSelected
                  ? p.activeColor
                  : `bg-white border-slate-200 text-slate-700 ${p.color}`
              }`}
              title={`Load realistic ${p.name} (${p.badge}) scenario into active simulator`}
            >
              <Icon className={`w-3 h-3 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>{p.name}</span>
              <span className={`text-3xs font-mono px-1 py-0.2 rounded ${
                isSelected ? 'bg-white/80 text-slate-800' : 'bg-slate-100 text-slate-500'
              }`}>
                {p.badge}
              </span>
              {isSelected && <Check className="w-3 h-3 text-indigo-600 ml-0.5" />}
            </button>
          );
        })}
      </div>

      {/* Right: Snapshot Vault Trigger */}
      <div className="flex items-center gap-1.5 shrink-0 self-end md:self-auto border-t md:border-t-0 pt-1.5 md:pt-0 border-slate-200 w-full md:w-auto justify-end">
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
  );
}
