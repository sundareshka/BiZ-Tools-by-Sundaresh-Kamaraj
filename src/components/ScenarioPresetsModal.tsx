import React, { useState } from 'react';
import {
  X,
  Briefcase,
  PlayCircle,
  ArrowRight,
  Sparkles,
  Quote,
  Layers,
  CheckCircle2,
  TrendingUp,
  Building2,
  ExternalLink
} from 'lucide-react';
import { INDUSTRY_PRESETS, IndustryPreset } from '../data/industryPresetsData.ts';
import { ToolDefinition } from '../data/toolsData.ts';

interface ScenarioPresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPreset: (preset: IndustryPreset) => void;
  onLaunchTool: (toolId: string) => void;
  activeToolId?: string;
}

export function ScenarioPresetsModal({
  isOpen,
  onClose,
  onApplyPreset,
  onLaunchTool,
  activeToolId
}: ScenarioPresetsModalProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(INDUSTRY_PRESETS[0].id);

  if (!isOpen) return null;

  const currentPreset = INDUSTRY_PRESETS.find(p => p.id === selectedPresetId) || INDUSTRY_PRESETS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="presets-modal-title"
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
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
                <h3 id="presets-modal-title" className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Enterprise Industry Scenario Presets
                </h3>
                <span className="text-3xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase font-semibold">
                  5 Case Studies
                </span>
              </div>
              <p className="text-2xs text-slate-400 mt-0.5">
                Curated real-world scenario models grounded in research by Sundaresh Kamaraj
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close presets modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left List of Presets */}
          <div className="w-full md:w-80 border-r border-slate-200 bg-slate-50/70 p-4 overflow-y-auto space-y-2 shrink-0">
            <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block px-1 mb-2">
              Select Industry Case Study
            </span>
            {INDUSTRY_PRESETS.map((preset) => {
              const isSelected = preset.id === selectedPresetId;
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPresetId(preset.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-indigo-500 shadow-sm ring-1 ring-indigo-500/20'
                      : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-3xs font-bold px-2 py-0.5 rounded border ${preset.badgeColor}`}>
                      {preset.industry.split('&')[0]}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-indigo-600"></span>}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {preset.name}
                  </h4>
                  <p className="text-3xs text-slate-500 mt-1 line-clamp-2">
                    {preset.executiveSummary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Selected Preset Details */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-5 bg-white">
            <div className="space-y-2 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className={`text-2xs font-bold px-2.5 py-0.5 rounded-full border ${currentPreset.badgeColor}`}>
                  {currentPreset.industry}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                {currentPreset.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentPreset.executiveSummary}
              </p>
            </div>

            {/* Strategic Challenge & Sundaresh Insight */}
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1">
                <span className="text-3xs font-bold uppercase tracking-wider text-rose-800 block">
                  Executive Bottleneck / Strategic Challenge
                </span>
                <p className="text-xs text-rose-950 font-medium leading-relaxed">
                  {currentPreset.challenge}
                </p>
              </div>

              <div className="p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-1.5 relative">
                <div className="flex items-center gap-1.5 text-indigo-900 text-3xs font-bold uppercase tracking-wider">
                  <Quote className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Sundaresh Kamaraj · Strategy Thesis</span>
                </div>
                <p className="text-xs text-indigo-950 italic leading-relaxed">
                  "{currentPreset.sundareshInsight}"
                </p>
              </div>
            </div>

            {/* Key Scenario Metrics */}
            <div>
              <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Applied Quantitative Parameters & Benchmarks
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {currentPreset.appliedParameters.map((param, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-3xs uppercase font-extrabold text-slate-400 block truncate">
                      {param.label}
                    </span>
                    <span className="text-xs font-bold text-slate-900 block mt-0.5">
                      {param.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended 4-Framework Strategy Sequence */}
            <div>
              <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Recommended 4-Step Strategic Framework Chain
              </span>
              <div className="space-y-2">
                {currentPreset.toolSequence.map((step, idx) => (
                  <div
                    key={step.toolId}
                    className="p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-3xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{step.toolName}</span>
                          <span className="text-3xs px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded font-mono">
                            {step.pillar}
                          </span>
                        </div>
                        <p className="text-2xs text-slate-500 mt-0.5">{step.rationale}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onLaunchTool(step.toolId);
                      }}
                      className="px-2.5 py-1 text-2xs font-semibold text-indigo-600 hover:text-indigo-800 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-2xs text-slate-500">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Applies real-world executive parameters and targets across the simulator workspace.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onApplyPreset(currentPreset);
                onClose();
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Load Preset into Active Tool</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
