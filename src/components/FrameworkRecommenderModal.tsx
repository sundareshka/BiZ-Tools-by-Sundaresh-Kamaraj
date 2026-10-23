import React, { useState, useEffect } from 'react';
import {
  X,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  PlayCircle,
  Layers,
  RotateCcw
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { TOOL_ICONS } from '../data/toolIcons.ts';

interface FrameworkRecommenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  allTools: ToolDefinition[];
  onSelectTool: (toolId: string) => void;
}

interface RecommendationChain {
  title: string;
  narrative: string;
  expectedOutcome: string;
  tools: {
    id: string;
    stage: '1. Diagnosis & Discovery' | '2. Strategy Formulation' | '3. Execution & Control';
    rationale: string;
  }[];
}

export function FrameworkRecommenderModal({
  isOpen,
  onClose,
  allTools,
  onSelectTool
}: FrameworkRecommenderModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [challenge, setChallenge] = useState<string>('growth');
  const [horizon, setHorizon] = useState<string>('tactical');
  const [dataAsset, setDataAsset] = useState<string>('market');

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Compute recommendation based on user selections
  const getRecommendation = (): RecommendationChain => {
    if (challenge === 'growth') {
      return {
        title: 'New Market Entry & Commercial Scaling Stack',
        narrative: 'Designed to systematically evaluate competitive whitespace, structure customer acquisition economics, and align operational milestones.',
        expectedOutcome: 'Identified defensible market positioning with positive unit economics and verified payback velocity.',
        tools: [
          { id: 'swot', stage: '1. Diagnosis & Discovery', rationale: 'Audit internal core competencies and external threats before committing capital.' },
          { id: 'ansoff', stage: '2. Strategy Formulation', rationale: 'Quantify growth vectors across market penetration vs product development.' },
          { id: 'okrs', stage: '3. Execution & Control', rationale: 'Cascade strategic ambitions into quarterly quantitative key results.' }
        ]
      };
    }

    if (challenge === 'turnaround') {
      return {
        title: 'Crisis Triage & Working Capital Resilience Stack',
        narrative: 'Rapidly identifies systemic operational variance, preserves liquidity runway, and mitigates existential supply chain exposures.',
        expectedOutcome: 'Restored cash conversion cycle velocity with prioritized critical failure mitigation actions.',
        tools: [
          { id: 'breakeven', stage: '1. Diagnosis & Discovery', rationale: 'Calculate minimum volume thresholds to protect positive operating margins.' },
          { id: 'fmea', stage: '2. Strategy Formulation', rationale: 'Quantify failure modes by severity, occurrence, and detection.' },
          { id: 'kanban', stage: '3. Execution & Control', rationale: 'Cap work-in-progress inventory to unblock throughput bottlenecks.' }
        ]
      };
    }

    if (challenge === 'product') {
      return {
        title: 'Product-Market Fit & Value Proposition Validation Stack',
        narrative: 'Deconstructs target customer pain points into high-leverage feature releases with clear unit economics.',
        expectedOutcome: 'Validated core value proposition with defensible pricing tier architecture.',
        tools: [
          { id: 'jtbd', stage: '1. Diagnosis & Discovery', rationale: 'Uncover the foundational customer jobs, pains, and desired gains.' },
          { id: 'vpc', stage: '2. Strategy Formulation', rationale: 'Map pain relievers directly to product feature capabilities.' },
          { id: 'rice', stage: '3. Execution & Control', rationale: 'Prioritize feature backlogs using Reach, Impact, Confidence, and Effort.' }
        ]
      };
    }

    if (challenge === 'financial') {
      return {
        title: 'Enterprise Capital Efficiency & Valuation Stack',
        narrative: 'Decomposes shareholder value drivers across profit margins, capital intensity, and working capital cycles.',
        expectedOutcome: 'Transparent return-on-equity attribution model with cash flow projections.',
        tools: [
          { id: 'dupont', stage: '1. Diagnosis & Discovery', rationale: 'Deconstruct ROE into Net Margin, Asset Turnover, and Financial Leverage.' },
          { id: 'workingcapital', stage: '2. Strategy Formulation', rationale: 'Optimize Days Sales Outstanding and Inventory Holding Periods.' },
          { id: 'dcf', stage: '3. Execution & Control', rationale: 'Model long-term enterprise valuation and terminal growth hurdles.' }
        ]
      };
    }

    // Default / operations
    return {
      title: 'Operational Excellence & Waste Elimination Stack',
      narrative: 'Eliminates systemic variance, visualizes end-to-end value streams, and aligns departmental execution.',
      expectedOutcome: 'Reduced production lead time with reduced defect rates per million opportunities.',
      tools: [
        { id: 'vsm', stage: '1. Diagnosis & Discovery', rationale: 'Map current-state value stream to identify non-value-added waste.' },
        { id: 'dmaic', stage: '2. Strategy Formulation', rationale: 'Execute root cause analysis and statistical variance reduction.' },
        { id: 'kaizen', stage: '3. Execution & Control', rationale: 'Deploy rapid continuous improvement sprint cycles across front-line teams.' }
      ]
    };
  };

  const rec = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recommender-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xs font-mono font-bold tracking-wider uppercase text-indigo-300">
                Decision Diagnostic Engine
              </div>
              <h3 id="recommender-title" className="text-lg font-bold text-white">
                Executive Framework Recommender
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagnostic Steps Indicator */}
        <div className="px-6 py-3 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-500">
            {step <= 3 ? `Step ${step} of 3` : 'Recommended 3-Tool Sequential Chain'}
          </span>
          {step > 1 && (
            <button
              onClick={() => setStep(1)}
              className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-xs text-slate-800">
          {/* STEP 1: Strategic Challenge */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  1. What is your primary executive mandate or immediate challenge?
                </h4>
                <p className="text-slate-500">
                  Select the core business objective you need to analyze or solve.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'growth', label: 'Commercial Growth & Market Expansion', desc: 'New markets, product launch, revenue acceleration' },
                  { id: 'turnaround', label: 'Crisis Management & Margin Triage', desc: 'Cost overruns, cash drain, operational bottlenecks' },
                  { id: 'product', label: 'Product-Market Fit & Feature Prioritization', desc: 'Customer pains, value proposition, roadmap clarity' },
                  { id: 'financial', label: 'Capital Allocation & Enterprise Valuation', desc: 'ROE breakdown, DCF, liquidity runway' },
                  { id: 'operations', label: 'Process Excellence & Waste Elimination', desc: 'Lead time compression, Six Sigma quality, Kanban flow' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setChallenge(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      challenge === opt.id
                        ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-950 font-bold shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-slate-900">{opt.label}</div>
                    <div className="text-2xs text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Next: Planning Horizon</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Horizon */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  2. What is the time horizon and urgency for this initiative?
                </h4>
                <p className="text-slate-500">
                  Defines the analytical fidelity and execution velocity.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'immediate', label: 'Immediate Triage (Hours / Next 14 Days)', desc: 'Rapid decision rules, break-even thresholds, emergency triage' },
                  { id: 'tactical', label: 'Tactical Execution (Quarterly / 30-90 Days)', desc: 'Sprint targets, OKR cascades, cross-functional resource sync' },
                  { id: 'strategic', label: 'Long-Term Strategic (1 to 3+ Years)', desc: 'Macro market positioning, M&A valuation, enterprise transformation' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setHorizon(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      horizon === opt.id
                        ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-950 font-bold shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-slate-900">{opt.label}</div>
                    <div className="text-2xs text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  Back
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Next: Data Availability</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Data Assets */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  3. What data inputs are readily available to your team?
                </h4>
                <p className="text-slate-500">
                  Select your strongest empirical data foundation.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'qualitative', label: 'Executive Intuition & Cross-Functional Consensus', desc: 'Subjective scores, internal workshop alignment, customer feedback' },
                  { id: 'market', label: 'Competitive Intelligence & Market Reports', desc: 'Industry growth rates, competitor share, pricing benchmarks' },
                  { id: 'financial', label: 'Audited Financials, Ledger & Unit Economics', desc: 'P&L statements, COGS breakdown, customer acquisition costs' },
                  { id: 'telemetry', label: 'Operational Telemetry & Product Usage Data', desc: 'Throughput cycle times, defect logs, funnel drop-off analytics' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setDataAsset(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      dataAsset === opt.id
                        ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-950 font-bold shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-slate-900">{opt.label}</div>
                    <div className="text-2xs text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  Back
                </button>

                <button
                  onClick={() => setStep(4)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Recommended Stack</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: RECOMMENDATION RESULT */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl space-y-1.5">
                <span className="text-3xs font-mono font-bold uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                  Tailored Executive Recommendation
                </span>
                <h4 className="text-base font-bold text-indigo-950">
                  {rec.title}
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  {rec.narrative}
                </p>
                <div className="text-2xs text-emerald-800 font-semibold flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Expected Deliverable: {rec.expectedOutcome}</span>
                </div>
              </div>

              {/* 3-Tool Chain Steps */}
              <div className="space-y-3">
                {rec.tools.map((t, idx) => {
                  const toolDef = allTools.find(item => item.id === t.id);
                  const ToolIcon = toolDef?.icon || TOOL_ICONS[t.id] || Compass;

                  return (
                    <div
                      key={t.id}
                      className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-start justify-between gap-3 shadow-2xs hover:border-indigo-300 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0 font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="text-3xs font-mono font-bold text-slate-500 uppercase">
                            {t.stage}
                          </div>
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mt-0.5">
                            <ToolIcon className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{toolDef?.name || t.id.toUpperCase()}</span>
                          </div>
                          <p className="text-slate-600 text-2xs mt-1">
                            {t.rationale}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onSelectTool(t.id);
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0 mt-1"
                        title={`Launch ${toolDef?.shortName || t.id} Simulator`}
                      >
                        <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Simulate</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Launch First Tool CTA */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                <button
                  onClick={() => setStep(1)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  Start Over
                </button>

                <button
                  onClick={() => {
                    onSelectTool(rec.tools[0].id);
                    onClose();
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <PlayCircle className="w-4 h-4 text-indigo-200" />
                  <span>Launch Tool 1 ({rec.tools[0].id.toUpperCase()}) Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
