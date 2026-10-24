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
  Check,
  Gamepad2,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Presentation,
  Award
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { TOOL_ICONS, getToolIcon } from '../data/toolIcons.ts';
import { triggerCompletionConfetti } from '../utils/confetti.ts';
import { saveDeckSlide } from '../utils/slideDeck.ts';

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

interface CampaignDecision {
  stage: number;
  stageTitle: string;
  situation: string;
  frameworkName: string;
  frameworkId: string;
  options: {
    label: string;
    description: string;
    impact: {
      capital: number; // in $M delta
      marketShare: number; // in % delta
      velocity: number; // points delta
      morale: number; // % delta
    };
    rationale: string;
  }[];
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
  const [modalMode, setModalMode] = useState<'blueprint' | 'wargame'>('wargame');
  const [selectedChainId, setSelectedChainId] = useState<string>('chain-venture');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Wargame Campaign State
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isStageSubmitted, setIsStageSubmitted] = useState<boolean>(false);
  const [historyChoices, setHistoryChoices] = useState<number[]>([]);
  const [companyMetrics, setCompanyMetrics] = useState({
    capital: 12.0, // $12M
    marketShare: 18.0, // 18%
    velocity: 70, // 70/100
    morale: 80 // 80%
  });
  const [campaignCompleted, setCampaignCompleted] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const chains: WorkshopChain[] = [
    {
      id: 'chain-venture',
      title: 'GenAI & Cloud Venture Launch',
      tagline: 'Idea to revenue: eliminate technological & market uncertainty before burning capital',
      category: 'Innovation & Product',
      icon: Rocket,
      targetScale: 'Early-stage founders, startup squads, corporate incubators (<25 people)',
      steps: [
        {
          toolId: 'wardley',
          role: 'Landscape Mapping',
          objective: 'Map user needs against value chain evolution (Genesis vs Custom vs Commodity).',
          inputPipedFromPrevious: 'Raw qualitative user interviews and competitor tech stacks.',
          expectedDeliverable: 'Clear Wardley Map isolating proprietary vs commoditized layers.'
        },
        {
          toolId: 'blueocean',
          role: 'Uncontested Market Space',
          objective: 'Create diverging Strategy Canvas eliminating legacy operational cost bloat.',
          inputPipedFromPrevious: 'Piped from Wardley: identified commodity layers become candidates for elimination.',
          expectedDeliverable: 'Four Actions Framework (Eliminate, Reduce, Raise, Create).'
        },
        {
          toolId: 'leancanvas',
          role: 'Unit Economics Blueprint',
          objective: 'Stress-test CAC, revenue streams, cost structures, and unfair advantages on 1 page.',
          inputPipedFromPrevious: 'Piped from Blue Ocean: differentiated value curve becomes Unique Value Proposition.',
          expectedDeliverable: '1-page Lean Canvas with identified leap-of-faith assumptions.'
        },
        {
          toolId: 'okrs',
          role: 'Execution Sprint Cadence',
          objective: 'Set quarterly 3x3 objectives for the first 90-day growth sprint.',
          inputPipedFromPrevious: 'Piped from Lean Canvas: core traction metrics become Key Results.',
          expectedDeliverable: '3 Objectives with 3 measurable Key Results and weekly scoreboards.'
        }
      ]
    },
    {
      id: 'chain-growth',
      title: 'Corporate Moat Building & Global Expansion',
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
          toolId: 'toc',
          role: 'Constraint Elevation',
          objective: 'Identify and exploit the single operational bottleneck choking throughput.',
          inputPipedFromPrevious: 'Piped from Pareto: focus buffer management on the core constraint.',
          expectedDeliverable: 'Drum-Buffer-Rope scheduling rules and elevated throughput capacity.'
        }
      ]
    }
  ];

  // Campaign Interactive Decisions (Scenario 1)
  const campaignDecisions: CampaignDecision[] = [
    {
      stage: 1,
      stageTitle: 'Stage 1: Legacy Disruption & Infrastructure Drift',
      situation: 'A well-funded AI challenger has launched a self-serve platform that undercuts your enterprise tier by 60%. Your internal engineering team is split between rewriting custom legacy infrastructure or adopting third-party commodity foundation models.',
      frameworkName: 'Wardley Mapping',
      frameworkId: 'wardley',
      options: [
        {
          label: 'A. Aggressive Migration to Commodity APIs (Wardley Play)',
          description: 'Divest from proprietary compute pipelines; adopt standardized cloud AI primitives to redirect 70% of R&D onto user workflows.',
          impact: { capital: -1.5, marketShare: 3.5, velocity: 15, morale: 5 },
          rationale: 'Wardley principle: Never build bespoke what has evolved into a commodity utility. Accelerates time-to-market.'
        },
        {
          label: 'B. Defend Proprietary Tech Stack with Hybrid Hosting',
          description: 'Invest $3M in fine-tuning internal open-weight models on proprietary on-premises servers to guarantee data sovereignty.',
          impact: { capital: -3.0, marketShare: 1.0, velocity: -10, morale: -5 },
          rationale: 'High capital expenditure slows sprint velocity, though appeals to strict regulatory enterprise accounts.'
        },
        {
          label: 'C. Discount Enterprise Pricing to Retain Core Accounts',
          description: 'Match the challenger on price without altering underlying software architecture.',
          impact: { capital: -4.5, marketShare: -2.0, velocity: 0, morale: -15 },
          rationale: 'Price wars without cost-structure advantages erode margins and demoralize sales teams.'
        }
      ]
    },
    {
      stage: 2,
      stageTitle: 'Stage 2: Carving Out Uncontested Market Space',
      situation: 'Now operating on modern primitives, the Board requests an expansion plan. Enterprise incumbents are competing on feature bloat. Where do you reallocate product capability?',
      frameworkName: 'Blue Ocean Strategy Canvas',
      frameworkId: 'blueocean',
      options: [
        {
          label: 'A. Four Actions Pivot: Eliminate Manual Setup, Create Self-Serve Verification',
          description: 'Eliminate complex onboarding consultants; create instant automated verification for mid-market CFOs.',
          impact: { capital: -1.0, marketShare: 6.0, velocity: 12, morale: 10 },
          rationale: 'Blue Ocean divergence: Unlocking the non-consumer tier creates uncontested high-margin demand.'
        },
        {
          label: 'B. Feature Parity Race with Incumbents',
          description: 'Build 15 niche compliance integrations to match the legacy enterprise leader checklist.',
          impact: { capital: -2.5, marketShare: 1.5, velocity: -8, morale: -5 },
          rationale: 'Red Ocean trap: Incremental feature matching leads to margin compression and high maintenance drag.'
        },
        {
          label: 'C. Aggressive Outbound Cold Sales Blitz',
          description: 'Triple the SDR sales quota to force existing software into reluctant prospects.',
          impact: { capital: -2.0, marketShare: -0.5, velocity: 5, morale: -20 },
          rationale: 'High customer acquisition costs without product differentiation causes severe customer churn.'
        }
      ]
    },
    {
      stage: 3,
      stageTitle: 'Stage 3: Unit Economics & Churn Stress-Test',
      situation: 'New signups are growing 40% MoM, but cloud token inference costs are rising faster than expected. Cash runway has tightened to 9 months.',
      frameworkName: 'Lean Canvas & Breakeven Analysis',
      frameworkId: 'leancanvas',
      options: [
        {
          label: 'A. Introduce Tiered Token Quotas & Usage-Based Expansion',
          description: 'Cap gratuitous heavy users and implement transparent overage billing aligned with gross margin floor (75%+).',
          impact: { capital: 3.5, marketShare: 1.0, velocity: 8, morale: 8 },
          rationale: 'Aligns value capture with customer ROI. Immediately restores healthy unit economics.'
        },
        {
          label: 'B. Emergency Bridge Venture Financing at 20% Dilution',
          description: 'Raise $5M quickly from inside investors while leaving loss-making free tiers untouched.',
          impact: { capital: 4.5, marketShare: 0.5, velocity: -5, morale: -10 },
          rationale: 'Buys time but fails to resolve fundamentally negative unit economics.'
        },
        {
          label: 'C. Freeze Engineering Hiring & Slash Marketing 50%',
          description: 'Austerity freeze across all teams to stop capital bleed immediately.',
          impact: { capital: 2.0, marketShare: -4.0, velocity: -20, morale: -25 },
          rationale: 'Severe austerity stalls product momentum and triggers talent flight to competitors.'
        }
      ]
    },
    {
      stage: 4,
      stageTitle: 'Stage 4: Execution Cadence & Boardroom Review',
      situation: 'The final quarter before Series C / Expansion: The leadership team must establish focus across 300 cross-functional contributors.',
      frameworkName: 'OKRs & Balanced Scorecard',
      frameworkId: 'okrs',
      options: [
        {
          label: 'A. Institute 3x3 OKR Cadence with Weekly Public Scoreboards',
          description: 'Align every team on 3 clear Objectives: Net Retention >125%, P95 Latency <100ms, and Gross Margin >78%.',
          impact: { capital: 2.0, marketShare: 4.5, velocity: 18, morale: 15 },
          rationale: 'Radical focus and transparent metrics eliminate organizational friction and align cross-functional priorities.'
        },
        {
          label: 'B. Maintain 28 Disparate Departmental Goals in Spreadsheets',
          description: 'Allow each VP to manage their own separate siloed metric dashboards.',
          impact: { capital: -1.0, marketShare: -1.0, velocity: -10, morale: -5 },
          rationale: 'Lack of shared strategic alignment creates internal politics and redundant resource expenditure.'
        },
        {
          label: 'C. Mandate Daily 2-Hour Status Meetings Across All Teams',
          description: 'Enforce micro-management check-ins to monitor developer and sales tasks.',
          impact: { capital: -0.5, marketShare: -2.0, velocity: -25, morale: -30 },
          rationale: 'Smothers autonomous decision-making and slows execution to a crawl.'
        }
      ]
    }
  ];

  const currentChain = chains.find(c => c.id === selectedChainId) || chains[0];
  const activeStep = currentChain.steps[activeStepIndex] || currentChain.steps[0];
  const currentDecision = campaignDecisions[currentStageIndex];

  if (!isOpen) return null;

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIndex(idx);
  };

  const handleApplyDecision = () => {
    if (selectedOptionIndex === null) return;
    const choice = currentDecision.options[selectedOptionIndex];
    setCompanyMetrics(prev => ({
      capital: Math.max(0.5, +(prev.capital + choice.impact.capital).toFixed(1)),
      marketShare: Math.max(1, +(prev.marketShare + choice.impact.marketShare).toFixed(1)),
      velocity: Math.max(10, Math.min(100, prev.velocity + choice.impact.velocity)),
      morale: Math.max(10, Math.min(100, prev.morale + choice.impact.morale))
    }));
    setHistoryChoices(prev => [...prev, selectedOptionIndex]);
    setIsStageSubmitted(true);
  };

  const handleNextStage = () => {
    if (currentStageIndex < campaignDecisions.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsStageSubmitted(false);
    } else {
      setCampaignCompleted(true);
      triggerCompletionConfetti();
    }
  };

  const handleRestartCampaign = () => {
    setCurrentStageIndex(0);
    setSelectedOptionIndex(null);
    setIsStageSubmitted(false);
    setHistoryChoices([]);
    setCompanyMetrics({
      capital: 12.0,
      marketShare: 18.0,
      velocity: 70,
      morale: 80
    });
    setCampaignCompleted(false);
  };

  const handleSaveToDeck = () => {
    saveDeckSlide({
      toolId: 'campaign-genai',
      toolName: 'Executive Wargame Campaign',
      pillar: 'Strategic Crisis Simulation',
      title: 'GenAI & Cloud Venture Campaign Post-Mortem',
      executiveSummary: `Completed 4 strategic decision checkpoints. Company emerged with $${companyMetrics.capital}M Capital, ${companyMetrics.marketShare}% Market Share, ${companyMetrics.velocity}/100 Velocity, and ${companyMetrics.morale}% Team Morale.`,
      keyMetrics: [
        { label: 'Ending Capital', value: `$${companyMetrics.capital}M`, trend: companyMetrics.capital >= 12 ? 'up' : 'down' },
        { label: 'Market Share', value: `${companyMetrics.marketShare}%`, trend: 'up' },
        { label: 'Execution Velocity', value: `${companyMetrics.velocity}/100`, trend: 'up' }
      ],
      strategicRecommendations: [
        'Divest commodity infrastructure and redirect engineering into proprietary workflow layers',
        'Scale mid-market self-serve tiers to maintain 75%+ gross margin floor',
        'Maintain 3x3 OKR cadence to avoid cross-functional alignment drift'
      ],
      notes: 'Executive campaign debrief ready for board presentation review.'
    });
    setToastMsg('Campaign debrief added to Board Deck!');
    setTimeout(() => setToastMsg(null), 2500);
  };

  // Grade calculation
  const getStrategicGrade = () => {
    const score = (companyMetrics.capital * 2.5) + (companyMetrics.marketShare * 2) + companyMetrics.velocity + companyMetrics.morale;
    if (score >= 200) return { grade: 'A+', label: 'Elite Visionary Strategist', color: 'text-emerald-400' };
    if (score >= 170) return { grade: 'A', label: 'High-Impact Executive Leader', color: 'text-indigo-400' };
    if (score >= 140) return { grade: 'B+', label: 'Capable Pragmatic Operator', color: 'text-amber-400' };
    return { grade: 'B', label: 'Conservative Turnaround Specialist', color: 'text-slate-400' };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0 text-indigo-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Executive Crisis & Growth Campaigns
                </h3>
                <span className="text-3xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded">
                  Interactive Wargame
                </span>
              </div>
              <p className="text-3xs text-slate-400">
                Test high-stakes strategic choices across connected frameworks and navigate live corporate trade-offs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Switcher */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-2xs">
              <button
                onClick={() => setModalMode('wargame')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  modalMode === 'wargame'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🎮 Wargame Simulation
              </button>
              <button
                onClick={() => setModalMode('blueprint')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  modalMode === 'blueprint'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                📐 Pipeline Blueprint
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MODE 1: INTERACTIVE WARGAME CAMPAIGN */}
        {modalMode === 'wargame' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {/* Live Enterprise Performance Meters */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-2xs font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
                <span>Enterprise Dashboard · Real-Time Company Metrics</span>
                <span className="font-mono text-indigo-400">
                  {campaignCompleted ? 'Campaign Finished' : `Checkpoint ${currentStageIndex + 1} of ${campaignDecisions.length}`}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {/* Capital */}
                <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
                  <span className="text-3xs uppercase font-extrabold text-slate-400 block">Cash Capital</span>
                  <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">
                    ${companyMetrics.capital}M
                  </div>
                  <span className="text-3xs text-slate-500">Runway buffer</span>
                </div>

                {/* Market Share */}
                <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
                  <span className="text-3xs uppercase font-extrabold text-slate-400 block">Market Share</span>
                  <div className="text-lg font-black text-indigo-400 font-mono mt-0.5">
                    {companyMetrics.marketShare}%
                  </div>
                  <span className="text-3xs text-slate-500">Industry presence</span>
                </div>

                {/* Velocity */}
                <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
                  <span className="text-3xs uppercase font-extrabold text-slate-400 block">Execution Velocity</span>
                  <div className="text-lg font-black text-amber-400 font-mono mt-0.5">
                    {companyMetrics.velocity} <span className="text-3xs font-normal text-slate-500">/ 100</span>
                  </div>
                  <span className="text-3xs text-slate-500">Sprint throughput</span>
                </div>

                {/* Morale */}
                <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
                  <span className="text-3xs uppercase font-extrabold text-slate-400 block">Org Cohesion</span>
                  <div className="text-lg font-black text-purple-400 font-mono mt-0.5">
                    {companyMetrics.morale}%
                  </div>
                  <span className="text-3xs text-slate-500">Talent retention</span>
                </div>
              </div>
            </div>

            {/* CAMPAIGN IN PROGRESS */}
            {!campaignCompleted ? (
              <div className="space-y-4">
                {/* Situation Memo */}
                <div className="p-5 bg-indigo-50/60 border border-indigo-200/80 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-extrabold uppercase tracking-wider text-indigo-700">
                      {currentDecision.stageTitle}
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onLaunchTool(currentDecision.frameworkId);
                      }}
                      className="text-3xs font-bold text-indigo-600 hover:text-indigo-900 flex items-center gap-1 cursor-pointer bg-white px-2 py-0.5 rounded border border-indigo-200 shadow-2xs"
                      title="Open simulator in background"
                    >
                      <span>Explore {currentDecision.frameworkName} Sim</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                    {currentDecision.situation}
                  </p>
                </div>

                {/* Strategic Options */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 block">
                    Choose Strategic Executive Move:
                  </span>

                  <div className="space-y-2.5">
                    {currentDecision.options.map((opt, idx) => {
                      const isSelected = selectedOptionIndex === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => !isStageSubmitted && handleSelectOption(idx)}
                          className={`p-4 rounded-xl border transition-all text-xs cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-50/80 border-indigo-500 shadow-sm ring-1 ring-indigo-400/50'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          } ${isStageSubmitted && !isSelected ? 'opacity-40 pointer-events-none' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-1">
                              <h4 className="font-bold text-slate-900 leading-snug">{opt.label}</h4>
                              <p className="text-slate-600 leading-relaxed font-normal">{opt.description}</p>
                            </div>
                            <div className="shrink-0 flex items-center gap-1 text-3xs font-mono font-bold">
                              <span className={opt.impact.capital >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                                {opt.impact.capital >= 0 ? `+$${opt.impact.capital}M` : `-$${Math.abs(opt.impact.capital)}M`}
                              </span>
                              <span>·</span>
                              <span className={opt.impact.marketShare >= 0 ? 'text-indigo-600' : 'text-rose-600'}>
                                {opt.impact.marketShare >= 0 ? `+${opt.impact.marketShare}%` : `${opt.impact.marketShare}%`}
                              </span>
                            </div>
                          </div>

                          {/* Reveal Rationale upon submit */}
                          {isStageSubmitted && isSelected && (
                            <div className="mt-3 pt-2.5 border-t border-indigo-200/60 text-2xs text-indigo-900 font-medium flex items-start gap-1.5 animate-in fade-in">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                              <span>{opt.rationale}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-2xs text-slate-400">
                    Stage {currentStageIndex + 1} of {campaignDecisions.length}
                  </span>

                  <div>
                    {!isStageSubmitted ? (
                      <button
                        onClick={handleApplyDecision}
                        disabled={selectedOptionIndex === null}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Commit Executive Move</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleNextStage}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{currentStageIndex < campaignDecisions.length - 1 ? 'Advance to Next Stage' : 'View Campaign Scorecard'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* CAMPAIGN COMPLETED DEBRIEF SCORECARD */
              <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-6 text-center animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
                  <Award className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Campaign Completed · Executive Post-Mortem
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Mission Accomplished
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    You navigated all 4 strategic crisis stages. Here is your final executive acumen evaluation:
                  </p>
                </div>

                {/* Scorecard Badge */}
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 max-w-md mx-auto space-y-2">
                  <div className="text-3xl font-black tracking-tight flex items-center justify-center gap-2">
                    <span className="text-slate-400 text-sm font-bold uppercase">Executive Grade:</span>
                    <span className={getStrategicGrade().color}>{getStrategicGrade().grade}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-300">
                    {getStrategicGrade().label}
                  </div>
                  <p className="text-3xs text-slate-400 leading-relaxed">
                    Demonstrated disciplined focus on value chain evolution and unit economics defense without succumbing to feature-parity red oceans.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleSaveToDeck}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    <span>Add Scorecard to Board Deck</span>
                  </button>
                  <button
                    onClick={handleRestartCampaign}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Play Again / Try Different Path</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: PIPELINE BLUEPRINT WORKSHOP */}
        {modalMode === 'blueprint' && (
          <div className="flex-1 overflow-y-auto space-y-4">
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

            {/* Stepper Dots */}
            <div className="px-5 pt-2 pb-2 border-b border-slate-100 flex items-center gap-2 overflow-x-auto">
              {currentChain.steps.map((step, idx) => {
                const isDone = isSimulatorDone(step.toolId);
                const isActive = idx === activeStepIndex;
                const tool = allTools.find(t => t.id === step.toolId);

                return (
                  <button
                    key={step.toolId}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : isDone
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{idx + 1}. {tool?.shortName || step.toolId}</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Step Content */}
            <div className="p-5 space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="text-3xs uppercase font-extrabold text-indigo-600 block">Step Role: {activeStep.role}</span>
                <h4 className="text-sm font-bold text-slate-900">{activeStep.objective}</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="text-3xs uppercase font-bold text-slate-400 block">Input Piped From Previous</span>
                  <p className="text-slate-700 leading-relaxed">{activeStep.inputPipedFromPrevious}</p>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="text-3xs uppercase font-bold text-slate-400 block">Expected Deliverable</span>
                  <p className="text-slate-700 leading-relaxed font-semibold text-indigo-700">{activeStep.expectedDeliverable}</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    onClose();
                    onLaunchTool(activeStep.toolId);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-emerald-400" />
                  <span>Launch {activeStep.role} Simulator</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Global Toast */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-slate-900 text-white rounded-xl shadow-xl text-xs font-bold border border-slate-700 animate-in fade-in">
            {toastMsg}
          </div>
        )}
      </div>
    </div>
  );
}
