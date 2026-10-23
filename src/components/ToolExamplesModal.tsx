import React, { useState, useEffect } from 'react';
import {
  X,
  Lightbulb,
  Building2,
  TrendingUp,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  FileText,
  BarChart2,
  ArrowRight,
  Compass,
  Layers,
  Coins,
  ExternalLink,
  PlayCircle
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { TOOL_ICONS } from '../data/toolIcons.ts';

interface ToolExamplesModalProps {
  tool: ToolDefinition;
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate?: (scenarioName: string, inputs: { label: string; value: string }[]) => void;
}

interface MockExampleScenario {
  id: string;
  industry: string;
  companyName: string;
  profile: string;
  situation: string;
  mockInputs: { label: string; value: string; note?: string }[];
  keyResults: { metric: string; value: string; badge?: string }[];
  strategicAction: string;
  sampleDeliverableNote: string;
}

export function ToolExamplesModal({ tool, isOpen, onClose, onApplyTemplate }: ToolExamplesModalProps) {
  const [activeTab, setActiveTab] = useState<'case_study' | 'mock_scenarios' | 'use_cases'>('mock_scenarios');
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [copiedScenario, setCopiedScenario] = useState<boolean>(false);

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

  const ToolIcon = tool.icon || TOOL_ICONS[tool.id] || Compass;

  // Generate 3 contextual mock industry scenarios based on the tool's domain and scope
  const mockScenarios: MockExampleScenario[] = [
    {
      id: 'scenario-tech',
      industry: 'Enterprise Software & SaaS',
      companyName: 'Nextera Cloud Systems (ARR $42M)',
      profile: 'B2B enterprise workflow automation platform expanding from mid-market into Global 2000 accounts.',
      situation: `Deploying ${tool.shortName} to evaluate operational viability, prioritize feature rollouts, and optimize unit economics for the annual strategic planning cycle.`,
      mockInputs: [
        { label: 'Primary Target Segment', value: 'Fintech & Insurtech Tier-1 Carriers', note: 'High ACV ($180K+)' },
        { label: 'Current Constraint / Driver', value: tool.corePurpose.slice(0, 60) + '...', note: 'Key Strategic Focus' },
        { label: 'Evaluation Horizon', value: tool.horizon, note: 'Planning window' },
        { label: 'Execution Scope', value: tool.scope, note: 'Organizational boundary' },
        { label: 'Time to First Value', value: tool.timeToResult, note: 'Cadence' }
      ],
      keyResults: [
        { metric: 'Strategic Alignment Score', value: '88 / 100', badge: 'High Impact' },
        { metric: 'Estimated Resource ROI', value: '+34% 3-Yr IRR', badge: 'Validated' },
        { metric: 'Confidence Level', value: '92% (High Data Integrity)', badge: 'Audited' }
      ],
      strategicAction: `Leverage findings from this ${tool.shortName} simulation to recalibrate resource allocation toward high-margin retention initiatives and align cross-functional OKRs.`,
      sampleDeliverableNote: `Produces a verified ${tool.keyOutput} with risk-weighted contingency triggers.`
    },
    {
      id: 'scenario-consumer',
      industry: 'DTC & Consumer Goods',
      companyName: 'Lumina Wellness Collective (Rev $28M)',
      profile: 'Omnichannel health & functional nutrition brand scaling retail distribution across 2,400 pharmacy doors.',
      situation: `Using ${tool.shortName} to identify customer adoption friction, stress-test gross margin resilience, and mitigate channel cannibalization risks.`,
      mockInputs: [
        { label: 'Retail vs DTC Channel Mix', value: '62% Wholesale / 38% Direct', note: 'Omnichannel Model' },
        { label: 'Core Problem Addressed', value: `Friction in ${tool.shortName.toLowerCase()} execution and market positioning`, note: 'Bottleneck' },
        { label: 'Input Data Sourced', value: tool.dataNeeds.slice(0, 70) + '...', note: 'Telemetry data' },
        { label: 'Target Deliverable', value: tool.keyOutput, note: 'Core artifact' }
      ],
      keyResults: [
        { metric: 'Channel Margin Protection', value: '64.2% Gross Margin', badge: 'Target Met' },
        { metric: 'Payback Velocity', value: '4.8 Months', badge: 'Top Decile' },
        { metric: 'Adoption Feasibility', value: 'Low Friction / High Buy-in', badge: 'Approved' }
      ],
      strategicAction: `Incorporate the ${tool.shortName} outputs into the executive dashboard to monitor weekly leading indicators and prevent margin slippage during retail store rollout.`,
      sampleDeliverableNote: `Provides cross-functional teams with clear operational thresholds and RACI accountabilities.`
    },
    {
      id: 'scenario-industrial',
      industry: 'Advanced Manufacturing & Supply Chain',
      companyName: 'Vanguard Industrial Dynamics (Rev $160M)',
      profile: 'Tier-1 precision components supplier navigating supply chain re-shoring and automation capital expenditures.',
      situation: `Applying ${tool.shortName} to evaluate a $14M capital expenditure program against macro volatility and supplier power dynamics.`,
      mockInputs: [
        { label: 'CapEx Investment Scope', value: '$14.2M Automated Robotic Cell', note: '3-Year Depr.' },
        { label: 'Methodology Framework', value: `${tool.name} (${tool.shortName})`, note: tool.origin },
        { label: 'Cross-Functional Stakeholders', value: tool.primaryUsers.slice(0, 3).join(', '), note: 'Governance' },
        { label: 'Upstream Strategic Input', value: tool.workflowPlacement.upstream, note: 'Prerequisite' }
      ],
      keyResults: [
        { metric: 'Capacity Throughput Delta', value: '+42% Unit Output', badge: 'Step Change' },
        { metric: 'Defect Reduction Rate', value: '-85% (to 45 DPMO)', badge: 'Six Sigma' },
        { metric: 'Payback Period', value: '2.3 Years', badge: 'Exceeds Hurdle' }
      ],
      strategicAction: `Executive sponsor greenlights Phase 1 rollout based on ${tool.shortName} risk-adjusted scenario modeling, with quarterly milestone audits.`,
      sampleDeliverableNote: `Feeds directly into downstream execution: ${tool.workflowPlacement.downstream}.`
    }
  ];

  const currentScenario = mockScenarios[selectedScenarioIndex] || mockScenarios[0];

  const handleCopyScenario = async () => {
    const text = `=== BIZTOOLS MOCK EXAMPLE: ${tool.name} (${tool.shortName}) ===
Industry: ${currentScenario.industry}
Company: ${currentScenario.companyName}
Profile: ${currentScenario.profile}
Executive Situation: ${currentScenario.situation}

KEY INPUT DATA:
${currentScenario.mockInputs.map(i => `- ${i.label}: ${i.value} (${i.note || ''})`).join('\n')}

MOCK OUTPUT RESULTS:
${currentScenario.keyResults.map(r => `- ${r.metric}: ${r.value} [${r.badge || ''}]`).join('\n')}

STRATEGIC ACTION & DECISION:
${currentScenario.strategicAction}
Artifact: ${currentScenario.sampleDeliverableNote}
=====================================================`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedScenario(true);
      setTimeout(() => setCopiedScenario(false), 2000);
    } catch (err) {
      console.error('Failed to copy scenario', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="examples-modal-title"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 shrink-0 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
              <ToolIcon className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-3xs font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  {tool.category}
                </span>
                <span className="text-2xs text-slate-300">
                  Tool #{tool.id} · {tool.shortName}
                </span>
              </div>
              <h3 id="examples-modal-title" className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                {tool.name} — Real-World Examples & Mock Datasets
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0"
            aria-label="Close examples modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-100/80 border-b border-slate-200 text-xs shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('mock_scenarios')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'mock_scenarios'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mock Industry Templates (3)</span>
          </button>

          <button
            onClick={() => setActiveTab('case_study')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'case_study'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Deep Case Study ({tool.caseStudy.company})</span>
          </button>

          <button
            onClick={() => setActiveTab('use_cases')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'use_cases'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Enterprise Use Cases ({tool.useCases.length})</span>
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs">
          {/* TAB 1: MOCK SCENARIOS */}
          {activeTab === 'mock_scenarios' && (
            <div className="space-y-5">
              {/* Scenario Selector Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {mockScenarios.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => setSelectedScenarioIndex(idx)}
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer shrink-0 ${
                      selectedScenarioIndex === idx
                        ? 'bg-indigo-50/90 border-indigo-500 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-3xs uppercase font-mono font-bold text-indigo-700">
                      Scenario {idx + 1}
                    </div>
                    <div className="font-bold truncate max-w-[200px]">{sc.industry}</div>
                  </button>
                ))}
              </div>

              {/* Selected Scenario Detail Card */}
              <div className="border border-indigo-200 bg-indigo-50/30 rounded-2xl p-5 space-y-5">
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-200/60 pb-3">
                  <div>
                    <span className="text-3xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      {currentScenario.industry}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">
                      {currentScenario.companyName}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {currentScenario.profile}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={handleCopyScenario}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs ${
                        copiedScenario
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                      title="Copy full mock scenario data to clipboard"
                    >
                      {copiedScenario ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-200" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Scenario Data</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (onApplyTemplate) {
                          onApplyTemplate(currentScenario.companyName, currentScenario.mockInputs);
                        }
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                      title="Apply these mock scenario inputs directly into the active simulator"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Apply to Simulator</span>
                    </button>
                  </div>
                </div>

                {/* Situation Statement */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
                  <span className="font-bold text-slate-900 block mb-1">
                    Decision Mandate & Strategic Context:
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {currentScenario.situation}
                  </p>
                </div>

                {/* 2-Column Inputs & Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Inputs */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5 shadow-2xs">
                    <div className="font-bold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
                      <BarChart2 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Mock Input Parameters & Data Needs</span>
                    </div>
                    <div className="space-y-2 divide-y divide-slate-100 text-xs">
                      {currentScenario.mockInputs.map((inp, i) => (
                        <div key={i} className="pt-2 first:pt-0 flex items-start justify-between gap-2">
                          <span className="text-slate-600 font-medium">{inp.label}:</span>
                          <span className="font-bold text-slate-900 text-right">
                            {inp.value}
                            {inp.note && (
                              <span className="block text-3xs font-normal text-indigo-600">
                                {inp.note}
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results & Key Metrics */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5 shadow-2xs">
                    <div className="font-bold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Simulated Outputs & Key Findings</span>
                    </div>
                    <div className="space-y-2 divide-y divide-slate-100 text-xs">
                      {currentScenario.keyResults.map((res, i) => (
                        <div key={i} className="pt-2 first:pt-0 flex items-center justify-between gap-2">
                          <span className="text-slate-600 font-medium">{res.metric}:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-slate-900">{res.value}</span>
                            {res.badge && (
                              <span className="text-3xs font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                                {res.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-3xs uppercase font-bold text-slate-400 block mb-0.5">
                        Deliverable Produced:
                      </span>
                      <p className="text-xs font-semibold text-indigo-950">
                        {currentScenario.sampleDeliverableNote}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Final Strategic Decision */}
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Executive Takeaway & Operational Next Step:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed pl-5">
                    {currentScenario.strategicAction}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEEP CASE STUDY */}
          {activeTab === 'case_study' && (
            <div className="space-y-5">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-3xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      Verified Case Study
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">
                      {tool.caseStudy.company}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-mono">
                    <span>Revenue: <strong className="text-slate-900">{tool.caseStudy.revenue}</strong></span>
                    <span>·</span>
                    <span>Team: <strong className="text-slate-900">{tool.caseStudy.staff}</strong></span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {tool.caseStudy.profile}
                </p>

                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs space-y-1">
                  <span className="font-bold text-amber-900 block">The Core Challenge:</span>
                  <p className="text-slate-700">{tool.caseStudy.challenge}</p>
                </div>

                <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-lg text-xs space-y-1">
                  <span className="font-bold text-indigo-900 block">Why {tool.shortName} was Chosen:</span>
                  <p className="text-slate-700">{tool.caseStudy.whyChosen}</p>
                </div>
              </div>

              {/* Implementation Steps & Measured Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wide block">
                    Execution Steps Taken:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {tool.caseStudy.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-800 font-bold text-3xs flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wide block">
                    Measured Commercial Results:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {tool.caseStudy.results.map((res, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Lessons Learned */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                <span className="font-bold text-slate-900 text-xs uppercase tracking-wide block">
                  Key Executive Lessons Learned:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {tool.caseStudy.lessonsLearned.map((les, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-black shrink-0">•</span>
                      <span>{les}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: ENTERPRISE USE CASES */}
          {activeTab === 'use_cases' && (
            <div className="space-y-3">
              {tool.useCases.map((uc, i) => (
                <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs hover:border-indigo-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {i + 1}. {uc.title}
                    </span>
                    {uc.industry && (
                      <span className="text-3xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {uc.industry}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {uc.scenario || uc.situation || uc.problem}
                  </p>
                  {(uc.action || uc.howItHelps) && (
                    <p className="text-xs text-indigo-900 font-medium bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100">
                      <strong>Methodology Applied:</strong> {uc.action || uc.howItHelps}
                    </p>
                  )}
                  <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Outcome: {uc.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 text-2xs hidden sm:block">
            Use these realistic benchmarks to calibrate numbers and hypotheses in the simulator.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all cursor-pointer shadow-xs ml-auto"
          >
            Close Examples
          </button>
        </div>
      </div>
    </div>
  );
}
