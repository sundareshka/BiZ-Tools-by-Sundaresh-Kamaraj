import React, { useState } from 'react';
import {
  X,
  PlayCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Rocket,
  ShieldAlert,
  Coins,
  ChevronRight,
  Compass,
  Check
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { TOOL_ICONS, getToolIcon } from '../data/toolIcons.ts';

interface ChainStep {
  toolId: string;
  role: string;
  objective: string;
  inputPipedFromPrevious: string;
  expectedDeliverable: string;
}

interface WorkshopChain {
  id: string;
  title: string;
  tagline: string;
  category: string;
  icon: any;
  targetScale: string;
  steps: ChainStep[];
}

interface StrategyChainRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  allTools: ToolDefinition[];
  onLaunchTool: (toolId: string) => void;
  isSimulatorDone: (toolId: string) => boolean;
}

export function StrategyChainRunnerModal({
  isOpen,
  onClose,
  allTools,
  onLaunchTool,
  isSimulatorDone
}: StrategyChainRunnerModalProps) {
  const chains: WorkshopChain[] = [
    {
      id: 'chain-venture',
      title: 'Venture Launch & First Revenue Validation',
      tagline: 'Idea to paying customer: eliminate problem and market uncertainty before writing code',
      category: 'Innovation & Product',
      icon: Rocket,
      targetScale: 'Early-stage founders, startup squads, corporate incubators (<25 people)',
      steps: [
        {
          toolId: 'jtbd',
          role: 'Customer Discovery',
          objective: 'Identify functional, emotional, and social struggle moments and the "switch trigger".',
          inputPipedFromPrevious: 'Raw qualitative user interviews and churned competitor customer notes.',
          expectedDeliverable: 'Clear Job-to-be-Done statement (Push, Pull, Anxiety, Habit forces).'
        },
        {
          toolId: 'vpc',
          role: 'Solution Value Mapping',
          objective: 'Align Customer Pains/Gains with Pain Relievers and Gain Creators in the offering.',
          inputPipedFromPrevious: 'Piped from JTBD: validated struggle moments become primary customer pain points.',
          expectedDeliverable: 'Problem-Solution fit matrix and quantified value proposition.'
        },
        {
          toolId: 'leancanvas',
          role: 'Unit Economics Blueprint',
          objective: 'Stress-test CAC, revenue streams, cost structures, and unfair advantages on 1 page.',
          inputPipedFromPrevious: 'Piped from VPC: validated value proposition becomes the Unique Value Proposition (UVP).',
          expectedDeliverable: '1-page Lean Canvas with identified leap-of-faith assumptions.'
        },
        {
          toolId: 'mvp',
          role: 'Rapid Experimentation',
          objective: 'Design minimum viable experiment (concierge, smoke test, landing page) to test riskiest assumption.',
          inputPipedFromPrevious: 'Piped from Lean Canvas: the highest-risk channel or pricing assumption.',
          expectedDeliverable: 'Experiment card with pre-committed kill/pivot criteria.'
        },
        {
          toolId: 'okrs',
          role: 'Execution Sprint Cadence',
          objective: 'Set quarterly 3x3 objectives for the first 90-day growth sprint.',
          inputPipedFromPrevious: 'Piped from MVP: successful validation metrics become Key Results.',
          expectedDeliverable: '3 Objectives with 3 measurable Key Results and weekly scoreboards.'
        }
      ]
    },
    {
      id: 'chain-growth',
      title: 'Corporate Moat Building & Market Expansion',
      tagline: 'Defend core cashflows and sequence expansion into high-margin uncontested territory',
      category: 'Strategy & Growth',
      icon: Compass,
      targetScale: 'Mid-market SMEs & multi-division corporations (25 to 500+ people)',
      steps: [
        {
          toolId: 'pestle',
          role: 'Macro Risk Scanning',
          objective: 'Screen regulatory, economic, and technological shocks that threaten the core business.',
          inputPipedFromPrevious: 'Industry trade intelligence, macroeconomic indices, regulatory filings.',
          expectedDeliverable: 'Ranked list of macro head-winds and tail-winds.'
        },
        {
          toolId: 'porter',
          role: 'Industry Structure & Power',
          objective: 'Assess supplier leverage, buyer power, and competitive rivalry intensity.',
          inputPipedFromPrevious: 'Piped from PESTLE: macro shifts impacting supplier power and substitution.',
          expectedDeliverable: 'Five Forces profit pool assessment and margin erosion risks.'
        },
        {
          toolId: 'vrio',
          role: 'Internal Resource Defensibility',
          objective: 'Audit proprietary patents, relationships, data assets, and tacit operational know-how.',
          inputPipedFromPrevious: 'Piped from Five Forces: identify which assets protect margins against rivalry.',
          expectedDeliverable: 'VRIO scorecard isolating temporary vs sustained competitive moats.'
        },
        {
          toolId: 'ansoff',
          role: 'Growth Vector Sequencing',
          objective: 'Evaluate penetration vs product development vs geographic expansion.',
          inputPipedFromPrevious: 'Piped from VRIO: leverage sustained internal capabilities into adjacent markets.',
          expectedDeliverable: 'Sequenced 3-phase growth roadmap with risk weighting.'
        },
        {
          toolId: 'bsc',
          role: 'Cross-Functional Strategy Map',
          objective: 'Cascade the chosen growth vector across Financial, Customer, Internal, and Learning pillars.',
          inputPipedFromPrevious: 'Piped from Ansoff & VRIO: growth initiatives translated into strategic objectives.',
          expectedDeliverable: 'Balanced Scorecard Strategy Map linking cause-and-effect drivers.'
        }
      ]
    },
    {
      id: 'chain-turnaround',
      title: 'Financial Turnaround & Margin Defense',
      tagline: 'Diagnose ROE erosion, establish margin of safety, and eliminate operating waste',
      category: 'Finance & Operations',
      icon: Coins,
      targetScale: 'Operating companies, PE portfolio turnarounds, capital-constrained teams',
      steps: [
        {
          toolId: 'dupont',
          role: 'Root-Cause DuPont Breakdown',
          objective: 'Deconstruct Return on Equity into Net Margin, Asset Turnover, and Financial Leverage.',
          inputPipedFromPrevious: 'Audited P&L, balance sheets, and working capital schedules.',
          expectedDeliverable: 'DuPont diagnostic pin-pointing exact source of equity dilution.'
        },
        {
          toolId: 'breakeven',
          role: 'Operating Leverage & Safety Threshold',
          objective: 'Determine fixed vs variable cost burden and volume breakeven units.',
          inputPipedFromPrevious: 'Piped from DuPont: margin profile used to model cost structures.',
          expectedDeliverable: 'Breakeven volume threshold and margin of safety percentage.'
        },
        {
          toolId: 'pareto',
          role: '80/20 Cost & Waste Analysis',
          objective: 'Identify the vital 20% of customer accounts or SKUs causing 80% of margin bleed.',
          inputPipedFromPrevious: 'Piped from Breakeven: cost line items exceeding benchmark thresholds.',
          expectedDeliverable: 'Pareto chart ranking critical operational cost leakages.'
        },
        {
          toolId: 'lean',
          role: 'Gemba Kaizen Execution',
          objective: 'Eliminate Muda (7 wastes), cycle time delays, and excessive inventory buffers.',
          inputPipedFromPrevious: 'Piped from Pareto: targeted focus on the top 3 margin-bleeding workflows.',
          expectedDeliverable: 'Waste elimination action matrix with assigned process owners.'
        },
        {
          toolId: 'kpis',
          role: 'Executive Real-Time Dashboard',
          objective: 'Establish weekly leading indicators to prevent margin slippage and monitor cash runway.',
          inputPipedFromPrevious: 'Piped from DuPont & Breakeven: operational metrics driving EBITDA.',
          expectedDeliverable: 'Executive KPI dashboard with green/amber/red threshold triggers.'
        }
      ]
    }
  ];

  const [selectedChainId, setSelectedChainId] = useState<string>('chain-venture');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  if (!isOpen) return null;

  const currentChain = chains.find(c => c.id === selectedChainId) || chains[0];
  const activeStep = currentChain.steps[activeStepIndex] || currentChain.steps[0];
  const activeTool = allTools.find(t => t.id === activeStep.toolId);

  const completedStepsCount = currentChain.steps.filter(s => isSimulatorDone(s.toolId)).length;
  const progressPercent = Math.round((completedStepsCount / currentChain.steps.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                Strategy Chain Runner & Workshop
              </h3>
              <p className="text-xs text-slate-500">
                Execute sequential multi-framework strategy workshops with input piping across stages
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chain Track Selector */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-2">
          <span className="text-2xs font-extrabold uppercase tracking-wider text-slate-400 block">
            Select Workshop Track:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {chains.map(chain => {
              const Icon = chain.icon;
              const isSelected = chain.id === selectedChainId;
              return (
                <button
                  key={chain.id}
                  onClick={() => {
                    setSelectedChainId(chain.id);
                    setActiveStepIndex(0);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-indigo-500 shadow-sm ring-1 ring-indigo-400/40 text-slate-900'
                      : 'bg-white/60 border-slate-200 hover:bg-white text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="font-bold text-xs leading-tight line-clamp-1">{chain.title}</span>
                  </div>
                  <span className="text-3xs text-slate-500 block truncate">{chain.category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress Bar & Sequence Stepper */}
        <div className="px-5 pt-4 pb-2 border-b border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-700">
              Workshop Flow · Step {activeStepIndex + 1} of {currentChain.steps.length}
            </span>
            <span className="text-indigo-600 font-bold font-mono">
              {progressPercent}% Complete ({completedStepsCount}/{currentChain.steps.length})
            </span>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {currentChain.steps.map((step, idx) => {
              const isDone = isSimulatorDone(step.toolId);
              const isActive = idx === activeStepIndex;
              const tool = allTools.find(t => t.id === step.toolId);

              return (
                <button
                  key={step.toolId}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer border ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : isDone
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-3xs font-mono">{idx + 1}.</span>
                  <span>{tool?.shortName || step.toolId}</span>
                  {isDone && <Check className="w-3 h-3 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Canvas Body */}
        <div className="p-6 space-y-5 max-h-[55vh] overflow-y-auto">
          {/* Step Identity */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <span className="text-2xs font-extrabold uppercase tracking-wider text-indigo-600">
                {activeStep.role}
              </span>
              <h4 className="text-lg font-bold text-slate-900">
                {activeTool?.name || activeStep.toolId}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {activeStep.objective}
              </p>
            </div>

            <button
              onClick={() => {
                onLaunchTool(activeStep.toolId);
                onClose();
              }}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto"
            >
              <PlayCircle className="w-4 h-4 text-indigo-200" />
              <span>Launch Simulator</span>
            </button>
          </div>

          {/* Sequential Input / Output Piping Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Input Piping Card */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                <ArrowRight className="w-3 h-3 text-slate-400" />
                Input Carried From Previous Stage:
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">
                {activeStep.inputPipedFromPrevious}
              </p>
            </div>

            {/* Expected Deliverable Card */}
            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1.5">
              <span className="text-3xs font-bold uppercase tracking-wider text-emerald-700 block flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Deliverable Produced for Next Stage:
              </span>
              <p className="text-emerald-950 font-medium leading-relaxed">
                {activeStep.expectedDeliverable}
              </p>
            </div>
          </div>

          {/* Executive Guidance Note */}
          <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs text-slate-700 space-y-1">
            <span className="font-bold text-indigo-950 block">Facilitator Note:</span>
            <p className="font-normal text-slate-600 text-xs">
              When working with an executive leadership squad, lock this step's output into the active simulator and export the data before proceeding. Chained decisions prevent department misalignment.
            </p>
          </div>
        </div>

        {/* Footer Navigation Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            disabled={activeStepIndex === 0}
            onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
          >
            ← Previous Step
          </button>

          <div className="flex items-center gap-2">
            {activeStepIndex < currentChain.steps.length - 1 ? (
              <button
                onClick={() => setActiveStepIndex(prev => Math.min(currentChain.steps.length - 1, prev + 1))}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Next Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Finish Workshop</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
