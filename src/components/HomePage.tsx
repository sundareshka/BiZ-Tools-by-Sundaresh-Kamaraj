import { useState } from 'react';
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
  Building,
  Coins,
  KanbanSquare,
  Users,
  AlertOctagon,
  Rocket,
  BarChart3,
  ExternalLink,
  Target,
  BrainCircuit,
  Award
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { DailyBusinessInsight } from './DailyBusinessInsight.tsx';

interface HomePageProps {
  allTools: ToolDefinition[];
  onSelectTool: (toolId: string, view: 'simulators' | 'tools' | 'quizzes') => void;
  onNavigateTab: (tab: 'simulators' | 'tools' | 'scenarios' | 'quizzes' | 'stacks' | 'glossary' | 'performance') => void;
}

export function HomePage({ allTools, onSelectTool, onNavigateTab }: HomePageProps) {
  // Interactive Hero Mini-Simulator State (DuPont ROE interactive sandbox)
  const [netMargin, setNetMargin] = useState<number>(14.5);
  const [assetTurnover, setAssetTurnover] = useState<number>(1.25);
  const [equityMultiplier, setEquityMultiplier] = useState<number>(1.85);

  // Active pillar filter for the 10 pillars interactive explorer
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);

  // Calculate live DuPont ROE on hero
  const calculatedRoe = ((netMargin / 100) * assetTurnover * equityMultiplier * 100).toFixed(1);

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

  // Helper to get tools for active pillar
  const pillarTools = allTools.filter(t => t.category.toLowerCase().includes(currentPillar.id.toLowerCase()));

  return (
    <div className="space-y-16 py-4">
      {/* 1. HERO SECTION: Executive Positioning + Interactive Live Model Preview */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 p-6 sm:p-10 lg:p-14 shadow-xl">
        {/* Subtle geometric grid backdrop */}
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
            <div className="flex items-center gap-2.5 text-xs font-medium text-slate-400">
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
                Version 1.21
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] font-display text-balance">
              Executive Decision Systems & Strategic Modeling Suite
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Master 57 foundational frameworks across 10 executive disciplines. Move beyond passive theory with live numerical simulators, 44 crisis scenario missions, and 285 rigorous certification assessments.
            </p>

            {/* Direct Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
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

              <button
                onClick={() => onNavigateTab('stacks')}
                className="px-4 py-3.5 text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>Master Matrix</span>
              </button>

              <button
                onClick={() => onNavigateTab('performance')}
                className="px-4 py-3.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors flex items-center justify-center gap-1.5"
                title="View session performance & complexity analytics"
              >
                <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
                <span>Performance</span>
              </button>
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

      {/* 1.5 DAILY BUSINESS STRATEGY INSIGHT (Powered by Gemini AI) */}
      <DailyBusinessInsight
        onSelectTool={(toolId, view) => onSelectTool(toolId, view)}
      />

      {/* 2. THE 10 EXECUTIVE DISCIPLINES: Interactive Leadership Explorer */}
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
            const IconComp = p.icon;
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

      {/* 3. FOUR STRATEGIC LEARNING MODES */}
      <section className="space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Learning Methodology
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            How Leaders Master Frameworks in BizTools
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Passive reading fails under high-stakes boardroom pressure. BizTools trains intuition through four interconnected modalities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Mode 1 */}
          <div
            onClick={() => onNavigateTab('simulators')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <PlayCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="text-3xs font-mono font-bold text-slate-400 uppercase">01. Numerical Stress Testing</span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Real-Time Simulators
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dynamically manipulate financial levers, cost structures, and market sensitivity sliders. Observe immediate quantitative waterfall adjustments.
            </p>
            <div className="pt-2 text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Launch 57 Simulators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Mode 2 */}
          <div
            onClick={() => onNavigateTab('tools')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="text-3xs font-mono font-bold text-slate-400 uppercase">02. Theoretical Mechanics</span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Executive Teardown Guides
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Historical origins, foundational theorems, operational steps, and real case studies from Apple, Tesla, Netflix, Toyota, and Amazon.
            </p>
            <div className="pt-2 text-xs font-bold text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Read Strategy Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Mode 3 */}
          <div
            onClick={() => onNavigateTab('scenarios')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="text-3xs font-mono font-bold text-slate-400 uppercase">03. Boardroom Decision Labs</span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                44 Crisis Scenarios
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Step into high-velocity turnaround, market entry, and capital crunch dilemmas with branching consequences and tactical rationale.
            </p>
            <div className="pt-2 text-xs font-bold text-amber-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Enter Scenario Labs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Mode 4 */}
          <div
            onClick={() => onNavigateTab('quizzes')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200">
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <span className="text-3xs font-mono font-bold text-slate-400 uppercase">04. Rigorous Certification</span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                285 Assessment Qs
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Verify your analytical precision across all 57 frameworks. Detailed explanations for every question with downloadable certificate.
            </p>
            <div className="pt-2 text-xs font-bold text-indigo-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Start Certification</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. MARQUEE FRAMEWORKS SPOTLIGHT (BENTO GRID) */}
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

      {/* 5. AUTHOR & METHODOLOGY NOTE */}
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
            <div className="flex items-center gap-3 pt-2">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-white border border-slate-700 shadow-sm shrink-0 flex items-center justify-center">
                <img
                  src="/assets/aistudio/Sundaresh_Kamaraj_Logo-01_840f0755.jpg"
                  alt="Sundaresh Kamaraj"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Sundaresh Kamaraj</div>
                <div className="text-2xs text-slate-400">Author & Creator · BizTools Strategy Architecture</div>
              </div>
              <a
                href="https://sundaresh.blog"
                target="_blank"
                rel="noreferrer"
                className="ml-auto text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>sundaresh.blog</span>
                <ExternalLink className="w-3 h-3" />
              </a>
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

      {/* 6. BOTTOM CALL TO ACTION */}
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
