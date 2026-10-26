import React, { useState, useEffect } from 'react';
import {
  X,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Shield,
  Layers,
  FileText,
  Presentation,
  Check,
  RotateCcw,
  Zap,
  Play
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { saveDeckSlide } from '../utils/slideDeck.ts';

interface AuditQuestion {
  id: string;
  pillarId: 'growth' | 'operations' | 'finance' | 'governance' | 'innovation';
  pillarLabel: string;
  title: string;
  question: string;
  options: {
    score: number;
    label: string;
    description: string;
  }[];
  prescribedToolIds: string[];
}

const AUDIT_QUESTIONS: AuditQuestion[] = [
  // Pillar 1: Growth & Market Velocity
  {
    id: 'growth-1',
    pillarId: 'growth',
    pillarLabel: 'Growth & Velocity',
    title: 'Market Penetration & Pricing Power',
    question: 'How defensible is your current market position against new entrants and aggressive discounting?',
    options: [
      { score: 1, label: 'Commoditized', description: 'Constant price pressure; buyers switch easily with zero penalty.' },
      { score: 3, label: 'Defensible', description: 'Clear brand or feature wedge; moderate gross margin defense.' },
      { score: 5, label: 'Monopolistic Moat', description: 'High pricing power, unmatched NPS, strong network effects.' }
    ],
    prescribedToolIds: ['porter', 'blueocean', 'ansoff']
  },
  {
    id: 'growth-2',
    pillarId: 'growth',
    pillarLabel: 'Growth & Velocity',
    title: 'CAC Payback & Acquisition Loops',
    question: 'What is the efficiency and payback timeframe of your customer acquisition engine?',
    options: [
      { score: 1, label: 'Dilutive (>18 Mo)', description: 'Customer acquisition cost outpaces payback; high marketing burn.' },
      { score: 3, label: 'Standard (8-12 Mo)', description: 'Predictable outbound/inbound mix with steady payback.' },
      { score: 5, label: 'Compounder (<5 Mo)', description: 'Product-led organic viral loops and strong word-of-mouth.' }
    ],
    prescribedToolIds: ['growthhacking', 'stp', 'aida']
  },

  // Pillar 2: Operating Rigor & Execution
  {
    id: 'ops-1',
    pillarId: 'operations',
    pillarLabel: 'Operating Rigor',
    title: 'Cycle Time & Bottleneck Management',
    question: 'How structured is your workflow throughput and elimination of non-value-add waste?',
    options: [
      { score: 1, label: 'Chaotic & Firefighting', description: 'Frequent rework, unmapped bottlenecks, unpredictable delivery.' },
      { score: 3, label: 'Instrumented', description: 'Kanban/Scrum tracking, basic WIP limits, standard operating procedures.' },
      { score: 5, label: 'Toyota Lean / Six Sigma', description: 'Continuous Kaizen cadence, automated telemetry, sub-1% defect rate.' }
    ],
    prescribedToolIds: ['lean', 'vsm', 'sixsigma', 'kaizen']
  },
  {
    id: 'ops-2',
    pillarId: 'operations',
    pillarLabel: 'Operating Rigor',
    title: 'RACI Decision Velocity & Accountability',
    question: 'How quickly are cross-functional decisions approved, executed, and owned?',
    options: [
      { score: 1, label: 'Analysis Paralysis', description: 'Diffuse ownership, endless consensus meetings, unclear sign-offs.' },
      { score: 3, label: 'Defined Ownership', description: 'Clear product/functional leads with documented escalation paths.' },
      { score: 5, label: 'Single-Threaded Speed', description: 'Amazon-style two-way door decision velocity with explicit RACI.' }
    ],
    prescribedToolIds: ['raci', 'mckinsey7s', 'bpr']
  },

  // Pillar 3: Financial Moat & Working Capital
  {
    id: 'fin-1',
    pillarId: 'finance',
    pillarLabel: 'Financial Moat',
    title: 'Gross Margin & Operating Leverage',
    question: 'How much of each incremental revenue dollar drops to the bottom line?',
    options: [
      { score: 1, label: 'Eroding Margins', description: 'Linear cost structure; inflation or supplier price hikes hurt profits.' },
      { score: 3, label: 'Healthy Absorption', description: 'Operating costs scale sub-linearly with volume; predictable EBIT.' },
      { score: 5, label: 'Pure Operating Leverage', description: 'Software or automated model where 80%+ of incremental revenue is profit.' }
    ],
    prescribedToolIds: ['breakeven', 'dupont', 'activitybasedcosting']
  },
  {
    id: 'fin-2',
    pillarId: 'finance',
    pillarLabel: 'Financial Moat',
    title: 'Cash Conversion Cycle (CCC)',
    question: 'How efficiently does your operational cash cycle fund business growth?',
    options: [
      { score: 1, label: 'Cash Drain (>90 Days)', description: 'Capital locked up in bloated inventory or unpaid client invoices.' },
      { score: 3, label: 'Balanced (20-40 Days)', description: 'Working capital requirements closely track credit facilities.' },
      { score: 5, label: 'Negative CCC (<0 Days)', description: 'Customers prepay; supplier float funds ongoing capex expansion.' }
    ],
    prescribedToolIds: ['workingcapital', 'budgeting', 'costbenefit']
  },

  // Pillar 4: Governance, Risk & Resilience
  {
    id: 'gov-1',
    pillarId: 'governance',
    pillarLabel: 'Governance & Risk',
    title: 'Scenario Stress-Testing & Tail Risk',
    question: 'Does the leadership team regularly war-game black swan supply, regulatory, and macro shocks?',
    options: [
      { score: 1, label: 'Purely Reactive', description: 'No contingency playbook; external macro shifts cause existential crises.' },
      { score: 3, label: 'Quarterly Risk Matrix', description: 'Documented risk register and standard hedging policies.' },
      { score: 5, label: 'Antifragile Simulation', description: 'Monte Carlo models, red-team exercises, liquidity runway buffer.' }
    ],
    prescribedToolIds: ['scenarioplanning', 'riskmatrix', 'decisiontree', 'montecarlo']
  },
  {
    id: 'gov-2',
    pillarId: 'governance',
    pillarLabel: 'Governance & Risk',
    title: 'Executive OKR & Board Alignment',
    question: 'How synchronized are front-line initiatives with board-level strategic milestones?',
    options: [
      { score: 1, label: 'Silo Disconnect', description: 'Teams pursue vanity projects decoupled from board covenants.' },
      { score: 3, label: 'Standard OKRs', description: 'Biannual goal reviews with qualitative scorecards.' },
      { score: 5, label: 'Balanced Scorecarding', description: 'Real-time telemetry cascaded to executive dashboards and compensation.' }
    ],
    prescribedToolIds: ['bsc', 'okrs', 'kpi']
  },

  // Pillar 5: Product & Innovation Flywheel
  {
    id: 'inn-1',
    pillarId: 'innovation',
    pillarLabel: 'Product Flywheel',
    title: 'Hypothesis Experimentation Velocity',
    question: 'What is the speed from customer pain point hypothesis to deployed A/B test or MVP validation?',
    options: [
      { score: 1, label: 'Waterfall (6+ Mo)', description: 'Long planning cycles with high cost of failure and minimal testing.' },
      { score: 3, label: 'Sprint Cycles (2-4 Wks)', description: 'Bi-weekly release train with qualitative customer feedback.' },
      { score: 5, label: 'Rapid Flywheel (<48 Hrs)', description: 'Automated feature flags, daily experiments, Jobs-to-be-Done validation.' }
    ],
    prescribedToolIds: ['mvp', 'abtesting', 'jtbd', 'designthinking']
  },
  {
    id: 'inn-2',
    pillarId: 'innovation',
    pillarLabel: 'Product Flywheel',
    title: 'Net Retention & Customer Stickiness',
    question: 'How resilient is your customer base against churn, and do existing accounts expand over time?',
    options: [
      { score: 1, label: 'Leaky Bucket', description: 'High logo attrition forces marketing to run fast just to stay flat.' },
      { score: 3, label: 'Stable Retention', description: 'Gross churn within industry median; flat to mild expansion.' },
      { score: 5, label: 'Net Expansion (>120%)', description: 'Expansion revenue dwarfs churn; customers actively build workflows on top.' }
    ],
    prescribedToolIds: ['churnanalysis', 'cohortretention', 'nps', 'journeymap']
  }
];

const STORAGE_KEY = 'biztools_strategy_health_audit_v1';

export function StrategyHealthAuditModal({
  isOpen,
  onClose,
  allTools,
  onSelectTool
}: {
  isOpen: boolean;
  onClose: () => void;
  allTools: ToolDefinition[];
  onSelectTool: (toolId: string) => void;
}) {
  const [scores, setScores] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    // Default baseline values
    return {
      'growth-1': 3,
      'growth-2': 3,
      'ops-1': 3,
      'ops-2': 3,
      'fin-1': 3,
      'fin-2': 3,
      'gov-1': 3,
      'gov-2': 3,
      'inn-1': 3,
      'inn-2': 3
    };
  });

  const [copiedMemo, setCopiedMemo] = useState(false);
  const [addedToDeck, setAddedToDeck] = useState(false);

  // Persist answers
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch (e) {
      // ignore
    }
  }, [scores]);

  if (!isOpen) return null;

  // Calculate pillar averages (out of 5)
  const pillars = [
    { id: 'growth', label: 'Growth Velocity', qIds: ['growth-1', 'growth-2'], benchmark: 3.8 },
    { id: 'ops', label: 'Operating Rigor', qIds: ['ops-1', 'ops-2'], benchmark: 3.9 },
    { id: 'finance', label: 'Financial Moat', qIds: ['fin-1', 'fin-2'], benchmark: 4.1 },
    { id: 'gov', label: 'Governance & Risk', qIds: ['gov-1', 'gov-2'], benchmark: 3.5 },
    { id: 'inn', label: 'Product Flywheel', qIds: ['inn-1', 'inn-2'], benchmark: 3.7 }
  ];

  const pillarAverages = pillars.map(p => {
    const sum = p.qIds.reduce((acc, qId) => acc + (scores[qId] || 3), 0);
    const avg = sum / p.qIds.length;
    return { ...p, score: avg };
  });

  const totalScorePoints = Object.values(scores).reduce((a, b) => a + b, 0);
  const normalizedScore = Math.round((totalScorePoints / 50) * 100);

  // Tier classification
  let archetype = 'Disciplined Scaler';
  let archetypedesc = 'Solid operational and financial foundation with targeted upside in rapid market expansion and moat defense.';
  let badgeColor = 'bg-blue-100 text-blue-900 border-blue-300';

  if (normalizedScore >= 85) {
    archetype = 'Elite Compounder';
    archetypedesc = 'World-class execution with deep unit economic moats, rapid decision velocity, and high cash flow generation.';
    badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
  } else if (normalizedScore < 60) {
    archetype = 'Turnaround Candidate';
    archetypedesc = 'Urgent operational fire-fighting and cash preservation needed. Address working capital leaks and clarify RACI ownership.';
    badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
  }

  // Identify weakest pillars for targeted prescription
  const sortedPillars = [...pillarAverages].sort((a, b) => a.score - b.score);
  const weakestPillar = sortedPillars[0];
  const secondWeakestPillar = sortedPillars[1];

  // Prescribed frameworks from weakest questions
  const weakQuestions = AUDIT_QUESTIONS.filter(q => q.pillarId === weakestPillar.id || q.pillarId === secondWeakestPillar.id);
  const recommendedToolIds = Array.from(new Set(weakQuestions.flatMap(q => q.prescribedToolIds))).slice(0, 4);
  const recommendedTools = recommendedToolIds
    .map(id => allTools.find(t => t.id === id))
    .filter((t): t is ToolDefinition => !!t);

  // SVG Radar Chart Math
  const size = 320;
  const center = size / 2;
  const radius = 110;
  const numAxes = 5;

  const getCoordinates = (index: number, valueRatio: number) => {
    // Start at top (-Math.PI / 2) and distribute evenly
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const x = center + radius * valueRatio * Math.cos(angle);
    const y = center + radius * valueRatio * Math.sin(angle);
    return { x, y };
  };

  // Polygon points for User Score
  const userPolygonPoints = pillarAverages
    .map((p, idx) => {
      const coord = getCoordinates(idx, p.score / 5);
      return `${coord.x},${coord.y}`;
    })
    .join(' ');

  // Polygon points for Top Quartile Benchmark
  const benchmarkPolygonPoints = pillarAverages
    .map((p, idx) => {
      const coord = getCoordinates(idx, p.benchmark / 5);
      return `${coord.x},${coord.y}`;
    })
    .join(' ');

  const handleCopyMemo = () => {
    const memo = `# Executive Strategy Health Audit & Diagnostic Memo
**Generated:** ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
**Overall Strategy Health Score:** ${normalizedScore} / 100 (${archetype})
**Benchmark Comparison:** P75 Top Quartile

## Dimension Breakdown
${pillarAverages.map(p => `- **${p.label}:** ${p.score.toFixed(1)} / 5.0 (Benchmark: ${p.benchmark.toFixed(1)})`).join('\n')}

## Executive Assessment
${archetypedesc}

## Priority Vulnerabilities
- Primary Gap: **${weakestPillar.label}** (${weakestPillar.score.toFixed(1)}/5.0)
- Secondary Gap: **${secondWeakestPillar.label}** (${secondWeakestPillar.score.toFixed(1)}/5.0)

## Prescribed C-Suite Framework Action Plan
${recommendedTools.map(t => `- **${t.name} (${t.category}):** ${t.tagline} -> Target: ${t.keyOutput}`).join('\n')}

---
*Evaluated via BizTools Executive Suite · https://sundaresh.blog*`;

    navigator.clipboard.writeText(memo);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2500);
  };

  const handleAddToDeck = () => {
    saveDeckSlide({
      toolId: 'strategy-audit',
      toolName: 'Strategy Health Audit',
      pillar: 'Executive Diagnostics',
      title: `Executive Diagnostic Scorecard: ${archetype} (${normalizedScore}/100)`,
      executiveSummary: `Strategic diagnosis reveals ${archetype} posture. Primary constraint identified in ${weakestPillar.label} (${weakestPillar.score.toFixed(1)}/5.0). Immediate focus required on ${recommendedTools.map(t => t.name).join(', ')}.`,
      keyMetrics: [
        { label: 'Overall Health', value: `${normalizedScore}/100`, trend: normalizedScore >= 70 ? 'up' : 'down' },
        { label: 'Primary Gap', value: weakestPillar.label },
        { label: 'Strongest Axis', value: sortedPillars[sortedPillars.length - 1].label }
      ],
      strategicRecommendations: recommendedTools.map(t => `Deploy ${t.name} to remediate operational bottlenecks and elevate ${t.keyOutput}`),
      notes: 'Generated from 10-point strategic health assessment across Growth, Operations, Finance, Governance, and Innovation.'
    });

    setAddedToDeck(true);
    setTimeout(() => setAddedToDeck(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Executive Strategy Health Audit & Radar
                </h3>
                <span className="text-3xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  10 Core Indicators
                </span>
              </div>
              <p className="text-xs text-slate-500">
                10-point diagnostic mapping organizational resilience across 5 C-Suite dimensions with tailored framework prescriptions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyMemo}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              {copiedMemo ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <FileText className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedMemo ? 'Copied Memo!' : 'Copy Memo'}</span>
            </button>

            <button
              onClick={handleAddToDeck}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              {addedToDeck ? <Check className="w-3.5 h-3.5 text-indigo-600" /> : <Presentation className="w-3.5 h-3.5 text-indigo-600" />}
              <span>{addedToDeck ? 'Added to Slide Deck!' : 'Add to Deck'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Radar Chart & Prescriptions (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Health Scorecard Summary */}
            <div className="p-4 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold uppercase tracking-wider text-indigo-200">
                  Overall Diagnostic Score
                </span>
                <span className={`text-2xs font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                  {archetype}
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black font-mono tracking-tight text-white tabular-nums">
                  {normalizedScore}
                </span>
                <span className="text-sm font-semibold text-slate-400">/ 100 pts</span>
                <span className="text-2xs text-emerald-400 ml-auto font-medium">
                  P75 Benchmark: 76
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {archetypedesc}
              </p>
            </div>

            {/* Interactive SVG Radar Chart */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center shadow-2xs">
              <div className="w-full flex items-center justify-between text-2xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                <span>5-Pillar Spider Map</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
                    Your Firm
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-dashed border-slate-500 inline-block"></span>
                    P75 Industry
                  </span>
                </div>
              </div>

              <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
                  {/* Concentric grid pentagons */}
                  {[0.2, 0.4, 0.6, 0.8, 1.0].map((ratio, idx) => {
                    const gridPoints = Array.from({ length: numAxes })
                      .map((_, aIdx) => {
                        const pt = getCoordinates(aIdx, ratio);
                        return `${pt.x},${pt.y}`;
                      })
                      .join(' ');
                    return (
                      <polygon
                        key={idx}
                        points={gridPoints}
                        fill={idx === 4 ? '#ffffff' : 'none'}
                        stroke="#cbd5e1"
                        strokeWidth="0.8"
                        strokeDasharray={idx < 4 ? '3 3' : 'none'}
                      />
                    );
                  })}

                  {/* 5 Axis lines */}
                  {Array.from({ length: numAxes }).map((_, idx) => {
                    const pt = getCoordinates(idx, 1.0);
                    return (
                      <line
                        key={idx}
                        x1={center}
                        y1={center}
                        x2={pt.x}
                        y2={pt.y}
                        stroke="#cbd5e1"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Benchmark Polygon */}
                  <polygon
                    points={benchmarkPolygonPoints}
                    fill="rgba(148, 163, 184, 0.15)"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />

                  {/* User Score Polygon */}
                  <polygon
                    points={userPolygonPoints}
                    fill="rgba(99, 102, 241, 0.25)"
                    stroke="#4f46e5"
                    strokeWidth="2.5"
                  />

                  {/* Data Points on User Polygon */}
                  {pillarAverages.map((p, idx) => {
                    const pt = getCoordinates(idx, p.score / 5);
                    return (
                      <circle
                        key={idx}
                        cx={pt.x}
                        cy={pt.y}
                        r="4"
                        fill="#4338ca"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    );
                  })}

                  {/* Axis Labels */}
                  {pillarAverages.map((p, idx) => {
                    const labelPt = getCoordinates(idx, 1.22);
                    return (
                      <text
                        key={idx}
                        x={labelPt.x}
                        y={labelPt.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[10px] font-bold fill-slate-700 select-none"
                      >
                        {p.label}
                      </text>
                    );
                  })}
                </svg>
              </div>

              {/* 5-pillar numerical readouts */}
              <div className="grid grid-cols-5 gap-1.5 w-full mt-3 pt-3 border-t border-slate-200">
                {pillarAverages.map(p => (
                  <div key={p.id} className="text-center">
                    <span className="text-3xs text-slate-400 block font-semibold truncate">{p.label.split(' ')[0]}</span>
                    <span className="text-xs font-mono font-bold text-slate-800 tabular-nums">
                      {p.score.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prescribed Frameworks Box */}
            <div className="p-4 bg-indigo-50/80 border border-indigo-200/90 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
                  Prescribed Framework Action Plan
                </h4>
              </div>
              <p className="text-2xs text-slate-600">
                Targeting vulnerabilities in <span className="font-bold text-indigo-900">{weakestPillar.label}</span> and <span className="font-bold text-indigo-900">{secondWeakestPillar.label}</span>:
              </p>

              <div className="space-y-2">
                {recommendedTools.map(t => (
                  <div
                    key={t.id}
                    className="p-2.5 bg-white border border-indigo-100 rounded-xl flex items-center justify-between gap-3 shadow-2xs hover:border-indigo-300 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">{t.name}</div>
                      <div className="text-2xs text-slate-500 truncate">{t.category} · {t.tagline}</div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectTool(t.id);
                        onClose();
                      }}
                      className="px-2.5 py-1 text-2xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 rounded-lg transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <span>Sim</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 10 Diagnostic Questionnaires (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Executive Questionnaire (10 Diagnostic Indicators)
              </h4>
              <button
                onClick={() => {
                  setScores({
                    'growth-1': 3,
                    'growth-2': 3,
                    'ops-1': 3,
                    'ops-2': 3,
                    'fin-1': 3,
                    'fin-2': 3,
                    'gov-1': 3,
                    'gov-2': 3,
                    'inn-1': 3,
                    'inn-2': 3
                  });
                }}
                className="text-2xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Defaults
              </button>
            </div>

            <div className="space-y-3.5">
              {AUDIT_QUESTIONS.map((q, idx) => {
                const currentVal = scores[q.id] || 3;

                return (
                  <div
                    key={q.id}
                    className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2.5 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-3xs font-mono font-bold px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                            #{idx + 1}
                          </span>
                          <span className="text-2xs font-bold text-indigo-700 uppercase tracking-wider">
                            {q.pillarLabel}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-900 mt-1">
                          {q.title}
                        </h5>
                        <p className="text-2xs text-slate-600 mt-0.5">
                          {q.question}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-black text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          {currentVal} / 5
                        </span>
                      </div>
                    </div>

                    {/* 3 Selectable option pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      {q.options.map(opt => {
                        const isSelected = currentVal === opt.score;
                        return (
                          <button
                            key={opt.score}
                            onClick={() => setScores(prev => ({ ...prev, [q.id]: opt.score }))}
                            className={`p-2 rounded-lg text-left transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-50 border-indigo-400 ring-1 ring-indigo-400/40 shadow-2xs'
                                : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-600'
                            }`}
                          >
                            <div className="flex items-center justify-between text-2xs font-bold">
                              <span className={isSelected ? 'text-indigo-950' : 'text-slate-800'}>
                                {opt.score}. {opt.label}
                              </span>
                              {isSelected && <CheckCircle2 className="w-3 h-3 text-indigo-600" />}
                            </div>
                            <p className="text-3xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                              {opt.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <div className="text-2xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Audit auto-saved locally · Re-run anytime for quarterly Board review
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToDeck}
              className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-indigo-900 hover:bg-indigo-800 text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Presentation className="w-3.5 h-3.5 text-indigo-200" />
              <span>{addedToDeck ? 'Added!' : 'Add Scorecard to Board Deck'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
