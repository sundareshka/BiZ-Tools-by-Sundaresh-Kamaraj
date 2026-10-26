import { useState, useMemo } from 'react';
import {
  PlayCircle,
  BookOpen,
  ShieldAlert,
  CheckCircle2,
  GitCompare,
  FileText,
  ArrowRight,
  TrendingUp,
  Compass,
  Layers,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Coins,
  KanbanSquare,
  Users,
  AlertOctagon,
  Rocket,
  BarChart3,
  ExternalLink,
  Target,
  BrainCircuit,
  Award,
  HelpCircle,
  ChevronDown,
  Search,
  Activity,
  Briefcase,
  Zap,
  RotateCcw,
  Check,
  Building,
  Printer,
  Sliders,
  Flame,
  Key
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { DailyBusinessInsight } from './DailyBusinessInsight.tsx';
import { INDUSTRY_PRESETS, IndustryPreset } from '../data/industryPresetsData.ts';
import { getToolIcon } from '../data/toolIcons.ts';

export interface HomePageProps {
  allTools: ToolDefinition[];
  onSelectTool: (toolId: string, view: 'simulators' | 'tools' | 'quizzes') => void;
  onNavigateTab: (tab: 'home' | 'simulators' | 'tools' | 'scenarios' | 'quizzes' | 'stacks' | 'glossary' | 'performance' | 'author') => void;
  completedSimulatorsCount?: number;
  completedQuizzesCount?: number;
  onOpenHealthAudit?: () => void;
  onOpenCertificate?: () => void;
  onOpenPresets?: () => void;
  onOpenSearch?: () => void;
  onOpenDeckBuilder?: () => void;
  onOpenStrategyVault?: () => void;
  onApplyPreset?: (presetId: string, primaryToolId: string) => void;
}

// Strategic Triage Diagnostic Prescription Matrix
interface TriagePrescription {
  title: string;
  subtitle: string;
  diagnosticNote: string;
  sundareshPrinciple: string;
  tools: {
    toolId: string;
    stepNumber: string;
    phase: string;
    rationale: string;
  }[];
}

const TRIAGE_PRESCRIPTIONS: Record<string, TriagePrescription> = {
  'margin': {
    title: 'Margin Compression & Capital Optimization Protocol',
    subtitle: 'Deconstruct operating leverage, isolate fixed cost leakage, and purge low-yield processes.',
    diagnosticNote: 'When gross margins erode, aggressive sales volume rarely rescues EBITDA. The solution requires systematic fixed-cost re-baselining and Dupont ROE decomposition.',
    sundareshPrinciple: 'In high-inflation or compressed-pricing regimes, EBITDA is preserved through asset turnover velocity and unit contribution discipline, not speculative top-line growth.',
    tools: [
      { toolId: 'dupont', stepNumber: '01', phase: 'Capital Decomposition', rationale: 'Deconstruct ROE into Net Margin, Asset Turnover, and Financial Leverage to pinpoint the leakage.' },
      { toolId: 'breakeven', stepNumber: '02', phase: 'Operating Leverage', rationale: 'Calculate contribution margin per unit and quantify margin-of-safety volume buffers.' },
      { toolId: 'toc', stepNumber: '03', phase: 'Throughput Bottlenecks', rationale: 'Exploit the single rate-limiting process constraint to accelerate cash conversion velocity.' }
    ]
  },
  'growth': {
    title: 'Market Saturation & Value Innovation Protocol',
    subtitle: 'Escape commoditized red oceans, redefine buyer criteria, and open uncontested market spaces.',
    diagnosticNote: 'Mature industries trap enterprises in price-matching wars. Sustained growth requires diverging from legacy industry factors via Four Actions curve plotting.',
    sundareshPrinciple: 'True competitive strategy is not about beating rivals at their existing game; it is about creating uncontested market space that makes the competition irrelevant.',
    tools: [
      { toolId: 'swot', stepNumber: '01', phase: 'Environmental Audit', rationale: 'Execute TOWS cross-mapping to convert external market shifts into high-conviction attack strategies.' },
      { toolId: 'blueocean', stepNumber: '02', phase: 'Value Curve Divergence', rationale: 'Eliminate and reduce costly legacy factors while raising and creating premium buyer benefits.' },
      { toolId: 'ansoff', stepNumber: '03', phase: 'Portfolio Expansion', rationale: 'Evaluate market penetration vs. product expansion risk vectors and capital allocation requirements.' }
    ]
  },
  'bottlenecks': {
    title: 'Operational Agility & Waste Elimination Protocol',
    subtitle: 'Compress lead times, eliminate systemic cycle variance, and establish synchronized pull systems.',
    diagnosticNote: 'Operational delays originate from non-value-added waiting, uneven batch sizes, and hidden queues across department boundaries.',
    sundareshPrinciple: 'Process excellence is the elimination of organizational friction. An hour lost at the system bottleneck is an hour lost for the entire enterprise forever.',
    tools: [
      { toolId: 'vsm', stepNumber: '01', phase: 'Value Stream Mapping', rationale: 'Map total lead time vs. processing touch time to expose massive non-value-added waiting steps.' },
      { toolId: 'dmaic', stepNumber: '02', phase: 'Root-Cause Six Sigma', rationale: 'Apply Define-Measure-Analyze-Improve-Control to eliminate variance and root-cause defects.' },
      { toolId: 'sipoc', stepNumber: '03', phase: 'High-Level Boundary Scan', rationale: 'Align Suppliers, Inputs, Process, Outputs, and Customers across executive handoffs.' }
    ]
  },
  'unit_econ': {
    title: 'Customer Unit Economics & Retention Engine Protocol',
    subtitle: 'Drive down CAC payback duration, protect gross retention, and engineer organic expansion loops.',
    diagnosticNote: 'Acquiring churn-prone accounts with >18-month CAC payback burns balance sheet liquidity. Sustainable growth hinges on net revenue expansion.',
    sundareshPrinciple: 'Valuation multiples in modern enterprises are defined by Net Revenue Retention (NRR). Expanding an existing customer produces 3.8x higher equity value than acquiring a replacement logo.',
    tools: [
      { toolId: 'unit_economics', stepNumber: '01', phase: 'LTV / CAC Physics', rationale: 'Simulate gross margin, payback horizon, and magic number thresholds under varying churn.' },
      { toolId: 'pirate_metrics', stepNumber: '02', phase: 'AARRR Funnel Velocity', rationale: 'Diagnose drop-off rates across Acquisition, Activation, Retention, Referral, and Revenue.' },
      { toolId: 'kano', stepNumber: '03', phase: 'Feature Value Prioritization', rationale: 'Differentiate baseline must-haves from high-delight features that drive willingness to pay.' }
    ]
  },
  'alignment': {
    title: 'Organizational Execution & Governance Alignment Protocol',
    subtitle: 'Eliminate executive silo friction, synchronize quarterly OKRs, and cement decision rights.',
    diagnosticNote: 'Strategic plans rarely fail from poor intent; they fail from misaligned incentive structures, vague accountability, and ambiguous ownership.',
    sundareshPrinciple: 'Culture and organizational structure must follow strategy with military precision. Strategy without clear RACI accountability is merely corporate wishful thinking.',
    tools: [
      { toolId: 'mckinsey_7s', stepNumber: '01', phase: 'Systemic Alignment', rationale: 'Audit mutual reinforcement across Strategy, Structure, Systems, Shared Values, Style, Staff, Skills.' },
      { toolId: 'raci_matrix', stepNumber: '02', phase: 'Decision Governance', rationale: 'Designate exactly one Accountable owner per strategic deliverable to eliminate consensus paralysis.' },
      { toolId: 'okr_framework', stepNumber: '03', phase: 'Cadence & Outcomes', rationale: 'Cascade ambitious Objectives and verifiable Key Results down to weekly operational execution.' }
    ]
  },
  'risk': {
    title: 'Asymmetric Risk & Scenario Governance Protocol',
    subtitle: 'Stress-test balance sheets under macroeconomic volatility, supply shocks, and black-swan shocks.',
    diagnosticNote: 'Linear forecasts collapse during structural macroeconomic volatility. Leadership teams must model stochastic probability distributions.',
    sundareshPrinciple: 'Executive leadership is the art of navigating uncertainty with asymmetric upside while guaranteeing enterprise survival against ruinous tail-risk events.',
    tools: [
      { toolId: 'risk_matrix', stepNumber: '01', phase: 'Severity Matrix', rationale: 'Quantify corporate vulnerabilities across 5x5 impact and probability grids with mitigation costs.' },
      { toolId: 'scenario_planning', stepNumber: '02', phase: 'Macro Plausibility Matrix', rationale: 'Construct 2x2 critical uncertainty quadrants to rehearse high-conviction contingent responses.' },
      { toolId: 'premortem', stepNumber: '03', phase: 'Psychological Stress Test', rationale: 'Assume project failure 18 months forward to uncover hidden assumptions and institutional blind spots.' }
    ]
  }
};

// Curated Executive Day-1 Strategic Flight Paths
interface StrategicTrack {
  id: string;
  name: string;
  role: string;
  timeEstimate: string;
  accentColor: string;
  badgeClass: string;
  description: string;
  steps: {
    toolId: string;
    stepName: string;
    pillarName: string;
    objective: string;
  }[];
}

const STRATEGIC_TRACKS: StrategicTrack[] = [
  {
    id: 'c-suite',
    name: 'The C-Suite Strategist Track',
    role: 'Chief Executive Officer & Chief Strategy Officer',
    timeEstimate: '35 mins',
    accentColor: 'indigo',
    badgeClass: 'bg-indigo-100 text-indigo-900 border-indigo-200',
    description: 'Establish baseline environmental posture, identify asymmetric market divergence opportunities, and align corporate portfolio allocation.',
    steps: [
      { toolId: 'swot', stepName: 'TOWS Matrix', pillarName: 'Strategy', objective: 'Audit external threats & leverage core internal strengths' },
      { toolId: 'porter5', stepName: 'Porter Five Forces', pillarName: 'Strategy', objective: 'Analyze structural industry power and profit pools' },
      { toolId: 'blueocean', stepName: 'Blue Ocean Canvas', pillarName: 'Strategy', objective: 'Diverge from commoditized red ocean competition' },
      { toolId: 'mckinsey_7s', stepName: 'McKinsey 7S', pillarName: 'HR & Org', objective: 'Verify organizational alignment before strategic rollout' }
    ]
  },
  {
    id: 'cfo-turnaround',
    name: 'The CFO & Turnaround Architect Track',
    role: 'Chief Financial Officer & Restructuring Director',
    timeEstimate: '40 mins',
    accentColor: 'emerald',
    badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    description: 'Diagnose balance sheet leverage, model operating margin break-even points, and eliminate capital allocation drag.',
    steps: [
      { toolId: 'dupont', stepName: 'DuPont ROE Analysis', pillarName: 'Financial', objective: 'Deconstruct return on equity into margin, turnover, and leverage' },
      { toolId: 'breakeven', stepName: 'Break-Even Economics', pillarName: 'Financial', objective: 'Determine minimum viable volume to service fixed liabilities' },
      { toolId: 'toc', stepName: 'Theory of Constraints', pillarName: 'Operations', objective: 'Exploit system bottlenecks to maximize cash throughput' },
      { toolId: 'dcf_wacc', stepName: 'DCF & WACC Valuation', pillarName: 'Financial', objective: 'Model cost of capital hurdle rates against terminal value' }
    ]
  },
  {
    id: 'product-gtm',
    name: 'The Product & GTM Leader Track',
    role: 'VP Product & Chief Commercial Officer',
    timeEstimate: '30 mins',
    accentColor: 'amber',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-200',
    description: 'Validate customer problem spaces, optimize payback horizons, and align cross-functional product roadmaps to high-LTV cohorts.',
    steps: [
      { toolId: 'lean_canvas', stepName: 'Lean Canvas', pillarName: 'Innovation', objective: 'Map rapid 1-page business model hypothesis and unfair moats' },
      { toolId: 'pirate_metrics', stepName: 'Pirate Metrics (AARRR)', pillarName: 'Marketing', objective: 'Diagnose conversion velocity across the customer journey' },
      { toolId: 'unit_economics', stepName: 'Unit Economics (CAC/LTV)', pillarName: 'Marketing', objective: 'Model gross margin payback under voluntary churn' },
      { toolId: 'kano', stepName: 'Kano Model', pillarName: 'Product', objective: 'Prioritize feature backlog by customer emotional delight' }
    ]
  },
  {
    id: 'operations-excellence',
    name: 'The Operations & Quality Director Track',
    role: 'Chief Operating Officer & VP Operational Excellence',
    timeEstimate: '35 mins',
    accentColor: 'teal',
    badgeClass: 'bg-teal-100 text-teal-900 border-teal-200',
    description: 'Compress end-to-end lead time, eliminate the 8 deadly wastes, and establish rigorous statistical variance controls.',
    steps: [
      { toolId: 'vsm', stepName: 'Value Stream Mapping', pillarName: 'Operations', objective: 'Expose waiting time vs. active processing touch time' },
      { toolId: 'dmaic', stepName: 'Six Sigma DMAIC', pillarName: 'Operations', objective: 'Apply statistical variance reduction to critical processes' },
      { toolId: 'sipoc', stepName: 'SIPOC Matrix', pillarName: 'Operations', objective: 'Define boundary interfaces between suppliers and customers' },
      { toolId: 'raci_matrix', stepName: 'RACI Governance', pillarName: 'Project', objective: 'Eliminate accountability ambiguity across department handoffs' }
    ]
  }
];

export function HomePage({
  allTools,
  onSelectTool,
  onNavigateTab,
  completedSimulatorsCount = 0,
  completedQuizzesCount = 0,
  onOpenHealthAudit,
  onOpenCertificate,
  onOpenPresets,
  onOpenSearch,
  onOpenDeckBuilder,
  onOpenStrategyVault,
  onApplyPreset
}: HomePageProps) {
  // Interactive Hero Mini-Simulator State (DuPont ROE interactive sandbox)
  const [netMargin, setNetMargin] = useState<number>(14.5);
  const [assetTurnover, setAssetTurnover] = useState<number>(1.25);
  const [equityMultiplier, setEquityMultiplier] = useState<number>(1.85);

  // Active pillar filter for the 10 pillars interactive explorer
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);

  // Active FAQ accordion state for AEO/GEO Answer Center
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quick Command Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  // Strategic Triage Diagnostic State
  const [selectedUrgency, setSelectedUrgency] = useState<string>('margin');
  const [selectedModel, setSelectedModel] = useState<string>('enterprise_b2b');

  // Selected Strategic Flight Path Track
  const [activeTrackId, setActiveTrackId] = useState<string>('c-suite');

  // Calculate live DuPont ROE on hero
  const calculatedRoe = ((netMargin / 100) * assetTurnover * equityMultiplier * 100).toFixed(1);

  // Live filter of all tools based on quick search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allTools
      .filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.shortName.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.caseStudy.company.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [allTools, searchQuery]);

  const pillarsData = [
    {
      id: 'Strategy',
      number: '01',
      title: 'Strategy & Market Positioning',
      toolsCount: 8,
      strategicQuestion: 'Where will we play and how will we build sustainable competitive advantage?',
      icon: Compass,
      color: 'border-blue-200 bg-blue-50/50 text-blue-900',
      badgeClass: 'bg-blue-100 text-blue-800',
      featuredTools: ['swot', 'porter5', 'blueocean', 'ansoff', 'wardley', 'bcg']
    },
    {
      id: 'Innovation',
      number: '02',
      title: 'Business Model Innovation',
      toolsCount: 6,
      strategicQuestion: 'How do we design, configure, and capture new commercial value?',
      icon: LightbulbCustom,
      color: 'border-emerald-200 bg-emerald-50/50 text-emerald-900',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      featuredTools: ['bmc', 'vpc', 'lean_canvas', 'tentypes', 'three_horizons']
    },
    {
      id: 'Marketing',
      number: '03',
      title: 'Marketing & Go-To-Market Growth',
      toolsCount: 6,
      strategicQuestion: 'How do we systematically identify, acquire, convert, and retain high-LTV customers?',
      icon: Target,
      color: 'border-amber-200 bg-amber-50/50 text-amber-900',
      badgeClass: 'bg-amber-100 text-amber-800',
      featuredTools: ['marketing_mix', 'pirate_metrics', 'stp_framework', 'growth_flywheel']
    },
    {
      id: 'Operations',
      number: '04',
      title: 'Operations & Process Excellence',
      toolsCount: 6,
      strategicQuestion: 'How do we eliminate systemic waste, variance, and throughput bottlenecks?',
      icon: Layers,
      color: 'border-teal-200 bg-teal-50/50 text-teal-900',
      badgeClass: 'bg-teal-100 text-teal-800',
      featuredTools: ['vsm', 'dmaic', 'toc', 'sipoc', 'kaizen']
    },
    {
      id: 'Financial',
      number: '05',
      title: 'Financial Performance & Valuation',
      toolsCount: 6,
      strategicQuestion: 'How do capital allocation, working capital efficiency, and unit economics drive enterprise value?',
      icon: Coins,
      color: 'border-emerald-200 bg-emerald-50/50 text-emerald-900',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      featuredTools: ['dupont', 'dcf_wacc', 'unit_economics', 'breakeven', 'eva']
    },
    {
      id: 'Project',
      number: '06',
      title: 'Project & Portfolio Execution',
      toolsCount: 5,
      strategicQuestion: 'How do we align multi-quarter strategic roadmaps to on-time, budget-disciplined delivery?',
      icon: KanbanSquare,
      color: 'border-indigo-200 bg-indigo-50/50 text-indigo-900',
      badgeClass: 'bg-indigo-100 text-indigo-800',
      featuredTools: ['critical_path', 'agile_scrum', 'raci_matrix', 'evm', 'okr_framework']
    },
    {
      id: 'HR',
      number: '07',
      title: 'HR & Organizational Design',
      toolsCount: 5,
      strategicQuestion: 'How do culture, talent readiness, and organizational alignment accelerate strategy?',
      icon: Users,
      color: 'border-purple-200 bg-purple-50/50 text-purple-900',
      badgeClass: 'bg-purple-100 text-purple-800',
      featuredTools: ['mckinsey_7s', 'kotter_change', 'nine_box', 'gallup_q12']
    },
    {
      id: 'Risk',
      number: '08',
      title: 'Risk & Decision Architecture',
      toolsCount: 5,
      strategicQuestion: 'How do leadership teams make robust choices under profound volatility and asymmetric risk?',
      icon: AlertOctagon,
      color: 'border-rose-200 bg-rose-50/50 text-rose-900',
      badgeClass: 'bg-rose-100 text-rose-800',
      featuredTools: ['monte_carlo', 'decision_tree', 'cynefin', 'fmea', 'premortem']
    },
    {
      id: 'Product',
      number: '09',
      title: 'Product Strategy & Startup Growth',
      toolsCount: 5,
      strategicQuestion: 'How do product teams validate customer problems, drive retention loops, and find product-market fit?',
      icon: Rocket,
      color: 'border-cyan-200 bg-cyan-50/50 text-cyan-900',
      badgeClass: 'bg-cyan-100 text-cyan-800',
      featuredTools: ['design_thinking', 'hook_model', 'rice_scoring', 'north_star', 'kano']
    },
    {
      id: 'Analytics',
      number: '10',
      title: 'Data & Advanced Business Analytics',
      toolsCount: 5,
      strategicQuestion: 'How do modern enterprises translate raw business telemetry into predictive executive driver trees?',
      icon: BarChart3,
      color: 'border-violet-200 bg-violet-50/50 text-violet-900',
      badgeClass: 'bg-violet-100 text-violet-800',
      featuredTools: ['kpis', 'dashboards', 'cohorts', 'predictive', 'star_schema']
    }
  ];

  const currentPillar = pillarsData[activePillarIndex];
  const pillarTools = allTools.filter(t => t.category.toLowerCase().includes(currentPillar.id.toLowerCase()));

  // Active Triage Prescription
  const activePrescription = TRIAGE_PRESCRIPTIONS[selectedUrgency] || TRIAGE_PRESCRIPTIONS['margin'];

  // Active Flight Path
  const activeTrack = STRATEGIC_TRACKS.find(t => t.id === activeTrackId) || STRATEGIC_TRACKS[0];

  return (
    <div className="space-y-16 py-4">
      {/* 1. HERO SECTION: Executive Positioning + Interactive Live Model Preview */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 p-6 sm:p-10 lg:p-14 shadow-xl">
        {/* Geometric backdrop */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: '28px 28px'
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Executive Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5 text-xs font-medium text-slate-400 flex-wrap">
              <div className="w-7 h-7 rounded-lg overflow-hidden bg-white border border-slate-700 shadow-2xs shrink-0 flex items-center justify-center">
                <img
                  src="/assets/aistudio/Sundaresh_Kamaraj_Logo-01_840f0755.jpg"
                  alt="BizTools by Sundaresh Kamaraj"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-bold tracking-wider uppercase text-slate-300 font-mono">BizTools</span>
              <span aria-hidden="true">·</span>
              <span>by Sundaresh Kamaraj</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400 font-semibold font-mono">57 Core Frameworks</span>
              <span aria-hidden="true">·</span>
              <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-3xs font-mono font-bold">
                Version 1.22
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] font-display text-balance">
              Executive Decision Systems & Strategic Modeling Suite
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Master 57 foundational frameworks across 10 executive disciplines. Move beyond passive theory with live numerical simulators, 44 crisis scenario missions, 5 curated enterprise case presets, and 285 rigorous certification assessments.
            </p>

            {/* Direct Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap">
              <button
                onClick={() => onNavigateTab('simulators')}
                className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <PlayCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Launch Interactive Simulators</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onNavigateTab('quizzes')}
                className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Certification Assessments</span>
              </button>

              {onOpenHealthAudit && (
                <button
                  onClick={onOpenHealthAudit}
                  className="px-4 py-3.5 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-200 border border-indigo-500/40 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  title="Run 10-Point Strategic Health Audit"
                >
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <span>Health Audit</span>
                </button>
              )}

              {onOpenPresets && (
                <button
                  onClick={onOpenPresets}
                  className="px-4 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Explore 5 Curated Enterprise Case Studies"
                >
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span>Case Presets</span>
                </button>
              )}
            </div>

            {/* Architecture Metrics Strip */}
            <div className="pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">57</div>
                <div className="text-3xs text-slate-400 uppercase tracking-wider font-semibold">Executive Tools</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">10</div>
                <div className="text-3xs text-slate-400 uppercase tracking-wider font-semibold">Disciplines</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">44</div>
                <div className="text-3xs text-slate-400 uppercase tracking-wider font-semibold">Scenario Labs</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">285</div>
                <div className="text-3xs text-slate-400 uppercase tracking-wider font-semibold">Exam Questions</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Model Widget (DuPont ROE Decomposition Preview) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-200 tracking-wide">
                    Live Simulator Sandbox: DuPont ROE
                  </span>
                </div>
                <span className="text-3xs font-mono text-slate-400">Pillar 05</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-3xs text-slate-400 uppercase tracking-wider block font-semibold">
                    Calculated Return on Equity (ROE)
                  </span>
                  <div className="text-2xl font-black text-emerald-400 font-mono tabular-nums">
                    {calculatedRoe}%
                  </div>
                </div>
                <div className="text-right text-3xs font-mono text-slate-400 leading-tight">
                  <div>Margin: {netMargin}%</div>
                  <div>Turnover: {assetTurnover}×</div>
                  <div>Leverage: {equityMultiplier}×</div>
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Net Profit Margin</span>
                    <span className="font-mono text-slate-200 font-semibold">{netMargin}%</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="35"
                    step="0.5"
                    value={netMargin}
                    onChange={(e) => setNetMargin(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Asset Turnover (Efficiency)</span>
                    <span className="font-mono text-slate-200 font-semibold">{assetTurnover}×</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="3.0"
                    step="0.05"
                    value={assetTurnover}
                    onChange={(e) => setAssetTurnover(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Equity Multiplier (Financial Leverage)</span>
                    <span className="font-mono text-slate-200 font-semibold">{equityMultiplier}×</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="4.5"
                    step="0.05"
                    value={equityMultiplier}
                    onChange={(e) => setEquityMultiplier(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-3xs text-slate-400">
                <span>Try parameter shifts on 57 live simulators</span>
                <button
                  onClick={() => onSelectTool('dupont', 'simulators')}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full DuPont Tool</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HERO SEARCH & EXECUTIVE COMMAND BAR (SUGGESTION #4) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input Container */}
          <div className="relative flex-1">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search 57 frameworks, metrics, or case studies (e.g., 'Turnaround', 'DuPont', 'CAC', 'Pricing', 'Bottlenecks')..."
                className="w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-12 text-2xs text-slate-400 hover:text-slate-600 px-1 py-0.5"
                >
                  Clear
                </button>
              )}
              {onOpenSearch && (
                <button
                  onClick={onOpenSearch}
                  className="absolute right-2 px-2 py-1 rounded bg-slate-200/70 hover:bg-slate-300 text-slate-600 font-mono text-3xs font-semibold flex items-center gap-1 cursor-pointer"
                  title="Open Executive Command Palette (Cmd+K)"
                >
                  <Key className="w-2.5 h-2.5" />
                  <span>⌘K</span>
                </button>
              )}
            </div>

            {/* Instant Search Dropdown Popover */}
            {searchQuery.trim().length > 0 && isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden divide-y divide-slate-100 max-h-80 overflow-y-auto">
                <div className="px-3 py-1.5 bg-slate-50 text-3xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                  <span>Matching Frameworks ({searchResults.length})</span>
                  <button onClick={() => setIsSearchFocused(false)} className="text-indigo-600 hover:underline">
                    Close
                  </button>
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No frameworks matched "{searchQuery}". Try browsing by discipline or pressing ⌘K.
                  </div>
                ) : (
                  searchResults.map(tool => {
                    const ToolIcon = getToolIcon(tool.id);
                    return (
                      <div
                        key={tool.id}
                        className="p-3 hover:bg-slate-50 flex items-center justify-between gap-3 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                            <ToolIcon className="w-3.5 h-3.5 text-indigo-600" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1.5">
                              <span>{tool.name}</span>
                              <span className="text-3xs font-mono font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                                {tool.category}
                              </span>
                            </div>
                            <div className="text-3xs text-slate-500 truncate">
                              {tool.tagline} · Case: {tool.caseStudy.company}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              onSelectTool(tool.id, 'simulators');
                              setIsSearchFocused(false);
                            }}
                            className="px-2.5 py-1 text-2xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <PlayCircle className="w-3 h-3 text-emerald-600" />
                            <span>Sim</span>
                          </button>
                          <button
                            onClick={() => {
                              onSelectTool(tool.id, 'tools');
                              setIsSearchFocused(false);
                            }}
                            className="px-2.5 py-1 text-2xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <BookOpen className="w-3 h-3 text-slate-500" />
                            <span>Guide</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Quick Curated Situation Tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 min-w-0 text-xs shrink-0">
            <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Quick Focus:
            </span>
            {[
              { label: '#Turnaround', toolId: 'dupont' },
              { label: '#PricingPower', toolId: 'blueocean' },
              { label: '#CACPayback', toolId: 'unit_economics' },
              { label: '#Bottlenecks', toolId: 'toc' },
              { label: '#M&ASynergy', toolId: 'dcf_wacc' },
              { label: '#ZeroBasedBudget', toolId: 'breakeven' },
              { label: '#OKRsExecution', toolId: 'okr_framework' }
            ].map(tag => (
              <button
                key={tag.label}
                onClick={() => {
                  onSelectTool(tag.toolId, 'simulators');
                }}
                className="px-2.5 py-1 rounded-lg text-2xs font-semibold bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 border border-slate-200 hover:border-indigo-300 text-slate-700 whitespace-nowrap transition-all cursor-pointer"
                title={`Launch ${tag.label} simulator directly`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 30-SECOND STRATEGIC TRIAGE DIAGNOSTIC WIDGET (SUGGESTION #1) */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 text-white border border-indigo-900/60 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-indigo-900/60 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>30-Second Boardroom Triage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
              Prescribe Your 3-Tool Strategic Stack
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Select your organization's immediate operational pressure and operating model. BizTools computes the sequential analytical stack recommended by Sundaresh Kamaraj.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-3xs font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              Zero-Friction Decision Engine
            </span>
          </div>
        </div>

        {/* Urgency Selector Buttons */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Step 1: Select Immediate Corporate Mandate
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { id: 'margin', label: 'Margin Compression', desc: 'Cost leakage & falling EBITDA', icon: Coins },
              { id: 'growth', label: 'Market Saturation', desc: 'Stalled growth & red oceans', icon: Compass },
              { id: 'bottlenecks', label: 'Throughput Friction', desc: 'Process waste & lead-time drag', icon: Layers },
              { id: 'unit_econ', label: 'High CAC & Churn', desc: 'Poor payback & retention drop', icon: Target },
              { id: 'alignment', label: 'Execution Silos', desc: 'Misaligned OKRs & governance', icon: Users },
              { id: 'risk', label: 'Asymmetric Risk', desc: 'Macro volatility & shocks', icon: AlertOctagon }
            ].map(urgency => {
              const isSelected = selectedUrgency === urgency.id;
              const Icon = urgency.icon;
              return (
                <button
                  key={urgency.id}
                  onClick={() => setSelectedUrgency(urgency.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md ring-2 ring-indigo-400/40 font-bold'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-indigo-400'}`} />
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{urgency.label}</div>
                    <div className={`text-3xs mt-0.5 line-clamp-1 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {urgency.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Operating Model Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Operating Model:
          </span>
          {[
            { id: 'enterprise_b2b', label: 'Enterprise B2B' },
            { id: 'saas_tech', label: 'SaaS & Digital Tech' },
            { id: 'industrial_ops', label: 'Industrial & Supply Chain' },
            { id: 'consumer_d2c', label: 'Consumer & Retail' }
          ].map(model => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`px-3 py-1 rounded-lg text-2xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                selectedModel === model.id
                  ? 'bg-white text-slate-950 font-bold border-white shadow-xs'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {model.label}
            </button>
          ))}
        </div>

        {/* Computed Triage Output Card */}
        <div className="bg-slate-950 rounded-2xl border border-indigo-900/60 p-5 sm:p-6 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
                <span>Prescription Generated</span>
                <span aria-hidden="true">·</span>
                <span>{activePrescription.title}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {activePrescription.subtitle}
              </h3>
              <p className="text-xs text-slate-300 mt-1 italic">
                "{activePrescription.sundareshPrinciple}"
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onOpenDeckBuilder && (
                <button
                  onClick={onOpenDeckBuilder}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Open Board Deck Builder"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-400" />
                  <span>Send to Board Deck</span>
                </button>
              )}
            </div>
          </div>

          {/* 3 Recommended Tools Sequential Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activePrescription.tools.map(item => {
              const toolDef = allTools.find(t => t.id === item.toolId);
              if (!toolDef) return null;
              const ToolIcon = getToolIcon(toolDef.id);

              return (
                <div
                  key={item.toolId}
                  className="bg-slate-900/90 rounded-xl border border-slate-800 hover:border-indigo-500/60 p-4 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div>
                    <div className="flex items-center justify-between text-2xs mb-2">
                      <span className="font-mono font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/40">
                        Phase {item.stepNumber}: {item.phase}
                      </span>
                      <span className="text-3xs text-slate-400 font-mono">
                        {toolDef.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-md bg-indigo-950 flex items-center justify-center shrink-0 border border-indigo-800/50">
                        <ToolIcon className="w-3.5 h-3.5 text-indigo-300" />
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {toolDef.name}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.rationale}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => onSelectTool(toolDef.id, 'simulators')}
                      className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <PlayCircle className="w-3.5 h-3.5 text-slate-950" />
                      <span>Launch Simulator</span>
                    </button>

                    <button
                      onClick={() => onSelectTool(toolDef.id, 'tools')}
                      className="text-2xs font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      View Guide →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. EXECUTIVE "DAY-1 STRATEGIC TRACKS" (ROLE-BASED FLIGHT PATHS) (SUGGESTION #2) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Curated Flight Paths
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Executive Day-1 Strategic Tracks
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Skip decision fatigue across 57 frameworks. Select your executive role for an integrated, multi-step sequence designed for boardroom delivery.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              4 Disciplined Tracks
            </span>
          </div>
        </div>

        {/* Track Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STRATEGIC_TRACKS.map(track => {
            const isSelected = activeTrackId === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setActiveTrackId(track.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-2xs mb-1">
                    <span className={`font-mono font-bold px-2 py-0.5 rounded text-3xs ${
                      isSelected ? 'bg-slate-800 text-indigo-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {track.timeEstimate}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`} />
                  </div>
                  <h3 className="text-sm font-bold tracking-tight">
                    {track.name}
                  </h3>
                  <p className={`text-2xs mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {track.role}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Track Detailed Flow Canvas */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-mono font-bold text-slate-900">{activeTrack.role}</span>
                <span aria-hidden="true">·</span>
                <span className="text-indigo-600 font-semibold">{activeTrack.timeEstimate} Complete Flow</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                {activeTrack.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
                {activeTrack.description}
              </p>
            </div>

            <button
              onClick={() => {
                const firstStep = activeTrack.steps[0];
                if (firstStep) onSelectTool(firstStep.toolId, 'simulators');
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs flex items-center gap-2 shrink-0 self-start sm:self-center cursor-pointer"
            >
              <span>Start Track (Step 1)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Sequential Step Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {activeTrack.steps.map((step, idx) => {
              const toolDef = allTools.find(t => t.id === step.toolId);
              const ToolIcon = getToolIcon(step.toolId);

              return (
                <div
                  key={step.toolId}
                  className="bg-slate-50/70 hover:bg-white rounded-xl border border-slate-200 hover:border-indigo-300 p-4 transition-all shadow-2xs space-y-3 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-2xs mb-1.5">
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                        Milestone 0{idx + 1}
                      </span>
                      <span className="text-3xs text-slate-400 font-mono">
                        {step.pillarName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                        <ToolIcon className="w-3.5 h-3.5 text-indigo-600" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {toolDef?.name || step.stepName}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.objective}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <button
                      onClick={() => onSelectTool(step.toolId, 'simulators')}
                      className="px-2.5 py-1 text-2xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <PlayCircle className="w-3 h-3 text-emerald-600" />
                      <span>Simulate</span>
                    </button>
                    <button
                      onClick={() => onSelectTool(step.toolId, 'tools')}
                      className="text-2xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      Guide →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CURATED ENTERPRISE CASE STUDY SPOTLIGHT (SUGGESTION #3) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Real-World Executive Benchmarks
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Enterprise Case Presets
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              1-click pre-populated case study configurations tested against global benchmarks (Stripe, Apple, Toyota, Mayo Clinic, and Revolut).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenPresets && (
              <button
                onClick={onOpenPresets}
                className="text-xs font-semibold text-slate-700 hover:text-slate-950 flex items-center gap-1.5 bg-white border border-slate-200 hover:border-slate-300 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                <span>View All 5 Case Presets</span>
              </button>
            )}
          </div>
        </div>

        {/* 5 Enterprise Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRY_PRESETS.slice(0, 3).map((preset: IndustryPreset) => {
            const primaryTool = allTools.find(t => t.id === preset.primaryToolId);
            const PrimaryIcon = primaryTool ? getToolIcon(primaryTool.id) : Compass;

            return (
              <div
                key={preset.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all p-5 shadow-xs flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex items-center justify-between text-2xs mb-2">
                    <span className={`px-2 py-0.5 rounded font-mono font-bold border text-3xs ${preset.badgeColor}`}>
                      {preset.industry.split('&')[0]}
                    </span>
                    <span className="text-3xs text-slate-400 font-mono">
                      {preset.toolSequence.length} Tools Stack
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {preset.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {preset.executiveSummary}
                  </p>

                  {/* Benchmark Parameters Strip */}
                  <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-3xs font-mono text-slate-700 space-y-1">
                    {preset.appliedParameters.slice(0, 2).map((param, pIdx) => (
                      <div key={pIdx} className="flex justify-between">
                        <span className="text-slate-500">{param.label}:</span>
                        <span className="font-bold text-slate-900">{param.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sundaresh Insight Quote */}
                  <div className="mt-3 text-3xs text-slate-500 italic border-l-2 border-indigo-400 pl-2">
                    "{preset.sundareshInsight.slice(0, 110)}..."
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700">
                    <PrimaryIcon className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="font-semibold text-2xs">{primaryTool?.shortName || preset.primaryToolId}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (onApplyPreset) {
                        onApplyPreset(preset.id, preset.primaryToolId);
                      } else {
                        onSelectTool(preset.primaryToolId, 'simulators');
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Load Benchmark</span>
                    <ArrowRight className="w-3 h-3 text-indigo-700" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. OFFICIAL EXECUTIVE CERTIFICATION & PROGRESS TRACKER (SUGGESTION #5) */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 text-white border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="font-mono uppercase tracking-wider">Executive Credential & Curriculum Mastery</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
              Earn Your LinkedIn-Verifiable Executive Certificate
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Complete 100% of the simulators in any strategic discipline to unlock an official Pillar Mastery Certificate issued by Sundaresh Kamaraj, verified with a tamper-proof QR credential hash and direct 1-click LinkedIn Add-to-Profile integration.
            </p>

            {/* Live User Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex justify-between text-2xs mb-1.5">
                  <span className="text-slate-400 font-semibold">Simulators Completed:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {completedSimulatorsCount} / {allTools.length} ({Math.round((completedSimulatorsCount / allTools.length) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((completedSimulatorsCount / allTools.length) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex justify-between text-2xs mb-1.5">
                  <span className="text-slate-400 font-semibold">Exam Questions Passed:</span>
                  <span className="font-mono text-indigo-400 font-bold">
                    {completedQuizzesCount} / 285 ({Math.round((completedQuizzesCount / 285) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((completedQuizzesCount / 285) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3 flex-wrap">
              {onOpenCertificate && (
                <button
                  onClick={onOpenCertificate}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-slate-950" />
                  <span>Preview Official Certificate</span>
                </button>
              )}

              <button
                onClick={() => onNavigateTab('quizzes')}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Start Certification Exam</span>
              </button>

              {onOpenStrategyVault && (
                <button
                  onClick={onOpenStrategyVault}
                  className="px-4 py-2.5 text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                  title="Export complete progress backup to JSON"
                >
                  <span>Vault Backup (JSON)</span>
                </button>
              )}
            </div>
          </div>

          {/* Official QR Seal Preview Box */}
          <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
            <div className="w-24 h-24 mx-auto rounded-xl bg-white p-1.5 shadow-md border border-amber-400/40">
              <img
                src="/assets/aistudio/QR-BiZTools_by_Sundaresh_Kamaraj-aaa426c8_f9bdb1da.png"
                alt="BizTools Official Verified Credential QR Seal"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-wide">
                OFFICIAL VERIFIED SEAL
              </div>
              <div className="text-3xs text-amber-400 font-mono mt-0.5">
                Credential ID: BIZ-MSTR-2026-SK
              </div>
              <div className="text-3xs text-slate-400 mt-1">
                Verified at <span className="text-slate-300 font-mono">sundaresh.blog</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STRATEGIC HEALTH RADAR TEASER (SUGGESTION #6) */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
              <Activity className="w-4 h-4 text-indigo-600" />
              <span>Diagnostic Benchmark</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
              Enterprise Strategic Health Audit
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Where does your leadership team stand relative to top-decile global competitors? Our 10-point diagnostic benchmarks your organization across Strategy, Innovation, Finance, Operations, Risk, Governance, Talent, and Analytics.
            </p>

            {/* Benchmark Decile Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-lg font-black text-slate-900 font-mono">92%</div>
                <div className="text-3xs text-slate-500 font-medium uppercase mt-0.5">Top Decile</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-lg font-black text-indigo-700 font-mono">54%</div>
                <div className="text-3xs text-slate-500 font-medium uppercase mt-0.5">Global Median</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-lg font-black text-amber-700 font-mono">38%</div>
                <div className="text-3xs text-slate-500 font-medium uppercase mt-0.5">Distressed</div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              {onOpenHealthAudit && (
                <button
                  onClick={onOpenHealthAudit}
                  className="px-5 py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Activity className="w-4 h-4 text-indigo-300" />
                  <span>Launch 10-Point Audit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-300" />
                </button>
              )}

              <button
                onClick={() => onNavigateTab('stacks')}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <GitCompare className="w-3.5 h-3.5 text-slate-500" />
                <span>Cross-Pillar Radar</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Key Executive Findings:
            </div>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>78% of strategic failures</strong> stem from operational misalignment, not poor initial strategy.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>3.8x enterprise valuation premium</strong> realized by organizations with synchronized quarterly OKRs and RACI governance.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Zero cloud leakage:</strong> All audit inputs and scenario simulations execute 100% locally on your client machine.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. DAILY BUSINESS STRATEGY INSIGHT (Powered by Gemini AI) */}
      <DailyBusinessInsight
        onSelectTool={(toolId, view) => onSelectTool(toolId, view)}
      />

      {/* 9. THE 10 EXECUTIVE DISCIPLINES: Interactive Leadership Explorer */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Curriculum Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              The 10 Pillars of Enterprise Strategy
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Each executive pillar addresses a non-negotiable operational or capital decision challenge. Click any pillar to inspect its core frameworks and launch simulations.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab('stacks')}
              className="text-xs font-semibold text-slate-700 hover:text-slate-950 flex items-center gap-1 bg-white border border-slate-200 px-3 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <GitCompare className="w-3.5 h-3.5 text-slate-500" />
              <span>Full Cross-Pillar Matrix</span>
            </button>
          </div>
        </div>

        {/* Pillar Selection Tabs (Clean Segmented Horizontal Strip) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 min-w-0 w-full scrollbar-thin">
          {pillarsData.map((p, idx) => {
            const isSelected = activePillarIndex === idx;
            return (
              <button
                key={p.id}
                onClick={() => setActivePillarIndex(idx)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className="font-mono text-3xs opacity-70">#{p.number}</span>
                <span>{p.title.split('&')[0]}</span>
                <span className={`px-1.5 py-0.2 rounded text-3xs font-mono font-bold ${
                  isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
                }`}>
                  {p.toolsCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Showcase Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-mono font-bold text-slate-900">Pillar {currentPillar.number}</span>
                <span aria-hidden="true">·</span>
                <span>{currentPillar.toolsCount} Master Frameworks</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                {currentPillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl italic">
                "{currentPillar.strategicQuestion}"
              </p>
            </div>

            <button
              onClick={() => {
                const firstTool = pillarTools[0];
                if (firstTool) onSelectTool(firstTool.id, 'simulators');
              }}
              className="px-4 py-2 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-center cursor-pointer"
            >
              <span>Explore Pillar Simulators</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>

          {/* Grid of Tools in Active Pillar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillarTools.map((tool, toolIdx) => (
              <div
                key={tool.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white transition-all space-y-3 group shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-2xs mb-1">
                    <span className="font-mono text-slate-400 font-semibold">
                      Tool {toolIdx + 1} of {pillarTools.length}
                    </span>
                    <span className="text-slate-500 font-medium">
                      Case: <span className="text-slate-800 font-semibold">{tool.caseStudy.company}</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {tool.tagline} · {tool.corePurpose}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-3xs font-mono text-slate-500">
                    {tool.difficulty}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSelectTool(tool.id, 'simulators')}
                      className="px-2.5 py-1 text-2xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                      title="Launch live interactive simulator"
                    >
                      <PlayCircle className="w-3 h-3 text-emerald-600" />
                      <span>Simulate</span>
                    </button>

                    <button
                      onClick={() => onSelectTool(tool.id, 'tools')}
                      className="px-2.5 py-1 text-2xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                      title="Read executive framework guide"
                    >
                      <BookOpen className="w-3 h-3 text-slate-500" />
                      <span>Guide</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. MARQUEE SIMULATORS BENTO GRID */}
      <section className="space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Featured Simulators
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Flagship Interactive Models
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Test four of the most widely requested executive frameworks directly inside the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Spotlight 1: Blue Ocean Strategy Canvas */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-blue-300 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono font-bold text-blue-900">Pillar 01 · Strategy</span>
              <span>Case: Cirque du Soleil</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Blue Ocean Strategy Canvas
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Plot value curves across 8 competitive factors. Diverge from bloody red ocean competition by eliminating, reducing, raising, and creating buyer value attributes.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-mono text-slate-600 flex items-center justify-between">
              <span>Four Actions: Eliminate · Reduce · Raise · Create</span>
              <span className="font-bold text-blue-700">Value Curve Delta: +42%</span>
            </div>
            <button
              onClick={() => onSelectTool('blueocean', 'simulators')}
              className="w-full py-2.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Launch Blue Ocean Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>

          {/* Spotlight 2: DuPont Financial Analysis */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono font-bold text-emerald-900">Pillar 05 · Finance</span>
              <span>Case: Apple Inc.</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                DuPont 3-Step Financial Decomposition
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Deconstruct Return on Equity into Operating Margin (profitability), Asset Turnover (capital efficiency), and Financial Leverage (balance sheet risk).
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-mono text-slate-600 flex items-center justify-between">
              <span>ROE = Net Margin × Asset Turnover × Leverage</span>
              <span className="font-bold text-emerald-700">Benchmark: 33.5%</span>
            </div>
            <button
              onClick={() => onSelectTool('dupont', 'simulators')}
              className="w-full py-2.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Launch DuPont Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>

          {/* Spotlight 3: Unit Economics & CAC/LTV Payback */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-amber-300 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono font-bold text-amber-900">Pillar 03 · Marketing & Growth</span>
              <span>Case: Stripe</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Unit Economics, CAC & LTV Payback
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Model Customer Lifetime Value, Gross Margin, and Churn against Customer Acquisition Cost (CAC) to simulate burn multiples and cash payback horizons.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-mono text-slate-600 flex items-center justify-between">
              <span>Target Ratio: LTV / CAC &gt; 3.0×</span>
              <span className="font-bold text-amber-700">Healthy: 3.8× (11 Mo Payback)</span>
            </div>
            <button
              onClick={() => onSelectTool('unit_economics', 'simulators')}
              className="w-full py-2.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Launch Unit Economics Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>

          {/* Spotlight 4: Modern BI & Star Schema */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-violet-300 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono font-bold text-violet-900">Pillar 10 · Data & Analytics</span>
              <span>Case: Airbnb</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                KPI Cascades & Star-Schema Data Modeling
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Construct dimensional fact-dimension architectures and driver trees that connect high-level operating income down to departmental conversion rates.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-mono text-slate-600 flex items-center justify-between">
              <span>Dimensional Schema: Fact Orders · Dim Users · Dim Geo</span>
              <span className="font-bold text-violet-700">100% Query Efficiency</span>
            </div>
            <button
              onClick={() => onSelectTool('star_schema', 'simulators')}
              className="w-full py-2.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Launch Star Schema Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>
      </section>

      {/* 11. AUTHOR & METHODOLOGY NOTE */}
      <section className="bg-slate-900 rounded-3xl text-white p-8 sm:p-10 border border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="font-mono uppercase tracking-wider text-slate-300">Methodology & Curriculum Note</span>
              <span aria-hidden="true">·</span>
              <span>Executive Design Principles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
              Built for Leaders Who Value Structured Rigor Over Intuition
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              "Strategic thinking is not an abstract art form; it is a discipline of structured trade-offs, financial mathematics, and behavioral mechanics. BizTools was engineered to provide management consultants, directors, and founders with a zero-friction playground to stress-test frameworks before entering the boardroom."
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
              <div
                onClick={() => onNavigateTab('author')}
                className="flex items-center gap-3 cursor-pointer group/author"
                title="View full Author Biography & Credential Dossier"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border-2 border-indigo-400/40 shadow-sm shrink-0 flex items-center justify-center group-hover/author:border-indigo-400 group-hover/author:scale-105 transition-all">
                  <img
                    src="/assets/aistudio/25_a1d1119e.jpeg"
                    alt="Sundaresh Kamaraj"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover/author:text-indigo-300 transition-colors flex items-center gap-1.5">
                    <span>Sundaresh Kamaraj</span>
                    <span className="text-3xs font-mono font-bold bg-indigo-900/80 text-indigo-200 border border-indigo-400/30 px-1.5 py-0.2 rounded">
                      Author
                    </span>
                  </div>
                  <div className="text-2xs text-slate-400">
                    Founder & Chairman, Elysium Group · 26+ Years Experience · 30+ Books
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onNavigateTab('author')}
                  className="px-3.5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Author Biography</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href="https://sundaresh.blog"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors flex items-center justify-center"
                  title="Visit sundaresh.blog"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <div className="font-bold text-slate-200 uppercase tracking-wider font-mono text-3xs">
              System Capabilities
            </div>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center justify-between">
                <span>Total Frameworks</span>
                <span className="font-mono text-white font-bold">57 Tools</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Knowledge Pillars</span>
                <span className="font-mono text-white font-bold">10 Disciplines</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Real Case Studies</span>
                <span className="font-mono text-white font-bold">44 Companies</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Exam Rationale Keys</span>
                <span className="font-mono text-white font-bold">285 Solutions</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Executive Lexicon</span>
                <span className="font-mono text-white font-bold">350+ Terms</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Client Storage</span>
                <span className="font-mono text-emerald-400 font-bold">100% Offline Local</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. EXECUTIVE STRATEGY & PLATFORM ARCHITECTURE FAQ (AEO & GEO KNOWLEDGE CENTER) */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
              <HelpCircle className="w-4 h-4" />
              <span>Knowledge Engine & FAQs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1 font-display">
              Executive Strategy & Architecture FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Direct, verified answers to core questions regarding platform methodology, author credentials, framework mechanics, and enterprise data privacy.
            </p>
          </div>
          <span className="text-2xs font-mono font-bold px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0 self-start sm:self-auto">
            AEO / GEO Grounded
          </span>
        </div>

        <div className="space-y-3">
          {[
            {
              question: 'What is BizTools and how do the 57 executive simulators work?',
              answer: 'BizTools is an interactive executive strategy and business management simulation suite authored by Sundaresh Kamaraj. Unlike static textbooks, BizTools transforms 57 core C-Suite frameworks across 10 strategic pillars into dynamic, mathematical laboratories. Users can adjust inputs, stress-test variables (margins, turnover, discount rates, threat levels), simulate corporate case studies, and generate board-ready strategic memoranda in real time.'
            },
            {
              question: 'Who is Sundaresh Kamaraj and what are his verified credentials?',
              answer: 'Sundaresh Kamaraj is an Indian author, serial entrepreneur, technologist, and executive business mentor with over 26 years of leadership experience in Information Technology. In 1999, he founded the Elysium Group of Companies in Madurai, Tamil Nadu, developing it into an international IT and research powerhouse. He holds a B.E. in Electronics & Communication and an M.S. in Information Technology, has authored over 30 published books, and delivered more than 200 keynote seminars and workshops worldwide.'
            },
            {
              question: 'What are the 10 Knowledge Pillars covered across the platform?',
              answer: 'The platform spans 10 comprehensive management disciplines: 1. Strategy & Market Positioning (SWOT, Porter Five Forces, Blue Ocean, Ansoff, VRIO, OKRs), 2. Business Model Innovation (BMC, Lean Canvas, Value Proposition, Design Thinking, JTBD), 3. Marketing & Customer Growth (4Ps/7Ps, STP, AIDA, Customer Journey, Growth Hacking, NPS), 4. Operations & Process Excellence (Lean 8 Wastes, Six Sigma DMAIC, Kaizen, VSM, BPR, Kanban), 5. Financial Performance (Break-Even, CBA & NPV, Zero-Based Budgeting, DuPont ROE, Working Capital), 6. Project Management (Gantt, Critical Path CPM, PERT, Agile, Scrum), 7. HR & Organizational Design (McKinsey 7S, RACI, Engagement, Performance Appraisal, Competency Mapping), 8. Risk & Decision Science (Risk Matrix, Decision Trees, Monte Carlo, Scenario Planning, Pareto), 9. Product & Startup Scaling (MVP Builder, Roadmaps, User Story Mapping, A/B Testing, Churn Analysis), and 10. Data & Analytics (KPI Cascades, Executive Dashboard Design, Cohort Retention, Predictive Regression, Modern BI Star Schema).'
            },
            {
              question: 'How does BizTools support C-Suite, boardroom, and consulting decisions?',
              answer: 'BizTools provides zero-latency analytical tools designed specifically for corporate development teams, founders, and management consultants. Features include 1-Click Corporate Presets based on global benchmarks (Apple, Tesla, Toyota, Amazon), a 16:9 Widescreen Board Deck Builder, the Strategy Health Audit with 10-point radar diagnosis, and instant executive briefing memos exportable to PDF or clipboard.'
            },
            {
              question: 'How is data privacy handled, and is BizTools fully functional offline?',
              answer: 'BizTools operates with 100% client-side data privacy. No user financial inputs, scenario snapshots, custom slide decks, or quiz progress are transmitted to external cloud servers; all state is securely isolated within the browser’s local storage (localStorage / IndexedDB). The Progressive Web App (PWA) architecture ensures the entire suite runs seamlessly offline without network connectivity.'
            }
          ].map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50 hover:bg-slate-50"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Q{index + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 13. BOTTOM CALL TO ACTION */}
      <section className="text-center py-8 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          Begin Your Executive Strategy Journey
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Start with the SWOT & TOWS Matrix simulator, or jump directly into any of the 57 executive tools.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => onSelectTool('swot', 'simulators')}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <PlayCircle className="w-4 h-4 text-emerald-400" />
            <span>Launch Tool #1: SWOT & TOWS</span>
          </button>
          <button
            onClick={() => onNavigateTab('glossary')}
            className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Search 350+ Strategic Terms</span>
          </button>
        </div>
      </section>
    </div>
  );
}

// Simple fallback icon component
function LightbulbCustom(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}
