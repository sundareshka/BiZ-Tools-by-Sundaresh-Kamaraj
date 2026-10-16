import { useState } from 'react';
import { Compass, Wind, AlertTriangle, CheckCircle2, RotateCcw, ArrowRight, ShieldCheck, HelpCircle, Layers, Sparkles, Building2, Eye, Flag } from 'lucide-react';

interface ScenarioQuadrant {
  id: string;
  quadrant: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  title: string;
  theme: string;
  headline: string;
  worldDescription: string;
  customerBehavior: string;
  competitorDynamics: string;
  strategicImplications: string;
  color: {
    bg: string;
    border: string;
    badge: string;
    text: string;
  };
}

interface StrategicOption {
  id: string;
  name: string;
  classification: 'Robust (No-Regret)' | 'Contingent (Option)' | 'Risky (Bet)';
  evaluations: Record<'Q1' | 'Q2' | 'Q3' | 'Q4', { rating: 'Strong' | 'Passable' | 'Poor' | 'Catastrophic'; note: string }>;
  recommendation: string;
}

interface SignpostItem {
  id: string;
  indicator: string;
  currentReading: string;
  threshold: string;
  pointsTo: string;
  actionIfCrossed: string;
  status: 'Normal' | 'Approaching Trigger' | 'Trigger Crossed';
}

const DEFAULT_QUADRANTS: ScenarioQuadrant[] = [
  {
    id: 'q1',
    quadrant: 'Q1',
    title: 'Skilling Boom',
    theme: 'Slow AI Automation · High Skilling Funding',
    headline: 'Traditional vocational streams surge; physical classroom capacity is the primary growth bottleneck',
    worldDescription: 'Government welfare schemes and corporate CSR budgets shower subsidies on technical colleges. Entry-level voice BPO and basic IT coding jobs continue expanding at 8–10% annually.',
    customerBehavior: 'Learners seek familiar 6-month offline certificate courses with guaranteed campus interviews.',
    competitorDynamics: 'Colleges compete purely on seat capacity, campus amenities, and placement partnerships.',
    strategicImplications: 'Physical centre expansion pays off rapidly; margins are high but vulnerability to technological delay is masked.',
    color: { bg: 'bg-emerald-50/60', border: 'border-emerald-300', badge: 'bg-emerald-100 text-emerald-800', text: 'text-emerald-950' }
  },
  {
    id: 'q2',
    quadrant: 'Q2',
    title: 'AI Upskill Rush',
    theme: 'Fast AI Automation · High Skilling Funding',
    headline: 'High-stakes transition: entry-level jobs require AI copilot fluency; enterprises fund massive reskilling',
    worldDescription: 'Generative AI automates 60% of legacy script-based support, but tech firms invest heavily in retraining their workforce to supervise autonomous agents and manage complex edge cases.',
    customerBehavior: 'Mid-career engineers and ambitious students demand advanced AI-augmented workflows, prompt architecture, and cybersecurity modules.',
    competitorDynamics: 'Traditional rote training institutes collapse; edtech platforms and specialized bootcamps capture premium corporate contracts.',
    strategicImplications: 'Physical buildings are underutilized unless retrofitted with high-speed compute labs and hybrid digital infrastructure.',
    color: { bg: 'bg-blue-50/60', border: 'border-blue-300', badge: 'bg-blue-100 text-blue-800', text: 'text-blue-950' }
  },
  {
    id: 'q3',
    quadrant: 'Q3',
    title: 'Steady Squeeze',
    theme: 'Slow AI Automation · Low Skilling Funding',
    headline: 'Fiscal austerity meets traditional jobs: fee-sensitive learners and relentless price pressure',
    worldDescription: 'State budgets freeze skilling allocations amid macroeconomic slowdown. Traditional jobs exist, but candidates must pay full tuition out of pocket with minimal bank financing.',
    customerBehavior: 'Ultra price-sensitive; learners compare course fees down to the rupee and demand rapid 45-day job placement or fee refunds.',
    competitorDynamics: 'Price wars and margin compression force smaller institutes into bankruptcy or consolidation.',
    strategicImplications: 'Capital-intensive expansions fail; lean operating models with shared real estate and ultra-low overheads survive.',
    color: { bg: 'bg-amber-50/60', border: 'border-amber-300', badge: 'bg-amber-100 text-amber-800', text: 'text-amber-950' }
  },
  {
    id: 'q4',
    quadrant: 'Q4',
    title: 'Disrupted Demand',
    theme: 'Fast AI Automation · Low Skilling Funding',
    headline: 'The perfect storm: autonomous software eliminates entry roles while funding evaporates',
    worldDescription: 'Mass automation eliminates legacy BPO and junior code testing without safety-net schemes. Tens of thousands of generalist graduates face severe structural unemployment.',
    customerBehavior: 'Desperation for only guaranteed niche trade roles (specialized electronics hardware, robotics maintenance, field mechanics).',
    competitorDynamics: 'Catastrophic industry shakeout; over 70% of conventional computer training franchises shut doors.',
    strategicImplications: 'Brick-and-mortar 8-centre expansion creates unserviceable debt and immediate bankruptcy. Only bespoke employer-paid partnerships survive.',
    color: { bg: 'bg-rose-50/60', border: 'border-rose-300', badge: 'bg-rose-100 text-rose-800', text: 'text-rose-950' }
  }
];

const DEFAULT_STRATEGIES: StrategicOption[] = [
  {
    id: 'strat-1',
    name: 'Build All 8 Physical Campuses Immediately (₹6 Cr Capex)',
    classification: 'Risky (Bet)',
    recommendation: 'Too dangerous: succeeds only in Skilling Boom; leads to catastrophic balance sheet impairment under Disrupted Demand.',
    evaluations: {
      Q1: { rating: 'Strong', note: 'Captures full capacity boom; ₹4 Cr annual revenue' },
      Q2: { rating: 'Passable', note: 'Wrong facility layout; expensive physical overhead' },
      Q3: { rating: 'Poor', note: 'Severe under-utilization; heavy lease amortization' },
      Q4: { rating: 'Catastrophic', note: 'Devastating ₹3.5 Cr write-off; institutional distress' }
    }
  },
  {
    id: 'strat-2',
    name: 'Embed AI Copilot Tools into All Syllabi Across Programs',
    classification: 'Robust (No-Regret)',
    recommendation: 'Must-do initiative: enhances graduate employability in all four futures with low upfront capital expenditure.',
    evaluations: {
      Q1: { rating: 'Strong', note: 'Differentiates graduates; commands premium placements' },
      Q2: { rating: 'Strong', note: 'Core curriculum requirement; drives corporate contract wins' },
      Q3: { rating: 'Strong', note: 'Provides higher ROI per fee rupee for budget students' },
      Q4: { rating: 'Strong', note: 'Sole survival prerequisite for any remaining tech roles' }
    }
  },
  {
    id: 'strat-3',
    name: 'Employer-Sponsored Guaranteed Apprenticeship Model',
    classification: 'Robust (No-Regret)',
    recommendation: 'Shifts financial risk to hiring companies; insulates against government voucher freezes.',
    evaluations: {
      Q1: { rating: 'Strong', note: 'Lock in enterprise relationships before competitors' },
      Q2: { rating: 'Strong', note: 'Employers eagerly sponsor customized AI upskilling' },
      Q3: { rating: 'Strong', note: 'Bypasses cash-strapped students via corporate stipends' },
      Q4: { rating: 'Strong', note: 'The only reliable revenue stream that functions in crisis' }
    }
  },
  {
    id: 'strat-4',
    name: 'Staged 2-Wave Expansion (3 Centres Now, 5 Triggered by Signposts)',
    classification: 'Contingent (Option)',
    recommendation: 'Optimal capital allocation: saves ₹3.5 Cr upfront while preserving the right to scale if Skilling Boom materializes.',
    evaluations: {
      Q1: { rating: 'Strong', note: 'Triggers Wave 2 within 18 months based on signposts' },
      Q2: { rating: 'Strong', note: 'Wave 2 centres built as hybrid AI compute spaces' },
      Q3: { rating: 'Passable', note: 'Freezes Wave 2 safely without capital loss' },
      Q4: { rating: 'Passable', note: 'Cancels Wave 2; preserves liquid reserves' }
    }
  }
];

const DEFAULT_SIGNPOSTS: SignpostItem[] = [
  {
    id: 'sp-1',
    indicator: "Partner Employers' Entry-Level IT/BPO Hiring (YoY)",
    currentReading: "-8% YoY",
    threshold: "Below -15% YoY",
    pointsTo: "Disrupted Demand / AI Upskill",
    actionIfCrossed: "Pause Wave 2 physical campus leases; pivot remaining capex to corporate reskilling sales",
    status: "Approaching Trigger"
  },
  {
    id: 'sp-2',
    indicator: "State Government Skilling Scheme Budget Allocation",
    currentReading: "+12% Growth",
    threshold: "Above +10% Growth",
    pointsTo: "Skilling Boom / AI Upskill Rush",
    actionIfCrossed: "Apply for public scheme empanelment across all 14 operating district centres",
    status: "Trigger Crossed"
  },
  {
    id: 'sp-3',
    indicator: "Share of Hiring Partners Mandating AI Tools in Support Roles",
    currentReading: "42% of Job Descriptions",
    threshold: "Crosses 60%",
    pointsTo: "AI Upskill Rush",
    actionIfCrossed: "Make AI copilot certification mandatory for graduation across all courses",
    status: "Approaching Trigger"
  }
];

export function ScenarioPlanningSimulator() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'windtunnel' | 'signposts'>('matrix');
  const [selectedQuadrantId, setSelectedQuadrantId] = useState<string>('q2');

  const selectedQuad = DEFAULT_QUADRANTS.find(q => q.id === selectedQuadrantId) || DEFAULT_QUADRANTS[1];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 mb-1">
            <Compass className="w-4 h-4" />
            <span>Strategic Reframing & Oxford Scenario Methodology</span>
            <span>·</span>
            <span>Pierre Wack & Shell Strategic Planning</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">2×2 Scenario Planning & Wind-Tunnelling Canvas</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Test strategy across four distinct, plausible future worlds. Separate predetermined elements from critical uncertainties, wind-tunnel capital initiatives into robust vs. contingent plays, and monitor leading signposts.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'matrix' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2×2 Matrix (4 Worlds)
          </button>
          <button
            onClick={() => setActiveTab('windtunnel')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'windtunnel' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Wind-Tunnel Test
          </button>
          <button
            onClick={() => setActiveTab('signposts')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'signposts' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Signpost Radar
          </button>
        </div>
      </div>

      {/* Case Context Pill */}
      <div className="p-4 bg-purple-50/50 border border-purple-200 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-3xs font-bold text-purple-900 uppercase tracking-wider block mb-0.5">
            Focal Strategic Dilemma (2026–2032 Horizon)
          </span>
          <p className="font-semibold text-purple-950">
            "What will vocational skilling demand look like in 2032, and should Meenakshi Skills Academy build 8 new campuses (₹6 Cr Capex)?"
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-2xs text-purple-800">
          <span>Predetermined Trend: <strong>Regional Working-Age Youth Growth</strong></span>
          <span>·</span>
          <span>Never Assign Probabilities to Quadrants</span>
        </div>
      </div>

      {/* TAB 1: 2×2 SCENARIO MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          {/* 2x2 Canvas */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="text-center pb-2">
              <span className="text-2xs font-extrabold uppercase tracking-widest text-slate-400">
                Vertical Axis: Public & Employer Skilling Sponsorship Funding (Low ↔ High)
              </span>
            </div>

            {/* Matrix Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEFAULT_QUADRANTS.map(q => {
                const isSelected = q.id === selectedQuadrantId;

                return (
                  <div
                    key={q.id}
                    onClick={() => setSelectedQuadrantId(q.id)}
                    className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative ${q.color.bg} ${
                      isSelected
                        ? `${q.color.border} shadow-md ring-2 ring-purple-600/20`
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-3xs font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${q.color.badge}`}>
                        Quadrant {q.quadrant}: {q.theme}
                      </span>
                      {isSelected && (
                        <span className="text-3xs font-bold text-purple-900 flex items-center gap-1">
                          <Eye className="w-3 h-3 text-purple-600" /> Active Focus
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg font-extrabold text-slate-900 tracking-tight">{q.title}</h4>
                    <p className="text-xs font-semibold text-slate-700 mt-1 mb-3">"{q.headline}"</p>
                    <p className="text-2xs text-slate-600 leading-relaxed line-clamp-3">{q.worldDescription}</p>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-2xs">
                      <span className="text-slate-500 font-medium">Customer Posture:</span>
                      <span className="font-semibold text-slate-800">{q.customerBehavior.slice(0, 36)}...</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-2">
              <span className="text-2xs font-extrabold uppercase tracking-widest text-slate-400">
                Horizontal Axis: Pace of AI Automation in Entry-Level Roles (Slow ↔ Fast)
              </span>
            </div>
          </div>

          {/* Deep Narrative Explorer for Selected Quadrant */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-3xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  In-Depth Scenario Briefing
                </span>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>{selectedQuad.title}</span>
                  <span className={`text-2xs font-bold px-2 py-0.5 rounded-full ${selectedQuad.color.badge}`}>
                    {selectedQuad.theme}
                  </span>
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-700 block mb-1">Customer / Student Behavior:</span>
                <p className="text-slate-600 text-2xs leading-relaxed">{selectedQuad.customerBehavior}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-700 block mb-1">Competitor & Market Dynamics:</span>
                <p className="text-slate-600 text-2xs leading-relaxed">{selectedQuad.competitorDynamics}</p>
              </div>
              <div className="p-3 bg-purple-50/70 rounded-lg border border-purple-200">
                <span className="font-bold text-purple-950 block mb-1">Strategic Implications for Academy:</span>
                <p className="text-purple-900 text-2xs leading-relaxed">{selectedQuad.strategicImplications}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WIND-TUNNEL STRATEGY TESTING */}
      {activeTab === 'windtunnel' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs space-y-4 p-5">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Strategic Wind-Tunnel Table</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Testing strategic initiatives across all four scenario worlds to separate robust no-regret moves from dangerous bets
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-3xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3 min-w-[200px]">Strategic Initiative</th>
                  <th className="py-2.5 px-3">Skilling Boom (Q1)</th>
                  <th className="py-2.5 px-3">AI Upskill (Q2)</th>
                  <th className="py-2.5 px-3">Steady Squeeze (Q3)</th>
                  <th className="py-2.5 px-3">Disrupted Demand (Q4)</th>
                  <th className="py-2.5 px-3">Strategic Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DEFAULT_STRATEGIES.map(strat => (
                  <tr key={strat.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-900 block">{strat.name}</span>
                      <span className="text-3xs text-slate-500">{strat.recommendation}</span>
                    </td>

                    {/* Q1-Q4 evaluations */}
                    {(['Q1', 'Q2', 'Q3', 'Q4'] as const).map(qKey => {
                      const ev = strat.evaluations[qKey];
                      const badgeClass =
                        ev.rating === 'Strong'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : ev.rating === 'Passable'
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : ev.rating === 'Poor'
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-rose-100 text-rose-800 border-rose-300';

                      return (
                        <td key={qKey} className="py-3 px-3">
                          <span className={`inline-block px-1.5 py-0.5 rounded text-3xs font-bold border ${badgeClass} mb-1`}>
                            {ev.rating}
                          </span>
                          <span className="text-3xs text-slate-500 block leading-tight">{ev.note}</span>
                        </td>
                      );
                    })}

                    <td className="py-3 px-3">
                      <span className={`inline-block px-2 py-1 rounded text-2xs font-extrabold border ${
                        strat.classification.includes('Robust')
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : strat.classification.includes('Contingent')
                          ? 'bg-blue-100 text-blue-900 border-blue-300'
                          : 'bg-rose-100 text-rose-900 border-rose-300'
                      }`}>
                        {strat.classification}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SIGNPOST RADAR DASHBOARD */}
      {activeTab === 'signposts' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Early-Warning Signposts & Trigger Monitoring</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Leading external indicators monitored quarterly by the Board to detect which scenario is crystallizing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEFAULT_SIGNPOSTS.map(sp => (
              <div key={sp.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-3xs font-bold uppercase tracking-wider ${
                    sp.status === 'Trigger Crossed'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {sp.status}
                  </span>
                  <span className="text-3xs font-mono text-slate-400">Quarterly Tracking</span>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-900">{sp.indicator}</h5>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-lg font-extrabold font-mono text-indigo-900">{sp.currentReading}</span>
                    <span className="text-3xs text-slate-500">Threshold: <strong>{sp.threshold}</strong></span>
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-2xs space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Signals World:</span>
                    <strong className="text-slate-800">{sp.pointsTo}</strong>
                  </div>
                  <div className="pt-1 border-t border-slate-100 text-indigo-950 font-medium">
                    Trigger Action: "{sp.actionIfCrossed}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
